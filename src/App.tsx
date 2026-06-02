import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import useTaskStore from './store/taskStore';
import { useReminder } from './hooks/useReminder';
import type { Task } from './types';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);

  useReminder();

  const handleAddTask = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleFormSubmit = (
    taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'reminded'>
  ) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onAddTask={handleAddTask} />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} />

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden fixed bottom-4 left-4 z-20 w-12 h-12 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-opacity-90 transition-all"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <TaskList onEditTask={handleEditTask} />
      </div>

      <TaskForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        editingTask={editingTask}
      />
    </div>
  );
}

export default App;
