package org.example.culturetest.testAttempts.db;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestAttemptsRepository extends JpaRepository<TestAttemptEntity,Long> {
    List<TestAttemptEntity> findAllByUserId(Long userId);
}
