package org.example.culturetest.users.api.dto.auth.response;

public record LoginResponse(
        boolean success,
        String message) {
}
