// ============================================================
// useAdminOpenProfile.ts
// ============================================================

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOpenUserProfile, writeComment } from '../../api/adminOpenProfileApi';
import type { AdminOpenUserProfile } from '../../types/adminOpenProfile/adminOpenProfile.types';

interface UseAdminOpenProfileReturn {
    profile: AdminOpenUserProfile | null;
    loading: boolean;
    error: string | null;
    commentText: string;
    setCommentText: (v: string) => void;
    commentLoading: boolean;
    commentError: string | null;
    commentSuccess: string | null;
    handleWriteComment: () => Promise<void>;
}

export const useAdminOpenProfile = (): UseAdminOpenProfileReturn => {
    const { userId } = useParams<{ userId: string }>();

    const [profile, setProfile] = useState<AdminOpenUserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [commentText, setCommentText] = useState('');
    const [commentLoading, setCommentLoading] = useState(false);
    const [commentError, setCommentError] = useState<string | null>(null);
    const [commentSuccess, setCommentSuccess] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) return;
        const load = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchOpenUserProfile(Number(userId));
                setProfile(data);
                // Заполняем поле если комментарий уже есть
                if (data.privateComment) setCommentText(data.privateComment);
            } catch {
                setError('Не удалось загрузить профиль пользователя');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [userId]);

    const handleWriteComment = useCallback(async () => {
        if (!userId || !commentText.trim()) return;
        try {
            setCommentLoading(true);
            setCommentError(null);
            setCommentSuccess(null);
            await writeComment(Number(userId), commentText.trim());
            setCommentSuccess('Комментарий сохранён');
            // Обновляем профиль локально
            setProfile(prev =>
                prev ? { ...prev, privateComment: commentText.trim() } : prev
            );
        } catch {
            setCommentError('Не удалось сохранить комментарий');
        } finally {
            setCommentLoading(false);
        }
    }, [userId, commentText]);

    return {
        profile,
        loading,
        error,
        commentText,
        setCommentText,
        commentLoading,
        commentError,
        commentSuccess,
        handleWriteComment,
    };
};
