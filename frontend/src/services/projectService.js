import api from "./api/axios";

// POST /api/v1/projects  { name, description, workspace }
export const createProject = async (payload) => {
  const { data } = await api.post("/projects", payload);
  return data;
};

// GET /api/v1/projects
export const getProjects = async () => {
  const { data } = await api.get("/projects");
  return data;
};

// GET /api/v1/projects/:id
export const getProject = async (id) => {
  const { data } = await api.get(`/projects/${id}`);
  return data;
};

// PUT /api/v1/projects/:id
export const updateProject = async (id, payload) => {
  const { data } = await api.put(`/projects/${id}`, payload);
  return data;
};

// DELETE /api/v1/projects/:id
export const deleteProject = async (id) => {
  const { data } = await api.delete(`/projects/${id}`);
  return data;
};
