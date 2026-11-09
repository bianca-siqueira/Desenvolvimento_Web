from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import redacoes

app = FastAPI(
    title="CorretorNota1000 API",
    description="API para correção de redações utilizando inteligência artificial.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(
    redacoes.router,
    prefix="/redacoes",
    tags=["Redações"]
)


@app.get("/")
def inicio():
    return {"mensagem": "API CorretorNota1000 funcionando!"}