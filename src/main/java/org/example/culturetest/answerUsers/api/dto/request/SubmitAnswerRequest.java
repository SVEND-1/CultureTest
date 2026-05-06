package org.example.culturetest.answerUsers.api.dto.request;

public record SubmitAnswerRequest(
        Long questionId,
        Long selectedAnswerId
) {}