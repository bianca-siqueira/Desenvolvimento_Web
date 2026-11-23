"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import RedacaoList from "@/components/RedacaoList";
import LeitorRedacao from "@/components/LeitorRedacao";
import FormularioCorrecao from "@/components/FormularioCorrecao";
import { REDACOES_MOCK, CRITERIOS } from "@/mock/redacoesMock";

const CHAVE_REDAÇÕES = "redacoesProjeto";

export default function ProfessorPage() {
  const [redacoes, setRedacoes] = useState(REDACOES_MOCK);
  const [selectedId, setSelectedId] = useState(REDACOES_MOCK[0]?.id ?? null);
  const [feedback, setFeedback] = useState(null);

  const router = useRouter();
  const [autorizado, setAutorizado] = useState(false);

  // Verifica o login e recupera as redações salvas no navegador.
  useEffect(() => {
    const dadosUsuario = localStorage.getItem("usuarioLogado");

    if (!dadosUsuario) {
      router.push("/");
      return;
    }

    const usuario = JSON.parse(dadosUsuario);

    if (usuario.perfil !== "professor") {
      router.push("/aluno");
      return;
    }

    const dadosRedacoes = localStorage.getItem(CHAVE_REDAÇÕES);

    if (dadosRedacoes) {
      try {
        const redacoesSalvas = JSON.parse(dadosRedacoes);

        setRedacoes(redacoesSalvas);

        if (redacoesSalvas.length > 0) {
          setSelectedId(redacoesSalvas[0].id);
        }
      } catch (erro) {
        console.error("Erro ao recuperar redações:", erro);
      }
    }

    setAutorizado(true);
  }, [router]);

  // A mensagem de feedback some depois de alguns segundos.
  useEffect(() => {
    if (!feedback) return;

    const timer = setTimeout(() => setFeedback(null), 5000);

    return () => clearTimeout(timer);
  }, [feedback]);

  if (!autorizado) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500 text-sm">
          Verificando acesso...
        </p>
      </div>
    );
  }

  const selectedRedacao = redacoes.find((r) => r.id === selectedId);

  const pendentesCount = redacoes.filter(
    (r) => r.status !== "Revisado"
  ).length;

  function handleSelecionarRedacao(id) {
    setSelectedId(id);
    setFeedback(null);
  }

  // Atualiza a redação com a correção do professor e salva no navegador.
  function handleSalvarCorrecao(id, correcao, novoStatus) {
    setRedacoes((anteriores) => {
      const atualizadas = anteriores.map((r) =>
        r.id === id
          ? { ...r, correcao, status: novoStatus }
          : r
      );

      localStorage.setItem(
        CHAVE_REDAÇÕES,
        JSON.stringify(atualizadas)
      );

      return atualizadas;
    });

    setFeedback({
      tipo: "sucesso",
      mensagem:
        novoStatus === "Revisado"
          ? "Correção finalizada! O feedback foi liberado para o aluno."
          : "Rascunho salvo. A redação continua em análise.",
    });
  }

  // Atualiza a avaliação sugerida pela IA.
  function handleAtualizarIA(id, avaliacaoIA) {
    setRedacoes((anteriores) => {
      const atualizadas = anteriores.map((r) =>
        r.id === id
          ? {
              ...r,
              avaliacaoIA,
              destaques: avaliacaoIA.destaques,
            }
          : r
      );

      localStorage.setItem(
        CHAVE_REDAÇÕES,
        JSON.stringify(atualizadas)
      );

      return atualizadas;
    });
  }

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans">
      <Header
        totalRedacoes={redacoes.length}
        pendentesCount={pendentesCount}
      />

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <RedacaoList
          redacoes={redacoes}
          selectedId={selectedId}
          onSelectRedacao={handleSelecionarRedacao}
        />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto flex flex-col gap-6">
          {selectedRedacao ? (
            <>
              <LeitorRedacao redacao={selectedRedacao} />

              <FormularioCorrecao
                key={selectedRedacao.id}
                redacao={selectedRedacao}
                criterios={CRITERIOS}
                feedback={feedback}
                onSalvar={handleSalvarCorrecao}
                onFeedback={setFeedback}
                onAtualizarIA={handleAtualizarIA}
              />
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400">
              Selecione uma redação na lista lateral para começar a leitura.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}