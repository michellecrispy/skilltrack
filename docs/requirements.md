# Requirements

**Status:** Draft — subject to refinement during use-case and technical design.

## 1. Functional Requirements

Priority meanings: **Must** = required for the MVP; **Should** = planned if capacity allows; **Could** = optional future enhancement.

| ID | Requirement | Priority |
| --- | --- | --- |
| FR-01 | A visitor can register with a name, email, and password. | Must |
| FR-02 | A registered user can log in and log out. | Must |
| FR-03 | A user can access only their own private data. | Must |
| FR-04 | Unauthenticated visitors cannot access protected application pages or API operations. | Must |
| FR-05 | A user can create a skill. | Must |
| FR-06 | A user can list and view the details of their own skills. | Must |
| FR-07 | A user can edit their own skills. | Must |
| FR-08 | A user can delete their own skills. | Must |
| FR-09 | A user can assign a category to a skill by choosing from the application's built-in category list; users cannot create or manage categories. | Must |
| FR-10 | A user can set current and target proficiency levels. | Must |
| FR-11 | A user can record a learning goal and optional deadline. | Must |
| FR-12 | A user can search skills by name and filter by built-in category. | Must |
| FR-13 | A user can update learning-goal progress as a percentage. | Must |
| FR-14 | A user can view progress for each skill. | Must |
| FR-15 | A dashboard displays total active skills, completed skills, and average progress across active skills. | Must |

Search and category filtering are required MVP features. Learning-resource links and historical progress are tracked separately as post-MVP candidates and are not required for MVP completion.

## 2. Post-MVP Candidates

These items are intentionally excluded from the MVP. Their IDs are retained for traceability if they are revisited later.

| ID | Requirement | Status |
| --- | --- | --- |
| FR-16 | A user can review historical progress changes. | Post-MVP candidate |
| FR-17 | A user can save learning-resource links for a skill. | Post-MVP candidate |
| FR-18 | A user can edit or delete saved resource links. | Post-MVP candidate |

## 3. Non-Functional Requirements

| ID | Requirement |
| --- | --- |
| NFR-01 | Passwords must be securely hashed; secrets must be stored in environment variables; authorization must be enforced by the backend. |
| NFR-02 | The application must present clear error states and avoid accidental data loss during ordinary UI errors. |
| NFR-03 | UI, API, data models, and business logic should be organized to support maintainability. |
| NFR-04 | Forms must provide understandable validation feedback and the interface should work on desktop and mobile screens. |
| NFR-05 | Core business rules and important API flows must have automated tests. |
| NFR-06 | Setup and deployment configuration must be documented separately from application code. |
| NFR-07 | Common CRUD operations should target a response time under one second in a documented test environment; this is a goal to validate, not a guarantee. |

## 4. Business Rules

- **BR-01 — Data ownership:** every skill belongs to a user. The backend must verify ownership for reads, updates, and deletes. Guessing or changing an identifier must not expose another user's data.
- **BR-02 — Separate measures:** proficiency level represents a user's self-assessed skill level; progress represents completion of a learning goal. One must not be automatically inferred from the other.
- **BR-03 — Progress range:** progress must be an integer from 0 through 100 inclusive. The backend rejects invalid values.
- **BR-04 — Deadline:** a deadline is optional and, when supplied, must be a valid date. An overdue deadline does not automatically mark a skill as failed or completed.
- **BR-05 — Password storage:** passwords must never be stored in plaintext.
- **BR-06 — Dashboard calculations:** total active skills is the count of a user's active skills; completed skills have progress equal to 100%; average progress is the arithmetic mean of progress values for the user's active skills.
- **BR-07 — Empty state:** when a user has no active skills, the dashboard must show a helpful empty state rather than misleading statistics.
- **BR-08 — Built-in categories:** each skill uses a category selected from the application's built-in category list. Users cannot create, edit, or delete categories in the MVP.

## 5. Proficiency Levels

The initial levels are:

1. Beginner
2. Intermediate
3. Advanced
4. Expert

Current and target levels use the same scale. Progress percentage remains an independent measure.

## 6. Acceptance Criteria

- A valid registration creates an account, and its password is not stored in plaintext.
- Valid credentials establish an authenticated session or token according to the selected authentication design.
- The backend rejects progress values outside 0–100 and rejects non-integer progress values.
- A valid skill is persisted and appears in the owner's skill list.
- A user can assign a skill only to a category available in the built-in category list.
- Search returns matching skills by name, and category filtering returns only skills in the selected category; both operate only on the authenticated user's skills.
- Updating progress changes the skill detail and dashboard summaries correctly.
- The dashboard displays total active skills, completed skills (progress = 100%), and average progress for active skills.
- A user cannot read, update, or delete another user's skill, including by changing an identifier.
- Deleting a skill removes it from the active list and updates dashboard statistics.
- A user with no skills sees a clear empty state.
- Deployed data persists across application restarts according to the selected hosting and storage configuration.

## 7. MVP Definition of Done

- All Must requirements are implemented and tested.
- Per-account data isolation is enforced by the backend.
- Loading, error, validation, and empty states are handled.
- Setup instructions and required environment variables are documented.
- The application runs locally and can be demonstrated on a verified deployment.
