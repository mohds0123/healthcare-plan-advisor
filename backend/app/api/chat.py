from fastapi import APIRouter, Query
from pydantic import BaseModel

router = APIRouter()

@router.get("/")
def chat(q: str = Query(..., description="User question")):
    """
    Simple AI chat endpoint.
    Accepts query parameter ?q=your_question
    """

    # 🔹 Simple logic for now (you can replace with LLM later)
    if not q.strip():
        return {"answer": "Please ask a valid question."}

    answer = f"You asked: '{q}'. Our system recommends plans based on risk scoring and cost prediction."

    return {
        "answer": answer
    }
