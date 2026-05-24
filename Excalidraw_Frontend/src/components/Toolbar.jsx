import { useState } from "react";

function Toolbar({
  tool,
  setTool,
  handleDelete,
  handleClear,
  handleUndo,
  handleRedo,
  fillColor,
  setFillColor,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const tools = [
    { id: "select", label: "Select", icon: "S" },
    { id: "rectangle", label: "Rectangle", icon: "R" },
    { id: "circle", label: "Circle", icon: "O" },
    { id: "pencil", label: "Pencil", icon: "P" },
  ];

  const actions = [
    { label: "Delete", icon: "Del", onClick: handleDelete },
    { label: "Clear", icon: "Clr", onClick: handleClear },
    { label: "Undo", icon: "Undo", onClick: handleUndo },
    { label: "Redo", icon: "Redo", onClick: handleRedo },
  ];

  const colors = [
    { label: "White", value: "white", className: "bg-white" },
    { label: "Red", value: "red", className: "bg-red-500" },
    { label: "Blue", value: "blue", className: "bg-blue-500" },
    { label: "Green", value: "green", className: "bg-green-500" },
    { label: "Yellow", value: "yellow", className: "bg-yellow-300" },
    { label: "Black", value: "black", className: "bg-gray-950" },
  ];

  const buttonClass = (active = false) =>
    `group relative grid h-10 w-10 place-items-center rounded-md border p-1.5 text-sm font-bold transition-colors ${
      active
        ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
        : "border-transparent bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-950"
    }`;

  return (
    <div className="fixed left-1/2 top-4 z-[9999] flex -translate-x-1/2 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
      <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-1">
        {tools.map((item) => (
          <button
            key={item.id}
            type="button"
            title={item.label}
            aria-label={item.label}
            aria-pressed={tool === item.id}
            className={buttonClass(tool === item.id)}
            onClick={() => setTool(item.id)}
          >
            {item.icon}
            <span className="pointer-events-none absolute left-1/2 top-full mt-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-950 px-2 py-1 text-xs font-medium text-white shadow-lg group-hover:block">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      <div className="hidden items-center gap-1 rounded-lg bg-gray-100 p-1 sm:flex">
        {colors.map((item) => (
          <button
            key={item.value}
            type="button"
            title={item.label}
            aria-label={item.label}
            aria-pressed={fillColor === item.value}
            onClick={() => setFillColor(item.value)}
            className={`group relative grid h-10 w-10 place-items-center rounded-md border bg-white p-1.5 transition-colors hover:bg-gray-100 ${
              fillColor === item.value
                ? "border-blue-500 ring-2 ring-blue-100"
                : "border-transparent"
            }`}
          >
            <span className={`h-5 w-5 rounded-full border border-gray-300 ${item.className}`} />
            <span className="pointer-events-none absolute left-1/2 top-full mt-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-950 px-2 py-1 text-xs font-medium text-white shadow-lg group-hover:block">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      <button
        type="button"
        title="More tools"
        aria-label="More tools"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((current) => !current)}
        className={buttonClass(menuOpen)}
      >
        ...
      </button>

      {menuOpen && (
        <div className="absolute left-1/2 top-full mt-2 w-72 -translate-x-1/2 rounded-xl border border-gray-200 bg-white p-3 shadow-xl">
          <div className="grid grid-cols-2 gap-2">
            {actions.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  item.onClick();
                }}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-950"
              >
                {item.icon}
              </button>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-2 sm:hidden">
            {colors.map((item) => (
              <button
                key={item.value}
                type="button"
                title={item.label}
                aria-label={item.label}
                aria-pressed={fillColor === item.value}
                onClick={() => setFillColor(item.value)}
                className={`grid h-9 w-9 place-items-center rounded-md border bg-white p-1.5 transition-colors hover:bg-gray-100 ${
                  fillColor === item.value
                    ? "border-blue-500 ring-2 ring-blue-100"
                    : "border-gray-200"
                }`}
              >
                <span className={`h-5 w-5 rounded-full border border-gray-300 ${item.className}`} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Toolbar;
