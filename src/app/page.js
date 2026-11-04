"use client";

import { useState } from "react";
import Header from "@/components/Header";
import RedacaoList from "@/components/RedacaoList";
import { REDACOES_MOCK } from "@/mock/redacoesMock";

export default function Home() {
  const [redacoes] = useState(REDACOES_MOCK);
  const [selectedId, setSelectedId] = useState(REDACOES_MOCK[0].id);

  const selectedRedacao = redacoes.find((r) => r.id === selectedId);
  const pendentesCount = redacoes.filter((r) => r.status !== "Revisado").length;

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans">
      <Header totalRedacoes={redacoes.length} pendentesCount={pendentesCount} />

      <div className="flex-1 flex overflow-hidden">
        <RedacaoList
          redacoes={redacoes}
          selectedId={selectedId}
          onSelectRedacao={(id) => setSelectedId(id)}
        />

        <main className="flex-1 p-6 overflow-y-auto flex flex-col gap-6">
          {selectedRedacao ? (
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm max-w-4xl mx-auto w-full">
              <div className="border-b border-slate-100 pb-4 mb-4">
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                  Tema da Redação
                </span>
                <h2 className="text-xl font-bold text-slate-800 mt-1">
                  {selectedRedacao.tema}
                </h2>
                <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                  <p>Aluno: <strong className="text-slate-700">{selectedRedacao.aluno}</strong></p>
                  <p>Turma: <strong className="text-slate-700">{selectedRedacao.turma}</strong></p>
                </div>
              </div>

              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/50 p-6 rounded-lg border border-slate-100 font-serif">
                {selectedRedacao.texto}
              </div>
            </div>
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
