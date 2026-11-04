# CorretorEdu - Sistema de Apoio à Correção Transparente

**Dupla:** João A. e Bianca

## Descrição do sistema

**Problema:** os sistemas automatizados de correção de redação muitas vezes carecem de transparência e falham ao interpretar repertórios socioculturais, estruturas argumentativas e particularidades da escrita dos estudantes da educação básica.

**Usuários-alvo:** professores da educação básica, que precisam agilizar as correções sem perder o controle pedagógico, e estudantes, que precisam de devolutivas claras e fundamentadas.

**Papel da IA:** o sistema funciona como um assistente de copilotagem. A IA faz uma pré-avaliação da redação, identificando tese, argumentos e repertório sociocultural, e sugere notas para cada critério. O professor visualiza os destaques, ajusta as notas, revisa as justificativas e escreve comentários antes de liberar o feedback final ao estudante.

> Nesta Sprint 1, os destaques e as notas da IA são **dados fictícios (mock)**. A integração real com IA será feita nas próximas sprints.

## Tecnologias

- Next.js (apenas como frontend)
- React (hook `useState` para o gerenciamento de estado)
- Tailwind CSS

## Como executar

Pré-requisito: Node.js 18 ou superior.

```bash
npm install
npm run dev
```

Depois, abra http://localhost:3000 no navegador.

### Versão estática

```bash
npm run build
```

O site estático é gerado na pasta `out/`.

## Estrutura de pastas

```
src/
├── app/
│   ├── estilo.css          # estilos globais (Tailwind)
│   ├── layout.js           # layout raiz
│   └── page.js             # página principal e estados (useState)
├── components/
│   ├── Header.js           # barra superior
│   ├── StatusBadge.js      # etiqueta de status (Pendente, Em Análise, Revisado)
│   ├── RedacaoList.js      # listagem de redações (painel esquerdo)
│   ├── LeitorRedacao.js    # leitura da redação (painel superior direito)
│   ├── DestaqueIA.js       # trechos destacados pela IA
│   ├── FormularioCorrecao.js # formulário de revisão (painel inferior direito)
│   └── CriterioInput.js    # campo de nota de cada critério
├── mock/
│   └── redacoesMock.js     # redações, critérios e sugestões de IA fictícias
└── utils/
    └── notas.js            # cálculo das notas
```

## Estados da página (`src/app/page.js`)

- `redacoes`: lista de redações com as avaliações (dados mockados).
- `selectedId`: identificador da redação selecionada.
- `feedback`: mensagem visual exibida ao professor após uma ação.

## Funcionalidades da Sprint 1

- Listagem de redações com status e nota.
- Leitura da redação com destaques da IA (tese, argumentos e repertório).
- Formulário de correção com validação das notas e feedback visual (sucesso, erro e informação).
- Salvar rascunho (status "Em Análise") e liberar feedback ao aluno (status "Revisado").
- Contador de redações pendentes atualizado no cabeçalho.
