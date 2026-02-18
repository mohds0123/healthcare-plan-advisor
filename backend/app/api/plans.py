from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_plans():
    return [
        {"id": 1, "name": "Basic Care", "premium": 2000},
        {"id": 2, "name": "Family Plus", "premium": 4500},
        {"id": 3, "name": "Premium Elite", "premium": 8000}
    ]
