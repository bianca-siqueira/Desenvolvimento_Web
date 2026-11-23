"use client";

import { somarNotas, NOTA_MAXIMA_TOTAL } from "@/utils/notas";

const COMPETENCIAS = [
  { id: "c1", nome: "Norma culta" },
  { id: "c2", nome: "Compreensão do tema" },
  { id: "c3", nome: "Argumentação" },
  { id: "c4", nome: "Coesão textual" },
  { id: "c5", nome: "Proposta de intervenção" },
];

export default function VisualizadorFeedback({ redacao }) {
  const correcao = redacao?.correcao;

  const isRevisado =
    redacao.status === "Revisado" && correcao;

  // Caso 1: professor ainda não liberou a correção.
  if (!isRevisado) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-amber-700 font-bold mb-2">
          ⏳
        </div>

        <h3 className="text-base font-semibold text-amber-900">
          Redação em análise
        </h3>

        <p className="text-sm text-amber-700 mt-1 max-w-md mx-auto">
          Sua redação está sendo avaliada pelo professor.
          Assim que a correção for liberada, suas notas e comentários aparecerão aqui.
        </p>
      </div>
    );
  }

  const notas = correcao.notas || {};
  const notaTotal = somarNotas(notas);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">

      {/* Cabeçalho */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
            Correção Liberada
          </span>

          <h3 className="text-lg font-bold text-slate-800 mt-2">
            Feedback do Professor
          </h3>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-500 block">
            Nota Final
          </span>

          <span className="text-3xl font-extrabold text-blue-600">
            {notaTotal}
          </span>

          <span className="text-xs text-slate-400">
            {" "}/ {NOTA_MAXIMA_TOTAL}
          </span>
        </div>
      </div>

      {/* Notas por competência */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {COMPETENCIAS.map((competencia) => (
          <div
            key={competencia.id}
            className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center"
          >
            <span className="text-xs font-medium text-slate-500 block">
              {competencia.nome}
            </span>

            <span className="text-xl font-bold text-slate-800 mt-1 block">
              {notas[competencia.id] ?? "-"}
            </span>
          </div>
        ))}
      </div>

      {/* Justificativa */}
      <div>
        <h4 className="text-sm font-semibold text-slate-700 mb-2">
          Justificativa da avaliação
        </h4>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-700 leading-relaxed whitespace-pre-line">
          {correcao.justificativa || "Nenhuma justificativa registrada."}
        </div>
      </div>

      {/* Comentário do professor */}
      <div>
        <h4 className="text-sm font-semibold text-slate-700 mb-2">
          Comentário do professor
        </h4>

        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100 text-sm text-slate-700 leading-relaxed whitespace-pre-line">
          {correcao.comentario || "O professor não deixou um comentário adicional."}
        </div>
      </div>

    </div>
  );
}