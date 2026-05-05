package org.example.culturetest.answerOptions.db;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerOptionRepository extends JpaRepository<AnswerOptionEntity,Long> {
}
