import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { MONTHS_ES } from '../../data/events';

interface CalendarHeaderProps {
  month: number;
  year: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

export default function CalendarHeader({
  month,
  year,
  onPrevMonth,
  onNextMonth,
  onToday,
}: CalendarHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      <motion.h2
        key={`${month}-${year}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-bold text-primary-700"
      >
        {MONTHS_ES[month]} {year}
      </motion.h2>
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPrevMonth}
          className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-primary-100 flex items-center justify-center text-neutral-600 hover:text-primary-600 transition-colors"
          aria-label="Mes anterior"
        >
          <ChevronLeft size={20} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToday}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors"
        >
          <CalendarDays size={16} />
          <span className="hidden sm:inline">Hoy</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNextMonth}
          className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-primary-100 flex items-center justify-center text-neutral-600 hover:text-primary-600 transition-colors"
          aria-label="Mes siguiente"
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>
    </div>
  );
}
