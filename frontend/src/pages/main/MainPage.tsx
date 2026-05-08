
import { Header } from '../../components/main/Header';
import { HeroSection } from '../../components/main/HeroSection';
import { InstructionSection } from '../../components/main/InstructionSection';
import { TestsSection } from '../../components/main/TestsSection';
import { PillarsSection } from '../../components/main/PillarsSection';
import { Footer } from '../../components/main/Footer';
import { useMain } from './useMain';
import { TESTS, PILLARS } from '../../api/main.mockData.ts';
import '../../style/main/main.style.css';

export default function MainPage() {
    const { activeTest, openTest, closeTest } = useMain();

    return (
        <div className="app">
            <Header />
            <main>
                <HeroSection />
                <InstructionSection />
                <TestsSection
                    tests={TESTS}
                    activeTest={activeTest}
                    onOpenTest={openTest}
                    onCloseTest={closeTest}
                />
                <PillarsSection pillars={PILLARS} />
            </main>
            <Footer />
        </div>
    );
}