import os
import jwt

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from datetime import datetime, timedelta, timezone
from pydantic import BaseModel
from routers import redacoes

SECRET_KEY = os.getenv("JWT_SECRETO", "chave-secreta-projeto-web-2026")
ALGORITHM = "HS256" #Gera e valida os tokens a partir de uma chave secreta compartilhada
security = HTTPBearer() #Cria um esquema de autenticação p/ validar os tokens do cabeçalho

class LoginRequest(BaseModel):
    email: str
    senha: str
    perfil: str

#Geração do token JWT
def criarToken(dados: dict):
    payload = dados.copy()
    payload["exp"] = datetime.now(timezone.utc) + timedelta(hours=8)

    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

#Validação do token JWT
def verificarToken(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido ou expirado",
        )

#Parametros da API feitas na Sprint 2
app = FastAPI(
    title="CorretorNota1000 API",
    description="API para correção de redações utilizando inteligência artificial.",
    version="1.0.0"
)

#Configuração adicional para permitir requisições do frontend
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
    #Validação de credenciais -> vamos substituir na Sprint 4 por consultas no BD
    usuarios_validos = {
        "luizinho@professores.escola.com": {"senha": "1234", "nome": "Prof. Luiz Rodrigues", "perfil": "professor"},
        "...@alunos.escola.com": {"senha": "4321", "nome": "Alice Moreira", "perfil": "aluno"},
    }
    user = usuarios_validos.get(dados.email)
    if not user or user["senha"] != dados.senha or user["perfil"] != dados.perfil:
        raise HTTPException(status_code=401, detail="E-mail, senha ou perfil inválidos")

    token = criarToken({"sub": dados.email, "perfil": user["perfil"]})
    return {
        "access_token": token,
        "usuario": {"email": dados.email, "nome": user["nome"], "perfil": user["perfil"]},
    }

