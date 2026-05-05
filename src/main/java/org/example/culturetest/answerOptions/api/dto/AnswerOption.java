package org.example.culturetest.answerOptions.api.dto;

public record AnswerOption(
        Long id,
        String text,
        Boolean isCorrect
) {
}
