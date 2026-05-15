// ============================================================
// MainPage.tsx — главная страница /
// ============================================================

import { Header }           from '../../components/main/Header';
import { HeroSection }      from '../../components/main/HeroSection';
import { InstructionSection } from '../../components/main/InstructionSection';
import { TestsSection }     from '../../components/main/TestsSection';
import { PillarsSection }   from '../../components/main/PillarsSection';
import { Footer }           from '../../components/main/Footer';
import { useMain }          from './useMain';
import { PILLARS }          from '../../api/main.mockData';
import '../../style/main/main.style.css';

export default function MainPage() {
    const {
        tests,
        testsLoading,
        testsError,
        activeTest,
        //modalLoading,
        openTest,
        closeTest,
        startTest,
        goToProfile,
    } = useMain();

    return (
        <div className="app">
            <Header onProfileClick={goToProfile} />
            <main>
                <HeroSection />
                <InstructionSection />
                <TestsSection
                    tests={tests}
                    loading={testsLoading}
                    error={testsError}
                    activeTest={activeTest}
                    modalLoading={false} //
                    onOpenTest={openTest}
                    onCloseTest={closeTest}
                    onStartTest={startTest}
                />
                <PillarsSection pillars={PILLARS} />
            </main>
            <Footer />
        </div>
    );
}
