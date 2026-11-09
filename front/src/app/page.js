"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import RedacaoList from "@/components/RedacaoList";
import LeitorRedacao from "@/components/LeitorRedacao";
import FormularioCorrecao from "@/components/FormularioCorrecao";
import { REDACOES_MOCK, CRITERIOS } from "@/mock/redacoesMock";

export default function Home() {
  // Estados principais da página
  const [redacoes, setRedacoes] = useState(REDACOES_MOCK); // lista de redações e avaliações
  const [selectedId, setSelectedId] = useState(REDACOES_MOCK[0].id); // redação aberta
  const [feedback, setFeedback] = useState(null); // mensagem visual: { tipo, mensagem }

  const selectedRedacao = redacoes.find((r) => r.id === selectedId);
  const pendentesCount = redacoes.filter((r) => r.status !== "Revisado").length;

  // A mensagem de feedback some sozinha depois de alguns segundos.
  useEffect(() => {
    if (!feedback) return;
    const timer = setTimeout(() => setFeedback(null), 5000);
    return () => clearTimeout(timer);
  }, [feedback]);

  function handleSelecionarRedacao(id) {
    setSelectedId(id);
    setFeedback(null);
  }

  // Atualiza a redação com a correção do professor e o novo status.
  function handleSalvarCorrecao(id, correcao, novoStatus) {
    setRedacoes((anteriores) =>
      anteriores.map((r) => (r.id === id ? { ...r, correcao, status: novoStatus } : r))
    );

    setFeedback({
      tipo: "sucesso",
      mensagem:
        novoStatus === "Revisado"
          ? "Correção finalizada! O feedback foi liberado para o aluno."
          : "Rascunho salvo. A redação continua em análise.",
    });
  }

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans">
      <Header totalRedacoes={redacoes.length} pendentesCount={pendentesCount} />

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

              {/* key faz o formulário recomeçar com os dados da redação selecionada */}
              <FormularioCorrecao
                key={selectedRedacao.id}
                redacao={selectedRedacao}
                criterios={CRITERIOS}
                feedback={feedback}
                onSalvar={handleSalvarCorrecao}
                onFeedback={setFeedback}
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
