import Hero from '../components/sections/Hero';
import Verse from '../components/sections/Verse';
import About from '../components/sections/About';
import MissionVision from '../components/sections/MissionVision';
import Services from '../components/sections/Services';
import Location from '../components/sections/Location';
import Contact from '../components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Verse />
      <About />
      <MissionVision />
      <Services />
      <Location />
      <Contact />
    </>
  );
}
