
import React from 'react';
import type { Section, ProcessStepItem, InteractiveDemoData } from '../types';
import { 
  Card, CodeBlock, Button, Tooltip, ProcessFlowCard, InteractiveDemoBlock, SectionHeader, IconTextItem, CharacterCard, Alert, MermaidCodeBlock, Table, FeatureList, ExternalLink, Badge,
  BrainIcon, LightBulbIcon, CodeBracketIcon, PuzzlePieceIcon, WrenchScrewdriverIcon, PlayIcon, DocumentTextIcon, CogIcon, CommandLineIcon, LinkIcon
} from '../components/ui';

const simulateAgentResponse = async (input: string): Promise<React.ReactNode> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (input.toLowerCase().includes('cartão') || input.toLowerCase().includes('card')) {
    return (
      <>
        <p>🤖 <strong>Agent processou:</strong></p>
        <p>📝 Comando: "{input}"</p>
        <p>🔧 Ferramenta: get-card-by-uuid</p>
        <p>✅ Resultado: Cartão encontrado - Status: Ativo, Limite: R$ 5.000</p>
      </>
    );
  } else if (input.toLowerCase().includes('saldo')) {
     return (
      <>
        <p>🤖 <strong>Agent processou:</strong></p>
        <p>📝 Comando: "{input}"</p>
        <p>🔧 Ferramenta: get-balance</p>
        <p>✅ Resultado: Saldo atual: R$ 1.250,00</p>
      </>
    );
  }
  return (
    <>
      <p>🤖 <strong>Agent processou:</strong></p>
      <p>📝 Comando: "{input}"</p>
      <p>🔧 Analisando qual ferramenta usar...</p>
      <p>✅ Comando executado com sucesso!</p>
    </>
  );
};

const simulateBrainApiResponse = async (input: string): Promise<React.ReactNode> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  if (input.toLowerCase().includes('status')) {
    return (
      <>
        <p>🧠 <strong>BrainAPI:</strong> Consultei seu cartão!</p>
        <p>📊 Status: Ativo | Limite: R$ 5.000 | Disponível: R$ 3.750</p>
        <p>🔒 Sem bloqueios | Última transação: Hoje às 14:30</p>
      </>
    );
  } else if (input.toLowerCase().includes('fatura')) {
     return (
      <>
        <p>🧠 <strong>BrainAPI:</strong> Aqui está sua fatura!</p>
        <p>📅 Dezembro 2024: R$ 1.250,00</p>
        <p>📆 Vencimento: 15/01/2025 | Status: Em aberto</p>
      </>
    );
  }
   return (
    <>
      <p>🧠 <strong>BrainAPI:</strong> Entendi sua pergunta "{input}"</p>
      <p>🔧 Executando a ação apropriada...</p>
      <p>✅ Processado com sucesso! Como posso ajudar mais?</p>
    </>
  );
};

const agentDemoData: InteractiveDemoData = {
  id: "agent-demo",
  title: "🎯 Experimente um Agent em ação:",
  inputPlaceholder: "Digite algo como: 'Consulte o cartão com UUID abc123'",
  buttonText: "Enviar para o Agent",
  initialOutput: "Aguardando comando...",
  onSimulate: simulateAgentResponse
};

const brainAPIDemoData: InteractiveDemoData = {
  id: "brainapi-demo",
  title: "🎯 Simulação do BrainAPI:",
  inputPlaceholder: "Experimente: 'Qual o status do meu cartão?' ou 'Consulte a fatura de dezembro'",
  buttonText: "Perguntar ao BrainAPI",
  initialOutput: "Pronto para responder suas perguntas sobre cartões!",
  onSimulate: simulateBrainApiResponse
};

const introProcessSteps: ProcessStepItem[] = [
  { id: 's1', number: '1', title: 'Agents', description: 'Assistentes inteligentes que entendem linguagem natural e executam ações.' },
  { id: 's2', number: '2', title: 'MCP Protocol', description: 'Protocolo padrão para conectar LLMs a fontes de dados e ferramentas.' },
  { id: 's3', number: '3', title: 'MCP toolbox', description: 'Servidor MCP para expor ferramentas de forma padronizada.' },
  { id: 's4', number: '4', title: 'Google ADK', description: 'Framework do Google para desenvolvimento robusto de agentes de IA.' },
  { id: 's5', number: '5', title: 'OpenAPI', description: 'Tradução automática de especificações de API em ferramentas para Agents.' },
];

export const sectionsData: Section[] = [
  {
    id: 'visao-geral',
    navLabel: 'Visão Geral',
    mainTitle: 'Bem-vindo ao BrainAPI!',
    subTitle: 'Aprenda como criar sistemas de IA que conversam com APIs usando linguagem natural, transformando especificações em respostas inteligentes.',
    heroImage: 'https://picsum.photos/seed/image-1/800/300',
    icon: <LightBulbIcon />,
    content: (
      <div className="space-y-8">
        <CharacterCard imageUrl="https://picsum.photos/seed/brainapi-character/160/160" altText="BrainAPI Character">
          <h3 className="text-2xl font-semibold text-primary-blue mb-3">Olá! Eu sou o BrainAPI 🧠</h3>
          <p>Sou um assistente inteligente que vai te guiar na jornada de criar sistemas de IA capazes de "conversar" com APIs usando linguagem natural. Imagine poder dizer <strong>"Consulte meu saldo"</strong> e seu sistema entender exatamente qual API chamar e como fazer isso!</p>
          <p>Neste guia, você aprenderá conceitos fundamentais de forma técnica, prática e visualmente atraente.</p>
        </CharacterCard>

        <Card>
          <h3 className="text-xl font-semibold text-primary-blue mb-4">O que é o BrainAPI?</h3>
          <p className="text-brand-gray-700 mb-4">
            O <strong>BrainAPI</strong> é um sistema inovador que combina Inteligência Artificial conversacional com APIs REST. Ele permite que usuários interajam com suas APIs utilizando linguagem natural. Em vez de realizar chamadas HTTP manuais (via curl, Postman, etc.), você pode simplesmente perguntar:
          </p>
          <CodeBlock language="text" code={'Qual o status do cartão com UUID b4ff0172-3a01-4aca-96f0-72247c5ba34c?'} />
          <p className="text-brand-gray-700 mt-4">E o sistema, de forma autônoma:</p>
          <ol className="list-decimal list-inside space-y-2 my-4 text-brand-gray-700 pl-4">
            <li><strong>Entende</strong> sua intenção usando IA.</li>
            <li><strong>Identifica</strong> qual API específica precisa ser chamada.</li>
            <li><strong>Executa</strong> a chamada HTTP apropriada para essa API.</li>
            <li><strong>Retorna</strong> a resposta de forma clara e em linguagem natural.</li>
          </ol>
        </Card>
        
        <Card>
          <h3 className="text-xl font-semibold text-primary-blue mb-4">🌟 Principais Características</h3>
          <FeatureList items={[
            { icon: <BrainIcon />, title: "Interface Natural", description: "Converse com APIs usando linguagem humana, de forma intuitiva." },
            { icon: <CogIcon />, title: "Conversão Automática", description: "Transforme especificações OpenAPI em Ferramentas MCP de forma automática." },
            { icon: <LightBulbIcon />, title: "IA Avançada", description: "Potencializado por Google Gemini via ADK (ou qualquer LLM, inclusive locais)." },
            { icon: <PuzzlePieceIcon />, title: "Containerizado", description: "Deploy simplificado e portabilidade garantida com Docker." },
            { icon: <CodeBracketIcon />, title: "Interface Web", description: "WebServer integrado para interação e demonstração fácil." },
            { icon: <WrenchScrewdriverIcon />, title: "Extensível", description: "Adicione novas APIs e funcionalidades com facilidade." },
          ]} />
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
          {introProcessSteps.map(step => <ProcessFlowCard key={step.id} step={step} />)}
        </div>
         <div className="text-center mt-8 space-x-2">
            <Badge variant="java">Java 17+</Badge>
            <Badge variant="spring">Spring Boot 3.x</Badge>
            <Badge variant="adk">Google ADK</Badge>
            <Badge variant="mcp">MCP Compatible</Badge>
            <Badge variant="node">Node.js</Badge>
            <Badge variant="docker">Docker Ready</Badge>
            <Badge variant="openapi">OpenAPI 3.1</Badge>
          </div>
      </div>
    ),
  },
  {
    id: 'arquitetura',
    navLabel: 'Arquitetura',
    mainTitle: 'Arquitetura do BrainAPI',
    subTitle: 'Entenda como os componentes do BrainAPI se conectam e interagem para fornecer respostas inteligentes.',
    icon: <PuzzlePieceIcon />,
    content: (
      <div className="space-y-8">
        <Card>
          <p className="text-brand-gray-700 mb-4">O BrainAPI é composto por três componentes principais (gerador de ferramenta, agente e mcp toolbox) que trabalham em conjunto para transformar suas especificações de API em uma interface conversacional inteligente.</p>
          <MermaidCodeBlock title="Fluxo de Dados Principal" code={`
flowchart LR
    subgraph "Usuário & Especificações"
        direction LR
        Usuario["👤 Usuário"]
        OpenAPISpec["📄 openAPI.json (spec)"]
    end

    subgraph "Sistema BrainAPI"
        direction TB
        AgentADK["🧠 BrainAPI Agent (ADK)"]
        LLM["💡 LLM (Gemini)"]
        MCPToolbox["🛠️ MCP Toolbox (Servidor)"]
        ToolGenerator["⚙️ openapi2mcp-toolbox (Gerador)"]
        GeneratedTool["🧩 Tool Gerada (tools.json)"]
    end
    
    Usuario --> AgentADK
    AgentADK --> LLM
    LLM --> MCPToolbox
    
    OpenAPISpec --> ToolGenerator
    ToolGenerator --> GeneratedTool
    GeneratedTool --> MCPToolbox

    MCPToolbox --> ExternalAPI["🌐 API Externa"]


    classDef user fill:#e0f2fe,stroke:#0284c7,stroke-width:2px,color:#0369a1;
    classDef spec fill:#fefce8,stroke:#ca8a04,stroke-width:2px,color:#854d0e;
    classDef system fill:#f0fdf4,stroke:#16a34a,stroke-width:2px,color:#15803d;
    classDef external fill:#f3e8ff,stroke:#7e22ce,stroke-width:2px,color:#581c87;

    class Usuario user;
    class OpenAPISpec spec;
    class AgentADK,LLM,MCPToolbox,ToolGenerator,GeneratedTool system;
    class ExternalAPI external;
          `} />
        </Card>

        <Card>
          <h3 className="text-xl font-semibold text-primary-blue mb-4">🔄 Fluxo de Funcionamento Detalhado</h3>
          <ol className="list-decimal list-inside space-y-3 text-brand-gray-700 pl-4">
            <li><strong>📝 Especificação da API:</strong> As APIs que o BrainAPI irá consumir são documentadas no formato OpenAPI (por exemplo, `openapi.json` ou `openapi.yaml`). Este arquivo descreve os endpoints, parâmetros, e modelos de dados da API.</li>
            <li><strong>⚙️ Geração de Ferramentas:</strong> O componente `openapi2mcp-toolbox` lê a especificação OpenAPI. Para cada endpoint da API, ele gera uma "ferramenta" correspondente no formato `tools.json`. Este arquivo é compatível com o Model Context Protocol (MCP).</li>
            <li><strong>🚀 Hospedagem das Ferramentas:</strong> O `MCP Toolbox` (geralmente rodando em um container Docker) carrega o arquivo `tools.json`. Ele atua como um servidor, expondo essas ferramentas através do protocolo MCP. Agora, as funcionalidades da API estão acessíveis de forma padronizada.</li>
            <li><strong>🧠 Processamento da Linguagem Natural:</strong> Um usuário interage com o `ADK Agent` (o "cérebro" do BrainAPI) através de uma interface (por exemplo, web). O Agent utiliza um Modelo de Linguagem Grande (LLM), como o Google Gemini, para entender a pergunta do usuário em linguagem natural.</li>
            <li><strong>🛠️ Seleção e Execução da Ferramenta:</strong> Com base na intenção do usuário, o LLM instrui o Agent sobre qual ferramenta MCP (originada da API) deve ser usada e com quais parâmetros. O Agent, então, comunica-se com o `MCP Toolbox` para invocar a ferramenta selecionada.</li>
            <li><strong>📡 Chamada à API Externa:</strong> O `MCP Toolbox`, ao receber a requisição do Agent, executa a chamada HTTP real para o endpoint da API externa correspondente à ferramenta invocada.</li>
            <li><strong>💬 Formulação e Entrega da Resposta:</strong> A API externa retorna os dados. O Agent (com auxílio do LLM) formata esses dados em uma resposta compreensível em linguagem natural e a entrega de volta ao usuário.</li>
          </ol>
        </Card>
        
        <SectionHeader title="🧩 Componentes Detalhados" subtitle="Uma visão mais aprofundada de cada peça fundamental do BrainAPI."/>
        
        <div className="space-y-6">
          <Card>
            <h4 className="text-lg font-semibold text-primary-blue mb-2">1. OpenAPI → MCP Generator (`openapi2mcp-toolbox`)</h4>
            <IconTextItem icon={<CogIcon className="text-accent-teal"/>}>
              <strong>Função:</strong> Converte especificações OpenAPI (Swagger) em um arquivo `tools.json` que descreve as ferramentas no formato do Model Context Protocol. Essencialmente, traduz seus endpoints de API em "habilidades" que um Agent de IA pode entender e usar.
            </IconTextItem>
            <IconTextItem icon="📄"><strong>Input:</strong> Um arquivo `openapi.yaml` ou `openapi.json` contendo as definições da sua API. </IconTextItem>
            <IconTextItem icon="🧩"><strong>Output:</strong> Um arquivo `tools.json` que lista as ferramentas MCP correspondentes aos endpoints da API. </IconTextItem>
            <IconTextItem icon={<CodeBracketIcon className="text-accent-teal"/>}><strong>Tecnologia Principal:</strong> Java, utilizando bibliotecas para parsing de OpenAPI e geração de JSON. </IconTextItem>
          </Card>

          <Card>
            <h4 className="text-lg font-semibold text-primary-blue mb-2">2. MCP Toolbox (Servidor Docker)</h4>
             <IconTextItem icon={<WrenchScrewdriverIcon className="text-accent-teal"/>}>
              <strong>Função:</strong> Atua como um servidor que hospeda as ferramentas definidas no `tools.json`. Ele expõe essas ferramentas através do Model Context Protocol (MCP), permitindo que clientes MCP (como o ADK Agent) descubram e invoquem essas ferramentas.
            </IconTextItem>
            <IconTextItem icon="📜"><strong>Protocolo:</strong> Implementa o Model Context Protocol (MCP), um padrão aberto da Anthropic para comunicação entre LLMs e ferramentas externas. </IconTextItem>
            <IconTextItem icon="↔️"><strong>Interface:</strong> Geralmente se comunica via HTTP e Server-Sent Events (SSE) para interações em tempo real. </IconTextItem>
            <IconTextItem icon={<PuzzlePieceIcon className="text-accent-teal"/>}><strong>Tecnologia Principal:</strong> Normalmente executado como um container Docker, o que garante portabilidade e isolamento. </IconTextItem>
          </Card>

          <Card>
            <h4 className="text-lg font-semibold text-primary-blue mb-2">3. ADK Agent (Java + WebServer)</h4>
            <IconTextItem icon={<BrainIcon className="text-accent-teal"/>}>
              <strong>Função:</strong> É o componente central de IA que interage com o usuário. Ele processa os inputs em linguagem natural, utiliza um LLM (como Gemini) para entender a intenção, e decide qual ferramenta MCP (disponibilizada pelo MCP Toolbox) chamar para satisfazer a requisição do usuário.
            </IconTextItem>
            <IconTextItem icon="🚀"><strong>Framework:</strong> Construído sobre o Google Agent Development Kit (ADK), que fornece uma estrutura robusta para criar agentes de IA. </IconTextItem>
            <IconTextItem icon="💡"><strong>LLM:</strong> Integra-se com Modelos de Linguagem Grandes (LLMs), como o Google Gemini 2.0 Flash (mas pode ser configurado para usar outros, inclusive LLMs locais), para as capacidades de compreensão e raciocínio. </IconTextItem>
            <IconTextItem icon="🌐"><strong>Interface:</strong> Inclui um WebServer integrado (geralmente Spring Boot se for ADK Java) que fornece uma UI web para interação e, opcionalmente, APIs para integração programática. </IconTextItem>
          </Card>
        </div>
      </div>
    ),
  },
   {
    id: 'pre-requisitos',
    navLabel: 'Pré-requisitos',
    mainTitle: '📋 Pré-requisitos de Ambiente',
    subTitle: 'Certifique-se de que seu ambiente está preparado para rodar o BrainAPI.',
    icon: <WrenchScrewdriverIcon />,
    content: (
      <div className="space-y-8">
        <Card>
          <h3 className="text-xl font-semibold text-primary-blue mb-4">🔧 Software Necessário</h3>
          <p className="text-brand-gray-700 mb-6">Antes de começar a instalação, garanta que os seguintes componentes estejam instalados e configurados corretamente em seu sistema:</p>
          <Table 
            headers={["Componente", "Versão Mínima", "Download Sugerido"]}
            rows={[
              [<strong>Java JDK</strong>, "17+", <ExternalLink href="https://openjdk.java.net/">OpenJDK</ExternalLink>],
              [<strong>Maven</strong>, "3.6+", <ExternalLink href="https://maven.apache.org/">Apache Maven</ExternalLink>],
              [<strong>Docker</strong>, "20.0+", <ExternalLink href="https://www.docker.com/">Docker Desktop</ExternalLink>],
              [<strong>Node.js</strong>, "16+", <ExternalLink href="https://nodejs.org/">Node.js LTS</ExternalLink>],
              [<strong>Git</strong>, "2.0+", <ExternalLink href="https://git-scm.com/">Git SCM</ExternalLink>],
            ]}
          />
        </Card>

        <Card>
          <h3 className="text-xl font-semibold text-primary-blue mb-4">🔑 Chaves de API</h3>
           <IconTextItem icon="🔑">
            <strong>Google AI Studio API Key:</strong> É necessária para que o ADK Agent utilize os modelos Gemini do Google.
            <ul className="list-disc pl-6 mt-2 text-sm">
              <li>Obtenha sua chave em: <ExternalLink href="https://aistudio.google.com/">Google AI Studio</ExternalLink>.</li>
              <li>Após obter a chave, você precisará configurá-la como uma variável de ambiente chamada <code>GOOGLE_API_KEY</code>. Veja a seção de instalação para detalhes.</li>
            </ul>
          </IconTextItem>
        </Card>

        <Card>
          <h3 className="text-xl font-semibold text-primary-blue mb-4">✅ Verificação do Ambiente</h3>
          <p className="text-brand-gray-700 mb-4">Você pode verificar se os componentes estão instalados corretamente executando os seguintes comandos no seu terminal:</p>
          <CodeBlock language="bash" title="Comandos de Verificação" code={`
# Verificar Java
java -version

# Verificar Maven
mvn -version

# Verificar Docker (garanta que o Docker Desktop/daemon esteja rodando)
docker --version

# Verificar Node.js
node --version
npm --version

# Verificar Git
git --version
          `} />
          <Alert type="info" title="Dica sobre Docker" className="mt-4">
            Para Docker, além de verificar a versão, certifique-se de que o serviço Docker (daemon) esteja em execução. No Windows e macOS, isso geralmente significa ter o Docker Desktop rodando.
          </Alert>
        </Card>
      </div>
    ),
  },
  {
    id: 'instalacao',
    navLabel: 'Instalação',
    mainTitle: '🚀 Instalação e Configuração',
    subTitle: 'Siga estos passos para colocar o BrainAPI em funcionamento no seu ambiente local.',
    icon: <PlayIcon />,
    content: (
      <div className="space-y-8">
        <ProcessFlowCard step={{ id: 'clone', number: '1️⃣', title: 'Clone o Repositório', description: (
          <CodeBlock language="bash" code={`
git clone https://github.com/cesarschutz/BrainAPI.git
cd BrainAPI
          `} />
        )}} />

        <ProcessFlowCard step={{ id: 'apikey', number: '2️⃣', title: 'Configuração da API Key', description: (
          <>
            <p className="text-sm text-brand-gray-600 mb-2">Defina a variável de ambiente <code>GOOGLE_API_KEY</code> com a sua chave obtida do Google AI Studio.</p>
            <CodeBlock language="bash" title="Linux/macOS" code={'export GOOGLE_API_KEY="sua-chave-do-google-ai-studio"'} />
            <CodeBlock language="powershell" title="Windows (PowerShell)" code={'$env:GOOGLE_API_KEY="sua-chave-do-google-ai-studio"'} />
            <CodeBlock language="batch" title="Windows (CMD)" code={'set GOOGLE_API_KEY=sua-chave-do-google-ai-studio'} />
            <Alert type="info" title="Persistência da Variável" className="mt-3 text-xs">
              Lembre-se que definir variáveis assim geralmente é para a sessão atual do terminal. Para torná-las permanentes, adicione ao seu perfil do shell (<code>.bashrc</code>, <code>.zshrc</code>, etc.) ou às variáveis de ambiente do sistema.
            </Alert>
          </>
        )}} />

        <ProcessFlowCard step={{ id: 'gentools', number: '3️⃣', title: 'Geração das Ferramentas MCP', description: (
          <>
            <p className="text-sm text-brand-gray-600 mb-2">Este passo compila o gerador e cria o arquivo <code>tools.json</code> a partir da especificação OpenAPI.</p>
            <CodeBlock language="bash" code={`
# Navegar para o diretório do gerador
cd openapi2mcp-toolbox

# Compilar o projeto (isso pode levar alguns momentos na primeira vez)
mvn clean package

# Gerar o arquivo tools.json na raiz do projeto
java -jar target/openapi-mcp-1.0-jar-with-dependencies.jar > ../tools.json

# Voltar para o diretório raiz do projeto
cd ..
            `} />
            <Alert type="success" title="Verificação" className="mt-3 text-xs">
              Após este passo, você deve ter um arquivo <code>tools.json</code> na pasta raiz do projeto BrainAPI.
            </Alert>
          </>
        )}} />
        
        <ProcessFlowCard step={{ id: 'mcptoolbox', number: '4️⃣', title: 'Inicialização do MCP Toolbox', description: (
          <>
            <p className="text-sm text-brand-gray-600 mb-2">O MCP Toolbox será executado em um container Docker, servindo as ferramentas definidas em <code>tools.json</code>.</p>
            <CodeBlock language="bash" code={`
# Definir a versão do MCP Toolbox (verifique a mais recente se necessário)
export VERSION=0.6.0

# Baixar la imagem Docker do MCP Toolbox
docker pull us-central1-docker.pkg.dev/database-toolbox/toolbox/toolbox:$VERSION

# Executar o container Docker do MCP Toolbox em modo detached (-d)
# Ele mapeia a porta 8080 do container para a porta 8080 da sua máquina
# e monta o arquivo tools.json local dentro do container.
docker run -d -p 8080:8080 \\
  -v $(pwd)/tools.json:/tools.json \\
  --name BrainAPI-mcp \\
  us-central1-docker.pkg.dev/database-toolbox/toolbox/toolbox:$VERSION \\
  --tools-file=/tools.json
            `} />
             <Alert type="info" title="Docker no Windows" className="mt-3 text-xs">
              No Windows, <code>$(pwd)</code> pode precisar ser ajustado para o caminho absoluto ou usar sintaxe como <code>%cd%</code> no CMD ou <code>{'$'}{'{'}PWD{'}'}</code> no PowerShell.
              Exemplo para PowerShell: <code>-v "{'$'}{'{'}PWD{'}'}/tools.json:/tools.json"</code>
            </Alert>
          </>
        )}} />

        <ProcessFlowCard step={{ id: 'verifytoolbox', number: '5️⃣', title: 'Verificação do MCP Toolbox (Opcional mas Recomendado)', description: (
          <>
            <p className="text-sm text-brand-gray-600 mb-2">Use o MCP Inspector para garantir que o MCP Toolbox está rodando e servindo as ferramentas corretamente.</p>
            <CodeBlock language="bash" code={`
# Instalar e executar MCP Inspector (requer Node.js/npx)
npx @modelcontextprotocol/inspector
            `} />
            <p className="text-sm text-brand-gray-600 my-3">Após executar o comando acima:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm text-brand-gray-600 pl-4">
              <li>Abra seu navegador e acesse: <ExternalLink href="http://127.0.0.1:6274">http://127.0.0.1:6274</ExternalLink></li>
              <li>No MCP Inspector:
                <ul className="list-disc pl-6">
                  <li><strong>Transport type:</strong> selecione <code>SSE</code></li>
                  <li><strong>URL:</strong> insira <code>http://127.0.0.1:8080/mcp/sse</code></li>
                </ul>
              </li>
              <li>Clique em "Connect". Se bem-sucedido, o status mudará para conectado.</li>
              <li>Clique em "List Tools". Você deverá ver a lista de ferramentas carregadas do seu <code>tools.json</code>.</li>
            </ol>
          </>
        )}} />

        <ProcessFlowCard step={{ id: 'adkagent', number: '6️⃣', title: 'Execução do ADK Agent', description: (
           <>
            <p className="text-sm text-brand-gray-600 mb-2">Este é o "cérebro" do BrainAPI, que inclui a interface web.</p>
            <CodeBlock language="bash" code={`
# Navegar para o diretório do agente
cd BrainAPI-agent

# Executar o ADK Agent com o WebServer integrado
# O WebServer rodará na porta 8081 por padrão aqui.
# Logs de debug são habilitados para facilitar o troubleshooting.
mvn compile exec:java "-Dexec.args=--server.port=8081 \\
     --adk.agents.source-dir=src/ \\
     --logging.level.com.google.adk.dev=DEBUG"
            `} />
            <Alert type="info" title="Portas" className="mt-3 text-xs">
             Note que o MCP Toolbox está na porta <code>8080</code> e o ADK Agent (com WebServer) está na <code>8081</code> para evitar conflitos. O ADK Agent (cliente MCP) é configurado internamente (geralmente via <code>application.properties</code> ou código) para se conectar ao MCP Toolbox na porta <code>8080</code>.
            </Alert>
          </>
        )}} />

        <ProcessFlowCard step={{ id: 'accessui', number: '7️⃣', title: 'Acesso à Interface Web', description: (
          <p className="text-brand-gray-700">
            Parabéns! Se tudo correu bem, o BrainAPI está rodando.
            Abra seu navegador e acesse: <ExternalLink href="http://localhost:8081">http://localhost:8081</ExternalLink>
            <img src="https://picsum.photos/seed/image-main/600/350" alt="BrainAPI UI" className="mt-4 rounded-lg shadow-md" />
          </p>
        )}} />
      </div>
    ),
  },
   {
    id: 'como-usar',
    navLabel: 'Como Usar',
    mainTitle: '💡 Como Usar o BrainAPI',
    subTitle: 'Interaja com suas APIs de forma conversacional através da interface web.',
    icon: <PlayIcon />,
    content: (
      <div className="space-y-8">
        <Card>
          <h3 className="text-xl font-semibold text-primary-blue mb-4">🎯 Interface Web</h3>
          <ol className="list-decimal list-inside space-y-2 text-brand-gray-700 pl-4">
            <li><strong>Acesse a Interface:</strong> Abra seu navegador e vá para <ExternalLink href="http://localhost:8081">http://localhost:8081</ExternalLink> (ou a porta que você configurou para o ADK Agent).</li>
            <li><strong>Digite sua Pergunta:</strong> No campo de chat, escreva sua solicitação em linguagem natural. Por exemplo, "Qual o saldo do meu cartão principal?" ou "Bloqueie o cartão com final 1234".</li>
            <li><strong>Aguarde o Processamento:</strong> O BrainAPI (via ADK Agent e LLM) processará sua pergunta para entender sua intenção e identificar os parâmetros necessários.</li>
            <li><strong>Receba a Resposta:</strong> O sistema retornará a resposta da API, formatada de maneira clara e conversacional.</li>
          </ol>
          <img src="https://picsum.photos/seed/brainapi-chat-interface/700/400" alt="Interface de Chat do BrainAPI" className="mt-6 rounded-lg shadow-lg" />
        </Card>

        <Card>
          <h3 className="text-xl font-semibold text-primary-blue mb-4">📝 Exemplos de Comandos</h3>
          <p className="text-brand-gray-700 mb-4">Aqui estão alguns exemplos de como você pode interagir com o BrainAPI. A eficácia e a variedade de comandos dependem das APIs que você expôs através do `openapi.json` e das capacidades do LLM configurado.</p>
          
          <div className="space-y-4">
            <div>
              <p className="font-medium text-brand-gray-800">👤 Usuário:</p>
              <CodeBlock language="text" code={'Consulte o cartão com UUID b4ff0172-3a01-4aca-96f0-72247c5ba34c'} />
              <p className="font-medium text-brand-gray-800 mt-1">🤖 BrainAPI (Exemplo de Resposta):</p>
              <Alert type="success" className="text-sm">
                Consultando cartão... <br />
                📊 Resultado: Cartão ativo, limite R$ 5.000, disponível R$ 3.750
              </Alert>
            </div>

            <div>
              <p className="font-medium text-brand-gray-800">👤 Usuário:</p>
              <CodeBlock language="text" code={'Qual o status do meu cartão?'} />
              <p className="font-medium text-brand-gray-800 mt-1">🤖 BrainAPI (Exemplo de Resposta com Solicitação de Esclarecimento):</p>
              <Alert type="info" className="text-sm">
                Para consultar seu cartão, preciso do UUID (identificador único) dele. Você poderia me fornecer, por favor?
              </Alert>
            </div>
          </div>
        </Card>
        
        <InteractiveDemoBlock demo={brainAPIDemoData} />

        <Card>
          <h3 className="text-xl font-semibold text-primary-blue mb-4">🔧 Comandos Avançados (Exemplos Conceituais)</h3>
          <p className="text-brand-gray-700 mb-4">Dependendo da complexidade das suas APIs e do treinamento do LLM, o BrainAPI pode entender diversos tipos de solicitações:</p>
          <ul className="list-disc list-inside space-y-3 text-brand-gray-700 pl-4">
            <li>
              <strong>Consultas Diretas:</strong>
              <CodeBlock language="text" code={'Mostre informações do cartão com uuid b4ff0172-3a01-4aca-96f0-72247c5ba34c'} className="text-xs mt-1" />
            </li>
            <li>
              <strong>Consultas com Filtros:</strong>
              <CodeBlock language="text" code={'Liste cartões do customer uuid eb58556d-e468-49fe-b3b8-02220e878897 que foram emitidos este ano.'} className="text-xs mt-1" />
            </li>
            <li>
              <strong>Operações de Modificação (se a API permitir e a ferramenta for configurada):</strong>
              <CodeBlock language="text" code={'Bloqueie o cartão b4ff0172-3a01-4aca-96f0-72247c5ba34c por motivo de perda.'} className="text-xs mt-1" />
            </li>
            <li>
              <strong>Solicitações de Relatórios ou Sumarizações:</strong>
              <CodeBlock language="text" code={'Gere um relatório de transações do último mês para o cartão b4ff0172-3a01-4aca-96f0-72247c5ba34c.'} className="text-xs mt-1" />
            </li>
          </ul>
          <Alert type="warning" title="Capacidades e Limitações" className="mt-6">
            A capacidade do BrainAPI de lidar com comandos complexos ou realizar ações de modificação depende crucialmente de:
            <ul className="list-disc pl-5 mt-2 text-sm">
              <li>A clareza e completude da sua especificação OpenAPI.</li>
              <li>Como as ferramentas MCP são geradas e descritas.</li>
              <li>As capacidades de raciocínio e planejamento do LLM utilizado.</li>
              <li>Considerações de segurança para operações que alteram dados.</li>
            </ul>
          </Alert>
        </Card>
      </div>
    ),
  },
  {
    id: 'componentes-sistema',
    navLabel: 'Componentes',
    mainTitle: '🧩 Componentes do Sistema BrainAPI',
    subTitle: 'Uma análise detalhada de cada módulo que compõe o BrainAPI e suas responsabilidades.',
    icon: <PuzzlePieceIcon />,
    content: (
       <div className="space-y-10">
        <Card>
          <SectionHeader title="🔧 1. OpenAPI MCP Generator (openapi2mcp-toolbox)" icon={<CogIcon />} />
          <p className="text-brand-gray-700 mb-4">O gerador é a ponte inicial entre suas APIs existentes e o mundo da IA conversacional. Ele automatiza a tarefa, muitas vezes tediosa, de tornar as funcionalidades da API acessíveis para um agente de IA.</p>
          
          <MermaidCodeBlock title="Fluxo de Conversão do Gerador" code={`
flowchart LR
    A["📄 openAPI.json (Especificação da API)"] --> B["⚙️ openapi2mcp-toolbox (Gerador)"];
    B --> C["🧩 tools.json (Ferramentas MCP Geradas)"];

    classDef input fill:#e0f2fe,stroke:#0284c7,stroke-width:2px,color:#0369a1;
    classDef process fill:#f0fdf4,stroke:#16a34a,stroke-width:2px,color:#15803d;
    classDef output fill:#fefce8,stroke:#ca8a04,stroke-width:2px,color:#854d0e;

    class A input;
    class B process;
    class C output;
          `} />

          <h4 className="text-lg font-semibold text-primary-blue mt-6 mb-3">🔄 Processo de Conversão Detalhado:</h4>
          <ol className="list-decimal list-inside space-y-2 text-brand-gray-700 pl-4">
            <li><strong>Parsing e Validação:</strong> O gerador lê e valida o arquivo de especificação OpenAPI (<code>openapi.json</code> ou <code>openapi.yaml</code>), garantindo que está bem formado.</li>
            <li><strong>Mapeamento de Endpoints para Ferramentas:</strong> Cada endpoint definido na especificação OpenAPI (por exemplo, <code>GET /cards/{'{uuid}'}</code>) é mapeado para uma "ferramenta" no jargão do MCP. A descrição, parâmetros e método HTTP do endpoint são traduzidos para a definição da ferramenta.</li>
            <li><strong>Validação de Tipos e Parâmetros:</strong> O gerador verifica os tipos de dados dos parâmetros (query, path, body) e os converte para o esquema esperado pelo MCP.</li>
            <li><strong>Serialização para JSON:</strong> As definições das ferramentas convertidas são serializadas em um arquivo JSON (tipicamente <code>tools.json</code>) que segue o formato esperado pelo MCP Toolbox.</li>
          </ol>

          <h4 className="text-lg font-semibold text-primary-blue mt-6 mb-3">📋 Exemplo de Conversão:</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <CodeBlock language="yaml" title="Input (Fragmento de OpenAPI):" code={`
paths:
  /cards/{uuid}:
    get:
      summary: "Get card by UUID"
      operationId: getCardByUuid
      parameters:
        - name: uuid
          in: path
          required: true
          description: Unique identifier of the card
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Successfully retrieved card details
              `} />
            </div>
            <div>
              <CodeBlock language="json" title="Output (Fragmento de tools.json - MCP Tool):" code={`
{
  "my-http-tool": { 
    "kind": "http",
    "source": "get-card-by-uuid", 
    "method": "GET",
    "path": "/cards/{.uuid}", 
    "description": "Get card by UUID", 
    "inputSchema": {
      "type": "object",
      "properties": {
        "uuid": {
          "type": "string",
          "format": "uuid",
          "description": "Unique identifier of the card"
        }
      },
      "required": ["uuid"]
    }
  }
}
              `} />
            </div>
          </div>
           <Alert type="info" className="mt-4">
            O formato exato do <code>tools.json</code> pode variar ligeiramente dependendo da versão do MCP Toolbox e das convenções do gerador. O exemplo acima ilustra o conceito principal.
          </Alert>
        </Card>

        <Card>
          <SectionHeader title="🛠️ 2. MCP Toolbox" icon={<WrenchScrewdriverIcon />} />
          <p className="text-brand-gray-700 mb-4">O MCP Toolbox é um componente crucial que atua como um servidor padronizado para expor as "ferramentas" (funcionalidades da API) para os agentes de IA. Ele é a implementação do servidor do Model Context Protocol.</p>

          <h4 className="text-lg font-semibold text-primary-blue mt-6 mb-3">🌐 Protocolo MCP (Model Context Protocol)</h4>
          <p className="text-brand-gray-700 mb-4">O MCP, criado pela Anthropic, é um padrão aberto projetado para facilitar a conexão de Modelos de Linguagem Grandes (LLMs) com fontes de dados externas e ferramentas (como APIs). Suas características principais incluem:</p>
          <ul className="list-disc list-inside space-y-2 text-brand-gray-700 pl-4">
            <li><strong>Arquitetura Cliente-Servidor:</strong> Define uma separação clara entre o cliente (o Agent/LLM que consome as ferramentas) e o servidor (o MCP Toolbox que expõe as ferramentas).</li>
            <li><strong>Protocolo Padronizado de Mensagens:</strong> Especifica os formatos das mensagens para listagem de ferramentas, invocação de ferramentas, e retorno de resultados, garantindo interoperabilidade.</li>
            <li><strong>Transporte Flexível:</strong> Pode operar sobre diferentes mecanismos de transporte, incluindo stdio (para processos locais), HTTP, e Server-Sent Events (SSE) para comunicação assíncrona.</li>
            <li><strong>Descoberta Dinâmica de Ferramentas:</strong> Permite que um cliente MCP consulte o servidor para descobrir quais ferramentas estão disponíveis e como usá-las (seus esquemas de input/output).</li>
          </ul>

          <h4 className="text-lg font-semibold text-primary-blue mt-6 mb-3">🔌 Endpoints Comuns Expostos pelo MCP Toolbox</h4>
          <Table 
            headers={["Endpoint", "Método HTTP", "Descrição"]}
            rows={[
              ["<code>/mcp/sse</code>", "GET", "Ponto de entrada principal para comunicação usando Server-Sent Events. Usado para listagem de ferramentas, invocação, etc."],
              ["<code>/mcp</code> (ou similar)", "POST", "Pode ser usado para comunicação HTTP síncrona em algumas implementações."],
              ["<code>/health</code>", "GET", "Um endpoint de health check para verificar se o serviço MCP Toolbox está rodando e saudável."],
              ["<code>/tools</code> (ou similar, via MCP)", "N/A (via protocolo)", "Não é um endpoint HTTP direto, mas a capacidade de listar ferramentas é fundamental no protocolo MCP."]
            ]}
          />

          <h4 className="text-lg font-semibold text-primary-blue mt-6 mb-3">🐳 Configuração Típica com Docker</h4>
          <p className="text-brand-gray-700 mb-2">O MCP Toolbox é frequentemente distribuído como uma imagem Docker para fácil deploy. Um exemplo de como rodá-lo (semelhante ao da seção de instalação):</p>
          <CodeBlock language="dockerfile" title="Exemplo de Docker run (conceitual)" code={`
# Baixar a imagem (se já não tiver)
docker pull us-central1-docker.pkg.dev/database-toolbox/toolbox/toolbox:0.6.0

# Rodar o container
docker run \\
  -p 8080:8080 \\                # Mapeia a porta 8080 do host para a do container
  -v /caminho/local/tools.json:/tools.json \\ # Monta o tools.json de fora para dentro do container
  --name mcp-server \\           # Nomeia o container
  us-central1-docker.pkg.dev/database-toolbox/toolbox/toolbox:0.6.0 \\
  --tools-file=/tools.json      # Argumento para o MCP Toolbox carregar o arquivo de ferramentas
          `} />
          <Alert type="warning" className="mt-4">
            O nome da imagem Docker, os argumentos e as portas podem variar dependendo da implementação específica do MCP Toolbox que você está usando. Consulte sempre a documentação oficial do toolbox.
          </Alert>
        </Card>

        <Card>
          <SectionHeader title="🤖 3. ADK Agent" icon={<BrainIcon />} />
          <p className="text-brand-gray-700 mb-4">O ADK Agent é o coração inteligente do BrainAPI. Ele utiliza o Google Agent Development Kit (ADK) para orquestrar a interação entre o usuário, o Modelo de Linguagem Grande (LLM), e as ferramentas expostas pelo MCP Toolbox.</p>

          <h4 className="text-lg font-semibold text-primary-blue mt-6 mb-3">🔄 Fluxo de Processamento do Agent</h4>
           <MermaidCodeBlock title="Fluxo de Interação do ADK Agent" code={`
sequenceDiagram
    participant U as 👤 Usuário
    participant UI as 🌐 Web Interface (ADK)
    participant Agent as 🧠 ADK Agent Core
    participant LLM as 💡 LLM (e.g., Gemini)
    participant MCP_TB as 🛠️ MCP Toolbox
    participant ExtAPI as ⚙️ API Externa

    U->>UI: Envia mensagem (linguagem natural)
    UI->>Agent: Repassa mensagem
    Agent->>LLM: "Entenda esta mensagem: [mensagem]"
    LLM->>Agent: Intenção, parâmetros e sugestão de ferramenta
    Agent->>MCP_TB: Invoca ferramenta (e.g., getCard(uuid: "123"))
    MCP_TB->>ExtAPI: Chama endpoint HTTP correspondente
    ExtAPI-->>MCP_TB: Retorna dados da API
    MCP_TB-->>Agent: Retorna resultado da ferramenta
    Agent->>LLM: "Formate esta resposta: [dados]" (opcional)
    LLM->>Agent: Resposta formatada em linguagem natural
    Agent->>UI: Envia resposta final
    UI->>U: Exibe resposta
          `} />
          <ol className="list-decimal list-inside space-y-2 text-brand-gray-700 pl-4 mt-4">
            <li><strong>Recepção da Mensagem:</strong> O usuário envia uma mensagem (pergunta ou comando) através da interface web fornecida pelo WebServer do ADK.</li>
            <li><strong>Análise pelo LLM:</strong> O Agent Core envia a mensagem do usuário para o LLM (ex: Google Gemini). O LLM analisa o texto para entender a intenção do usuário, extrair entidades relevantes (como UUIDs, datas, etc.), e determinar qual ação ou ferramenta seria apropriada.</li>
            <li><strong>Seleção da Ferramenta MCP:</strong> Com base na resposta do LLM, o Agent identifica a ferramenta MCP correspondente (que foi originalmente definida na API e exposta pelo MCP Toolbox).</li>
            <li><strong>Execução da Ferramenta:</strong> O Agent faz uma chamada ao MCP Toolbox, solicitando a execução da ferramenta selecionada com os parâmetros extraídos. O MCP Toolbox, por sua vez, realiza a chamada HTTP real para a API externa.</li>
            <li><strong>Formatação da Resposta (Opcional):</strong> Após receber os dados da API (via MCP Toolbox), o Agent pode, opcionalmente, enviar esses dados de volta ao LLM para que sejam formatados em uma resposta mais amigável e em linguagem natural.</li>
            <li><strong>Entrega da Resposta:</strong> A resposta final (seja os dados brutos da API ou a versão formatada pelo LLM) é enviada de volta para a interface web e exibida ao usuário.</li>
          </ol>

          <h4 className="text-lg font-semibold text-primary-blue mt-6 mb-3">🌐 WebServer Integrado (ADK)</h4>
          <p className="text-brand-gray-700 mb-4">Uma das grandes vantagens do ADK (especialmente a versão Java com Spring Boot) é o WebServer integrado, que fornece:</p>
          <ul className="list-disc list-inside space-y-2 text-brand-gray-700 pl-4">
            <li><strong>Interface Web Pronta para Uso:</strong> Uma UI de chat para interação direta com o agent, ideal para demonstrações e testes.</li>
            <li><strong>APIs REST (Opcional):</strong> Capacidade de expor endpoints REST para que outros sistemas possam interagir programaticamente com o agent.</li>
            <li><strong>Suporte a WebSocket:</strong> Para comunicação em tempo real, tornando a experiência de chat mais fluida.</li>
            <li><strong>Monitoramento e Logs:</strong> Facilidades para logging, métricas de performance, e debugging.</li>
          </ul>
           <Alert type="info" title="Flexibilidade do ADK" className="mt-4">
            O ADK é projetado para ser flexível. Embora o Google Gemini seja uma escolha comum para o LLM, o ADK pode ser integrado com outros LLMs, incluindo modelos open-source ou hospedados localmente, dependendo da configuração e das bibliotecas de cliente LLM utilizadas.
          </Alert>
        </Card>
      </div>
    ),
  },
  {
    id: 'exemplos-praticos',
    navLabel: 'Exemplos Práticos',
    mainTitle: '📊 Exemplos Práticos e Cenários de Uso',
    subTitle: 'Veja o BrainAPI em ação com exemplos concretos de interações e como ele lida com diferentes situações.',
    icon: <LightBulbIcon />,
    content: (
      <div className="space-y-8">
        <Card>
          <SectionHeader title="🎯 Cenário 1: Consulta de Cartão Bem-Sucedida" icon={<BrainIcon />} />
          <p className="text-brand-gray-700 mb-2"><strong>Comando do Usuário:</strong></p>
          <CodeBlock language="text" code={'Mostre as informações do cartão b4ff0172-3a01-4aca-96f0-72247c5ba34c'} />

          <p className="text-brand-gray-700 mt-4 mb-2"><strong>Processamento Interno (Simplificado):</strong></p>
          <ol className="list-decimal list-inside space-y-1 text-sm text-brand-gray-600 pl-4">
            <li>O LLM identifica a intenção: "consultar informações de um cartão específico".</li>
            <li>Extrai o parâmetro principal: <code>UUID = "b4ff0172-3a01-4aca-96f0-72247c5ba34c"</code>.</li>
            <li>O Agent seleciona a ferramenta MCP apropriada (ex: <code>get-card-by-uuid</code>).</li>
            <li>O MCP Toolbox executa a chamada HTTP: <code>GET /api/v1/cards/b4ff0172-3a01-4aca-96f0-72247c5ba34c</code> (o caminho exato depende da sua API).</li>
            <li>A API externa retorna os dados do cartão em JSON.</li>
            <li>O Agent (possivelmente com ajuda do LLM) formata os dados JSON em uma resposta em linguagem natural.</li>
          </ol>

          <p className="text-brand-gray-700 mt-4 mb-2"><strong>Resposta do Sistema (Exemplo):</strong></p>
          <Alert type="success" title="BrainAPI Responde:">
            <p>🔍 Consultei o cartão <code>b4ff0172-3a01-4aca-96f0-72247c5ba34c</code> e aqui estão os detalhes:</p>
            <ul className="list-disc pl-5 mt-2">
              <li><strong>📊 Status:</strong> Ativo</li>
              <li><strong>💳 Limite Total:</strong> R$ 5.000,00</li>
              <li><strong>✅ Limite Disponível:</strong> R$ 3.750,00</li>
              <li><strong>🔒 Bloqueios:</strong> Nenhum</li>
              <li><strong>📅 Data da Última Transação:</strong> Hoje às 14:30</li>
            </ul>
          </Alert>
        </Card>

        <Card>
          <SectionHeader title="🎯 Cenário 2: Tratamento de Erros (Cartão Não Encontrado)" icon={<BrainIcon />} />
          <p className="text-brand-gray-700 mb-2"><strong>Comando do Usuário:</strong></p>
          <CodeBlock language="text" code={'Consulte o cartão com ID xyz789-non-existent-uuid'} />

          <p className="text-brand-gray-700 mt-4 mb-2"><strong>Processamento Interno com Erro (Simplificado):</strong></p>
          <ol className="list-decimal list-inside space-y-1 text-sm text-brand-gray-600 pl-4">
            <li>LLM identifica a intenção e o parâmetro <code>ID = "xyz789-non-existent-uuid"</code>.</li>
            <li>Agent seleciona a ferramenta (ex: <code>get-card-by-uuid</code>).</li>
            <li>MCP Toolbox executa a chamada HTTP.</li>
            <li>A API externa retorna um erro <code>404 Not Found</code>, pois o cartão com esse ID não existe.</li>
            <li>O Agent recebe o erro da ferramenta, interpreta-o (ou passa para o LLM interpretar) e formula uma resposta amigável e útil para o usuário.</li>
          </ol>

          <p className="text-brand-gray-700 mt-4 mb-2"><strong>Resposta do Sistema (Exemplo):</strong></p>
          <Alert type="error" title="BrainAPI Responde:">
            <p>❌ Ops! Não consegui encontrar o cartão com o ID <code>xyz789-non-existent-uuid</code>.</p>
            <p className="mt-2">💡 <strong>Possíveis causas:</strong></p>
            <ul className="list-disc pl-5 mt-1">
              <li>O UUID/ID fornecido pode estar incorreto ou não existir no sistema.</li>
              <li>Pode ter havido um erro de digitação no identificador.</li>
            </ul>
            <p className="mt-2">🔍 <strong>Você pode tentar:</strong></p>
            <ul className="list-disc pl-5 mt-1">
              <li>Verificar se o UUID/ID está correto e tentar novamente.</li>
              <li>Se não tiver certeza do ID, talvez possa me pedir para listar seus cartões disponíveis (se essa funcionalidade existir).</li>
            </ul>
          </Alert>
        </Card>
        
         <Card>
          <SectionHeader title="🎯 Cenário 3: Solicitação Ambígua e Esclarecimento" icon={<BrainIcon />} />
          <p className="text-brand-gray-700 mb-2"><strong>Comando do Usuário:</strong></p>
          <CodeBlock language="text" code={'Mostre minha fatura.'} />

          <p className="text-brand-gray-700 mt-4 mb-2"><strong>Processamento Interno com Ambiguidade (Simplificado):</strong></p>
          <ol className="list-decimal list-inside space-y-1 text-sm text-brand-gray-600 pl-4">
            <li>LLM identifica a intenção: "ver fatura".</li>
            <li>LLM percebe que falta informação crucial: De qual cartão? De qual mês/período?</li>
            <li>O Agent, instruído pelo LLM, formula uma pergunta de esclarecimento ao usuário.</li>
          </ol>

          <p className="text-brand-gray-700 mt-4 mb-2"><strong>Resposta do Sistema (Exemplo):</strong></p>
          <Alert type="info" title="BrainAPI Responde:">
            <p>🤔 Claro, posso te ajudar com a fatura! Para isso, preciso de mais algumas informações:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Você gostaria de ver a fatura de qual cartão? (Se tiver mais de um).</li>
              <li>E de qual período ou mês você está se referindo? Por exemplo, "fatura de dezembro do cartão final 1234".</li>
            </ul>
          </Alert>
        </Card>
        <InteractiveDemoBlock demo={agentDemoData} />
      </div>
    ),
  },
   {
    id: 'estrutura-projeto',
    navLabel: 'Estrutura do Projeto',
    mainTitle: '📁 Estrutura do Projeto BrainAPI',
    subTitle: 'Uma visão geral da organização dos diretórios e arquivos chave no projeto BrainAPI.',
    icon: <DocumentTextIcon />,
    content: (
      <div className="space-y-8">
        <Card>
          <p className="text-brand-gray-700 mb-4">A estrutura de diretórios do BrainAPI é organizada para separar as preocupações de cada componente principal. Abaixo está uma representação típica:</p>
          <CodeBlock language="text" title="Estrutura de Diretórios Principal" code={`
BrainAPI/
├── 📁 openapi2mcp-toolbox/      # Componente gerador de tools.json
│   ├── src/main/java/...       # Código fonte Java do gerador
│   ├── pom.xml                 # Configurações Maven (dependências, build)
│   └── target/                 # Contém o JAR compilado do gerador
│       └── openapi-mcp-1.0-jar-with-dependencies.jar
│
├── 📄 tools.json                # Arquivo gerado pelo openapi2mcp-toolbox,
│                               # contendo as ferramentas MCP.
│                               # Usado pelo MCP Toolbox server.
│
├── 📁 BrainAPI-agent/           # Componente do Agente ADK (Java) + WebServer
│   ├── src/main/java/...       # Código fonte Java do Agente e WebServer
│   │   └── com/example/brainapi/ # Pacote principal da aplicação
│   │       └── BrainAPIAgent.java # Definição do agente ADK
│   │       └── WebApplication.java # Ponto de entrada Spring Boot
│   ├── src/main/resources/     # Recursos da aplicação
│   │   ├── static/             # Arquivos estáticos para a UI web (CSS, JS, imagens)
│   │   ├── templates/          # Templates (se houver, ex: Thymeleaf)
│   │   └── application.properties # Configurações da aplicação Spring Boot
│   │                             # (ex: porta do servidor, config do ADK,
│   │                             #  URL do MCP Toolbox)
│   ├── pom.xml                 # Configurações Maven para o Agente ADK
│   └── logs/                   # Diretório de logs (gerado em execução)
│       └── application.log
│
├── 📁 docs/                     # Documentação do projeto (como este guia!)
│   ├── README.md
│   └── images/
│
├── 📄 .gitignore                # Especifica arquivos e pastas ignorados pelo Git
├── 📄 pom.xml                   # (Opcional) POM pai se for um projeto multi-módulo Maven
└── 📄 README.md                 # README principal do projeto
          `} />
        </Card>

        <Card>
          <h3 className="text-xl font-semibold text-primary-blue mb-4">Detalhes dos Componentes Chave:</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium text-brand-gray-800">📁 <code>openapi2mcp-toolbox/</code></h4>
              <p className="text-sm text-brand-gray-600 ml-4">Contém o projeto Java/Maven responsável por ler uma especificação OpenAPI (<code>openapi.json</code> ou <code>openapi.yaml</code>) e gerar o arquivo <code>tools.json</code>. Este arquivo é crucial pois define as "ferramentas" (endpoints da API) que o MCP Toolbox irá expor.</p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-brand-gray-800">📄 <code>tools.json</code></h4>
              <p className="text-sm text-brand-gray-600 ml-4">Localizado na raiz do projeto (ou onde for configurado), este arquivo é o output do <code>openapi2mcp-toolbox</code>. Ele é lido pelo servidor MCP Toolbox para saber quais ferramentas disponibilizar. É a "ponte" entre a sua API e o protocolo MCP.</p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-brand-gray-800">📁 <code>BrainAPI-agent/</code></h4>
              <p className="text-sm text-brand-gray-600 ml-4">Este é o coração da aplicação, contendo o agente de IA construído com o Google ADK.
                <ul className="list-disc pl-6 mt-1">
                  <li><code>src/main/java/</code>: Código Java do agente, lógica de negócios, e configuração do servidor web Spring Boot.</li>
                  <li><code>src/main/resources/application.properties</code>: Arquivo de configuração vital onde você define, por exemplo, a porta do servidor web do agente, a URL do servidor MCP Toolbox ao qual ele deve se conectar, e outras configurações do ADK.</li>
                </ul>
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-brand-gray-800">🐳 Docker (Implícito)</h4>
              <p className="text-sm text-brand-gray-600 ml-4">Embora não haja um <code>Dockerfile</code> diretamente para o projeto BrainAPI como um todo no exemplo acima (o MCP Toolbox é puxado como uma imagem pronta), em um cenário de produção mais complexo, você poderia ter Dockerfiles para empacotar o <code>BrainAPI-agent</code> também, e um <code>docker-compose.yml</code> para orquestrar todos os serviços (MCP Toolbox, ADK Agent, e talvez um mock da sua API externa para desenvolvimento).</p>
            </div>
          </div>
        </Card>
      </div>
    ),
  },
   {
    id: 'tecnologias',
    navLabel: 'Tecnologias',
    mainTitle: '🛠️ Tecnologias Utilizadas no BrainAPI',
    subTitle: 'Explore os frameworks, linguagens, protocolos e ferramentas que impulsionam o BrainAPI.',
    icon: <CodeBracketIcon />,
    content: (
      <div className="space-y-8">
        <Card>
          <p className="text-brand-gray-700 mb-6">O BrainAPI é construído sobre um conjunto de tecnologias modernas e robustas, escolhidas para fornecer uma plataforma flexível e poderosa para IA conversacional com APIs.</p>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Badge variant="java">Java 17+</Badge>
            <Badge variant="spring">Spring Boot 3.x</Badge>
            <Badge variant="adk">Google ADK</Badge>
            <Badge variant="mcp">MCP Protocol</Badge>
            <Badge variant="mcp">MCP Toolbox</Badge>
            <Badge variant="openapi">OpenAPI 3.x</Badge>
            <Badge variant="docker">Docker</Badge>
            <Badge variant="node">Node.js (Inspector)</Badge>
          </div>

          <h3 className="text-xl font-semibold text-primary-blue mb-4">🏗️ Frameworks e Linguagens</h3>
          <Table 
            headers={["Tecnologia", "Versão Típica", "Uso Principal", "Documentação / Link"]}
            rows={[
              ["Java", "17+", "Linguagem principal para o ADK Agent e o OpenAPI MCP Generator.", <ExternalLink href="https://openjdk.java.net/">OpenJDK</ExternalLink>],
              ["Spring Boot", "3.x", "Framework para o WebServer integrado no ADK Agent, facilitando a criação de aplicações web e REST APIs.", <ExternalLink href="https://spring.io/projects/spring-boot">Spring Boot</ExternalLink>],
              ["Maven", "3.6+", "Gerenciamento de dependências e build para os projetos Java.", <ExternalLink href="https://maven.apache.org/">Apache Maven</ExternalLink>],
              ["Google ADK (Agent Development Kit)", "Mais Recente", "Framework do Google para desenvolvimento de agentes de IA, usado no BrainAPI-agent.", <ExternalLink href="https://google.github.io/adk-docs/">ADK Docs</ExternalLink>],
            ]}
          />
        </Card>

        <Card>
          <h3 className="text-xl font-semibold text-primary-blue mb-4">🤖 Inteligência Artificial e Protocolos</h3>
          <Table 
            headers={["Componente / Protocolo", "Provedor / Padrão", "Modelo / Versão", "Uso no BrainAPI"]}
            rows={[
              ["LLM (Large Language Model)", "Google (padrão)", "Gemini 2.0 Flash (ou outro)", "Processamento de linguagem natural, entendimento de intenção, geração de respostas."],
              ["MCP (Model Context Protocol)", "Anthropic", "v0.6.0+ (Toolbox)", "Protocolo de comunicação padronizado entre o ADK Agent e o MCP Toolbox para invocação de ferramentas."],
              ["MCP Toolbox (GenAI Toolbox)", "Google", "v0.6.0+", "Implementação de servidor MCP que hospeda as ferramentas (APIs) e as expõe via protocolo MCP.", <ExternalLink href="https://github.com/googleapis/genai-toolbox">GenAI Toolbox</ExternalLink>],
              ["OpenAPI Specification", "OpenAPI Initiative", "3.x", "Padrão para descrever APIs REST. Usado como input para gerar as ferramentas MCP.", <ExternalLink href="https://www.openapis.org/">OpenAPI</ExternalLink>],
            ]}
          />
        </Card>
        
        <Card>
          <h3 className="text-xl font-semibold text-primary-blue mb-4">🐳 Infraestrutura e Ferramentas de Desenvolvimento</h3>
          <Table 
            headers={["Tecnologia / Ferramenta", "Versão Típica", "Uso no BrainAPI", "Link de Referência"]}
            rows={[
              ["Docker", "20.0+", "Containerização do MCP Toolbox para deploy fácil e isolamento. Pode ser usado para outros componentes também.", <ExternalLink href="https://www.docker.com/">Docker</ExternalLink>],
              ["Node.js (com NPX)", "16+", "Usado para executar o MCP Inspector (<code>npx @modelcontextprotocol/inspector</code>) para debug e verificação do MCP Toolbox.", <ExternalLink href="https://nodejs.org/">Node.js</ExternalLink>],
              ["Git", "2.0+", "Sistema de controle de versão para o código fonte do projeto.", <ExternalLink href="https://git-scm.com/">Git</ExternalLink>],
              ["IntelliJ IDEA / VS Code", "N/A", "Ambientes de Desenvolvimento Integrado (IDEs) recomendados para desenvolvimento Java e frontend.", <span><ExternalLink href="https://www.jetbrains.com/idea/">IntelliJ</ExternalLink>, <ExternalLink href="https://code.visualstudio.com/">VS Code</ExternalLink></span>],
              ["Postman / curl", "N/A", "Ferramentas para testar as APIs REST diretamente (antes de integrá-las ao BrainAPI) e para testar os endpoints do MCP Toolbox ou ADK Agent.", <span><ExternalLink href="https://www.postman.com/">Postman</ExternalLink></span>],
            ]}
          />
        </Card>
      </div>
    ),
  },
  {
    id: 'troubleshooting',
    navLabel: 'Troubleshooting',
    mainTitle: '🔧 Troubleshooting e Dicas',
    subTitle: 'Encontrou um problema? Aqui estão algumas soluções para os percalços mais comuns.',
    icon: <CommandLineIcon />,
    content: (
      <div className="space-y-8">
        <Alert type="info" title="Abordagem Geral para Solução de Problemas">
          <p>Ao encontrar problemas, a primeira etapa é sempre verificar os logs dos componentes envolvidos:</p>
          <ul className="list-disc pl-5 mt-2 text-sm">
            <li><strong>Logs do ADK Agent:</strong> Geralmente encontrados em <code>BrainAPI-agent/logs/application.log</code> ou na saída do console se estiver rodando diretamente.</li>
            <li><strong>Logs do MCP Toolbox:</strong> Use <code>docker logs BrainAPI-mcp</code> (ou o nome do seu container).</li>
            <li><strong>Console do Navegador:</strong> Verifique o console de desenvolvedor do seu navegador (F12) para erros de frontend ou de comunicação com o WebServer do ADK Agent.</li>
          </ul>
        </Alert>

        <Card>
          <h3 className="text-xl font-semibold text-primary-blue mb-4">❌ Problemas Comuns e Soluções</h3>
          
          <details className="mb-4 p-3 border rounded-lg hover:border-secondary-blue transition-colors duration-200">
            <summary className="font-medium text-brand-gray-800 cursor-pointer flex justify-between items-center">
              1. Erro de Conexão com MCP Toolbox
              <span className="text-sm text-secondary-blue group-open:rotate-90 transform transition-transform duration-200">▼</span>
            </summary>
            <div className="mt-3 text-sm text-brand-gray-600 space-y-2">
              <p><strong>Sintoma Comum (no log do ADK Agent):</strong> <code>ERROR: Failed to connect to MCP server at http://localhost:8080/mcp/sse</code> ou similar.</p>
              <p><strong>Soluções:</strong></p>
              <ul className="list-disc pl-5">
                <li><strong>Verificar se o container Docker do MCP Toolbox está rodando:</strong>
                  <CodeBlock language="bash" code="docker ps | grep BrainAPI-mcp" className="text-xs mt-1" />
                  (Você deve ver o container listado e com status "Up").
                </li>
                <li><strong>Verificar os logs do container MCP Toolbox:</strong>
                  <CodeBlock language="bash" code="docker logs BrainAPI-mcp" className="text-xs mt-1" />
                  (Procure por erros durante a inicialização, como problemas ao carregar <code>tools.json</code>).
                </li>
                <li><strong>Reiniciar o container:</strong>
                  <CodeBlock language="bash" code="docker restart BrainAPI-mcp" className="text-xs mt-1" />
                </li>
                <li><strong>Verificar conectividade de rede básica com o MCP Toolbox:</strong>
                  <CodeBlock language="bash" code="curl http://localhost:8080/health" className="text-xs mt-1" />
                  (Se o MCP Toolbox tiver um endpoint de health check, ele deve responder. Algumas versões podem não ter <code>/health</code>, mas a porta 8080 deve estar acessível).
                </li>
                <li><strong>Verificar configuração no ADK Agent:</strong> Garanta que o <code>application.properties</code> (ou configuração equivalente) do ADK Agent está apontando para a URL correta do MCP Toolbox (ex: <code>mcp.server.url=http://localhost:8080/mcp/sse</code>).</li>
              </ul>
            </div>
          </details>

          <details className="mb-4 p-3 border rounded-lg hover:border-secondary-blue transition-colors duration-200">
            <summary className="font-medium text-brand-gray-800 cursor-pointer flex justify-between items-center">
              2. API Key do Google AI Studio Inválida ou Não Configurada
              <span className="text-sm text-secondary-blue group-open:rotate-90 transform transition-transform duration-200">▼</span>
            </summary>
            <div className="mt-3 text-sm text-brand-gray-600 space-y-2">
              <p><strong>Sintoma Comum (no log do ADK Agent):</strong> <code>ERROR: Authentication failed with Google AI Studio</code>, <code>API key not valid</code>, ou erros HTTP 401/403 ao tentar usar o LLM Gemini.</p>
              <p><strong>Soluções:</strong></p>
              <ul className="list-disc pl-5">
                <li><strong>Verificar se a variável de ambiente <code>GOOGLE_API_KEY</code> está definida CORRETAMENTE na sessão onde o ADK Agent foi iniciado:</strong>
                  <CodeBlock language="bash" title="Linux/macOS" code="echo $GOOGLE_API_KEY" className="text-xs mt-1" />
                  <CodeBlock language="powershell" title="Windows (PowerShell)" code="Write-Host $env:GOOGLE_API_KEY" className="text-xs mt-1" />
                  (Deve exibir sua chave, não uma string vazia ou incorreta).
                </li>
                <li><strong>Redefinir a variável de ambiente se necessário e reiniciar o ADK Agent.</strong></li>
                <li><strong>Verificar a validade da chave diretamente (exemplo genérico, pode variar):</strong>
                  <CodeBlock language="bash" code={'curl -H "x-goog-api-key: $GOOGLE_API_KEY" \\ \n     -H "Content-Type: application/json" \\ \n     -d \'{ "contents":[{"parts":[{"text":"Escreva uma história sobre um gambá mágico."}]}]}\' \\ \n     "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"'} className="text-xs mt-1" />
                   (Substitua <code>$GOOGLE_API_KEY</code> pela sua chave real. Uma resposta de erro sobre autenticação indica problema na chave.)
                </li>
                 <li><strong>Verifique se a API "Generative Language API" está habilitada no seu projeto Google Cloud associado à chave.</strong></li>
              </ul>
            </div>
          </details>
          
          <details className="mb-4 p-3 border rounded-lg hover:border-secondary-blue transition-colors duration-200">
            <summary className="font-medium text-brand-gray-800 cursor-pointer flex justify-between items-center">
              3. Ferramentas MCP Não Encontradas ou Mal Formadas
              <span className="text-sm text-secondary-blue group-open:rotate-90 transform transition-transform duration-200">▼</span>
            </summary>
             <div className="mt-3 text-sm text-brand-gray-600 space-y-2">
              <p><strong>Sintoma Comum:</strong> O ADK Agent não consegue "ver" ou usar as ferramentas da API, ou o MCP Inspector mostra uma lista vazia de ferramentas. Logs do MCP Toolbox podem indicar "<code>WARNING: No MCP tools found</code>" ou erros ao parsear <code>tools.json</code>.</p>
              <p><strong>Soluções:</strong></p>
              <ul className="list-disc pl-5">
                <li><strong>Verificar se o arquivo <code>tools.json</code> foi gerado corretamente e está no local esperado</strong> (na raiz do projeto, de onde o Docker monta o volume).
                  <CodeBlock language="bash" code="ls -la tools.json" className="text-xs mt-1" />
                </li>
                <li><strong>Regenerar <code>tools.json</code> se houver suspeita de corrupção ou erro na geração:</strong>
                  <CodeBlock language="bash" code={`
cd openapi2mcp-toolbox
mvn clean package
java -jar target/openapi-mcp-1.0-jar-with-dependencies.jar > ../tools.json
cd ..
                  `} className="text-xs mt-1" />
                   E então reinicie o container do MCP Toolbox: <code>docker restart BrainAPI-mcp</code>.
                </li>
                <li><strong>Verificar o conteúdo do arquivo <code>tools.json</code>:</strong>
                  <CodeBlock language="bash" code="cat tools.json | jq ." className="text-xs mt-1" />
                  (Use uma ferramenta como <code>jq</code> para formatar e validar o JSON. Verifique se a estrutura parece correta e se as ferramentas esperadas estão listadas).
                </li>
                 <li><strong>Verificar os logs do MCP Toolbox:</strong> <code>docker logs BrainAPI-mcp</code>. Ele pode indicar exatamente onde está o problema ao carregar/parsear o <code>tools.json</code>.</li>
              </ul>
            </div>
          </details>

          <details className="p-3 border rounded-lg hover:border-secondary-blue transition-colors duration-200">
            <summary className="font-medium text-brand-gray-800 cursor-pointer flex justify-between items-center">
              4. Erro "Porta em Uso" (Address already in use)
              <span className="text-sm text-secondary-blue group-open:rotate-90 transform transition-transform duration-200">▼</span>
            </summary>
            <div className="mt-3 text-sm text-brand-gray-600 space-y-2">
              <p><strong>Sintoma Comum:</strong> Ao tentar iniciar o MCP Toolbox (Docker) ou o ADK Agent (Java/Spring Boot), você recebe um erro indicando que a porta (ex: 8080 ou 8081) já está em uso.</p>
              <p><strong>Soluções:</strong></p>
              <ul className="list-disc pl-5">
                <li><strong>Identificar o processo usando a porta:</strong>
                  <CodeBlock language="bash" title="Linux/macOS" code="lsof -i :8080  # Substitua 8080 pela porta em questão" className="text-xs mt-1" />
                  <CodeBlock language="powershell" title="Windows (PowerShell)" code="Get-Process -Id (Get-NetTCPConnection -LocalPort 8080).OwningProcess" className="text-xs mt-1" />
                </li>
                <li><strong>Parar o processo conflitante:</strong> Se for um processo que você pode parar, use <code>kill -9 &lt;PID&gt;</code> (Linux/macOS) ou finalize a tarefa no Gerenciador de Tarefas (Windows). Se for outro container Docker, pare-o com <code>docker stop &lt;container_id_ou_nome&gt;</code>.</li>
                <li><strong>Usar uma porta alternativa:</strong>
                  <ul className="list-disc pl-5 mt-1">
                    <li>Para o ADK Agent: Modifique o argumento <code>--server.port</code>:
                      <CodeBlock language="bash" code={'mvn compile exec:java "-Dexec.args=--server.port=8082"'} className="text-xs mt-1" />
                    </li>
                    <li>Para o MCP Toolbox (Docker): Mude o mapeamento de porta no comando <code>docker run</code>:
                      <CodeBlock language="bash" code={"docker run -d -p 8083:8080 ... # Mapeia porta 8083 do host para 8080 do container"} className="text-xs mt-1" />
                       Lembre-se de que se você mudar a porta do MCP Toolbox, precisará atualizar a configuração do ADK Agent para que ele aponte para a nova porta.
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </details>
        </Card>

        <Card>
          <h3 className="text-xl font-semibold text-primary-blue mb-4">🔍 Debug e Logs Avançados</h3>
            <h4 className="text-lg font-medium text-brand-gray-800 mb-2">Habilitando Logs Detalhados:</h4>
            <p className="text-sm text-brand-gray-600 mb-2">Para obter mais informações durante o troubleshooting:</p>
            <CodeBlock language="bash" title="ADK Agent com Logs DEBUG/TRACE:" code={`
# Exemplo para ADK Agent (Java/Spring Boot)
mvn compile exec:java "-Dexec.args=--server.port=8081 \\
     --logging.level.com.google.adk=DEBUG \\
     --logging.level.com.example.brainapi=TRACE" 
     # Substitua com.example.brainapi pelo seu pacote raiz
            `} />
            <CodeBlock language="bash" title="MCP Toolbox com Logs Verbose/DEBUG:" code={`
# Exemplo para MCP Toolbox (Docker), pode variar pela imagem
docker run -p 8080:8080 \\
  -v $(pwd)/tools.json:/tools.json \\
  -e LOG_LEVEL=DEBUG \\ # Ou outra variável de ambiente similar
  us-central1-docker.pkg.dev/database-toolbox/toolbox/toolbox:$VERSION \\
  --tools-file=/tools.json --verbose # Argumento --verbose se suportado
            `} />
            <h4 className="text-lg font-medium text-brand-gray-800 mt-4 mb-2">Monitoramento em Tempo Real:</h4>
             <CodeBlock language="bash" title="Logs do ADK Agent (se configurado para arquivo):" code={"tail -f BrainAPI-agent/logs/application.log"} />
             <CodeBlock language="bash" title="Logs do MCP Toolbox (container):" code={"docker logs -f BrainAPI-mcp"} />
             <CodeBlock language="bash" title="Monitoramento de Recursos do Container:" code={"docker stats BrainAPI-mcp"} />
        </Card>
      </div>
    ),
  }
];
