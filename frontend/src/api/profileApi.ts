import axios from 'axios';
import type { UserProfileResponse } from '../types/profile/profile.types';


const API = axios.create({
    baseURL: `/api/users`,
    withCredentials: true,
});

/** GET /api/users — профиль текущего авторизованного пользователя */
export const fetchUserProfile = async (): Promise<UserProfileResponse> => {
    const response = await API.get<UserProfileResponse>('');
    return response.data;
};

export default API;