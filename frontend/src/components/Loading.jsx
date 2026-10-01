

const Loading = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center">
      <div className="flex flex-col items-center">

        {/* Spinner */}
        <div
          className="w-12 h-12 rounded-full
                     border-4 border-slate-200
                     border-t-blue-600
                     animate-spin"
        />

        {/* Loading text */}
        <p className="mt-4 text-sm font-medium text-slate-500">
          Loading...
        </p>

      </div>
    </div>
  );
};

export default Loading;
