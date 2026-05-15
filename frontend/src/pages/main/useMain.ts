// useMain.ts — стейт и логика главной страницы
// ============================================================

import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Test } from '../../types/main/main.types';
import { fetchMainTests } from '../../api/mainApi';
import { getUserRole } from '../auth/auth';

export function useMain() {
    const navigate = useNavigate();

    const [tests, setTests] = useState<Test[]>([]);
    const [testsLoading, setTestsLoading] = useState(true);
    const [testsError, setTestsError] = useState<string | null>(null);
    const [activeTest, setActiveTest] = useState<Test | null>(null);

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

    const openTest = useCallback((test: Test) => {
        setActiveTest(test);
    }, []);

    const closeTest = useCallback(() => {
        setActiveTest(null);
    }, []);

    const startTest = useCallback((testId: number) => {
        navigate(`/test/${testId}`);
    }, [navigate]);

    // Навигация на профиль в зависимости от роли
    const goToProfile = useCallback(() => {
        const role = getUserRole();
        if (role === 'ADMIN') {
            navigate('/admin-profile');
        } else {
            navigate('/profile');
        }
    }, [navigate]);

    return {
        tests,
        testsLoading,
        testsError,
        activeTest,
        openTest,
        closeTest,
        startTest,
        goToProfile, // ← добавили
    };
}