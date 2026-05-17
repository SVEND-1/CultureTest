// ============================================================
// useAdminProfile.ts
// ============================================================

import { useEffect, useState, useCallback } from 'react';
import { fetchAdminProfile, fetchCurrentUser, setAdminRole, fetchAICandidates } from '../../api/adminProfileApi';
import type {
    AdminProfileResponse,
    AdminInfo,
    UserAI,
} from '../../types/adminProfile/adminProfile.types';

interface UseAdminProfileReturn {
    profile: AdminProfileResponse | null;
    adminInfo: AdminInfo | null;
    loading: boolean;
    error: string | null;
    // Добавление админа
    addAdminEmail: string;
    setAddAdminEmail: (v: string) => void;
    addAdminLoading: boolean;
    addAdminError: string | null;
    addAdminSuccess: string | null;
    handleAddAdmin: () => Promise<void>;
    // AI подбор
    aiRole: string;
    setAiRole: (v: string) => void;
    aiLoading: boolean;
    aiError: string | null;
    aiCandidates: UserAI[];
    handleFetchCandidates: () => Promise<void>;
}

export const useAdminProfile = (): UseAdminProfileReturn => {
    const [profile, setProfile] = useState<AdminProfileResponse | null>(null);
    const [adminInfo, setAdminInfo] = useState<AdminInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [addAdminEmail, setAddAdminEmail] = useState('');
    const [addAdminLoading, setAddAdminLoading] = useState(false);
    const [addAdminError, setAddAdminError] = useState<string | null>(null);
    const [addAdminSuccess, setAddAdminSuccess] = useState<string | null>(null);

    const [aiRole, setAiRole] = useState('');
    const [aiLoading, setAiLoading] = useState(false);
    const [aiError, setAiError] = useState<string | null>(null);
    const [aiCandidates, setAiCandidates] = useState<UserAI[]>([]);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                setError(null);
                // Грузим параллельно профиль и данные текущего юзера
                const [data, user] = await Promise.all([
                    fetchAdminProfile(),
                    fetchCurrentUser(),
                ]);
                setProfile(data);
                setAdminInfo({
                    name: user.name,
                    email: user.email,
                    role: 'ADMIN',
                });
            } catch {
                setError('Не удалось загрузить данные профиля');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const handleAddAdmin = useCallback(async () => {
        if (!addAdminEmail.trim()) return;
        try {
            setAddAdminLoading(true);
            setAddAdminError(null);
            setAddAdminSuccess(null);
            const msg = await setAdminRole(addAdminEmail.trim());
            setAddAdminSuccess(msg || 'Роль успешно назначена');
            setAddAdminEmail('');
        } catch {
            setAddAdminError('Не удалось назначить роль. Проверьте email.');
        } finally {
            setAddAdminLoading(false);
        }
    }, [addAdminEmail]);

    const handleFetchCandidates = useCallback(async () => {
        if (!aiRole.trim()) return;
        try {
            setAiLoading(true);
            setAiError(null);
            setAiCandidates([]);
            const candidates = await fetchAICandidates(aiRole.trim());
            setAiCandidates(candidates);
        } catch {
            setAiError('Не удалось получить результаты. Попробуйте снова.');
        } finally {
            setAiLoading(false);
        }
    }, [aiRole]);

    return {
        profile,
        adminInfo,
        loading,
        error,
        addAdminEmail,
        setAddAdminEmail,
        addAdminLoading,
        addAdminError,
        addAdminSuccess,
        handleAddAdmin,
        aiRole,
        setAiRole,
        aiLoading,
        aiError,
        aiCandidates,
        handleFetchCandidates,
    };
};
