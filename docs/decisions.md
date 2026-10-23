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

**Status:** Accepted for local development; conditional for production hosting

**Decision:** Use SQLite for local development and the initial MVP. Evaluate PostgreSQL for production if hosting cannot guarantee persistent SQLite storage or operational needs favor a managed database.

**Rationale:** The project has a small initial scope and does not require a separate database server during early development.

**Migration strategy:** Keep database access behind a persistence layer/ORM, minimize database-specific SQL, and use versioned migrations. This should make a later switch to PostgreSQL manageable, but it is not automatic: adapt and test schema migrations, migrate existing data, and verify application behavior against PostgreSQL before deployment.

**Trade-off:** Production deployment must provide persistent storage. Reassess the database choice before public release based on hosting and operational requirements.

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

**Status:** Accepted for MVP scope

**Decision:** Use server-managed sessions with an opaque random token in an HTTP-only cookie for the React browser client and FastAPI backend. Persist only a hash of each token so sessions can be revoked on logout.

**Rationale:** This keeps the MVP web authentication flow simple and avoids exposing bearer tokens to JavaScript or adding a refresh-token lifecycle.

**Security constraints:** Hash passwords with a password-hashing algorithm; use `HttpOnly`, `SameSite=Lax`, and `Secure` cookies in HTTPS environments; add CSRF protection for state-changing requests; validate origins; configure explicit CORS origins; and enforce authentication and ownership on the backend. CORS is not an authorization mechanism.

**Accepted session lifetime:** Seven days of inactivity, refreshed after successful authenticated use. Detailed flow and trade-offs are in [Phase 3.3 — Authentication Strategy](phase-3/03-authentication-strategy.md).

## DEC-009 — Account Access Workflows for the MVP

**Status:** Accepted for MVP scope

**Decision:** Include registration, login, and logout. Exclude password reset, account recovery, and email verification from the MVP.

**Rationale:** Keep the first release focused on the essential authentication lifecycle and secure access to private skill data. Additional account workflows can be considered after the core MVP is stable.
