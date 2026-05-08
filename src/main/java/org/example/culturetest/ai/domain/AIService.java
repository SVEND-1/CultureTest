package org.example.culturetest.ai.domain;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;


@Slf4j
@Service
public class AIService {

    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    public AIService(@Value("${groq.api.key}") String apiKey) {
        this.restClient = RestClient.builder()
                .baseUrl("https://api.groq.com/openai/v1")
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .defaultHeader("Content-Type", "application/json")
                .build();
        this.objectMapper = new ObjectMapper();
    }

    public String ask(String question) {
        try {
            Map<String, Object> request = Map.of(
                    "model", "llama-3.3-70b-versatile",
                    "messages", List.of(Map.of("role", "user", "content", question)),
                    "temperature", 0.7
            );

            String response = restClient.post()
                    .uri("/chat/completions")
                    .body(objectMapper.writeValueAsString(request))
                    .retrieve()
                    .body(String.class);

            JsonNode json = objectMapper.readTree(response);
            return json.path("choices").get(0).path("message").path("content").asText();

        } catch (Exception e) {
            log.error("Не удалось получить ответ от нейросети,ex={}", e.getMessage());
            throw new RuntimeException("Не удалось получить ответ от нейросети" + e.getMessage(), e);
        }
    }


}