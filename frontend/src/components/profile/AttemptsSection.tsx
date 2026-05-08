import React from 'react';
import type {TestAttemptProfile} from '../../types/profile/profile.types';
import '../../style/profile/profile.attempts.css';

interface AttemptsSectionProps {
  attempts: TestAttemptProfile[];
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

const AttemptsSection: React.FC<AttemptsSectionProps> = ({ attempts }) => {
  if (attempts.length === 0) {
    return (
      <section className="attempts-section">
        <h2 className="attempts-section__title">История тестов</h2>
        <div className="attempts-empty">
          <span className="attempts-empty__icon">📋</span>
          <p className="attempts-empty__text">Вы ещё не прошли ни одного теста</p>
        </div>
      </section>
    );
  }

  return (
    <section className="attempts-section">
      <h2 className="attempts-section__title">История тестов</h2>
      <div className="attempts-list">
        {attempts.map((attempt, index) => (
          <div key={`${attempt.testId}-${index}`} className="attempt-item">
            <div className="attempt-item__left">
              <span className="attempt-item__icon">✓</span>
              <div>
                <span className="attempt-item__title">{attempt.testTitle}</span>
                <span className="attempt-item__date">{formatDate(attempt.completedAt)}</span>
              </div>
            </div>
            <div className="attempt-item__score">
                {(attempt.score ?? 0).toFixed(1)}
              <span className="attempt-item__score-label">балл</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AttemptsSection;
