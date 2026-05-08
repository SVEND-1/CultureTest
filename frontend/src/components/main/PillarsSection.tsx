import type {DigitalPillar} from '../../types/main/main.types';

interface PillarsSectionProps {
    pillars: DigitalPillar[];
}

export function PillarsSection({ pillars }: PillarsSectionProps) {
    return (
        <section className="pillars-section" id="culture">
            <div className="section-container">
                <div className="section-header">
                    <span className="section-tag">Концепция</span>
                    <h2 className="section-title">Цифровая культура</h2>
                    <p className="section-desc">
                        Четыре ключевых компетенции, формирующих полноценную цифровую
                        культуру специалиста в современной среде.
                    </p>
                </div>
                <div className="pillars-grid">
                    {pillars.map((pillar, i) => (
                        <div key={i} className={`pillar-card ${pillar.color}`}>
                            <div className="pillar-card__icon">{pillar.icon}</div>
                            <h3 className="pillar-card__title">{pillar.title}</h3>
                            <p className="pillar-card__desc">{pillar.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}