import {
  Check,
  Trash2,
  Circle,
  ClipboardCheck,
  CalendarDays,
  Clock,
  Pencil,
} from 'lucide-react';

const TaskCard = ({ task, onToggle, onDelete, onEdit }) => {
  // Format created date and time
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
      className={`group relative overflow-hidden
                  flex flex-col
                  p-5
                  rounded-2xl
                  border
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                  min-h-[230px]
                  ${
                    task.completed
                      ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
                      : 'bg-white border-slate-200 hover:border-blue-200'
                  }`}
    >
      {/* Side gradient */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 ${
          task.completed
            ? 'bg-gradient-to-b from-green-400 to-emerald-600'
            : 'bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500'
        }`}
      />

      {/* Top section */}
      <div className="flex items-start gap-3">

        {/* Checkbox */}
        <button
          type="button"
          onClick={() => onToggle(task._id)}
          className={`w-9 h-9 shrink-0
                      rounded-full
                      flex items-center justify-center
                      border-2
                      transition-all duration-300
                      hover:scale-110
                      active:scale-95 ${
                        task.completed
                          ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-500 text-white'
                          : 'bg-white border-slate-300 hover:border-blue-500'
                      }`}
        >
          {task.completed ? (
            <Check size={18} strokeWidth={3} />
          ) : (
            <Circle
              size={17}
              className="text-slate-300"
            />
          )}
        </button>

        {/* Title + icon */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2">
            <ClipboardCheck
              size={18}
              className={`mt-0.5 shrink-0 ${
                task.completed
                  ? 'text-green-500'
                  : 'text-blue-500'
              }`}
            />

            <h3
              className={`font-semibold text-base leading-6 break-words ${
                task.completed
                  ? 'text-slate-400 line-through'
                  : 'text-slate-800'
              }`}
            >
              {task.title}
            </h3>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">

          {/* Edit */}
          <button
            type="button"
            onClick={() => onEdit(task)}
            title="Edit task"
            className="p-2
                       rounded-xl
                       text-blue-500
                       bg-blue-50
                       hover:bg-blue-100
                       hover:text-blue-600
                       active:scale-95
                       transition-all duration-200"
          >
            <Pencil size={16} />
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={() => onDelete(task._id)}
            title="Delete task"
            className="p-2
                       rounded-xl
                       text-red-500
                       bg-red-50
                       hover:bg-red-100
                       hover:text-red-600
                       active:scale-95
                       transition-all duration-200"
          >
            <Trash2 size={16} />
          </button>

        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p
          className={`mt-4 text-sm leading-6 line-clamp-3 ${
            task.completed
              ? 'text-slate-400'
              : 'text-slate-500'
          }`}
        >
          {task.description}
        </p>
      )}

      {/* Bottom section */}
      <div className="mt-auto pt-5">

        {/* Status */}
        <span
          className={`inline-flex items-center gap-1.5
                      px-2.5 py-1
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

          {task.completed ? 'Completed' : 'Pending'}
        </span>

        {/* Created date & time */}
        <div className="mt-4 pt-3 border-t border-slate-200/70 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
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
    </div>
  );
};

export default TaskCard;