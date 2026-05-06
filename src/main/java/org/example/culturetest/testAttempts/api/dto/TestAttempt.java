package org.example.culturetest.testAttempts.api.dto;

import org.example.culturetest.answerUsers.api.dto.AnswerUser;

import java.time.LocalDateTime;
import java.util.List;

public record TestAttempt(
        Long id,
        Long userId,
        Long testId,
        LocalDateTime startedAt,
        LocalDateTime completedAt,
        Double totalScore,
        List<AnswerUser> userAnswers
) {
}
