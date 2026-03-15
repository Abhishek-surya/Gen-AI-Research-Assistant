from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import Optional, List
from app.core.security import get_current_user

router = APIRouter()

class ChatRequest(BaseModel):
    query: str
    chat_id: Optional[str] = None
    document_ids: Optional[List[str]] = None

@router.post("/")
async def process_chat(request: ChatRequest, current_user: dict = Depends(get_current_user)):
    # TODO: Implement LLM integration
    return {
        "response": f"This is a mock response for {current_user.get('email', 'User')}.",
        "chat_id": request.chat_id or "new_chat_123",
        "structured_data": {"type": "paragraph"}
    }
