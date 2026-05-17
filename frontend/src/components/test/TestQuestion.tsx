// ============================================================
// TestQuestion.tsx — карточка вопроса с вариантами ответа
// ============================================================

import type { Question } from '../../types/test/test.types';

interface Props {
    question: Question;
    selectedAnswerId: number | null;
    onSelect: (answerId: number) => void;
    onSubmit: () => void;
    onFinish: () => void;
    submitting: boolean;
    isLast: boolean;
    currentIndex: number;
}

const TestQuestion = ({
    question,
    selectedAnswerId,
    onSelect,
    onSubmit,
    onFinish,
    submitting,
    isLast,
    currentIndex,
}: Props) => (
    <div className="test-question" key={currentIndex}>
        <p className="test-question__text">{question.text}</p>

        <div className="test-question__options">
            {question.answerOptions.map((option, idx) => {
                const isSelected = selectedAnswerId === option.id;
                return (
                    <button
                        key={option.id}
                        className={`test-option ${isSelected ? 'test-option--selected' : ''}`}
                        onClick={() => onSelect(option.id)}
                        disabled={submitting}
                    >
                        <span className="test-option__letter">
                            {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="test-option__text">{option.text}</span>
                        {isSelected && (
                            <span className="test-option__check">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" strokeWidth="2.5"
                                     strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                            </span>
                        )}
                    </button>
                );
            })}
        </div>

        <div className="test-question__actions">
            {isLast ? (
                <button
                    className="test-btn test-btn--primary"
                    onClick={onFinish}
                    disabled={selectedAnswerId === null || submitting}
                >
                    {submitting ? (
                        <><span className="test-spinner"/> Завершаем...</>
                    ) : (
                        <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" strokeWidth="2.5"
                                 strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            Завершить тест
                        </>
                    )}
                </button>
            ) : (
                <button
                    className="test-btn test-btn--primary"
                    onClick={onSubmit}
                    disabled={selectedAnswerId === null || submitting}
                >
                    {submitting ? (
                        <><span className="test-spinner"/> Отправка...</>
                    ) : (
                        <>
                            Следующий вопрос
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" strokeWidth="2"
                                 strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"/>
                                <polyline points="12 5 19 12 12 19"/>
                            </svg>
                        </>
                    )}
                </button>
            )}
        </div>
    </div>
);

export default TestQuestion;
