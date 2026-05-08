import type {Test} from '../../types/main/main.types';

interface TestCardProps {
    test: Test;
    onOpen: (t: Test) => void;
}

export function TestCard({ test, onOpen }: TestCardProps) {
    return (
        <div className="test-card">
            <div className="test-card__header">
                <span className="test-card__tag">{test.tag}</span>
                {test.completed && (
                    <span className="test-card__badge test-card__badge--done">
            ✓ Пройден
          </span>
                )}
            </div>
            <h3 className="test-card__title">{test.title}</h3>
            <p className="test-card__desc">{test.description}</p>
            <div className="test-card__footer">
                <span className="test-card__meta">{test.questions} вопросов</span>
                <button className="test-card__btn" onClick={() => onOpen(test)}>
                    Перейти к тесту →
                </button>
            </div>
        </div>
    );
}