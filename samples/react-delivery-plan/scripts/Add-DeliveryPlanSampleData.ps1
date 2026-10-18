<#
.SYNOPSIS
    Loads sample delivery plan tasks into the DeliveryPlan SharePoint list.

.DESCRIPTION
    Adds 24 sample tasks spanning 1 Sep – 16 Nov 2026 across two resources
    (Sudeep Ghatak and Ashish Ghatak) and six phases, matching the web part design.

.PARAMETER SiteUrl
    Full URL of the SharePoint site.
    Example: https://contoso.sharepoint.com/sites/mysite

.PARAMETER ListName
    Name of the target list. Defaults to "DeliveryPlan".

.PARAMETER TenantId
    Azure AD tenant ID (GUID or domain). Required for device-login auth.

.PARAMETER ClientId
    Azure AD app registration client ID. Required for device-login auth.

.PARAMETER Resource1Email
    Email address of the first resource (Sudeep Ghatak).

.PARAMETER Resource2Email
    Email address of the second resource (Ashish Ghatak).

.EXAMPLE
    .\Add-DeliveryPlanSampleData.ps1 `
        -SiteUrl    "https://contoso.sharepoint.com/sites/mysite" `
        -TenantId   "your-tenant-id" `
        -ClientId   "your-client-id" `
        -Resource1Email "sudeep.ghatak@contoso.com" `
        -Resource2Email "ashish.ghatak@contoso.com"

.NOTES
    Requires: PnP.PowerShell module
    Install:  Install-Module PnP.PowerShell -Scope CurrentUser

    Run Create-DeliveryPlanList.ps1 first to ensure the list and columns exist.
#>

[CmdletBinding()]
param (
    [Parameter(Mandatory = $true)]
    [string]$SiteUrl,

    [Parameter(Mandatory = $false)]
    [string]$ListName = "DeliveryPlan",

    [Parameter(Mandatory = $false)]
    [string]$TenantId,

    [Parameter(Mandatory = $false)]
    [string]$ClientId,

    [Parameter(Mandatory = $true)]
    [string]$Resource1Email,   # Sudeep Ghatak

    [Parameter(Mandatory = $true)]
    [string]$Resource2Email    # Ashish Ghatak
)

#region Prerequisites
if (-not (Get-Module -ListAvailable -Name PnP.PowerShell)) {
    Write-Error "PnP.PowerShell not found. Install: Install-Module PnP.PowerShell -Scope CurrentUser"
    exit 1
}
#endregion

#region Connect
Write-Host "Connecting to $SiteUrl ..." -ForegroundColor Cyan
try {
    if ($TenantId -and $ClientId) {
        Connect-PnPOnline -Url $SiteUrl -Tenant $TenantId -ClientId $ClientId -DeviceLogin -ErrorAction Stop
    }
    else {
        Connect-PnPOnline -Url $SiteUrl -Interactive -ErrorAction Stop
    }
    Write-Host "Connected." -ForegroundColor Green
}
catch {
    Write-Error "Connection failed: $_"
    exit 1
}
#endregion

#region Resolve user IDs
Write-Host "Resolving users ..." -ForegroundColor Cyan
try {
    $user1 = Get-PnPUser | Where-Object { $_.Email -eq $Resource1Email } | Select-Object -First 1
    if (-not $user1) {
        # Ensure user is in the site's user information list
        $user1 = New-PnPUser -LoginName $Resource1Email
    }

    $user2 = Get-PnPUser | Where-Object { $_.Email -eq $Resource2Email } | Select-Object -First 1
    if (-not $user2) {
        $user2 = New-PnPUser -LoginName $Resource2Email
    }

    Write-Host "  Resource 1: $($user1.Title) [$($user1.LoginName)]" -ForegroundColor Green
    Write-Host "  Resource 2: $($user2.Title) [$($user2.LoginName)]" -ForegroundColor Green
}
catch {
    Write-Error "Failed to resolve users: $_"
    Disconnect-PnPOnline
    exit 1
}

# Add-PnPListItem requires the login name (claims string) for Person fields, not the numeric ID
$S = $user1.LoginName   # Sudeep Ghatak
$A = $user2.LoginName   # Ashish Ghatak
#endregion

#region Sample data
# Each row: Title, ResourceId, Phase, StartDate, EndDate
$tasks = @(
    # ── Discovery & Environment Setup ──────────────────────────────────────────
    @{ Title="Data model and environment setup";                 R=$A; Phase="Discovery & Environment Setup";          Start="2026-09-01"; End="2026-09-08" },
    @{ Title="Discovery refinement and backlog confirmation";    R=$S; Phase="Discovery & Environment Setup";          Start="2026-09-08"; End="2026-09-15" },

    # ── Core Application & Data Capture ────────────────────────────────────────
    @{ Title="User screens";                                     R=$S; Phase="Core Application & Data Capture";        Start="2026-09-07"; End="2026-09-21" },
    @{ Title="Further-information round-trips and overflow log"; R=$A; Phase="Core Application & Data Capture";        Start="2026-09-07"; End="2026-09-14" },
    @{ Title="Incomplete information / further info request";    R=$A; Phase="Core Application & Data Capture";        Start="2026-09-07"; End="2026-09-14" },
    @{ Title="Capturing application type, size and all relevant details (with data validations)";
                                                                 R=$S; Phase="Core Application & Data Capture";        Start="2026-09-14"; End="2026-09-28" },
    @{ Title="Sensitive-information flag";                       R=$S; Phase="Core Application & Data Capture";        Start="2026-09-14"; End="2026-09-21" },
    @{ Title="Outcome capture";                                  R=$A; Phase="Core Application & Data Capture";        Start="2026-09-14"; End="2026-09-21" },
    @{ Title="Payment tracking";                                 R=$A; Phase="Core Application & Data Capture";        Start="2026-09-14"; End="2026-09-21" },
    @{ Title="Draft Application";                                R=$S; Phase="Core Application & Data Capture";        Start="2026-09-21"; End="2026-09-28" },

    # ── Workflow, Status & SLA Clock Engine ────────────────────────────────────
    @{ Title="Pause / Restart (stop-start) clock";              R=$A; Phase="Workflow, Status & SLA Clock Engine";    Start="2026-09-21"; End="2026-10-05" },
    @{ Title="Working-day due-date calculation engine";          R=$A; Phase="Workflow, Status & SLA Clock Engine";    Start="2026-09-21"; End="2026-09-28" },
    @{ Title="Conditional stage sequencing by size";             R=$S; Phase="Workflow, Status & SLA Clock Engine";    Start="2026-09-28"; End="2026-10-12" },
    @{ Title="Calculated overall status";                        R=$S; Phase="Workflow, Status & SLA Clock Engine";    Start="2026-10-05"; End="2026-10-12" },
    @{ Title="Activity log";                                     R=$A; Phase="Workflow, Status & SLA Clock Engine";    Start="2026-10-05"; End="2026-10-12" },

    # ── Reference Data, Governance & Comms ─────────────────────────────────────
    @{ Title="Application tracking";                             R=$S; Phase="Reference Data, Governance & Comms";    Start="2026-10-12"; End="2026-10-26" },
    @{ Title="Notification and escalation engine";               R=$A; Phase="Reference Data, Governance & Comms";    Start="2026-10-12"; End="2026-10-19" },
    @{ Title="Reference data management";                        R=$A; Phase="Reference Data, Governance & Comms";    Start="2026-10-19"; End="2026-11-02" },
    @{ Title="Reporting dashboard";                              R=$S; Phase="Reference Data, Governance & Comms";    Start="2026-10-26"; End="2026-11-02" },
    @{ Title="User documentation";                               R=$A; Phase="Reference Data, Governance & Comms";    Start="2026-10-26"; End="2026-11-02" },

    # ── Testing & Documentation ─────────────────────────────────────────────────
    @{ Title="Unit and integration testing";                     R=$S; Phase="Testing & Documentation";               Start="2026-10-19"; End="2026-11-09" },
    @{ Title="End-to-end test scenarios";                        R=$A; Phase="Testing & Documentation";               Start="2026-10-26"; End="2026-11-09" },

    # ── UAT, Training & Go-Live ─────────────────────────────────────────────────
    @{ Title="UAT coordination";                                 R=$A; Phase="UAT, Training & Go-Live";               Start="2026-10-26"; End="2026-11-09" },
    @{ Title="Training delivery";                                R=$A; Phase="UAT, Training & Go-Live";               Start="2026-11-09"; End="2026-11-16" },
    @{ Title="Go-live and hypercare";                            R=$S; Phase="UAT, Training & Go-Live";               Start="2026-11-09"; End="2026-11-16" }
)
#endregion

#region Insert items
Write-Host ""
Write-Host "Adding $($tasks.Count) tasks to '$ListName' ..." -ForegroundColor Cyan
$added   = 0
$skipped = 0
$errors  = 0

foreach ($task in $tasks) {
    try {
        # Check for duplicate by title (safe to re-run)
        $existing = Get-PnPListItem -List $ListName -Query "
            <View><Query><Where>
                <Eq><FieldRef Name='Title'/><Value Type='Text'>$($task.Title)</Value></Eq>
            </Where></Query></View>" |
            Select-Object -First 1

        if ($existing) {
            Write-Host "  SKIP  $($task.Title)" -ForegroundColor Yellow
            $skipped++
            continue
        }

        Add-PnPListItem -List $ListName -Values @{
            "Title"     = $task.Title
            "Resource"  = $task.R
            "Phase"     = $task.Phase
            "StartDate" = [DateTime]::Parse($task.Start)
            "EndDate"   = [DateTime]::Parse($task.End)
        } | Out-Null

        Write-Host "  ADD   $($task.Title)" -ForegroundColor Green
        $added++
    }
    catch {
        Write-Warning "  ERROR $($task.Title): $_"
        $errors++
    }
}
#endregion

#region Summary
Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host " Sample data load complete" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  Added   : $added"
Write-Host "  Skipped : $skipped (already existed)"
Write-Host "  Errors  : $errors"
Write-Host ""
if ($errors -gt 0) {
    Write-Warning "Some items failed. Check that the Phase column choices match exactly."
    Write-Warning "Re-run the script — existing items are skipped automatically."
}
else {
    Write-Host "All done! Open your SharePoint page and add the Delivery Plan web part." -ForegroundColor Green
}
#endregion

Disconnect-PnPOnline
