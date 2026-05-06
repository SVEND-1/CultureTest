package org.example.culturetest.users.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.culturetest.users.api.dto.users.response.UserProfileResponse;
import org.example.culturetest.users.domain.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "User", description = "Управление пользователями")
public class UserController {

    private final UserService userService;

    @Operation(summary = "Профиль пользователя")
    @GetMapping
    public ResponseEntity<UserProfileResponse> profile(){
        return ResponseEntity.ok(userService.getUserProfile());
    }
}
