from typing import Literal
from pydantic import BaseModel, Field, field_validator


class RedacaoRequest(BaseModel):
    texto: str = Field(min_length=50, max_length=15000)
    tema: str | None = None


class Notas(BaseModel):
    c1: int = Field(ge=0, le=200)
    c2: int = Field(ge=0, le=200)
    c3: int = Field(ge=0, le=200)
    c4: int = Field(ge=0, le=200)
    c5: int = Field(ge=0, le=200)

    @field_validator("c1", "c2", "c3", "c4", "c5")
    @classmethod
    def validar_notas(cls, valor):
        if valor not in (0, 40, 80, 120, 160, 200):
            raise ValueError("A nota deve ser múltipla de 40.")

        return valor


class Destaque(BaseModel):
    tipo: Literal["tese", "argumento", "repertorio"]
    trecho: str


class CorrecaoIA(BaseModel):
    notas: Notas
    justificativa: str
    destaques: list[Destaque]