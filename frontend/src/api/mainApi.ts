// ============================================================
// mainApi.ts — запросы для главной страницы
// ============================================================

import axios from 'axios';
import type { Test } from '../types/main/main.types';

const API_BASE_URL = 'http://62.113.37.103:8080';

const API = axios.create({
    baseURL: `${API_BASE_URL}/api/tests`,
    withCredentials: true,
});

// ── Типы ответов бекенда ──────────────────────────────────────────

interface TestListItem {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
}

interface TestDetailItem {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
    isDone: boolean;
    questions: { id: number }[];
}

// ── Приватные хелперы ─────────────────────────────────────────────

const fetchTestDetail = async (id: number): Promise<TestDetailItem> => {
    const res = await API.get<TestDetailItem>(`/${id}`);
    return res.data;
};

// ── Публичные функции ─────────────────────────────────────────────

/**
 * GET /api/tests — список тестов для главной.
 * Параллельно запрашивает GET /api/tests/{id} для каждого из первых 3,
 * чтобы получить реальное количество вопросов.
 */
export const fetchMainTests = async (): Promise<Test[]> => {
    const res = await API.get<TestListItem[]>('');

    const activeTests = res.data
        .filter(t => t.isActive)
        .slice(0, 3);

    // Параллельно загружаем детали для каждого теста
    const details = await Promise.all(
        activeTests.map(t => fetchTestDetail(t.id))
    );

    return details.map(t => ({
        id:          t.id,
        title:       t.name,
        description: t.description,
        questions:   t.questions?.length ?? 0,
        completed:   t.isDone ?? false,
        tag:         'Тест',
    }));
};

export default API;