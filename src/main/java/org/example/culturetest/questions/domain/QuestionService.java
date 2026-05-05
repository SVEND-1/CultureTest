package org.example.culturetest.questions.domain;

import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.culturetest.answerOptions.db.AnswerOptionEntity;
import org.example.culturetest.questions.api.dto.Question;
import org.example.culturetest.questions.api.dto.request.CreateQuestionRequest;
import org.example.culturetest.questions.db.QuestionEntity;
import org.example.culturetest.questions.db.QuestionRepository;
import org.example.culturetest.questions.domain.mapper.QuestionMapper;
import org.example.culturetest.tests.db.TestEntity;
import org.example.culturetest.tests.db.TestRepository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final TestRepository testRepository;
    private final QuestionMapper questionMapper;

    public QuestionEntity findByIdEntity(Long id) {
        return questionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Вопрос не найден"));
    }

    public Question findById(Long id) {
        return questionMapper.convertEntityToDTO(findByIdEntity(id));
    }

    @Transactional(readOnly = true)
    public List<Question> findAllByTestId(Long testId) {
        try {
            TestEntity test = testRepository.findById(testId)
                    .orElseThrow(() -> new EntityNotFoundException("Тест не найден"));
            return questionMapper.convertEntityListToDTO(test.getQuestions());
        } catch (Exception e) {
            log.error("Не удалось получить вопросы теста, ex={}", e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public String addQuestionToTest(Long testId, CreateQuestionRequest request) {
        try {
            TestEntity test = testRepository.findById(testId)
                    .orElseThrow(() -> new EntityNotFoundException("Тест не найден"));

            QuestionEntity question = QuestionEntity.builder()
                    .text(request.text())
                    .type(request.type())
                    .createAt(LocalDateTime.now())
                    .build();

            List<AnswerOptionEntity> answerOptions = request.answerOptions().stream()
                    .map(opt -> AnswerOptionEntity.builder()
                            .text(opt.text())
                            .isCorrect(opt.isCorrect())
                            .question(question)
                            .build())
                    .toList();

            question.setAnswerOptions(answerOptions);
            question.setTest(test);

            questionRepository.save(question);
            return "Успешно";
        } catch (Exception e) {
            log.error("Не удалось добавить вопрос в тест, ex={}", e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public String update(Long id, CreateQuestionRequest request) {
        try {//TODO НЕ ОБНОВЛЯЮТСЯ ОТВЕТЫ НОРМАЛЬНО КАК ДОЛЖНЫ
            QuestionEntity question = findByIdEntity(id);
            question.setText(request.text());
            question.setType(request.type());

            question.getAnswerOptions().clear();
            List<AnswerOptionEntity> answerOptions = request.answerOptions().stream()
                    .map(opt -> AnswerOptionEntity.builder()
                            .text(opt.text())
                            .isCorrect(opt.isCorrect())
                            .question(question)
                            .build())
                    .toList();
            question.getAnswerOptions().addAll(answerOptions);

            questionRepository.save(question);
            return "Успешно";
        } catch (Exception e) {
            log.error("Не удалось обновить вопрос, ex={}", e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public String delete(Long id) {
        try {//TODO из за каскада не правильно удаляется как я задумал
            questionRepository.deleteById(id);
            return "Успешно";
        } catch (Exception e) {
            log.error("Не удалось удалить вопрос, ex={}", e.getMessage());
            throw new RuntimeException(e);
        }
    }
}
