// ============================================================
// AdminActionsCard.tsx — быстрые действия админа
// ============================================================

import { useNavigate } from 'react-router-dom';

interface Props {
    addAdminEmail: string;
    setAddAdminEmail: (v: string) => void;
    addAdminLoading: boolean;
    addAdminError: string | null;
    addAdminSuccess: string | null;
    onAddAdmin: () => void;
}

const AdminActionsCard = ({
                              addAdminEmail,
                              setAddAdminEmail,
                              addAdminLoading,
                              addAdminError,
                              addAdminSuccess,
                              onAddAdmin,
                          }: Props) => {
    const navigate = useNavigate();

    return (
        <div className="profile-card admin-actions-card">
            <h2 className="admin-actions__title">Управление</h2>

            {/* Навигационные кнопки */}
            <div className="admin-nav-buttons">
                <button
                    className="admin-nav-btn admin-nav-btn--primary"
                    onClick={() => navigate('/create-test')}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2"
                         strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Создать тест
                </button>

                {/*<button*/}
                {/*    className="admin-nav-btn admin-nav-btn--ghost"*/}
                {/*    onClick={() => navigate('/test-attempts')}*/}
                {/*>*/}
                {/*    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"*/}
                {/*         stroke="currentColor" strokeWidth="2"*/}
                {/*         strokeLinecap="round" strokeLinejoin="round">*/}
                {/*        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>*/}
                {/*        <polyline points="14 2 14 8 20 8"/>*/}
                {/*        <line x1="16" y1="13" x2="8" y2="13"/>*/}
                {/*        <line x1="16" y1="17" x2="8" y2="17"/>*/}
                {/*        <polyline points="10 9 9 9 8 9"/>*/}
                {/*    </svg>*/}
                {/*    Просмотреть попытки*/}
                {/*</button>*/}

                {/*<button*/}
                {/*    className="admin-nav-btn admin-nav-btn--ghost"*/}
                {/*    onClick={() => navigate('/all-tests')}*/}
                {/*>*/}
                {/*    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"*/}
                {/*         stroke="currentColor" strokeWidth="2"*/}
                {/*         strokeLinecap="round" strokeLinejoin="round">*/}
                {/*        <rect x="3" y="3" width="7" height="7"/>*/}
                {/*        <rect x="14" y="3" width="7" height="7"/>*/}
                {/*        <rect x="14" y="14" width="7" height="7"/>*/}
                {/*        <rect x="3" y="14" width="7" height="7"/>*/}
                {/*    </svg>*/}
                {/*    Все тесты*/}
                {/*</button>*/}
            </div>

            {/* Разделитель */}
            <div className="admin-divider"/>

            {/* Добавление админа */}
            <div className="admin-add-section">
                <p className="admin-add-section__label">Назначить администратора</p>
                <div className="admin-add-section__row">
                    <input
                        className="input-field admin-email-input"
                        type="email"
                        placeholder="email пользователя"
                        value={addAdminEmail}
                        onChange={e => setAddAdminEmail(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && onAddAdmin()}
                        disabled={addAdminLoading}
                    />
                    <button
                        className="admin-add-btn"
                        onClick={onAddAdmin}
                        disabled={addAdminLoading || !addAdminEmail.trim()}
                    >
                        {addAdminLoading ? (
                            <span className="admin-add-btn__spinner"/>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" strokeWidth="2.5"
                                 strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                        )}
                        Назначить
                    </button>
                </div>

                {addAdminError && (
                    <p className="admin-add-section__error">{addAdminError}</p>
                )}
                {addAdminSuccess && (
                    <p className="admin-add-section__success">{addAdminSuccess}</p>
                )}
            </div>
        </div>
    );
};

export default AdminActionsCard;