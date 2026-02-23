# Points Column in User Table — Design

**Date:** 2026-02-22

## Goal

Move the points adjustment UI out of the application review modal and into a dedicated column on the admin user table, with the current balance visible inline per row.

## Architecture

**Backend:** Add `total_points` to the existing `/admin/users` list response via a SQL subquery (one round-trip for the whole page — no N+1).

**Frontend:** Add a "Points" column to the DataGrid showing `{total_points} pts` per row with an edit icon button. Clicking the button opens a focused Points modal containing only the existing `PointsSection`. Remove `PointsSection` from the application modal.

## Data Flow

1. `/admin/users` list loads → each user has `total_points`
2. Staff clicks edit icon on a row → Points modal opens with `PointsSection` for that user's `discord_id`
3. Staff deducts points → on success, `invalidateQueries(['userPointsGet'])` refreshes the modal balance AND `invalidateQueries(['userListGet'])` refreshes the table column value

## Components Affected

- **Backend:** `controllers/adminUsersController.go` (or equivalent list handler) — add `total_points` subquery
- **Backend:** User list response struct — add `TotalPoints int`
- **Frontend:** `types/User/index.ts` — add `total_points: number` to `UserListData`
- **Frontend:** `components/Dashboard/UsersTableComponents/tableDefinitions.tsx` — add Points column with edit icon
- **Frontend:** `pages/dashboard/users/index.tsx` — add `selectedPointsUser` state, Points modal, remove `PointsSection` from application modal
- **Frontend:** `hooks/Workshop/useAdminPointsAdjust.ts` — add `invalidateQueries(['userListGet'])` to `onSuccess`

## Key Decisions

- No new endpoints — `total_points` piggybacks on the existing list endpoint
- Points modal is separate from the application modal (different state, different dialog)
- Both `userPointsGet` and `userListGet` are invalidated on adjustment so both the modal and table column stay fresh
- `PointsSection` component itself is unchanged — just moved to a new modal context
