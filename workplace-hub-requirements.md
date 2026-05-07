# Workplace Hub — Requirements

Three standalone SPFx web parts for hybrid office management. Each is independently deployable and follows the same conventions as `react-wellbeing-tracker` (SPFx 1.20.0, React 17, Fluent UI v8, PnP JS 4.x, no inline styles).

---

## 1. react-hot-desk-booking

### Summary
Staff reserve a specific desk for a given day. Anyone can see who is sitting where. One booking per person per day.

### Assumptions & Rationale

| Assumption | Rationale |
|---|---|
| Single floor, multiple named zones (Zone A, Zone B, …) | Covers 95% of SME offices; multi-floor adds complexity without a clear floor-map component |
| Desks are named within a zone (A-01, A-02, …) | Specific desk selection is more satisfying and useful than a pool |
| Desk attributes: zone, has monitor, is standing desk | Most common differentiators in hybrid offices |
| Booking window: today + 14 days | Long enough to plan a fortnight, short enough to stay relevant |
| One booking per user per day | You can only sit at one desk |
| Everyone can see all bookings for any day | Transparency is core to hybrid working |
| No recurring bookings | Adds significant complexity; recurring users can re-book manually |
| Admin deactivates a desk by editing the list directly | Simpler than building an admin panel |
| Cancellation: owner cancels their own; no auto-release | Auto-release needs attendance tracking — out of scope |

### SharePoint Lists

**HotDesks** — master desk registry

| Column | Type | Notes |
|---|---|---|
| Title | Single line | Desk ID — e.g. `A-01` |
| Zone | Choice | e.g. Zone A, Zone B, Quiet Zone |
| HasMonitor | Yes/No | Default: No |
| IsStanding | Yes/No | Default: No |
| IsActive | Yes/No | Default: Yes — set to No for maintenance |

**DeskBookings** — daily reservations

| Column | Type | Notes |
|---|---|---|
| Title | Single line | Auto-set: `A-01 \| 2026-05-06` |
| Desk | Lookup → HotDesks | |
| BookingDate | Date and Time (date only) | |
| BookedBy | Person or Group | Set to current user on create |

### Features

- Date picker (defaults to today) — navigate forward up to 14 days
- Zone filter tab bar
- Desk grid for selected date:
  - **Available** — green, click to book
  - **Your booking** — blue with your name, click to cancel
  - **Booked by other** — grey with booker's name, not clickable
  - **Inactive** — hatched/disabled
- Desk tooltip: monitor / standing desk badges
- Confirmation toast on book/cancel
- "My bookings" summary strip — next 5 upcoming bookings with cancel option
- Property pane: Activities List Name, Bookings List Name, Max days ahead (default 14)

### Property Pane
- Web part title
- Desks list name (default: `HotDesks`)
- Bookings list name (default: `DeskBookings`)
- Max days ahead (default: 14)

### Out of Scope
- Floor map / SVG layout
- Recurring bookings
- QR code check-in
- Outlook calendar integration

---

## 2. react-parking-reservation

### Summary
Staff book a numbered car park bay for a specific day. Spots are named and typed. One spot per person per day.

### Assumptions & Rationale

| Assumption | Rationale |
|---|---|
| Named/numbered spots (P01, P02, …), not a pool | Specific spot selection avoids disputes; people know where to go |
| Spot types: Standard, EV Charging, Accessible, Motorbike | Covers the standard NZ/AU office car park breakdown |
| Booking window: today + 7 days | Shorter than desks — parking is scarcer and less plannable |
| One spot per user per day | One car, one space |
| No waitlist | Adds significant list-polling complexity; "check back tomorrow" is acceptable UX for a simple tool |
| Spot list managed by an admin in SharePoint | Admin adds/removes spots by editing the list directly |
| All bookings are visible to everyone | Same transparency principle as desks |

### SharePoint Lists

**ParkingSpots** — master spot registry

| Column | Type | Notes |
|---|---|---|
| Title | Single line | Spot ID — e.g. `P01` |
| SpotType | Choice | Standard \| EV Charging \| Accessible \| Motorbike |
| IsActive | Yes/No | Default: Yes |

**ParkingBookings** — daily reservations

| Column | Type | Notes |
|---|---|---|
| Title | Single line | Auto-set: `P01 \| 2026-05-06` |
| Spot | Lookup → ParkingSpots | |
| BookingDate | Date and Time (date only) | |
| BookedBy | Person or Group | Set to current user on create |

### Features

- Date picker (defaults to today) — navigate forward up to 7 days
- Type filter pills (All / Standard / EV / Accessible / Motorbike)
- Availability summary banner: "6 of 12 spots available"
- Spot card grid for selected date:
  - **Available** — green with spot ID and type icon, click to book
  - **Your booking** — blue, click to cancel
  - **Booked** — grey with booker initials, not clickable
  - **Inactive** — disabled
- "No spots available" state with the next date that has availability
- Confirmation toast on book/cancel
- Property pane: list names, max days ahead (default 7)

### Property Pane
- Web part title
- Spots list name (default: `ParkingSpots`)
- Bookings list name (default: `ParkingBookings`)
- Max days ahead (default: 7)

### Out of Scope
- Waitlist / notifications when a spot frees up
- Licence plate capture
- ANPR / barrier integration

---

## 3. react-visitor-registration

### Summary
Staff pre-register visitors before they arrive. A front-desk view shows the day's expected arrivals and allows check-in.

### Assumptions & Rationale

| Assumption | Rationale |
|---|---|
| Any staff member can register a visitor | Gatekeeping registration creates friction |
| One list item per visitor (not per visit group) | Simplest model; a group visit is just N items with the same date/host |
| Expected arrival time is a text field ("09:30") | Avoids DateTime complexity; time precision needed is low |
| Purpose is a fixed choice list | Open text is inconsistently filled in; choices give useful front-desk filtering |
| Status lifecycle: Awaited → Arrived → Departed | Enough granularity for a reception desk |
| Front desk marks Arrived/Departed via the web part | Closes the loop without needing a separate app |
| Notification is out of scope for the web part itself | A Power Automate flow on list item creation handles email/Teams notifications — documented in README but not built here |
| All visitors visible to all staff | Reception desk is a shared space; no PII concern for basic visitor info |
| No NDA or health declaration capture | Out of scope — handled operationally |

### SharePoint List

**VisitorRegistrations**

| Column | Type | Notes |
|---|---|---|
| Title | Single line | Visitor full name |
| VisitorCompany | Single line | Optional |
| Host | Person or Group | Staff member hosting the visitor |
| VisitDate | Date and Time (date only) | |
| ExpectedArrival | Single line | e.g. `09:30` |
| Purpose | Choice | Meeting \| Interview \| Contractor \| Delivery \| Other |
| Notes | Multiple lines | Optional |
| Status | Choice | Awaited \| Arrived \| Departed — default: Awaited |
| CheckedInBy | Person or Group | Set when status → Arrived |
| CheckedInAt | Date and Time | Set when status → Arrived |

### Views

**Register view** (default for staff)
- Date picker
- "New Visitor" button opens an inline form panel
- Table of upcoming visitors: Name, Company, Host, Arrival time, Purpose, Status
- Filters: by date, by host (person picker), by status
- Host can cancel (delete) their own entries; they see a trash icon on their rows

**Front Desk view** (toggle button)
- Filtered to today by default
- Sorted by ExpectedArrival ascending
- Larger "Check In" / "Check Out" action buttons per row
- Status badge prominently shown
- Compact read-only view — no edit/delete

### Features

- Inline "New Visitor" form panel (not a dialog) — slides in from the right
- Form validation: Name and VisitDate required
- Instant list update on save (no full page reload)
- Front Desk toggle in the header
- Color-coded status badges: Awaited (amber), Arrived (green), Departed (grey)
- Empty state: "No visitors expected today"
- Property pane: list name, default view (Staff / Front Desk)

### Property Pane
- Web part title
- Registrations list name (default: `VisitorRegistrations`)
- Default view (Staff / Front Desk)

### Out of Scope
- Push notifications to host
- Badge printing
- NDA / health declaration forms
- Multi-site visitor tracking

---

## Build Order Recommendation

1. **react-parking-reservation** — simplest data model, quickest win, validates the booking pattern (one item per user per day, named resources)
2. **react-hot-desk-booking** — same pattern as parking but adds zone filtering and desk attributes
3. **react-visitor-registration** — different pattern (admin list + status lifecycle + two views), builds last

## Shared Conventions (all three)

- SPFx 1.20.0, React 17, Fluent UI v8, PnP JS 4.x, Node 18
- No inline styles — CSS custom properties for theming, precomputed SCSS classes for layout
- All buttons `type="button"`
- `aria-label` describes current state; no `aria-pressed` with dynamic expressions
- PowerShell provisioning script in `scripts/` for each sample
- Light/dark mode toggle with `localStorage` persistence (same pattern as `react-wellbeing-tracker`)
- SCSS module type file hand-maintained — add new class to `.ts` file before building
