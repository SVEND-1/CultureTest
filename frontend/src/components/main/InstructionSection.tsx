export function InstructionSection() {
    const steps = [
        {
            num: "01",
            title: "Выберите тест",
            desc: "Откройте любой из доступных тестов и ознакомьтесь с описанием и количеством вопросов.",
        },
        {
            num: "02",
            title: "Пройдите тестирование",
            desc: "Отвечайте на вопросы вдумчиво. Таймер отсутствует — у вас есть столько времени, сколько нужно.",
        },
        {
            num: "03",
            title: "Получите результат",
            desc: "После завершения вы увидите детальный анализ своих цифровых компетенций и рекомендации.",
        },
    ];

    return (
        <section className="instruction-section">
            <div className="section-container">
                <div className="section-header">
                    <span className="section-tag">Как это работает</span>
                    <h2 className="section-title">Инструкция по прохождению</h2>
                    <p className="section-desc">
                        Тесты не имеют ограничения по времени — отвечайте в комфортном
                        темпе. Ваши результаты сохраняются автоматически.
                    </p>
                </div>
                <div className="steps-grid">
                    {steps.map((step, i) => (
                        <div key={i} className="step-card">
                            <div className="step-num">{step.num}</div>
                            <h3 className="step-title">{step.title}</h3>
                            <p className="step-desc">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}