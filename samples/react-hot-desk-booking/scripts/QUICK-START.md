# Quick Reference Guide

## One-Line Setup (Interactive)

```powershell
.\Setup-HotDeskBooking.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/mysite"
```

## One-Line Setup (Device Code - App Registration)

```powershell
.\Setup-HotDeskBooking.ps1 `
    -SiteUrl "https://contoso.sharepoint.com/sites/mysite" `
    -ClientId "12345678-1234-1234-1234-123456789012" `
    -TenantId "contoso.onmicrosoft.com"
```

## Manual Step-by-Step

### 1. Provision Lists Only (Interactive)
```powershell
.\Provision-HotDeskLists.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/mysite"
```

### 1. Provision Lists Only (Device Code)
```powershell
.\Provision-HotDeskLists.ps1 `
    -SiteUrl "https://contoso.sharepoint.com/sites/mysite" `
    -ClientId "12345678-1234-1234-1234-123456789012" `
    -TenantId "contoso.onmicrosoft.com"
```

### 2. Add Sample Resources & Bookings (Interactive)
```powershell
.\Add-SampleData.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/mysite"
```

### 2. Add Sample Resources & Bookings (Device Code)
```powershell
.\Add-SampleData.ps1 `
    -SiteUrl "https://contoso.sharepoint.com/sites/mysite" `
    -ClientId "12345678-1234-1234-1234-123456789012" `
    -TenantId "contoso.onmicrosoft.com"
```

### 3. Remove Lists (Interactive)
```powershell
.\Remove-HotDeskLists.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/mysite"
```

### 3. Remove Lists (Device Code with Force)
```powershell
.\Remove-HotDeskLists.ps1 `
    -SiteUrl "https://contoso.sharepoint.com/sites/mysite" `
    -ClientId "12345678-1234-1234-1234-123456789012" `
    -TenantId "contoso.onmicrosoft.com" `
    -Force
```

## Troubleshooting

### PowerShell Execution Policy Error
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Update PnP PowerShell
```powershell
Update-Module -Name PnP.PowerShell
```

### Check PnP PowerShell Version
```powershell
Get-Module -Name PnP.PowerShell | Select-Object Version
```

## Web Part Configuration After Deployment

In SharePoint web part settings, configure:
- **Resources List Name**: `HotDeskResources`
- **Bookings List Name**: `HotDeskBookings`
- **Enable Admin Mode**: (optional) `false` or `true`
- **Web Part Title**: `Resource Booking` or custom

## List URLs After Creation

After provisioning, access lists at:
- Resources: `{SiteUrl}/Lists/HotDeskResources`
- Bookings: `{SiteUrl}/Lists/HotDeskBookings`

## App Registration Quick Setup

1. Register app in Azure AD (no secret needed!)
2. Get Client ID and Tenant ID
3. Grant `Sites.Manage.All` permission
4. Use scripts with -ClientId and -TenantId parameters
5. When script runs, browser prompt appears for device code login

See **APP-REGISTRATION-SETUP.md** for detailed instructions.

## Support

For detailed help, see:
- **README.md** — Complete reference
- **SELECTION-GUIDE.md** — Authentication method comparison
- **APP-REGISTRATION-SETUP.md** — Device code authentication guide
