package org.example.culturetest.users.api;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.example.culturetest.questions.api.dto.request.CreateQuestionRequest;
import org.example.culturetest.questions.domain.QuestionService;
import org.example.culturetest.tests.api.dto.Test;
import org.example.culturetest.tests.api.dto.request.CreateTestRequest;
import org.example.culturetest.tests.domain.TestService;
import org.example.culturetest.users.api.dto.admin.response.AdminOpenUserProfile;
import org.example.culturetest.users.api.dto.admin.response.AdminProfile;
import org.example.culturetest.users.domain.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final TestService testService;
    private final QuestionService questionService;
    private final AdminService adminService;

    @Operation(summary = "Профиль админа")
    @GetMapping
    public ResponseEntity<AdminProfile> profile() {
        return ResponseEntity.ok(adminService.profile());
    }

    @Operation(summary = "Получить профиль пользователя через админа")
    @GetMapping("/{userId}")
    public ResponseEntity<AdminOpenUserProfile> profile(@PathVariable Long userId) {
        return ResponseEntity.ok(adminService.openUserProfile(userId));
    }

    @Operation(summary = "Назначить пользователя админом")
    @PostMapping("/{email}/role")
    public ResponseEntity<String> setRole(@PathVariable String email) {
        return ResponseEntity.ok(adminService.setRole(email));
    }

    @Operation(summary = "Написать комментарий пользователю")
    @PostMapping("/{userId}/comment")
    public ResponseEntity<String> setComment(
            @PathVariable Long userId,
            @RequestParam String comment
    ){
        return ResponseEntity.ok(adminService.writeComment(userId,comment));
    }

    @Operation(summary = "Создание теста")
    @PostMapping("/test")
    public ResponseEntity<Test> create(@RequestBody CreateTestRequest request) {
        return ResponseEntity.ok(testService.create(request));
    }

    @Operation(summary = "Обновление теста")
    @PutMapping("/{id}/test")
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
    @DeleteMapping("/{id}/test")
    public ResponseEntity<String> deleteTest(@PathVariable Long id) {
        return ResponseEntity.ok(testService.delete(id));
    }

    @Operation(summary = "Добавление вопроса в тест")
    @PostMapping("/{testId}/question")
    public ResponseEntity<String> addToTest(@PathVariable Long testId,
                                            @RequestBody CreateQuestionRequest request) {
        return ResponseEntity.ok(questionService.addQuestionToTest(testId, request));
    }

    @Operation(summary = "Обновление вопроса")
    @PutMapping("/{id}/question")
    public ResponseEntity<String> update(@PathVariable Long id,
                                         @RequestBody CreateQuestionRequest request) {
        return ResponseEntity.ok(questionService.update(id, request));
    }

    @Operation(summary = "Удаление вопроса")
    @DeleteMapping("/{id}/question")
    public ResponseEntity<String> deleteQuestion(@PathVariable Long id) {
        return ResponseEntity.ok(questionService.delete(id));
    }
}
