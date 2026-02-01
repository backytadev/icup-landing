import { Quote } from 'lucide-react';

export default function Verse() {
  return (
    <section
      id="versiculo"
      className="py-24 bg-verse-dark relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <Quote className="w-12 h-12 text-gold-300 mx-auto mb-8 opacity-70" />

          <h2 className="font-accent text-3xl md:text-4xl lg:text-5xl italic text-white font-semibold leading-tight mb-8 drop-shadow-lg">
            "Porque donde están dos o tres congregados en mi nombre, allí estoy
            yo en medio de ellos."
          </h2>

          <div className="h-1 w-20 bg-gold-400 mx-auto mb-6" />

          <p className="font-heading text-lg md:text-xl text-gold-400 font-black tracking-[0.3em] uppercase drop-shadow-md flex items-center justify-center gap-4">
            <span className="h-px w-8 bg-gold-400/50 hidden sm:block"></span>
            Mateo 18:20
            <span className="h-px w-8 bg-gold-400/50 hidden sm:block"></span>
          </p>
        </div>
      </div>
    </section>
  );
}
