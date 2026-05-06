package org.example.culturetest.answerUsers.domain;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.culturetest.answerOptions.db.AnswerOptionEntity;
import org.example.culturetest.answerUsers.api.dto.request.SubmitAnswerRequest;
import org.example.culturetest.answerUsers.db.AnswerUserEntity;
import org.example.culturetest.questions.db.QuestionEntity;
import org.example.culturetest.testAttempts.api.dto.TestAttempt;
import org.example.culturetest.testAttempts.db.TestAttemptEntity;
import org.example.culturetest.testAttempts.domain.TestAttemptService;
import org.example.culturetest.testAttempts.domain.mapper.TestAttemptMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class AnswerUserService {

    private final TestAttemptService testAttemptService;
    private final TestAttemptMapper testAttemptMapper;

    @Transactional//TODO ПЕРЕПИСАТЬ ЕСЛИ УБЕРУ КАСКАД
    public TestAttempt submitAnswer(Long attemptId, SubmitAnswerRequest request) {//TODO добавить проверку что на вопрос ещё не было ответа
        try {
            TestAttemptEntity attempt = testAttemptService.findByIdEntity(attemptId);

            isValidCompleted(attempt);

            QuestionEntity question = attempt.getTest().getQuestions().stream()
                    .filter(q -> q.getId().equals(request.questionId()))
                    .findFirst()
                    .orElseThrow(() -> new EntityNotFoundException("Вопрос не найден в данном тесте"));

            AnswerOptionEntity selectedOption = question.getAnswerOptions().stream()
                    .filter(opt -> opt.getId().equals(request.selectedAnswerId()))
                    .findFirst()
                    .orElseThrow(() -> new EntityNotFoundException("Вариант ответа не найден"));

            AnswerUserEntity answerUser = AnswerUserEntity.builder()
                    .testAttempt(attempt)
                    .question(question)
                    .selectedAnswerId(selectedOption.getId())
                    .isCorrect(selectedOption.getIsCorrect())
                    .completedAt(LocalDateTime.now())
                    .build();

            attempt.getUserAnswers().add(answerUser);
            testAttemptService.save(attempt);

            return testAttemptMapper.convertEntityToDTO(attempt);
        } catch (Exception e) {
            log.error("Не удалось сохранить ответ, ex={}", e.getMessage());
            throw new RuntimeException(e);
        }
    }

    private void isValidCompleted(TestAttemptEntity attempt) {
        if (attempt.getCompletedAt() != null) {
            throw new IllegalArgumentException("Тест уже завершён");
        }
    }
}
