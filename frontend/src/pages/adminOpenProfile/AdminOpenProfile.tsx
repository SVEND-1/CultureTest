// ============================================================
// AdminOpenProfile.tsx — страница /admin-open-profile/:userId
// ============================================================

import { useNavigate } from 'react-router-dom';
import { useAdminOpenProfile } from './useAdminOpenProfile';
import OpenProfileHeader   from '../../components/adminOpenProfile/OpenProfileHeader';
import OpenProfileScores   from '../../components/adminOpenProfile/OpenProfileScores';
import OpenProfileAttempts from '../../components/adminOpenProfile/OpenProfileAttempts';
import OpenProfileComments from '../../components/adminOpenProfile/OpenProfileComments';
import '../../style/adminOpenProfile/adminOpenProfile.index.css';

const AdminOpenProfile = () => {
    const navigate = useNavigate();
    const {
        profile,
        loading,
        error,
        commentText,
        setCommentText,
        commentLoading,
        commentError,
        commentSuccess,
        handleWriteComment,
    } = useAdminOpenProfile();

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

    if (error || !profile) {
        return (
            <div className="profile-page">
                <div className="profile-error">
                    <span className="profile-error__icon">⚠️</span>
                    <span className="profile-error__message">{error ?? 'Профиль не найден'}</span>
                    <button
                        className="profile-error__retry"
                        onClick={() => navigate('/admin-profile')}
                    >
                        Назад
                    </button>
                </div>
            </div>
        );
    }

    const u = profile.userProfileResponse;

    return (
        <div className="profile-page">
            <div className="profile-page__inner">

                {/* Кнопка назад */}
                <button
                    className="open-profile-back"
                    onClick={() => navigate('/admin-profile')}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2"
                         strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"/>
                        <polyline points="12 19 5 12 12 5"/>
                    </svg>
                    Назад в профиль
                </button>

                {/* Имя, email */}
                <OpenProfileHeader name={u.name} email={u.email} />

                {/* Баллы */}
                <OpenProfileScores
                    totalScore={u.totalScore}
                    totalScoreThinking={u.totalScoreThinking}
                    totalScoreAffiliation={u.totalScoreAffiliation}
                    totalScoreFlexibility={u.totalScoreFlexibility}
                    totalScoreExperience={u.totalScoreExperience}
                />

                {/* История попыток */}
                <OpenProfileAttempts attempts={u.attempts} />

                {/* Комментарии */}
                <OpenProfileComments
                    comment={profile.privateComment}
                    commentText={commentText}
                    setCommentText={setCommentText}
                    commentLoading={commentLoading}
                    commentError={commentError}
                    commentSuccess={commentSuccess}
                    onSave={handleWriteComment}
                />

            </div>
        </div>
    );
};

export default AdminOpenProfile;
