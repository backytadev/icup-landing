import { motion } from 'framer-motion';
import type { CalendarDay as CalendarDayType } from '../../types/events';
import { DAYS_ES } from '../../data/events';
import { isSameDay } from '../../utils/calendar';
import CalendarDay from './CalendarDay';

interface CalendarGridProps {
  days: CalendarDayType[];
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

export default function CalendarGrid({
  days,
  selectedDate,
  onSelectDate,
}: CalendarGridProps) {
  return (
    <div className="bg-white rounded-3xl p-4 md:p-6 shadow-soft border border-neutral-100">
      {/* Days of week header */}
      <div className="grid grid-cols-7 mb-4">
        {DAYS_ES.map((day) => (
          <div
            key={day}
            className="text-center text-xs md:text-sm font-bold text-primary-600 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-7 gap-1"
      >
        {days.map((day, index) => (
          <CalendarDay
            key={index}
            day={day}
            isSelected={selectedDate ? isSameDay(day.date, selectedDate) : false}
            onClick={() => onSelectDate(day.date)}
          />
        ))}
      </motion.div>
    </div>
  );
}
