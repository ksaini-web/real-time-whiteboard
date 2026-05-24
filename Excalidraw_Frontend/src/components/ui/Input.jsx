function Input({ className = "", ...props }) {
  return (
    <input
      className={`min-h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
}

export default Input;
