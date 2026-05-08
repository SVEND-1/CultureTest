import { useState } from 'react';
import { NAV_LINKS } from '../../api/main.mockData.ts';

export function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="site-header">
            <div className="header-inner">
                <div className="header-brand">
                    <span className="brand-icon">◈</span>
                    <span className="brand-name">CultureTest</span>
                </div>

                <nav className="header-nav">
                    {NAV_LINKS.map((link) => (
                        <a key={link.href} href={link.href} className="nav-link">
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className="header-profile">
                    <a href="/profile" className="profile-btn">
                        Профиль
                    </a>
                </div>

                <button
                    className="burger-btn"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Меню"
                >
                    <span className={`burger-line ${menuOpen ? "open" : ""}`}></span>
                    <span className={`burger-line ${menuOpen ? "open" : ""}`}></span>
                    <span className={`burger-line ${menuOpen ? "open" : ""}`}></span>
                </button>
            </div>

            {menuOpen && (
                <div className="mobile-nav">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="mobile-nav-link"
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            )}
        </header>
    );
}