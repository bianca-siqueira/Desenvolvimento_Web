"use client";

import { useState } from "react";
import CriterioInput from "./CriterioInput";
import { NOTA_MAXIMA_CRITERIO, NOTA_MAXIMA_TOTAL, somarNotas } from "@/utils/notas";
import { apiFetch } from "@/services/api";

const ESTILOS_FEEDBACK = {
  sucesso: "bg-emerald-50 border-emerald-300 text-emerald-800",
  erro: "bg-red-50 border-red-300 text-red-800",
  info: "bg-blue-50 border-blue-300 text-blue-800",
};

// Uma nota é válida se for um número entre 0 e o máximo do critério.
function notaValida(valor) {
  if (valor === "" || valor === null || valor === undefined) return false;
  const numero = Number(valor);
  return Number.isFinite(numero) && numero >= 0 && numero <= NOTA_MAXIMA_CRITERIO;
}

// Painel inferior direito: o professor revisa as notas e a justificativa sugeridas pela IA.
export default function FormularioCorrecao({
  redacao,
  criterios,
  feedback,
  onSalvar,
  onFeedback,
  onAtualizarIA,
}) {
  const [avaliacaoIA, setAvaliacaoIA] = useState(redacao.avaliacaoIA);

  // Se o professor já salvou algo, utiliza a correção dele.
  const inicial = redacao.correcao ?? {
    notas: avaliacaoIA.notas,
    justificativa: avaliacaoIA.justificativa,
    comentario: "",
  };

  const [notas, setNotas] = useState(inicial.notas);
  const [justificativa, setJustificativa] = useState(inicial.justificativa);
  const [comentario, setComentario] = useState(inicial.comentario);

  const [carregandoIA, setCarregandoIA] = useState(false);
  const [erroIA, setErroIA] = useState(null);

  const totalProfessor = somarNotas(notas);
  const totalIA = somarNotas(avaliacaoIA.notas);
  const todasNotasValidas = criterios.every((c) => notaValida(notas[c.id]));

  async function handleCorrigirComIA() {
    setCarregandoIA(true);
    setErroIA(null);
    onFeedback(null);

    try {
      const resultado = await apiFetch("/redacoes/corrigir", {
        method: "POST",
        body: JSON.stringify({
          tema: redacao.tema,
          texto: redacao.texto,
        }),
      });

      // As notas retornadas pelo backend ficam dentro de resultado.notas.
      const notasRecebidas = resultado?.notas;
      const valoresValidos = [0, 40, 80, 120, 160, 200];

      const notasValidas = criterios.every((criterio) =>
        valoresValidos.includes(Number(notasRecebidas?.[criterio.id]))
      );

      if (!notasValidas) {
        throw new Error("A resposta da IA possui notas inválidas.");
      }

      if (typeof resultado.justificativa !== "string") {
        throw new Error("A IA não retornou uma justificativa válida.");
      }

      const novasNotas = {};

      criterios.forEach((criterio) => {
        novasNotas[criterio.id] = Number(notasRecebidas[criterio.id]);
      });

      // Organiza a resposta no formato utilizado pelo frontend.
      const novaAvaliacao = {
        notas: novasNotas,
        justificativa: resultado.justificativa,
        destaques: Array.isArray(resultado.destaques)
          ? resultado.destaques
          : [],
      };

      // Atualiza as informações da avaliação.
      setAvaliacaoIA(novaAvaliacao);
      setNotas(novasNotas);
      setJustificativa(novaAvaliacao.justificativa);

      // Atualiza os dados da redação na página do professor.
      onAtualizarIA(redacao.id, novaAvaliacao);

      onFeedback({
        tipo: "sucesso",
        mensagem: "Avaliação gerada pela IA com sucesso! Revise os valores antes de liberar.",
      });

    } catch (err) {
      setErroIA(err.message);

    } finally {
      setCarregandoIA(false);
    }
  }

  function handleNotaChange(criterioId, valor) {
    setNotas((anteriores) => ({
      ...anteriores,
      [criterioId]: valor,
    }));
  }

  function restaurarSugestaoIA() {
    setNotas(avaliacaoIA.notas);
    setJustificativa(avaliacaoIA.justificativa);

    onFeedback({
      tipo: "info",
      mensagem: "Notas e justificativa voltaram para a sugestão original da IA.",
    });
  }

  // novoStatus: "Em Análise" (rascunho) ou "Revisado" (feedback liberado).
  function enviar(novoStatus) {
    if (!todasNotasValidas) {
      onFeedback({
        tipo: "erro",
        mensagem: `Revise as notas: cada critério aceita valores de 0 a ${NOTA_MAXIMA_CRITERIO}.`,
      });
      return;
    }

    if (novoStatus === "Revisado" && justificativa.trim() === "") {
      onFeedback({
        tipo: "erro",
        mensagem: "Escreva a justificativa da avaliação antes de liberar o feedback ao aluno.",
      });
      return;
    }

    const notasNumericas = {};

    criterios.forEach((c) => {
      notasNumericas[c.id] = Number(notas[c.id]);
    });

    onSalvar(
      redacao.id,
      {
        notas: notasNumericas,
        justificativa: justificativa.trim(),
        comentario: comentario.trim(),
      },
      novoStatus
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    enviar("Revisado");
  }

  return (
    <section className="mx-auto w-full max-w-6xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Correção do Professor
          </span>

          <h3 className="text-lg font-bold text-slate-800">
            Revise a avaliação sugerida pela IA
          </h3>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleCorrigirComIA}
            disabled={carregandoIA}
            className="rounded-lg bg-indigo-50 border border-indigo-200 px-3.5 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 disabled:opacity-50 transition cursor-pointer"
          >
            {carregandoIA ? "Analisando com IA..." : "Gerar nova análise com IA"}
          </button>

          <div className="sm:text-right">
            <p className="text-xs text-slate-500">Nota total</p>

            <p className="text-2xl font-bold text-slate-800">
              {totalProfessor}
              <span className="text-sm font-medium text-slate-400">
                {" "}/ {NOTA_MAXIMA_TOTAL}
              </span>
            </p>

            <p className="text-xs text-indigo-700">
              IA sugeriu: {totalIA}
            </p>
          </div>
        </div>
      </div>

      {erroIA && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-xs text-red-700">
          Falha na comunicação com a API: {erroIA}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {criterios.map((criterio) => (
            <CriterioInput
              key={criterio.id}
              criterio={criterio}
              notaSugerida={avaliacaoIA.notas[criterio.id]}
              valor={notas[criterio.id]}
              onChange={handleNotaChange}
              max={NOTA_MAXIMA_CRITERIO}
              invalido={!notaValida(notas[criterio.id])}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="justificativa"
              className="text-sm font-semibold text-slate-800"
            >
              Justificativa da avaliação
            </label>

            <textarea
              id="justificativa"
              rows={5}
              value={justificativa}
              onChange={(e) => setJustificativa(e.target.value)}
              className="w-full rounded-md border border-slate-300 bg-white p-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="comentario"
              className="text-sm font-semibold text-slate-800"
            >
              Comentário para o aluno
            </label>

            <textarea
              id="comentario"
              rows={5}
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Escreva um comentário pessoal para o estudante (opcional)."
              className="w-full rounded-md border border-slate-300 bg-white p-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
        </div>

        {feedback && (
          <div
            role={feedback.tipo === "erro" ? "alert" : "status"}
            className={`rounded-lg border px-4 py-3 text-sm font-medium ${ESTILOS_FEEDBACK[feedback.tipo]}`}
          >
            {feedback.mensagem}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={restaurarSugestaoIA}
            className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Restaurar sugestão da IA
          </button>

          <button
            type="button"
            onClick={() => enviar("Em Análise")}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Salvar rascunho
          </button>

          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Liberar feedback ao aluno
          </button>
        </div>
      </form>
    </section>
  );
}