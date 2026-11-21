"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import RedacaoList from "@/components/RedacaoList";
import LeitorRedacao from "@/components/LeitorRedacao";
import VisualizadorFeedback from "@/components/VisualizadorFeedback";
import { REDACOES_MOCK } from "@/mock/redacoesMock";

export default function AlunoPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);
  const [minhasRedacoes, setMinhasRedacoes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const dadosSalvos = localStorage.getItem("usuarioLogado");

    if (!dadosSalvos) {
      // Se não estiver logado, volta para a tela de loogin
      router.push("/");
      return;
    }

    const parsed = JSON.parse(dadosSalvos);

    if (parsed.perfil !== "aluno") {
      router.push("/professor");
      return;
    }

    setUsuario(parsed);

    // Filtra apenas as redações pertencentes ao aluno logado
    const filtradas = REDACOES_MOCK.filter(
      (r) => r.alunoemail === parsed.email
    );

    setMinhasRedacoes(filtradas);
    if (filtradas.length > 0) {
      setSelectedId(filtradas[0].id);
    }
  }, [router]);

  if (!usuario) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500 text-sm">Verificando acesso...</p>
      </div>
    );
  }

  const selectedRedacao = minhasRedacoes.find((r) => r.id === selectedId);
  const emAnaliseCount = minhasRedacoes.filter(
    (r) => r.status !== "Revisado"
  ).length;

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans">
      {/* Reutiliza o componente do Header */}
      <Header
        totalRedacoes={minhasRedacoes.length}
        pendentesCount={emAnaliseCount}
      />

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Lista apenas as redações do aluno */}
        <RedacaoList
          redacoes={minhasRedacoes}
          selectedId={selectedId}
          onSelectRedacao={setSelectedId}
        />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto flex flex-col gap-6">
          {selectedRedacao ? (
            <>
              {/* Reutiliza o mesmo Leitor de Redação */}
              <LeitorRedacao redacao={selectedRedacao} />

              {/* Mostra o feedback do professor ou o aviso de "Em análise" */}
              <VisualizadorFeedback redacao={selectedRedacao} />
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400">
              Você ainda não possui redações enviadas.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
