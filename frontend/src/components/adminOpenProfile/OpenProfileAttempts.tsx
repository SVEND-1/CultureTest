// ============================================================
// OpenProfileAttempts.tsx — история попыток пользователя
// ============================================================

import type { TestAttemptProfile } from '../../types/adminOpenProfile/adminOpenProfile.types';

interface Props {
    attempts: TestAttemptProfile[];
}

const formatDate = (iso: string): string => {
    try {
        return new Date(iso).toLocaleDateString('ru-RU', {
            day: '2-digit', month: '2-digit', year: 'numeric',
        });
    } catch {
        return iso;
    }
};

const OpenProfileAttempts = ({ attempts }: Props) => (
    <div className="profile-card">
        <h2 className="attempts-section__title">
            История тестов
            <span className="admin-count-badge">{attempts.length}</span>
        </h2>

        {attempts.length === 0 ? (
            <div className="attempts-empty">
                <span className="attempts-empty__icon">📋</span>
                <span className="attempts-empty__text">Тестов не пройдено</span>
            </div>
        ) : (
            <div className="attempts-list">
                {attempts.map(a => (
                    <div key={a.id} className="attempt-item">
                        <div className="attempt-item__left">
                            <div className="attempt-item__icon">✓</div>
                            <div>
                                <span className="attempt-item__title">{a.testName}</span>
                                <span className="attempt-item__date">{formatDate(a.completedAt)}</span>
                            </div>
                        </div>
                        <div className="attempt-item__score">
                            {a.totalScore?.toFixed(1) ?? '—'}
                            <span className="attempt-item__score-label">балл</span>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
);

export default OpenProfileAttempts;
