package org.example.culturetest.ai.api;

import lombok.RequiredArgsConstructor;
import org.example.culturetest.ai.domain.AIService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ai")
public class AIController {

    private final AIService aiService;

    @PostMapping
    public ResponseEntity<String> promt(@RequestParam String name) {
        return ResponseEntity.ok(aiService.ask(name));
    }
}
