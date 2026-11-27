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

## Foundation Implementation and Verification Record

**Verification date:** 2026-11-27

**Environment:** Local development on Windows using PowerShell and Visual Studio Code.

### Development Environment

| Tool | Verified Version |
|---|---|
| Git | 2.49.0.windows.1 |
| Node.js | 24.11.0 |
| npm | 11.6.1 |
| Python | 3.13.2 |
| pip | 26.3 |

### Frontend Verification

- [x] React and TypeScript scaffold installed successfully.
- [x] Frontend dependencies installed.
- [x] React Router updated to address reported vulnerabilities.
- [x] ESLint tooling updated.
- [x] TypeScript type checking passed.
- [x] ESLint checks passed.
- [x] Production build passed.
- [x] Development server verified.
- [x] Production preview verified.
- [x] Basic application navigation verified.
- [x] npm security audit completed.
- [x] Local environment file created and excluded from Git.
- [x] Package lock file generated.

### Backend Verification

- [x] Python virtual environment created.
- [x] Backend dependencies installed successfully.
- [x] Dependency compatibility checks passed.
- [x] Local environment file created and excluded from Git.
- [x] HTTPX replaced with HTTPX2 to resolve the Starlette TestClient deprecation warning.
- [x] Automated health endpoint test passed.
- [x] Ruff linting passed.
- [x] FastAPI server started successfully.
- [x] Health endpoint returned HTTP 200 and the expected JSON response.
- [x] Swagger UI verified.
- [x] OpenAPI schema verified.
- [x] Dependency security audit completed using pip-audit.
- [x] Final backend regression checks passed.

### Repository Hygiene

- [x] Environment files excluded from version control.
- [x] Virtual environment and node_modules excluded.
- [x] Build output and cache directories excluded.
- [x] Generated Python egg-info metadata excluded.
- [x] Frontend package lock file prepared for version control.

### Resolved Technical Issues

| Issue | Resolution |
|---|---|
| Frontend dependency vulnerabilities | Updated React Router and repeated the security audit. |
| Deprecated ESLint tooling | Updated compatible ESLint packages and repeated linting and build checks. |
| Interrupted backend dependency installation | Updated pip and successfully repeated the installation. |
| Starlette TestClient deprecation warning | Migrated the development HTTP client dependency to HTTPX2 and repeated automated tests. |
| Untracked Python package metadata | Added the egg-info directory pattern to .gitignore. |

### Current Limitations

- Database initialization and migrations have not been implemented.
- Authentication and session management have not been implemented.
- Backend environment settings have not been integrated into application configuration.
- Frontend-to-backend API integration has not been implemented.
- Skill management and dashboard business logic have not been implemented.
- Deployment has not been performed.
- pip-audit is installed locally and is not yet declared as a project development dependency.
- Security audit results reflect known vulnerabilities at the time of verification.

### Foundation Completion Gate

- [x] Development environment verified.
- [x] Repository setup verified.
- [x] Frontend setup verified.
- [x] Frontend runtime verified.
- [x] Backend setup verified.
- [x] Backend runtime verified.
- [x] Repository hygiene verified.
- [ ] Documentation consistency and final changes reviewed.
- [ ] Foundation changes committed.
- [ ] Remote repository synchronized and verified.

**Current status:** Local implementation and runtime verification completed. Final documentation review and version control synchronization remain pending.