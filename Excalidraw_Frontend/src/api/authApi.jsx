import axios from "axios";

const BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

// Signup
export async function signup(data) {
  const response = await axios.post(
    `${BASE}/api/auth/signup`,
    data
  );
  return response.data;
}

// Login
export async function login(data) {
  const response = await axios.post(
    `${BASE}/api/auth/login`,
    data
  );
  return response.data;
}