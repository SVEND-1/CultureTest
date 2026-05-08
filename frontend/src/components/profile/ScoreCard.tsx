import React from 'react';
import '../../style/profile/profile.scores.css';

interface ScoreCardProps {
  label: string;
  value: number | null;
  icon: string;
  colorClass: string;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ label, value, icon, colorClass }) => {
  const displayValue = value !== null ? value.toFixed(1) : '—';
  const percent = value !== null ? Math.min((value / 100) * 100, 100) : 0;

  return (
    <div className={`score-card ${colorClass}`}>
      <div className="score-card__icon">{icon}</div>
      <div className="score-card__body">
        <span className="score-card__label">{label}</span>
        <span className="score-card__value">{displayValue}</span>
      </div>
      <div className="score-card__bar-wrap">
        <div
          className="score-card__bar"
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={value ?? 0}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};

export default ScoreCard;
