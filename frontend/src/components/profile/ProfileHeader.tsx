import React from 'react';
import '../../style/profile/profile.header.css';

interface ProfileHeaderProps {
  name: string;
  email: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, email }) => {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

    return (
        <div className="profile-header">
            <div className="profile-headeravatar">{initials}</div>
            <div className="profile-headerinfo">
                <h1 className="profile-headername">{name}</h1>
                <span className="profile-headeremail">{email}</span>
            </div>
            <div className="header-profile">
                <a href="/main" className="profile-btn">
                    Главная
                </a>
            </div>
        </div>

    );
};

export default ProfileHeader;
