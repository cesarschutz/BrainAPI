import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.adk.agents.BaseAgent;
import com.google.adk.agents.LlmAgent;
import com.google.adk.tools.AgentTool;
import com.google.adk.tools.BaseTool;
import com.google.adk.tools.GoogleSearchTool;
import com.google.adk.tools.mcp.McpToolset;
import com.google.adk.tools.mcp.SseServerParameters;

public class BrainAPI {

    private static final Logger logger = Logger.getLogger(BrainAPI.class.getName());

    // --- Define Constants ---
    private static final String MODEL_NAME = "gemini-2.0-flash";

    // ROOT_AGENT needed for ADK Web UI. 
    public static BaseAgent ROOT_AGENT = initAgent();

    public static BaseAgent initAgent() {
        // Set up MCP Toolbox connection to Cloud SQL 
        try {
            String mcpServerUrl = System.getenv("MCP_TOOLBOX_URL");
            if (mcpServerUrl == null || mcpServerUrl.isEmpty()) {
                mcpServerUrl = "http://127.0.0.1:5001/mcp/"; // Fallback URL
                logger.warning("⚠️ MCP_TOOLBOX_URL environment variable not set, using default:" + mcpServerUrl);
            }

            SseServerParameters params = SseServerParameters.builder().url(mcpServerUrl).build();
            logger.info("🕰️ Initializing MCP toolset with params" + params);

            McpToolset.McpToolsAndToolsetResult result = McpToolset.fromServer(params, new ObjectMapper()).get();
            logger.info("⭐ MCP Toolset initialized: " + result.toString());
            if (result.getTools() != null && !result.getTools().isEmpty()) {
                logger.info("⭐ MCP Tools loaded: " + result.getTools().size());
            }
            List<BaseTool> mcpTools = result.getTools().stream()
                    .map(mcpTool -> (BaseTool) mcpTool)
                    .toList();
            logger.info("🛠️ MCP TOOLS: " + mcpTools.toString());

            // Add GoogleSearch tool - Workaround for https://github.com/google/adk-python/issues/134 
            LlmAgent googleSearchAgent = LlmAgent.builder()
                    .model("gemini-2.0-flash")
                    .name("google_search_agent")
                    .description("Search Google Search")
                    .instruction("""
                            You're a specialist in Google Search
                            """)
                    .tools(new GoogleSearchTool()) // Your Google search tool
                    .outputKey("google_search_result")
                    .build();
            AgentTool searchTool = AgentTool.create(googleSearchAgent, false);
            List<BaseTool> allTools = new ArrayList<>(mcpTools);
            allTools.add(searchTool);
            logger.info("🌈 ALL TOOLS: " + allTools.toString());
            return LlmAgent.builder()
                    .model(MODEL_NAME)
                    .name("CardMaster")
                    .description("Seu especialista na API de Cartões e Contas. Realiza consultas, bloqueios e outras operações de forma rápida e precisa.")
                    .instruction(
                            """
                            Você é o CardMaster, um assistente especialista na API de cartões e contas da nossa empresa. Sua missão é ajudar a equipe de desenvolvimento a interagir com a API de forma eficiente, técnica e um pouco descontraída. Você é a alternativa inteligente e amigável ao Postman.
            
                            Seu processo é o seguinte:
            
                            1.  **Saudação e Análise do Pedido:** Comece com uma saudação rápida e analise a solicitação do usuário. Identifique claramente a intenção: consultar dados de um cartão, obter informações de uma conta, bloquear um cartão, etc. Se o pedido não for claro, peça para especificarem.
            
                            2.  **Seleção da Ferramenta Correta:** Com base no pedido, identifique a ferramenta exata na sua caixa de ferramentas da API (`block-card`, `get-card-details`, `get-card-account-info`, etc.).
            
                            3.  **Validação de Parâmetros:** Antes de executar qualquer ação, verifique se todos os parâmetros necessários foram fornecidos (como `card_id` ou `account_id`). Se algo estiver faltando, informe ao usuário de forma clara e objetiva o que é necessário.
            
                            4.  **Execução e Retorno:** Chame a ferramenta da API.
                                * **Sucesso com Dados:** Se a chamada retornar um objeto (como os detalhes de um cartão ou conta), apresente o resultado SEMPRE em um bloco de código JSON formatado de forma elegante. Use uma breve introdução como "Aqui estão os detalhes do cartão solicitado:" ou "Missão cumprida! Segue o JSON da conta:".
                                * **Sucesso sem Dados:** Se a operação for bem-sucedida mas não retornar dados (como um bloqueio de cartão), confirme a ação de forma positiva. Ex: "`O cartão com final 4321 foi bloqueado com sucesso! Mantenha a calma e siga em frente.`"
                                * **Erro na API:** Se a API retornar um erro, apresente o status do erro (ex: `404 Not Found`) e a mensagem de erro da API em um formato claro, para que a equipe possa depurar rapidamente. Ex: "`Alerta vermelho! A API retornou um erro 404. Detalhes: { 'error': 'Cartão não encontrado' }.`"
            
                            5.  **Próximo Passo:** Sempre termine perguntando qual será a próxima missão, como por exemplo: "O que mais posso fazer por você?" ou "Pronto para o próximo desafio?".
                            """)
                    .tools(allTools)
                    .outputKey("bug_assistant_result")
                    .build();
        } catch (Exception e) {
            logger.info("Error initializing MCP toolset and starting agent " + e.getMessage());
            return null;
        }
    }
}
