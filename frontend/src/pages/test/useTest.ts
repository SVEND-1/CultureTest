// ============================================================
// useTest.ts — хук для страницы /test/:id
// ============================================================

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTestById, startAttempt, submitAnswer, finishAttempt } from '../../api/testApi';
import type {
    TestResponse,
    TestAttempt,
    TestAttemptFinish,
    Question,
} from '../../types/test/test.types';

type TestPageStep = 'loading' | 'error' | 'intro' | 'question' | 'submitting' | 'results';

interface UseTestReturn {
    step: TestPageStep;
    test: TestResponse | null;
    attempt: TestAttempt | null;
    results: TestAttemptFinish | null;
    currentQuestion: Question | null;
    currentIndex: number;
    totalQuestions: number;
    selectedAnswerId: number | null;
    errorMessage: string | null;
    answeredCount: number;
    handleStartTest: () => Promise<void>;
    handleSelectAnswer: (answerId: number) => void;
    handleSubmitAnswer: () => Promise<void>;
    handleFinishTest: () => Promise<void>;
}

export const useTest = (): UseTestReturn => {
    const { id } = useParams<{ id: string }>();


    const [step, setStep] = useState<TestPageStep>('loading');
    const [test, setTest] = useState<TestResponse | null>(null);
    const [attempt, setAttempt] = useState<TestAttempt | null>(null);
    const [results, setResults] = useState<TestAttemptFinish | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Загрузка теста
    useEffect(() => {
        if (!id) return;
        const load = async () => {
            try {
                setStep('loading');
                const data = await fetchTestById(Number(id));
                setTest(data);
                setStep('intro');
            } catch {
                setErrorMessage('Не удалось загрузить тест');
                setStep('error');
            }
        };
        load();
    }, [id]);

    const currentQuestion = test?.questions[currentIndex] ?? null;
    const totalQuestions  = test?.questions.length ?? 0;
    const answeredCount   = attempt?.userAnswers?.length ?? 0;

    // Начать тест
    const handleStartTest = useCallback(async () => {
        if (!test) return;
        try {
            setStep('submitting');
            const att = await startAttempt(test.id);
            setAttempt(att);
            setCurrentIndex(0);
            setSelectedAnswerId(null);
            setStep('question');
        } catch {
            setErrorMessage('Не удалось начать тест. Попробуйте снова.');
            setStep('error');
        }
    }, [test]);

    // Выбрать вариант
    const handleSelectAnswer = useCallback((answerId: number) => {
        setSelectedAnswerId(answerId);
    }, []);

    // Отправить ответ и перейти к следующему вопросу
    const handleSubmitAnswer = useCallback(async () => {
        if (!attempt || !currentQuestion || selectedAnswerId === null) return;
        try {
            setStep('submitting');
            const updated = await submitAnswer(attempt.id, {
                questionId: currentQuestion.id,
                selectedAnswerId,
            });
            setAttempt(updated);
            setSelectedAnswerId(null);

            const nextIndex = currentIndex + 1;
            if (nextIndex < totalQuestions) {
                setCurrentIndex(nextIndex);
                setStep('question');
            } else {
                // Последний вопрос — завершаем
                const finish = await finishAttempt(attempt.id);
                setResults(finish);
                setStep('results');
            }
        } catch {
            setErrorMessage('Ошибка при отправке ответа. Попробуйте снова.');
            setStep('question');
        }
    }, [attempt, currentQuestion, selectedAnswerId, currentIndex, totalQuestions]);

    // Явное завершение теста (кнопка «Завершить»)
    const handleFinishTest = useCallback(async () => {
        if (!attempt) return;
        try {
            setStep('submitting');
            const finish = await finishAttempt(attempt.id);
            setResults(finish);
            setStep('results');
        } catch {
            setErrorMessage('Не удалось завершить тест.');
            setStep('question');
        }
    }, [attempt]);

    return {
        step,
        test,
        attempt,
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
    };
};
