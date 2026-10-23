# Phase 3.4 — API Specification

**Status:** Draft for review  
**Base path:** `/api/v1`  
**Format:** JSON over HTTPS in production. Authentication uses the accepted server-managed session cookie from Phase 3.3.

## 1. API conventions

- All protected endpoints require a valid session cookie. The backend derives the user identity from the session; clients must not submit an owner/user ID.
- Use UUIDs in URL paths and response bodies.
- Use ISO 8601 UTC timestamps and `YYYY-MM-DD` for deadline dates.
- Use JSON request/response bodies except for responses with no body.
- Validate requests in the backend. Never rely on frontend validation for security or data integrity.
- Return a consistent error body:
  ```json
  {
    "error": {
      "code": "validation_error",
      "message": "The request contains invalid fields.",
      "field_errors": {
        "progress": ["Must be an integer between 0 and 100."]
      }
    }
  }
  ```
  `field_errors` may be omitted when not applicable. Do not return stack traces or sensitive internals.

## 2. Endpoint summary

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| POST | `/auth/register` | No | Create an account; the user logs in separately. |
| POST | `/auth/login` | No | Verify credentials and start a session. |
| POST | `/auth/logout` | Yes | Revoke the current session and clear its cookie. |
| GET | `/auth/me` | Yes | Return the authenticated user's public account fields. |
| GET | `/categories` | No | Return the fixed built-in category catalogue. |
| GET | `/skills` | Yes | List the current user's skills; supports search, category filtering, and pagination. |
| POST | `/skills` | Yes | Create a skill for the current user. |
| GET | `/skills/{skill_id}` | Yes | Read one of the current user's skills. |
| PATCH | `/skills/{skill_id}` | Yes | Update supplied fields on one of the current user's skills. |
| DELETE | `/skills/{skill_id}` | Yes | Permanently delete one of the current user's skills. |
| GET | `/dashboard` | Yes | Return skill and progress summaries for the current user. |

## 3. Authentication endpoints

### POST `/auth/register`

Request:
```json
{
  "name": "Ayu",
  "email": "ayu@example.com",
  "password": "user-supplied secret"
}
```

Normalize email by trimming surrounding whitespace and comparing case-insensitively. Store only its normalized form for uniqueness/lookups and the original normalized display form as appropriate. Hash the password with a password-hashing algorithm. On success, create the account but do not start a session. Return public user fields, never a password or token. The user must log in separately.

Responses: `201 Created`, `409 Conflict` for an already registered normalized email, `422 Unprocessable Content` for invalid fields.

### POST `/auth/login`

Request:
```json
{ "email": "ayu@example.com", "password": "user-supplied secret" }
```

On success, create a new session and set the cookie. Use the same generic `401 Unauthorized` response for an unknown email and an incorrect password. Apply request limits.

### POST `/auth/logout`

Revoke only the current session, clear the cookie, and return `204 No Content`. Require CSRF protection and origin validation.

### GET `/auth/me`

Return the current user's `id`, `name`, and `email`. Never return password hashes or session tokens. Return `401 Unauthorized` when there is no valid session.

## 4. Categories

### GET `/categories`

Returns stable category keys and display labels. The accepted catalogue is:

- `technology` — Technology
- `languages` — Languages
- `arts-design` — Arts and Design
- `business-finance` — Business and Finance
- `communication` — Communication
- `education-academics` — Education and Academics
- `health-fitness` — Health and Fitness
- `sports` — Sports
- `culture-humanities` — Culture and Humanities
- `personal-development` — Personal Development
- `spirituality` — Spirituality

Users cannot create custom categories; there is no “Other” category. The backend rejects a skill with an unknown category key.

## 5. Skill endpoints

### Skill response

```json
{
  "id": "UUID",
  "name": "Python",
  "category": "technology",
  "current_level": "beginner",
  "target_level": "intermediate",
  "learning_goal": "Build a small API",
  "deadline": "2027-02-01",
  "progress": 25,
  "created_at": "2026-10-23T12:00:00Z",
  "updated_at": "2026-10-23T12:00:00Z"
}
```

The example dates illustrate formatting only. The API returns `deadline: null` when no deadline is set. Proficiency keys are `beginner`, `intermediate`, `advanced`, and `expert`.

### POST `/skills`

Accept `name`, `category`, `current_level`, `target_level`, `learning_goal`, and optional `deadline` and `progress`. The server sets `progress` to `0` when omitted, creates UUID/timestamps, and associates the skill with the authenticated user.

Return `201 Created` and the created skill.

### GET `/skills`

Optional query parameters:

- `q`: case-insensitive substring search on skill name.
- `category`: one built-in category key.
- `page`: 1-based page number, default `1`.
- `page_size`: number of results, default `20`, maximum `100`.

Search and category filtering may be combined. Apply both only to the authenticated user's records. Return:
```json
{
  "items": [],
  "page": 1,
  "page_size": 20,
  "total": 0
}
```

### GET `/skills/{skill_id}`

Return the skill if it belongs to the current user. Return `404 Not Found` both when it does not exist and when it belongs to another user, so the API does not disclose another user's records.

### PATCH `/skills/{skill_id}`

Accept any non-empty subset of editable fields: `name`, `category`, `current_level`, `target_level`, `learning_goal`, `deadline`, and `progress`. Omitted fields remain unchanged; explicit `deadline: null` clears the deadline. Reject unknown fields and an empty patch. Return the updated skill.

### DELETE `/skills/{skill_id}`

Permanently delete the skill if it belongs to the current user. Return `204 No Content`. Return `404 Not Found` for missing or non-owned records. Repeated deletion returns `404`.

## 6. Dashboard

### GET `/dashboard`

Return current-user-only statistics:
```json
{
  "total_skills": 3,
  "completed_skills": 1,
  "average_progress": 41.7
}
```

A skill is completed exactly when `progress = 100`. Average progress is the arithmetic mean across the user's skills, rounded to one decimal place. For an account with no skills, return zero for all three values; the frontend may show the approved empty state.

## 7. Validation rules

- `name`: trimmed, non-empty, with a proposed maximum of 120 characters.
- `email`: syntactically valid; trim surrounding whitespace; compare case-insensitively; enforce uniqueness after normalization.
- `password`: required at registration/login; never echo it in errors or responses. Exact length policy should be set during implementation, using a password-hashing library's supported limits.
- `category`: must be one of the stable built-in keys above.
- `current_level` and `target_level`: one of the four proficiency keys.
- `learning_goal`: non-empty, proposed maximum of 2,000 characters.
- `deadline`: `null` or a valid calendar date; a past date is allowed and does not imply failure.
- `progress`: integer from 0 through 100 inclusive; reject fractional numbers and numeric strings.
- Query page values must be positive integers; `page_size` must be between 1 and 100.
- Reject malformed UUIDs, unknown request fields, invalid JSON, and oversized payloads with clear validation errors.

The proposed text-length limits are API design defaults for review and can be adjusted before implementation.

## 8. Status codes

- `200 OK`: successful reads and updates.
- `201 Created`: account and skill creation.
- `204 No Content`: successful logout and deletion.
- `401 Unauthorized`: missing/invalid session or invalid login.
- `403 Forbidden`: failed CSRF/origin check.
- `404 Not Found`: unknown resource or resource not owned by the caller.
- `409 Conflict`: duplicate normalized email.
- `422 Unprocessable Content`: field or query validation error.
- `429 Too Many Requests`: configured authentication rate limit exceeded.

## 9. Security requirements

- Require authenticated sessions for all user data and dashboard endpoints.
- Derive user identity from the validated session and scope every query by that identity.
- Require CSRF token and validate request origin for state-changing cookie-authenticated requests.
- Configure credentialed CORS with explicit trusted origins only when frontend and API are cross-origin; never use wildcard origins with credentials.
- Do not expose raw session tokens, password hashes, or another user's data.
- Use HTTPS in production and set the cookie `Secure` flag there.

## 10. Review questions

- Confirm the endpoint set, pagination defaults, and response shapes.
- Confirm proposed name and learning-goal length limits.
- Confirm that empty-dashboard progress is returned as `0`.
- Registration creates the account without authenticating the user; a separate login request creates the session, as previously accepted.

## 11. Acceptance checklist

- [ ] Endpoint set covers MVP requirements without adding post-MVP features.
- [ ] Authentication/session behavior matches the accepted Phase 3.3 strategy and separate registration/login actions.
- [ ] Ownership, validation, error, and status-code rules are accepted.
- [ ] Category keys and dashboard calculations match accepted decisions.
