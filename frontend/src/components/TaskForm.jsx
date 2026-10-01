import { useState } from 'react';
import {
  ClipboardPlus,
  FileText,
  AlignLeft,
  Check,
  Plus,
} from 'lucide-react';

const TaskForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      completed,
    };

    onSubmit(taskData);

    // Reset form
    setTitle('');
    setDescription('');
    setCompleted(false);
  };

  return (
    <div
      className="relative overflow-hidden
                 bg-white/90
                 backdrop-blur-xl
                 rounded-3xl
                 border border-white/60
                 shadow-xl shadow-blue-100/40
                 p-5 sm:p-6"
    >
      {/* Background decoration */}
      <div
        className="absolute -top-20 -right-20
                   w-40 h-40
                   rounded-full
                   bg-gradient-to-br
                   from-blue-400/20
                   via-indigo-400/20
                   to-purple-400/20
                   blur-2xl"
      />

      <div
        className="absolute -bottom-20 -left-20
                   w-40 h-40
                   rounded-full
                   bg-gradient-to-br
                   from-purple-400/10
                   to-blue-400/10
                   blur-2xl"
      />

      <div className="relative z-10">

        {/* Header */}
        <div className="flex items-start gap-4 mb-7">
          <div
            className="w-11 h-11 shrink-0
                       rounded-xl
                       bg-gradient-to-br
                       from-blue-600
                       via-indigo-600
                       to-purple-600
                       flex items-center justify-center
                       shadow-lg shadow-blue-500/25"
          >
            <ClipboardPlus
              size={22}
              className="text-white"
            />
          </div>

          <div>
            <h2
              className="text-xl sm:text-2xl
                         font-bold
                         bg-gradient-to-r
                         from-blue-600
                         via-indigo-600
                         to-purple-600
                         bg-clip-text
                         text-transparent"
            >
              Create New Task
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Add a new task to your list.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="flex items-center gap-2
                         text-sm font-semibold
                         text-slate-700 mb-2"
            >
              <FileText
                size={16}
                className="text-blue-500"
              />
              Title
            </label>

            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
              className="w-full
                         px-4 py-3
                         rounded-xl
                         border border-slate-200
                         bg-slate-50/80
                         text-slate-800
                         placeholder:text-slate-400
                         outline-none
                         focus:bg-white
                         focus:border-blue-500
                         focus:ring-4 focus:ring-blue-500/10
                         hover:border-slate-300
                         transition-all duration-200"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="flex items-center gap-2
                         text-sm font-semibold
                         text-slate-700 mb-2"
            >
              <AlignLeft
                size={16}
                className="text-indigo-500"
              />
              Description
            </label>

            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your task..."
              rows="4"
              className="w-full
                         px-4 py-3
                         rounded-xl
                         border border-slate-200
                         bg-slate-50/80
                         text-slate-800
                         placeholder:text-slate-400
                         outline-none
                         resize-none
                         focus:bg-white
                         focus:border-indigo-500
                         focus:ring-4 focus:ring-indigo-500/10
                         hover:border-slate-300
                         transition-all duration-200"
            />
          </div>

          {/* Completed */}
          <div
            className={`flex items-center justify-between
                        rounded-xl
                        border
                        px-4 py-3
                        transition-all duration-200 ${completed
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
                : 'bg-slate-50/80 border-slate-200'
              }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-lg
                            flex items-center justify-center ${completed
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-200 text-slate-500'
                  }`}
              >
                <Check size={18} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-700">
                  Completed
                </p>

                <p className="text-xs text-slate-500">
                  Mark this task as completed
                </p>
              </div>
            </div>

            {/* Toggle */}
            <button
              type="button"
              role="switch"
              aria-checked={completed}
              aria-label="Toggle completed status"
              onClick={() => setCompleted(!completed)}
              className={`relative
                          w-12 h-6
                          rounded-full
                          transition-all duration-300
                          focus:outline-none
                          focus:ring-4 focus:ring-green-500/20 ${completed
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                  : 'bg-slate-300'
                }`}
            >
              <span
                className={`absolute
                            top-1
                            left-0
                            w-4 h-4
                            bg-white
                            rounded-full
                            shadow-md
                            transition-transform duration-300 ${completed
                    ? 'translate-x-7'
                    : 'translate-x-1'
                  }`}
              />
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="group w-full
                       flex items-center justify-center gap-2
                       py-3.5 px-6
                       rounded-xl
                       font-semibold
                       text-white
                       bg-gradient-to-r
                       from-blue-600
                       via-indigo-600
                       to-purple-600
                       shadow-lg
                       shadow-blue-500/25
                       hover:shadow-xl
                       hover:shadow-indigo-500/30
                       hover:-translate-y-0.5
                       active:scale-[0.98]
                       focus:outline-none
                       focus:ring-4
                       focus:ring-blue-500/20
                       transition-all duration-200"
          >
            <Plus
              size={19}
              className="group-hover:rotate-90 transition-transform duration-200"
            />

            Create Task
          </button>

        </form>
      </div>
    </div>
  );
};

export default TaskForm;