// ============================================================
// testApi.ts — запросы к /api/tests, /api/test-attempts, /api/answer-users
// ============================================================

import axios from 'axios';
import type {
    TestResponse,
    TestAttempt,
    TestAttemptFinish,
    SubmitAnswerRequest,
} from '../types/test/test.types';

const API_BASE_URL = 'http://7960010-ee569251.twc1.net:8080';

/* ── Тесты ── */
const testsApi = axios.create({
    baseURL: `${API_BASE_URL}/api/tests`,
    withCredentials: true,
});

/** GET /api/tests/{id} — тест с вопросами и вариантами */
export const fetchTestById = async (id: number): Promise<TestResponse> => {
    const res = await testsApi.get<TestResponse>(`/${id}`);
    return res.data;
};

/* ── Попытки ── */
const attemptsApi = axios.create({
    baseURL: `${API_BASE_URL}/api/test-attempts`,
    withCredentials: true,
});

/** POST /api/test-attempts/start — начать попытку */
export const startAttempt = async (testId: number): Promise<TestAttempt> => {
    const res = await attemptsApi.post<TestAttempt>('/start', { testId });
    return res.data;
};

/** POST /api/test-attempts/{attemptId}/finish — завершить попытку */
export const finishAttempt = async (attemptId: number): Promise<TestAttemptFinish> => {
    const res = await attemptsApi.post<TestAttemptFinish>(`/${attemptId}/finish`);
    return res.data;
};

/* ── Ответы пользователя ── */
const answersApi = axios.create({
    baseURL: `${API_BASE_URL}/api/answer-users`,
    withCredentials: true,
});

/** POST /api/answer-users/{attemptId}/answer — ответить на вопрос */
export const submitAnswer = async (
    attemptId: number,
    body: SubmitAnswerRequest,
): Promise<TestAttempt> => {
    const res = await answersApi.post<TestAttempt>(`/${attemptId}/answer`, body);
    return res.data;
};
