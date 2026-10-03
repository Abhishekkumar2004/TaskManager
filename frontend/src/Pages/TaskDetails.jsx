import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ArrowLeft,
  Check,
  Circle,
  ClipboardCheck,
  CalendarDays,
  Clock,
} from 'lucide-react';

import toast from 'react-hot-toast';

import { getTasks } from '../services/taskService';
import Loading from '../components/Loading';

const TaskDetails = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await getTasks();

        // Show maximum 4 tasks
        setTasks(data.slice(0, 4));
      } catch (error) {
        console.error(error);

        toast.error(
          error.response?.data?.message ||
            'Failed to load tasks.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className="min-h-screen
                 relative overflow-hidden
                 bg-gradient-to-br
                 from-slate-50
                 via-blue-50/40
                 to-indigo-50/50
                 px-4 py-8 sm:px-6 lg:px-8"
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
                   max-w-6xl
                   mx-auto"
      >
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2
                     mb-6
                     px-4 py-2
                     rounded-xl
                     bg-white/80
                     border border-white
                     shadow-sm
                     text-slate-600
                     hover:text-blue-600
                     hover:bg-white
                     transition-all duration-200"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        {/* Page Header */}
        <div className="mb-8">
          <div
            className="inline-flex items-center gap-2
                       px-3 py-1.5
                       rounded-full
                       bg-blue-100
                       text-blue-600"
          >
            <ClipboardCheck size={15} />

            <span className="text-xs font-semibold">
              Task Details
            </span>
          </div>

          <h1
            className="mt-3
                       text-3xl sm:text-4xl
                       font-extrabold
                       bg-gradient-to-r
                       from-slate-800
                       via-blue-700
                       to-indigo-700
                       bg-clip-text
                       text-transparent"
          >
            Your Tasks
          </h1>

          <p className="text-slate-500 mt-2">
            View your latest tasks and their details.
          </p>
        </div>

        {/* Empty State */}
        {tasks.length === 0 && (
          <div
            className="bg-white/90
                       backdrop-blur-xl
                       rounded-3xl
                       border border-white
                       shadow-xl
                       p-10
                       text-center"
          >
            <ClipboardCheck
              size={40}
              className="mx-auto text-slate-300"
            />

            <h2 className="mt-4 text-xl font-semibold text-slate-700">
              No tasks available
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Create a task from the dashboard to see it here.
            </p>
          </div>
        )}

        {/* Task Cards */}
        {tasks.length > 0 && (
          <div
            className="grid
                       grid-cols-1
                       md:grid-cols-2
                       gap-5"
          >
            {tasks.map((task) => {
              const createdDate = task.createdAt
                ? new Date(
                    task.createdAt
                  ).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })
                : 'Date unavailable';

              const createdTime = task.createdAt
                ? new Date(
                    task.createdAt
                  ).toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : '';

              return (
                <div
                  key={task._id}
                  className={`group relative overflow-hidden
                              flex flex-col
                              min-h-[250px]
                              p-5
                              rounded-2xl
                              border
                              bg-white/90
                              backdrop-blur-xl
                              shadow-lg
                              transition-all duration-300
                              hover:-translate-y-1
                              hover:shadow-xl
                              ${
                                task.completed
                                  ? 'border-green-200'
                                  : 'border-slate-200 hover:border-blue-200'
                              }`}
                >
                  {/* Side Gradient */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 ${
                      task.completed
                        ? 'bg-gradient-to-b from-green-400 to-emerald-600'
                        : 'bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-600'
                    }`}
                  />

                  {/* Header */}
                  <div className="flex items-start gap-3">
                    {/* Status Icon */}
                    <div
                      className={`w-10 h-10
                                  shrink-0
                                  rounded-xl
                                  flex items-center justify-center ${
                                    task.completed
                                      ? 'bg-green-100 text-green-600'
                                      : 'bg-blue-100 text-blue-600'
                                  }`}
                    >
                      {task.completed ? (
                        <Check size={19} strokeWidth={2.5} />
                      ) : (
                        <Circle size={18} />
                      )}
                    </div>

                    {/* Title */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <ClipboardCheck
                          size={16}
                          className={
                            task.completed
                              ? 'text-green-500 shrink-0'
                              : 'text-blue-500 shrink-0'
                          }
                        />

                        <h2
                          className={`font-semibold
                                      text-base
                                      leading-6
                                      break-words ${
                                        task.completed
                                          ? 'text-slate-400 line-through'
                                          : 'text-slate-800'
                                      }`}
                        >
                          {task.title}
                        </h2>
                      </div>

                      {/* Status */}
                      <span
                        className={`inline-flex
                                    items-center
                                    gap-1.5
                                    mt-3
                                    px-2.5 py-1
                                    rounded-full
                                    text-xs
                                    font-semibold ${
                                      task.completed
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-blue-100 text-blue-700'
                                    }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            task.completed
                              ? 'bg-green-500'
                              : 'bg-blue-500'
                          }`}
                        />

                        {task.completed
                          ? 'Completed'
                          : 'Pending'}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-5">
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      Description
                    </h3>

                    <p
                      className={`mt-2
                                  text-sm
                                  leading-6
                                  line-clamp-3 ${
                                    task.completed
                                      ? 'text-slate-400'
                                      : 'text-slate-600'
                                  }`}
                    >
                      {task.description ||
                        'No description added.'}
                    </p>
                  </div>

                  {/* Date & Time */}
                  <div
                    className="mt-auto
                               pt-5
                               border-t
                               border-slate-100
                               flex
                               flex-wrap
                               items-center
                               gap-x-4
                               gap-y-2
                               text-xs
                               text-slate-400"
                  >
                    <div className="flex items-center gap-1.5">
                      <CalendarDays size={14} />
                      <span>{createdDate}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Clock size={14} />
                      <span>{createdTime}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* More Tasks Notice */}
        {tasks.length === 4 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-400">
              Showing your latest 4 tasks.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default TaskDetails;