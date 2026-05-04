package org.example.culturetest.users.api.dto.users;

import org.example.culturetest.users.db.Role;

public record User(
        Long id,
        String name,
        String email,
        Role role
) {
}
