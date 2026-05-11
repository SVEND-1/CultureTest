package org.example.culturetest.tests.api.dto.response;

import org.example.culturetest.questions.api.dto.Question;

import java.util.List;

public record TestResponse(
        Long id,
        String name,
        String description,
        Boolean isDone,
        List<Question> questions
) {
}
