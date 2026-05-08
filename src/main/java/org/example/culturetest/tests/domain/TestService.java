package org.example.culturetest.tests.domain;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.culturetest.testAttempts.db.TestAttemptsRepository;
import org.example.culturetest.tests.api.dto.Test;
import org.example.culturetest.tests.api.dto.request.CreateTestRequest;
import org.example.culturetest.tests.api.dto.response.TestResponse;
import org.example.culturetest.tests.db.TestEntity;
import org.example.culturetest.tests.db.TestRepository;
import org.example.culturetest.tests.domain.mapper.TestMapper;
import org.example.culturetest.users.db.UserEntity;
import org.example.culturetest.users.domain.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TestService {//TODO ДОБАВИТЬ DTO

    private final TestRepository testRepository;
    private final TestMapper testMapper;
    private final UserService userService;
    private final TestAttemptsRepository testAttemptsRepository;

    public TestEntity findByIdEntity(Long id) {
        return testRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Тест не найден"));
    }

    @Transactional
    public TestResponse findById(Long id) {
        TestEntity entity = findByIdEntity(id);
        boolean isDone = hasUserCompletedTest(id);
        TestResponse response = testMapper.convertDTOToResponse(entity);

        return new TestResponse(
                response.name(),
                response.description(),
                isDone,
                response.questions()
        );
    }

    @Transactional(readOnly = true)
    public List<Test> findAll() {
        try {
            return testMapper.convertEntityListToDTO(testRepository.findByIsActive(true));
        } catch (Exception e) {
            log.error("Не удалось получить список тестов, ex={}", e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public Test create(CreateTestRequest request) {
        try {
            TestEntity test = testRepository.save(TestEntity.builder()
                    .name(request.name())
                    .description(request.description())
                    .isActive(true)
                    .build());

            return testMapper.convertEntityToDTO(test);
        } catch (Exception e) {
            log.error("Не удалось создать тест, ex={}", e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public String setActive(Long id, Boolean isActive) {
        try {
            TestEntity test = findByIdEntity(id);
            test.setIsActive(isActive);
            testRepository.save(test);
            return "Успешно";
        } catch (Exception e) {
            log.error("Не удалось сменить статус теста, ex={}", e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public String update(Long id, CreateTestRequest request) {
        try {
            TestEntity test = findByIdEntity(id);
            test.setName(request.name());
            test.setDescription(request.description());
            testRepository.save(test);
            return "Успешно";
        } catch (Exception e) {
            log.error("Не удалось обновить тест, ex={}", e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public String delete(Long id) {
        try {
            testRepository.deleteById(id);
            log.info("Тест с id={} удален",id);
            return "Успешно";
        } catch (Exception e) {
            log.error("Не удалось удалить тест, ex={}", e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public boolean hasUserCompletedTest(Long testId) {
        UserEntity user = userService.getCurrentUser();
        return testAttemptsRepository
                .existsByUserIdAndTestIdAndCompletedAtIsNotNull(user.getId(), testId);
    }

}
