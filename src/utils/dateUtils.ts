import type { DateCategory } from '../types';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}月${day}日`;
};

export const formatDateTime = (dateString: string, timeString?: string): string => {
  const date = formatDate(dateString);
  if (timeString) {
    return `${date} ${timeString}`;
  }
  return date;
};

export const isToday = (dateString: string): boolean => {
  const date = new Date(dateString);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const isTomorrow = (dateString: string): boolean => {
  const date = new Date(dateString);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  );
};

export const isThisWeek = (dateString: string): boolean => {
  const date = new Date(dateString);
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  return date >= startOfWeek && date <= endOfWeek;
};

export const isThisMonth = (dateString: string): boolean => {
  const date = new Date(dateString);
  const today = new Date();
  return (
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const isOverdue = (dateString: string): boolean => {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

export const getDateCategory = (dateString?: string): DateCategory => {
  if (!dateString) return 'no_date';

  if (isToday(dateString)) return 'today';
  if (isTomorrow(dateString)) return 'tomorrow';
  if (isThisWeek(dateString)) return 'week';
  if (isThisMonth(dateString)) return 'month';
  if (isOverdue(dateString)) return 'overdue';

  return 'month';
};

export const getRelativeTime = (dateString: string): string => {
  const category = getDateCategory(dateString);
  const categoryMap: Record<DateCategory, string> = {
    all: '',
    today: '今天',
    tomorrow: '明天',
    week: '本周',
    month: '本月',
    overdue: '已过期',
    no_date: '',
  };
  return categoryMap[category];
};

export const getTodayDateString = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

export const getTomorrowDateString = (): string => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
};
