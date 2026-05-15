// ============================================================
// ProfileHeader.tsx — аватар, имя, email, роль пользователя
// ============================================================

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/profile/profile.header.css';

interface ProfileHeaderProps {
    name: string;
    email: string;
    role?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, email, role }) => {
    const navigate = useNavigate();

    const initials = name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    const roleLabel = role === 'ADMIN' ? 'Администратор' : 'Пользователь';

    return (
        <div className="profile-header">
            <div className="profile-header__left">
                <div className="profile-header__avatar">{initials}</div>
                <div className="profile-header__info">
                    <span className="profile-header__name">{name}</span>
                    <span className="profile-header__email">{email}</span>
                </div>
            </div>
            <div className="profile-header__right">
                <div className="profile-header__badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2.5"
                         strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                    {roleLabel}
                </div>
                <button className="profile-header__back" onClick={() => navigate('/main')}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2"
                         strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"/>
                        <polyline points="12 19 5 12 12 5"/>
                    </svg>
                    На главную
                </button>
            </div>
        </div>
    );
};

export default ProfileHeader;