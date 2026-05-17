// ============================================================
// TestProgress.tsx — прогресс-бар теста
// ============================================================

interface Props {
    current: number;   // 0-based index текущего вопроса
    total: number;
    answered: number;
}

const TestProgress = ({ current, total, answered }: Props) => {
    const percent = total > 0 ? Math.round(((current) / total) * 100) : 0;

    return (
        <div className="test-progress">
            <div className="test-progress__header">
                <span className="test-progress__label">
                    Вопрос {current + 1} из {total}
                </span>
                <span className="test-progress__answered">
                    Отвечено: {answered}
                </span>
            </div>
            <div className="test-progress__bar-wrap">
                <div
                    className="test-progress__bar"
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    );
};

export default TestProgress;
