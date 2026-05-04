package org.example.culturetest.notify.kafka;

import org.example.culturetest.notify.EmailSenderService;
import org.example.culturetest.notify.event.NotifyEvent;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class NotifyKafkaConsumer {
    private final EmailSenderService emailSenderService;

    public NotifyKafkaConsumer(EmailSenderService emailSenderService) {
        this.emailSenderService = emailSenderService;
    }

    @KafkaListener(topics = "notifyUser")
    public void consumeNotify(NotifyEvent event) {
        emailSenderService.sendEmail(event);
    }
}
