import { memo } from 'react';
import { Inbox, Search } from 'lucide-react';
import useTaskStore from '../store/taskStore';
import TaskCard from './TaskCard';
import type { Task } from '../types';

interface TaskListProps {
  onEditTask: (task: Task) => void;
}

const TaskList = memo(({ onEditTask }: TaskListProps) => {
  const tasks = useTaskStore((state) => state.tasks);
  const filter = useTaskStore((state) => state.filter);
  const sortBy = useTaskStore((state) => state.sortBy);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const toggleStatus = useTaskStore((state) => state.toggleStatus);

  const filteredTasks = tasks.filter((task) => {
    if (filter.status !== 'all' && task.status !== filter.status) {
      return false;
    }
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'priority': {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
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

  if (tasks.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
        <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-6 shadow-lg">
          <Inbox className="w-16 h-16 text-white" />
        </div>
        <h2 className="font-display text-2xl font-bold text-text-primary mb-2">
          还没有任何任务
        </h2>
        <p className="text-text-secondary mb-6 max-w-md">
          点击右上角的"添加任务"按钮,创建你的第一个待办事项吧!
        </p>
      </div>
    );
  }

  if (sortedTasks.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
        <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-6">
          <Search className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="font-display text-xl font-bold text-text-primary mb-2">
          没有找到符合条件的任务
        </h2>
        <p className="text-text-secondary">尝试调整筛选条件查看更多任务</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin p-6">
      <div className="max-w-4xl mx-auto space-y-4">
        {sortedTasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEditTask}
            onDelete={deleteTask}
            onToggleStatus={toggleStatus}
            animationDelay={index * 50}
          />
        ))}
      </div>
    </div>
  );
});

TaskList.displayName = 'TaskList';

export default TaskList;
