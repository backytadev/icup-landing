import { motion } from 'framer-motion';
import { Send, MessageSquare, User, AtSign } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contacto" className="section bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-stretch gap-16">
          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <h2 className="section-title text-left accent-underline mb-4">
              Contáctanos
            </h2>
            <p className="text-neutral-500 mb-10">
              ¿Tienes alguna petición de oración o pregunta? Escríbenos, estamos
              aquí para escucharte y apoyarte.
            </p>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-neutral-700 flex items-center gap-2">
                    <User size={14} className="text-primary-500" />
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    className="w-full px-5 py-4 rounded-2xl bg-neutral-50 border border-neutral-100 focus:border-primary-400 focus:bg-white outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-neutral-700 flex items-center gap-2">
                    <AtSign size={14} className="text-primary-500" />
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    placeholder="ejemplo@correo.com"
                    className="w-full px-5 py-4 rounded-2xl bg-neutral-50 border border-neutral-100 focus:border-primary-400 focus:bg-white outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700 flex items-center gap-2">
                  <MessageSquare size={14} className="text-primary-500" />
                  Tu Mensaje o Petición
                </label>
                <textarea
                  rows={5}
                  placeholder="¿En qué podemos ayudarte?"
                  className="w-full px-5 py-4 rounded-2xl bg-neutral-50 border border-neutral-100 focus:border-primary-400 focus:bg-white outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button className="btn-primary w-full group overflow-hidden relative">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Enviar Mensaje
                  <Send
                    size={18}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </span>
              </button>
            </form>
          </motion.div>

          {/* Banner Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative min-h-[400px] rounded-[2rem] overflow-hidden"
          >
            <div className="absolute inset-0 gradient-primary" />
            <div className="absolute inset-0 opacity-20">
              <img
                src="https://images.unsplash.com/photo-1438029071396-1e831a7fa6d8?auto=format&fit=crop&q=80&w=800"
                alt="Manos orando"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative z-10 p-12 h-full flex flex-col justify-center items-center text-center text-white">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-8 border-2 border-white/40">
                <MessageSquare
                  size={40}
                  className="drop-shadow-sm text-white"
                />
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold mb-6 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] text-gold-300 uppercase tracking-tight">
                Peticiones de Oración
              </h3>
              <p className="text-white font-bold text-lg md:text-xl max-w-sm mb-10 leading-relaxed drop-shadow-lg">
                "Durante nuestros cultos de oración, llevamos todas tus
                peticiones ante el trono de la gracia."
              </p>
              <div className="flex flex-col items-center gap-4">
                <p className="text-gold-300 font-black text-sm md:text-md drop-shadow-md italic">
                  "Orad unos por otros, para que seáis sanados. La oración
                  eficaz del justo puede mucho..."
                </p>
                <span className="text-white/90 font-bold text-xs md:text-sm tracking-[0.2em] uppercase drop-shadow-sm">
                  Santiago 5:16
                </span>

                {/* 
                <a 
                  href="https://wa.me/#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-gold px-10 flex items-center gap-3 group shadow-[0_0_20px_rgba(217,119,6,0.5)]"
                >
                  <span className="font-black text-lg">WhatsApp Directo</span>
                </a>
                <span className="text-white/60 text-xs font-bold tracking-widest uppercase">Atención rápida</span>
                */}
              </div>
            </div>

            {/* Floating decoration */}
            <div className="absolute top-10 right-10 w-24 h-24 bg-gold-400/20 rounded-full blur-2xl" />
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-accent-400/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
