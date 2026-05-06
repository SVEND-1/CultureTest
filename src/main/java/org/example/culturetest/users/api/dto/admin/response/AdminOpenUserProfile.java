package org.example.culturetest.users.api.dto.admin.response;

import org.example.culturetest.users.api.dto.users.response.UserProfileResponse;

public record AdminOpenUserProfile(
        Long id,
        UserProfileResponse userProfileResponse,
        String privateComment
) {
}
