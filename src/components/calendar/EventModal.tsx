import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, MapPin, Calendar, Star, Repeat } from 'lucide-react';
import type { ChurchEvent } from '../../types/events';
import { CATEGORY_INFO, formatTime, formatDate } from '../../data/events';

interface EventModalProps {
  event: ChurchEvent | null;
  onClose: () => void;
}

const recurrenceLabels: Record<string, string> = {
  none: 'Evento único',
  weekly: 'Cada semana',
  biweekly: 'Cada dos semanas',
  monthly: 'Cada mes',
  yearly: 'Cada año',
};

export default function EventModal({ event, onClose }: EventModalProps) {
  if (!event) return null;

  const category = CATEGORY_INFO[event.category];

  return (
    <AnimatePresence>
      {event && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary-950/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[2.5rem] overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div
              className={`h-28 md:h-32 bg-gradient-to-br ${category.headerGradient} p-6 md:p-8 flex items-end relative shrink-0`}
            >
              <button
                onClick={onClose}
                className="absolute top-4 md:top-6 right-4 md:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-4 !text-white">
                <div
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl backdrop-blur-md flex items-center justify-center bg-white/20`}
                >
                  <Calendar size={26} className="!text-white" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black leading-tight !text-white">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 text-white/90 text-xs font-bold uppercase tracking-wider mt-1">
                    <span className="px-2 py-0.5 rounded-full bg-white/20">
                      {category.label}
                    </span>
                    {event.isHighlighted && (
                      <span className="flex items-center gap-1 text-gold-300">
                        <Star size={10} className="fill-gold-300" />
                        Destacado
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
              {/* Date and Time */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div
                  className={`flex items-center gap-2 ${category.color} ${category.bgColor} px-4 py-2 rounded-xl`}
                >
                  <Calendar size={16} />
                  <span className="font-bold text-xs md:text-sm">
                    {formatDate(event.date)}
                  </span>
                </div>
                <div
                  className={`flex items-center gap-2 ${category.color} ${category.bgColor} px-4 py-2 rounded-xl`}
                >
                  <Clock size={16} />
                  <span className="font-bold text-xs md:text-sm">
                    {formatTime(event.startTime)} - {formatTime(event.endTime)}
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h4
                    className="flex items-center gap-2 font-bold mb-2 uppercase tracking-widest text-[10px] md:text-xs"
                    style={{
                      color: `var(--color-${category.color.replace('text-', '')})`,
                    }}
                  >
                    <Star size={14} className="fill-current" /> Descripción
                  </h4>
                  <p className="text-neutral-600 leading-relaxed italic text-sm md:text-base">
                    "{event.description}"
                  </p>
                </div>

                {/* Location */}
                <div>
                  <h4
                    className="flex items-center gap-2 font-bold mb-2 uppercase tracking-widest text-[10px] md:text-xs"
                    style={{
                      color: `var(--color-${category.color.replace('text-', '')})`,
                    }}
                  >
                    <MapPin size={14} /> Ubicación
                  </h4>
                  <div className="flex items-start gap-2 text-neutral-600 text-sm md:text-base">
                    <span className="leading-tight">{event.location}</span>
                  </div>
                </div>

                {/* Recurrence */}
                {event.recurrence !== 'none' && (
                  <div>
                    <h4
                      className="flex items-center gap-2 font-bold mb-2 uppercase tracking-widest text-[10px] md:text-xs"
                      style={{
                        color: `var(--color-${category.color.replace('text-', '')})`,
                      }}
                    >
                      <Repeat size={14} /> Frecuencia
                    </h4>
                    <div className="flex items-center gap-2 text-neutral-600 text-sm md:text-base">
                      <span>{recurrenceLabels[event.recurrence]}</span>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={onClose}
                className={`w-full mt-8 py-2 md:py-4 rounded-2xl font-bold text-white shadow-lg transition-all active:scale-95 bg-gradient-to-r ${category.headerGradient} hover:shadow-xl`}
              >
                Entendido
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
