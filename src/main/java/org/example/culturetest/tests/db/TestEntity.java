package org.example.culturetest.tests.db;

import jakarta.persistence.*;
import lombok.*;
import org.example.culturetest.questions.db.QuestionEntity;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tests")
public class TestEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name",nullable = false)
    private String name;

    @Column(name = "description",length = 1000)
    private String description;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @OneToMany(mappedBy = "test", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<QuestionEntity> questions = new ArrayList<>();
}
