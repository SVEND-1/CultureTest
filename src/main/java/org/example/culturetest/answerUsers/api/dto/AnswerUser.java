package org.example.culturetest.answerUsers.api.dto;

import java.time.LocalDateTime;

public record AnswerUser(
        Long id,
        Long questionId,
        Long selectedAnswerId,
        Boolean isCorrect,
        LocalDateTime completedAt
) {
}
