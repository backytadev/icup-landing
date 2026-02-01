import type { ChurchEvent, CategoryInfo, EventCategory } from '../types/events';

export const MONTHS_ES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

export const DAYS_ES = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

export const DAYS_FULL_ES = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

export const CATEGORY_INFO: Record<EventCategory, CategoryInfo> = {
  culto: {
    label: 'Culto',
    color: 'text-primary-700',
    bgColor: 'bg-primary-100',
    borderColor: 'border-primary-300',
  },
  retiro: {
    label: 'Retiro',
    color: 'text-purple-700',
    bgColor: 'bg-purple-100',
    borderColor: 'border-purple-300',
  },
  reunion: {
    label: 'Reunión',
    color: 'text-cyan-700',
    bgColor: 'bg-cyan-100',
    borderColor: 'border-cyan-300',
  },
  jovenes: {
    label: 'Jóvenes',
    color: 'text-orange-700',
    bgColor: 'bg-orange-100',
    borderColor: 'border-orange-300',
  },
  ninos: {
    label: 'Niños',
    color: 'text-pink-700',
    bgColor: 'bg-pink-100',
    borderColor: 'border-pink-300',
  },
  oracion: {
    label: 'Oración',
    color: 'text-indigo-700',
    bgColor: 'bg-indigo-100',
    borderColor: 'border-indigo-300',
  },
  especial: {
    label: 'Especial',
    color: 'text-gold-700',
    bgColor: 'bg-gold-100',
    borderColor: 'border-gold-300',
  },
  ayuno: {
    label: 'Ayuno',
    color: 'text-teal-700',
    bgColor: 'bg-teal-100',
    borderColor: 'border-teal-300',
  },
};

// Generate recurring events for a given year
function generateRecurringEvents(year: number): ChurchEvent[] {
  const events: ChurchEvent[] = [];

  // Helper to get all dates for a specific day of week in the year
  const getDatesForDayOfWeek = (dayOfWeek: number): Date[] => {
    const dates: Date[] = [];
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    // Find first occurrence
    const current = new Date(startDate);
    while (current.getDay() !== dayOfWeek) {
      current.setDate(current.getDate() + 1);
    }

    // Collect all occurrences
    while (current <= endDate) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 7);
    }

    return dates;
  };

  // Sunday Services - Morning
  getDatesForDayOfWeek(0).forEach((date, index) => {
    events.push({
      id: `culto-dom-am-${year}-${index}`,
      title: 'Culto Dominical (Mañana)',
      description:
        'Nuestra fiesta principal de alabanza y palabra. Un tiempo de oración intercesora, adoración, alabanza, y una enseñanza bíblica profunda aplicada a la vida diaria.',
      date: date.toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '11:00',
      category: 'culto',
      location: 'Templo Principal - Av. Valle Sagrado de los Incas 167',
      recurrence: 'weekly',
    });
  });

  // Sunday Services - Afternoon
  getDatesForDayOfWeek(0).forEach((date, index) => {
    events.push({
      id: `culto-dom-pm-${year}-${index}`,
      title: 'Culto Dominical (Tarde)',
      description:
        'Continuamos celebrando en la presencia de Dios. Alabanza, adoración y enseñanza bíblica para toda la familia.',
      date: date.toISOString().split('T')[0],
      startTime: '16:00',
      endTime: '18:00',
      category: 'culto',
      location: 'Templo Principal - Av. Valle Sagrado de los Incas 167',
      recurrence: 'weekly',
    });
  });

  // Tuesday - Family Groups
  getDatesForDayOfWeek(2).forEach((date, index) => {
    events.push({
      id: `gf-mar-${year}-${index}`,
      title: 'Grupos Familiares',
      description:
        'Células de crecimiento espiritual donde compartimos la palabra de forma cercana, oramos unos por otros y fortalecemos los lazos fraternales.',
      date: date.toISOString().split('T')[0],
      startTime: '17:00',
      endTime: '19:30',
      category: 'reunion',
      location: 'Diversos hogares (consultar ubicación)',
      recurrence: 'weekly',
    });
  });

  // Thursday - Family Groups
  getDatesForDayOfWeek(4).forEach((date, index) => {
    events.push({
      id: `gf-jue-${year}-${index}`,
      title: 'Grupos Familiares',
      description:
        'Células de crecimiento espiritual donde compartimos la palabra de forma cercana, oramos unos por otros y fortalecemos los lazos fraternales.',
      date: date.toISOString().split('T')[0],
      startTime: '17:00',
      endTime: '19:30',
      category: 'reunion',
      location: 'Diversos hogares (consultar ubicación)',
      recurrence: 'weekly',
    });
  });

  // Saturday - Fasting Service
  getDatesForDayOfWeek(6).forEach((date, index) => {
    events.push({
      id: `ayuno-sab-${year}-${index}`,
      title: 'Culto de Ayuno',
      description:
        'Un tiempo profundo de búsqueda y oración. Dedicamos este tiempo para humillarnos ante Dios, buscar Su dirección y ser fortalecidos en fe.',
      date: date.toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '15:00',
      category: 'ayuno',
      location: 'Templo Principal - Av. Valle Sagrado de los Incas 167',
      recurrence: 'weekly',
    });
  });

  // Saturday - Youth Service
  getDatesForDayOfWeek(6).forEach((date, index) => {
    events.push({
      id: `jovenes-sab-${year}-${index}`,
      title: 'Culto de Jóvenes',
      description:
        'Un espacio dinámico diseñado para jóvenes, con alabanza moderna, dinámicas grupales y mensajes relevantes que abordan los desafíos de la juventud desde una perspectiva bíblica.',
      date: date.toISOString().split('T')[0],
      startTime: '18:00',
      endTime: '20:00',
      category: 'jovenes',
      location: 'Templo Principal - Av. Valle Sagrado de los Incas 167',
      recurrence: 'weekly',
    });
  });

  return events;
}

// Generate special events
function generateSpecialEvents(year: number): ChurchEvent[] {
  return [
    // Church Anniversary - September 23
    {
      id: `aniversario-${year}`,
      title: 'Aniversario de la Iglesia',
      description:
        'Celebración especial por un año más de la obra de Dios en nuestra comunidad. Culto de acción de gracias, testimonios y convivencia fraterna.',
      date: `${year}-09-23`,
      startTime: '09:00',
      endTime: '18:00',
      category: 'especial',
      location: 'Templo Principal - Av. Valle Sagrado de los Incas 167',
      recurrence: 'yearly',
      isHighlighted: true,
    },
    // Monthly Prayer Night - First Friday of each month
    ...Array.from({ length: 12 }, (_, month) => {
      const date = new Date(year, month, 1);
      // Find first Friday
      while (date.getDay() !== 5) {
        date.setDate(date.getDate() + 1);
      }
      return {
        id: `noche-oracion-${year}-${month}`,
        title: 'Noche de Oración',
        description:
          'Una noche especial dedicada a la oración intercesora por las familias, la ciudad y la nación. Tiempo de adoración profunda y búsqueda de la presencia de Dios.',
        date: date.toISOString().split('T')[0],
        startTime: '19:00',
        endTime: '22:00',
        category: 'oracion' as const,
        location: 'Templo Principal - Av. Valle Sagrado de los Incas 167',
        recurrence: 'monthly' as const,
      };
    }),
    // Marriage Retreat - May
    {
      id: `retiro-matrimonios-${year}`,
      title: 'Retiro de Matrimonios',
      description:
        'Un fin de semana especial para fortalecer los matrimonios. Talleres, consejería y tiempo de calidad para las parejas de nuestra iglesia.',
      date: `${year}-05-10`,
      startTime: '08:00',
      endTime: '18:00',
      category: 'retiro',
      location: 'Por confirmar',
      recurrence: 'none',
      isHighlighted: true,
    },
    // Children's Day - Third Sunday of August
    {
      id: `dia-ninos-${year}`,
      title: 'Día Especial de Niños',
      description:
        'Celebración especial para los más pequeños. Juegos, premios, alabanza infantil y enseñanza bíblica adaptada para niños.',
      date: `${year}-08-17`,
      startTime: '09:00',
      endTime: '13:00',
      category: 'ninos',
      location: 'Templo Principal - Av. Valle Sagrado de los Incas 167',
      recurrence: 'yearly',
      isHighlighted: true,
    },
    // Christmas Eve Service
    {
      id: `navidad-${year}`,
      title: 'Culto de Navidad',
      description:
        'Celebración especial de Nochebuena. Programa especial con presentaciones musicales, dramatización del nacimiento y mensaje de esperanza.',
      date: `${year}-12-24`,
      startTime: '20:00',
      endTime: '23:00',
      category: 'especial',
      location: 'Templo Principal - Av. Valle Sagrado de los Incas 167',
      recurrence: 'yearly',
      isHighlighted: true,
    },
    // New Year's Eve Service
    {
      id: `ano-nuevo-${year}`,
      title: 'Culto de Año Nuevo',
      description:
        'Despedimos el año en la presencia de Dios. Oración de acción de gracias y consagración para el nuevo año.',
      date: `${year}-12-31`,
      startTime: '21:00',
      endTime: '00:30',
      category: 'especial',
      location: 'Templo Principal - Av. Valle Sagrado de los Incas 167',
      recurrence: 'yearly',
      isHighlighted: true,
    },
  ];
}

// Get all events for a given year
export function getEventsForYear(year: number): ChurchEvent[] {
  return [...generateRecurringEvents(year), ...generateSpecialEvents(year)];
}

// Get events for a specific date
export function getEventsForDate(
  date: Date,
  events: ChurchEvent[]
): ChurchEvent[] {
  const dateString = date.toISOString().split('T')[0];
  return events
    .filter((event) => event.date === dateString)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
}

// Get upcoming events from a given date
export function getUpcomingEvents(
  fromDate: Date,
  events: ChurchEvent[],
  limit?: number
): ChurchEvent[] {
  const fromDateString = fromDate.toISOString().split('T')[0];
  const upcoming = events
    .filter((event) => event.date >= fromDateString)
    .sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      if (dateCompare !== 0) return dateCompare;
      return a.startTime.localeCompare(b.startTime);
    });

  return limit ? upcoming.slice(0, limit) : upcoming;
}

// Group events by month
export function groupEventsByMonth(
  events: ChurchEvent[]
): Record<string, ChurchEvent[]> {
  return events.reduce(
    (acc, event) => {
      const monthKey = event.date.substring(0, 7); // 'YYYY-MM'
      if (!acc[monthKey]) {
        acc[monthKey] = [];
      }
      acc[monthKey].push(event);
      return acc;
    },
    {} as Record<string, ChurchEvent[]>
  );
}

// Format time for display
export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00');
  const day = date.getDate();
  const month = MONTHS_ES[date.getMonth()];
  const dayName = DAYS_FULL_ES[date.getDay()];
  return `${dayName}, ${day} de ${month}`;
}
