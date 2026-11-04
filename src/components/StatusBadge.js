export default function StatusBadge({ status }) {
  const styles = {
    Pendente: "bg-amber-100 text-amber-800 border-amber-300",
    "Em Análise": "bg-blue-100 text-blue-800 border-blue-300",
    Revisado: "bg-emerald-100 text-emerald-800 border-emerald-300",
  };

  const currentStyle = styles[status] || "bg-gray-100 text-gray-800 border-gray-300";

  return (
    <span className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full border ${currentStyle}`}>
      {status}
    </span>
  );
}
