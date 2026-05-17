import type { TestAttemptAdmin, AdminTest } from '../../types/adminProfile/adminProfile.types';

interface Props {
    attempts: TestAttemptAdmin[];
    tests: AdminTest[];
    onAttemptClick: (attempt: TestAttemptAdmin) => void;
}

const formatDate = (iso: string): string => {
    try {
        return new Date(iso).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    } catch {
        return iso;
    }
};

const AdminAttemptsCard = ({ attempts, tests, onAttemptClick }: Props) => {
    const getTestTitle = (testId: number) => {
        return tests.find(t => t.id === testId)?.title || `Тест #${testId}`;
    };

    return (
        <div className="profile-card">
            <h2 className="attempts-section__title">
                Последние попытки:
                <span className="admin-count-badge">{attempts.length}</span>
            </h2>

            {attempts.length === 0 ? (
                <div className="attempts-empty">
                    <span className="attempts-empty__icon">📊</span>
                    <span className="attempts-empty__text">Попыток пока нет</span>
                </div>
            ) : (
                <div className="attempts-list">
                    {attempts.map(attempt => (
                        <div
                            key={attempt.id}
                            className="attempt-item"
                            onClick={() => onAttemptClick(attempt)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="attempt-item__left">
                                <div className="attempt-item__icon">✓</div>
                                <div>
                                    <span className="attempt-item__title">{getTestTitle(attempt.testId)}</span>
                                    <span className="attempt-item__date">
                                        {attempt.userName} · {formatDate(attempt.completedAt)}
                                    </span>
                                </div>
                            </div>
                            <div className="attempt-item__score">
                                {attempt.totalScore}
                                <span className="attempt-item__score-label">балл</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminAttemptsCard;