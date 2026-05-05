package org.example.culturetest.tests.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.culturetest.tests.api.dto.Test;
import org.example.culturetest.tests.api.dto.request.CreateTestRequest;
import org.example.culturetest.tests.api.dto.response.TestResponse;
import org.example.culturetest.tests.domain.TestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tests")
@RequiredArgsConstructor
@Tag(name = "Test", description = "Управление тестами")
public class TestController {

    private final TestService testService;

    @Operation(summary = "Получение всех тестов")
    @GetMapping
    public ResponseEntity<List<Test>> getAll() {
        return ResponseEntity.ok(testService.findAll());
    }

    @Operation(summary = "Получение теста по ID")
    @GetMapping("/{id}")
    public ResponseEntity<TestResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(testService.findById(id));
    }

    @Operation(summary = "Создание теста")
    @PostMapping
    public ResponseEntity<String> create(@RequestBody CreateTestRequest request) {
        return ResponseEntity.ok(testService.create(request));
    }

    @Operation(summary = "Обновление теста")
    @PutMapping("/{id}")
    public ResponseEntity<String> update(@PathVariable Long id,
                                         @RequestBody CreateTestRequest request) {
        return ResponseEntity.ok(testService.update(id, request));
    }

    @Operation(summary = "Смена статуса теста (активен/неактивен)")
    @PatchMapping("/{id}/status")
    public ResponseEntity<String> setActive(@PathVariable Long id,
                                            @RequestParam Boolean isActive) {
        return ResponseEntity.ok(testService.setActive(id, isActive));
    }

    @Operation(summary = "Удаление теста")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        return ResponseEntity.ok(testService.delete(id));
    }
}
