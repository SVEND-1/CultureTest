package org.example.culturetest.ai.domain;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.extern.slf4j.Slf4j;
import org.example.culturetest.ai.api.dto.response.UserAI;
import org.example.culturetest.testAttempts.api.dto.TestAttempt;
import org.example.culturetest.testAttempts.domain.TestAttemptService;
import org.example.culturetest.tests.api.dto.Test;
import org.example.culturetest.tests.api.dto.response.TestResponse;
import org.example.culturetest.tests.domain.TestService;
import org.example.culturetest.users.api.dto.users.User;
import org.example.culturetest.users.api.dto.users.response.UserDefaultResponse;
import org.example.culturetest.users.domain.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;


@Slf4j
@Service
public class AIService {

    private final RestClient restClient;
    private final ObjectMapper objectMapper;
    private final TestAttemptService testAttemptService;
    private final UserService userService;
    private final TestService testService;

    public AIService(@Value("${spring.ai.openai.api-key}") String apiKey, TestAttemptService testAttemptService, UserService userService, TestService testService) {
        this.restClient = RestClient.builder()
                .baseUrl("https://api.groq.com/openai/v1")
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .defaultHeader("Content-Type", "application/json")
                .build();
        this.objectMapper = new ObjectMapper();
        this.objectMapper.registerModule(new JavaTimeModule());
        this.objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        this.testAttemptService = testAttemptService;
        this.userService = userService;
        this.testService = testService;
    }

    @Transactional
    public List<UserAI> personSearch(String role) {
        try {
            String json = ask(role);
            return objectMapper.readValue(json, new TypeReference<List<UserAI>>() {});
        }catch (Exception e) {
            log.error("Не получилось выдать спикок кандидатов,ex={}",e.getMessage());
            throw new RuntimeException(e);
        }
    }

    private String ask(String role) {
        try {
            Map<String, Object> request = Map.of(
                    "model", "llama-3.3-70b-versatile",
                    "messages", List.of(Map.of("role", "user", "content", prompt(role))),
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

    private String prompt(String role) {
        try {
            List<TestAttempt> testAttempts = testAttemptService.findAll();
            List<UserDefaultResponse> users = userService.findAll();
            List<TestResponse> tests = testService.findAllByIA();

            String jsonUsers = objectMapper.writeValueAsString(users);
            String jsonTestAttempt = objectMapper.writeValueAsString(testAttempts);
            String jsonTest = objectMapper.writeValueAsString(tests);

            int topCount = Math.min(3, users.size());

            return String.format("""
    Ты - HR-эксперт по подбору персонала для позиции: **%s**
    
    ## ТЕСТИРОВАНИЕ
    %s
    
    ## СОТРУДНИКИ (всего %d человек)
    %s
    
    ## РЕЗУЛЬТАТЫ ТЕСТИРОВАНИЯ
    %s
    
    ## ЗАДАЧА
    Определи ТОП-%d лучших кандидатов для позиции "%s".
    
    ### КРИТЕРИИ ОЦЕНКИ:
    1. Общий балл за тест (чем выше, тем лучше)
    2. Количество правильных ответов
    3. Скорость выполнения теста
    4. Правильные ответы на сложные вопросы
    
    ### ВАЖНЫЕ ПРАВИЛА:
    1. Ты ДОЛЖЕН вернуть ровно %d кандидатов
    2. Если у сотрудника нет результатов тестирования - верни его с пометкой "Нет данных"
    3. Если сотрудников меньше %d - верни всех доступных
    4. ОБЯЗАТЕЛЬНО включи в ответ ВСЕХ %d сотрудников (отсортируй: сначала с данными, потом без)
    5. НЕ игнорируй сотрудников без результатов
    
    ### ФОРМАТ ОТВЕТА (строго JSON массив из %d элементов):
    [
      {
        "id": число,
        "name": "имя сотрудника",
        "totalScore": число или null,
        "recommendation": "конкретная причина - почему подходит/не подходит"
      }
    ]
    
    ### ПРИМЕР ПРАВИЛЬНОГО ОТВЕТА ДЛЯ %d КАНДИДАТОВ:
    [
      {
        "id": 1,
        "name": "Иван",
        "totalScore": 85.5,
        "recommendation": "Хороший результат, правильно ответил на 85%% вопросов"
      },
      {
        "id": 2,
        "name": "Мария",
        "totalScore": null,
        "recommendation": "Нет данных тестирования, не проходил тест"
      }
    ]
    
    ТВОЙ ОТВЕТ (ТОЛЬКО JSON, БЕЗ пояснений, ровно %d элементов):
    """,
                    role,
                    jsonTest,
                    users.size(),
                    jsonUsers,
                    jsonTestAttempt,
                    topCount,
                    role,
                    topCount,
                    topCount,
                    users.size(),
                    topCount,
                    topCount,
                    topCount
            );
        } catch (Exception e) {
            log.error("Не получилось собрать промпт, ex={}", e.getMessage(), e);
            throw new RuntimeException(e);
        }
    }
}