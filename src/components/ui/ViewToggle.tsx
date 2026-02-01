import { motion } from 'framer-motion';
import { Calendar, List } from 'lucide-react';

interface ViewToggleProps {
  view: 'calendar' | 'list';
  onViewChange: (view: 'calendar' | 'list') => void;
}

export default function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="inline-flex bg-neutral-100 rounded-full p-1">
      <motion.button
        onClick={() => onViewChange('calendar')}
        className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
          view === 'calendar' ? 'text-white' : 'text-neutral-600'
        }`}
        whileTap={{ scale: 0.95 }}
      >
        {view === 'calendar' && (
          <motion.div
            layoutId="viewToggle"
            className="absolute inset-0 bg-primary-600 rounded-full"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
        <Calendar size={18} className="relative z-10" />
        <span className="relative z-10 hidden sm:inline">Calendario</span>
      </motion.button>
      <motion.button
        onClick={() => onViewChange('list')}
        className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
          view === 'list' ? 'text-white' : 'text-neutral-600'
        }`}
        whileTap={{ scale: 0.95 }}
      >
        {view === 'list' && (
          <motion.div
            layoutId="viewToggle"
            className="absolute inset-0 bg-primary-600 rounded-full"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
        <List size={18} className="relative z-10" />
        <span className="relative z-10 hidden sm:inline">Lista</span>
      </motion.button>
    </div>
  );
}
