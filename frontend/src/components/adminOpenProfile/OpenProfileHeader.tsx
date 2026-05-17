// ============================================================
// OpenProfileHeader.tsx — аватар, имя, email пользователя
// ============================================================

interface Props {
    name: string;
    email: string;
}

const OpenProfileHeader = ({ name, email }: Props) => {
    const initials = name
        .split(' ')
        .map(w => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="profile-card open-profile-header">
            <div className="profile-header">
                <div className="profile-header__left">
                    <div className="profile-header__avatar">{initials}</div>
                    <div className="profile-header__info">
                        <span className="profile-header__name">{name}</span>
                        <span className="profile-header__email">{email}</span>
                    </div>
                </div>
                <div className="open-profile-user-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2.5"
                         strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                    Пользователь
                </div>
            </div>
        </div>
    );
};

export default OpenProfileHeader;
