import os
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Global db client
db = None

def init_firebase():
    """
    Initializes the Firebase Admin SDK.
    """
    global db
    if not firebase_admin._apps:
        try:
            cred_path = os.getenv("FIREBASE_CREDENTIALS_PATH")
            if cred_path and os.path.exists(cred_path):
                cred = credentials.Certificate(cred_path)
                firebase_admin.initialize_app(cred)
                print("Firebase Admin initialized with certificate pathway.")
            else:
                firebase_admin.initialize_app()
                print("Firebase Admin initialized with default credentials.")
            
            # Initialize Firestore Client
            db = firestore.client()
            print("Firestore client initialized successfully.")
            
        except Exception as e:
            print(f"Warning: Firebase Admin initialization failed: {e}")
            
    return db
