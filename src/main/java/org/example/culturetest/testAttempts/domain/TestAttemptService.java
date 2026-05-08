package org.example.culturetest.testAttempts.domain;

import org.example.culturetest.answerOptions.db.AnswerOptionEntity;
import org.example.culturetest.answerUsers.db.AnswerUserEntity;
import org.example.culturetest.questions.db.QuestionEntity;
import org.example.culturetest.questions.db.QuestionType;
import org.example.culturetest.testAttempts.api.dto.TestAttempt;
import org.example.culturetest.testAttempts.api.dto.request.StartAttemptRequest;
import org.example.culturetest.testAttempts.api.dto.response.TestAttemptFinish;
import org.example.culturetest.testAttempts.db.TestAttemptEntity;
import org.example.culturetest.testAttempts.db.TestAttemptsRepository;
import org.example.culturetest.tests.domain.TestService;
import org.example.culturetest.users.domain.UserService;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.culturetest.testAttempts.domain.mapper.TestAttemptMapper;
import org.example.culturetest.tests.db.TestEntity;
import org.example.culturetest.users.db.UserEntity;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class TestAttemptService {

    private final TestAttemptsRepository testAttemptRepository;
    private final TestAttemptMapper testAttemptMapper;
    private final UserService userService;
    private final TestService testService;

    public TestAttemptEntity findByIdEntity(Long id) {
        return testAttemptRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Попытка не найдена"));
    }

    public TestAttempt findById(Long id) {
        return testAttemptMapper.convertEntityToDTO(findByIdEntity(id));
    }

    public List<TestAttempt> findAll() {
        return testAttemptMapper.convertEntityListToDTO(testAttemptRepository.findAll());
    }

    @Transactional(readOnly = true)
    public List<TestAttempt> findAllByUser(Long userId) {
        try {
            return testAttemptMapper.convertEntityListToDTO(
                    testAttemptRepository.findAllByUserId(userId)
            );
        } catch (Exception e) {
            log.error("Не удалось получить попытки пользователя, ex={}", e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public TestAttemptEntity save(TestAttemptEntity testAttempt) {
        try {
            return testAttemptRepository.save(testAttempt);
        }catch (Exception e) {
            log.error("Не удалось сохранить попытку теста,ex={}",e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public TestAttempt start(StartAttemptRequest request) {
        try {
            TestEntity test = testService.findByIdEntity(request.testId());
            UserEntity user = userService.getCurrentUser();

            isValidTest(test);

            TestAttemptEntity attempt = TestAttemptEntity.builder()
                    .user(user)
                    .test(test)
                    .startedAt(LocalDateTime.now())
                    .build();

            return testAttemptMapper.convertEntityToDTO(testAttemptRepository.save(attempt));
        } catch (Exception e) {
            log.error("Не удалось начать тест, ex={}", e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public TestAttemptFinish finish(Long attemptId) {
        try {
            TestAttemptEntity attempt = findByIdEntity(attemptId);

            isValidCompleted(attempt);

            List<AnswerUserEntity> allAnswer = attempt.getUserAnswers();
            List<QuestionEntity> allQuestion = attempt.getTest().getQuestions();

            long correctCount = allAnswer.stream()
                    .filter(AnswerUserEntity::getIsCorrect)
                    .count();

            int totalQuestions = attempt.getTest().getQuestions().size();
            double score = totalQuestions > 0
                    ? (double) correctCount / totalQuestions * 100
                    : 0;

            attempt.setTotalScore(score);
            attempt.setCompletedAt(LocalDateTime.now());

            testAttemptRepository.save(attempt);
            return mapperFinish(allQuestion,score);
        } catch (Exception e) {
            log.error("Не удалось завершить тест, ex={}", e.getMessage());
            throw new RuntimeException(e);
        }
    }

    private TestAttemptFinish mapperFinish(List<QuestionEntity> allQuestion, double totalScore) {
        Map<QuestionType, List<QuestionEntity>> questionsByType = allQuestion.stream()
                .collect(Collectors.groupingBy(QuestionEntity::getType));

        return new TestAttemptFinish(
                totalScore,
                calculateScoreForType(questionsByType, QuestionType.THINKING),
                calculateScoreForType(questionsByType, QuestionType.AFFILIATION),
                calculateScoreForType(questionsByType, QuestionType.FLEXIBILITY),
                calculateScoreForType(questionsByType, QuestionType.EXPERIENCE)
        );
    }

    private double calculateScoreForType(Map<QuestionType, List<QuestionEntity>> questionsByType, QuestionType type) {
        List<QuestionEntity> questions = questionsByType.getOrDefault(type, List.of());
        long correctCount = questions.stream()
                .filter(q -> q.getAnswerOptions().stream().anyMatch(AnswerOptionEntity::getIsCorrect))
                .count();
        if (questions.isEmpty()) return 0;
        double raw = (double) correctCount / questions.size() * 100;
        return Math.round(raw * 100.0) / 100.0;
    }

    private void isValidTest(TestEntity test) {
        if (!test.getIsActive()) {
            throw new IllegalArgumentException("Тест неактивен");
        }
    }

    private void isValidCompleted(TestAttemptEntity attempt) {
        if (attempt.getCompletedAt() != null) {
            throw new IllegalArgumentException("Тест уже завершён");
        }
    }
}
