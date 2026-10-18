# Phase 2.1 — Actors and System Boundary

**Status:** Draft for review  
**Related baseline:** [Project Scope](../project-scope.md), [Requirements](../requirements.md)

## 1. Purpose

Identify the actors that interact with SkillTrack and define the boundary between the application and external responsibilities before creating the use case diagram and detailed user flows.

## 2. Primary Actor

### Individual Learner (Authenticated User)

The individual learner is the primary human actor. They use SkillTrack to manage their own skills and learning goals.

The learner can:
- Register for an account, log in, and log out.
- View and manage only their own skills.
- Choose a skill category from the built-in category list.
- Set current and target proficiency levels.
- Record a learning goal and an optional deadline.
- Update learning-goal progress from 0% to 100%.
- Search skills by name and filter by category.
- View dashboard summaries.

## 3. Supporting Actor

### Unauthenticated Visitor

An unauthenticated visitor is someone who has not logged in. They can access public entry points, such as registration and login, but cannot access protected skill data or authenticated application operations.

For the MVP, no administrator, mentor, team member, external course platform, or third-party learning service is modeled as an actor.

## 4. System Boundary

**Inside the SkillTrack system boundary:**
- Registration and authentication workflows.
- Authorization and per-user data ownership checks.
- Skill CRUD operations.
- Built-in category selection and validation.
- Current and target proficiency values.
- Learning goals, optional deadlines, and progress values.
- Search and category filtering for the authenticated user's skills.
- Dashboard statistics and empty states.
- Input validation, user-facing errors, and relevant application responses.

**Outside the SkillTrack system boundary:**
- The learner's actual study activities and decisions about how to learn.
- The correctness of a user's self-assessed proficiency level.
- Creation or management of the built-in category catalogue by end users.
- External course-platform integrations and learning-resource management.
- Hosting-provider operations and infrastructure administration.
- Email delivery, password reset, and email verification workflows, unless explicitly added to scope later.

## 5. Actor Goals

| Actor | Goal |
| --- | --- |
| Unauthenticated Visitor | Create an account or sign in to an existing account. |
| Individual Learner | Maintain a private, organized view of skills and learning goals. |
| Individual Learner | Understand progress through skill-level details and dashboard summaries. |

## 6. Boundary and Security Rules

- All skill data belongs to an authenticated user.
- The backend, not merely the frontend, enforces authentication and data ownership.
- An unauthenticated visitor cannot access protected operations.
- A user cannot read, update, or delete another user's skills by changing an identifier or request.
- Users can select only categories from the application's built-in category list in the MVP.
- Logging out ends the user's authenticated access according to the authentication mechanism selected during technical design.

## 7. Assumptions and Open Questions

- **Authentication mechanism:** session-based or token-based authentication remains open for Phase 3.
- **Account recovery:** password reset and email verification are not currently in the MVP requirements.
- **Built-in category catalogue:** the exact category names and whether the catalogue is static or stored as reference data will be decided during technical/data design.
- **Skill deletion:** deleting a skill removes it from the active list; retention or soft-delete behavior has not been specified and should be clarified during technical design if needed.
- **Dashboard wording:** “completed skill” means a skill whose learning-goal progress is 100%, not a claim that the user's overall proficiency is Expert.

## 8. Review Checklist

- [ ] Confirm the actor list is sufficient for the MVP.
- [ ] Confirm the system boundary does not accidentally include post-MVP features.
- [ ] Resolve or carry forward the open questions into the relevant later phase.
- [ ] After review, use this document as the basis for the use case diagram.
