import api from "./api/axios";

// POST /api/v1/tasks  { title, description, status, priority, dueDate, assignedTo, project }
export const createTask = async (payload) => {
  const { data } = await api.post("/tasks", payload);
  return data;
};

// GET /api/v1/tasks?search=&status=&priority=&assignedTo=&project=&page=&limit=
export const getTasks = async (params = {}) => {
  const { data } = await api.get("/tasks", { params });
  return data;
};

// GET /api/v1/tasks/:id
export const getTask = async (id) => {
  const { data } = await api.get(`/tasks/${id}`);
  return data;
};

// PUT /api/v1/tasks/:id
export const updateTask = async (id, payload) => {
  const { data } = await api.put(`/tasks/${id}`, payload);
  return data;
};

// DELETE /api/v1/tasks/:id
export const deleteTask = async (id) => {
  const { data } = await api.delete(`/tasks/${id}`);
  return data;
};
