import { useState, useMemo } from 'react';
import type { ChurchEvent, CalendarDay } from '../types/events';
import { getEventsForYear } from '../data/events';
import { getCalendarDays } from '../utils/calendar';

export function useCalendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Get all events for the current year and adjacent years for navigation
  const events = useMemo<ChurchEvent[]>(() => {
    return [
      ...getEventsForYear(currentYear - 1),
      ...getEventsForYear(currentYear),
      ...getEventsForYear(currentYear + 1),
    ];
  }, [currentYear]);

  // Get calendar days for the current month
  const calendarDays = useMemo<CalendarDay[]>(() => {
    return getCalendarDays(currentYear, currentMonth, events);
  }, [currentYear, currentMonth, events]);

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDate(today);
  };

  const selectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const clearSelection = () => {
    setSelectedDate(null);
  };

  return {
    currentMonth,
    currentYear,
    selectedDate,
    calendarDays,
    events,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    selectDate,
    clearSelection,
  };
}
