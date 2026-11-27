# Phase 3.5 — UI Wireframes and Responsive Behavior

**Status:** Accepted for MVP scope  
**Scope:** Responsive React browser UI, aligned with accepted Phases 3.1–3.4. Wireframes define layout and behavior; pixel-perfect visuals and implementation are not yet complete.

## 1. Accepted visual direction — Soft Productivity

- Light neutral background, sage green and soft blue accents, limited peach accents, dark readable text, rounded cards, restrained shadows, and consistent spacing.
- Suggested starting tokens: background `#F8FAF8`, sage `#E5EFE7`, sky `#DCE8FA`, peach `#F5E4DF`, primary text `#344B42`. These are design starting points; check contrast before implementation.
- Use high-contrast primary buttons and visible keyboard focus. Pastel colors are decorative and must not be the sole carrier of status.
- No charts, gamification, resources, account-profile editor, or advanced analytics in the MVP.

## 2. Screens, routes, and navigation

| Screen       | Proposed frontend route | Access              | Primary behavior                                                                             |
| ------------ | ----------------------- | ------------------- | -------------------------------------------------------------------------------------------- |
| Login        | `/login`                | Guest               | Email/password, submit; redirect to Dashboard on success                                     |
| Register     | `/register`             | Guest               | Name/email/password; on success redirect to Login with confirmation, **not** automatic login |
| Dashboard    | `/dashboard`            | Authenticated       | Exactly three summary statistics, My Skills and Add Skill actions                            |
| My Skills    | `/skills`               | Authenticated       | Search, category filter, paginated list, Add Skill                                           |
| Skill Detail | `/skills/:skillId`      | Authenticated owner | Full skill information, Edit, Delete                                                         |
| Create Skill | `/skills/new`           | Authenticated       | Separate full-page form                                                                      |
| Edit Skill   | `/skills/:skillId/edit` | Authenticated owner | Separate full-page prefilled form                                                            |

These are frontend route conventions; backend API paths remain under `/api/v1`. Unauthenticated access to protected pages redirects to Login; after successful login, return to a safe local intended route if available, otherwise Dashboard. Authenticated users navigating to Login/Register go to Dashboard. Invalid/non-owned skill IDs show a non-disclosing Not Found state with a route back to My Skills.

### Desktop authenticated shell (>=1024px)

```text
+--------------------+--------------------------------------------+
| SkillTrack         | Page title / context                       |
|                    +--------------------------------------------+
| Dashboard          | Main content                               |
| My Skills          |                                            |
|                    | Dashboard: [Active] [Completed] [Average]  |
|                    | My Skills: [Search] [Category] [+ Add]     |
|                    |            [Skill table + pagination]      |
|                    | Detail:    [Fields + Edit + Delete]        |
| Logout             | Create/Edit: [Full-page form]              |
+--------------------+--------------------------------------------+
```

Sidebar contains Dashboard, My Skills, and Logout, with a visible active-page indicator. It is not a separate admin area. Auth screens use a centered single-column card without the authenticated sidebar.

### Mobile authenticated shell (<768px)

```text
+----------------------------------+
| SkillTrack          [Menu button] |
+----------------------------------+
| Page title                       |
| [Stacked content / skill cards]  |
| [Full-width actions as needed]   |
+----------------------------------+
```

The menu button opens a dismissible navigation panel with Dashboard, My Skills, and Logout. It has an accessible label, expanded state, focus management, Escape-to-close, and returns focus to the trigger. Navigation closes the panel. Avoid making Logout an accidental one-tap adjacent destructive action.

## 3. Screen-level wireframe contracts

### Login and Register

- Centered form, explicit field labels, password visibility toggle with accessible label, submit button, and reciprocal Login/Register link.
- Register has name, email, password; Login has email and password. Registration success navigates to Login with a non-sensitive confirmation.
- Display safe generic authentication errors; preserve email and name on failed submission, never persist password in localStorage.
- Password registration rule: 8–128 characters. Do not silently trim passwords. Field errors are associated with their inputs.

### Dashboard

- Exactly three core cards: total skills (count of all skill records), completed skills (progress 100%), and arithmetic average progress (one decimal when needed).
- For no skills: `0`, `0`, and `0%`, plus a clear Add Skill call to action.
- Show a Dashboard heading, View My Skills and Add Skill links. No extra analytics charts.

### My Skills

- Search by skill name, one built-in category dropdown, Add Skill action, and pagination.
- Desktop: accessible table with skill name, category, progress as number + bar, and View action; each item leads to its detail page.
- Mobile: one vertically stacked card per skill, with the same essential fields and View action; never hide information essential to choosing a skill.
- Search/filter may combine. Changing either resets page to 1. Default page size is 20; API maximum 100. Search query is capped at 120 characters.
- Keep filters in the URL query parameters (`q`, `category`, `page`) for predictable back-navigation. Debounce text search modestly and cancel/ignore stale requests.
- Distinguish zero skills from zero matching results; provide Clear filters action for the latter.
- Disable Previous/Next appropriately, show current page and total results; an out-of-range page returns an empty list and can offer navigation back to page 1.

### Skill Detail

- Show skill name, built-in category, current and target proficiency, learning goal, optional deadline (or Not set), progress percentage and progress bar, created/updated metadata where useful.
- Edit navigates to the separate Edit page. Delete opens a confirmation dialog that names the skill, explains permanent deletion, and defaults focus to Cancel.
- Cancel/Escape closes dialog without deletion; confirmation disables duplicate clicks while pending. After successful deletion, navigate to My Skills and show success. If API returns 404, show a safe not-found state; network failures keep the dialog/context recoverable.

### Create / Edit Skill

- Separate pages, not modals. Form fields: required name, category, current level, target level, learning goal; optional deadline; progress integer 0–100 (defaults to 0 for create).
- Name max 120 and learning goal max 2,000 characters after trimming. Category uses the 11 accepted built-in keys; proficiency uses four accepted keys.
- Edit loads existing data and shows loading/not-found/error states; a `null` deadline clears the value.
- Cancel returns to My Skills or the skill detail context when available, without saving; warn before discarding unsaved changes.
- Successful create navigates to the new Skill Detail; successful edit returns to the edited Skill Detail. Show success feedback only after confirmed API success.
- Preserve entered values and field-level messages on validation/network errors; disable repeated submit while pending.

## 4. Responsive layout contract

| Viewport          | Navigation                        | Dashboard            | Skill listing                           | Forms                                                |
| ----------------- | --------------------------------- | -------------------- | --------------------------------------- | ---------------------------------------------------- |
| Desktop >=1024px  | Persistent left sidebar           | Three cards in a row | Accessible table                        | Centered readable-width page                         |
| Tablet 768–1023px | Compact/collapsible navigation    | Cards wrap as needed | Table if it fits, otherwise card layout | Responsive single/two-column fields only if readable |
| Mobile <768px     | Menu button and dismissible panel | Three stacked cards  | Vertical cards                          | Single column, full-width primary action             |

- Support viewport widths down to 320px without page-level horizontal overflow.
- Use responsive container widths, flexible grids, text wrapping for long skill names/goals, and appropriate spacing.
- Touch targets aim for at least 44×44 CSS pixels where practical; preserve visible labels and meaningful focus indicators.
- Tables must not force the entire page to scroll horizontally. If insufficient room, switch to cards.
- Breakpoints are accepted layout guidance; precise CSS implementation may adapt to actual content while preserving behavior.

## 5. Interaction, API, and accessibility states

- **Initial authentication check:** `GET /auth/me` establishes session and supplies the CSRF token. While checking, show a non-flashing loading state rather than protected content.
- **Unauthorized (401):** clear authenticated UI and route to Login. Do not automatically replay failed writes. Expired-session logout still leaves the frontend signed out.
- **CSRF:** attach the accepted `X-CSRF-Token` header to protected state-changing API requests. A 403 displays an actionable failure without falsely reporting success.
- **Loading:** skeleton/spinner with accessible status for reads; disable duplicate form/delete submissions.
- **Empty:** dashboard and My Skills empty states include Add Skill. No-match search state includes Clear filters.
- **Success:** show confirmation only after API response; maintain context when navigating after create/edit/delete.
- **Errors:** use safe API messages, inline field errors, retry actions for failed reads, and retain user input after failed writes.
- **Progress:** show both text percent and visual bar; `100%` means completed independent of proficiency level.
- **Deadline:** past dates remain allowed; do not automatically label a skill failed.
- **Accessibility:** semantic headings, associated form labels, keyboard-operable navigation, accessible dialogs, focus trap/return for dialogs, focus on first invalid field or error summary, live-region feedback where appropriate, non-color-only indicators, and WCAG AA contrast targets (4.5:1 for normal text, 3:1 for large text and relevant UI indicators).

## 6. Review outcome

Accepted user decisions: **Soft Productivity**, **desktop sidebar**, **compact mobile menu**, **desktop table/mobile cards**, **separate Create/Edit pages**, and **loading/empty/error states, accessibility, and confirmation before permanent delete**. Tablet behavior, routes, success navigation, and edge states above are implementation-level clarifications consistent with these choices.

## 7. Acceptance checklist

- [x] All MVP screens and navigation paths are reviewed and specified.
- [x] Desktop/tablet/mobile behavior is reviewed and specified.
- [x] Forms, search/filter/pagination, and delete confirmation are reviewed and specified.
- [x] Accessibility and error/empty/loading behavior are reviewed and specified.
- [x] No post-MVP features were introduced.

**Acceptance note:** This approves the UI design contract only. Visual QA, responsive testing, accessibility verification, and implementation remain future tasks.
