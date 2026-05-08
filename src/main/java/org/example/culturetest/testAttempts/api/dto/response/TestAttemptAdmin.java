package org.example.culturetest.testAttempts.api.dto.response;


import java.time.LocalDateTime;

public record TestAttemptAdmin (
        Long id,
        String userName,
        Long userId,
        Long testId,
        LocalDateTime completedAt,
        Double totalScore
){
}
