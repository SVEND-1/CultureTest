package org.example.culturetest.answerOptions.api.dto.request;

public record CreateAnswerOptionRequest(
        String text,
        Boolean isCorrect
) {
}
