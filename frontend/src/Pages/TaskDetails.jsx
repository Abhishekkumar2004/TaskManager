import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  CalendarDays,
  Clock,
  ClipboardCheck,
} from 'lucide-react';

import toast from 'react-hot-toast';

import { getTask } from '../services/taskService';
import Loading from '../components/Loading';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTask = async () => {
      try {
        const data = await getTask(id);

        setTask(data);
      } catch (error) {
        console.error(error);

        toast.error(
          error.response?.data?.message ||
            'Failed to load task.'
        );

        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [id, navigate]);

  if (loading) {
    return <Loading />;
  }

  if (!task) {
    return null;
  }

  const createdDate = task.createdAt
    ? new Date(task.createdAt).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : 'Date unavailable';

  const createdTime = task.createdAt
    ? new Date(task.createdAt).toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

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

      <main className="relative z-10 max-w-3xl mx-auto">

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

        {/* Task Card */}
        <div
          className={`relative overflow-hidden
                      bg-white/90
                      backdrop-blur-xl
                      rounded-3xl
                      border border-white
                      shadow-xl
                      p-6 sm:p-8
                      ${
                        task.completed
                          ? 'border-green-100'
                          : 'border-blue-100'
                      }`}
        >
          {/* Side gradient */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-1.5 ${
              task.completed
                ? 'bg-gradient-to-b from-green-400 to-emerald-600'
                : 'bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-600'
            }`}
          />

          {/* Task Header */}
          <div className="flex items-start gap-4">

            {/* Status Icon */}
            <div
              className={`w-12 h-12 shrink-0
                          rounded-2xl
                          flex items-center justify-center ${
                            task.completed
                              ? 'bg-green-100 text-green-600'
                              : 'bg-blue-100 text-blue-600'
                          }`}
            >
              {task.completed ? (
                <CheckCircle2 size={25} />
              ) : (
                <Circle size={25} />
              )}
            </div>

            {/* Title */}
            <div className="flex-1 min-w-0">

              <div className="flex items-center gap-2">
                <ClipboardCheck
                  size={18}
                  className={
                    task.completed
                      ? 'text-green-500'
                      : 'text-blue-500'
                  }
                />

                <span className="text-sm font-medium text-slate-400">
                  Task Details
                </span>
              </div>

              <h1
                className={`mt-2
                            text-2xl sm:text-3xl
                            font-bold
                            break-words ${
                              task.completed
                                ? 'text-slate-500 line-through'
                                : 'text-slate-800'
                            }`}
              >
                {task.title}
              </h1>

              {/* Status */}
              <span
                className={`inline-flex items-center gap-1.5
                            mt-4
                            px-3 py-1.5
                            rounded-full
                            text-xs font-semibold ${
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
          <div className="mt-8">
            <h2
              className="text-sm
                         font-semibold
                         text-slate-700
                         mb-3"
            >
              Description
            </h2>

            <div
              className="rounded-2xl
                         bg-slate-50
                         border border-slate-100
                         p-5"
            >
              <p
                className="text-sm sm:text-base
                           leading-7
                           text-slate-600
                           break-words"
              >
                {task.description ||
                  'No description added.'}
              </p>
            </div>
          </div>

          {/* Task Information */}
          <div
            className="mt-8
                       pt-6
                       border-t border-slate-100
                       grid grid-cols-1 sm:grid-cols-2
                       gap-4"
          >
            {/* Created Date */}
            <div
              className="flex items-center gap-3
                         p-4
                         rounded-2xl
                         bg-slate-50
                         border border-slate-100"
            >
              <div
                className="w-10 h-10
                           rounded-xl
                           bg-blue-100
                           text-blue-600
                           flex items-center justify-center
                           shrink-0"
              >
                <CalendarDays size={18} />
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Created Date
                </p>

                <p className="text-sm font-semibold text-slate-700 mt-0.5">
                  {createdDate}
                </p>
              </div>
            </div>

            {/* Created Time */}
            <div
              className="flex items-center gap-3
                         p-4
                         rounded-2xl
                         bg-slate-50
                         border border-slate-100"
            >
              <div
                className="w-10 h-10
                           rounded-xl
                           bg-indigo-100
                           text-indigo-600
                           flex items-center justify-center
                           shrink-0"
              >
                <Clock size={18} />
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Created Time
                </p>

                <p className="text-sm font-semibold text-slate-700 mt-0.5">
                  {createdTime || 'Time unavailable'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TaskDetails;