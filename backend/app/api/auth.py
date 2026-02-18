from fastapi import APIRouter
from app.core.security import hash_password, create_access_token

router = APIRouter()

@router.post("/login")
def login(email: str, password: str):
    # Simplified demo auth
    token = create_access_token({"sub": email})
    return {"access_token": token}
