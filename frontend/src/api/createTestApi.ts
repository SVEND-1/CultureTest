// ============================================================
// createTestApi.ts — запросы к /api/admin/test и /api/admin/{testId}/question
// ============================================================

import axios from 'axios';
import type {
    TestResponse,
    CreateQuestionRequest
} from '../types/createTest/createTest.types';

const API_BASE_URL = 'http://7960010-ee569251.twc1.net:8080';

const API = axios.create({
    baseURL: `${API_BASE_URL}/api/admin`,
    withCredentials: true,
});

/** POST /api/admin/test — создать тест */
export const createTest = async (name: string, description: string): Promise<TestResponse> => {
    const res = await API.post<TestResponse>('/test', { name, description });
    return res.data;
};

/** POST /api/admin/{testId}/question — добавить вопрос в тест */
export const addQuestionToTest = async (testId: number, request: CreateQuestionRequest): Promise<string> => {
    const res = await API.post<string>(`/${testId}/question`, request);
    return res.data;
};

export default API;