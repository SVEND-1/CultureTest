// ============================================================
// AdminProfile.tsx — страница /admin-profile
// ============================================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminProfile } from './useAdminProfile';
import AdminInfoCard from '../../components/adminProfile/AdminInfoCard';
import AdminActionsCard from '../../components/adminProfile/AdminActionsCard';
import AdminTestsCard from '../../components/adminProfile/AdminTestsCard';
import AdminAttemptsCard from '../../components/adminProfile/AdminAttemptsCard';
import AdminAttemptModal from '../../components/adminProfile/AdminAttemptModal';
import AICandidatesBlock from '../../components/adminProfile/AICandidatesBlock';
import AICandidatesModal from '../../components/adminProfile/AICandidatesModal';
import type { TestAttemptAdmin } from '../../types/adminProfile/adminProfile.types';
import '../../style/adminProfile/adminProfile.index.css';

const AdminProfile = () => {
    const navigate = useNavigate();

    const {
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
    } = useAdminProfile();

    const [selectedAttempt, setSelectedAttempt] = useState<TestAttemptAdmin | null>(null);
    const [aiModalOpen, setAiModalOpen] = useState(false);

    const handleSelectCandidate = (userId: number) => {
        setAiModalOpen(false);
        navigate(`/admin-open-profile/${userId}`);
    };

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

    if (error) {
        return (
            <div className="profile-page">
                <div className="profile-error">
                    <span className="profile-error__icon">⚠️</span>
                    <span className="profile-error__message">{error}</span>
                    <button
                        className="profile-error__retry"
                        onClick={() => window.location.reload()}
                    >
                        Повторить
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="profile-page__inner">

                {/* Имя, email, роль */}
                {adminInfo && <AdminInfoCard adminInfo={adminInfo} />}

                {/* Навигация + добавление админа */}
                <AdminActionsCard
                    addAdminEmail={addAdminEmail}
                    setAddAdminEmail={setAddAdminEmail}
                    addAdminLoading={addAdminLoading}
                    addAdminError={addAdminError}
                    addAdminSuccess={addAdminSuccess}
                    onAddAdmin={handleAddAdmin}
                />

                {/* Подбор сотрудников через ИИ */}
                <AICandidatesBlock
                    candidates={aiCandidates}
                    onOpenModal={() => setAiModalOpen(true)}
                    onSelectCandidate={handleSelectCandidate}
                />

                {/* Тесты */}
                {profile && <AdminTestsCard tests={profile.tests} />}

                {/* Попытки */}
                {profile && (
                    <AdminAttemptsCard
                        attempts={profile.attempts}
                        tests={profile.tests}
                        onAttemptClick={setSelectedAttempt}
                    />
                )}
            </div>

            {/* Модалка попытки */}
            {selectedAttempt && profile && (
                <AdminAttemptModal
                    attempt={selectedAttempt}
                    tests={profile.tests}
                    onClose={() => setSelectedAttempt(null)}
                />
            )}

            {/* Модалка ИИ подбора */}
            {aiModalOpen && (
                <AICandidatesModal
                    aiRole={aiRole}
                    setAiRole={setAiRole}
                    aiLoading={aiLoading}
                    aiError={aiError}
                    aiCandidates={aiCandidates}
                    onSearch={handleFetchCandidates}
                    onClose={() => setAiModalOpen(false)}
                    onSelectCandidate={handleSelectCandidate}
                />
            )}
        </div>
    );
};

export default AdminProfile;
