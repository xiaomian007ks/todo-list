import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Task, Filter, SortBy, TaskStore } from '../types';

const generateId = () => crypto.randomUUID();

const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      filter: {
        status: 'all',
        dateCategory: 'all',
      },
      sortBy: 'priority',

      addTask: (taskData) => {
        const now = new Date().toISOString();
        const newTask: Task = {
          ...taskData,
          id: generateId(),
          createdAt: now,
          updatedAt: now,
          reminded: false,
        };

        set((state) => ({
          tasks: [...state.tasks, newTask],
        }));
      },

      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, ...updates, updatedAt: new Date().toISOString() }
              : task
          ),
        }));
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },

      toggleStatus: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) => {
            if (task.id !== id) return task;

            const statusCycle: Record<string, string> = {
              pending: 'in_progress',
              in_progress: 'completed',
              completed: 'pending',
            };

            return {
              ...task,
              status: statusCycle[task.status] as Task['status'],
              updatedAt: new Date().toISOString(),
            };
          }),
        }));
      },

      setFilter: (newFilter) => {
        set((state) => ({
          filter: { ...state.filter, ...newFilter },
        }));
      },

      setSortBy: (newSortBy) => {
        set({ sortBy: newSortBy });
      },

      markAsReminded: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, reminded: true } : task
          ),
        }));
      },
    }),
    {
      name: 'todo-app-tasks',
    }
  )
);

export default useTaskStore;
