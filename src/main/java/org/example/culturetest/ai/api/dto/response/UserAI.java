package org.example.culturetest.ai.api.dto.response;

public record UserAI(
        Long id,
        String name,
        String totalScore,
        String recommendation
) {
}
