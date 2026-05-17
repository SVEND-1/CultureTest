// ============================================================
// TestIntro.tsx — экран перед началом теста
// ============================================================

import type { TestResponse } from '../../types/test/test.types';

interface Props {
    test: TestResponse;
    onStart: () => void;
    loading: boolean;
}

const TestIntro = ({ test, onStart, loading }: Props) => (
    <div className="test-intro">
        <div className="test-intro__icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="1.8"
                 strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
            </svg>
        </div>

        <h1 className="test-intro__title">{test.name}</h1>
        <p className="test-intro__desc">{test.description}</p>

        <div className="test-intro__meta">
            <div className="test-intro__meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2"
                     strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                </svg>
                <span>{test.questions.length} вопросов</span>
            </div>
            <div className="test-intro__meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2"
                     strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>Без ограничений по времени</span>
            </div>
        </div>

        <button
            className="test-btn test-btn--primary"
            onClick={onStart}
            disabled={loading}
        >
            {loading ? (
                <>
                    <span className="test-spinner"/>
                    Загрузка...
                </>
            ) : (
                <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2.5"
                         strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                    Начать тест
                </>
            )}
        </button>
    </div>
);

export default TestIntro;
