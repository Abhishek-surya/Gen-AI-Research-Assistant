import os
import firebase_admin
from firebase_admin import credentials

def init_firebase():
    """
    Initializes the Firebase Admin SDK.
    Requires GOOGLE_APPLICATION_CREDENTIALS environment variable 
    or FIREBASE_CREDENTIALS_PATH pointing to the service account JSON file.
    """
    if not firebase_admin._apps:
        try:
            cred_path = os.getenv("FIREBASE_CREDENTIALS_PATH")
            if cred_path and os.path.exists(cred_path):
                cred = credentials.Certificate(cred_path)
                firebase_admin.initialize_app(cred)
                print("Firebase Admin initialized with certificate pathway.")
            else:
                # Default initialization assuming GOOGLE_APPLICATION_CREDENTIALS is set
                # or running in a Google Cloud environment
                firebase_admin.initialize_app()
                print("Firebase Admin initialized with default credentials.")
        except Exception as e:
             # Just logging it so the app doesn't crash if the user hasn't set env vars yet
            print(f"Warning: Firebase Admin initialization failed: {e}")
            print("Please ensure FIREBASE_CREDENTIALS_PATH or GOOGLE_APPLICATION_CREDENTIALS is set.")
