import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center px-4">

      <div className="text-center max-w-lg">

        {/* 404 */}
        <h1 className="text-8xl sm:text-9xl font-extrabold text-blue-600">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-800">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-4 text-slate-500 text-base sm:text-lg">
          Oops! The page you're looking for doesn't exist or may have
          been moved.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-8
                     px-6 py-3 rounded-xl
                     bg-blue-600 text-white
                     font-semibold
                     hover:bg-blue-700
                     active:scale-95
                     transition duration-200"
        >
          ← Back to Home
        </Link>

      </div>
    </div>
  );
};

export default NotFound;
