export type Priority = 'high' | 'medium' | 'low';
export type Status = 'pending' | 'in_progress' | 'completed';
export type Ringtone = 'warm' | 'fresh' | 'gentle';
export type DateCategory = 'all' | 'today' | 'tomorrow' | 'week' | 'month' | 'overdue' | 'no_date';
export type StatusFilter = 'all' | Status;
export type SortBy = 'priority' | 'dueDate' | 'createdAt';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  dueDate?: string;
  dueTime?: string;
  reminderTime?: string;
  ringtone: Ringtone;
  status: Status;
  createdAt: string;
  updatedAt: string;
  reminded: boolean;
}

export interface Filter {
  status: StatusFilter;
  dateCategory: DateCategory;
}

export interface TaskStore {
  tasks: Task[];
  filter: Filter;
  sortBy: SortBy;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'reminded'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleStatus: (id: string) => void;
  setFilter: (filter: Partial<Filter>) => void;
  setSortBy: (sortBy: SortBy) => void;
  markAsReminded: (id: string) => void;
}
