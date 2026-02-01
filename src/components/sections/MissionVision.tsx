import { motion } from 'framer-motion';
import { Target, Compass, Eye } from 'lucide-react';

const cards = [
  {
    icon: Target,
    title: 'Nuestra Misión',
    content:
      'Somos una iglesia unida por el amor de Dios, que adora y alaba al Señor, comprometida con las doctrinas fundamentales del cristianismo, la evangelización y el crecimiento del Reino de Dios.',
    color: 'bg-primary-600',
  },
  {
    icon: Eye,
    title: 'Nuestra Visión',
    content:
      'Anhelamos una iglesia llena del Espíritu Santo, con líderes con formación bíblica, teológica y pastoral para el servicio integral a través de Ministerios Especializados y grupos familiares.',
    color: 'bg-gold-500',
  },
  {
    icon: Compass,
    title: 'Nuestro Propósito',
    content:
      'Formar miembros y líderes para el servicio integral a la comunidad, plantando nuevos grupos de oración y discipulado bajo la identidad Cristiana Bíblica.',
    color: 'bg-accent-600',
  },
];

export default function MissionVision() {
  return (
    <section className="section section-alt">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-title accent-underline">Misión y Visión</h2>
          <p className="section-subtitle mt-4">
            Nuestro propósito y el destino que Dios ha trazado para nosotros
            como congregación.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="card group hover:scale-[1.02]"
            >
              <div
                className={`w-16 h-16 ${card.color} rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg group-hover:rotate-6 transition-transform`}
              >
                <card.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
              <p className="text-neutral-600 leading-relaxed">{card.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
