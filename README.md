# SkillTrack

**Track your skills. Measure your growth.**

SkillTrack is a personal skill development tracker designed to help learners organize their skills, set learning goals, and monitor progress in one place.

> **Project status:** Planning and requirements definition  
> This repository is being developed as a portfolio project. Features described below are planned and are not yet implemented.

## Why SkillTrack?

Learning goals can become scattered across notes, spreadsheets, and bookmarks. SkillTrack aims to provide a simple place to record skills, define a target proficiency level, set a learning goal and optional deadline, and track progress over time.

## Planned MVP Features

- Account registration, login, and logout
- Private, per-user skill management (create, read, update, and delete)
- Skill categories
- Current and target proficiency levels
- Learning goals and optional deadlines
- Progress tracking from 0–100%
- Dashboard with skill and progress summaries
- Search and category filtering
- Input validation and automated tests

The MVP focuses on individual learners. Social features, team collaboration, AI recommendations, gamification, and progress-history analytics are out of scope for the initial release.

## Planned Technology Stack

| Layer | Technology |
| --- | --- |
| Frontend | React |
| Backend API | Python, FastAPI |
| Database | SQLite for the initial MVP |
| Testing | Frontend and backend tests, including API integration tests |
| Version control | Git and GitHub |

**Deployment note:** SQLite is suitable for a small MVP when the hosting environment provides persistent storage. If the chosen host cannot guarantee persistence or the deployment needs grow, the database may be migrated to PostgreSQL.

## Documentation

- [Project Scope](docs/project-scope.md) — goals, target users, MVP boundaries, and exclusions
- [Requirements](docs/requirements.md) — functional and non-functional requirements, business rules, and acceptance criteria
- [Roadmap](docs/roadmap.md) — planned development phases and milestones
- [Decision Log](docs/decisions.md) — key technical and product decisions with their rationale

## Development Principles

- **Security first:** passwords must be hashed, secrets belong in environment variables, and authorization is enforced by the backend.
- **Clear ownership:** each user's skills must remain private to that account.
- **Testable changes:** core business rules and critical API flows should have automated tests.
- **Honest project status:** documentation will distinguish planned, in-progress, and completed work.
- **Incremental delivery:** define the scope before designing use cases and implementing features.

## Current Milestone

The current milestone is to establish the project scope and requirements before moving on to use cases, user flows, architecture, and implementation.

## License

This project is licensed under the [MIT License](LICENSE).
