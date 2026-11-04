export const REDACOES_MOCK = [
  {
    id: "1",
    aluno: "Ana Silva",
    turma: "3º Ano - Ensino Médio",
    tema: "O impacto da inteligência artificial na educação básica",
    status: "Em Análise",
    texto: `A utilização de tecnologias no ambiente escolar tem gerado debates profundos sobre a autonomia do estudante e o papel do educador. Historicamente, transformações tecnológicas na sociedade exigem adaptações nas metodologias pedagógicas, como ocorreu com a popularização da internet.\n\nNesse contexto, o uso da inteligência artificial como ferramenta auxiliar pode potencializar o aprendizado individualizado. No entanto, é fundamental manter a supervisão humana para garantir que critérios éticos e reflexões críticas não sejam substituídos por algoritmos automáticos.`,
    criterios: [
      { id: "c1", nome: "Uso de Repertório Sociocultural", notaIA: 160, notaProfessor: 160, justificativaIA: "Identificada citação pertinente no primeiro parágrafo.", comentarioProfessor: "Citação bem encadeada." },
      { id: "c2", nome: "Coesão e Argumentação", notaIA: 120, notaProfessor: 140, justificativaIA: "Transição entre os parágrafos 1 e 2 necessita de conectivo mais assertivo.", comentarioProfessor: "Ajustado valor pela clareza geral." }
    ]
  },
  {
    id: "2",
    aluno: "Lucas Mendes",
    turma: "3º Ano - Ensino Médio",
    tema: "Desafios para a preservação do meio ambiente no Brasil",
    status: "Pendente",
    texto: `A preservação ambiental no Brasil enfrenta grandes obstáculos devido ao crescimento urbano desordenado e à degradação de biomas essenciais.\n\nÉ imperativo que políticas públicas garantam a fiscalização e a conscientização sobre a importância da sustentabilidade para as futuras gerações.`,
    criterios: [
      { id: "c1", nome: "Uso de Repertório Sociocultural", notaIA: 120, notaProfessor: 120, justificativaIA: "Falta aprofundamento na contextualização histórica.", comentarioProfessor: "" },
      { id: "c2", nome: "Coesão e Argumentação", notaIA: 140, notaProfessor: 140, justificativaIA: "Estrutura dissertativa respeitada.", comentarioProfessor: "" }
    ]
  },
  {
    id: "3",
    aluno: "Beatriz Lima",
    turma: "3º Ano - Ensino Médio",
    tema: "Caminhos para combater o analfabetismo funcional",
    status: "Revisado",
    texto: `O analfabetismo funcional compromete o desenvolvimento pleno do indivíduo e restringe sua participação cidadã.\n\nMedidas de incentivo à leitura crítica desde a infância são indispensáveis para reverter este cenário e promover o letramento efetivo.`,
    criterios: [
      { id: "c1", nome: "Uso de Repertório Sociocultural", notaIA: 180, notaProfessor: 180, justificativaIA: "Domínio excelente da proposta e articulação clara.", comentarioProfessor: "Excelente repertório." },
      { id: "c2", nome: "Coesão e Argumentação", notaIA: 160, notaProfessor: 180, justificativaIA: "Argumentação consistente e coerente.", comentarioProfessor: "Nota mantida conforme análise." }
    ]
  }
];
