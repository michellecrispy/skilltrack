# Phase 4.1 — Project Structure and Local Development Plan

**Status:** Scaffold committed; GitHub file checks in progress. Local runtime checks are not yet verified.

**Frontend decision:** React + TypeScript accepted by project owner.

## Goal
Initialize a reproducible single-repository MVP with separate React frontend and FastAPI backend, SQLite local storage, and a documented path to PostgreSQL.

## Proposed repository structure

```text
skilltrack/
├── frontend/
│   ├── src/
│   │   ├── app/                 # routes, app shell, API client
│   │   ├── components/          # reusable UI
│   │   ├── features/            # auth, dashboard, skills
│   │   └── styles/              # Soft Productivity tokens
│   ├── public/
│   ├── package.json
│   └── .env.example
├── backend/
│   ├── app/
│   │   ├── api/v1/              # versioned routes
│   │   ├── core/                # settings and security
│   │   ├── db/                  # session, models, repositories
│   │   ├── schemas/             # request/response models
│   │   ├── services/            # business logic
│   │   └── main.py
│   ├── alembic/
│   ├── tests/
│   ├── pyproject.toml
│   └── .env.example
├── docs/
├── .gitignore
└── README.md
```

Directories shown are a proposal, not confirmation they exist. Python package markers and migration config will be added during scaffolding.

## Proposed tooling

- Frontend: React with Vite and TypeScript; React Router for page navigation.
- Backend: Python with FastAPI, Pydantic, SQLAlchemy, Alembic, and an ASGI server.
- Local database: SQLite file excluded from Git; SQLAlchemy URL configurable via environment variable.
- Quality: ESLint and TypeScript checks on frontend; Ruff and Pytest on backend.
- Versions: use supported stable runtime versions verified on the developer's machine before pinning. Commit dependency lockfiles for reproducibility.
- Development: run frontend and backend as separate local processes; document their ports, CORS origins, and API base URL. No Docker requirement for MVP.
- Secrets: commit only example env files, never real credentials, database files, or session secrets.
- Health: a lightweight `GET /health` route to confirm backend process readiness; no sensitive internals in its response.

## Acceptance checks before Phase 4.1 completion

- [x] Confirm monorepo layout and TypeScript choice.
- [ ] Confirm runtime/tooling choices and versions.
- [x] Create minimal frontend and backend scaffolds in the GitHub repository (without authentication or CRUD).
- [ ] Verify frontend dev server and FastAPI health route locally.
- [ ] Document reproducible install/run commands and environment examples.
- [ ] Confirm generated artifacts, secrets, and SQLite database files are ignored.

**Note:** This scaffold deliberately has no database migrations or authentication implementation yet. Actual runtime and dependency-install checks must be performed before marking Phase 4.1 accepted.

## Local verification commands (to run)

Frontend: `cd frontend && npm install && npm run typecheck && npm run lint && npm run build && npm run dev` (open `http://localhost:5173`).

Backend: `cd backend && python -m venv .venv`, activate the environment, then `python -m pip install -e ".[dev]" && python -m pytest && uvicorn app.main:app --reload` (open `http://127.0.0.1:8000/health`).

**Environment:** Node.js compatible with Vite 6 (Node 20.19+ or 22.12+ recommended), Python 3.11+. Confirm actual installed versions before declaring compatibility. Lockfiles still need generation and review.
