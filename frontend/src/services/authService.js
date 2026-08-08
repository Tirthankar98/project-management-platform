import api from "./api/axios";

// POST /api/v1/auth/register  { name, email, password }
export const registerUser = async (payload) => {
  const { data } = await api.post("/auth/register", payload);
  return data;
};

// POST /api/v1/auth/login  { email, password }
export const loginUser = async (payload) => {
  const { data } = await api.post("/auth/login", payload);
  return data;
};

// GET /api/v1/auth/profile  (protected)
export const getProfile = async () => {
  const { data } = await api.get("/auth/profile");
  return data;
};
