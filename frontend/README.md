# Flow — Project Management Frontend

A production-ready React 19 + Vite frontend built exactly against the attached Express/MongoDB backend (`auth`, `workspaces`, `projects`, `tasks`, `dashboard`).

## Setup

```bash
npm install
cp .env.example .env   # set VITE_API_BASE_URL to your backend
npm run dev
```

The backend must be running (default `http://localhost:5000`) with `PORT`, `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN` configured, since `src/server.js` reads `process.env.PORT` and defaults to 5000.

## Notes on backend contract

- **Auth**: `POST /auth/register` (no auto-login — returns user only), `POST /auth/login` (returns `token` + `user`), `GET /auth/profile` (Bearer token). The app stores the JWT and attaches it via an Axios interceptor as `Authorization: Bearer <token>`.
- **Tasks**: `GET /tasks` supports `search`, `status`, `priority`, `assignedTo`, `project`, `page`, `limit` — all wired into the Tasks page's search/filter/pagination.
- **Assigned To**: the backend has no "list users" endpoint, so assigning a task takes a raw user ID (validated by the backend's `User.findById`) rather than a fabricated dropdown.
- **Roles**: the `User` model has a `role` field (`admin`/`member`) but no route enforces it, so the UI displays it on the Profile page without gating any actions.
