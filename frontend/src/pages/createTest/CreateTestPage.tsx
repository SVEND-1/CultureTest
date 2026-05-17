import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateTest } from './useCreateTest';
import CreateTestHeader from '../../components/createTest/Header';
import QuestionForm from '../../components/createTest/QuestionForm';
import '../../style/createTest/createTest.page.css';

const CreateTestPage: React.FC = () => {
    const {
        form,
        isLoading,
        error,
        success,
        updateName,
        updateDescription,
        addQuestion,
        updateQuestionText,
        updateQuestionCategory,
        updateAnswerText,
        setCorrectAnswer,
        addAnswer,
        removeAnswer,
        removeQuestion,
        submitTest
    } = useCreateTest();

    const navigate = useNavigate();

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= 100) updateName(e.target.value);
    };

    const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length <= 500) updateDescription(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await submitTest();
        if (result) {
            setTimeout(() => {
                navigate('/admin-profile');
            }, 2000);
        }
    };

    if (success) {
        return (
            <div className="create-test-page">
                <CreateTestHeader />
                <main className="create-test-main">
                    <div className="container">
                        <div className="success-message">
                            <h2>✅ Тест успешно опубликован!</h2>
                            <p>Перенаправляем в профиль...</p>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="create-test-page">
            <CreateTestHeader />
            <main className="create-test-main">
                <div className="container">
                    <form onSubmit={handleSubmit} className="test-form">
                        <div className="form-section">
                            <h1 className="form-title">Новый тест</h1>

                            <div className="input-group">
                                <label>Название теста <span className="required">*</span></label>
                                <div className="input-with-counter">
                                    <input
                                        type="text"
                                        placeholder="Введите название теста (макс. 100 символов)"
                                        value={form.name}
                                        onChange={handleNameChange}
                                        maxLength={100}
                                        required
                                        className="form-input"
                                    />
                                    <span className="char-counter">
                                        {form.name.length}/100
                                    </span>
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Описание теста <span className="required">*</span></label>
                                <div className="input-with-counter">
                                    <textarea
                                        placeholder="Введите описание теста (макс. 500 символов)"
                                        value={form.description}
                                        onChange={handleDescChange}
                                        maxLength={500}
                                        rows={4}
                                        required
                                        className="form-textarea"
                                    />
                                    <span className="char-counter">
                                        {form.description.length}/500
                                    </span>
                                </div>
                            </div>

                            <div className="questions-section">
                                <div className="section-header">
                                    <h2>Вопросы <span className="required">*</span></h2>
                                    <button
                                        type="button"
                                        className="add-question-btn"
                                        onClick={addQuestion}
                                        disabled={isLoading}
                                    >
                                        + Добавить вопрос
                                    </button>
                                </div>

                                {form.questions.length > 0 && (
                                    <div className="questions-count">
                                        Всего вопросов: <span>{form.questions.length}</span>
                                    </div>
                                )}

                                {form.questions.map((question, index) => (
                                    <QuestionForm
                                        key={question.id}
                                        question={question}
                                        questionNumber={index + 1}
                                        onUpdateText={(text) => updateQuestionText(question.id, text)}
                                        onUpdateCategory={(category) => updateQuestionCategory(question.id, category)}
                                        onUpdateAnswer={(answerId, text) => updateAnswerText(question.id, answerId, text)}
                                        onSetCorrect={(index) => setCorrectAnswer(question.id, index)}
                                        onAddAnswer={() => addAnswer(question.id)}
                                        onRemoveAnswer={(answerId) => removeAnswer(question.id, answerId)}
                                        onRemoveQuestion={() => removeQuestion(question.id)}
                                    />
                                ))}
                            </div>

                            {error && (
                                <div className="error-message">{error}</div>
                            )}

                            <button
                                type="submit"
                                className="publish-btn"
                                disabled={isLoading || form.questions.length === 0}
                            >
                                {isLoading
                                    ? '⏳ Публикуем тест...'
                                    : `Опубликовать тест (${form.questions.length} вопросов)`
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default CreateTestPage;