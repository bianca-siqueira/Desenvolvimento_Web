import './estilo.css';

export const metadata = {
  title: 'CorretorNota1000',
  description: 'Sistema web para apoio de professores da educação básica no processo de correção de redações assistido por IA.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
