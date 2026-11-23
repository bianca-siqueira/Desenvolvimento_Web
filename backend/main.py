import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from auth import criarToken
from routers import redacoes


class LoginRequest(BaseModel):
    email: str
    senha: str
    perfil: str


app = FastAPI(
    title="CorretorNota1000 API",
    description="API para correção de redações utilizando inteligência artificial.",
    version="1.0.0"
)

# Lê as URLs permitidas da variável de ambiente (se não existir, libera localhost) -> fase de teste sem render!
origins = os.getenv("FRONTEND_URL", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    redacoes.router,
    prefix="/redacoes",
    tags=["Redações"]
)


@app.get("/")
def inicio():
    return {"mensagem": "API CorretorNota1000 funcionando!"}


@app.post("/api/login")
def login(dados: LoginRequest):
    # Validação de credenciais -> será substituída por consultas no BD na próxima etapa
    usuarios_validos = {
        "luizinho@professores.escola.com": {
            "senha": "1234",
            "nome": "Prof. Luiz Rodrigues",
            "perfil": "professor"
        },
        "alice@alunos.escola.com": {
            "senha": "4321",
            "nome": "Alice Moreira",
            "perfil": "aluno"
        },
    }

    user = usuarios_validos.get(dados.email)
    if not user or user["senha"] != dados.senha or user["perfil"] != dados.perfil:
        raise HTTPException(status_code=401, detail="E-mail, senha ou perfil inválidos")

    token = criarToken({"sub": dados.email, "perfil": user["perfil"]})
    return {
        "access_token": token,
        "usuario": {
            "email": dados.email,
            "nome": user["nome"],
            "perfil": user["perfil"]
        },
    }
