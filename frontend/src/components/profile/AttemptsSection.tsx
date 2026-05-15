// ============================================================
// AttemptsSection.tsx — история тестов пользователя
// ============================================================

import React from 'react';
import type { TestAttemptProfile } from '../../types/profile/profile.types';
import '../../style/profile/profile.attempts.css';

interface AttemptsSectionProps {
    attempts: TestAttemptProfile[];
}

const formatDate = (iso: string): string => {
    try {
        return new Date(iso).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    } catch {
        return iso;
    }
};

const AttemptsSection: React.FC<AttemptsSectionProps> = ({ attempts }) => (
    <section className="attempts-section">
        <h2 className="attempts-section__title">
            История тестов
            <span className="attempts-count-badge">{attempts.length}</span>
        </h2>

        {attempts.length === 0 ? (
            <div className="attempts-empty">
                <span className="attempts-empty__icon">📋</span>
                <span className="attempts-empty__text">Вы ещё не прошли ни одного теста</span>
            </div>
        ) : (
            <div className="attempts-list">
                {attempts.map((a, i) => (
                    <div key={`${a.id}-${i}`} className="attempt-item">
                        <div className="attempt-item__left">
                            <div className="attempt-item__icon">✓</div>
                            <div>
                                <span className="attempt-item__title">{a.testName}</span>
                                <span className="attempt-item__date">{formatDate(a.completedAt)}</span>
                            </div>
                        </div>
                        <div className="attempt-item__score">
                            {(a.totalScore ?? 0).toFixed(1)}
                            <span className="attempt-item__score-label">балл</span>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </section>
    );

    export default AttemptsSection;