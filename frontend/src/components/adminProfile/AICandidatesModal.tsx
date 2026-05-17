// ============================================================
// AICandidatesModal.tsx — модалка поиска сотрудников через ИИ
// ============================================================

import type { UserAI } from '../../types/adminProfile/adminProfile.types';

interface Props {
    aiRole: string;
    setAiRole: (v: string) => void;
    aiLoading: boolean;
    aiError: string | null;
    aiCandidates: UserAI[];
    onSearch: () => void;
    onClose: () => void;
    onSelectCandidate: (id: number) => void;
}

const AICandidatesModal = ({
    aiRole,
    setAiRole,
    aiLoading,
    aiError,
    aiCandidates,
    onSearch,
    onClose,
    onSelectCandidate,
}: Props) => (
    <div className="modal-overlay" onClick={onClose}>
        <div className="modal-card ai-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={onClose}>✕</button>

            <div className="modal-header">
                <span className="modal-tag">ИИ-подбор</span>
                <h3 className="modal-title">Подобрать сотрудников</h3>
            </div>

            <p className="modal-desc">
                Введите название профессии или должности — ИИ подберёт топ-3 подходящих сотрудника
                на основе результатов тестирования.
            </p>

            {/* Строка поиска */}
            <div className="ai-modal__search-row">
                <input
                    className="input-field ai-modal__input"
                    type="text"
                    placeholder="Например: Frontend разработчик"
                    value={aiRole}
                    onChange={e => setAiRole(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !aiLoading && onSearch()}
                    disabled={aiLoading}
                />
                <button
                    className="admin-add-btn"
                    onClick={onSearch}
                    disabled={aiLoading || !aiRole.trim()}
                >
                    {aiLoading ? (
                        <span className="admin-add-btn__spinner" />
                    ) : (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2.5"
                             strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"/>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                    )}
                    Найти
                </button>
            </div>

            {/* Ошибка */}
            {aiError && (
                <p className="admin-add-section__error">{aiError}</p>
            )}

            {/* Загрузка */}
            {aiLoading && (
                <div className="ai-modal__loading">
                    <div className="profile-loading__spinner" />
                    <span className="profile-loading__text">ИИ анализирует кандидатов...</span>
                </div>
            )}

            {/* Результаты */}
            {!aiLoading && aiCandidates.length > 0 && (
                <div className="ai-modal__results">
                    <p className="ai-modal__results-label">Топ кандидатов:</p>
                    <div className="attempts-list">
                        {aiCandidates.map((candidate, idx) => (
                            <div
                                key={candidate.id}
                                className="attempt-item ai-candidate-item"
                                onClick={() => onSelectCandidate(candidate.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="attempt-item__left">
                                    <div className="attempt-item__icon ai-candidate-item__rank">
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <span className="attempt-item__title">{candidate.name}</span>
                                        <span className="attempt-item__date">{candidate.recommendation}</span>
                                    </div>
                                </div>
                                <div className="attempt-item__score">
                                    {candidate.totalScore ?? '—'}
                                    <span className="attempt-item__score-label">балл</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
);

export default AICandidatesModal;
