import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ChurchEvent } from '../../types/events';
import {
  MONTHS_ES,
  getUpcomingEvents,
  groupEventsByMonth,
} from '../../data/events';
import EventCard from './EventCard';

interface EventsListProps {
  events: ChurchEvent[];
  onEventClick: (event: ChurchEvent) => void;
}

const EVENTS_PER_PAGE = 15;

export default function EventsList({ events, onEventClick }: EventsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const today = useMemo(() => new Date(), []);

  const upcomingEvents = useMemo(() => {
    return getUpcomingEvents(today, events);
  }, [today, events]);

  // Pagination calculations
  const totalEvents = upcomingEvents.length;
  const totalPages = Math.ceil(totalEvents / EVENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
  const endIndex = startIndex + EVENTS_PER_PAGE;
  const paginatedEvents = upcomingEvents.slice(startIndex, endIndex);

  const groupedEvents = useMemo(() => {
    return groupEventsByMonth(paginatedEvents);
  }, [paginatedEvents]);

  const monthKeys = Object.keys(groupedEvents).sort();

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (totalEvents === 0) {
    return (
      <div className="text-center py-16">
        <CalendarDays size={48} className="mx-auto text-neutral-300 mb-4" />
        <p className="text-neutral-500">No hay eventos próximos</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Events grouped by month */}
      {monthKeys.map((monthKey, groupIndex) => {
        const [year, month] = monthKey.split('-').map(Number);
        const monthName = MONTHS_ES[month - 1];

        return (
          <motion.div
            key={monthKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIndex * 0.1, duration: 0.3 }}
          >
            <h3 className="text-lg font-bold text-primary-700 mb-4 flex items-center gap-2">
              {monthName} {year}
            </h3>
            <div className="space-y-3">
              {groupedEvents[monthKey].map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={() => onEventClick(event)}
                  showDate
                />
              ))}
            </div>
          </motion.div>
        );
      })}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6 border-t border-neutral-200">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-primary-100 flex items-center justify-center text-neutral-600 hover:text-primary-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-neutral-100 disabled:hover:text-neutral-600"
            aria-label="Página anterior"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show first, last, current, and adjacent pages
              const showPage =
                page === 1 ||
                page === totalPages ||
                Math.abs(page - currentPage) <= 1;

              // Show ellipsis
              const showEllipsisBefore =
                page === currentPage - 2 && currentPage > 3;
              const showEllipsisAfter =
                page === currentPage + 2 && currentPage < totalPages - 2;

              if (showEllipsisBefore || showEllipsisAfter) {
                return (
                  <span
                    key={`ellipsis-${page}`}
                    className="w-8 text-center text-neutral-400"
                  >
                    ...
                  </span>
                );
              }

              if (!showPage) return null;

              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`w-10 h-10 rounded-full text-sm font-semibold transition-colors ${
                    currentPage === page
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-primary-100 hover:text-primary-600'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-primary-100 flex items-center justify-center text-neutral-600 hover:text-primary-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-neutral-100 disabled:hover:text-neutral-600"
            aria-label="Página siguiente"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* Page info */}
      {totalPages > 1 && (
        <p className="text-center text-sm text-neutral-400">
          Mostrando {startIndex + 1}-{Math.min(endIndex, totalEvents)} de{' '}
          {totalEvents} eventos
        </p>
      )}
    </div>
  );
}
