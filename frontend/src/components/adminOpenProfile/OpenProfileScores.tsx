// ============================================================
// OpenProfileScores.tsx — баллы пользователя по компетенциям
// ============================================================

interface Props {
    totalScore: number;
    totalScoreThinking: number;
    totalScoreAffiliation: number;
    totalScoreFlexibility: number;
    totalScoreExperience: number;
}

const OpenProfileScores = ({
                               totalScore,
                               totalScoreThinking,
                               totalScoreAffiliation,
                               totalScoreFlexibility,
                               totalScoreExperience,
                           }: Props) => {
    const fmt = (v: number) => v?.toFixed(1) ?? '—';
    const pct = (v: number) => Math.min(100, Math.max(0, v ?? 0));

    const items = [
        { label: 'Цифровое мышление',   value: totalScoreThinking,    cls: 'score-card--blue'   },
        { label: 'Цифровая аффилиация', value: totalScoreAffiliation,  cls: 'score-card--purple' },
        { label: 'Цифровая гибкость',   value: totalScoreFlexibility,  cls: 'score-card--teal'   },
        { label: 'Цифровой опыт',       value: totalScoreExperience,   cls: 'score-card--amber'  },
    ];

    return (
        <div className="profile-card">
            <div className="scores-section__total">
                <span className="scores-section__total-label">Общий балл</span>
                <span className="scores-section__total-value">{fmt(totalScore)}</span>
            </div>
            <div className="scores-grid">
                {items.map(item => (
                    <div key={item.label} className={`score-card ${item.cls}`}>
                        <div className="score-card__body">
                            <span className="score-card__label">{item.label}</span>
                            <span className="score-card__value">{fmt(item.value)}</span>
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
        </div>
    );
};

export default OpenProfileScores;
