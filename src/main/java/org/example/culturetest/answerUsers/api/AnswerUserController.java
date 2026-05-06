package org.example.culturetest.answerUsers.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.culturetest.answerUsers.api.dto.request.SubmitAnswerRequest;
import org.example.culturetest.answerUsers.domain.AnswerUserService;
import org.example.culturetest.testAttempts.api.dto.TestAttempt;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/answer-users")
@RequiredArgsConstructor
@Tag(name = "AnswerUser", description = "Ответы на вопросы")
public class AnswerUserController {
    private final AnswerUserService answerUserService;

    @Operation(summary = "Ответить на вопрос")
    @PostMapping("/{attemptId}/answer")
    public ResponseEntity<TestAttempt> submitAnswer(@PathVariable Long attemptId,
                                                    @RequestBody SubmitAnswerRequest request) {
        return ResponseEntity.ok(answerUserService.submitAnswer(attemptId, request));
    }
}
