import DestaqueIA from "./DestaqueIA";
import StatusBadge from "./StatusBadge";

// Painel superior direito: mostra os dados do aluno, o tema e o texto da redação.
export default function LeitorRedacao({ redacao }) {
  return (
    <section className="mx-auto w-full max-w-6xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Tema da Redação
          </span>
          <h2 className="mt-1 text-xl font-bold text-slate-800">{redacao.tema}</h2>
          <div className="mt-2 flex items-center gap-4 text-xs text-slate-500">
            <p>
              Aluno: <strong className="text-slate-700">{redacao.aluno}</strong>
            </p>
            <p>
              Turma: <strong className="text-slate-700">{redacao.turma}</strong>
            </p>
          </div>
        </div>

        <StatusBadge status={redacao.status} />
      </div>

      <DestaqueIA texto={redacao.texto} destaques={redacao.destaques} />
    </section>
  );
}
