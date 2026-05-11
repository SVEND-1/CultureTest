// ============================================================
// useMain.ts — стейт и логика главной страницы
// ============================================================

import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Test } from '../../types/main/main.types';
import { fetchMainTests, fetchTestDetail } from '../../api/mainApi';

export function useMain() {
    const navigate = useNavigate();

    const [tests, setTests] = useState<Test[]>([]);
    const [testsLoading, setTestsLoading] = useState(true);
    const [testsError, setTestsError] = useState<string | null>(null);

    const [activeTest, setActiveTest] = useState<Test | null>(null);
    const [modalLoading, setModalLoading] = useState(false);

    // Загружаем 3 теста при маунте
    useEffect(() => {
        const load = async () => {
            try {
                setTestsLoading(true);
                setTestsError(null);
                const data = await fetchMainTests();
                setTests(data);
            } catch {
                setTestsError('Не удалось загрузить тесты');
            } finally {
                setTestsLoading(false);
            }
        };
        load();
    }, []);

    // Открываем модалку — догружаем детали (количество вопросов)
    const openTest = useCallback(async (test: Test) => {
        setActiveTest(test);
        try {
            setModalLoading(true);
            const detail = await fetchTestDetail(test.id);
            setActiveTest(detail);
        } catch {
            // если детали не загрузились — оставляем то что есть
        } finally {
            setModalLoading(false);
        }
    }, []);

    const closeTest = useCallback(() => {
        setActiveTest(null);
    }, []);

    // Кнопка «Начать тест» в модалке
    const startTest = useCallback((testId: number) => {
        navigate(`/test/${testId}`);
    }, [navigate]);

    return {
        tests,
        testsLoading,
        testsError,
        activeTest,
        modalLoading,
        openTest,
        closeTest,
        startTest,
    };
}
