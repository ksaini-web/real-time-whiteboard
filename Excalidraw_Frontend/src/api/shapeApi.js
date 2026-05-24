import axios from "axios";

const API_URL = "http://localhost:8080/api/shapes";

function getAuthHeader() {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

// Save shape
export async function saveShapeToBackend(shape, type, boardId) {
  const response = await axios.post(API_URL, {
    boardId,
    type,
    shapeData: JSON.stringify(shape),
  },
 getAuthHeader());

  return response.data.id;
}

// Update shape
export async function updateShapeInBackend(shape, type, boardId) {
  if (!shape.backendId) return;

  await axios.put(`${API_URL}/${shape.backendId}`, {
    id: shape.backendId,
    boardId,
    type,
    shapeData: JSON.stringify(shape),
  }, getAuthHeader());
}

// Load shapes by board
export async function getShapesByBoard(boardId) {
  const response = await axios.get(`${API_URL}/${boardId}`,
     getAuthHeader()
  );
  return response.data;
}

// Delete shape
export async function deleteShapeFromBackend(shapeId) {
  await axios.delete(`${API_URL}/${shapeId}`
    , getAuthHeader()
  );
}

// Clear board
export async function clearBoardShapes(boardId) {
  await axios.delete(`${API_URL}/board/${boardId}/clear`, getAuthHeader());
}

// Undo
export async function undoBoard(boardId) {
  await axios.post(
    `http://localhost:8080/api/actions/undo/${boardId}`
    , getAuthHeader()
  );
}

// Redo
export async function redoBoard(boardId) {
  await axios.post(
    `http://localhost:8080/api/actions/redo/${boardId}`
    , getAuthHeader()
  );
}

// Load chat
export async function getMessagesByBoard(boardId) {
  const response = await axios.get(
    `http://localhost:8080/api/chat/${boardId}`,
     getAuthHeader()
  );

  return response.data;
}