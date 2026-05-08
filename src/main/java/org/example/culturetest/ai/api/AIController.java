package org.example.culturetest.ai.api;

import lombok.RequiredArgsConstructor;
import org.example.culturetest.ai.domain.AIService;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ai")
public class AIController {

    private final AIService aiService;

}
