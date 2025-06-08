
package com.cesar.mcp;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.yaml.snakeyaml.Yaml;

import java.io.FileInputStream;
import java.util.*;

public class OpenApiMcpGenerator {
    public static void main(String[] args) throws Exception {
        Yaml yaml = new Yaml();
        Map<String, Object> spec = yaml.load(new FileInputStream("openapi-extended.yaml"));

        String baseUrl = ((List<Map<String, String>>) spec.get("servers")).get(0).get("url");
        Map<String, Object> paths = (Map<String, Object>) spec.get("paths");

        List<Map<String, Object>> tools = new ArrayList<>();

        for (Map.Entry<String, Object> pathEntry : paths.entrySet()) {
            String path = pathEntry.getKey();
            Map<String, Object> methods = (Map<String, Object>) pathEntry.getValue();

            for (Map.Entry<String, Object> methodEntry : methods.entrySet()) {
                String method = methodEntry.getKey();
                Map<String, Object> operation = (Map<String, Object>) methodEntry.getValue();

                String opId = (String) operation.getOrDefault("operationId", method + "_" + path.replace("/", "_"));
                String summary = (String) operation.getOrDefault("summary", method.toUpperCase() + " " + path);
                List<Map<String, Object>> parameters = (List<Map<String, Object>>) operation.getOrDefault("parameters", new ArrayList<>());

                String finalPath = path;
                Map<String, Object> headers = new LinkedHashMap<>();
                Map<String, Object> queryParams = new LinkedHashMap<>();

                for (Map<String, Object> param : parameters) {
                    String in = (String) param.get("in");
                    String name = (String) param.get("name");
                    if ("path".equals(in)) {
                        finalPath = finalPath.replace("{" + name + "}", "{{." + name + "}}");
                    } else if ("header".equals(in)) {
                        headers.put(name, "valor-do-header");
                    } else if ("query".equals(in)) {
                        queryParams.put(name, "valor-do-queryparam");
                    }
                }

                Map<String, Object> tool = new LinkedHashMap<>();
                tool.put("name", opId);
                tool.put("kind", "http");
                tool.put("method", method.toUpperCase());
                tool.put("path", finalPath);
                tool.put("source", "openapi-source");
                tool.put("description", summary);

                if (!headers.isEmpty()) {
                    tool.put("headers", headers);
                }

                if (!queryParams.isEmpty()) {
                    tool.put("queryParams", queryParams);
                }

                if (operation.containsKey("requestBody")) {
                    Map<String, Object> requestBody = (Map<String, Object>) operation.get("requestBody");
                    Map<String, Object> content = (Map<String, Object>) requestBody.get("content");
                    Map.Entry<String, Object> entry = content.entrySet().iterator().next();
                    Map<String, Object> contentMap = (Map<String, Object>) entry.getValue();
                    if (contentMap.containsKey("example")) {
                        tool.put("requestBody", contentMap.get("example"));
                    }
                }

                tools.add(tool);
            }
        }

        Map<String, Object> output = new LinkedHashMap<>();
        Map<String, Object> sources = new LinkedHashMap<>();
        sources.put("openapi-source", Map.of("kind", "http", "baseUrl", baseUrl));
        output.put("sources", sources);
        output.put("tools", tools);

        ObjectMapper mapper = new ObjectMapper();
        System.out.println(mapper.writerWithDefaultPrettyPrinter().writeValueAsString(output));
    }
}
