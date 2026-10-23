# Development Roadmap

**Current status:** Phase 3 — Technical and UI Design (in progress); Phase 3.2 data model draft ready for review.

This roadmap describes the intended sequence. Dates and completion status will be updated as work progresses; a phase is not complete until its deliverables have been reviewed.

## Phase 1 — Scope and Requirements

- [x] Create the public GitHub repository
- [x] Draft project scope and MVP boundaries
- [x] Draft functional and non-functional requirements
- [x] Confirm category model
- [x] Review and approve requirements baseline

**Deliverables:** README, project scope, requirements, roadmap, and decision log.

## Phase 2 — Use Cases and User Flows

- [x] Identify actors and system boundaries
- [x] Create and review the use case diagram
- [x] Review and accept descriptions for key use cases
- [x] Map primary and alternate user flows
- [x] Review flows against the requirements

**Deliverables:** accepted use case diagram, reviewed use case descriptions, and accepted user-flow documentation.

## Phase 3 — Technical and UI Design

- [x] Phase 3.1 — Define and accept application architecture (React → FastAPI → SQLite for local development)
- [ ] Phase 3.2 — Review and accept the database entity and relationship design (draft: [Data Model](phase-3/02-data-model.md))
- [ ] Decide authentication and session/token strategy
- [ ] Define API endpoints and validation contracts
- [ ] Draft wireframes and responsive UI behavior
- [ ] Record significant decisions

**Phase 3.1 complete:** Architecture review accepted. SQLite is selected for local development and the initial MVP; PostgreSQL remains a production option subject to hosting needs. Migration guidance is recorded in DEC-003.

**Current task:** Review the Phase 3.2 data model, especially deletion behavior and the built-in category catalogue, before finalizing it.

**Deliverables:** accepted architecture overview, accepted data model, API specification, and wireframes.

## Phase 4 — Project Foundation

- [ ] Set up frontend and backend projects
- [ ] Configure environment variables and local development
- [ ] Establish linting, formatting, and testing conventions
- [ ] Add health checks and baseline error handling
- [ ] Document local setup

**Deliverables:** reproducible development environment and initial automated checks.

## Phase 5 — MVP Implementation

- [ ] Implement registration and authentication
- [ ] Implement secure, user-owned skill CRUD
- [ ] Implement categories, proficiency levels, goals, and deadlines
- [ ] Implement progress tracking and dashboard summaries
- [ ] Implement search and category filtering
- [ ] Add automated unit and integration tests
- [ ] Review accessibility, validation, and responsive behavior

**Deliverables:** tested MVP ready for deployment.

## Phase 6 — Deployment and Portfolio Polish

- [ ] Choose and configure hosting and persistent database storage
- [ ] Deploy the application
- [ ] Verify persistence, authentication, and data isolation in the deployed environment
- [ ] Add screenshots and a demo link when available
- [ ] Review documentation and repository presentation
- [ ] Create a release when acceptance criteria are met

**Deliverables:** verified public demo (if hosting is available), release notes, and polished portfolio documentation.

## Working Agreement

- Keep project status truthful and current.
- Prefer small, focused commits with descriptive messages.
- Update documentation when scope or technical decisions change.
- Do not mark a task complete until its output has been checked.
