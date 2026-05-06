package org.example.culturetest.testAttempts.api.dto.response;

import java.time.LocalDateTime;

public record TestAttemptProfile(
        Long id,
        String testName,
        Double totalScore,
        LocalDateTime completedAt
) {}
