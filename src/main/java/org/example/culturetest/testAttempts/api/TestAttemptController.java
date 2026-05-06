package org.example.culturetest.testAttempts.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.culturetest.testAttempts.api.dto.TestAttempt;
import org.example.culturetest.testAttempts.api.dto.request.StartAttemptRequest;
import org.example.culturetest.testAttempts.api.dto.response.TestAttemptFinish;
import org.example.culturetest.testAttempts.domain.TestAttemptService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test-attempts")
@RequiredArgsConstructor
@Tag(name = "TestAttempt", description = "Прохождение тестов")
public class TestAttemptController {

    private final TestAttemptService testAttemptService;

    @Operation(summary = "Получение попытки по ID")
    @GetMapping("/{id}")
    public ResponseEntity<TestAttempt> getById(@PathVariable Long id) {
        return ResponseEntity.ok(testAttemptService.findById(id));
    }

    @Operation(summary = "Получение всех попыток пользователя")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TestAttempt>> getAllByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(testAttemptService.findAllByUser(userId));
    }

    @Operation(summary = "Начать тест")
    @PostMapping("/start")
    public ResponseEntity<TestAttempt> start(@RequestBody StartAttemptRequest request) {
        return ResponseEntity.ok(testAttemptService.start(request));
    }

    @Operation(summary = "Завершить тест")
    @PostMapping("/{attemptId}/finish")
    public ResponseEntity<TestAttemptFinish> finish(@PathVariable Long attemptId) {
        return ResponseEntity.ok(testAttemptService.finish(attemptId));
    }
}
