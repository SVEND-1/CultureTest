package org.example.culturetest.users.api.dto.users.response;

import org.example.culturetest.users.db.Role;

public record UserDefaultResponse(
        Long id,
        String name,
        String email,
        Role role
) {
}
