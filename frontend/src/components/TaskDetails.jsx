import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Circle, CalendarDays } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            {task.completed ? (
              <CheckCircle2
                size={25}
                className="text-green-600"
              />
            ) : (
              <Circle
                size={25}
                className="text-orange-500"
              />
            )}

            <h1 className="text-3xl font-bold text-slate-800">
              {task.title}
            </h1>
          </div>

          <span
            className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
              task.completed
                ? 'bg-green-100 text-green-700'
                : 'bg-orange-100 text-orange-700'
            }`}
          >
            {task.completed
              ? 'Completed'
              : 'Pending'}
          </span>

          <div className="mt-6">
            <h2 className="font-semibold text-slate-700 mb-2">
              Description
            </h2>

            <p className="text-slate-600">
              {task.description || 'No description added.'}
            </p>
          </div>

          <div className="flex items-center gap-2 mt-6 text-sm text-slate-500">
            <CalendarDays size={17} />

            <span>
              Created:{' '}
              {new Date(
                task.createdAt
              ).toLocaleDateString('en-IN')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;