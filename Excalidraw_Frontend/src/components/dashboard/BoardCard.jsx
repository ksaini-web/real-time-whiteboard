import { useState } from "react";
import Badge from "../ui/Badge";

function BoardCard({
  board,
  onOpen,
  isPlaceholder = false,
  onInvite,
  onToggleChat,
  onDelete,
  onLeave,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const role = (board.role || "VIEWER").toUpperCase();
  const title = board.title || board.name;
  const updatedAt = board.updatedAt || "Recently updated";
  const isOwner = role === "OWNER";
  const chatEnabled = board.chatEnabled !== false;

  function handleMenuAction(action) {
    setMenuOpen(false);

    if (action === "invite") onInvite(board);
    if (action === "toggleChat") onToggleChat(board);
    if (action === "delete") setConfirmAction("delete");
    if (action === "leave") setConfirmAction("leave");
  }

  function handleConfirm() {
    if (confirmAction === "delete") onDelete(board);
    if (confirmAction === "leave") onLeave(board);
    setConfirmAction(null);
  }

  return (
    <article className="group relative overflow-visible rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:border-gray-300 hover:shadow-md">
      <div className="relative flex aspect-video items-center justify-center overflow-visible rounded-t-xl bg-gradient-to-br from-sky-100 via-white to-amber-100">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/85 text-2xl font-bold text-blue-700 shadow-sm ring-1 ring-white">
          {title?.charAt(0)?.toUpperCase() || "B"}
        </div>
        <button
          type="button"
          aria-label="Board options"
          aria-expanded={menuOpen}
          onClick={(event) => {
            event.stopPropagation();
            setMenuOpen((current) => !current);
          }}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-sm font-bold leading-none text-gray-600 shadow-sm ring-1 ring-gray-200 transition-colors hover:bg-white hover:text-gray-950"
        >
          ...
        </button>

        {menuOpen && (
          <div className="absolute right-3 top-14 z-20 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 text-sm font-medium text-gray-700 shadow-xl">
            {isOwner ? (
              <>
                <button
                  type="button"
                  onClick={() => handleMenuAction("invite")}
                  className="block w-full px-4 py-2.5 text-left transition-colors hover:bg-gray-50 hover:text-gray-950"
                >
                  Invite Users
                </button>
                <button
                  type="button"
                  onClick={() => handleMenuAction("toggleChat")}
                  className="block w-full px-4 py-2.5 text-left transition-colors hover:bg-gray-50 hover:text-gray-950"
                >
                  {chatEnabled ? "Disable Chat" : "Enable Chat"}
                </button>
                <button
                  type="button"
                  onClick={() => handleMenuAction("delete")}
                  className="block w-full px-4 py-2.5 text-left text-red-600 transition-colors hover:bg-red-50"
                >
                  Delete Board
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => handleMenuAction("leave")}
                className="block w-full px-4 py-2.5 text-left text-red-600 transition-colors hover:bg-red-50"
              >
                Leave Board
              </button>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4 p-4">
        <div className="space-y-1">
          <h3 className="line-clamp-1 text-base font-semibold text-gray-950">
            {title}
          </h3>
          <p className="text-sm text-gray-500">{updatedAt}</p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-semibold text-gray-600">
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 ring-1 ring-gray-200">
            Members: 3
          </span>
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700 ring-1 ring-emerald-100">
            Live: 1
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <Badge>{role}</Badge>
          <button
            type="button"
            onClick={onOpen}
            disabled={isPlaceholder}
            className="min-h-11 rounded-lg px-4 py-2 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:bg-transparent"
          >
            Open Board
          </button>
        </div>

        {confirmAction && (
          <div className="rounded-xl border border-red-100 bg-red-50 p-3">
            <p className="text-sm font-medium text-gray-950">
              {confirmAction === "delete"
                ? "Are you sure you want to delete this board? This cannot be undone."
                : "Are you sure you want to leave this board?"}
            </p>
            <div className="mt-3 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmAction(null)}
                className="min-h-9 rounded-lg border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="min-h-9 rounded-lg bg-red-600 px-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700"
              >
                {confirmAction === "delete" ? "Delete" : "Leave"}
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export default BoardCard;
