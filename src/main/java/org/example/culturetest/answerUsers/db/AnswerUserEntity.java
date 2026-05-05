package org.example.culturetest.answerUsers.db;

import jakarta.persistence.*;
import lombok.*;
import org.example.culturetest.questions.db.QuestionEntity;
import org.example.culturetest.testAttempts.db.TestAttemptEntity;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "answer_users")
public class AnswerUserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "selected_answer_id")
    private Long selectedAnswerId;//TODO ЕСЛИ НАДО БУДЕТ НЕСКОЛЬКО ВОПРОСОВ ТО СДЕЛАТЬ STRING

    @Column(name = "is_correct", nullable = false)
    private Boolean isCorrect;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "attempt_id", nullable = false)
    private TestAttemptEntity testAttempt;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "question_id", nullable = false)
    private QuestionEntity question;
}
