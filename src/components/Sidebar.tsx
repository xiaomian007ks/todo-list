import { memo } from 'react';
import {
  ListTodo,
  Clock,
  Calendar,
  CheckCircle2,
  Circle,
  PlayCircle,
  SortAsc,
  CalendarDays,
  AlertCircle,
  CalendarRange,
} from 'lucide-react';
import useTaskStore from '../store/taskStore';
import { getStatusCounts, getDateCategoryCounts } from '../utils/taskUtils';
import type { StatusFilter, DateCategory, SortBy } from '../types';

interface SidebarProps {
  isOpen: boolean;
}

const statusFilters: { value: StatusFilter; label: string; icon: React.ReactNode }[] = [
  { value: 'all', label: '全部', icon: <ListTodo className="w-4 h-4" /> },
  { value: 'pending', label: '未完成', icon: <Circle className="w-4 h-4" /> },
  { value: 'in_progress', label: '进行中', icon: <PlayCircle className="w-4 h-4" /> },
  { value: 'completed', label: '已完成', icon: <CheckCircle2 className="w-4 h-4" /> },
];

const dateCategories: { value: DateCategory; label: string; icon: React.ReactNode }[] = [
  { value: 'today', label: '今天', icon: <CalendarDays className="w-4 h-4" /> },
  { value: 'tomorrow', label: '明天', icon: <Clock className="w-4 h-4" /> },
  { value: 'week', label: '本周', icon: <Calendar className="w-4 h-4" /> },
  { value: 'month', label: '本月', icon: <CalendarRange className="w-4 h-4" /> },
  { value: 'overdue', label: '已过期', icon: <AlertCircle className="w-4 h-4" /> },
  { value: 'no_date', label: '无日期', icon: <Circle className="w-4 h-4" /> },
];

const sortOptions: { value: SortBy; label: string }[] = [
  { value: 'priority', label: '按优先级' },
  { value: 'dueDate', label: '按日期' },
  { value: 'createdAt', label: '按创建时间' },
];

const Sidebar = memo(({ isOpen }: SidebarProps) => {
  const tasks = useTaskStore((state) => state.tasks);
  const filter = useTaskStore((state) => state.filter);
  const sortBy = useTaskStore((state) => state.sortBy);
  const setFilter = useTaskStore((state) => state.setFilter);
  const setSortBy = useTaskStore((state) => state.setSortBy);

  const statusCounts = getStatusCounts(tasks);
  const dateCounts = getDateCategoryCounts(tasks);

  if (!isOpen) return null;

  return (
    <aside className="w-72 bg-white border-r border-gray-200 h-full overflow-y-auto scrollbar-thin">
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3 flex items-center gap-2">
            <SortAsc className="w-3 h-3" />
            排序方式
          </h3>
          <div className="space-y-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  sortBy === option.value
                    ? 'bg-primary text-white font-medium'
                    : 'text-text-secondary hover:bg-gray-100'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3 flex items-center gap-2">
            <ListTodo className="w-3 h-3" />
            状态筛选
          </h3>
          <div className="space-y-1">
            {statusFilters.map((filterOption) => (
              <button
                key={filterOption.value}
                onClick={() => setFilter({ status: filterOption.value })}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                  filter.status === filterOption.value
                    ? 'bg-primary text-white font-medium'
                    : 'text-text-secondary hover:bg-gray-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  {filterOption.icon}
                  {filterOption.label}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    filter.status === filterOption.value
                      ? 'bg-white bg-opacity-20'
                      : 'bg-gray-100'
                  }`}
                >
                  {statusCounts[filterOption.value]}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3 flex items-center gap-2">
            <Calendar className="w-3 h-3" />
            日期分类
          </h3>
          <div className="space-y-1">
            {dateCategories.map((category) => (
              <button
                key={category.value}
                onClick={() => setFilter({ dateCategory: category.value })}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                  filter.dateCategory === category.value
                    ? 'bg-secondary text-white font-medium'
                    : 'text-text-secondary hover:bg-gray-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  {category.icon}
                  {category.label}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    filter.dateCategory === category.value
                      ? 'bg-white bg-opacity-20'
                      : 'bg-gray-100'
                  }`}
                >
                  {dateCounts[category.value]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
