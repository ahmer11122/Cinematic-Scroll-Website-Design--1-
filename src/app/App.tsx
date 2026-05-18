import { NavBar } from "./components/NavBar";
import { HeroSequence } from "./components/HeroSequence";
import { WhoSequence } from "./components/WhoSequence";
import { ExpertiseSequence } from "./components/ExpertiseSequence";
import { WorkSequence } from "./components/WorkSequence";
import { ContactSequence } from "./components/ContactSequence";

export default function App() {
  return (
    <main className="relative min-h-screen bg-[#030301] selection:bg-white selection:text-black">
      <NavBar />
      <HeroSequence />
      <WhoSequence />
      <ExpertiseSequence />
      <WorkSequence />
      <ContactSequence />
    </main>
  );
}
