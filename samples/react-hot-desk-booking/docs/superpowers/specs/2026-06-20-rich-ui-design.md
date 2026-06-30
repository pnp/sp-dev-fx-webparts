# Rich UI Design — Hot Desk Booking Web Part

**Date:** 2026-06-20  
**Scope:** Visual upgrade + date-based availability filter + My Bookings calendar view  
**Constraint:** Fluent UI v8 (`@fluentui/react` 8.x) only — no new npm packages  
**Files changed:** 4 component files + 1 SCSS module. No changes to service, models, web part, or loc files.

---

## 1. Browse & Book Tab

### Date Filter Bar
- Renders above the resource grid inside the `Browse & Book` pivot item in `HotDeskBooking.tsx`
- Contains a Fluent UI `DatePicker` labelled "Showing availability for:", defaulting to today
- A "Today" `DefaultButton` resets the picker to today's date
- On date change: calls `bookingService.getBookingsForDate(date)` (already exists in `BookingService`)
- Result is used to build a `Set<string>` of taken resource IDs for that date (`takenResourceIds`)
- `isUnavailable` passed to each card is computed as `takenResourceIds.has(resource.id) && !isBooked` — ensures the two states are truly mutually exclusive even when the current user's own booking is in the date's results
- Availability fetch runs on initial mount (for today's date) and again on every date change

### ResourceCard Visual Upgrade
Each card gets:

**Coloured header strip** (16px tall div at top of card):

| Resource Type | Colour |
|---|---|
| Hot Desk | `#0078d4` (SharePoint blue) |
| Parking | `#107c10` (green) |
| Locker | `#f7630c` (amber) |
| Meeting Room | `#744da9` (purple) |
| Other | `#8a8886` (grey) |

**Resource type icon** (Fluent UI `Icon`, 16px, white, inside the header strip):

| Resource Type | Icon name |
|---|---|
| Hot Desk | `ThisPC` |
| Parking | `Car` |
| Locker | `Lock` |
| Meeting Room | `Home` |
| Other | `Org` |

**Availability states** (mutually exclusive, checked in this order):
1. `isBooked` (current user has upcoming booking for this resource) → green "Already Booked" badge (existing)
2. `isUnavailable` (taken by someone else on selected date) → red semi-transparent overlay, lock icon, "Unavailable" text, Book button hidden
3. Neither → blue Book button (existing)

### Colour constants
Defined as CSS custom properties on `.hotDeskBooking`:
```scss
--color-hotdesk: #0078d4;
--color-parking: #107c10;
--color-locker: #f7630c;
--color-meetingroom: #744da9;
--color-other: #8a8886;
```
Reused in card strip, list dot, calendar dot, dialog header.

---

## 2. My Bookings Tab

### View Toggle
- Two `IconButton` controls at top of `MyBookings.tsx`: `BulletedList` icon and `Calendar` icon
- Selected view stored in local state: `viewMode: 'list' | 'calendar'`, defaults to `'list'`
- Switching view is instant (no data fetch — same `bookings` array, different rendering)

### List View (enhanced existing DetailsList)
- **Resource column**: coloured dot (6px circle, resource-type colour) before the resource name
- **Status column** (new): "Upcoming" (blue `MessageBarType`-style badge) or "Past" (grey badge) based on `bookingDate` vs today
- Past booking rows: muted grey text (`color: #8a8886`)
- Upcoming booking rows: full contrast
- Cancel `DefaultButton`: red text colour (`color: #d13438`), only shown for upcoming bookings (existing logic)

### Calendar View (`BookingCalendar` sub-component)
New file: `BookingCalendar.tsx` (~100 lines)

**Props:**
```typescript
interface Props {
  bookings: IBooking[];
  onCancelled: () => Promise<void>;
}
```

**Structure:**
- Header: `IconButton` with `ChevronLeft` / `ChevronRight` for month navigation; month+year label (`fontSize: 16, fontWeight: 600`) centred between them. Navigation state: `viewMonth: Date` in local state, defaults to current month.
- 7-column CSS Grid: day-of-week headers (Mon–Sun), then day cells
- Each day cell: day number top-left, booking dots below (one per booking that day, coloured by resource type, max 3 shown then `+N more`)
- Clicking a day with bookings: opens a Fluent UI `Callout` anchored to the clicked cell. Callout lists each booking: resource name, notes snippet, Cancel link (calls `onCancelled` prop threaded down from `MyBookings`)
- Days outside current month: `opacity: 0.35`
- Today: `border: 2px solid #0078d4`, `borderRadius: 4px`

**`BookingCalendar` receives:**
- `bookings: IBooking[]` — full list, filtered internally by month
- `onCancelled: () => Promise<void>` — propagated from `MyBookings` for the cancel action in the callout

**No new data fetching** — all calendar data is derived from the existing `bookings` prop.

---

## 3. Visual Polish

### Loading — Shimmer
Replace the single `Spinner` in `HotDeskBooking.tsx` with Fluent UI `Shimmer`:
- Render 4 `ShimmerElementsGroup` shapes matching the card dimensions (280px × 160px)
- Laid out in the same CSS grid as the resource cards
- Used only during initial data load; date-change availability fetch shows a subtle inline spinner in the filter bar (not the full shimmer)

### Web Part Header
Replace `<h2>` in `HotDeskBooking.tsx` with a flex row:
- Left: web part title (same styling as current `<h2>`)
- Right: pill showing "X available" in green (count of resources where `!isUnavailable && !isBooked` for the selected date). Updates on date change.

### Booking Form (`BookingForm.tsx`)
- Add coloured header strip + icon at top of the `Dialog` (same colour/icon logic as `ResourceCard`)
- On `DatePicker` date change: call `bookingService.checkConflict(resource, date)` and show a `MessageBar` warning inline if conflict detected — before the user submits
- The submit button remains enabled; the warning is informational (the submit call itself also checks and throws)

### Responsive breakpoints (SCSS additions)
```
@media (max-width: 480px)
  .resourceGrid → grid-template-columns: 1fr
  .calendarGrid → compact mode (smaller cells, no dots, tap to see day list)
```

### Transition
Card unavailable overlay: `opacity` and `transform` transition (`200ms ease`) so it fades in when the date changes rather than snapping.

---

## Component change summary

| File | Changes |
|---|---|
| `HotDeskBooking.tsx` | Date filter bar, shimmer loading, header pill, `takenResourceIds` state, pass `isUnavailable` to cards |
| `ResourceCard.tsx` | Coloured strip, icon, unavailable overlay, `isUnavailable` prop |
| `MyBookings.tsx` | View toggle, status column, coloured dots, import `BookingCalendar` |
| `BookingCalendar.tsx` | New file — month grid, callout, month navigation |
| `BookingForm.tsx` | Coloured strip + icon in dialog header, inline conflict check on date change |
| `HotDeskBooking.module.scss` | CSS custom properties, shimmer layout, overlay transition, calendar grid, responsive breakpoints |

---

## Out of scope
- Admin mode features
- Recurring bookings
- Notifications / email
- Resource images
- Any new npm packages
