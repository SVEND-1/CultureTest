package org.example.culturetest.testAttempts.domain.mapper;

import org.example.culturetest.testAttempts.api.dto.TestAttempt;
import org.example.culturetest.testAttempts.db.TestAttemptEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.util.List;

@Mapper(componentModel = "spring")
public interface TestAttemptMapper {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "test.id", target = "testId")
    TestAttempt convertEntityToDTO(TestAttemptEntity entity);

    List<TestAttempt> convertEntityListToDTO(List<TestAttemptEntity> entities);
}