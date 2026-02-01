import { motion } from 'framer-motion';
import { Users, Heart, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <section id="nosotros" className="section bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/image-about.jpg"
                alt="Iglesia Cristiana ICUP"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Decorative elements behind image */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary-100 rounded-full -z-10" />
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gold-100 rounded-2xl -z-10" />
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <h2 className="section-title text-left accent-underline mb-12">
              Sobre Nosotros
            </h2>

            <p className="text-neutral-600 mb-8 text-lg leading-relaxed">
              Nacida en <span className="text-primary-600 font-bold">2018</span>{' '}
              en la localidad de Tahuantinsuyo, la Iglesia Cristiana Unidos en
              su Presencia surge como fruto de la oración y el ayuno, con el
              firme propósito de ser una luz de salvación.
            </p>

            <p className="text-neutral-600 mb-10 text-lg leading-relaxed">
              Establecida formalmente el 23 de septiembre, nuestra obra se
              fortalece día a día bajo la guía del Espíritu Santo, trabajando
              unidos para extender el Reino de Dios a través de líderes
              comprometidos con el servicio integral a la comunidad.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  icon: Sparkles,
                  title: 'Oración y Ayuno',
                  desc: 'Fundamento espiritual de todo lo que hacemos como cuerpo de Cristo.',
                },
                {
                  icon: Heart,
                  title: 'Grupos Familiares',
                  desc: 'Plantación de nuevas células para hacer discípulos a todas las naciones.',
                },
                {
                  icon: Users,
                  title: 'Formación de Líderes',
                  desc: 'Desarrollo de liderazgo bíblico para avanzar en los campos de Dios.',
                },
                {
                  icon: Sparkles,
                  title: 'Misión Social',
                  desc: 'Identificación cristiana práctica atendiendo necesidades de la comunidad.',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 rounded-xl hover:bg-neutral-50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 shrink-0">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-primary-700">
                      {item.title}
                    </h4>
                    <p className="text-sm text-neutral-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
