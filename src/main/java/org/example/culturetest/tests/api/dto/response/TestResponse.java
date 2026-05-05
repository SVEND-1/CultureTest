package org.example.culturetest.tests.api.dto.response;

import org.example.culturetest.questions.api.dto.Question;

import java.util.List;

public record TestResponse(
        String name,
        String description,
        Boolean isActive,
        List<Question> questions
) {
}
