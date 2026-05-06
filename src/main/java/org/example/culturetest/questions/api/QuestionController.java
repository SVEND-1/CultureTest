package org.example.culturetest.questions.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.culturetest.questions.api.dto.Question;
import org.example.culturetest.questions.api.dto.request.CreateQuestionRequest;
import org.example.culturetest.questions.domain.QuestionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
@Tag(name = "Question", description = "Управление вопросами")
public class QuestionController {

    private final QuestionService questionService;

    @Operation(summary = "Получение всех вопросов теста")
    @GetMapping("/test/{testId}")
    public ResponseEntity<List<Question>> getAllByTest(@PathVariable Long testId) {
        return ResponseEntity.ok(questionService.findAllByTestId(testId));
    }

    @Operation(summary = "Получение вопроса по ID")
    @GetMapping("/{id}")
    public ResponseEntity<Question> getById(@PathVariable Long id) {
        return ResponseEntity.ok(questionService.findById(id));
    }
}
