// ============================================================
// ProfilePage.tsx — страница /profile
// ============================================================

import React from 'react';
import { useProfile } from './useProfile';
import ProfileHeader  from '../../components/profile/ProfileHeader';
import ScoresSection  from '../../components/profile/ScoresSection';
import AttemptsSection from '../../components/profile/AttemptsSection';
import '../../style/profile/profile.index.css';

const ProfilePage: React.FC = () => {
    const { data, loading, error, refetch } = useProfile();

    if (loading) {
        return (
            <div className="profile-page">
                <div className="profile-loading">
                    <div className="profile-loading__spinner" />
                    <span className="profile-loading__text">Загрузка профиля...</span>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="profile-page">
                <div className="profile-error">
                    <span className="profile-error__icon">⚠️</span>
                    <span className="profile-error__message">
                        {error === 'UNAUTHORIZED'
                            ? 'Сессия истекла. Пожалуйста, войдите снова.'
                            : (error ?? 'Не удалось загрузить профиль')}
                    </span>
                    <button className="profile-error__retry" onClick={refetch}>
                        Попробовать снова
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="profile-page__inner">

                {/* Аватар + имя + email + роль */}
                <div className="profile-card">
                    <ProfileHeader
                        name={data.name}
                        email={data.email}
                        role={data.role}
                    />
                </div>

                {/* Баллы по компетенциям */}
                <div className="profile-card">
                    <ScoresSection
                        data={{
                            totalScore:            data.totalScore,
                            totalScoreThinking:    data.totalScoreThinking,
                            totalScoreAffiliation: data.totalScoreAffiliation,
                            totalScoreFlexibility: data.totalScoreFlexibility,
                            totalScoreExperience:  data.totalScoreExperience,
                        }}
                    />
                </div>

                {/* История попыток */}
                <div className="profile-card">
                    <AttemptsSection attempts={data.attempts ?? []} />
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;