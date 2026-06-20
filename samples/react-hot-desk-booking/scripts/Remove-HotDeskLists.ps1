<#
.SYNOPSIS
    Removes Hot Desk Booking lists
.DESCRIPTION
    Deletes HotDeskResources and HotDeskBookings lists with confirmation
    Supports both interactive (user) and app registration device code authentication
.PARAMETER SiteUrl
    The URL of the SharePoint site collection
.PARAMETER ClientId
    Azure AD app registration Client ID (for device code authentication)
.PARAMETER TenantId
    Azure AD Tenant ID (for device code authentication)
.PARAMETER Force
    Skip confirmation prompt
.EXAMPLE
    # Interactive authentication (default)
    .\Remove-HotDeskLists.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/mysite"
    
    # Device code authentication with force
    .\Remove-HotDeskLists.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/mysite" `
        -ClientId "12345678-1234-1234-1234-123456789012" `
        -TenantId "contoso.onmicrosoft.com" `
        -Force
.NOTES
    ⚠️ WARNING: This will permanently delete all data in both lists!
#>

param(
    [Parameter(Mandatory = $true)]
    [string]$SiteUrl,
    
    [Parameter(Mandatory = $false)]
    [string]$ClientId,
    
    [Parameter(Mandatory = $false)]
    [string]$TenantId,
    
    [switch]$Force
)

$ErrorActionPreference = "Stop"

function Write-Warn {
    param([string]$Message)
    Write-Host $Message -ForegroundColor Red
}

try {
    if (-not $Force) {
        Write-Warn "`n⚠️  WARNING: This will permanently delete all data in the following lists:"
        Write-Warn "   • HotDeskResources"
        Write-Warn "   • HotDeskBookings`n"
        
        $confirmation = Read-Host "Type 'YES' to confirm deletion"
        if ($confirmation -ne "YES") {
            Write-Host "Cancelled." -ForegroundColor Yellow
            exit 0
        }
    }

    Write-Host "`nConnecting to SharePoint..." -ForegroundColor Cyan

    if ($ClientId -and $TenantId) {
        Connect-PnPOnline -Url $SiteUrl `
            -ClientId $ClientId `
            -Tenant $TenantId `
            -DeviceLogin
    } else {
        Connect-PnPOnline -Url $SiteUrl -Interactive -ClientId "31359c7f-bd7e-475c-86db-fdb8c937548e"
    }

    Write-Host "Removing lists..." -ForegroundColor Yellow
    
    Remove-PnPList -Identity "HotDeskBookings" -Force -ErrorAction SilentlyContinue
    Write-Host "✓ HotDeskBookings removed" -ForegroundColor Green
    
    Remove-PnPList -Identity "HotDeskResources" -Force -ErrorAction SilentlyContinue
    Write-Host "✓ HotDeskResources removed" -ForegroundColor Green

    Disconnect-PnPOnline

    Write-Host "`n✓ Cleanup completed successfully!" -ForegroundColor Green

}
catch {
    Write-Host "`n✗ Error: $_" -ForegroundColor Red
    Disconnect-PnPOnline -ErrorAction SilentlyContinue
    exit 1
}
