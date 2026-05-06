package org.example.culturetest.tests.domain;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.culturetest.tests.api.dto.Test;
import org.example.culturetest.tests.api.dto.request.CreateTestRequest;
import org.example.culturetest.tests.api.dto.response.TestResponse;
import org.example.culturetest.tests.db.TestEntity;
import org.example.culturetest.tests.db.TestRepository;
import org.example.culturetest.tests.domain.mapper.TestMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TestService {//TODO ДОБАВИТЬ DTO

    private final TestRepository testRepository;
    private final TestMapper testMapper;

    public TestEntity findByIdEntity(Long id) {
        return testRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Тест не найден"));
    }

    public TestResponse findById(Long id) {
        return testMapper.convertDTOToResponse(findByIdEntity(id));
    }

    @Transactional(readOnly = true)
    public List<Test> findAll() {//TODO может сделать пометку пройден или нет
        try {
            return testMapper.convertEntityListToDTO(testRepository.findByIsActive(true));
        } catch (Exception e) {
            log.error("Не удалось получить список тестов, ex={}", e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public String create(CreateTestRequest request) {
        try {
            testRepository.save(TestEntity.builder()
                    .name(request.name())
                    .description(request.description())
                    .isActive(true)
                    .build());

            return "Успешно";
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

    @Transactional
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
}
