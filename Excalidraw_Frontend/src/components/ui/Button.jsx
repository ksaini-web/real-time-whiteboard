function Button({ children, className = "", variant = "primary", ...props }) {
  const variants = {
    primary:
      "bg-blue-600 text-white shadow-sm hover:bg-blue-700 active:bg-blue-800 focus-visible:ring-blue-500",
    secondary:
      "border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 active:bg-gray-100 focus-visible:ring-blue-500",
    ghost:
      "text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus-visible:ring-blue-500",
    danger:
      "bg-red-600 text-white shadow-sm hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-500",
  };

  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
