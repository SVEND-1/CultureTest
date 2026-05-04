package org.example.culturetest.users.api.dto.auth.request;

import jakarta.validation.constraints.NotNull;

public record VerifyRegisterRequest(
        @NotNull
        String registrationId,
        @NotNull
        String code
) {
}
