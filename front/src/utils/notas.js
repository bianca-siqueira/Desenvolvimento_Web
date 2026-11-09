// Funções e constantes auxiliares para o cálculo das notas.
// Mantidas fora dos componentes para serem reutilizadas (formulário e listagem).

export const NOTA_MAXIMA_CRITERIO = 200;
export const NOTA_MAXIMA_TOTAL = 1000; // 5 critérios x 200 pontos

// Recebe um objeto no formato { c1: 160, c2: 120, ... } e devolve a soma.
export function somarNotas(notas) {
  return Object.values(notas).reduce((total, nota) => total + (Number(nota) || 0), 0);
}
