from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List

router = APIRouter()

class ChatRequest(BaseModel):
    query: str
    chat_id: Optional[str] = None
    document_ids: Optional[List[str]] = None

@router.post("/")
async def process_chat(request: ChatRequest):
    # TODO: Implement LLM integration
    return {
        "response": "This is a mock response to your query.",
        "chat_id": request.chat_id or "new_chat_123",
        "structured_data": {"type": "paragraph"}
    }
