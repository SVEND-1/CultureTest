// ============================================================
// adminProfileApi.ts — запросы к /api/admin
// ============================================================

import axios from 'axios';
import type { AdminProfileResponse, UserAI } from '../types/adminProfile/adminProfile.types';

const API_BASE_URL = 'http://62.113.37.103:8080';

const API = axios.create({
    baseURL: `${API_BASE_URL}/api/admin`,
    withCredentials: true,
});

const USERS_API = axios.create({
    baseURL: `${API_BASE_URL}/api/users`,
    withCredentials: true,
});

/** GET /api/admin — профиль админа (попытки + тесты) */
export const fetchAdminProfile = async (): Promise<AdminProfileResponse> => {
    const res = await API.get<AdminProfileResponse>('');
    return res.data;
};

/** GET /api/users — данные текущего авторизованного пользователя (имя, email) */
export const fetchCurrentUser = async (): Promise<{ name: string; email: string }> => {
    const res = await USERS_API.get<{ name: string; email: string }>('');
    return res.data;
};

/** POST /api/admin/{email}/role — назначить пользователя админом */
export const setAdminRole = async (email: string): Promise<string> => {
    const res = await API.post<string>(`/${encodeURIComponent(email)}/role`);
    return res.data;
};

/** POST /api/admin/ai?role=... — подобрать сотрудников через ИИ */
export const fetchAICandidates = async (role: string): Promise<UserAI[]> => {
    const res = await API.post<UserAI[]>('/ai', null, {
        params: { role },
    });
    return res.data;
};

export default API;
