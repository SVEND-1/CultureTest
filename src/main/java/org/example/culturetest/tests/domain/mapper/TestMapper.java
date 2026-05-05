package org.example.culturetest.tests.domain.mapper;

import org.example.culturetest.tests.api.dto.Test;
import org.example.culturetest.tests.api.dto.response.TestResponse;
import org.example.culturetest.tests.db.TestEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TestMapper {

    Test convertEntityToDTO(TestEntity entity);

    TestResponse convertDTOToResponse(TestEntity entity);

    List<Test> convertEntityListToDTO(List<TestEntity> entities);
}
