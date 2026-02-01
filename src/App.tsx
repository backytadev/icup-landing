import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Verse from './components/sections/Verse';
import About from './components/sections/About';
import MissionVision from './components/sections/MissionVision';
import Services from './components/sections/Services';
import Location from './components/sections/Location';
import Contact from './components/sections/Contact';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Verse />
        <About />
        <MissionVision />
        <Services />
        <Location />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
