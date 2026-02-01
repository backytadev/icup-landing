import { useState, useMemo } from 'react';
import { CalendarDays } from 'lucide-react';
import { useCalendar } from '../../hooks/useCalendar';
import { getEventsForDate, formatDate } from '../../data/events';
import type { ChurchEvent } from '../../types/events';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import EventCard from './EventCard';
import EventModal from './EventModal';

export default function Calendar() {
  const {
    currentMonth,
    currentYear,
    selectedDate,
    calendarDays,
    events,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    selectDate,
  } = useCalendar();

  const [selectedEvent, setSelectedEvent] = useState<ChurchEvent | null>(null);

  const selectedDateEvents = useMemo(() => {
    if (!selectedDate) return [];
    return getEventsForDate(selectedDate, events);
  }, [selectedDate, events]);

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <div className="lg:col-span-2">
        <CalendarHeader
          month={currentMonth}
          year={currentYear}
          onPrevMonth={goToPreviousMonth}
          onNextMonth={goToNextMonth}
          onToday={goToToday}
        />
        <CalendarGrid
          days={calendarDays}
          selectedDate={selectedDate}
          onSelectDate={selectDate}
        />
      </div>

      {/* Selected Day Events Panel */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-3xl p-6 shadow-soft border border-neutral-100 sticky top-28">
          {selectedDate ? (
            <div key={selectedDate.toISOString()}>
              <h3 className="font-bold text-lg text-primary-700 mb-4">
                {formatDate(selectedDate.toISOString().split('T')[0])}
              </h3>
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
                  {selectedDateEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onClick={() => setSelectedEvent(event)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CalendarDays
                    size={40}
                    className="mx-auto text-neutral-300 mb-3"
                  />
                  <p className="text-neutral-500 text-sm">
                    No hay eventos este día
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <CalendarDays
                size={48}
                className="mx-auto text-neutral-300 mb-4"
              />
              <p className="text-neutral-500">
                Selecciona un día para ver sus eventos
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Event Modal */}
      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
}
