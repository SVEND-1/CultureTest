import React from 'react';
import type { QuestionForm, QuestionType } from '../../types/createTest/createTest.types';

interface Props {
    question: QuestionForm;
    questionNumber: number;
    onUpdateText: (text: string) => void;
    onUpdateCategory: (category: QuestionType) => void;
    onUpdateAnswer: (answerId: number, text: string) => void;
    onSetCorrect: (index: number) => void;
    onAddAnswer: () => void;
    onRemoveAnswer: (answerId: number) => void;
    onRemoveQuestion: () => void;
}

const QuestionFormComponent: React.FC<Props> = ({
                                                    question,
                                                    questionNumber,
                                                    onUpdateText,
                                                    onUpdateCategory,
                                                    onUpdateAnswer,
                                                    onSetCorrect,
                                                    onAddAnswer,
                                                    onRemoveAnswer,
                                                    onRemoveQuestion
                                                }) => {
    return (
        <div className="question-form">
            <div className="question-header">
                <div className="question-number">Вопрос {questionNumber}</div>
                <button
                    className="remove-question"
                    onClick={onRemoveQuestion}
                    type="button"
                >
                    ×
                </button>
            </div>

            <textarea
                className="question-text"
                placeholder="Введите текст вопроса..."
                value={question.text}
                onChange={(e) => onUpdateText(e.target.value)}
                rows={3}
            />

            <div className="question-category">
                <label>Категория:</label>
                <select
                    value={question.category}
                    onChange={(e) => onUpdateCategory(e.target.value as QuestionType)}
                    className="category-select"
                >
                    <option value="THINKING">Цифровое мышление</option>
                    <option value="AFFILIATION">Цифровая аффилиация</option>
                    <option value="FLEXIBILITY">Цифровая гибкость</option>
                    <option value="EXPERIENCE">Цифровой опыт</option>
                </select>
            </div>

            <div className="answers-section">
                <label>Варианты ответа (максимум 1 правильный):</label>
                {question.answers.map((answer, index) => (
                    <div key={answer.id} className="answer-row">
                        <input
                            type="radio"
                            id={`q${questionNumber}a${index + 1}`}
                            name={`correct-${questionNumber}`}
                            checked={question.correctAnswerIndex === index}
                            onChange={() => onSetCorrect(index)}
                            className="answer-radio"
                        />
                        <input
                            type="text"
                            placeholder={`Вариант ${index + 1}`}
                            value={answer.text}
                            onChange={(e) => onUpdateAnswer(answer.id, e.target.value)}
                            className="answer-input"
                        />
                        {question.answers.length > 2 && (
                            <button
                                className="remove-answer"
                                type="button"
                                onClick={() => onRemoveAnswer(answer.id)}
                            >
                                ×
                            </button>
                        )}
                    </div>
                ))}
                {question.answers.length < 4 && (
                    <button
                        className="add-answer-btn"
                        type="button"
                        onClick={onAddAnswer}
                    >
                        + Добавить вариант ответа
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuestionFormComponent;