# Decision Log

This document records important decisions and their rationale. Decisions marked **Proposed** are not final and may change after design review.

## DEC-001 — React for the Frontend

**Status:** Proposed

**Decision:** Use React to build the web interface.

**Rationale:** React is widely used and provides a useful opportunity to practice component-based UI development for a portfolio project.

## DEC-002 — FastAPI for the Backend

**Status:** Proposed

**Decision:** Use Python and FastAPI for the backend API.

**Rationale:** FastAPI provides typed request/response validation and supports a clear API-first separation between frontend and backend.

## DEC-003 — SQLite for the Initial MVP

**Status:** Proposed, conditional on hosting

**Decision:** Start with SQLite to keep local development and the initial MVP simple.

**Rationale:** The project has a small initial scope and does not require a separate database server during early development.

**Trade-off:** Deployment must provide persistent storage. If the selected hosting environment cannot guarantee SQLite persistence, or the project outgrows this setup, evaluate PostgreSQL before public release.

## DEC-004 — Individual Accounts and Private Data

**Status:** Accepted for MVP scope

**Decision:** The MVP supports individual users with separate private data.

**Rationale:** This keeps the initial product focused while allowing the project to demonstrate authentication, authorization, and data ownership.

## DEC-005 — Separate Proficiency from Learning Progress

**Status:** Accepted for product rules

**Decision:** Store self-assessed proficiency level separately from learning-goal progress percentage.

**Rationale:** A percentage of goal completion does not reliably represent a person's actual proficiency.

## DEC-006 — Documentation Before Use-Case Design

**Status:** Accepted

**Decision:** Establish the project scope and requirements baseline before designing use cases and user flows.

**Rationale:** Clear boundaries make later design decisions easier to review and reduce accidental growth of the MVP.

## DEC-007 — Built-in Skill Categories

**Status:** Accepted for MVP scope

**Decision:** Users select a skill category from an application-provided built-in list. Users cannot create, edit, or delete categories in the MVP.

**Rationale:** This keeps category management out of the initial scope and supports consistent category filtering. The exact category catalogue will be decided during technical and UI design.

## DEC-008 — Authentication Strategy

**Status:** Open

**Decision needed:** Select an appropriate session-based or token-based authentication approach during technical design.

**Security constraints:** passwords must be hashed; secrets must not be committed; protected API operations must enforce authentication and ownership checks. CORS is not an authorization mechanism.

## DEC-009 — Account Access Workflows for the MVP

**Status:** Accepted for MVP scope

**Decision:** Include registration, login, and logout. Exclude password reset, account recovery, and email verification from the MVP.

**Rationale:** Keep the first release focused on the essential authentication lifecycle and secure access to private skill data. Additional account workflows can be considered after the core MVP is stable.
