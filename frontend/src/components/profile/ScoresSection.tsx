import React from 'react';
import ScoreCard from './ScoreCard';
import type {UserProfileResponse} from '../../types/profile/profile.types';
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
  {
    key: 'totalScoreThinking' as const,
    label: 'Цифровое мышление',
    icon: '🧠',
    colorClass: 'score-card--blue',
  },
  {
    key: 'totalScoreAffiliation' as const,
    label: 'Цифровая аффилиация',
    icon: '🤝',
    colorClass: 'score-card--purple',
  },
  {
    key: 'totalScoreFlexibility' as const,
    label: 'Цифровая гибкость',
    icon: '⚡',
    colorClass: 'score-card--teal',
  },
  {
    key: 'totalScoreExperience' as const,
    label: 'Цифровой опыт',
    icon: '🎯',
    colorClass: 'score-card--amber',
  },
];

const ScoresSection: React.FC<ScoresSectionProps> = ({ data }) => {
  return (
    <section className="scores-section">
      <div className="scores-section__total">
        <span className="scores-section__total-label">Общий балл</span>
        <span className="scores-section__total-value">
          {data.totalScore !== null ? data.totalScore.toFixed(1) : '—'}
        </span>
      </div>

      <div className="scores-grid">
        {SCORE_ITEMS.map((item) => (
          <ScoreCard
            key={item.key}
            label={item.label}
            value={data[item.key]}
            icon={item.icon}
            colorClass={item.colorClass}
          />
        ))}
      </div>
    </section>
  );
};

export default ScoresSection;
