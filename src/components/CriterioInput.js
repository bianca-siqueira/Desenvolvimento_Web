// Campo reutilizável de nota para um critério de avaliação.
// Mostra a nota sugerida pela IA e permite que o professor informe/altere a nota.

export default function CriterioInput({
  criterio,
  notaSugerida,
  valor,
  onChange,
  max = 200,
  invalido = false,
}) {
  const alteradaPeloProfessor = !invalido && Number(valor) !== notaSugerida;

  let mensagem = "Igual à sugestão da IA";
  let corMensagem = "text-slate-400";

  if (invalido) {
    mensagem = `Use um valor de 0 a ${max}`;
    corMensagem = "text-red-600";
  } else if (alteradaPeloProfessor) {
    mensagem = "Ajustada por você";
    corMensagem = "text-amber-600";
  }

  return (
    <div className="flex flex-col gap-1.5 rounded-lg border border-slate-200 bg-slate-50 p-3">
      <label htmlFor={`nota-${criterio.id}`} className="text-sm font-semibold text-slate-800">
        {criterio.nome}
      </label>

      <p className="text-xs leading-snug text-slate-500">{criterio.descricao}</p>

      <p className="text-xs text-indigo-700">
        IA sugeriu: <strong>{notaSugerida}</strong>
      </p>

      <input
        id={`nota-${criterio.id}`}
        type="number"
        min={0}
        max={max}
        step={20}
        value={valor}
        onChange={(e) => onChange(criterio.id, e.target.value)}
        aria-invalid={invalido}
        className={`w-full rounded-md border px-2 py-1.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 ${
          invalido
            ? "border-red-400 bg-red-50 focus:ring-red-300"
            : "border-slate-300 bg-white focus:ring-indigo-300"
        }`}
      />

      <p className={`text-[11px] ${corMensagem}`}>{mensagem}</p>
    </div>
  );
}
