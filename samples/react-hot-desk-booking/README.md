# React Hot Desk Booking Web Part

## Summary

This SharePoint Framework (SPFx) web part enables organizations to efficiently manage shared resource bookings, such as hot desks, parking spots, and lockers. Users can browse available resources, make instant bookings for specific dates, view their existing bookings, and cancel reservations when needed.

## Features

- **Browse Resources**: View all active resources with details (type, location, description)
- **Instant Booking**: Quick booking interface with date selection and optional notes
- **My Bookings**: View your upcoming and past bookings with cancellation capability
- **Conflict Detection**: Prevents double-booking of resources
- **Admin Mode**: Optional admin toggle to view who has booked each resource
- **Dark Theme Support**: Full dark mode support with automatic theme detection
- **Responsive Design**: Mobile-friendly interface
- **Real-time Status**: Clear availability status for each resource
- **Custom List Configuration**: Configure which SharePoint lists to use

## Prerequisites

- **SharePoint Online** with SPFx support
- **SPFx Version**: 1.20.0 or higher
- **Node.js**: 16.x or 18.x
- **npm**: 8.x or higher
- **TypeScript**: 4.7.x or higher
- **PnP.PowerShell**: For running provisioning scripts (optional)

## Installation

### Step 1: Clone and Install Dependencies

```bash
git clone https://github.com/pnp/sp-dev-fx-webparts.git
cd sp-dev-fx-webparts/samples/react-hot-desk-booking
npm install
```

### Step 2: Create SharePoint Lists

You can create the required SharePoint lists using **automated PowerShell scripts** (recommended) or manually.

#### Option A: Automated Provisioning (Recommended)

The `scripts/` directory contains PowerShell scripts to automatically create and configure the required lists.

**Quick Start:**
```powershell
cd scripts
.\Setup-HotDeskBooking.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/mysite"
```

This single command will:
- Create both lists with all required columns
- Configure column properties correctly
- Add 4 sample resources (optional, use `-SkipSampleData` to skip)

**Available Scripts:**

| Script | Purpose | Usage |
|--------|---------|-------|
| **Setup-HotDeskBooking.ps1** | Complete one-step setup | `.\Setup-HotDeskBooking.ps1 -SiteUrl "https://..."` |
| **Provision-HotDeskLists.ps1** | Create lists only | `.\Provision-HotDeskLists.ps1 -SiteUrl "https://..."` |
| **Add-SampleData.ps1** | Add test resources | `.\Add-SampleData.ps1 -SiteUrl "https://..."` |
| **Remove-HotDeskLists.ps1** | Delete lists | `.\Remove-HotDeskLists.ps1 -SiteUrl "https://..."` |

**Authentication Options:**

Interactive (default):
```powershell
.\Setup-HotDeskBooking.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/mysite"
```

Device Code Flow (for CI/CD or automation):
```powershell
.\Setup-HotDeskBooking.ps1 `
    -SiteUrl "https://contoso.sharepoint.com/sites/mysite" `
    -ClientId "12345678-1234-1234-1234-123456789012" `
    -TenantId "contoso.onmicrosoft.com"
```

For detailed script documentation, see [scripts/README.md](scripts/README.md) and [scripts/APP-REGISTRATION-SETUP.md](scripts/APP-REGISTRATION-SETUP.md).

#### Option B: Manual List Creation

Alternatively, create two SharePoint lists manually:

**HotDeskResources List**

| Column | Type | Required | Notes |
|--------|------|----------|-------|
| Title | Single line of text | Yes | Resource name (e.g., "Desk 12") |
| ResourceType | Single line of text | Yes | Type (e.g., "Hot Desk", "Parking", "Locker") |
| Location | Single line of text | No | Physical location (e.g., "Level 2 - East Wing") |
| Description | Multiple lines of text | No | Additional resource details |
| IsActive | Yes/No | Yes | Whether the resource is available for booking |

**HotDeskBookings List**

| Column | Type | Required | Notes |
|--------|------|----------|-------|
| Title | Single line of text | Yes | Auto-generated as "ResourceName – YYYY-MM-DD" |
| Resource | Lookup to HotDeskResources | Yes | Which resource is booked |
| BookingDate | Date | Yes | The reservation date |
| BookedBy | Person or Group | Yes | User who made the booking |
| Notes | Multiple lines of text | No | Optional user comments |

### Step 3: Build and Test

```bash
# Development server
npm run serve

# Build for production
npm run build

# Package the solution
npm run package-solution
```

## Configuration

Once added to a SharePoint page, configure the web part via the property pane:

- **Web Part Title**: Display heading (default: "Resource Booking")
- **Resources List Name**: Name of your resources list (default: "HotDeskResources")
- **Bookings List Name**: Name of your bookings list (default: "HotDeskBookings")
- **Enable Admin Mode**: Show booked-by names on unavailable resources (default: false)
- **Default Resource Type Filter**: Pre-select a resource type (optional)

## Usage

### Booking a Resource

1. Navigate to the **Browse & Book** tab
2. Select a date using the date picker
3. Click **Book** on an available resource card
4. Enter optional notes
5. Click **Submit** to complete the booking

### Managing Your Bookings

1. Go to the **My Bookings** tab
2. View your current and upcoming bookings
3. Click **Cancel** on any future booking to remove it
4. Past bookings are displayed in grey and cannot be cancelled

## Architecture

### Components

- **HotDeskBooking.tsx**: Root component managing state and routing between tabs
- **ResourceCard.tsx**: Individual resource display with booking button
- **BookingForm.tsx**: Dialog for entering booking details
- **MyBookings.tsx**: DetailsList showing user''s bookings with cancel action

### Services

- **BookingService.ts**: Handles all SharePoint list operations using PnPjs

### Models

- **IResource.ts**: Resource interface definition
- **IBooking.ts**: Booking interface definition

## Testing

### Manual Test Checklist

- [ ] Load web part and verify resources display
- [ ] Book an available resource
- [ ] Verify booking appears in "My Bookings" tab
- [ ] Attempt to double-book same resource/date - should see conflict error
- [ ] Cancel a future booking successfully
- [ ] Verify past bookings are greyed out and non-cancellable
- [ ] Toggle Admin Mode and verify booked-by names appear
- [ ] Test on mobile - verify responsive layout
- [ ] Switch SharePoint to dark theme - verify styling

## Troubleshooting

**"Could not load resources" error**
- Check list names in web part settings
- Ensure lists exist and contain columns as specified
- Run provisioning script to verify list structure

**"This resource is already booked" error**
- This indicates a booking conflict - select a different date

**No bookings appear in My Bookings tab**
- Verify BookedBy column is properly set to current user

**PowerShell Script Execution Issues**
- Update PnP.PowerShell: `Update-Module -Name PnP.PowerShell`
- Fix execution policy: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
- See [scripts/APP-REGISTRATION-SETUP.md](scripts/APP-REGISTRATION-SETUP.md) for troubleshooting

## Scripts Documentation

For detailed information about the provisioning scripts, see:

- **[scripts/README.md](scripts/README.md)** - Complete script reference
- **[scripts/QUICK-START.md](scripts/QUICK-START.md)** - Quick reference guide
- **[scripts/SELECTION-GUIDE.md](scripts/SELECTION-GUIDE.md)** - Script comparison matrix
- **[scripts/APP-REGISTRATION-SETUP.md](scripts/APP-REGISTRATION-SETUP.md)** - Device code flow setup guide

## Support

For issues, questions, or contributions, please visit the [SharePoint Framework Samples GitHub repository](https://github.com/pnp/sp-dev-fx-webparts).

## License

MIT
