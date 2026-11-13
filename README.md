# CorretorNota1000 - Sistema de Apoio à Correção Transparente
**Dupla:** João A. e Bianca

**Tema:** Problemas na correção de redações.

Os sistemas digitais de correção podem apresentar dificuldades para interpretar argumentos, repertórios, organização textual e particularidades da escrita dos estudantes. Há necessidade de maior transparência nos critérios de avaliação, possibilidade de revisão e participação efetiva do professor na análise das produções.

**Link dos slides:** https://canva.link/up1v9q2jvse7y2t

**Link do docs mais detalhado sobre o sistema:** https://docs.google.com/document/d/1g5bD9cQtRPpquHvug_lLa0pcdJJckEZ8Ccmr4Rn90k0/edit?usp=sharing

**Link do GitHub:** https://github.com/bianca-siqueira/Desenvolvimento_Web/tree/main

---

# Descrição do sistema

**Problema:** os sistemas automatizados de correção de redação muitas vezes carecem de transparência e falham ao interpretar repertórios socioculturais, estruturas argumentativas e particularidades da escrita dos estudantes da educação básica.

**Usuários-alvo:** professores da educação básica, que precisam agilizar as correções sem perder o controle pedagógico, e estudantes, que precisam de devolutivas claras e fundamentadas.

**Papel da IA:** o sistema funciona como um assistente de copilotagem. A IA faz uma pré-avaliação da redação, identificando tese, argumentos e repertório sociocultural, e sugere notas para cada critério. O professor visualiza os destaques, ajusta as notas, revisa as justificativas e escreve comentários antes de liberar o feedback final ao estudante.

---

# Sprint 1

Nesta primeira sprint, foi desenvolvido o frontend da aplicação, com foco na organização visual, apresentação das redações e formulário de revisão pelo professor.

## Tecnologias

- Next.js (apenas como frontend)
- React (hook `useState` para o gerenciamento de estado)
- Tailwind CSS

## Como executar

Pré-requisito: Node.js 18 ou superior.

Acesse a pasta do frontend:

```bash
cd front
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

Depois, abra http://localhost:3000 no navegador.

### Versão estática

```bash
npm run build
```

O site estático é gerado na pasta `out/`.

## Estrutura de pastas

```text
front/
└── src/
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

> Nesta Sprint 1, os destaques e as notas da IA são **dados fictícios (mock)**. A integração real com IA será feita nas próximas sprints.

---

# Sprint 2

## 1. Visão geral

Nesta segunda sprint, foi desenvolvido o backend da aplicação, utilizando FastAPI e integração com a inteligência artificial Google Gemini.

**Papel da IA:** a IA atua como uma copiloto, não como decisora. Ela recebe a redação, realiza a análise e sugere uma nota de 0 a 200 para cada uma das cinco competências do ENEM, além de elaborar uma justificativa e identificar no texto os trechos correspondentes à tese, aos argumentos e ao repertório sociocultural.

O professor continua sendo responsável pela avaliação final, podendo revisar as sugestões, ajustar as notas e liberar o feedback ao estudante.

## 2. Arquitetura

O projeto está dividido em frontend e backend.

O frontend foi desenvolvido com Next.js/React e Tailwind CSS. O backend utiliza Python e FastAPI. A comunicação entre as aplicações é feita por HTTP, com dados no formato JSON.

O backend recebe a redação, valida os dados recebidos, solicita a análise ao Google Gemini e valida a estrutura da resposta antes de devolvê-la.

**Fluxo de funcionamento previsto:**

Professor → Frontend → endpoint `POST /redacoes/corrigir` → schema Pydantic → serviço de IA → Google Gemini → validação da resposta → JSON para o frontend.

## 3. Estrutura de pastas

```text
.
├── backend/
│   ├── main.py            # cria o app FastAPI, CORS e registra as rotas
|   ├── config.py
│   ├── routers/
│   │   └── redacoes.py         # endpoint POST /redacoes/corrigir
│   ├── schemas/
│   │   └── redacao.py          # modelos Pydantic de entrada e saída
│   ├── services/
│   │   └── ia_service.py       # prompt e chamada ao Gemini
│   ├── requirements.txt        # dependências do backend
│   └── .env                   # variáveis de ambiente (NÃO vai para o Git)
│
├── front/
│   ├── src/
│   │   ├── app/
│   │   │   ├── estilo.css
│   │   │   ├── layout.js
│   │   │   └── page.js
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── StatusBadge.js
│   │   │   ├── RedacaoList.js
│   │   │   ├── LeitorRedacao.js
│   │   │   ├── DestaqueIA.js
│   │   │   ├── FormularioCorrecao.js
│   │   │   └── CriterioInput.js
│   │   ├── mock/
│   │   │   └── redacoesMock.js
│   │   └── utils/
│   │       └── notas.js
│   ├── package.json
│   └── next.config.js
│
└── README.md
```

O backend é dividido em pastas e cada uma faz uma coisa só. A pasta `routers` recebe o pedido e devolve a resposta ou o erro, a `schemas` define o formato dos dados e confere se estão certos, e a `services` conversa com a IA, montando o prompt e chamando o Gemini. O `main.py` junta tudo e liga a aplicação.

Com essa divisão, se eu quiser trocar a IA, mexo só na `services`, sem quebrar o resto.

## 4. Backend em detalhes

### 4.1 Como executar localmente (Ubuntu/Linux)

Pré-requisitos: Python 3.10 ou superior e Git.

Primeiro, acesse a pasta do backend:

```bash
cd backend
```

Crie o ambiente virtual (caso ainda não exista):

```bash
python3 -m venv venv
```

Ative o ambiente virtual:

```bash
source venv/bin/activate
```

Instale as dependências do projeto:

```bash
pip install -r requirements.txt
```

Crie um arquivo chamado `.env` dentro da pasta `backend/`, contendo as seguintes variáveis:

```env
GEMINI_API_KEY=sua_chave_aqui
GEMINI_MODEL=identificador_do_modelo_gemini
```

A variável `GEMINI_API_KEY` contém a chave de acesso à API do Google Gemini. Já `GEMINI_MODEL` define o modelo utilizado para realizar a correção das redações.

**Importante:** o arquivo `.env` deve permanecer local e não deve ser enviado ao GitHub. A chave da API é uma informação privada.

### 4.2 Executando e acessando pelo endereço IP

Para iniciar o servidor e permitir que outros dispositivos da mesma rede local acessem o backend, execute dentro da pasta `backend/`:

```bash
uvicorn main:app --reload --host 0.0.0.0
```

A documentação poderá ser acessada pelo endereço:

```text
http://IP_DA_MAQUINA:8000/docs
```

Por exemplo:

```text
http://192.168.1.100:8000/docs
```

### 4.3 Hospedagem no Render

O backend também está hospedado na plataforma Render, permitindo o acesso público à API sem a necessidade de executar o servidor localmente.


**Endereços para acesso:**

- API hospedada: https://desenvolvimento-web-api.onrender.com
- Documentação automática (Swagger): https://desenvolvimento-web-api.onrender.com/docs
- Endpoint de correção: https://desenvolvimento-web-api.onrender.com/redacoes/corrigir

## 5. Endpoints

A API disponibiliza os seguintes endpoints:

| Método | Rota | O que faz | Respostas |
|---|---|---|---|
| GET | `/` | Health check simples | 200 |
| POST | `/redacoes/corrigir` | Recebe uma redação e devolve a correção sugerida pela IA | 200, 422, 502, 503 |
| GET | `/docs` | Swagger gerado automaticamente | 200 |

### 5.1 Endpoint de correção

**Método:** POST

**Rota:** `/redacoes/corrigir`

O endpoint recebe uma redação em formato JSON e retorna uma avaliação realizada pela IA.

### 5.2 Validação dos dados

A validação das informações é realizada utilizando Pydantic.

O texto recebido deve possuir no mínimo 50 e no máximo 15.000 caracteres.

Cada uma das cinco competências do ENEM recebe uma pontuação entre 0 e 200, utilizando exclusivamente os seguintes valores em intervalos como no ENEM de 40 em 40 pontos.
A resposta da IA também é validada antes de ser enviada ao frontend, garantindo que as notas, a justificativa e os destaques estejam no formato esperado.

### 5.3 Códigos de erro

| Código | Quando acontece |
|---|---|
| 422 | O corpo da requisição não respeita o schema, por exemplo, texto com menos de 50 ou mais de 15.000 caracteres. Gerado pelo próprio FastAPI. |
| 503 | Chave da API Gemini não configurada no servidor. |
| 502 | Falha ao falar com o Gemini (timeout, modelo inválido ou resposta inadequada). 502 = "Bad Gateway": o problema está no serviço externo, não na nossa API. |

---

