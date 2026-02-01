import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Navigation,
  X,
  Car,
  Bus,
  Train,
  Info,
} from 'lucide-react';

export default function Location() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const routes = [
    {
      icon: Train,
      title: 'Vía Metropolitano',
      desc: 'Bajar en la Estación Naranjal. Desde ahí, tomar un alimentador o taxi hacia la zona de Tahuantinsuyo (aprox. 10 min).',
    },
    {
      icon: Bus,
      title: 'Transporte Público',
      desc: 'Tomar la línea "Ham" que pase por la Av. Túpac Amaru. Bajar en el paradero final de "Valle Sagrado".',
    },
    {
      icon: Car,
      title: 'Referencia Local',
      desc: 'Nos encontramos a la altura del Centro deportivo "Modulo", en la Av. Valle Sagrado.',
    },
  ];

  return (
    <section id="ubicacion" className="section section-alt overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-title accent-underline">Nuestra Ubicación</h2>
          <p className="section-subtitle mt-4">
            Estamos ubicados en un punto accesible para toda la comunidad. ¡Te
            esperamos!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          {/* Map Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-2/3 h-[450px] rounded-3xl overflow-hidden shadow-xl border-4 border-white relative group"
          >
            {/* Embedded Google Map (Tahuantinsuyo) */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1136.3150531580226!2d-77.0163353597014!3d-11.967812239454153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105cf49842f6f59%3A0xe7bc32204c96576b!2sAv.%20Valle%20Sagrado%20de%20los%20Incas%20167%2C%20Independencia%2015333!5e0!3m2!1ses!2spe!4v1700000000000!5m2!1ses!2spe"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación ICUP"
            ></iframe>
            <div className="absolute inset-0 bg-primary-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </motion.div>

          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/3 flex flex-col gap-6"
          >
            <div className="bg-white p-8 rounded-3xl shadow-sm flex-1">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Navigation size={24} className="text-primary-600" />
                Cómo Llegar
              </h3>

              <ul className="space-y-8">
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-800">Dirección</h4>
                    <p className="text-neutral-500 text-sm">
                      Av. Valle Sagrado de los Incas 167 - Tahuantinsuyo
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent-50 flex items-center justify-center text-accent-600 shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-800">Teléfono</h4>
                    <p className="text-neutral-500 text-sm">(No disponible)</p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold-50 flex items-center justify-center text-gold-500 shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-800">Consultas</h4>
                    <p className="text-neutral-500 text-sm">
                      iglesi.unidos@icup-iglesia.org
                    </p>
                  </div>
                </li>
              </ul>

              <a
                href="https://maps.app.goo.gl/KfPSheBZQxCGE1Ab9"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full mt-10 flex items-center justify-center gap-2"
              >
                <Navigation size={18} />
                Abrir en Google Maps
              </a>
            </div>

            <div className="gradient-primary p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full pointer-events-none" />
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <Car size={20} className="text-gold-300" />
                Guía de Rutas
              </h4>
              <p className="text-white/80 text-sm mb-6">
                ¿No estás seguro de cómo llegar? Hemos preparado una guía con
                las rutas más rápidas.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-bold text-sm transition-all backdrop-blur-md flex items-center justify-center gap-2"
              >
                <Info size={16} /> Ver Rutas y Caminos
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Routes Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-primary-950/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
            >
              <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600">
                      <Navigation size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-black text-neutral-800">
                        Cómo llegar a ICUP
                      </h3>
                      <p className="text-neutral-500 text-[10px] md:text-xs font-bold uppercase tracking-wider">
                        Tahuantinsuyo, Independencia
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 flex items-center justify-center transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4 md:space-y-6">
                  {routes.map((route, i) => (
                    <div
                      key={i}
                      className="flex gap-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-100"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary-500 shadow-sm shrink-0">
                        <route.icon size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-neutral-800 text-sm mb-1">
                          {route.title}
                        </h4>
                        <p className="text-neutral-600 text-xs leading-relaxed">
                          {route.desc}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="bg-gold-50 p-6 rounded-2xl border border-gold-100 flex gap-4">
                    <Car className="text-gold-600 shrink-0" size={24} />
                    <div>
                      <h4 className="font-bold text-gold-900 text-sm mb-1">
                        ¿Necesitas transporte para el domingo?
                      </h4>
                      <p className="text-gold-800 text-xs leading-relaxed mb-3">
                        Contamos con rutas de transporte propias para nuestros
                        miembros. Consúltanos por WhatsApp.
                      </p>
                      <a
                        href="https://wa.me/#"
                        className="text-gold-600 font-black text-xs uppercase tracking-widest hover:underline"
                      >
                        Enviar mensaje →
                      </a>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="btn-primary w-full mt-8 py-4 shadow-lg shadow-primary-500/20"
                >
                  Entendido, ¡gracias!
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
