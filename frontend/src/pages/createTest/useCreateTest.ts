import { useState } from 'react';
import { createTest, addQuestionToTest } from '../../api/createTestApi';
import type {
    CreateTestForm,
    QuestionForm,
    QuestionType,
    CreateQuestionRequest,
    TestResponse
} from '../../types/createTest/createTest.types';

export const useCreateTest = () => {
    const [form, setForm] = useState<CreateTestForm>({
        name: '',
        description: '',
        questions: []
    });
    const [isLoading, setIsLoading] = useState(false);
    const [testId, setTestId] = useState<number | null>(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const updateName = (name: string) => {
        setForm(prev => ({ ...prev, name }));
    };

    const updateDescription = (description: string) => {
        setForm(prev => ({ ...prev, description }));
    };

    const addQuestion = () => {
        const now = Date.now();
        const newQuestion: QuestionForm = {
            id: now,
            text: '',
            category: 'THINKING' as QuestionType,
            answers: [
                { id: now + 1, text: '' },
                { id: now + 2, text: '' }
            ],
            correctAnswerIndex: null
        };
        setForm(prev => ({ ...prev, questions: [...prev.questions, newQuestion] }));
    };

    const updateQuestionText = (qId: number, text: string) => {
        setForm(prev => ({
            ...prev,
            questions: prev.questions.map(q =>
                q.id === qId ? { ...q, text } : q
            )
        }));
    };

    const updateQuestionCategory = (qId: number, category: QuestionType) => {
        setForm(prev => ({
            ...prev,
            questions: prev.questions.map(q =>
                q.id === qId ? { ...q, category } : q  // ← используем qId
            )
        }));
    };

    const updateAnswerText = (qId: number, aId: number, text: string) => {
        setForm(prev => ({
            ...prev,
            questions: prev.questions.map(q => {  // ← используем qId
                if (q.id !== qId) return q;      // ← здесь используем qId
                return {
                    ...q,
                    answers: q.answers.map(a =>
                        a.id === aId ? { ...a, text } : a
                    )
                };
            })
        }));
    };

    const setCorrectAnswer = (qId: number, answerIndex: number) => {
        setForm(prev => ({
            ...prev,
            questions: prev.questions.map(q =>
                q.id === qId
                    ? { ...q, correctAnswerIndex: answerIndex }
                    : q
            )
        }));
    };

    const addAnswer = (qId: number) => {
        const now = Date.now();
        setForm(prev => ({
            ...prev,
            questions: prev.questions.map(q => {
                if (q.id !== qId || q.answers.length >= 4) return q;
                const newAnswer = {
                    id: now,
                    text: ''
                };
                return { ...q, answers: [...q.answers, newAnswer] };
            })
        }));
    };

    const removeAnswer = (qId: number, aId: number) => {
        setForm(prev => ({
            ...prev,
            questions: prev.questions.map(q => {
                if (q.id !== qId || q.answers.length <= 2) return q;
                const filtered = q.answers.filter(a => a.id !== aId);
                const newCorrectIndex = filtered.findIndex((_, idx) =>
                    idx === q.correctAnswerIndex
                );
                return {
                    ...q,
                    answers: filtered,
                    correctAnswerIndex: newCorrectIndex >= 0 ? newCorrectIndex : null
                };
            })
        }));
    };

    const removeQuestion = (qId: number) => {
        setForm(prev => ({
            ...prev,
            questions: prev.questions.filter(q => q.id !== qId)
        }));
    };

    const submitTest = async () => {
        // Валидация
        if (!form.name.trim()) {
            setError('Введите название теста');
            return false;
        }
        if (!form.description.trim()) {
            setError('Введите описание теста');
            return false;
        }
        if (form.questions.length === 0) {
            setError('Добавьте хотя бы один вопрос');
            return false;
        }
        for (const question of form.questions) {
            if (!question.text.trim()) {
                setError('Заполните текст всех вопросов');
                return false;
            }
            if (question.answers.some(a => !a.text.trim())) {
                setError('Заполните все варианты ответов');
                return false;
            }
            if (question.correctAnswerIndex === null) {
                setError('Выберите правильный ответ для каждого вопроса');
                return false;
            }
        }

        setIsLoading(true);
        setError('');
        setSuccess(false);

        try {
            // 1. Создаем тест
            const testData: TestResponse = await createTest(form.name.trim(), form.description.trim());
            setTestId(testData.id);

            // 2. Добавляем вопросы
            for (const question of form.questions) {
                const request: CreateQuestionRequest = {
                    text: question.text.trim(),
                    type: question.category,
                    answerOptions: question.answers.map((answer, index) => ({
                        text: answer.text.trim(),
                        isCorrect: index === question.correctAnswerIndex
                    }))
                };
                await addQuestionToTest(testData.id, request);
            }

            setSuccess(true);
            return true;
        } catch (err: any) {
            setError(err.response?.data?.message || 'Ошибка при создании теста');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        form,
        testId,
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
    };
};