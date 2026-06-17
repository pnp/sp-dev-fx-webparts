# react-hot-desk-booking — Design Spec

**Date:** 2026-06-17
**Sample folder:** `samples/react-hot-desk-booking`
**SPFx version:** 1.20.0
**Status:** Approved — ready for implementation planning

---

## Overview

A SharePoint Framework web part that lets users book shared resources (hot desks, parking spots, lockers, or any admin-defined type) by the full day. Bookings are instant — no approval step. Users see only their own bookings; admins can see who holds each resource via a property pane toggle.

---

## Data Model

Two SharePoint lists, provisioned manually by the site admin (setup instructions in README).

### `HotDeskResources`

| Column | Type | Notes |
|--------|------|-------|
| Title | Single line of text | Resource name — e.g. "Desk 12", "Bay P3" |
| ResourceType | Single line of text | Category — e.g. "Desk", "Parking", "Locker" |
| Location | Single line of text | Floor, building, or zone — e.g. "Level 2 - East Wing" |
| Description | Multiple lines of text | Optional notes shown on the booking card |
| IsActive | Yes/No | When `false`, resource is hidden from the booking UI |

### `HotDeskBookings`

| Column | Type | Notes |
|--------|------|-------|
| Title | Single line of text | Auto-set to `"ResourceName – YYYY-MM-DD"` for readability |
| Resource | Lookup → HotDeskResources | Which resource was booked |
| BookingDate | Date and Time (date only) | The day being reserved |
| BookedBy | Person or Group | The user who made the booking |
| Notes | Multiple lines of text | Optional comment from the user |

**Conflict rule:** A resource is considered unavailable if any row in `HotDeskBookings` matches the same `Resource` ID and `BookingDate`. The conflict check runs client-side via a PnPjs `filter()` query immediately before the `add()` call.

---

## Architecture

### Approach chosen: Two-list model (Approach B)

Resources and bookings are separate lists. Admins manage resources directly in the SharePoint list UI; the web part reads resources and handles bookings only. This follows the established `react-ticket-mgnt` pattern.

### Folder structure

```
samples/react-hot-desk-booking/
├── src/
│   └── webparts/
│       └── hotDeskBooking/
│           ├── HotDeskBookingWebPart.ts
│           ├── HotDeskBookingWebPart.manifest.json
│           ├── components/
│           │   ├── HotDeskBooking.tsx            # Root component — view router + state
│           │   ├── HotDeskBooking.module.scss    # SCSS module with light/dark theme
│           │   ├── IHotDeskBookingProps.ts        # Props interface
│           │   ├── ResourceCard.tsx              # Single bookable resource card
│           │   ├── BookingForm.tsx               # Fluent UI Dialog — book a resource
│           │   ├── MyBookings.tsx                # "My Bookings" tab view
│           │   └── BookingItem.tsx               # Single row in My Bookings
│           ├── services/
│           │   └── BookingService.ts             # All PnPjs CRUD operations
│           ├── models/
│           │   ├── IResource.ts
│           │   └── IBooking.ts
│           └── loc/
│               ├── mystrings.d.ts
│               └── en-us.js
├── config/
├── assets/
├── teams/
├── package.json
├── tsconfig.json
├── gulpfile.js
└── README.md
```

### Tech stack

| Concern | Library |
|---------|---------|
| Framework | React 17 (functional components + hooks) |
| SharePoint data | PnPjs v4 (`@pnp/sp`) |
| UI components | Fluent UI v8 (`@fluentui/react`) |
| Styles | SCSS modules |
| SPFx | 1.20.0 |
| Node | 18.x |

### Data flow

1. `HotDeskBookingWebPart.ts` initialises `BookingService` with the SPFx context and configured list names, then passes it and other props to the root component.
2. `HotDeskBooking.tsx` (root) owns all state: resources array, bookings array, selected date, active resource type filter, loading flags, error messages. It passes data and handler callbacks down to child components — no global state library.
3. `BookingService` is the only file that touches PnPjs. All methods return `{ data, error }` result objects so components never need try/catch blocks.

---

## Components

### `HotDeskBookingWebPart.ts`
SPFx entry point. Reads property pane values, initialises `BookingService`, renders root component. Supports `supportsThemeVariants: true`.

### `HotDeskBooking.tsx`
Root component. Holds state, fetches resources and current-user bookings on mount. Renders a Fluent UI `Pivot` with two tabs: **Browse & Book** and **My Bookings**.

### `ResourceCard.tsx`
Displays one resource. Shows name, type badge, location, description. Has one of two states:
- **Available** — green primary button labelled "Book" that opens `BookingForm`
- **Unavailable** — disabled grey button; shows "Booked by [name]" only when `isAdminMode` is `true`, otherwise just "Unavailable"

### `BookingForm.tsx`
Fluent UI `Dialog`. Fields: date picker (pre-filled from parent state), Notes (optional). Submit calls `BookingService.checkConflict` then `BookingService.addBooking`. On conflict, shows inline error and keeps dialog open. On success, closes dialog and triggers resource list refresh.

### `MyBookings.tsx`
Fluent UI `DetailsList`. Columns: Resource, Type, Location, Date, Notes, Action. Rows sorted by date descending. Past bookings (before today) are shown greyed-out with no Cancel button. Upcoming bookings have a Cancel button.

### `BookingItem.tsx`
Renders a single row in `MyBookings`. Cancel button calls `BookingService.cancelBooking`, then removes the row from local state without a full refresh.

### `BookingService.ts`

| Method | Description |
|--------|-------------|
| `getResources()` | Fetches all active resources (`IsActive eq true`) |
| `getBookingsForDate(date)` | Fetches all bookings for a given date (used to determine availability) |
| `getMyBookings(userId)` | Fetches all bookings where `BookedBy` = current user |
| `checkConflict(resourceId, date)` | Returns `true` if a booking already exists for that resource + date |
| `addBooking(resource, date, notes)` | Creates a new booking row; sets Title automatically |
| `cancelBooking(bookingId)` | Deletes the booking row by ID |

---

## Property Pane

| Property | Control | Default | Purpose |
|----------|---------|---------|---------|
| `title` | TextField | "Resource Booking" | Web part heading |
| `resourcesListName` | TextField | "HotDeskResources" | Name of the resources list |
| `bookingsListName` | TextField | "HotDeskBookings" | Name of the bookings list |
| `isAdminMode` | Toggle | false | When on, unavailable cards show the booker's display name |
| `defaultResourceType` | TextField | "" | Pre-selects a resource type filter on load (optional) |

---

## UI / UX

### Browse & Book tab

- Date picker at the top (defaults to today). ResourceType filter dropdown populated from distinct values in the resources list.
- Resources render as a responsive card grid: CSS Grid with `auto-fill / minmax(220px, 1fr)`.
- Selecting a date or changing the type filter re-queries availability without a full component remount.

### My Bookings tab

- `DetailsList` showing the current user's bookings, newest first.
- Past bookings greyed out, no cancel action.
- Cancelling a booking deletes the list item and removes the row from local state immediately — no full reload.

### Empty states

| Situation | Message |
|-----------|---------|
| Resources list returns no active items | "No resources have been configured. Contact your site admin." |
| No bookings match the selected date + type | "All resources are available for this date." |
| User has no bookings | "You have no upcoming bookings." |

### Theming

SCSS module uses `[data-theme="dark"]` on the root element, matching the `react-sp-bookmarks` pattern. Both SharePoint light and dark themes work without additional configuration.

---

## Error Handling

| Scenario | Behaviour |
|----------|-----------|
| List not found / misconfigured list name | Banner at top of web part: "Could not load resources. Check the list name in web part settings." |
| Booking conflict (race condition) | Inline error inside `BookingForm`: "This resource is already booked for [date]." Dialog stays open. |
| Network failure on submit | Inline error in dialog; dialog stays open so the user does not lose input. |
| Cancel fails | Inline error on the row; booking remains visible. |
| No resources returned | Empty state message (see above). |

All `BookingService` methods return `{ data: T | null, error: string | null }`. Components read `error` and display it inline — no unhandled promise rejections.

---

## Testing

### Unit tests (Jest)

Target: `BookingService` only — it contains the only non-trivial logic.

| Test | Assertion |
|------|-----------|
| `checkConflict` — matching row exists | Returns `true` |
| `checkConflict` — no matching row | Returns `false` |
| `addBooking` — Title format | Sets Title to `"ResourceName – YYYY-MM-DD"` |
| `cancelBooking` — calls delete | Calls `items.getById(id).delete()` |

Tests use a mocked `spfi` instance. No component snapshot tests — Fluent UI components change frequently enough to make snapshots maintenance noise.

### Manual test checklist (README)

- [ ] Book an available resource
- [ ] Attempt to double-book — verify conflict error
- [ ] Cancel an upcoming booking
- [ ] Verify past bookings are greyed out and non-cancellable
- [ ] Toggle admin mode — verify booked-by names appear/hide
- [ ] Switch SharePoint to dark theme — verify styling
- [ ] Set `defaultResourceType` in property pane — verify filter pre-selects
- [ ] Set an invalid list name — verify banner error appears

---

## Hosts supported

| Host | Supported |
|------|-----------|
| SharePoint page | Yes |
| Teams personal app | Yes |
| Teams tab | Yes |
| SharePoint full page | Yes |

---

## README outline

1. Summary + animated GIF
2. Prerequisites (two SharePoint lists with column definitions)
3. Compatibility badges (SPFx 1.20.0, Node 18, SharePoint Online)
4. Property pane reference
5. Manual setup steps
6. Contributors
