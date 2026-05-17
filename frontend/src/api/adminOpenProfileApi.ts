// ============================================================
// adminOpenProfileApi.ts — запросы к /api/admin/{userId}
// ============================================================

import axios from 'axios';
import type { AdminOpenUserProfile } from '../types/adminOpenProfile/adminOpenProfile.types';

const API_BASE_URL = 'http://62.113.37.103:8080';

const API = axios.create({
    baseURL: `${API_BASE_URL}/api/admin`,
    withCredentials: true,
});

/** GET /api/admin/{userId} — открыть профиль пользователя */
export const fetchOpenUserProfile = async (userId: number): Promise<AdminOpenUserProfile> => {
    const res = await API.get<AdminOpenUserProfile>(`/${userId}`);
    return res.data;
};

/** POST /api/admin/{userId}/comment — написать комментарий */
export const writeComment = async (userId: number, comment: string): Promise<string> => {
    const res = await API.post<string>(`/${userId}/comment`, null, {
        params: { comment },
    });
    return res.data;
};

export default API;