const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function apiFetch(endpoint, options = {}) {
  const dadosSalvos = localStorage.getItem("usuarioLogado");
  const token = dadosSalvos ? JSON.parse(dadosSalvos).token : null;

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.detail || "Erro ao comunicar com o servidor.");
  }

  return data;
}
