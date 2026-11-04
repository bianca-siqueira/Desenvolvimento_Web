import StatusBadge from "./StatusBadge";

export default function RedacaoList({ redacoes, selectedId, onSelectRedacao }) {
  return (
    <aside className="w-full md:w-80 lg:w-96 bg-white border-r border-slate-200 flex flex-col h-full shrink-0">
      <div className="p-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Redações Recebidas</h2>
        <p className="text-xs text-slate-500">Selecione um aluno para visualizar o texto</p>
      </div>

      <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
        {redacoes.map((item) => {
          const isSelected = item.id === selectedId;

          return (
            <button
              key={item.id}
              onClick={() => onSelectRedacao(item.id)}
              className={`w-full text-left p-4 transition-colors flex flex-col gap-2 hover:bg-slate-50 ${
                isSelected ? "bg-indigo-50/70 border-l-4 border-indigo-600" : ""
              }`}
            >
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h3 className={`font-semibold text-sm ${isSelected ? "text-indigo-900" : "text-slate-800"}`}>
                    {item.aluno}
                  </h3>
                  <p className="text-xs text-slate-500">{item.turma}</p>
                </div>
                <StatusBadge status={item.status} />
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 font-normal">
                {item.tema}
              </p>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
