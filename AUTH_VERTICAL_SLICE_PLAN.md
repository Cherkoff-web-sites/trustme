# Auth Vertical Slice Plan

## Goal

Add a minimal but coherent auth layer without mixing it into the completed UI refactor.

## Scope

- `src/context/AuthContext.tsx`
- `src/components/shared/ProtectedRoute.tsx`
- `src/pages/Auth/LoginPage.tsx`
- `src/pages/Auth/RegisterPage.tsx`
- `src/App.tsx`
- `src/main.tsx`
- `src/components/layout/Header/Header.tsx`

## Phase 1. Session Model

- Introduce `AuthContext` with:
  - `isAuthenticated`
  - `user`
  - `loading`
  - `login()`
  - `logout()`
  - `register()`
- Persist a minimal mock session in `localStorage`.
- Bootstrap the session on app start inside the provider.

## Phase 2. Route Split

- Keep `/auth/login` and `/auth/register` public.
- Wrap cabinet routes with `ProtectedRoute`.
- Preserve attempted URL through redirect state.
- Redirect authenticated users from `/` to `/cabinet`.
- Redirect unauthenticated users from private URLs to `/auth/login`.

## Phase 3. UI Integration

- Add auth pages using the existing UI layer:
  - `PageTitle`
  - `Input`
  - `Button`
  - `SectionCard`
- Update `Header` to read current user from auth context.
- Replace hardcoded account email in `Header` with context data.
- Add logout action in `Header` or account menu area.

## Phase 4. Expected Flows

1. User opens `/cabinet` without session.
2. `ProtectedRoute` redirects to `/auth/login` and stores attempted location.
3. User logs in.
4. App restores session, then redirects to attempted route or `/cabinet`.
5. User logs out.
6. Session is removed and app redirects back to `/auth/login`.

## Non-Goals

- Real backend auth API
- Token refresh flow
- Permission/role model
- Recovery/reset password workflow
- Full account management wiring for `SettingsPage`

## Risks

- `Header` and `SettingsPage` still contain placeholder user-facing data, so auth introduction should start by wiring display state, not by expanding account-edit behavior.
- Private/public layout split is the main routing change; keep it minimal in the first pass.
- Do not expand auth into API integration until redirect/session behavior is stable.
