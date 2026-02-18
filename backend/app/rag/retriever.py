from app.rag.embed import embed

documents = [
    "Basic Care covers essential hospital expenses.",
    "Family Plus covers family hospitalization and OPD.",
    "Premium Elite offers full coverage including dental."
]

doc_embeddings = [embed(doc) for doc in documents]

def retrieve(query: str):
    # simplified retrieval
    return documents[0]
