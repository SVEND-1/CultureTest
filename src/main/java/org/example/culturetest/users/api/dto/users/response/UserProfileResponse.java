package org.example.culturetest.users.api.dto.users.response;


import org.example.culturetest.testAttempts.api.dto.response.TestAttemptProfile;

import java.util.List;

public record UserProfileResponse(
        String name,
        String email,
        List<TestAttemptProfile> attempts,
        Double totalScore,
        Double totalScoreThinking,
        Double totalScoreAffiliation,
        Double totalScoreFlexibility,
        Double totalScoreExperience
) {
}
