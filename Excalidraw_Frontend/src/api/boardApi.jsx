import axios from "axios";

const API_URL = ""https://real-time-whiteboard-backend-1.onrender.com"/api/boards";

function getAuthHeader() {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export async function getBoardsByUser(userId) {
  const response = await axios.get(
    `${API_URL}/user/${userId}`,
    getAuthHeader()
  );

  return response.data;
}

export async function getBoardAccess(boardCode, userId) {
  const response = await axios.get(
    `${API_URL}/access/${boardCode}?userId=${userId}`,
    getAuthHeader()
  );

  return response.data;
}

export async function inviteUser(boardId, userId, data) {
  const response = await axios.post(
    `${API_URL}/${boardId}/invite?userId=${userId}`,
    data,
    getAuthHeader()
  );

  return response.data;
}

export async function getPendingInvites(email) {
  const response = await axios.get(
    `${API_URL}/invites/${email}`,
    getAuthHeader()
  );

  return response.data;
}

export async function acceptInvite(inviteId, userId) {
  const response = await axios.post(
    `${API_URL}/invites/${inviteId}/accept`,
    { userId },
    getAuthHeader()
  );

  return response.data;
}

export async function deleteBoard(boardId, userId) {
  const response = await axios.delete(
    `${API_URL}/${boardId}?userId=${userId}`,
    getAuthHeader()
  );

  return response.data;
}

export async function leaveBoard(boardId, userId) {
  const response = await axios.delete(
    `${API_URL}/${boardId}/leave?userId=${userId}`,
    getAuthHeader()
  );

  return response.data;
}

export async function toggleBoardChat(boardId, userId) {
  const response = await axios.put(
    `${API_URL}/${boardId}/chat-toggle?userId=${userId}`,
    {},
    getAuthHeader()
  );

  return response.data;
}