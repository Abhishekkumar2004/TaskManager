import { useEffect, useState } from 'react';
import {
  ClipboardList,
  Clock3,
  CheckCircle2,
  ListTodo,
  Sparkles,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';
import toast from 'react-hot-toast';

import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import Loading from '../components/Loading';

import useAuth from '../hooks/useAuth';

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../services/taskService';

const Dashboard = () => {
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // =========================
  // Load Tasks
  // =========================
  const loadTasks = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await getTasks();

      setTasks(data);
    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.message ||
        'Failed to load tasks.';

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Load tasks when Dashboard opens
  useEffect(() => {
    loadTasks();
  }, []);

  // =========================
  // Create Task
  // =========================
  const handleCreateTask = async (taskData) => {
    try {
      setError('');

      const newTask = await createTask(taskData);

      setTasks((prevTasks) => [
        ...prevTasks,
        newTask,
      ]);

      toast.success(
        'Task created successfully! 🎉'
      );
    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.message ||
        'Failed to create task.';

      setError(message);
      toast.error(message);
    }
  };

  // =========================
  // Update Task
  // =========================
  const handleToggleTask = async (id) => {
    try {
      setError('');

      const currentTask = tasks.find(
        (task) => task._id === id
      );

      if (!currentTask) return;

      const updatedTask = await updateTask(id, {
        title: currentTask.title,
        description: currentTask.description,
        completed: !currentTask.completed,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id
            ? updatedTask
            : task
        )
      );

      toast.success(
        updatedTask.completed
          ? 'Task completed! 🎉'
          : 'Task marked as pending.'
      );
    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.message ||
        'Failed to update task.';

      setError(message);
      toast.error(message);
    }
  };

  // =========================
  // Delete Task
  // =========================
  const handleDeleteTask = async (id) => {
    try {
      setError('');

      await deleteTask(id);

      setTasks((prevTasks) =>
        prevTasks.filter(
          (task) => task._id !== id
        )
      );

      toast.success(
        'Task deleted successfully! 🗑️'
      );
    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.message ||
        'Failed to delete task.';

      setError(message);
      toast.error(message);
    }
  };

  // =========================
  // Statistics
  // =========================
  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  const totalTasks = tasks.length;

  const completionPercentage =
    totalTasks > 0
      ? Math.round(
          (completedTasks / totalTasks) * 100
        )
      : 0;

  return (
    <div
      className="min-h-screen
                 relative overflow-hidden
                 bg-gradient-to-br
                 from-slate-50
                 via-blue-50/40
                 to-indigo-50/50"
    >
      {/* Background decoration */}
      <div
        className="absolute -top-40 -right-40
                   w-96 h-96
                   rounded-full
                   bg-blue-400/10
                   blur-3xl
                   pointer-events-none"
      />

      <div
        className="absolute -bottom-40 -left-40
                   w-96 h-96
                   rounded-full
                   bg-purple-400/10
                   blur-3xl
                   pointer-events-none"
      />

      <main
        className="relative z-10
                   max-w-6xl mx-auto
                   px-4 sm:px-6 lg:px-8
                   py-8 sm:py-10"
      >
        {/* =========================
            Welcome
        ========================= */}
        <div className="mb-8">
          <div
            className="inline-flex items-center gap-2
                       px-3 py-1.5
                       rounded-full
                       bg-blue-100
                       text-blue-600
                       mb-3"
          >
            <Sparkles size={15} />

            <span className="text-xs font-semibold">
              Dashboard
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl
                       font-extrabold
                       bg-gradient-to-r
                       from-slate-800
                       via-blue-700
                       to-indigo-700
                       bg-clip-text
                       text-transparent"
          >
            Welcome back! 👋
          </h1>

          <p
            className="text-lg sm:text-xl
                       font-semibold
                       bg-gradient-to-r
                       from-blue-600
                       to-purple-600
                       bg-clip-text
                       text-transparent
                       mt-2"
          >
            {user?.name || 'Welcome'}
          </p>

          <p className="text-slate-500 mt-1">
            Manage your tasks and stay productive.
          </p>
        </div>

        {/* =========================
            Error
        ========================= */}
        {error && (
          <div
            className="mb-6
                       flex items-center gap-3
                       p-4
                       rounded-2xl
                       bg-red-50
                       border border-red-200
                       text-red-600"
          >
            <AlertCircle
              size={20}
              className="shrink-0"
            />

            <span className="text-sm font-medium">
              {error}
            </span>
          </div>
        )}

        {/* =========================
            Statistics
        ========================= */}
        <div
          className="grid grid-cols-1
                     sm:grid-cols-3
                     gap-4 mb-8"
        >
          {/* Total */}
          <div
            className="relative overflow-hidden
                       bg-white/90
                       backdrop-blur-xl
                       rounded-2xl
                       border border-white
                       shadow-lg
                       p-5
                       hover:-translate-y-1
                       transition-all duration-300"
          >
            <div
              className="absolute top-0 left-0 right-0 h-1
                         bg-gradient-to-r
                         from-blue-500
                         via-indigo-500
                         to-purple-500"
            />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Total Tasks
                </p>

                <h2 className="text-3xl font-bold text-slate-800 mt-2">
                  {totalTasks}
                </h2>
              </div>

              <div
                className="w-11 h-11
                           rounded-xl
                           bg-gradient-to-br
                           from-blue-500
                           to-indigo-600
                           flex items-center justify-center
                           shadow-lg shadow-blue-500/20"
              >
                <ListTodo
                  size={21}
                  className="text-white"
                />
              </div>
            </div>
          </div>

          {/* Pending */}
          <div
            className="relative overflow-hidden
                       bg-white/90
                       backdrop-blur-xl
                       rounded-2xl
                       border border-white
                       shadow-lg
                       p-5
                       hover:-translate-y-1
                       transition-all duration-300"
          >
            <div
              className="absolute top-0 left-0 right-0 h-1
                         bg-gradient-to-r
                         from-orange-400
                         to-amber-500"
            />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Pending
                </p>

                <h2 className="text-3xl font-bold text-orange-500 mt-2">
                  {pendingTasks}
                </h2>
              </div>

              <div
                className="w-11 h-11
                           rounded-xl
                           bg-gradient-to-br
                           from-orange-400
                           to-amber-500
                           flex items-center justify-center
                           shadow-lg shadow-orange-500/20"
              >
                <Clock3
                  size={21}
                  className="text-white"
                />
              </div>
            </div>
          </div>

          {/* Completed */}
          <div
            className="relative overflow-hidden
                       bg-white/90
                       backdrop-blur-xl
                       rounded-2xl
                       border border-white
                       shadow-lg
                       p-5
                       hover:-translate-y-1
                       transition-all duration-300"
          >
            <div
              className="absolute top-0 left-0 right-0 h-1
                         bg-gradient-to-r
                         from-green-400
                         to-emerald-600"
            />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Completed
                </p>

                <h2 className="text-3xl font-bold text-green-500 mt-2">
                  {completedTasks}
                </h2>
              </div>

              <div
                className="w-11 h-11
                           rounded-xl
                           bg-gradient-to-br
                           from-green-500
                           to-emerald-600
                           flex items-center justify-center
                           shadow-lg shadow-green-500/20"
              >
                <CheckCircle2
                  size={21}
                  className="text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            Progress
        ========================= */}
        <div
          className="mb-8
                     bg-white/90
                     backdrop-blur-xl
                     rounded-2xl
                     border border-white
                     shadow-lg
                     p-5"
        >
          <div className="flex justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp
                size={18}
                className="text-indigo-600"
              />

              <span className="text-sm font-semibold text-slate-700">
                Task Progress
              </span>
            </div>

            <span className="text-sm font-bold text-indigo-600">
              {completionPercentage}%
            </span>
          </div>

          <div
            className="h-2.5
                       bg-slate-100
                       rounded-full
                       overflow-hidden"
          >
            <div
              className="h-full
                         rounded-full
                         bg-gradient-to-r
                         from-blue-500
                         via-indigo-500
                         to-purple-600
                         transition-all duration-500"
              style={{
                width: `${completionPercentage}%`,
              }}
            />
          </div>

          <p className="text-xs text-slate-400 mt-2">
            {completedTasks} of {totalTasks} tasks completed
          </p>
        </div>

        {/* =========================
            Create Task
        ========================= */}
        <div className="mb-8">
          <TaskForm
            onSubmit={handleCreateTask}
          />
        </div>

        {/* =========================
            Task List
        ========================= */}
        <div
          className="bg-white/90
                     backdrop-blur-xl
                     rounded-3xl
                     border border-white
                     shadow-xl
                     p-5 sm:p-6"
        >
          <div
            className="flex items-center
                       justify-between
                       mb-6"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11
                           rounded-xl
                           bg-gradient-to-br
                           from-blue-600
                           via-indigo-600
                           to-purple-600
                           flex items-center justify-center
                           shadow-lg shadow-blue-500/20"
              >
                <ClipboardList
                  size={21}
                  className="text-white"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Your Tasks
                </h2>

                <p className="text-sm text-slate-500">
                  {tasks.length === 0
                    ? 'You have no tasks yet.'
                    : `${tasks.length} ${
                        tasks.length === 1
                          ? 'task'
                          : 'tasks'
                      } in your list.`}
                </p>
              </div>
            </div>

            {tasks.length > 0 && (
              <span
                className="hidden sm:inline-flex
                           items-center gap-2
                           px-3 py-1.5
                           rounded-full
                           bg-blue-50
                           text-blue-600
                           text-xs font-semibold"
              >
                <span
                  className="w-2 h-2
                             rounded-full
                             bg-blue-500
                             animate-pulse"
                />

                {pendingTasks} pending
              </span>
            )}
          </div>

          {/* Loading */}
          {loading && <Loading />}

          {/* Empty */}
          {!loading && tasks.length === 0 && (
            <div
              className="text-center py-12
                         rounded-2xl
                         border border-dashed
                         border-slate-200
                         bg-gradient-to-br
                         from-slate-50
                         to-blue-50/50"
            >
              <div
                className="w-16 h-16
                           mx-auto mb-4
                           rounded-2xl
                           bg-gradient-to-br
                           from-blue-500
                           via-indigo-500
                           to-purple-600
                           flex items-center justify-center
                           shadow-lg shadow-blue-500/20"
              >
                <ClipboardList
                  size={30}
                  className="text-white"
                />
              </div>

              <h3 className="text-lg font-semibold text-slate-700">
                No tasks yet
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Create your first task above.
              </p>
            </div>
          )}

          {/* Task Cards */}
          {!loading && tasks.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;