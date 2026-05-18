import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { NavBar } from "./components/NavBar";
import { HeroSequence } from "./components/HeroSequence";
import { WhoSequence } from "./components/WhoSequence";
import { ExpertiseSequence } from "./components/ExpertiseSequence";
import { WorkSequence } from "./components/WorkSequence";
import { ContactSequence } from "./components/ContactSequence";
import { SplashScreen } from "./components/SplashScreen";

export default function App() {
  const [isSplashFinished, setIsSplashFinished] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {!isSplashFinished && (
          <SplashScreen key="splash" onFinish={() => setIsSplashFinished(true)} />
        )}
      </AnimatePresence>

      {isSplashFinished && (
        <main className="relative min-h-screen bg-[#030301] selection:bg-white selection:text-black">
          <NavBar />
          <HeroSequence />
          <WhoSequence />
          <ExpertiseSequence />
          <WorkSequence />
          <ContactSequence />
        </main>
      )}
    </>
  );
}
