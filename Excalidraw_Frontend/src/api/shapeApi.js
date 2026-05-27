import axios from "axios";

const BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
const API_URL = `${BASE}/api/shapes`;

function getAuthHeader() {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export async function saveShapeToBackend(shape, type, boardId) {
  const response = await axios.post(API_URL, {
    boardId,
    type,
    shapeData: JSON.stringify(shape),
  }, getAuthHeader());
  return response.data.id;
}

export async function updateShapeInBackend(shape, type, boardId) {
  if (!shape.backendId) return;
  await axios.put(`${API_URL}/${shape.backendId}`, {
    id: shape.backendId,
    boardId,
    type,
    shapeData: JSON.stringify(shape),
  }, getAuthHeader());
}

export async function getShapesByBoard(boardId) {
  const response = await axios.get(`${API_URL}/${boardId}`, getAuthHeader());
  return response.data;
}

export async function deleteShapeFromBackend(shapeId) {
  await axios.delete(`${API_URL}/${shapeId}`, getAuthHeader());
}

export async function clearBoardShapes(boardId) {
  await axios.delete(`${API_URL}/board/${boardId}/clear`, getAuthHeader());
}

export async function undoBoard(boardId) {
  await axios.post(`${BASE}/api/actions/undo/${boardId}`, {}, getAuthHeader());
}

export async function redoBoard(boardId) {
  await axios.post(`${BASE}/api/actions/redo/${boardId}`, {}, getAuthHeader());
}

export async function getMessagesByBoard(boardId) {
  const response = await axios.get(`${BASE}/api/chat/${boardId}`, getAuthHeader());
  return response.data;
}