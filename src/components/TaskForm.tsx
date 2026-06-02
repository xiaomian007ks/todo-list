import { useState, useEffect } from 'react';
import { X, Flag, Calendar, Clock, Bell, Music, Save } from 'lucide-react';
import type { Task, Priority, Ringtone } from '../types';
import { getTodayDateString, getTomorrowDateString } from '../utils/dateUtils';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'reminded'>) => void;
  editingTask?: Task | null;
}

const priorities: { value: Priority; label: string; color: string }[] = [
  { value: 'high', label: '高', color: 'bg-priority-high' },
  { value: 'medium', label: '中', color: 'bg-priority-medium' },
  { value: 'low', label: '低', color: 'bg-priority-low' },
];

const ringtones: { value: Ringtone; label: string; description: string }[] = [
  { value: 'warm', label: '温暖铃声', description: '柔和温暖的提示音' },
  { value: 'fresh', label: '清新铃声', description: '清脆悦耳的铃声' },
  { value: 'gentle', label: '轻柔铃声', description: '轻柔细腻的提醒音' },
];

const TaskForm = ({ isOpen, onClose, onSubmit, editingTask }: TaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [hasReminder, setHasReminder] = useState(false);
  const [reminderTime, setReminderTime] = useState('');
  const [ringtone, setRingtone] = useState<Ringtone>('warm');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || '');
      setPriority(editingTask.priority);
      setDueDate(editingTask.dueDate || '');
      setDueTime(editingTask.dueTime || '');
      setHasReminder(!!editingTask.reminderTime);
      setReminderTime(editingTask.reminderTime || '');
      setRingtone(editingTask.ringtone);
    } else {
      resetForm();
    }
  }, [editingTask, isOpen]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setDueTime('');
    setHasReminder(false);
    setReminderTime('');
    setRingtone('warm');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('请输入任务标题');
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      dueDate: dueDate || undefined,
      dueTime: dueTime || undefined,
      reminderTime: hasReminder && reminderTime ? reminderTime : undefined,
      ringtone,
      status: editingTask?.status || ('pending' as const),
    };

    onSubmit(taskData);
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="font-display text-xl font-bold text-text-primary">
            {editingTask ? '编辑任务' : '添加新任务'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 text-text-secondary hover:text-text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              任务标题 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="输入任务标题..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              任务描述
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="添加任务描述(可选)..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2 flex items-center gap-2">
              <Flag className="w-4 h-4 text-primary" />
              优先级
            </label>
            <div className="grid grid-cols-3 gap-3">
              {priorities.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPriority(p.value)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    priority === p.value
                      ? `${p.color} text-white shadow-md`
                      : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              截止日期
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  min={getTodayDateString()}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                />
              </div>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
                <input
                  type="time"
                  value={dueTime}
                  onChange={(e) => setDueTime(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2 flex items-center gap-2">
              <Bell className="w-4 h-4 text-primary" />
              提醒设置
            </label>
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasReminder}
                  onChange={(e) => setHasReminder(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-text-secondary">启用提醒</span>
              </label>

              {hasReminder && (
                <input
                  type="datetime-local"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  min={getTodayDateString()}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                />
              )}
            </div>
          </div>

          {hasReminder && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2 flex items-center gap-2">
                <Music className="w-4 h-4 text-primary" />
                选择铃声
              </label>
              <div className="grid grid-cols-1 gap-2">
                {ringtones.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRingtone(r.value)}
                    className={`px-4 py-3 rounded-xl text-left transition-all ${
                      ringtone === r.value
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                    }`}
                  >
                    <div className="font-medium">{r.label}</div>
                    <div
                      className={`text-sm ${
                        ringtone === r.value ? 'text-white text-opacity-80' : ''
                      }`}
                    >
                      {r.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl font-medium text-text-secondary hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-primary hover:bg-opacity-90 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {editingTask ? '保存修改' : '创建任务'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
