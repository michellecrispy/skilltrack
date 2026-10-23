# Phase 3.3 — Authentication Strategy

**Status:** Proposed for review  
**Scope:** MVP registration, login, logout, browser session, and request protection. Password recovery, email verification, and third-party sign-in remain out of scope.

## Recommendation

Use a server-managed session identified by a cryptographically random opaque token in an HTTP-only cookie. This fits the React browser client and FastAPI backend without exposing bearer tokens to JavaScript or adding a separate access-token/refresh-token lifecycle.

## Account credentials

- Normalize email by trimming surrounding whitespace and comparing case-insensitively, as accepted in Phase 3.2.
- Hash passwords with a password-hashing algorithm intended for password storage; never encrypt or store plaintext passwords.
- Use generic login errors so the response does not reveal whether an email address has an account.
- Apply reasonable request limits to registration and login to slow automated guessing.

## Session lifecycle

1. After valid credentials, create a cryptographically random session token.
2. Store only a one-way hash of that token with the user ID, creation time, and expiration time in a `UserSession` persistence record. The raw token is sent only in the cookie.
3. On each protected request, hash the presented token, find a matching unexpired session, and load its user identity. Then scope all data access to that user.
4. On logout, revoke/delete the current session record and clear the cookie.
5. Expired sessions are rejected and may be cleaned up periodically.

A server-side session record supports logout/revocation and avoids placing identity or authorization data in a client-readable token. It adds one small persistence entity to the Phase 3.2 model.

## Cookie and browser protections

- Set `HttpOnly` and `SameSite=Lax`; use `Secure` in HTTPS environments. Allow the local HTTP development configuration to disable `Secure` only for localhost.
- Use a narrow cookie path and avoid setting a broad parent-domain cookie unless deployment topology requires it.
- Set an explicit session lifetime. Recommendation for review: seven days of inactivity, refreshed after successful authenticated use, with revocation on logout.
- Protect state-changing requests with a CSRF token and validate the request origin. SameSite is defense in depth, not the only CSRF control.
- Configure CORS with explicit trusted frontend origins and credentials only when the frontend and API are cross-origin. Never combine credentialed requests with a wildcard origin.
- Use HTTPS in production.

## Password and session storage

The session record should contain: UUID ID, user UUID foreign key, token hash (unique), created timestamp, expiry timestamp, and optional last-seen timestamp. Index the token hash and user ID; delete sessions when their user is permanently deleted. Use database migrations and the existing persistence layer/ORM.

## Decisions still needed

- Approve or change the server-managed cookie session recommendation.
- Approve the proposed seven-day inactivity lifetime.
- Confirm the React frontend and FastAPI API will be served from same-site origins in production if known; otherwise retain explicit CORS and CSRF protections for cross-origin deployment.

## Acceptance checklist

- [ ] Session strategy and lifetime are accepted.
- [ ] Cookie, CSRF, and CORS safeguards are accepted.
- [ ] Session persistence fields and user-deletion behavior are accepted.
