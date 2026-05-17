// ============================================================
// TestPage.tsx — страница /test/:id
// ============================================================

import { useNavigate } from 'react-router-dom';
import { useTest } from './useTest';
import TestIntro    from '../../components/test/TestIntro';
import TestProgress from '../../components/test/TestProgress';
import TestQuestion from '../../components/test/TestQuestion';
import TestResults  from '../../components/test/TestResults';
import '../../style/test/test.index.css';

const TestPage = () => {
    const navigate = useNavigate();
    const {
        step,
        test,
        results,
        currentQuestion,
        currentIndex,
        totalQuestions,
        selectedAnswerId,
        errorMessage,
        answeredCount,
        handleStartTest,
        handleSelectAnswer,
        handleSubmitAnswer,
        handleFinishTest,
    } = useTest();

    const isLast = currentIndex === totalQuestions - 1;

    return (
        <div className="test-page">
            {/* Фон */}
            <div className="test-page__bg"/>
            <div className="test-page__bg-grid"/>

            <div className="test-page__wrapper">

                {/* ── Загрузка ── */}
                {(step === 'loading') && (
                    <div className="test-state">
                        <div className="profile-loading__spinner"/>
                        <span className="profile-loading__text">Загружаем тест...</span>
                    </div>
                )}

                {/* ── Ошибка ── */}
                {step === 'error' && (
                    <div className="test-state">
                        <span className="profile-error__icon">⚠️</span>
                        <span className="profile-error__message">
                            {errorMessage ?? 'Что-то пошло не так'}
                        </span>
                        <button
                            className="profile-error__retry"
                            onClick={() => navigate(-1)}
                        >
                            Назад
                        </button>
                    </div>
                )}

                {/* ── Интро ── */}
                {step === 'intro' && test && (
                    <div className="test-card">
                        <TestIntro
                            test={test}
                            onStart={handleStartTest}
                            loading={false}
                        />
                    </div>
                )}

                {/* ── Submitting (между запросами на старте) ── */}
                {step === 'submitting' && currentQuestion === null && (
                    <div className="test-state">
                        <div className="profile-loading__spinner"/>
                        <span className="profile-loading__text">Начинаем тест...</span>
                    </div>
                )}

                {/* ── Вопрос ── */}
                {(step === 'question' || (step === 'submitting' && currentQuestion !== null))
                    && currentQuestion && test && (
                    <div className="test-card">
                        {/* Название теста */}
                        <div className="test-card__header">
                            <button
                                className="test-back-btn"
                                onClick={() => navigate('/')}
                                title="На главную"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" strokeWidth="2"
                                     strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="19" y1="12" x2="5" y2="12"/>
                                    <polyline points="12 19 5 12 12 5"/>
                                </svg>
                            </button>
                            <span className="test-card__test-name">{test.name}</span>
                        </div>

                        <TestProgress
                            current={currentIndex}
                            total={totalQuestions}
                            answered={answeredCount}
                        />

                        <TestQuestion
                            question={currentQuestion}
                            selectedAnswerId={selectedAnswerId}
                            onSelect={handleSelectAnswer}
                            onSubmit={handleSubmitAnswer}
                            onFinish={handleFinishTest}
                            submitting={step === 'submitting'}
                            isLast={isLast}
                            currentIndex={currentIndex}
                        />
                    </div>
                )}

                {/* ── Результаты ── */}
                {step === 'results' && results && test && (
                    <div className="test-card test-card--wide">
                        <TestResults results={results} testName={test.name}/>
                    </div>
                )}

            </div>
        </div>
    );
};

export default TestPage;
