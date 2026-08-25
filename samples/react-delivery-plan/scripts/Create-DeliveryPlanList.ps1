<#
.SYNOPSIS
    Creates the DeliveryPlan SharePoint list required by the react-delivery-plan web part.

.DESCRIPTION
    Creates a SharePoint list named "DeliveryPlan" (configurable) with the following columns:
      - Title          (Single line of text — built-in)
      - Resource       (Person or Group)
      - Phase          (Choice)
      - StartDate      (Date only)
      - EndDate        (Date only)

.PARAMETER SiteUrl
    Full URL of the SharePoint site where the list will be created.
    Example: https://contoso.sharepoint.com/sites/mysite

.PARAMETER ListName
    Name of the list to create. Defaults to "DeliveryPlan".

.PARAMETER PhaseChoices
    Array of phase names to pre-populate in the Phase choice column.
    Defaults to the six phases from the design spec.

.EXAMPLE
    .\Create-DeliveryPlanList.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/mysite"

.EXAMPLE
    .\Create-DeliveryPlanList.ps1 `
        -SiteUrl "https://contoso.sharepoint.com/sites/mysite" `
        -ListName "ProjectPlan" `
        -PhaseChoices @("Discovery","Build","Test","Go-Live")

.NOTES
    Requires: PnP.PowerShell module
    Install:  Install-Module PnP.PowerShell -Scope CurrentUser
#>

[CmdletBinding()]
param (
    [Parameter(Mandatory = $true)]
    [string]$SiteUrl,

    [Parameter(Mandatory = $false)]
    [string]$ListName = "DeliveryPlan",

    [Parameter(Mandatory = $false)]
    [string[]]$PhaseChoices = @(
        "Discovery & Environment Setup",
        "Core Application & Data Capture",
        "Workflow, Status & SLA Clock Engine",
        "Reference Data, Governance & Comms",
        "Testing & Documentation",
        "UAT, Training & Go-Live"
    )
)

#region Prerequisites check
if (-not (Get-Module -ListAvailable -Name PnP.PowerShell)) {
    Write-Error "PnP.PowerShell module not found. Install it with: Install-Module PnP.PowerShell -Scope CurrentUser"
    exit 1
}
#endregion

#region Connect
Write-Host "Connecting to $SiteUrl ..." -ForegroundColor Cyan
try {
    Connect-PnPOnline -Url $SiteUrl -Interactive
    Write-Host "Connected." -ForegroundColor Green
}
catch {
    Write-Error "Failed to connect: $_"
    exit 1
}
#endregion

#region Check if list already exists
$existing = Get-PnPList -Identity $ListName -ErrorAction SilentlyContinue
if ($existing) {
    Write-Warning "List '$ListName' already exists. Skipping list creation — checking columns only."
}
else {
    Write-Host "Creating list '$ListName' ..." -ForegroundColor Cyan
    New-PnPList -Title $ListName -Template GenericList -EnableVersioning
    Write-Host "List created." -ForegroundColor Green
}
#endregion

#region Helper: add column only if it doesn't exist
function Add-ColumnIfMissing {
    param(
        [string]$ListName,
        [string]$InternalName,
        [scriptblock]$AddBlock
    )
    $field = Get-PnPField -List $ListName -Identity $InternalName -ErrorAction SilentlyContinue
    if ($field) {
        Write-Host "  Column '$InternalName' already exists — skipped." -ForegroundColor Yellow
    }
    else {
        & $AddBlock
        Write-Host "  Column '$InternalName' created." -ForegroundColor Green
    }
}
#endregion

#region Columns
Write-Host "Configuring columns on '$ListName' ..." -ForegroundColor Cyan

# Resource — Person or Group (single selection, people only)
Add-ColumnIfMissing -ListName $ListName -InternalName "Resource" -AddBlock {
    Add-PnPField -List $ListName `
        -DisplayName "Resource" `
        -InternalName "Resource" `
        -Type User `
        -AddToDefaultView
}

# Phase — Choice column with pre-defined values
Add-ColumnIfMissing -ListName $ListName -InternalName "Phase" -AddBlock {
    Add-PnPField -List $ListName `
        -DisplayName "Phase" `
        -InternalName "Phase" `
        -Type Choice `
        -Choices $PhaseChoices `
        -AddToDefaultView
}

# StartDate — Date only
Add-ColumnIfMissing -ListName $ListName -InternalName "StartDate" -AddBlock {
    Add-PnPField -List $ListName `
        -DisplayName "Start Date" `
        -InternalName "StartDate" `
        -Type DateTime `
        -AddToDefaultView

    # Set to date-only display (no time)
    $field = Get-PnPField -List $ListName -Identity "StartDate"
    $field.DisplayFormat = [Microsoft.SharePoint.Client.DateTimeFieldFormatType]::DateOnly
    $field.Update()
    Invoke-PnPQuery
}

# EndDate — Date only
Add-ColumnIfMissing -ListName $ListName -InternalName "EndDate" -AddBlock {
    Add-PnPField -List $ListName `
        -DisplayName "End Date" `
        -InternalName "EndDate" `
        -Type DateTime `
        -AddToDefaultView

    $field = Get-PnPField -List $ListName -Identity "EndDate"
    $field.DisplayFormat = [Microsoft.SharePoint.Client.DateTimeFieldFormatType]::DateOnly
    $field.Update()
    Invoke-PnPQuery
}
#endregion

#region Default view — ensure useful column order
Write-Host "Updating default view column order ..." -ForegroundColor Cyan
try {
    Set-PnPView -List $ListName -Identity "All Items" `
        -Fields @("Title", "Resource", "Phase", "StartDate", "EndDate")
    Write-Host "Default view updated." -ForegroundColor Green
}
catch {
    Write-Warning "Could not update default view (non-critical): $_"
}
#endregion

#region Summary
Write-Host ""
Write-Host "=====================================" -ForegroundColor Green
Write-Host " DeliveryPlan list is ready!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host " Site   : $SiteUrl"
Write-Host " List   : $ListName"
Write-Host " URL    : $SiteUrl/Lists/$ListName"
Write-Host ""
Write-Host "Columns created:"
Write-Host "  Title      (built-in)"
Write-Host "  Resource   (Person or Group)"
Write-Host "  Phase      (Choice — $($PhaseChoices.Count) options)"
Write-Host "  StartDate  (Date only)"
Write-Host "  EndDate    (Date only)"
Write-Host ""
Write-Host "Next: open the react-delivery-plan web part property pane"
Write-Host "      and set 'List name' to: $ListName"
Write-Host ""
#endregion

Disconnect-PnPOnline
