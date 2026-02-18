from app.rag.retriever import retrieve

def generate_answer(question: str):
    context = retrieve(question)
    return f"Based on policy documents: {context}"
