import { memo } from 'react';
import {
  Edit2,
  Trash2,
  Flag,
  Calendar,
  Bell,
  CheckCircle2,
  PlayCircle,
  Circle,
} from 'lucide-react';
import type { Task } from '../types';
import { formatDateTime, getRelativeTime } from '../utils/dateUtils';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
  animationDelay?: number;
}

const priorityConfig = {
  high: {
    bg: 'bg-priority-high',
    text: 'text-priority-high',
    label: '高',
  },
  medium: {
    bg: 'bg-priority-medium',
    text: 'text-yellow-600',
    label: '中',
  },
  low: {
    bg: 'bg-priority-low',
    text: 'text-priority-low',
    label: '低',
  },
};

const statusConfig = {
  pending: {
    icon: <Circle className="w-5 h-5" />,
    text: 'text-status-pending',
    bg: 'bg-status-pending',
    label: '未开始',
  },
  in_progress: {
    icon: <PlayCircle className="w-5 h-5" />,
    text: 'text-status-progress',
    bg: 'bg-status-progress',
    label: '进行中',
  },
  completed: {
    icon: <CheckCircle2 className="w-5 h-5" />,
    text: 'text-status-completed',
    bg: 'bg-status-completed',
    label: '已完成',
  },
};

const TaskCard = memo(
  ({ task, onEdit, onDelete, onToggleStatus, animationDelay = 0 }: TaskCardProps) => {
    const priority = priorityConfig[task.priority];
    const status = statusConfig[task.status];

    return (
      <div
        className="task-card bg-surface rounded-xl shadow-md hover:shadow-hover transition-all duration-200 hover:-translate-y-1 overflow-hidden animate-scale-in group"
        style={{ animationDelay: `${animationDelay}ms` }}
      >
        <div className="flex">
          <div className={`priority-indicator ${priority.bg}`} />

          <div className="flex-1 p-4">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3
                className={`font-medium text-base flex-1 ${
                  task.status === 'completed'
                    ? 'line-through text-text-secondary'
                    : 'text-text-primary'
                }`}
              >
                {task.title}
              </h3>

              <button
                onClick={() => onToggleStatus(task.id)}
                className={`${status.text} hover:opacity-70 transition-opacity flex-shrink-0`}
                title={`点击切换状态: ${status.label}`}
              >
                {status.icon}
              </button>
            </div>

            {task.description && (
              <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                {task.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${priority.bg} text-white`}
              >
                <Flag className="w-3 h-3" />
                {priority.label}
              </span>

              {task.dueDate && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-gray-100 text-text-secondary">
                  <Calendar className="w-3 h-3" />
                  {formatDateTime(task.dueDate, task.dueTime)}
                  {getRelativeTime(task.dueDate) && (
                    <span className="ml-1 text-primary font-semibold">
                      ({getRelativeTime(task.dueDate)})
                    </span>
                  )}
                </span>
              )}

              {task.reminderTime && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-secondary bg-opacity-10 text-secondary">
                  <Bell className="w-3 h-3" />
                  已设置提醒
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}
              >
                {status.icon}
                {status.label}
              </span>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onEdit(task)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-text-secondary hover:text-primary transition-colors"
                  title="编辑"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-text-secondary hover:text-red-500 transition-colors"
                  title="删除"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

TaskCard.displayName = 'TaskCard';

export default TaskCard;
