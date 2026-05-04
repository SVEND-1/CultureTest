package org.example.culturetest.users.api.dto.auth.response;

public record RegistrationResponse(
        boolean success,
        String message,
        String registrationId
) {
}
