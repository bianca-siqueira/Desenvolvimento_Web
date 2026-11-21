"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header({ totalRedacoes, pendentesCount }){
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);

  // Lê os dados de quem está logado (Professor ou Aluno)
  useEffect(() => {
    const dadosSalvos = localStorage.getItem("usuarioLogado");
    if (dadosSalvos) {
      setUsuario(JSON.parse(dadosSalvos));
    }
  }, []);

  //Remove os dados já logados e volta para a página de login
  function handleLogout(){
    localStorage.removeItem("usuarioLogado");
    router.push("/");
  }

  const isProfessor = usuario?.perfil === "professor";

  return (
    <header className="w-full bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
      {/*Mais a esquerda */}
      <div className="flex items-center gap-3">
        <div className="bg-indigo-600 text-white font-bold p-2 rounded-lg text-lg">
          CN
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800">CorretorNota1000</h1>
          <p className="text-xs text-slate-500">Sistema de Apoio à Correção Transparente</p>
        </div>
      </div>

      {/*Mais a direita */}
      <div className="flex items-center gap-4">
        <div className="text-right text-xs text-slate-600 hidden md:block">
          <p><span className="font-semibold text-slate-800">{totalRedacoes}</span>{isProfessor ? ' total' : ' minhas redações '}</p>
          <p><span className="font-semibold text-amber-600">{pendentesCount}</span>{isProfessor ? ' pendentes' : ' em análise'}</p>
        </div>

        <div className="h-6 w-px bg-slate-200 hidden sm:block" />

        {/* Exibição de acordo com o usuário logado */}
        {usuario && (
          <div className="hidden md:flex flex-col text-right">
            <span className="text-sm font-semibold text-slate-800 leading-tight">
              {usuario.nome}
            </span>
            <span className="text-xs text-slate-500 capitalize">
              {usuario.perfil}
            </span>
          </div>
        )}

        <div className="h-8 w-px bg-slate-200 hidden sm:block" />

        <button
          onClick={handleLogout}
          className="px-3.5 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 rounded-lg transition cursor-pointer"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
