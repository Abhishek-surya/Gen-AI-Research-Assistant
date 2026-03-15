from fastapi import APIRouter, Depends, HTTPException, status
from app.core.security import get_current_user
from app.services import db

router = APIRouter()

@router.get("/")
async def get_history(current_user: dict = Depends(get_current_user)):
    """Fetch all chat sessions for the authenticated user from Firestore."""
    user_id = current_user.get("uid")
    if not user_id:
        raise HTTPException(status_code=401, detail="User ID not found in token")
        
    chats = db.get_user_chats(user_id)
    return chats

@router.get("/{chat_id}")
async def get_chat_messages(chat_id: str, current_user: dict = Depends(get_current_user)):
    """Fetch specific chat messages from Firestore based on chat_id."""
    user_id = current_user.get("uid")
    if not user_id:
        raise HTTPException(status_code=401, detail="User ID not found in token")
        
    messages = db.get_chat_messages(user_id, chat_id)
    return {
        "chat_id": chat_id,
        "messages": messages
    }
