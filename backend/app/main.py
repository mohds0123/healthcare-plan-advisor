from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import recommendations, chat

app = FastAPI(title="Healthcare Plan Advisor")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recommendations.router, prefix="/recommend")
app.include_router(chat.router, prefix="/chat")

@app.get("/")
def root():
    return {"status": "Healthcare Plan Advisor Running"}
