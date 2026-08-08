import api from "./api/axios";

// GET /api/v1/dashboard
export const getDashboardStats = async () => {
  const { data } = await api.get("/dashboard");
  return data;
};
