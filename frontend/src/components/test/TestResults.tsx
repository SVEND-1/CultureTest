// ============================================================
// TestResults.tsx — экран результатов теста
// ============================================================

import { useNavigate } from 'react-router-dom';
import type { TestAttemptFinish } from '../../types/test/test.types';

interface Props {
    results: TestAttemptFinish;
    testName: string;
}

interface ScoreItem {
    label: string;
    value: number;
    colorClass: string;
}

const TestResults = ({ results, testName }: Props) => {
    const navigate = useNavigate();

    const items: ScoreItem[] = [
        { label: 'Цифровое мышление',    value: results.scoreThinking,    colorClass: 'score-card--blue'   },
        { label: 'Цифровая аффилиация',  value: results.scoreAffiliation,  colorClass: 'score-card--purple' },
        { label: 'Цифровая гибкость',    value: results.scoreFlexibility,  colorClass: 'score-card--teal'   },
        { label: 'Цифровой опыт',        value: results.scoreExperience,   colorClass: 'score-card--amber'  },
    ];

    const formatScore = (v: number) => v?.toFixed(1) ?? '—';
    const pct = (v: number) => Math.min(100, Math.max(0, (v ?? 0)));

    return (
        <div className="test-results">
            {/* Заголовок */}
            <div className="test-results__header">
                <div className="test-results__icon">🎉</div>
                <h2 className="test-results__title">Тест завершён!</h2>
                <p className="test-results__subtitle">{testName}</p>
            </div>

            {/* Общий балл */}
            <div className="test-results__total profile-card">
                <span className="scores-section__total-label">Общий результат</span>
                <div className="test-results__total-row">
                    <span className="scores-section__total-value">
                        {formatScore(results.totalScore)}
                    </span>
                    <span className="test-results__total-max">/ 100</span>
                </div>
            </div>

            {/* Детализация по направлениям */}
            <div className="scores-grid">
                {items.map(item => (
                    <div key={item.label} className={`score-card ${item.colorClass}`}>
                        <div className="score-card__body">
                            <span className="score-card__label">{item.label}</span>
                            <span className="score-card__value">{formatScore(item.value)}</span>
                        </div>
                        <div className="score-card__bar-wrap">
                            <div
                                className="score-card__bar"
                                style={{ width: `${pct(item.value)}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Кнопки */}
            <div className="test-results__actions">
                <button
                    className="test-btn test-btn--primary"
                    onClick={() => navigate('/')}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2"
                         strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                    На главную
                </button>
                <button
                    className="test-btn test-btn--ghost"
                    onClick={() => navigate('/profile')}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2"
                         strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                    Мой профиль
                </button>
            </div>
        </div>
    );
};

export default TestResults;
