// Exibe o texto da redação com os trechos identificados pela IA destacados
// (tese, argumentos e repertorio sociocultural).
// Os destaques vêm de dados ficticios (mock).

const TIPOS = {
  tese: {
    rotulo: "Tese",
    marca: "bg-indigo-100 border-indigo-400",
    chip: "bg-indigo-100 text-indigo-800 border-indigo-300",
  },
  argumento: {
    rotulo: "Argumento",
    marca: "bg-amber-100 border-amber-400",
    chip: "bg-amber-100 text-amber-800 border-amber-300",
  },
  repertorio: {
    rotulo: "Repertório sociocultural",
    marca: "bg-emerald-100 border-emerald-400",
    chip: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
};

// Divide o texto em partes: trechos normais e trechos destacados.
function dividirTexto(texto, destaques) {
  const marcados = destaques
    .map((d) => ({ ...d, inicio: texto.indexOf(d.trecho) }))
    .filter((d) => d.inicio !== -1) // ignora trechos que não existem no texto
    .sort((a, b) => a.inicio - b.inicio);

  const partes = [];
  let posicao = 0;

  marcados.forEach((d) => {
    if (d.inicio < posicao) return; // evita destaques sobrepostos

    if (d.inicio > posicao) {
      partes.push({ texto: texto.slice(posicao, d.inicio) });
    }
    partes.push({ texto: d.trecho, tipo: d.tipo });
    posicao = d.inicio + d.trecho.length;
  });

  if (posicao < texto.length) {
    partes.push({ texto: texto.slice(posicao) });
  }

  return partes;
}

export default function DestaqueIA({ texto, destaques = [] }) {
  const partes = dividirTexto(texto, destaques);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="font-semibold text-slate-600">Destaques da IA:</span>
        {Object.values(TIPOS).map((tipo) => (
          <span
            key={tipo.rotulo}
            className={`rounded-full border px-2.5 py-0.5 font-medium ${tipo.chip}`}
          >
            {tipo.rotulo}
          </span>
        ))}
      </div>

      <div className="max-h-[45vh] overflow-y-auto rounded-lg border border-slate-100 bg-slate-50/50 p-6 font-serif leading-relaxed text-slate-700 whitespace-pre-line">
        {partes.map((parte, index) =>
          parte.tipo ? (
            <mark
              key={index}
              title={TIPOS[parte.tipo].rotulo}
              className={`rounded border-b-2 px-0.5 text-slate-800 ${TIPOS[parte.tipo].marca}`}
            >
              {parte.texto}
            </mark>
          ) : (
            <span key={index}>{parte.texto}</span>
          )
        )}
      </div>
    </div>
  );
}
