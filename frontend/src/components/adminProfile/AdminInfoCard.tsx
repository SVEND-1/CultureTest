// ============================================================
// AdminInfoCard.tsx — карточка с именем, почтой и ролью
// ============================================================

import type { AdminInfo } from '../../types/adminProfile/adminProfile.types';

interface Props {
    adminInfo: AdminInfo;
}

const AdminInfoCard = ({ adminInfo }: Props) => {
    const initials = adminInfo.name
        .split(' ')
        .map(w => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="profile-card admin-info-card">
            <div className="profile-header">
                <div className="profile-header__left">
                    <div className="profile-header__avatar">{initials}</div>
                    <div className="profile-header__info">
                        <span className="profile-header__name">{adminInfo.name}</span>
                        <span className="profile-header__email">{adminInfo.email}</span>
                    </div>
                </div>
                <div className="admin-role-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2.5"
                         strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
                    </svg>
                    {adminInfo.role}
                </div>
            </div>
        </div>
    );
};

export default AdminInfoCard;