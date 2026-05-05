package org.example.culturetest.tests.api.dto;

public record Test(
        Long id,
        String name,
        String description,
        Boolean isActive
) {
}
