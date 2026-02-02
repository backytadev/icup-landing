import { Clock, MapPin, Star } from 'lucide-react';
import type { ChurchEvent } from '../../types/events';
import { CATEGORY_INFO, formatTime } from '../../data/events';

interface EventCardProps {
  event: ChurchEvent;
  onClick: () => void;
  showDate?: boolean;
}

export default function EventCard({
  event,
  onClick,
  showDate = false,
}: EventCardProps) {
  const category = CATEGORY_INFO[event.category];

  return (
    <button
      onClick={onClick}
      className={`
        w-full max-w-full text-left p-4 rounded-2xl border-l-4 bg-white shadow-soft
        cursor-pointer transition-shadow duration-150 overflow-hidden
        md:hover:shadow-medium md:hover:-translate-y-0.5 md:active:translate-y-0
        md:transition-all md:duration-150
        ${category.borderColor}
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`
                inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold
                ${category.bgColor} ${category.color}
              `}
            >
              {category.label}
            </span>
            {event.isHighlighted && (
              <Star size={14} className="text-gold-500 fill-gold-500" />
            )}
          </div>
          <h4
            className="font-bold text-base md:text-lg mb-1 truncate"
            style={{
              color: `var(--color-${category.color.replace('text-', '')})`,
            }}
          >
            {event.title}
          </h4>
          <p className="text-xs md:text-sm text-neutral-500 line-clamp-2">
            {event.description}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-neutral-400">
        <div className="flex items-center gap-1">
          <Clock size={12} />
          <span>
            {formatTime(event.startTime)} - {formatTime(event.endTime)}
          </span>
        </div>
        <div className="flex items-center gap-1 min-w-0">
          <MapPin size={12} className="flex-shrink-0" />
          <span className="truncate">{event.location}</span>
        </div>
      </div>

      {showDate && (
        <div className="mt-2 text-xs text-primary-600 font-medium">
          {new Date(event.date + 'T00:00:00').toLocaleDateString('es-PE', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })}
        </div>
      )}
    </button>
  );
}
