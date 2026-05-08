package org.example.culturetest.users.api.dto.admin.response;

import org.example.culturetest.testAttempts.api.dto.TestAttempt;
import org.example.culturetest.testAttempts.api.dto.response.TestAttemptAdmin;
import org.example.culturetest.tests.api.dto.Test;

import java.util.List;

public record AdminProfile(
        List<TestAttemptAdmin> attempts,
        List<Test> tests
) {
}
