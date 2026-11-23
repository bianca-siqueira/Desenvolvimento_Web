"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import RedacaoList from "@/components/RedacaoList";
import LeitorRedacao from "@/components/LeitorRedacao";
import VisualizadorFeedback from "@/components/VisualizadorFeedback";
import { REDACOES_MOCK } from "@/mock/redacoesMock";

const CHAVE_REDAÇÕES = "redacoesProjeto";

export default function AlunoPage() {
  const router = useRouter();

  const [usuario, setUsuario] = useState(null);
  const [minhasRedacoes, setMinhasRedacoes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const dadosSalvos = localStorage.getItem("usuarioLogado");

    if (!dadosSalvos) {
      router.push("/");
      return;
    }

    const parsed = JSON.parse(dadosSalvos);

    if (parsed.perfil !== "aluno") {
      router.push("/professor");
      return;
    }

    setUsuario(parsed);

    // Recupera as redações atualizadas pelo professor.
    let redacoes = REDACOES_MOCK;

    const dadosRedacoes = localStorage.getItem(CHAVE_REDAÇÕES);

    if (dadosRedacoes) {
      try {
        redacoes = JSON.parse(dadosRedacoes);
      } catch (erro) {
        console.error("Erro ao recuperar redações:", erro);
      }
    }

    // Filtra apenas as redações pertencentes ao aluno logado.
    const filtradas = redacoes.filter(
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
        <p className="text-slate-500 text-sm">
          Verificando acesso...
        </p>
      </div>
    );
  }

  const selectedRedacao = minhasRedacoes.find(
    (r) => r.id === selectedId
  );

  const emAnaliseCount = minhasRedacoes.filter(
    (r) => r.status !== "Revisado"
  ).length;

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans">

      <Header
        totalRedacoes={minhasRedacoes.length}
        pendentesCount={emAnaliseCount}
      />

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">

        {/* Lista de redações do aluno */}
        <RedacaoList
          redacoes={minhasRedacoes}
          selectedId={selectedId}
          onSelectRedacao={setSelectedId}
        />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto flex flex-col gap-6">

          {selectedRedacao ? (
            <>
              <LeitorRedacao redacao={selectedRedacao} />

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