import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Filter,
  Clock,
  ListFilter,
} from 'lucide-react';
import type { ChurchEvent, EventCategory } from '../../types/events';
import {
  MONTHS_ES,
  getUpcomingEvents,
  groupEventsByMonth,
  CATEGORY_INFO,
} from '../../data/events';
import EventCard from './EventCard';

interface EventsListProps {
  events: ChurchEvent[];
  onEventClick: (event: ChurchEvent) => void;
}

const EVENTS_PER_PAGE = 15;

export default function EventsList({ events, onEventClick }: EventsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [timeFilter, setTimeFilter] = useState<'all' | 'week' | 'month'>('all');
  const [categoryFilter, setCategoryFilter] = useState<EventCategory | 'all'>(
    'all',
  );
  const [sortBy, setSortBy] = useState<'closest' | 'alpha'>('closest');

  const today = useMemo(() => new Date(), []);

  const upcomingEvents = useMemo(() => {
    let filtered = getUpcomingEvents(today, events);

    // Apply Time Filter
    if (timeFilter !== 'all') {
      const limitDate = new Date(today);
      if (timeFilter === 'week') {
        limitDate.setDate(today.getDate() + 7);
      } else if (timeFilter === 'month') {
        limitDate.setMonth(today.getMonth() + 1);
      }

      const limitStr = limitDate.toISOString().split('T')[0];
      filtered = filtered.filter((event) => event.date <= limitStr);
    }

    // Apply Category Filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter((event) => event.category === categoryFilter);
    }

    // Apply Sort
    if (sortBy === 'alpha') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // Default: Date closest (already mostly pre-sorted by getUpcomingEvents, but ensuring here)
      filtered.sort((a, b) => {
        const dateCompare = a.date.localeCompare(b.date);
        if (dateCompare !== 0) return dateCompare;
        return a.startTime.localeCompare(b.startTime);
      });
    }

    return filtered;
  }, [today, events, timeFilter, categoryFilter, sortBy]);

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

  if (totalEvents === 0 && (timeFilter !== 'all' || categoryFilter !== 'all')) {
    return (
      <div className="space-y-8">
        {renderFilters()}
        <div className="text-center py-16 bg-neutral-50 rounded-3xl border-2 border-dashed border-neutral-200">
          <Filter size={48} className="mx-auto text-neutral-300 mb-4" />
          <p className="text-neutral-500 font-medium">
            No se encontraron eventos con los filtros seleccionados
          </p>
          <button
            onClick={() => {
              setTimeFilter('all');
              setCategoryFilter('all');
            }}
            className="mt-4 text-primary-600 font-bold hover:underline"
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    );
  }

  if (totalEvents === 0) {
    return (
      <div className="text-center py-16">
        <CalendarDays size={48} className="mx-auto text-neutral-300 mb-4" />
        <p className="text-neutral-500">No hay eventos próximos</p>
      </div>
    );
  }

  function renderFilters() {
    return (
      <div className="flex flex-col gap-6 mb-8">
        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Timeframe Filter */}
          <div className="bg-white p-1 rounded-2xl shadow-sm border border-neutral-100 flex gap-1">
            {[
              { id: 'all', label: 'Todos', icon: CalendarDays },
              { id: 'week', label: 'Semana', icon: Clock },
              { id: 'month', label: 'Mes', icon: Filter },
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  setTimeFilter(option.id as 'all' | 'week' | 'month');
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  timeFilter === option.id
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-neutral-500 hover:bg-neutral-50'
                }`}
              >
                <option.icon size={14} />
                <span className="whitespace-nowrap">{option.label}</span>
              </button>
            ))}
          </div>

          {/* Sort Filter */}
          <div className="bg-white p-1 rounded-2xl shadow-sm border border-neutral-100 flex gap-1">
            <button
              onClick={() => setSortBy('closest')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                sortBy === 'closest'
                  ? 'bg-neutral-800 text-white shadow-md'
                  : 'text-neutral-500 hover:bg-neutral-50'
              }`}
            >
              Cercanos
            </button>
            <button
              onClick={() => setSortBy('alpha')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                sortBy === 'alpha'
                  ? 'bg-neutral-800 text-white shadow-md'
                  : 'text-neutral-500 hover:bg-neutral-50'
              }`}
            >
              A-Z
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-neutral-400">
            <ListFilter size={14} />
            <span className="text-[10px] uppercase font-black tracking-widest">
              Filtrar por tipo
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setCategoryFilter('all');
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                categoryFilter === 'all'
                  ? 'bg-neutral-800 text-white border-neutral-800 shadow-md'
                  : 'bg-white text-neutral-500 border-neutral-100 hover:border-neutral-200'
              }`}
            >
              Cualquiera
            </button>
            {(Object.keys(CATEGORY_INFO) as EventCategory[]).map((catKey) => {
              const info = CATEGORY_INFO[catKey];
              const isActive = categoryFilter === catKey;
              return (
                <button
                  key={catKey}
                  onClick={() => {
                    setCategoryFilter(catKey);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
                    isActive
                      ? `${info.bgColor.replace('bg-', 'bg-')} ${info.color} ${info.borderColor} shadow-sm`
                      : 'bg-white text-neutral-500 border-neutral-100 hover:border-neutral-200'
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${isActive ? 'bg-current' : info.bgColor.replace('bg-', 'bg-')}`}
                  />
                  {info.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {renderFilters()}

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
            <div className="space-y-3 overflow-x-hidden pt-2 px-1 -mx-1">
              {groupedEvents[monthKey].map((event) => (
                <div key={event.id} className="pb-1">
                  <EventCard
                    event={event}
                    onClick={() => onEventClick(event)}
                    showDate
                  />
                </div>
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
