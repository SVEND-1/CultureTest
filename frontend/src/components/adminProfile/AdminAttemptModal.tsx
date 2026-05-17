import { useNavigate } from 'react-router-dom';
import type { TestAttemptAdmin, AdminTest } from '../../types/adminProfile/adminProfile.types';

interface Props {
    attempt: TestAttemptAdmin;
    tests: AdminTest[];
    onClose: () => void;
}

const AdminAttemptModal = ({ attempt, tests, onClose }: Props) => {
    const navigate = useNavigate();

    const formatDate = (iso: string): string => {
        try {
            return new Date(iso).toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        } catch {
            return iso;
        }
    };

    const testTitle = tests.find(t => t.id === attempt.testId)?.title || `Тест #${attempt.testId}`;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-card" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>✕</button>

                <div className="modal-header">
                    <span className="modal-tag">Попытка #{attempt.id}</span>
                    <h3 className="modal-title">{testTitle}</h3>
                </div>

                <p className="modal-desc">Информация о прохождении теста пользователем.</p>

                <div className="modal-meta">
                    <div className="modal-meta__item">
                        <span className="modal-meta__icon">👤</span>
                        <div>
                            <span className="modal-meta__label">Пользователь</span>
                            <span className="modal-meta__value">{attempt.userName}</span>
                        </div>
                    </div>
                    <div className="modal-meta__item">
                        <span className="modal-meta__icon">📊</span>
                        <div>
                            <span className="modal-meta__label">Результат</span>
                            <span className="modal-meta__value">{attempt.totalScore} балл</span>
                        </div>
                    </div>
                </div>

                <div className="modal-meta">
                    <div className="modal-meta__item">
                        <span className="modal-meta__icon">📅</span>
                        <div>
                            <span className="modal-meta__label">Дата</span>
                            <span className="modal-meta__value">{formatDate(attempt.completedAt)}</span>
                        </div>
                    </div>
                </div>

                <div className="modal-actions">
                    <button
                        className="btn-primary btn-primary--full"
                        onClick={() => {
                            navigate(`/admin-open-profile/${attempt.userId}`);
                            onClose();
                        }}
                    >
                        Перейти в профиль пользователя
                    </button>
                    <button className="btn-ghost btn-ghost--full" onClick={onClose}>
                        Закрыть
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminAttemptModal;