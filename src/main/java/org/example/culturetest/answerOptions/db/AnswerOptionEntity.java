package org.example.culturetest.answerOptions.db;

import jakarta.persistence.*;
import lombok.*;
import org.example.culturetest.questions.db.QuestionEntity;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "answer_options")
public class AnswerOptionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "text",nullable = false, columnDefinition = "TEXT")
    private String text;

    @Column(name = "is_correct", nullable = false)
    private Boolean isCorrect;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "question_id", nullable = false)
    private QuestionEntity question;
}
