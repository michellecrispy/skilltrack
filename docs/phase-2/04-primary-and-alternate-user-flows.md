# Phase 2.4 — Primary and Alternate User Flows

**Status:** Reviewed and accepted for MVP scope  
**Related documents:** [Actors and System Boundary](01-actors-and-system-boundary.md), [Use Case Diagram](02-use-case-diagram.md), [Use Case Descriptions](03-use-case-descriptions.md), [Requirements](../requirements.md)

This document maps the main journeys through the SkillTrack MVP. These flows validate navigation and expected behavior before wireframes and technical design begin.

## Flow 1 — Register, then log in

**Primary flow**
1. Visitor opens the registration page.
2. Visitor completes the required fields and submits.
3. SkillTrack validates the details and creates the account.
4. SkillTrack confirms registration and directs the visitor to the login page.
5. Visitor enters their credentials and submits.
6. SkillTrack validates the credentials and establishes an authenticated session.
7. SkillTrack directs the learner to the authenticated dashboard.

**Alternate flows**
- Registration input is missing or invalid: show field-level guidance and keep the visitor on the registration page.
- Account identifier is already registered: explain that the account cannot be created with those details and provide a route to login.
- Login credentials are incorrect: show a non-sensitive error and allow retry.
- Registration or login service is unavailable: show an error and allow the user to retry later.

## Flow 2 — Create a skill

**Primary flow**
1. Authenticated learner opens the skills area.
2. Learner selects Add Skill.
3. SkillTrack displays the create-skill form.
4. Learner enters the skill name, selects a built-in category, selects current and target proficiency, enters a learning goal, and optionally chooses a deadline.
5. Learner submits the form.
6. SkillTrack validates the fields and creates the skill with progress initialized to 0%.
7. SkillTrack confirms success and displays the new skill.

**Alternate flows**
- Required data is missing or invalid: show actionable validation messages and do not create the skill.
- Save fails: preserve entered values where practical and allow retry.
- The session has expired: require the learner to log in again; do not create the skill until authenticated.

## Flow 3 — View, edit, and delete a skill

**Primary flow**
1. Learner opens the skills list.
2. SkillTrack displays only skills owned by that learner.
3. Learner selects a skill to view details.
4. To edit, learner selects Edit, updates fields, and submits.
5. SkillTrack validates input and ownership, saves changes, and displays the updated skill.
6. To delete, learner selects Delete.
7. SkillTrack displays a confirmation dialog.
8. If the learner confirms, SkillTrack validates ownership and deletes the skill, then refreshes the list.

**Alternate flows**
- Learner cancels the delete confirmation: close the dialog and keep the skill unchanged.
- A requested skill is missing or belongs to another user: do not disclose the other user's data; show an appropriate not-found/access response.
- Edit validation or save fails: show errors and do not apply invalid changes.
- Delete operation fails: keep the list consistent and show an error.

## Flow 4 — Update learning progress

**Primary flow**
1. Learner opens one of their skills.
2. Learner updates the progress percentage.
3. SkillTrack validates that the value is an integer from 0 to 100 and checks ownership.
4. SkillTrack saves and displays the updated progress.
5. If progress reaches 100%, the skill counts as completed.

**Alternate flows**
- Progress is outside 0–100 or not an integer: reject the value and show validation feedback.
- Save fails or the session expires: do not report success; show an appropriate error or request login.

## Flow 5 — Search and filter skills

**Primary flow**
1. Learner opens the skills list.
2. Learner enters a name query, selects a built-in category filter, or uses both.
3. SkillTrack displays only the learner's skills that match the active criteria.
4. Learner clears the query or filter to return to a broader list.

**Alternate flows**
- No skills match: show a no-results state and let the learner change or clear the criteria.
- No skills have been created yet: show the empty state and a clear Add Skill action.
- Search/filter request fails: show an error without exposing data from other accounts.

## Flow 6 — View dashboard

**Primary flow**
1. Authenticated learner opens the dashboard.
2. SkillTrack calculates statistics from that learner's skills only.
3. Dashboard displays exactly three core statistics: total active skills, completed skills (progress = 100%), and average progress.
4. Average progress is the arithmetic mean of the learner's skill progress percentages.

**Alternate flows**
- Learner has no skills: show 0 active skills, 0 completed skills, and 0% average progress; avoid division by zero.
- Dashboard data cannot be loaded: show a clear error or retry state rather than presenting stale values as current.

## Cross-flow rules

- All protected flows require authentication.
- Backend authorization must enforce skill ownership for reads and writes; frontend hiding alone is insufficient.
- Registration and login are separate actions; registration does not automatically sign the user in.
- The delete flow requires explicit confirmation.
- Skill progress is independent of proficiency.
- Overdue deadlines do not automatically mean a skill failed or completed.
- Password reset, account recovery, email verification, charts, advanced analytics, and external learning-resource integrations are outside the MVP.

## Review checklist

- [x] Confirm the primary journeys match the accepted use case descriptions.
- [x] Confirm alternate flows cover validation, empty states, service failures, and expired sessions where relevant.
- [x] Confirm ownership and authentication rules apply consistently.
- [x] Confirm no flow introduces features outside the MVP scope.
