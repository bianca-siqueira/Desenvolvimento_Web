"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [perfil, setPerfil] = useState("professor")

  const isProfessor = perfil === "professor";

  const handleTrocarPerfil = (novoPerfil) => {
    setPerfil(novoPerfil);
    setErro("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    //Simulação de validação -> criar ao logar?
    setTimeout(() => {
      if (isProfessor) {
        if (email === "luizinho@professores.escola.com" && senha === "1234") {
          localStorage.setItem(
            "usuarioLogado",
            JSON.stringify({ email, nome: "Prof. Luiz", perfil: "professor" })
          );
          router.push("/professor"); //Direciona para a página do professor
        } else {
          setErro("Credenciais de professor inválidas. Tente novamente");
          setCarregando(false);
        }
      } else {
        if (email === "...@alunos.escola.com" && senha === "4321") {
          localStorage.setItem(
            "usuarioLogado",
            JSON.stringify({ email, nome: "Lucas Almeida", perfil: "aluno" })
          );
          router.push("/aluno"); //Direciona para a página do aluno
        } else {
          setErro("Credenciais de aluno inválidas. Tente novamente");
          setCarregando(false);
        }
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        
        {/* Cabeçalho / identidade visual */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600 text-white font-bold text-xl mb-3">
            CN
          </div>
          <h1 className="text-2xl font-bold text-slate-800">CorretorNota1000</h1>
          <p className="text-sm text-slate-500 mt-1">
            {isProfessor
              ? "Acesse sua conta para corrigir redações"
              : "Acesse sua conta para enviar suas redações"}
          </p>
        </div>

        {/* Seletor de Abas: Professores | Alunos */}
        <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-slate-100 rounded-xl mb-6 border border-slate-200/60">
          <button
            type="button"
            onClick={() => handleTrocarPerfil("professor")}
            className={`py-2 px-4 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              isProfessor
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
            }`}
          >
            Professores
          </button>

          <button
            type="button"
            onClick={() => handleTrocarPerfil("aluno")}
            className={`py-2 px-4 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              !isProfessor
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
            }`}
          >
            Alunos
          </button>
        </div>

        {/* Alerta de erro */}
        {erro && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">
            {erro}
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
              {isProfessor ? "Email institucional do professor" : "Email institucional do aluno"}
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isProfessor ? "@professores.escola.com" : "@alunos.escola.com"}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="senha" className="block text-sm font-medium text-slate-700">
                Senha
              </label>
              <button
                type="button"
                onClick={() => alert("Funcionalidade de recuperação de senha em breve.")}
                className="text-xs text-blue-600 hover:underline"
              >
                Esqueceu a senha?
              </button>
            </div>
            <div className="relative">
              <input
                id="senha"
                type={mostrarSenha ? "text" : "password"}
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500 hover:text-slate-700"
              >
                {mostrarSenha ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={carregando}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg shadow-sm transition cursor-pointer"
          >
            {carregando ? "Entrando..." : "Entrar na plataforma"}
          </button>
        </form>
      </div>
    </div>
  );
}
