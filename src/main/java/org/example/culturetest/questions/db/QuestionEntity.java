package org.example.culturetest.questions.db;

import jakarta.persistence.*;
import lombok.*;
import org.example.culturetest.answerOptions.db.AnswerOptionEntity;
import org.example.culturetest.tests.db.TestEntity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "questions")
public class QuestionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "text",nullable = false, columnDefinition = "TEXT")
    private String text;

    @Column(name = "type", nullable = false)
    private QuestionType type;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, fetch = FetchType.EAGER)//TODO Поменять на Lazy
    private List<AnswerOptionEntity> answerOptions = new ArrayList<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "test_id", nullable = false)
    private TestEntity test;

    @Column(name = "create_at")
    private LocalDateTime createAt;
}
