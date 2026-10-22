# Phase 2.3 — Use Case Descriptions

**Status:** Updated for review  
**Related documents:** [Actors and System Boundary](01-actors-and-system-boundary.md), [Use Case Diagram](02-use-case-diagram.md), [Requirements](../requirements.md), [Decision Log](../decisions.md)

This document describes the MVP use cases. The create/edit skill form groups category, current proficiency, target proficiency, learning goal, and optional deadline in one form. Learning progress is tracked separately as an integer percentage from 0 to 100.

## UC-01 — Register

**Primary actor:** Unauthenticated Visitor  
**Preconditions:** The visitor does not have an active authenticated session.  
**Main flow:**
1. The visitor opens the registration page.
2. The visitor enters the required registration details.
3. SkillTrack validates the input and checks that the account can be created.
4. SkillTrack securely stores the account credentials, with the password hashed.
5. SkillTrack confirms successful registration and directs the visitor to the login page. The visitor must log in separately; registration does not automatically establish an authenticated session.
**Alternate flows:** Required fields are missing or invalid; the email/account identifier is already registered; registration fails due to a server error. SkillTrack explains the problem without exposing sensitive details.  
**Postconditions:** A new account exists, but the visitor remains unauthenticated until they complete the login flow.

## UC-02 — Log in

**Primary actor:** Unauthenticated Visitor or Individual Learner  
**Preconditions:** The visitor has a registered account and is not currently authenticated.  
**Main flow:**
1. The visitor enters their login credentials.
2. SkillTrack validates the credentials.
3. SkillTrack establishes an authenticated session using the strategy selected during technical design.
4. The user is taken to the authenticated area.
**Alternate flows:** Credentials are incorrect, required fields are missing, or authentication is temporarily unavailable. The user receives a clear, non-sensitive error.  
**Postconditions:** On success, the user has an authenticated session; on failure, no authenticated session is established.

## UC-03 — Log out

**Primary actor:** Individual Learner  
**Preconditions:** The learner is authenticated.  
**Main flow:**
1. The learner chooses Log out.
2. SkillTrack invalidates or terminates the current session according to the selected authentication strategy.
3. SkillTrack returns the user to a public page or login screen.
**Alternate flows:** If the session has already expired, SkillTrack treats the user as unauthenticated and directs them to log in if needed.  
**Postconditions:** The session can no longer be used to access protected resources.

## UC-04 — Create skill

**Primary actor:** Individual Learner  
**Preconditions:** The learner is authenticated.  
**Main flow:**
1. The learner opens the create-skill form.
2. The learner enters a skill name and selects a built-in category.
3. The learner selects current and target proficiency levels.
4. The learner enters a learning goal and, optionally, a deadline.
5. The learner submits the form.
6. SkillTrack validates the data and creates the skill for the authenticated user with progress initialized to 0%.
7. SkillTrack confirms creation and displays the new skill.
**Alternate flows:** Required values are missing, a value is invalid, or saving fails. The form preserves entered values where practical and shows actionable feedback.  
**Postconditions:** The new skill belongs to the authenticated learner and is not visible to other users.

## UC-05 — View skill list and details

**Primary actor:** Individual Learner  
**Preconditions:** The learner is authenticated.  
**Main flow:**
1. The learner opens the skills area.
2. SkillTrack displays only skills owned by the authenticated learner.
3. The learner opens a skill to inspect its details.
**Alternate flows:** If no skills exist, SkillTrack shows an empty state and a clear way to add the first skill. If the requested skill does not belong to the learner or does not exist, SkillTrack does not disclose it and returns an appropriate not-found or access response.  
**Postconditions:** The learner can inspect their own skills without changing data.

## UC-06 — Edit skill

**Primary actor:** Individual Learner  
**Preconditions:** The learner is authenticated and the skill belongs to them.  
**Main flow:**
1. The learner opens a skill and chooses Edit.
2. SkillTrack displays the current values.
3. The learner updates one or more fields in the same form: name, built-in category, current/target proficiency, learning goal, or optional deadline.
4. The learner submits the changes.
5. SkillTrack validates and saves the updated values after checking ownership.
6. SkillTrack displays the updated skill.
**Alternate flows:** Validation fails, the skill no longer exists, ownership check fails, or saving fails. SkillTrack shows appropriate feedback without exposing another user's data.  
**Postconditions:** The skill is updated only if validation and ownership checks succeed. Progress remains a separate field and is not automatically inferred from proficiency.

## UC-07 — Delete skill

**Primary actor:** Individual Learner  
**Preconditions:** The learner is authenticated and the skill belongs to them.  
**Main flow:**
1. The learner chooses Delete for a skill.
2. SkillTrack asks for confirmation to prevent accidental deletion.
3. The learner confirms.
4. SkillTrack checks ownership and deletes the skill.
5. SkillTrack refreshes the list and confirms the result.
**Alternate flows:** The learner cancels; the skill is missing; ownership fails; or deletion fails. No deletion occurs when the learner cancels or authorization fails.  
**Postconditions:** The selected skill is deleted only from the owning learner's data.

## UC-08 — Choose built-in category

**Primary actor:** Individual Learner  
**Preconditions:** The learner is authenticated and creating or editing a skill.  
**Main flow:**
1. SkillTrack displays the available built-in categories.
2. The learner selects one category.
3. SkillTrack validates that the selected category is supported.
**Alternate flows:** No category is selected when one is required, or an unsupported category value is submitted. SkillTrack asks for a valid selection.  
**Postconditions:** The skill references a valid built-in category. Users cannot create, edit, or delete category definitions in the MVP.

## UC-09 — Set proficiency levels

**Primary actor:** Individual Learner  
**Preconditions:** The learner is authenticated and creating or editing a skill.  
**Main flow:**
1. SkillTrack offers Beginner, Intermediate, Advanced, and Expert.
2. The learner selects current proficiency and target proficiency.
3. SkillTrack validates the selected values and saves them with the skill.
**Alternate flows:** A value is missing or outside the allowed set. SkillTrack asks the learner to correct it.  
**Postconditions:** Current and target proficiency are stored separately from progress percentage.

## UC-10 — Set learning goal and optional deadline

**Primary actor:** Individual Learner  
**Preconditions:** The learner is authenticated and creating or editing a skill.  
**Main flow:**
1. The learner enters a learning goal.
2. The learner may set a target deadline.
3. SkillTrack validates and saves the goal and optional deadline.
**Alternate flows:** The goal is missing or invalid, or the deadline is invalid. SkillTrack explains what needs correction.  
**Postconditions:** The skill stores its learning goal and optional deadline. An overdue deadline does not automatically mark the skill as failed or completed.

## UC-11 — Update learning progress

**Primary actor:** Individual Learner  
**Preconditions:** The learner is authenticated and the skill belongs to them.  
**Main flow:**
1. The learner opens a skill and changes its progress value.
2. The learner enters an integer from 0 to 100.
3. SkillTrack validates the value and ownership.
4. SkillTrack saves and displays the new progress.
**Alternate flows:** The value is not an integer in the allowed range, the skill is unavailable, or saving fails. SkillTrack shows an error and does not save invalid data.  
**Postconditions:** Progress is updated independently of proficiency. A skill counts as completed when progress equals 100%.

## UC-12 — Search skills by name

**Primary actor:** Individual Learner  
**Preconditions:** The learner is authenticated and is viewing the skills area.  
**Main flow:**
1. The learner enters a search term.
2. SkillTrack searches the learner's own skills by skill name.
3. SkillTrack displays matching skills.
**Alternate flows:** No skills match; SkillTrack displays a no-results state and allows the learner to clear or change the query.  
**Postconditions:** Search does not modify skill data and never returns another user's skills.

## UC-13 — Filter skills by category

**Primary actor:** Individual Learner  
**Preconditions:** The learner is authenticated and is viewing the skills area.  
**Main flow:**
1. The learner selects a built-in category filter.
2. SkillTrack displays the learner's skills in that category.
3. The learner may clear the filter to view all their skills.
**Alternate flows:** No skills match the selected category; SkillTrack displays a no-results state.  
**Postconditions:** Filtering does not modify skill data and is scoped to the authenticated learner.

## UC-14 — View dashboard summaries

**Primary actor:** Individual Learner  
**Preconditions:** The learner is authenticated.  
**Main flow:**
1. The learner opens the dashboard.
2. SkillTrack calculates and displays exactly three core statistics: total active skills, completed skills (progress equals 100%), and arithmetic average progress across the learner's skills.
3. SkillTrack handles the zero-skill case without dividing by zero.
**Alternate flows:** If the learner has no skills, SkillTrack displays 0 active skills, 0 completed skills, and 0% average progress. The calculation must handle this case without dividing by zero.  
**Postconditions:** The learner sees a summary of only their own data. Charts and advanced analytics are outside the MVP.

## Cross-cutting rules

- Every protected skill operation must authenticate the user and enforce server-side ownership.
- Client-side filtering or hiding is not a substitute for backend authorization.
- Invalid input must be rejected by the backend as well as handled clearly by the UI.
- Loading, empty, error, and success states should be defined for the relevant screens.
- Account recovery, password reset, email verification, AI features, external learning-resource integrations, charts, and advanced analytics are outside the MVP.
