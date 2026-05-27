import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

function CreateBoard() {
  const [title, setTitle] = useState("");
  const [creating, setCreating] = useState(false);

  async function handleCreateBoard() {
    if (creating) return;

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
      alert("Login first");
      return;
    }

    setCreating(true);

    try {
      const response = await axios.post(`${BASE}/api/boards`, {
        title,
        userId: user.id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      alert("Board created");
      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
      alert("failed to create board");
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="fixed inset-0 bg-gray-950/30 backdrop-blur-sm" />
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-lg items-center justify-center">
        <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl sm:p-8">
          <div className="mb-6">
            <p className="text-sm font-semibold text-blue-600">New board</p>
            <h1 className="mt-2 text-2xl font-bold text-gray-950">Create Board</h1>
            <p className="mt-2 text-sm text-gray-500">
              Give your canvas a clear name before inviting teammates.
            </p>
          </div>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-gray-700">Board name</span>
            <Input
              placeholder="Board Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              to="/dashboard"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm transition hover:bg-gray-50"
            >
              Cancel
            </Link>
            <Button onClick={handleCreateBoard} disabled={creating}>
              {creating ? "Creating..." : "Create Board"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBoard;