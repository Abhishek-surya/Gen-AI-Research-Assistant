from fastapi import APIRouter, UploadFile, File, Depends
from app.core.security import get_current_user
import shutil

router = APIRouter()

@router.post("/")
async def upload_file(file: UploadFile = File(...), current_user: dict = Depends(get_current_user)):
    # TODO: Implement secure file saving and document parsing
    return {
        "filename": file.filename,
        "content_type": file.content_type,
        "message": f"File uploaded successfully by {current_user.get('email', 'User')}",
        "document_id": "doc_12345"
    }
