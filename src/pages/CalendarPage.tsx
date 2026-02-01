import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Church } from 'lucide-react';
import ViewToggle from '../components/ui/ViewToggle';
import Calendar from '../components/calendar/Calendar';
import EventsList from '../components/calendar/EventsList';
import EventModal from '../components/calendar/EventModal';
import { getEventsForYear } from '../data/events';
import type { ChurchEvent } from '../types/events';

export default function CalendarPage() {
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [selectedEvent, setSelectedEvent] = useState<ChurchEvent | null>(null);

  const currentYear = new Date().getFullYear();
  const events = useMemo(() => {
    return [
      ...getEventsForYear(currentYear),
      ...getEventsForYear(currentYear + 1),
    ];
  }, [currentYear]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-gold-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/80 text-sm mb-6">
              <Church size={16} />
              <span>ICUP - Calendario de Actividades</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
              Calendario de{' '}
              <span className="text-gold-400">Actividades</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              Conoce todas nuestras actividades, cultos y eventos especiales.
              ¡Siempre hay un lugar para ti!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="section bg-neutral-50">
        <div className="container mx-auto px-6">
          {/* View Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <ViewToggle view={view} onViewChange={setView} />
          </motion.div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {view === 'calendar' ? (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Calendar />
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-3xl mx-auto"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center">
                    <CalendarIcon size={24} className="text-primary-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-primary-700">
                      Próximos Eventos
                    </h2>
                    <p className="text-neutral-500 text-sm">
                      Lista de actividades programadas
                    </p>
                  </div>
                </div>
                <EventsList events={events} onEventClick={setSelectedEvent} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Event Modal for List View */}
      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
}
