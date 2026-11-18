# Phase 3.5 — UI Wireframes and Responsive Behavior

**Status:** Draft for review  
**Scope:** MVP React browser interface, based on accepted Phase 3.1–3.4 contracts. This is a low-fidelity structure, not final visual styling.

## 1. Navigation and screen inventory

Unauthenticated users access **Register** and **Login** as separate screens. Registration success redirects to Login, not Dashboard. Authenticated users land on **Dashboard**, then navigate to **My Skills**, **Skill Detail**, and **Create/Edit Skill**. Logout returns to Login.

No profile management, charts, resource links, social features, or advanced analytics in the MVP.

## 2. Low-fidelity desktop layouts

### Login / Register
```text
+--------------------------------------------------+
| SkillTrack                                       |
|             Welcome back / Create account        |
|             [Name — register only]               |
|             [Email]                              |
|             [Password]                           |
|             [Submit]                             |
|             Link to Register / Login              |
|             Inline field and form errors         |
+--------------------------------------------------+
```

### Dashboard
```text
+--------------------------------------------------+
| SkillTrack | Dashboard | My Skills | Logout       |
+--------------------------------------------------+
| Welcome back                                     |
| [Active skills] [Completed skills] [Avg progress]|
|                                                  |
| [View My Skills]             [+ Add Skill]        |
| Empty state when no skills: start by adding one  |
+--------------------------------------------------+
```

### My Skills
```text
+--------------------------------------------------+
| SkillTrack | Dashboard | My Skills | Logout       |
+--------------------------------------------------+
| My Skills                          [+ Add Skill] |
| [Search skill name____] [Category dropdown____]  |
|                                                  |
| [Skill name | Category | Progress | View]        |
| [Skill name | Category | Progress | View]        |
|                                                  |
| [Previous] Page N [Next]                         |
+--------------------------------------------------+
```

### Skill Detail
```text
+--------------------------------------------------+
| My Skills > Skill name                           |
| Skill name                         [Edit] [Delete]|
| Category · Current level · Target level          |
| Goal                                             |
| Deadline (or Not set) · Progress (0–100%)        |
| [Progress bar]                                   |
+--------------------------------------------------+
```

### Create / Edit Skill
```text
+--------------------------------------------------+
| Create Skill / Edit Skill                        |
| [Name*] [Category*]                              |
| [Current level*] [Target level*]                 |
| [Learning goal* multiline]                       |
| [Deadline optional] [Progress 0–100, default 0] |
| [Cancel] [Save]                                  |
| Field-level errors; save only after API success  |
+--------------------------------------------------+
```

Delete requires a confirmation dialog naming the skill and clearly stating that deletion is permanent. Cancel is the safe default. No optimistic deletion before API success.

## 3. Responsive behavior

- **Desktop (>= 1024px):** horizontal navigation, three dashboard statistic cards in one row, skill list as a readable table/list, forms with a comfortable max-width.
- **Tablet (768–1023px):** navigation remains usable; statistic cards may wrap; skill rows adapt to available width.
- **Mobile (< 768px):** stacked navigation or compact menu; three statistic cards stack; search/filter controls stack; skills become vertically arranged cards; forms and primary actions are full-width when helpful.
- Avoid horizontal page overflow at 320px viewport width. Keep touch targets comfortably sized, labels visible, keyboard focus clear, and color contrast readable.
- These breakpoints are design defaults for review, not hard implementation requirements.

## 4. State and interaction contracts

- **Loading:** show a visible loading indicator/skeleton for requests; disable duplicate submits while saving.
- **Empty:** dashboard displays 0 active, 0 completed, 0% average; My Skills offers Add Skill.
- **No search results:** distinguish from an account with no skills; allow clearing search/filter.
- **Errors:** show safe API error messages and field errors without discarding entered form values.
- **Unauthorized (401):** clear authenticated UI state and prompt login; do not silently replay a failed write.
- **Session/CSRF:** fetch authenticated user and CSRF token via `GET /auth/me`; attach token to protected writes as specified in Phase 3.4.
- **Search/filter:** combine case-insensitive skill-name search and built-in category filter; reset pagination to page 1 when either changes; show 20 items by default.
- **Skill progress:** show numeric percent and visual bar; progress 100% is completed regardless of proficiency.
- **Deadline:** optional; a past deadline is not automatically marked failed.
- **Create/Edit:** required fields and 120/2,000-character limits match API; registration password 8–128 characters; client validation supplements backend validation.
- **Delete:** confirmation required; show success only after server confirms; handle 404 and network errors.
- **Accessibility:** semantic labels, keyboard-operable controls and dialog, focus management, meaningful validation feedback, and no color-only status cues.

## 5. Design decisions for review

1. Approve the **Modern Minimalist Dashboard** visual direction.
2. Approve desktop top navigation and compact mobile navigation.
3. Approve skill list/table on desktop and cards on mobile.
4. Approve separate detail and create/edit screens rather than modals.
5. Approve confirmation dialog for permanent deletion and the described empty/loading/error states.

## 6. Acceptance checklist

- [ ] All MVP screens and navigation paths are reviewed.
- [ ] Desktop/tablet/mobile behavior is reviewed.
- [ ] Forms, search/filter/pagination, and delete confirmation are reviewed.
- [ ] Accessibility and error/empty/loading behavior are reviewed.
- [ ] No post-MVP features were introduced.
