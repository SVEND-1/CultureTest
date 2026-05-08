package org.example.culturetest.users.domain.mapper;

import org.example.culturetest.testAttempts.api.dto.TestAttempt;
import org.example.culturetest.testAttempts.api.dto.response.TestAttemptAdmin;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AdminMapper {
    List<TestAttemptAdmin> convertToTestAttemptAdmin(List<TestAttempt> testAttempts);
}
