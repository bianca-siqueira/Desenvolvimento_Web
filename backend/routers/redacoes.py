from fastapi import APIRouter, HTTPException, Depends

from schemas.redacao import RedacaoRequest, CorrecaoIA
from services.ia_service import corrigir_redacao
from backend.main import verificarToken

router = APIRouter()


@router.post("/corrigir", response_model=CorrecaoIA)
def corrigir(request: RedacaoRequest, usuario_token: dict = Depends(verificarToken)):
    try:
        return corrigir_redacao(
            texto=request.texto,
            tema=request.tema
        )

    except ValueError as erro:
        print(f"Erro de configuração: {erro}")
        raise HTTPException(status_code=503, detail=str(erro))

    except Exception as erro:
        print(f"Erro ao chamar Gemini: {type(erro).__name__}: {erro}")
        raise HTTPException(
            status_code=502,
            detail="Não foi possível realizar a correção da redação."
        )

