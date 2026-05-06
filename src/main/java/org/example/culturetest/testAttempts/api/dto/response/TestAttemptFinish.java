package org.example.culturetest.testAttempts.api.dto.response;

public record TestAttemptFinish(
        Double totalScore,
        Double scoreThinking,
        Double scoreAffiliation,
        Double scoreFlexibility,
        Double scoreExperience
) {
}
