import { useState, useCallback } from 'react';
import type {Test} from '../../types/main/main.types';

export function useMain() {
    const [activeTest, setActiveTest] = useState<Test | null>(null);

    const openTest = useCallback((test: Test) => setActiveTest(test), []);
    const closeTest = useCallback(() => setActiveTest(null), []);

    return {
        activeTest,
        openTest,
        closeTest,
    };
}