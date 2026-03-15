import os
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

from app.core import firebase
firebase.init_firebase()

# The UID from the user's screenshot
uid = "ztoYJ3xJgmOT8hL0leuvygc6lnf2"

chats_ref = firebase.db.collection('users').document(uid).collection('chats')
chats = list(chats_ref.stream())

print(f"Found {len(chats)} chats for the user.")
for c in chats:
    print(f"Chat ID: {c.id}")
    print(f"Data: {c.to_dict()}")
    
    msgs_ref = chats_ref.document(c.id).collection('messages')
    msgs = list(msgs_ref.stream())
    print(f"  Messages: {len(msgs)}")
    for m in msgs:
        print(f"  - {m.to_dict()}")
