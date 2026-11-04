// Dados mockados da Sprint 1 (serão substituídos pela API na Sprint 3).

// Critérios de avaliação (baseados nas 5 competências do ENEM, 0 a 200 pontos cada).
export const CRITERIOS = [
  {
    id: "c1",
    nome: "Norma culta",
    descricao: "Domínio da modalidade escrita formal da língua portuguesa.",
  },
  {
    id: "c2",
    nome: "Compreensão do tema",
    descricao: "Entendimento da proposta e uso de repertório sociocultural.",
  },
  {
    id: "c3",
    nome: "Argumentação",
    descricao: "Seleção e organização de argumentos em defesa de um ponto de vista.",
  },
  {
    id: "c4",
    nome: "Coesão textual",
    descricao: "Uso de recursos linguísticos para articular as partes do texto.",
  },
  {
    id: "c5",
    nome: "Proposta de intervenção",
    descricao: "Solução para o problema, com agente, ação e finalidade.",
  },
];

// Cada redação possui:
// - destaques: trechos identificados pela IA (tipo: "tese" | "argumento" | "repertorio")
// - avaliacaoIA: notas e justificativa sugeridas pela IA
// - correcao: avaliação do professor (null enquanto ele ainda não salvou nada)
export const REDACOES_MOCK = [
  {
    id: 1,
    aluno: "Ana Beatriz Souza",
    turma: "3º Ano A",
    tema: "Os desafios para o combate à desinformação nas redes sociais no Brasil",
    status: "Pendente",
    texto: `Nos últimos anos, a popularização das redes sociais transformou a forma como os brasileiros se informam. Entretanto, esse avanço trouxe consigo um problema grave: a circulação de notícias falsas, que prejudica o debate público e coloca em risco a saúde e a democracia. Dessa forma, é fundamental discutir os desafios para combater a desinformação no país.

Em primeiro lugar, a falta de educação midiática contribui para que muitos cidadãos compartilhem conteúdos sem verificar a origem. Segundo o filósofo Zygmunt Bauman, vivemos em uma "modernidade líquida", em que as relações e as informações são instáveis e passageiras. Nesse cenário, o excesso de conteúdo rápido dificulta a reflexão crítica e favorece a propagação de boatos.

Além disso, os algoritmos das plataformas digitais privilegiam publicações que geram engajamento, o que ajuda a espalhar conteúdos sensacionalistas. Durante a pandemia de covid-19, por exemplo, informações falsas sobre vacinas circularam amplamente e levaram parte da população a duvidar da ciência.

Portanto, cabe ao Ministério da Educação incluir a educação midiática nas escolas, por meio de oficinas e projetos que ensinem a checar fontes. Cabe, ainda, às empresas de tecnologia ampliar a transparência de seus algoritmos, a fim de reduzir a disseminação de notícias falsas e fortalecer a democracia.`,
    destaques: [
      {
        tipo: "tese",
        trecho: `a circulação de notícias falsas, que prejudica o debate público e coloca em risco a saúde e a democracia`,
      },
      {
        tipo: "argumento",
        trecho: `a falta de educação midiática contribui para que muitos cidadãos compartilhem conteúdos sem verificar a origem`,
      },
      {
        tipo: "repertorio",
        trecho: `Segundo o filósofo Zygmunt Bauman, vivemos em uma "modernidade líquida"`,
      },
      {
        tipo: "argumento",
        trecho: `os algoritmos das plataformas digitais privilegiam publicações que geram engajamento`,
      },
      {
        tipo: "repertorio",
        trecho: `Durante a pandemia de covid-19, por exemplo, informações falsas sobre vacinas circularam amplamente`,
      },
    ],
    avaliacaoIA: {
      notas: { c1: 160, c2: 160, c3: 120, c4: 160, c5: 160 },
      justificativa: `Tese clara na introdução e dois argumentos bem desenvolvidos, com repertório de Bauman e da pandemia de covid-19. Há bom domínio da norma culta e uso variado de conectivos. A argumentação poderia aprofundar a relação entre os algoritmos e a desinformação.`,
    },
    correcao: null,
  },
  {
    id: 2,
    aluno: "Carlos Eduardo Lima",
    turma: "3º Ano A",
    tema: "Impactos do uso excessivo de telas na saúde mental dos jovens brasileiros",
    status: "Em Análise",
    texto: `O uso de celulares, tablets e computadores faz parte da rotina de grande parte dos adolescentes brasileiros. Apesar das facilidades que a tecnologia oferece, o tempo excessivo diante das telas tem causado prejuízos à saúde mental dos jovens, como ansiedade, insônia e isolamento social.

Um dos fatores que agravam esse quadro é a comparação constante nas redes sociais. Ao observar vidas aparentemente perfeitas, muitos estudantes passam a se sentir inferiores, o que reduz a autoestima. Essa situação dialoga com o conceito de "sociedade do espetáculo", do pensador Guy Debord, segundo o qual a imagem passa a ter mais valor do que a experiência real.

Outro ponto importante é a falta de limites no uso dos aparelhos dentro de casa. Muitos pais trabalham o dia todo e não conseguem acompanhar o que os filhos acessam, e isso faz com que os jovens durmam tarde e rendam menos nos estudos. Pesquisas de saúde pública já apontam aumento de casos de ansiedade entre adolescentes.

Logo, é necessário que a escola promova rodas de conversa sobre o uso consciente da tecnologia e que as famílias estabeleçam horários para o uso das telas, a fim de proteger a saúde mental dos jovens.`,
    destaques: [
      {
        tipo: "tese",
        trecho: `o tempo excessivo diante das telas tem causado prejuízos à saúde mental dos jovens, como ansiedade, insônia e isolamento social`,
      },
      {
        tipo: "argumento",
        trecho: `a comparação constante nas redes sociais`,
      },
      {
        tipo: "repertorio",
        trecho: `conceito de "sociedade do espetáculo", do pensador Guy Debord`,
      },
      {
        tipo: "argumento",
        trecho: `a falta de limites no uso dos aparelhos dentro de casa`,
      },
    ],
    avaliacaoIA: {
      notas: { c1: 160, c2: 160, c3: 120, c4: 160, c5: 120 },
      justificativa: `O texto apresenta tese bem definida e usa o conceito de Guy Debord de forma pertinente. Os argumentos são claros, mas o terceiro parágrafo cita pesquisas sem indicar a fonte. A proposta de intervenção traz agentes e ação, porém sem detalhar como será executada.`,
    },
    correcao: {
      notas: { c1: 160, c2: 160, c3: 160, c4: 160, c5: 120 },
      justificativa: `Concordo com a sugestão da IA, mas elevei a argumentação porque o aluno relaciona bem a comparação nas redes sociais com o conceito de Debord.`,
      comentario: `Carlos, ótima escolha de repertório! Na proposta de intervenção, detalhe como as rodas de conversa seriam realizadas.`,
    },
  },
  {
    id: 3,
    aluno: "Mariana Oliveira",
    turma: "3º Ano B",
    tema: "Desafios para a inclusão de estudantes com deficiência nas escolas brasileiras",
    status: "Revisado",
    texto: `A Constituição Federal de 1988 garante a educação como direito de todos. No entanto, na prática, muitos estudantes com deficiência ainda enfrentam barreiras para frequentar e permanecer na escola. Diante disso, é preciso analisar os desafios da inclusão nas instituições de ensino do Brasil.

Primeiramente, a falta de estrutura adequada dificulta o acesso desses alunos. Rampas, banheiros adaptados e materiais em braille ainda são escassos em muitas escolas públicas, o que limita a autonomia dos estudantes. Conforme a Lei Brasileira de Inclusão, de 2015, o poder público deve assegurar um sistema educacional inclusivo, mas esse princípio muitas vezes não sai do papel.

Ademais, a formação insuficiente dos professores agrava o problema. Sem preparo para lidar com diferentes necessidades de aprendizagem, os docentes acabam sobrecarregados, e o aluno não recebe o apoio de que precisa. O educador Paulo Freire defendia uma educação baseada no diálogo e no respeito às diferenças de cada aluno.

Portanto, o Governo Federal deve ampliar o investimento em acessibilidade e em cursos de formação continuada para professores, para que a escola seja, de fato, um espaço de todos.`,
    destaques: [
      {
        tipo: "tese",
        trecho: `muitos estudantes com deficiência ainda enfrentam barreiras para frequentar e permanecer na escola`,
      },
      {
        tipo: "argumento",
        trecho: `a falta de estrutura adequada dificulta o acesso desses alunos`,
      },
      {
        tipo: "repertorio",
        trecho: `Conforme a Lei Brasileira de Inclusão, de 2015, o poder público deve assegurar um sistema educacional inclusivo`,
      },
      {
        tipo: "argumento",
        trecho: `a formação insuficiente dos professores agrava o problema`,
      },
      {
        tipo: "repertorio",
        trecho: `O educador Paulo Freire defendia uma educação baseada no diálogo e no respeito às diferenças de cada aluno`,
      },
    ],
    avaliacaoIA: {
      notas: { c1: 200, c2: 160, c3: 160, c4: 160, c5: 160 },
      justificativa: `Boa contextualização com a Constituição Federal e uso pertinente da Lei Brasileira de Inclusão. Argumentos organizados em dois parágrafos, com progressão lógica. A proposta apresenta agente, ação e finalidade, mas o detalhamento é limitado.`,
    },
    correcao: {
      notas: { c1: 200, c2: 160, c3: 160, c4: 160, c5: 200 },
      justificativa: `Texto bem estruturado, com repertório legítimo e produtivo. Elevei a competência 5 porque a proposta apresenta agente, ação e finalidade, com detalhamento do investimento em acessibilidade e da formação continuada dos professores.`,
      comentario: `Parabéns, Mariana! Para os próximos textos, explore mais exemplos concretos no segundo argumento.`,
    },
  },
  {
    id: 4,
    aluno: "João Pedro Santos",
    turma: "2º Ano A",
    tema: "Desafios para a preservação da Amazônia",
    status: "Pendente",
    texto: `A Amazônia é a maior floresta tropical do mundo e tem grande importância para o Brasil. Porém, o desmatamento e as queimadas vem aumentando e isso é um problema para todos.

Uma das causas do desmatamento é a exploração ilegal de madeira. Muitos madeireiros entram na floresta sem autorização e derrubam as árvores, e a fiscalização não consegue chegar em todos os lugares. Com isso, animais perdem seu habitat e algumas espécies correm risco de extinção.

Outro problema são as queimadas, que liberam muita fumaça e prejudicam a saúde das pessoas que moram na região. Na escola eu aprendi que a floresta ajuda a regular a chuva em várias partes do país.

Portanto, o governo deveria fiscalizar mais e punir quem desmata, e as pessoas deveriam ajudar a preservar a natureza.`,
    destaques: [
      {
        tipo: "tese",
        trecho: `o desmatamento e as queimadas vem aumentando e isso é um problema para todos`,
      },
      {
        tipo: "argumento",
        trecho: `Uma das causas do desmatamento é a exploração ilegal de madeira`,
      },
      {
        tipo: "argumento",
        trecho: `Outro problema são as queimadas, que liberam muita fumaça e prejudicam a saúde das pessoas que moram na região`,
      },
    ],
    avaliacaoIA: {
      notas: { c1: 120, c2: 80, c3: 80, c4: 120, c5: 80 },
      justificativa: `A tese está presente, mas é genérica. Os argumentos são curtos e nenhum repertório sociocultural foi identificado. Há desvios pontuais de concordância (o desmatamento e as queimadas vem aumentando) e a proposta de intervenção é vaga, sem indicar meios de execução.`,
    },
    correcao: null,
  },
  {
    id: 5,
    aluno: "Larissa Ferreira",
    turma: "3º Ano B",
    tema: "Desigualdade no acesso à internet e seus reflexos na educação brasileira",
    status: "Em Análise",
    texto: `A internet se tornou uma ferramenta indispensável para o aprendizado, permitindo pesquisas, aulas remotas e acesso a conteúdos de qualidade. Contudo, a desigualdade no acesso à rede no Brasil faz com que milhões de estudantes fiquem em desvantagem, o que amplia as diferenças sociais existentes no país.

Em primeiro lugar, o custo dos planos de internet e dos aparelhos é elevado para famílias de baixa renda. Muitos alunos dependem de um único celular compartilhado em casa, o que dificulta a realização de tarefas escolares. Na pandemia de covid-19, essa realidade ficou evidente, pois milhares de estudantes ficaram sem aulas por não terem conexão.

Além disso, as escolas públicas, sobretudo as de regiões rurais, nem sempre possuem laboratórios de informática ou sinal estável. Segundo o sociólogo Pierre Bourdieu, o capital cultural transmitido pela família e pelo ambiente influencia o desempenho escolar, o que mostra que a falta de acesso tecnológico reforça desigualdades que já existem.

Dessa maneira, o Ministério das Comunicações, em parceria com as prefeituras, deve ampliar a oferta de internet gratuita nas escolas, por meio de programas de conectividade, para garantir oportunidades iguais a todos os estudantes.`,
    destaques: [
      {
        tipo: "tese",
        trecho: `a desigualdade no acesso à rede no Brasil faz com que milhões de estudantes fiquem em desvantagem`,
      },
      {
        tipo: "argumento",
        trecho: `o custo dos planos de internet e dos aparelhos é elevado para famílias de baixa renda`,
      },
      {
        tipo: "repertorio",
        trecho: `Na pandemia de covid-19, essa realidade ficou evidente, pois milhares de estudantes ficaram sem aulas por não terem conexão`,
      },
      {
        tipo: "argumento",
        trecho: `as escolas públicas, sobretudo as de regiões rurais, nem sempre possuem laboratórios de informática ou sinal estável`,
      },
      {
        tipo: "repertorio",
        trecho: `Segundo o sociólogo Pierre Bourdieu, o capital cultural transmitido pela família e pelo ambiente influencia o desempenho escolar`,
      },
    ],
    avaliacaoIA: {
      notas: { c1: 200, c2: 200, c3: 160, c4: 160, c5: 160 },
      justificativa: `Tese clara e bem posicionada. Os dois repertórios (pandemia de covid-19 e Pierre Bourdieu) estão relacionados ao tema e bem explorados. Texto coeso, com poucos desvios gramaticais. A proposta tem agente, ação e finalidade, mas poderia detalhar melhor o alcance do programa nas regiões rurais.`,
    },
    correcao: null,
  },
];
