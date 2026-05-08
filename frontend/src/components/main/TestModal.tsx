import type {Test} from '../../types/main/main.types';

interface TestModalProps {
    test: Test;
    onClose: () => void;
}

export function TestModal({ test, onClose }: TestModalProps) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} aria-label="Закрыть">
                    ✕
                </button>

                <div className="modal-header">
                    <span className="modal-tag">{test.tag}</span>
                    <h2 className="modal-title">{test.title}</h2>
                </div>

                <p className="modal-desc">{test.description}</p>

                <div className="modal-meta">
                    <div className="modal-meta__item">
                        <span className="modal-meta__icon">📋</span>
                        <div>
                            <span className="modal-meta__label">Вопросов</span>
                            <span className="modal-meta__value">{test.questions}</span>
                        </div>
                    </div>
                    <div className="modal-meta__item">
                        <span className="modal-meta__icon">⏱</span>
                        <div>
                            <span className="modal-meta__label">Время</span>
                            <span className="modal-meta__value">Без ограничений</span>
                        </div>
                    </div>
                    <div className="modal-meta__item">
                        <span className="modal-meta__icon">{test.completed ? "✅" : "🔘"}</span>
                        <div>
                            <span className="modal-meta__label">Статус</span>
                            <span className="modal-meta__value">
                {test.completed ? "Пройден" : "Не пройден"}
              </span>
                        </div>
                    </div>
                </div>

                {test.completed && (
                    <div className="modal-notice modal-notice--done">
                        Вы уже проходили этот тест. Вы можете пройти его повторно.
                    </div>
                )}

                <div className="modal-actions">
                    <button className="btn-primary btn-primary--full">
                        {test.completed ? "Пройти повторно" : "Начать тест"}
                    </button>
                    <button className="btn-ghost btn-ghost--full" onClick={onClose}>
                        Закрыть
                    </button>
                </div>
            </div>
        </div>
    );
}