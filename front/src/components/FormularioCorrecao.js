"use client";

import { useState } from "react";
import CriterioInput from "./CriterioInput";
import { NOTA_MAXIMA_CRITERIO, NOTA_MAXIMA_TOTAL, somarNotas } from "@/utils/notas";

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
// Os campos ficam em estado local; ao salvar, a página principal atualiza a lista de redações.
export default function FormularioCorrecao({ redacao, criterios, feedback, onSalvar, onFeedback }) {
  // Se o professor já salvou algo, usa a correção dele; senão, parte da sugestão da IA.
  const inicial = redacao.correcao ?? {
    notas: redacao.avaliacaoIA.notas,
    justificativa: redacao.avaliacaoIA.justificativa,
    comentario: "",
  };

  const [notas, setNotas] = useState(inicial.notas);
  const [justificativa, setJustificativa] = useState(inicial.justificativa);
  const [comentario, setComentario] = useState(inicial.comentario);

  const totalProfessor = somarNotas(notas);
  const totalIA = somarNotas(redacao.avaliacaoIA.notas);
  const todasNotasValidas = criterios.every((c) => notaValida(notas[c.id]));

  function handleNotaChange(criterioId, valor) {
    setNotas((anteriores) => ({ ...anteriores, [criterioId]: valor }));
  }

  function restaurarSugestaoIA() {
    setNotas(redacao.avaliacaoIA.notas);
    setJustificativa(redacao.avaliacaoIA.justificativa);
    onFeedback({ tipo: "info", mensagem: "Notas e justificativa voltaram para a sugestão original da IA." });
  }

  // novoStatus: "Em Análise" (rascunho) ou "Revisado" (feedback liberado)
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
          <h3 className="text-lg font-bold text-slate-800">Revise a avaliação sugerida pela IA</h3>
        </div>

        <div className="sm:text-right">
          <p className="text-xs text-slate-500">Nota total</p>
          <p className="text-2xl font-bold text-slate-800">
            {totalProfessor}
            <span className="text-sm font-medium text-slate-400"> / {NOTA_MAXIMA_TOTAL}</span>
          </p>
          <p className="text-xs text-indigo-700">IA sugeriu: {totalIA}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {criterios.map((criterio) => (
            <CriterioInput
              key={criterio.id}
              criterio={criterio}
              notaSugerida={redacao.avaliacaoIA.notas[criterio.id]}
              valor={notas[criterio.id]}
              onChange={handleNotaChange}
              max={NOTA_MAXIMA_CRITERIO}
              invalido={!notaValida(notas[criterio.id])}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="justificativa" className="text-sm font-semibold text-slate-800">
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
            <label htmlFor="comentario" className="text-sm font-semibold text-slate-800">
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
