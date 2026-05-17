import axios from 'axios';
import type { UserProfileResponse } from '../types/profile/profile.types';

const API_BASE_URL = "http://7960010-ee569251.twc1.net:8080";

const API = axios.create({
    baseURL: `${API_BASE_URL}/api/users`,
    withCredentials: true,
});

/** GET /api/users — профиль текущего авторизованного пользователя */
export const fetchUserProfile = async (): Promise<UserProfileResponse> => {
    const response = await API.get<UserProfileResponse>('');
    return response.data;
};

export default API;