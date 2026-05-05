package org.example.culturetest.questions.api.dto;

import org.example.culturetest.answerOptions.api.dto.AnswerOption;
import org.example.culturetest.questions.db.QuestionType;

import java.time.LocalDateTime;
import java.util.List;

public record Question(
        Long id,
        String text,
        QuestionType type,
        List<AnswerOption> answerOptions,
        LocalDateTime createAt
) {}