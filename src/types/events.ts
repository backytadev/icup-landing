export type EventCategory =
  | 'culto'
  | 'retiro'
  | 'reunion'
  | 'jovenes'
  | 'ninos'
  | 'oracion'
  | 'especial'
  | 'ayuno';

export type RecurrenceType =
  | 'none'
  | 'weekly'
  | 'biweekly'
  | 'monthly'
  | 'yearly';

export interface ChurchEvent {
  id: string;
  title: string;
  description: string;
  date: string; // 'YYYY-MM-DD'
  startTime: string; // 'HH:MM'
  endTime: string; // 'HH:MM'
  category: EventCategory;
  location: string;
  recurrence: RecurrenceType;
  isHighlighted?: boolean;
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: ChurchEvent[];
}

export interface CategoryInfo {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  headerGradient: string;
}
