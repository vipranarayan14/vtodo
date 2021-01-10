import { parseISO, formatRelative } from 'date-fns';
import enGB from 'date-fns/locale/en-GB';

const formatRelativeLocale: { [key: string]: string } = {
  lastWeek: "'Last' eeee",
  yesterday: "'Yesterday'",
  today: "'Today'",
  tomorrow: "'Tomorrow'",
  nextWeek: "'Next' eeee",
  other: 'PPPP',
};

const locale = {
  ...enGB,
  formatRelative: (token: string) => formatRelativeLocale[token],
};

export const getRelativeDate = (date: string) =>
  formatRelative(parseISO(date), new Date(), { locale });
