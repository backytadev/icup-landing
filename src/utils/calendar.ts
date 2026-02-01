import type { CalendarDay, ChurchEvent } from '../types/events';
import { getEventsForDate } from '../data/events';

export function getCalendarDays(
  year: number,
  month: number,
  events: ChurchEvent[]
): CalendarDay[] {
  const days: CalendarDay[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // First day of the month
  const firstDay = new Date(year, month, 1);
  // Last day of the month
  const lastDay = new Date(year, month + 1, 0);

  // Start from the Sunday of the week containing the first day
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  // End at the Saturday of the week containing the last day
  const endDate = new Date(lastDay);
  const daysToAdd = 6 - endDate.getDay();
  endDate.setDate(endDate.getDate() + daysToAdd);

  // Generate all days
  const current = new Date(startDate);
  while (current <= endDate) {
    const date = new Date(current);
    date.setHours(0, 0, 0, 0);

    days.push({
      date,
      isCurrentMonth: current.getMonth() === month,
      isToday: current.getTime() === today.getTime(),
      events: getEventsForDate(date, events),
    });

    current.setDate(current.getDate() + 1);
  }

  return days;
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function getMonthYear(date: Date): { month: number; year: number } {
  return {
    month: date.getMonth(),
    year: date.getFullYear(),
  };
}
