# Script Comparison & Selection Guide

## Which Script Should I Use?

| Scenario | Recommended Script | Authentication |
|----------|-------------------|-----------------|
| **First time setup** | `Setup-HotDeskBooking.ps1` | Interactive |
| **Production deployment** | `Provision-HotDeskLists.ps1` | Device Code |
| **Automated provisioning** | `Provision-HotDeskLists.ps1` | Device Code |
| **Manual step-by-step** | Individual scripts | Interactive |
| **Adding test data** | `Add-SampleData.ps1` | Interactive or Device Code |
| **Cleanup/Reset** | `Remove-HotDeskLists.ps1` | Interactive or Device Code |

## Script Details

### Setup-HotDeskBooking.ps1
**✓ Best For:**
- Initial setup by administrators
- Demo/training environments
- Quick implementation
- One-command deployment

**Features:**
- Single command execution
- Automatic dependency checking
- Provisions lists + adds sample data
- Beautiful progress output
- Error recovery
- Supports both authentication methods

**Time:** ~2-3 minutes

**Usage - Interactive:**
```powershell
.\Setup-HotDeskBooking.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/mysite"
```

**Usage - Device Code:**
```powershell
.\Setup-HotDeskBooking.ps1 `
    -SiteUrl "https://contoso.sharepoint.com/sites/mysite" `
    -ClientId "12345678-1234-1234-1234-123456789012" `
    -TenantId "contoso.onmicrosoft.com"
```

---

### Provision-HotDeskLists.ps1
**✓ Best For:**
- Production environments
- Controlled deployments
- When you want lists only (no data)
- CI/CD pipelines

**Features:**
- PnP PowerShell (most stable)
- Creates both lists with all columns
- Configures field properties correctly
- No sample data added
- Supports both authentication methods

**Time:** ~1-2 minutes

**Usage - Interactive:**
```powershell
.\Provision-HotDeskLists.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/mysite"
```

**Usage - Device Code:**
```powershell
.\Provision-HotDeskLists.ps1 `
    -SiteUrl "https://contoso.sharepoint.com/sites/mysite" `
    -ClientId "12345678-1234-1234-1234-123456789012" `
    -TenantId "contoso.onmicrosoft.com"
```

---

### Add-SampleData.ps1
**✓ Best For:**
- Adding test resources after provisioning
- Creating demo data
- Testing the web part

**Features:**
- Adds 8 sample resources:
  - 3 Hot Desks
  - 2 Parking Spaces
  - 2 Lockers
  - 1 Meeting Room
- Creates sample booking for tomorrow
- Can run independently
- Supports both authentication methods

**Time:** ~30 seconds

**Usage - Interactive:**
```powershell
.\Add-SampleData.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/mysite"
```

**Usage - Device Code:**
```powershell
.\Add-SampleData.ps1 `
    -SiteUrl "https://contoso.sharepoint.com/sites/mysite" `
    -ClientId "12345678-1234-1234-1234-123456789012" `
    -TenantId "contoso.onmicrosoft.com"
```

---

### Remove-HotDeskLists.ps1
**✓ Best For:**
- Cleanup/Reset
- Starting over
- Testing
- Full reset before redeployment

**⚠️ WARNING:** Permanently deletes all data

**Features:**
- Removes both lists
- Requests confirmation (skip with `-Force`)
- Cleans up dependencies
- Supports both authentication methods

**Usage - Interactive:**
```powershell
.\Remove-HotDeskLists.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/mysite"
```

**Usage - Device Code:**
```powershell
.\Remove-HotDeskLists.ps1 `
    -SiteUrl "https://contoso.sharepoint.com/sites/mysite" `
    -ClientId "12345678-1234-1234-1234-123456789012" `
    -TenantId "contoso.onmicrosoft.com" `
    -Force
```

---

## Authentication Methods Comparison

| Feature | Interactive | Device Code |
|---------|---|---|
| **When to use** | Developer/admin manual tasks | CI/CD, automation |
| **Requires setup** | ❌ None | ✓ App registration |
| **Secret needed** | ❌ No | ❌ No |
| **Browser login** | ✓ Yes | ✓ Yes (via device code) |
| **Unattended** | ❌ No (needs user) | ✓ Yes (user prompted) |
| **CI/CD friendly** | ❌ No | ✓ Yes |
| **Security** | User account | App registration + user |

### Interactive Authentication (Default)
- Developer uses their own Azure AD account
- Browser opens for login
- Uses user's permissions
- No app registration needed
- Simple setup

### Device Code Authentication
- Uses app registration (no secret!)
- Browser device code flow
- Perfect for automation
- Prompts user to login when needed
- More secure than secrets
- User explicitly approves each login

## Execution Policies

If you get "cannot be loaded because running scripts is disabled":

```powershell
# Temporary (current session only)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process

# Permanent (current user)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Permanent (all users - requires admin)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope LocalMachine
```

---

## Example Workflows

### Workflow 1: Quick Demo Setup (5 minutes)
**Use**: Interactive
```powershell
cd scripts
.\Setup-HotDeskBooking.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/demo"
# Done! Lists created with sample data
```

### Workflow 2: Production Deployment (10 minutes)
**Use**: Interactive or Device Code
```powershell
cd scripts
# Step 1: Provision lists only
.\Provision-HotDeskLists.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/prod"

# Step 2: (Optional) Add some sample data
.\Add-SampleData.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/prod"

# Step 3: Add web part to pages and configure
```

### Workflow 3: CI/CD Automation
**Use**: Device Code
```powershell
# In your pipeline (GitHub Actions / Azure DevOps)
$params = @{
    SiteUrl = $env:SHAREPOINT_SITE_URL
    ClientId = $env:AZURE_CLIENT_ID
    TenantId = $env:AZURE_TENANT_ID
}

.\Setup-HotDeskBooking.ps1 @params -SkipSampleData
```

Pipeline will wait for device code login in browser.

### Workflow 4: Troubleshooting Setup
**Use**: Interactive
```powershell
cd scripts

# Try individual provisioning first
.\Provision-HotDeskLists.ps1 -SiteUrl "https://..."

# If lists created, add data separately
.\Add-SampleData.ps1 -SiteUrl "https://..."

# If issues, remove and retry
.\Remove-HotDeskLists.ps1 -SiteUrl "https://..."
```

---

## Success Criteria

After running provisioning script, verify:

**✓ Lists exist:**
- Navigate to Site Settings → Site Contents
- See "HotDeskResources" and "HotDeskBookings"

**✓ Columns exist:**
- HotDeskResources: Title, ResourceType, Location, Description, IsActive
- HotDeskBookings: Title, Resource, BookingDate, BookedBy, Notes, ResourceId

**✓ Lookup works:**
- Create new item in HotDeskBookings
- Resource column shows dropdown from HotDeskResources

**✓ Sample data added (if applicable):**
- HotDeskResources has 8 items
- HotDeskBookings has at least 1 item

---

## Troubleshooting Matrix

| Problem | Solution |
|---------|----------|
| "Access Denied" | Ensure you're a site admin |
| "List already exists" | Run `Remove-HotDeskLists.ps1` first |
| "Authentication failed" | Check Azure AD credentials |
| "Module not found" | Run script as administrator first time |
| "Lookup field broken" | Ensure HotDeskResources created before HotDeskBookings |
| "Script won't run" | Update execution policy (see above) |
| **Device code issues** | See APP-REGISTRATION-SETUP.md |

---

## Getting Help

- **Setup Issues**: See APP-REGISTRATION-SETUP.md (device code) or README.md
- **Script Errors**: Check troubleshooting matrix above
- **Permissions**: Ensure you're site admin
- **Features**: Check QUICK-START.md for common commands

---

## Choosing Between Authentication Methods

**Choose Interactive if:**
- ✓ You're running scripts manually
- ✓ You're testing/developing
- ✓ One-time provisioning
- ✓ You're a site admin
- ✓ No app registration setup needed

**Choose Device Code if:**
- ✓ Automating in CI/CD
- ✓ Scheduled provisioning
- ✓ Multiple environment deployments
- ✓ No secrets to manage
- ✓ User-friendly device code prompts
