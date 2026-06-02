import { Plus, CheckCircle } from 'lucide-react';
import { memo } from 'react';

interface HeaderProps {
  onAddTask: () => void;
}

const Header = memo(({ onAddTask }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-md">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-text-primary">
                待办事项
              </h1>
              <p className="text-xs text-text-secondary">简约温馨的任务管理</p>
            </div>
          </div>

          <button
            onClick={onAddTask}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-opacity-90 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">添加任务</span>
          </button>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
