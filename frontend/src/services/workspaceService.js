import api from "./api/axios";

// POST /api/v1/workspaces  { name, description }
export const createWorkspace = async (payload) => {
  const { data } = await api.post("/workspaces", payload);
  return data;
};

// GET /api/v1/workspaces
export const getWorkspaces = async () => {
  const { data } = await api.get("/workspaces");
  return data;
};

// GET /api/v1/workspaces/:id
export const getWorkspace = async (id) => {
  const { data } = await api.get(`/workspaces/${id}`);
  return data;
};

// PUT /api/v1/workspaces/:id
export const updateWorkspace = async (id, payload) => {
  const { data } = await api.put(`/workspaces/${id}`, payload);
  return data;
};

// DELETE /api/v1/workspaces/:id
export const deleteWorkspace = async (id) => {
  const { data } = await api.delete(`/workspaces/${id}`);
  return data;
};
