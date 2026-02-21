from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import chat, upload, history

app = FastAPI(title="Generative AI Research Assistant API")

# Configure CORS
origins = [
    "http://localhost:5173",  # Vite default port
    "http://localhost:5174",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/api/chat", tags=["chat"])
app.include_router(upload.router, prefix="/api/upload", tags=["upload"])
app.include_router(history.router, prefix="/api/history", tags=["history"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Generative AI Research Assistant API"}
