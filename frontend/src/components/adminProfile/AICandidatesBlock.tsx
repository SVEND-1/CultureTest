// ============================================================
// AICandidatesBlock.tsx — блок «Подобрать сотрудников» на странице
// ============================================================

import type { UserAI } from '../../types/adminProfile/adminProfile.types';

interface Props {
    candidates: UserAI[];
    onOpenModal: () => void;
    onSelectCandidate: (id: number) => void;
}

const AICandidatesBlock = ({ candidates, onOpenModal, onSelectCandidate }: Props) => (
    <div className="profile-card">
        <div className="ai-block__header">
            <div>
                <h2 className="attempts-section__title">Подбор сотрудников</h2>
                <p className="ai-block__subtitle">
                    ИИ анализирует результаты тестов и подбирает лучших кандидатов
                </p>
            </div>
            <button
                className="admin-nav-btn admin-nav-btn--primary ai-block__btn"
                onClick={onOpenModal}
            >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2"
                     strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                Подобрать сотрудников
            </button>
        </div>

        {candidates.length === 0 ? (
            <div className="attempts-empty">
                <span className="attempts-empty__icon">🤖</span>
                <span className="attempts-empty__text">
                    Нажмите «Подобрать сотрудников» чтобы найти подходящих кандидатов
                </span>
            </div>
        ) : (
            <div className="attempts-list">
                {candidates.map((candidate, idx) => (
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
        )}
    </div>
);

export default AICandidatesBlock;
