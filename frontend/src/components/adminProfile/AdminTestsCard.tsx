// ============================================================
// AdminTestsCard.tsx — список тестов в профиле
// ============================================================

import type { AdminTest } from '../../types/adminProfile/adminProfile.types';

interface Props {
    tests: AdminTest[];
}

const AdminTestsCard = ({ tests }: Props) => (
    <div className="profile-card">
        <h2 className="attempts-section__title">
            Тесты:
            <span className="admin-count-badge">{tests.length}</span>
        </h2>

        {tests.length === 0 ? (
            <div className="attempts-empty">
                <span className="attempts-empty__icon">📋</span>
                <span className="attempts-empty__text">Тестов пока нет</span>
            </div>
        ) : (
            <div className="attempts-list">
                {tests.map(test => (
                    <div key={test.id} className="attempt-item admin-test-item">
                        <div className="attempt-item__left">
                            <div className={`attempt-item__icon ${test.isActive ? '' : 'attempt-item__icon--inactive'}`}>
                                {test.isActive ? '✓' : '–'}
                            </div>
                            <div>
                                <span className="attempt-item__title">{test.title}</span>
                                <span className="attempt-item__date">{test.description}</span>
                            </div>
                        </div>
                        <div className="admin-test-item__meta">
                            <span className="admin-test-item__questions">
                                {test.questionsCount}
                            </span>
                            <span className={`admin-test-status ${test.isActive ? 'admin-test-status--active' : 'admin-test-status--inactive'}`}>
                                {test.isActive ? 'Активен' : 'Неактивен'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
);

export default AdminTestsCard;