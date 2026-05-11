import type { Test } from '../../types/main/main.types';
import { TestCard } from './TestCard';
import { TestModal } from './TestModal';

interface TestsSectionProps {
    tests: Test[];
    loading: boolean;
    error: string | null;
    activeTest: Test | null;
    modalLoading: boolean;
    onOpenTest: (test: Test) => void;
    onCloseTest: () => void;
    onStartTest: (testId: number) => void;
}

export function TestsSection({
    tests,
    loading,
    error,
    activeTest,
    modalLoading,
    onOpenTest,
    onCloseTest,
    onStartTest,
}: TestsSectionProps) {
    return (
        <section className="tests-section" id="tests">
            <div className="section-container">
                <div className="section-header">
                    <span className="section-tag">Оценка компетенций</span>
                    <h2 className="section-title">Доступные тесты</h2>
                    <p className="section-desc">
                        Каждый тест охватывает отдельный аспект цифровой культуры.
                        Пройдите все для полной картины своих компетенций.
                    </p>
                </div>

                {loading && (
                    <div className="tests-loading">
                        <div className="profile-loading__spinner" />
                        <span className="profile-loading__text">Загружаем тесты...</span>
                    </div>
                )}

                {error && !loading && (
                    <div className="tests-error">
                        <span>⚠️</span>
                        <span>{error}</span>
                    </div>
                )}

                {!loading && !error && (
                    <div className="tests-grid">
                        {tests.map((test) => (
                            <TestCard key={test.id} test={test} onOpen={onOpenTest} />
                        ))}
                    </div>
                )}
            </div>

            {activeTest && (
                <TestModal
                    test={activeTest}
                    loading={modalLoading}
                    onClose={onCloseTest}
                    onStart={onStartTest}
                />
            )}
        </section>
    );
}
