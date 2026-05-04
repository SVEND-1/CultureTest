package org.example.culturetest.users.api.dto.users.response;


import org.example.culturetest.users.db.Role;

public record UserRegistrationResponse(
        Long id,
        String name,
        String email,
        String password,
        Role role
) {
}
