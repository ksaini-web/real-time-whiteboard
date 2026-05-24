const badgeClasses = {
  OWNER: "bg-amber-50 text-amber-700 ring-amber-200",
  EDITOR: "bg-blue-50 text-blue-700 ring-blue-200",
  VIEWER: "bg-gray-100 text-gray-700 ring-gray-200",
};

function Badge({ children }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold uppercase ring-1 ${
        badgeClasses[children] || badgeClasses.VIEWER
      }`}
    >
      {children}
    </span>
  );
}

export default Badge;
