import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import BoardCard from "../components/dashboard/BoardCard";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

import {
  getBoardsByUser,
  inviteUser,
  getPendingInvites,
  acceptInvite,
  toggleBoardChat,
  deleteBoard,
  leaveBoard,
} from "../api/boardApi";

function Dashboard() {
  const [boards, setBoards] = useState([]);
  const [pendingInvites, setPendingInvites] = useState([]);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createBoardName, setCreateBoardName] = useState("");

  const [inviteModalBoard, setInviteModalBoard] = useState(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("VIEWER");

  const navigate = useNavigate();

  async function loadDashboardData() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const chatSettings = JSON.parse(
      localStorage.getItem("boardChatSettings") || "{}"
    );

    const boardData = await getBoardsByUser(user.id);

    setBoards(
      boardData.map((board) => ({
        ...board,
        chatEnabled: chatSettings[board.id] ?? board.chatEnabled ?? false,
      }))
    );

    const invites = await getPendingInvites(user.email);
    setPendingInvites(invites);
  }

  useEffect(() => {
    async function loadInitialDashboardData() {
      await loadDashboardData();
    }

    loadInitialDashboardData();
  }, []);

  const hasBoards = boards.length > 0;

  async function handleToggleChat(board) {
    const user = JSON.parse(localStorage.getItem("user"));

    const updatedBoard = await toggleBoardChat(board.id, user.id);

    setBoards((currentBoards) =>
      currentBoards.map((item) =>
        item.id === board.id ? updatedBoard : item
      )
    );
  }

  async function handleDeleteBoard(board) {
    const user = JSON.parse(localStorage.getItem("user"));

    await deleteBoard(board.id, user.id);

    setBoards((currentBoards) =>
      currentBoards.filter((item) => item.id !== board.id)
    );
  }

  async function handleLeaveBoard(board) {
    const user = JSON.parse(localStorage.getItem("user"));

    await leaveBoard(board.id, user.id);

    setBoards((currentBoards) =>
      currentBoards.filter((item) => item.id !== board.id)
    );
  }

  async function handleInviteUser(board) {
    const user = JSON.parse(localStorage.getItem("user"));

    await inviteUser(board.id, user.id, {
      invitedEmail: inviteEmail,
      role: inviteRole,
    });

    alert("Invite sent");
    await loadDashboardData();
  }

  async function handleAcceptInvite(inviteId) {
    const user = JSON.parse(localStorage.getItem("user"));

    await acceptInvite(inviteId, user.id);

    alert("Invite accepted");

    loadDashboardData();
  }

  async function handleSendInvite(event) {
    event.preventDefault();

    await handleInviteUser(inviteModalBoard);

    setInviteModalBoard(null);
    setInviteEmail("");
    setInviteRole("VIEWER");
  }

  function handleCreateBoardSubmit(event) {
    event.preventDefault();

    setCreateModalOpen(false);
    navigate("/create-board");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-sm font-bold text-white">
              EB
            </span>
            <span className="text-lg font-bold text-gray-950">
              Excaliboard
            </span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
            <Link to="/" className="hover:text-gray-950">
              Home
            </Link>

            <button
              type="button"
              onClick={() => setCreateModalOpen(true)}
              className="hover:text-gray-950"
            >
              Create
            </button>

            <Link to="/canvas" className="hover:text-gray-950">
              Canvas
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCreateModalOpen(true)}
              className="inline-flex min-h-11 items-center rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Create New Board
            </button>

            <button
              type="button"
              aria-label="User menu"
              className="grid h-11 w-11 place-items-center rounded-full bg-gray-900 text-sm font-bold text-white"
            >
              K
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600">Workspace</p>
            <h1 className="mt-2 text-3xl font-bold text-gray-950">
              My Boards
            </h1>
            <p className="mt-2 max-w-2xl text-gray-600">
              Open recent boards, create a fresh canvas, or review starter
              examples.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setCreateModalOpen(true)}
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Create Board
          </button>
        </div>

        {pendingInvites.length > 0 && (
          <section className="mb-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <h2 className="text-lg font-bold text-gray-950">
              Pending Invites
            </h2>

            <div className="mt-4 space-y-3">
              {pendingInvites.map((invite) => (
                <div
                  key={invite.id}
                  className="flex items-center justify-between rounded-xl border border-blue-100 bg-white p-4"
                >
                  <div>
                    <p className="font-semibold text-gray-950">
                      Board Invite
                    </p>
                    <p className="text-sm text-gray-500">
                      Role: {invite.role}
                    </p>
                  </div>

                  <Button onClick={() => handleAcceptInvite(invite.id)}>
                    Accept
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}

        {!hasBoards && (
          <section className="grid min-h-80 place-items-center rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center shadow-sm">
            <div>
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-blue-50 text-3xl ring-1 ring-blue-100">
                +
              </div>

              <h2 className="mt-5 text-xl font-semibold text-gray-950">
                No boards yet. Create your first board.
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                Start with a fresh canvas and invite teammates when you are
                ready.
              </p>

              <button
                type="button"
                onClick={() => setCreateModalOpen(true)}
                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Create Board
              </button>
            </div>
          </section>
        )}

        {hasBoards && (
          <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {boards.map((board) => (
              <BoardCard
                key={board.id}
                board={board}
                onInvite={setInviteModalBoard}
                onToggleChat={handleToggleChat}
                onDelete={handleDeleteBoard}
                onLeave={handleLeaveBoard}
                onOpen={() => {
                  navigate(`/board/${board.boardCode}`);
                }}
              />
            ))}
          </section>
        )}
      </main>

      {createModalOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-gray-950/40 px-4 backdrop-blur-sm">
          <form
            onSubmit={handleCreateBoardSubmit}
            className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl"
          >
            <div className="mb-5">
              <p className="text-sm font-semibold text-blue-600">New board</p>
              <h2 className="mt-1 text-2xl font-bold text-gray-950">
                Create Board
              </h2>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-700">
                Board name
              </span>

              <Input
                value={createBoardName}
                onChange={(event) => setCreateBoardName(event.target.value)}
                placeholder="Board name"
                autoFocus
              />
            </label>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setCreateModalOpen(false)}
              >
                Cancel
              </Button>

              <Button type="submit">Create Board</Button>
            </div>
          </form>
        </div>
      )}

      {inviteModalBoard && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-gray-950/40 px-4 backdrop-blur-sm">
          <form
            onSubmit={handleSendInvite}
            className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl"
          >
            <div className="mb-5">
              <p className="text-sm font-semibold text-blue-600">
                {inviteModalBoard.title || inviteModalBoard.name}
              </p>

              <h2 className="mt-1 text-2xl font-bold text-gray-950">
                Invite Users
              </h2>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-700">
                Email address
              </span>

              <Input
                type="email"
                value={inviteEmail}
                onChange={(event) => setInviteEmail(event.target.value)}
                placeholder="teammate@example.com"
                required
              />
            </label>

            <label className="mt-4 block">
              <span className="mb-2 block text-sm font-medium text-gray-700">
                Role
              </span>

              <select
                value={inviteRole}
                onChange={(event) => setInviteRole(event.target.value)}
                className="min-h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 outline-none transition focus:border-transparent focus:ring-2 focus:ring-blue-500"
              >
                <option value="VIEWER">VIEWER</option>
                <option value="EDITOR">EDITOR</option>
              </select>
            </label>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setInviteModalBoard(null)}
              >
                Cancel
              </Button>

              <Button type="submit">Send Invite</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
