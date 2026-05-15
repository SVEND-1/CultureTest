package org.example.culturetest.notify;

import lombok.extern.slf4j.Slf4j;
import org.example.culturetest.notify.event.NotifyType;
import org.springframework.stereotype.Service;

import java.util.Map;

@Slf4j
@Service
public class EmailTemplateService {

    public String getSubject(NotifyType type, Map<String, String> params) {
        if (type == null || params == null) {
            return "Уведомление от CultureTest";
        }

        return switch (type) {
            case REGISTER -> String.format("CultureTest: Ваш код для входа [%s]",
                    params.getOrDefault("code", ""));
            case PASSWORD_RESET -> String.format("CultureTest: Сброс пароля [%s]",
                    params.getOrDefault("code", ""));
            case REPLAY_CODE -> String.format("CultureTest: Повторный код [%s]",
                    params.getOrDefault("code", ""));
            case LOGIN -> "CultureTest: Вход в аккаунт";

            default -> "Уведомление от CultureTest";
        };
    }

    public String getContent(NotifyType type, Map<String, String> params) {
        if (type == null || params == null) {
            return "";
        }

        return switch (type) {
            case REGISTER -> String.format("""
                Добро пожаловать в CultureTest!
                
                Ваш код для входа: %s
                
                Введите этот код на странице подтверждения для завершения входа в ваш аккаунт.
                
                Если вы не запрашивали вход, пожалуйста, проигнорируйте это письмо.
                
                С уважением,
                Команда CultureTest
                """, params.getOrDefault("code", ""));

            case PASSWORD_RESET -> String.format("""
                Запрос на сброс пароля
                
                Ваш код подтверждения: %s
                
                Введите этот код на странице подтверждения для сброса пароля.
                
                Если вы не запрашивали сброс пароля, проигнорируйте это письмо.
                
                С уважением,
                Команда CultureTest
                """, params.getOrDefault("code", ""));

            case REPLAY_CODE -> String.format("""
                Был запрошен повторный код
                
                Ваш повторный код: %s
                
                С уважением,
                Команда CultureTest
                """, params.getOrDefault("code", ""));

            case LOGIN -> String.format("""
                Уважаемый %s,
                
                В ваш аккаунт был выполнен вход.
                
                Если это были не вы, пожалуйста, свяжитесь со службой поддержки.
                
                С уважением,
                Команда CultureTest
                """, params.getOrDefault("userName", ""));

        };
    }
}
