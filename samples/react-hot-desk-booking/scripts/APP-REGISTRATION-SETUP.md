# App Registration Setup Guide

This guide explains how to set up Azure AD app registration for device code flow authentication with Hot Desk Booking provisioning scripts.

## Why Use App Registration with Device Code Flow?

**Benefits:**
- ✓ No client secrets to manage
- ✓ Browser-based login flow
- ✓ More secure than client secrets
- ✓ Perfect for unattended scenarios
- ✓ Works in CI/CD pipelines
- ✓ User-friendly (prompts user to login via browser)

**When to use:**
- CI/CD deployments
- Scheduled provisioning
- Multi-tenant scenarios
- Headless/unattended provisioning
- DevOps automation

## Step 1: Register Application in Azure AD

### Using Azure Portal

1. Go to **Azure Portal** → **Azure Active Directory** → **App registrations**
2. Click **+ New registration**
3. Fill in the form:
   - **Name**: `Hot Desk Booking Provisioning` (or any name)
   - **Supported account types**: `Accounts in this organizational directory only`
   - **Redirect URI**: Leave empty (not needed for device flow)
4. Click **Register**

### Get Your Application (Client) ID

After registration, on the app's **Overview** page, copy:
- **Application (client) ID** — Save this for `ClientId` parameter

**Example:**
```
12345678-1234-1234-1234-123456789012
```

## Step 2: Grant API Permissions

1. In your app registration, go to **API permissions**
2. Click **+ Add a permission**
3. Select **Microsoft Graph**
4. Choose **Application permissions** (not Delegated)
5. Search for and select:
   - `Sites.Manage.All` — for SharePoint site access
   - `Directory.Read.All` — for user lookup (optional)
6. Click **Add permissions**
7. **Grant admin consent**:
   - Click **Grant admin consent for [Tenant]**
   - Confirm when prompted

### Permissions Explained

| Permission | Purpose |
|-----------|---------|
| `Sites.Manage.All` | Create/modify lists and items in SharePoint |
| `Directory.Read.All` | Look up users in Azure AD (optional) |

**⚠️ Important**: With device code flow, you don't create a client secret. Instead, the user will be prompted to login via their browser device code.

## Step 3: Get Your Tenant ID

The Tenant ID is your Azure AD domain:

**Option 1: Get from Portal**
1. In Azure AD, go to **Overview**
2. Copy the **Directory (tenant) ID** (format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

**Option 2: Use Tenant Name**
- Format: `contoso.onmicrosoft.com`
- Or: `contoso.microsoft.com`

**Example:**
```
contoso.onmicrosoft.com
```

## Step 4: Gather Your Credentials

You now have two pieces of information (NO client secret needed!):

```
ClientId:     12345678-1234-1234-1234-123456789012
TenantId:     contoso.onmicrosoft.com
SiteUrl:      https://contoso.sharepoint.com/sites/mysite
```

## Using Scripts with Device Code Authentication

### Example 1: One-Step Setup with Device Code

```powershell
cd scripts

.\Setup-HotDeskBooking.ps1 `
    -SiteUrl "https://contoso.sharepoint.com/sites/mysite" `
    -ClientId "12345678-1234-1234-1234-123456789012" `
    -TenantId "contoso.onmicrosoft.com"
```

**What happens:**
1. Script prompts with a device code and URL
2. You open the URL in a browser (on any device)
3. Enter the device code
4. Sign in with your Azure AD account
5. Script continues and creates the lists

### Example 2: Provision Lists Only

```powershell
.\Provision-HotDeskLists.ps1 `
    -SiteUrl "https://contoso.sharepoint.com/sites/mysite" `
    -ClientId "12345678-1234-1234-1234-123456789012" `
    -TenantId "contoso.onmicrosoft.com"
```

### Example 3: Add Sample Data

```powershell
.\Add-SampleData.ps1 `
    -SiteUrl "https://contoso.sharepoint.com/sites/mysite" `
    -ClientId "12345678-1234-1234-1234-123456789012" `
    -TenantId "contoso.onmicrosoft.com"
```

### Example 4: Remove Lists

```powershell
.\Remove-HotDeskLists.ps1 `
    -SiteUrl "https://contoso.sharepoint.com/sites/mysite" `
    -ClientId "12345678-1234-1234-1234-123456789012" `
    -TenantId "contoso.onmicrosoft.com" `
    -Force
```

## CI/CD Integration Examples

### GitHub Actions

```yaml
name: Provision Hot Desk Booking

on: [workflow_dispatch]

jobs:
  provision:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Provision SharePoint Lists
        run: |
          cd scripts
          .\Setup-HotDeskBooking.ps1 `
            -SiteUrl "${{ secrets.SHAREPOINT_SITE_URL }}" `
            -ClientId "${{ secrets.AZURE_CLIENT_ID }}" `
            -TenantId "${{ secrets.AZURE_TENANT_ID }}" `
            -SkipSampleData
```

**Setup Secrets in GitHub:**
1. Go to repo → **Settings** → **Secrets and variables** → **Actions**
2. Add these repository secrets:
   - `SHAREPOINT_SITE_URL` = `https://contoso.sharepoint.com/sites/mysite`
   - `AZURE_CLIENT_ID` = Your Client ID
   - `AZURE_TENANT_ID` = Your Tenant ID

### Azure DevOps

```yaml
trigger:
  - main

pool:
  vmImage: 'windows-latest'

jobs:
  - job: ProvisionSharePoint
    steps:
      - task: PowerShell@2
        inputs:
          targetType: 'filePath'
          filePath: 'scripts/Setup-HotDeskBooking.ps1'
          arguments: |
            -SiteUrl "$(SharePointSiteUrl)" `
            -ClientId "$(AzureClientId)" `
            -TenantId "$(AzureTenantId)" `
            -SkipSampleData
```

**Setup Variables in Azure DevOps:**
1. Go to **Pipelines** → **Library** → **Variable groups**
2. Create group `HotDeskBooking`
3. Add these variables:
   - `SharePointSiteUrl` = `https://contoso.sharepoint.com/sites/mysite`
   - `AzureClientId` = Your Client ID
   - `AzureTenantId` = Your Tenant ID

## Device Code Flow Explained

Device code flow works like this:

```
┌─ User's Computer ─────────────────────────────────────┐
│                                                       │
│  PowerShell Script:                                  │
│  ① Requests device code from Azure AD               │
│  ② Shows user the code and login URL                │
│  │                                                   │
│  └─── "Go to https://.../ and enter code ABC123"   │
│                                                       │
└─────────────────────────────────────────────────────┘

┌─ User's Browser (any device) ──────────────────────┐
│                                                    │
│  User opens URL in browser                        │
│  ① Navigates to Azure AD login page               │
│  ② Enters device code: ABC123                     │
│  ③ Signs in with Azure AD account                 │
│  ④ Grants permission to app                       │
│                                                    │
└────────────────────────────────────────────────────┘

┌─ Back to PowerShell ───────────────────────────────┐
│                                                   │
│  Script:                                         │
│  ① Detects successful login                      │
│  ② Continues with provisioning                   │
│  ③ Creates SharePoint lists                      │
│                                                   │
└───────────────────────────────────────────────────┘
```

## Security Benefits

**vs. Client Secret:**
- ✓ No secret to steal or rotate
- ✓ User explicitly approves each login
- ✓ Works even if device code is intercepted
- ✓ Audit trail shows which user ran provision
- ✓ Perfect for unattended CI/CD

**Best Practices:**
- Regular password changes in Azure AD
- MFA/2FA enabled on your Azure AD account
- Only grant necessary permissions (Sites.Manage.All)
- Review who has access to app registration

## Troubleshooting

### "Device flow not supported"

**Cause**: Your tenant or app doesn't support device flow

**Fix**:
1. Ensure you're using PnP.PowerShell v2.0+
2. Update module: `Update-Module -Name PnP.PowerShell`
3. Check app registration has correct permissions

### "The user or admin has not consented"

**Cause**: API permissions not granted

**Fix**:
1. Go to Azure AD app → **API permissions**
2. Click **Grant admin consent for [Tenant]**
3. Wait 1-2 minutes for permissions to propagate
4. Try script again

### "AADSTS7000215: Invalid application ID"

**Cause**: Wrong Client ID

**Fix**: Double-check Client ID matches app registration

### "Authentication timeout"

**Cause**: User didn't login within timeout (usually 15 minutes)

**Fix**: Re-run the script and complete login promptly

### "Permission denied - App doesn't have required permissions"

**Cause**: App missing `Sites.Manage.All` permission

**Fix**:
1. Go to app registration → **API permissions**
2. Add **Sites.Manage.All** permission
3. Grant admin consent
4. Try script again

## Comparison: Interactive vs. Device Code

| Feature | Interactive | Device Code |
|---------|---|---|
| **User login** | Browser popup | Browser prompt with code |
| **Secret needed** | ❌ No | ❌ No |
| **Usage** | One-off scripts | Automation friendly |
| **CI/CD ready** | ❌ Hard | ✓ Yes |
| **Setup effort** | Minimal | Moderate (app registration) |

**When to use Interactive:**
```powershell
.\Setup-HotDeskBooking.ps1 -SiteUrl "https://..."
```

**When to use Device Code:**
```powershell
.\Setup-HotDeskBooking.ps1 `
    -SiteUrl "https://..." `
    -ClientId "..." `
    -TenantId "..."
```

## Additional Resources

- [Azure AD Device Code Flow](https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-device-code)
- [PnP PowerShell - Device Login](https://pnp.github.io/powershell/articles/authentication.html#device-login)
- [SharePoint API Permissions](https://learn.microsoft.com/en-us/sharepoint/dev/general-development/permissions-rest-api-overview)
- [Azure AD App Registration](https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)

## Common Use Cases

### Use Case 1: Developer Laptop

Use **interactive authentication** (simplest):

```powershell
.\Setup-HotDeskBooking.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/dev"
```

### Use Case 2: CI/CD Pipeline

Use **device code authentication**:

```powershell
.\Setup-HotDeskBooking.ps1 `
    -SiteUrl "https://contoso.sharepoint.com/sites/prod" `
    -ClientId "..." `
    -TenantId "..."
```

The pipeline will wait for you to complete device code login in browser.

### Use Case 3: Scheduled Automation

Use **device code authentication** with app registration:
- App registration has required permissions
- PowerShell runs on scheduled task
- User logs in via device code when script runs

## Support

For issues with:
- **Azure AD / App Registration**: See Microsoft Azure documentation
- **Device code flow**: Check troubleshooting section above
- **SharePoint provisioning**: See README.md
- **Scripts**: Check QUICK-START.md or SELECTION-GUIDE.md
