export function HeroSection() {
    return (
        <section className="hero-section" id="about">
            <div className="hero-glow hero-glow--1" />
            <div className="hero-glow hero-glow--2" />
            <div className="hero-content">
                <div className="hero-badge">Платформа оценки компетенций</div>
                <h1 className="hero-title">
                    Измерьте вашу
                    <br />
                    <span className="hero-title--accent">цифровую культуру</span>
                </h1>
                <p className="hero-subtitle">
                    Пройдите научно обоснованные тесты, определите уровень цифровых
                    компетенций и получите персонализированные рекомендации для роста
                    в цифровой среде.
                </p>
                <div className="hero-actions">
                    <a href="#tests" className="btn-primary">
                        Начать тестирование
                    </a>
                    <a href="#culture" className="btn-ghost">
                        Узнать подробнее
                    </a>
                </div>
                {/*<div className="hero-stats">*/}
                {/*    <div className="hero-stat">*/}
                {/*        <span className="hero-stat__value">4</span>*/}
                {/*        <span className="hero-stat__label">Компетенции</span>*/}
                {/*    </div>*/}
                {/*    <div className="hero-stat-divider" />*/}
                {/*    <div className="hero-stat">*/}
                {/*        <span className="hero-stat__value">67</span>*/}
                {/*        <span className="hero-stat__label">Вопроса</span>*/}
                {/*    </div>*/}
                {/*    <div className="hero-stat-divider" />*/}
                {/*    <div className="hero-stat">*/}
                {/*        <span className="hero-stat__value">~30</span>*/}
                {/*        <span className="hero-stat__label">Минут</span>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </section>
    );
}