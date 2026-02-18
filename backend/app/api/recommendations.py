from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


# Request model (what frontend sends)
class UserProfile(BaseModel):
    age: int
    income: float
    dependents: int
    smoker: bool
    disease: bool


# Response model
class RecommendationResponse(BaseModel):
    plan: str
    estimated_cost: float
    suggested_coverage: str


@router.post("/")
def recommend(user: UserProfile):

    # 🔹 Risk Score Calculation
    risk_score = 0

    # Age factor
    if user.age > 50:
        risk_score += 3
    elif user.age > 30:
        risk_score += 2
    else:
        risk_score += 1

    # Smoker factor
    if user.smoker:
        risk_score += 3

    # Disease factor
    if user.disease:
        risk_score += 4

    # Dependents factor
    risk_score += user.dependents

    # 🔹 Base cost calculation
    base_cost = 5000 + (risk_score * 2000)

    # 🔹 Plan decision
    if risk_score <= 4:
        plan = "Basic Care"
        coverage = "₹5L"
    elif risk_score <= 8:
        plan = "Family Plus"
        coverage = "₹10L"
    else:
        plan = "Premium Shield"
        coverage = "₹25L"

    return {
        "plan": plan,
        "estimated_cost": base_cost,
        "suggested_coverage": coverage
    }
