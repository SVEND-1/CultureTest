import type {Test} from '../../types/main/main.types';
import { TestCard } from './TestCard';
import { TestModal } from './TestModal';

interface TestsSectionProps {
    tests: Test[];
    activeTest: Test | null;
    onOpenTest: (test: Test) => void;
    onCloseTest: () => void;
}

export function TestsSection({ tests, activeTest, onOpenTest, onCloseTest }: TestsSectionProps) {
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
                <div className="tests-grid">
                    {tests.map((test) => (
                        <TestCard key={test.id} test={test} onOpen={onOpenTest} />
                    ))}
                </div>
            </div>

            {activeTest && (
                <TestModal test={activeTest} onClose={onCloseTest} />
            )}
        </section>
    );
}