package org.example.culturetest.questions.api.dto.request;

import org.example.culturetest.answerOptions.api.dto.request.CreateAnswerOptionRequest;
import org.example.culturetest.questions.db.QuestionType;

import java.util.List;

public record CreateQuestionRequest(
        String text,
        QuestionType type,
        List<CreateAnswerOptionRequest> answerOptions
) {
}
