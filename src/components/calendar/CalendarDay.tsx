import type { CalendarDay as CalendarDayType } from '../../types/events';
import { CATEGORY_INFO } from '../../data/events';

interface CalendarDayProps {
  day: CalendarDayType;
  isSelected: boolean;
  onClick: () => void;
}

export default function CalendarDay({
  day,
  isSelected,
  onClick,
}: CalendarDayProps) {
  const hasEvents = day.events.length > 0;
  const hasHighlighted = day.events.some((e) => e.isHighlighted);

  // Get unique categories for the day (max 3 dots)
  const uniqueCategories = [
    ...new Set(day.events.map((e) => e.category)),
  ].slice(0, 3);

  return (
    <button
      onClick={onClick}
      className={`
        relative aspect-square flex flex-col items-center justify-center rounded-xl
        text-sm font-medium cursor-pointer
        transition-colors duration-150
        md:hover:scale-105 md:active:scale-95 md:transition-transform md:duration-150
        ${!day.isCurrentMonth ? 'text-neutral-300' : 'text-neutral-700'}
        ${day.isToday && !isSelected ? 'bg-gold-100 text-gold-700 font-bold' : ''}
        ${isSelected ? 'bg-primary-600 text-white font-bold shadow-lg' : ''}
        ${!isSelected && !day.isToday && day.isCurrentMonth ? 'md:hover:bg-neutral-100' : ''}
        ${hasHighlighted && !isSelected ? 'ring-2 ring-gold-400' : ''}
      `}
    >
      <span>{day.date.getDate()}</span>
      {hasEvents && (
        <div className="flex gap-0.5 mt-1">
          {uniqueCategories.map((category) => (
            <span
              key={category}
              className={`w-1.5 h-1.5 rounded-full ${
                isSelected
                  ? 'bg-white/80'
                  : CATEGORY_INFO[category].bgColor.replace('bg-', 'bg-')
              }`}
              style={{
                backgroundColor: isSelected
                  ? undefined
                  : getCategoryDotColor(category),
              }}
            />
          ))}
        </div>
      )}
    </button>
  );
}

function getCategoryDotColor(category: string): string {
  const colors: Record<string, string> = {
    culto: '#0274c7',
    retiro: '#7c3aed',
    reunion: '#0891b2',
    jovenes: '#ea580c',
    ninos: '#db2777',
    oracion: '#4f46e5',
    especial: '#d97706',
    ayuno: '#0d9488',
  };
  return colors[category] || '#64748b';
}
