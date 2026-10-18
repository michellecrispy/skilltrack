# Project Scope

## 1. Project Summary

SkillTrack is a personal skill development tracker. It helps an individual learner organize skills, define learning goals, choose a target proficiency level, and monitor progress toward those goals.

## 2. Problem Statement

Learners often manage skill goals across separate notes, spreadsheets, and learning platforms. This can make it difficult to see what they are learning, what level they are aiming for, and how much progress they have made.

SkillTrack aims to consolidate this information into a simple, private dashboard.

## 3. Goals

- Provide one place to manage personal skills.
- Let users record current and target proficiency levels.
- Connect each skill to a learning goal and optional deadline.
- Track learning-goal completion from 0% to 100%.
- Summarize skill and progress information on a dashboard.
- Demonstrate sound software engineering practices in a public portfolio project.

## 4. Target Users

The initial target user is an individual learner, such as a university student, self-learner, or early-career professional.

The MVP supports separate private accounts. It does not include teams, mentors, shared workspaces, or social features.

## 5. MVP Scope

### Included

- Registration, login, and logout
- User-owned skill CRUD
- Built-in skill categories selected from an application-provided list; users cannot create or manage categories
- Current and target proficiency levels: Beginner, Intermediate, Advanced, Expert
- Learning goal and optional deadline
- Progress percentage between 0 and 100
- Dashboard with total active skills, completed skills, and average progress
- Search by skill name and filter by built-in category; both are required for the MVP
- Validation, error states, and per-user data isolation
- Automated tests for core behavior
- Setup and deployment documentation

### Excluded from the MVP

- AI-based recommendations
- Integrations with external course platforms
- Learning-resource link management (candidate for a later iteration)
- Gamification, badges, and leaderboards
- Teams, mentors, and social features
- Progress history and advanced analytics
- Native mobile application

## 6. Product Rules

- Proficiency level and learning-goal progress are separate concepts.
- Progress is represented as an integer from 0 to 100.
- A deadline is optional.
- An overdue deadline does not automatically mean a goal has failed.
- Dashboard summaries are calculated from the user's active skills only.
- A skill with 100% progress counts as completed.
- The dashboard displays three core statistics: total active skills, completed skills, and average progress across active skills.
- When a user has no active skills, the dashboard shows a helpful empty state instead of misleading statistics.
- Skill categories are selected from a built-in list; user-created categories are outside the MVP.

## 7. Technology Direction

- Frontend: React
- Backend: Python with FastAPI
- Initial database: SQLite
- Version control and project documentation: Git and GitHub

The final authentication approach and deployment provider will be selected during technical design. The deployment environment must provide persistent data storage; PostgreSQL may be preferable if SQLite persistence cannot be guaranteed.

## 8. Success Criteria

The MVP will be considered successful when a user can securely create an account, manage their own skills, search and filter their skills, update progress, and see correct dashboard summaries, with core behavior tested and deployment instructions documented.

## 9. Scope Change Policy

New ideas should be recorded and evaluated against the MVP goals. Features that materially increase complexity should be considered for a later iteration rather than silently added to the MVP.
