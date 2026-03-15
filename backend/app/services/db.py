from app.core import firebase
from datetime import datetime, timezone
from google.cloud.firestore_v1.base_query import FieldFilter
import uuid

def _get_utc_now():
    return datetime.now(timezone.utc)

def get_user_chats(user_id: str):
    """Fetch all chat sessions for a specific user, ordered by creation."""
    if not firebase.db:
        print("Database not initialized")
        return []
    
    chats_ref = firebase.db.collection('users').document(user_id).collection('chats')
    # Order by updated_at descending
    query = chats_ref.order_by("updated_at", direction="DESCENDING")
    
    chats = []
    for doc in query.stream():
        chat_data = doc.to_dict()
        chat_data['chat_id'] = doc.id
        # Convert DatetimeWithNanoseconds to ISO string
        if 'updated_at' in chat_data:
            chat_data['updated_at'] = chat_data['updated_at'].isoformat()
        if 'created_at' in chat_data:
             chat_data['created_at'] = chat_data['created_at'].isoformat()
        chats.append(chat_data)
        
    return chats

def create_chat(user_id: str, title: str = "New Chat") -> str:
    """Create a new chat session for a user and return the chat_id."""
    if not firebase.db:
         return str(uuid.uuid4()) # Fallback for mock environment
    
    now = _get_utc_now()
    chats_ref = firebase.db.collection('users').document(user_id).collection('chats')
    
    new_chat_data = {
        "title": title,
        "created_at": now,
        "updated_at": now
    }
    
    # Firestore generates an ID automatically if we use add()
    # Alternatively, we can use document() to generate a ref and set()
    _, doc_ref = chats_ref.add(new_chat_data)
    return doc_ref.id

def get_chat_messages(user_id: str, chat_id: str):
    """Retrieve all messages for a specific chat ordered by timestamp."""
    if not firebase.db:
         return []
    
    messages_ref = firebase.db.collection('users').document(user_id).collection('chats').document(chat_id).collection('messages')
    query = messages_ref.order_by("timestamp", direction="ASCENDING")
    
    messages = []
    for doc in query.stream():
        msg_data = doc.to_dict()
        if 'timestamp' in msg_data:
            msg_data['timestamp'] = msg_data['timestamp'].isoformat()
        messages.append(msg_data)
        
    return messages

def add_message(user_id: str, chat_id: str, role: str, content: str, sources: list = None):
    """Add a message to a chat session and update the chat's updated_at timestamp."""
    if not firebase.db:
        return
    
    now = _get_utc_now()
    
    # 1. Add the message
    messages_ref = firebase.db.collection('users').document(user_id).collection('chats').document(chat_id).collection('messages')
    message_data = {
         "role": role,
         "content": content,
         "timestamp": now,
         "sources": sources or []
    }
    messages_ref.add(message_data)
    
    # 2. Update the parent chat's updated_at (and optionally title if it was default)
    chat_ref = firebase.db.collection('users').document(user_id).collection('chats').document(chat_id)
    chat_doc = chat_ref.get()
    
    update_data = {"updated_at": now}
    
    # Simple logic to auto-title the chat based on the first user message
    if chat_doc.exists and chat_doc.to_dict().get("title") == "New Chat" and role == "user":
         update_data["title"] = content[:30] + "..." if len(content) > 30 else content
         
    chat_ref.update(update_data)
