package org.example.culturetest.testAttempts.db;

import jakarta.persistence.*;
import lombok.*;
import org.example.culturetest.answerUsers.db.AnswerUserEntity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "test_attempts")
public class TestAttemptEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "started_at", nullable = false)
    private LocalDateTime startedAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @Column(name = "total_score")
    private Double totalScore;

    @Column(name = "public_comment",length = 1000)
    private String publicComment;

    @OneToMany(mappedBy = "testAttempt", cascade = CascadeType.ALL, fetch = FetchType.EAGER)//TODO поменять на lazy
    private List<AnswerUserEntity> userAnswers = new ArrayList<>();
}
