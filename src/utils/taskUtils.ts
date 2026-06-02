import type { Task, Filter, SortBy, DateCategory, Status } from '../types';
import { getDateCategory } from './dateUtils';

const priorityOrder: Record<string, number> = {
  high: 1,
  medium: 2,
  low: 3,
};

export const filterTasks = (tasks: Task[], filter: Filter): Task[] => {
  return tasks.filter((task) => {
    if (filter.status !== 'all' && task.status !== filter.status) {
      return false;
    }

    if (filter.dateCategory !== 'all') {
      const taskCategory = getDateCategory(task.dueDate);
      if (taskCategory !== filter.dateCategory) {
        return false;
      }
    }

    return true;
  });
};

export const sortTasks = (tasks: Task[], sortBy: SortBy): Task[] => {
  const sortedTasks = [...tasks];

  sortedTasks.sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        return priorityOrder[a.priority] - priorityOrder[b.priority];

      case 'dueDate':
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();

      case 'createdAt':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

      default:
        return 0;
    }
  });

  return sortedTasks;
};

export const getTasksByDateCategory = (tasks: Task[]): Record<DateCategory, Task[]> => {
  const grouped: Record<DateCategory, Task[]> = {
    all: [],
    today: [],
    tomorrow: [],
    week: [],
    month: [],
    overdue: [],
    no_date: [],
  };

  tasks.forEach((task) => {
    const category = getDateCategory(task.dueDate);
    grouped[category].push(task);
  });

  return grouped;
};

export const getStatusCounts = (tasks: Task[]): Record<Status | 'all', number> => {
  const counts: Record<Status | 'all', number> = {
    all: tasks.length,
    pending: 0,
    in_progress: 0,
    completed: 0,
  };

  tasks.forEach((task) => {
    counts[task.status]++;
  });

  return counts;
};

export const getDateCategoryCounts = (tasks: Task[]): Record<DateCategory, number> => {
  const counts: Record<DateCategory, number> = {
    all: tasks.length,
    today: 0,
    tomorrow: 0,
    week: 0,
    month: 0,
    overdue: 0,
    no_date: 0,
  };

  tasks.forEach((task) => {
    const category = getDateCategory(task.dueDate);
    counts[category]++;
  });

  return counts;
};
