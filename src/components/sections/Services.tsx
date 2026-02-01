import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  Calendar,
  Star,
  Users,
  Music,
  X,
  Info,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

const services = [
  {
    day: 'Domingo',
    time: '9:00 AM - 11:00 AM | 4:00 PM - 6:00 PM',
    title: 'Servicio Dominical',
    desc: 'Nuestra fiesta principal de alabanza y palabra en doble horario.',
    details:
      'Un tiempo de oración intercesora, adoración, alabanza, y una enseñanza bíblica profunda aplicada a la vida diaria. ¡Toda la familia es bienvenida!',
    benefits: [
      'Alabanza y adoración',
      'Escuela dominical para niños',
      'Comunidad y crecimiento espiritual',
      'Enseñanza bíblica',
    ],
    icon: Star,
  },
  {
    day: 'Martes y Jueves',
    time: '5:30 PM | 6:00 PM | 7:00 PM | 7:30 PM',
    title: 'Grupos Familiares',
    desc: 'Reuniones de oración y discipulado en diferentes hogares de la zona.',
    details:
      'Células de crecimiento espiritual donde compartimos la palabra de forma cercana, oramos unos por otros y fortalecemos los lazos fraternales. Los horarios varían según la ubicación del grupo.',
    benefits: [
      'Entorno fraternal',
      'Diversos horarios disponibles',
      'Enseñanzas bíblicas prácticas',
      'Compañerismo y apoyo espiritual',
    ],
    icon: Calendar,
  },
  {
    day: 'Sábado (Ayuno)',
    time: '9:00 AM - 3:00 PM',
    title: 'Culto de Ayuno',
    desc: 'Un tiempo profundo de búsqueda y oración en el templo.',
    details:
      'Dedicamos este tiempo para humillarnos ante Dios, buscar Su dirección y ser fortalecidos en fe a través de la oración continua y el estudio de las Escrituras.',
    benefits: [
      'Intercesión profunda',
      'Ministración espiritual',
      'Lectura de la Palabra',
      'Renovación de fuerzas',
    ],
    icon: Users,
  },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<
    (typeof services)[0] | null
  >(null);

  return (
    <section id="servicios" className="section bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-title accent-underline">
            Servicios y Horarios
          </h2>
          <p className="section-subtitle mt-4">
            Te invitamos a ser parte de nuestras actividades. ¡Siempre hay un
            lugar para ti!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-neutral-50 rounded-3xl p-8 border border-neutral-100 hover:border-primary-200 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100/50 rounded-bl-full translate-x-12 -translate-y-12 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform" />

              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary-600 shadow-sm">
                  <service.icon size={24} />
                </div>
                <div className="text-right">
                  <span className="block font-bold text-primary-600 text-lg">
                    {service.day}
                  </span>
                  <div className="flex items-center gap-1 text-neutral-400 text-sm justify-end">
                    <Clock size={14} />
                    <span>{service.time}</span>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">
                {service.desc}
              </p>

              <motion.button
                whileHover={{ x: 5 }}
                onClick={() => setSelectedService(service)}
                className="mt-6 flex items-center gap-2 text-primary-600 font-bold text-sm cursor-pointer"
              >
                Más información <Info size={16} />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Note about other activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-6 md:p-8 bg-gradient-to-r from-primary-600 to-primary-800 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 shadow-xl"
        >
          <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-4 md:gap-6">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
              <Music size={24} className="md:w-8 md:h-8" />
            </div>
            <div>
              <h4 className="text-xl font-bold">Culto de Jóvenes</h4>
              <p className="text-white/80 text-sm md:text-base">
                Todos los sábados de 6:00 PM a 8:00 PM. ¡Un tiempo dedicado a la
                nueva generación!
              </p>
            </div>
          </div>
          <button
            onClick={() =>
              setSelectedService({
                day: 'Sábado',
                time: '6:00 PM - 8:00 PM',
                title: 'Culto de Jóvenes',
                desc: 'Encuentro especial para la juventud de nuestra comunidad.',
                details:
                  'Un espacio dinámico diseñado para jóvenes, con alabanza moderna, dinámicas grupales y mensajes relevantes que abordan los desafíos de la juventud desde una perspectiva bíblica.',
                benefits: [
                  'Adoración y alabanza',
                  'Amistades cristianas',
                  'Crecimiento espiritual',
                  'Eventos especiales',
                ],
                icon: Music,
              })
            }
            className="btn-gold whitespace-nowrap"
          >
            Saber más
          </button>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-primary-950/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
            >
              {/* Header decorativo */}
              <div className="h-28 md:h-32 bg-gradient-to-br from-primary-600 to-primary-800 p-6 md:p-8 flex items-end relative shrink-0">
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 md:top-6 right-4 md:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <X size={20} />
                </button>
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <selectedService.icon size={26} />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-black">
                      {selectedService.title}
                    </h3>
                    <p className="text-white/80 text-sm font-medium">
                      {selectedService.day}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                <div className="flex items-center gap-3 text-primary-600 mb-6 bg-primary-50 p-3 rounded-2xl w-fit">
                  <Clock size={18} />
                  <span className="font-bold text-sm">
                    {selectedService.time}
                  </span>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="flex items-center gap-2 text-neutral-800 font-bold mb-2 uppercase tracking-wider text-xs">
                      <Star size={14} className="text-gold-500" /> Acerca del
                      Servicio
                    </h4>
                    <p className="text-neutral-600 leading-relaxed italic">
                      "{selectedService.details}"
                    </p>
                  </div>

                  {selectedService.benefits && (
                    <div>
                      <h4 className="text-neutral-800 font-bold mb-3 uppercase tracking-wider text-xs">
                        Qué esperar
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedService.benefits.map((benefit, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-sm text-neutral-600"
                          >
                            <CheckCircle2
                              size={14}
                              className="text-primary-500"
                            />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 flex items-center gap-3 text-neutral-400 text-xs">
                    <MapPin size={14} />
                    <span>
                      Templo Principal - Av. Valle Sagrado de los Incas 167
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedService(null)}
                  className="btn-primary w-full mt-8 py-4 shadow-lg shadow-primary-500/20"
                >
                  Entendido
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
