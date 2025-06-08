
FROM eclipse-temurin:17

WORKDIR /app
COPY . .

RUN ./mvnw clean package -DskipTests

CMD ["java", "-jar", "target/openapi-mcp-1.0-jar-with-dependencies.jar"]
