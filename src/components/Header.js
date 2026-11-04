export default function Header({ totalRedacoes, pendentesCount }) {
  return (
    <header className="w-full bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="bg-indigo-600 text-white font-bold p-2 rounded-lg text-lg">
          IA
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800">CorretorNota1000</h1>
          <p className="text-xs text-slate-500">Sistema de Apoio à Correção Transparente</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right text-xs text-slate-600 hidden md:block">
          <p><span className="font-semibold text-slate-800">{totalRedacoes}</span> redações no lote</p>
          <p><span className="font-semibold text-amber-600">{pendentesCount}</span> pendentes de revisão</p>
        </div>
        
        <div className="h-8 w-px bg-slate-200 hidden md:block"></div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm border border-indigo-200">
            PR
          </div>
          <div className="text-sm">
            <p className="font-medium text-slate-800">Prof. Roberto</p>
            <p className="text-xs text-slate-500">Língua Portuguesa</p>
          </div>
        </div>
      </div>
    </header>
  );
}
