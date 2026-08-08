import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import AppLayout from "./components/layout/AppLayout";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Projects from "./pages/Projects/Projects";
import ProjectDetails from "./pages/Projects/ProjectDetails";
import CreateProject from "./pages/Projects/CreateProject";
import Tasks from "./pages/Tasks/Tasks";
import CreateTask from "./pages/Tasks/CreateTask";
import EditTask from "./pages/Tasks/EditTask";
import Workspaces from "./pages/Workspaces/Workspaces";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/new" element={<CreateProject />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />

          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/new" element={<CreateTask />} />
          <Route path="/tasks/:id/edit" element={<EditTask />} />

          <Route path="/workspaces" element={<Workspaces />} />

          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Default Route */}
      <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />

       {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}