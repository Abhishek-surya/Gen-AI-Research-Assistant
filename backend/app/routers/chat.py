from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from app.core.security import get_current_user
from app.services import db

router = APIRouter()

class ChatRequest(BaseModel):
    query: str
    chat_id: Optional[str] = None
    document_ids: Optional[List[str]] = None

@router.post("/")
async def process_chat(request: ChatRequest, current_user: dict = Depends(get_current_user)):
    user_id = current_user.get("uid")
    if not user_id:
         raise HTTPException(status_code=401, detail="User ID not found in token")
         
    # 1. Determine or create chat_id
    active_chat_id = request.chat_id
    if not active_chat_id:
        active_chat_id = db.create_chat(user_id=user_id, title="New Chat")
        
    # 2. Save User Query
    db.add_message(user_id=user_id, chat_id=active_chat_id, role="user", content=request.query)

    # 3. Handle LLM Integration (Mocked for now)
    response_text = f"This is a mocked database-backed response to: '{request.query}'."
    
    # 4. Save Assistant Response
    db.add_message(user_id=user_id, chat_id=active_chat_id, role="assistant", content=response_text)

    return {
        "response": response_text,
        "chat_id": active_chat_id,
        "structured_data": {"type": "paragraph"}
    }
