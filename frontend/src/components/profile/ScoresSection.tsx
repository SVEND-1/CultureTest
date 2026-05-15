// ============================================================
// ScoresSection.tsx — баллы по компетенциям
// ============================================================

import React from 'react';
import type { UserProfileResponse } from '../../types/profile/profile.types';
import '../../style/profile/profile.scores.css';

interface ScoresSectionProps {
    data: Pick<
        UserProfileResponse,
        | 'totalScore'
        | 'totalScoreThinking'
        | 'totalScoreAffiliation'
        | 'totalScoreFlexibility'
        | 'totalScoreExperience'
    >;
}

const SCORE_ITEMS = [
    { key: 'totalScoreThinking'    as const, label: 'Цифровое мышление',   icon: '🧠', cls: 'score-card--blue'   },
    { key: 'totalScoreAffiliation' as const, label: 'Цифровая аффилиация', icon: '🤝', cls: 'score-card--purple' },
    { key: 'totalScoreFlexibility' as const, label: 'Цифровая гибкость',   icon: '⚡', cls: 'score-card--teal'   },
    { key: 'totalScoreExperience'  as const, label: 'Цифровой опыт',       icon: '🎯', cls: 'score-card--amber'  },
];

const fmt = (v: number | null) => (v != null ? v.toFixed(1) : '—');
const pct = (v: number | null) => Math.min(100, Math.max(0, v ?? 0));

const ScoresSection: React.FC<ScoresSectionProps> = ({ data }) => (
    <section className="scores-section">
        <div className="scores-section__total">
            <span className="scores-section__total-label">Общий балл</span>
            <span className="scores-section__total-value">{fmt(data.totalScore)}</span>
        </div>

        <div className="scores-grid">
            {SCORE_ITEMS.map(({ key, label, icon, cls }) => (
                <div key={key} className={`score-card ${cls}`}>
                    <div className="score-card__icon">{icon}</div>
                    <div className="score-card__body">
                        <span className="score-card__label">{label}</span>
                        <span className="score-card__value">{fmt(data[key])}</span>
                    </div>
                    <div className="score-card__bar-wrap">
                        <div
                            className="score-card__bar"
                            style={{ width: `${pct(data[key])}%` }}
                            role="progressbar"
                            aria-valuenow={data[key] ?? 0}
                            aria-valuemin={0}
                            aria-valuemax={100}
                        />
                    </div>
                </div>
            ))}
        </div>
    </section>
);

export default ScoresSection;