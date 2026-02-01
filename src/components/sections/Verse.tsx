import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function Verse() {
  return (
    <section
      id="versiculo"
      className="py-24 bg-verse-dark relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        {/* <div className="absolute top-10 left-10 w-64 h-64 border-4 border-white rounded-full" /> */}
        {/* <div className="absolute bottom-10 right-10 w-96 h-96 border-4 border-white rounded-full" /> */}
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <Quote className="w-12 h-12 text-gold-300 mx-auto mb-8 opacity-70" />

          <h2 className="font-accent text-3xl md:text-4xl lg:text-5xl italic text-white font-semibold leading-tight mb-8 drop-shadow-lg">
            "Porque donde están dos o tres congregados en mi nombre, allí estoy
            yo en medio de ellos."
          </h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-gold-400 mx-auto mb-6"
          />

          <p className="font-heading text-lg md:text-xl text-gold-400 font-black tracking-[0.3em] uppercase drop-shadow-md flex items-center justify-center gap-4">
            <span className="h-px w-8 bg-gold-400/50 hidden sm:block"></span>
            Mateo 18:20
            <span className="h-px w-8 bg-gold-400/50 hidden sm:block"></span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
