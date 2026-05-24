import { useState } from "react";

function ChatSidebar({
  messages,
  sendMessage,
  chatEnabled = true,
  currentUser,
  boardId,
  chatReady = true,
}) {
  const [input, setInput] = useState("");

  function handleSend() {
    if (!chatEnabled) return;
    if (!input.trim()) return;
    if (!currentUser || !boardId) return;
    if (!chatReady) return;

    sendMessage({
      boardId,
      senderId: currentUser.id,
      senderName: currentUser.name || currentUser.username || currentUser.email,
      username: currentUser.name || currentUser.username || currentUser.email,
      content: input,
      message: input,
      time: new Date().toLocaleTimeString(),
    });

    setInput("");
  }

  return (
    <aside className="fixed bottom-0 right-0 top-0 z-30 flex w-full max-w-sm flex-col border-l border-gray-200 bg-white shadow-2xl sm:w-80 md:w-96">
      <div className="flex min-h-16 items-center justify-between border-b border-gray-200 px-4">
        <div>
          <h2 className="text-base font-semibold text-gray-950">Board chat</h2>
          <p className="text-xs text-gray-500">Messages sync with this board</p>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
          chatEnabled
            ? "bg-green-50 text-green-700"
            : "bg-gray-100 text-gray-500"
        }`}>
          {chatEnabled ? "Live" : "Disabled"}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 overflow-y-auto bg-gray-50 px-4 py-3">
        {messages.length === 0 && (
          <div className="mt-8 rounded-xl border border-dashed border-gray-300 bg-white px-4 py-6 text-center text-sm text-gray-500">
            No messages yet
          </div>
        )}

        {messages.map((msg, index) => {
          const currentUserNames = [
            currentUser?.name,
            currentUser?.username,
            currentUser?.email,
          ];
          const isOwn =
            msg.senderId === currentUser?.id ||
            (!msg.senderId && currentUserNames.includes(msg.username));
          const senderName = msg.senderName || msg.username || "Teammate";
          const content = msg.content ?? msg.message;

          return (
          <div key={index} className={`mb-2 flex ${isOwn ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs rounded-2xl px-3 py-2 text-sm shadow-sm transition ${
                isOwn
                  ? "rounded-br-sm bg-blue-500 text-white"
                  : "rounded-bl-sm bg-gray-100 text-gray-800 ring-1 ring-gray-200"
              }`}
            >
              {!isOwn && (
                <p className="mb-1 text-xs font-semibold text-gray-500">
                  {senderName}
                </p>
              )}
              <div className="leading-6">{content}</div>
              <small className={`mt-1 block text-xs ${isOwn ? "text-blue-100" : "text-gray-400"}`}>
                {msg.time}
              </small>
            </div>
          </div>
        );
        })}
      </div>

      <div className="border-t border-gray-200 bg-white p-4">
        {chatEnabled ? (
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleSend();
              }}
              placeholder="Type message..."
              className="min-h-11 min-w-0 flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none transition placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={handleSend}
              disabled={!chatReady}
              className="min-h-11 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Send
            </button>
          </div>
        ) : (
          <div className="grid min-h-16 place-items-center rounded-xl bg-gray-50 px-4 text-center text-sm font-semibold text-gray-500 ring-1 ring-gray-200">
            Chat disabled by owner
          </div>
        )}
      </div>
    </aside>
  );
}

export default ChatSidebar;
