"use client";

export default function VisualizadorFeedback({ redacao }) {
  const isRevisado = redacao.status === "Revisado" && redacao.correcao;

  // Caso 1: Professor ainda não liberou a correção
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
          Seu texto já foi enviado e está na fila de correção do professor. Assim que a avaliação for concluída, suas notas e comentários aparecerão aqui.
        </p>
      </div>
    );
  }

  // Caso 2: Correção já finalizada e liberada pelo professor
  const { notaTotal, competencias, comentarioGeral } = redacao.correcao;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
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
          <span className="text-xs text-slate-500 block">Nota Final</span>
          <span className="text-3xl font-extrabold text-blue-600">
            {notaTotal}
          </span>
          <span className="text-xs text-slate-400"> / 1000</span>
        </div>
      </div>

      {/* Notas por Competência (caso seu objeto tenha) */}
      {competencias && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {Object.entries(competencias).map(([comp, nota], index) => (
            <div
              key={comp}
              className="bg-slate-50 border border-slate-200/80 rounded-lg p-3 text-center"
            >
              <span className="text-xs font-medium text-slate-500 block">
                Competência {index + 1}
              </span>
              <span className="text-base font-bold text-slate-800 mt-0.5 block">
                {nota}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Comentário Geral */}
      <div>
        <h4 className="text-sm font-semibold text-slate-700 mb-2">
          Comentários e orientações
        </h4>
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200/60 text-sm text-slate-700 leading-relaxed whitespace-pre-line">
          {comentarioGeral || "Nenhum comentário adicional registrado."}
        </div>
      </div>
    </div>
  );
}
