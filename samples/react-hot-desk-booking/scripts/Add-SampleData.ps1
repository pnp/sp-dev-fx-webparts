<#
.SYNOPSIS
    Adds sample data to Hot Desk Booking lists
.DESCRIPTION
    Populates HotDeskResources with sample resources and creates test bookings
    Supports both interactive (user) and app registration authentication
.PARAMETER SiteUrl
    The URL of the SharePoint site collection
.PARAMETER ClientId
    Azure AD app registration Client ID (for app-only authentication)
.PARAMETER ClientSecret
    Azure AD app registration Client Secret (for app-only authentication)
.PARAMETER TenantId
    Azure AD Tenant ID (for app-only authentication)
.EXAMPLE
    # Interactive authentication
    .\Add-SampleData.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/mysite"
    
    # App registration authentication
    .\Add-SampleData.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/mysite" `
        -ClientId "12345678-1234-1234-1234-123456789012" `
        -ClientSecret "abc123xyz..." `
        -TenantId "contoso.onmicrosoft.com"
.NOTES
    Run Provision-HotDeskLists.ps1 first
#>

param(
    [Parameter(Mandatory = $true)]
    [string]$SiteUrl,
    
    [Parameter(Mandatory = $false)]
    [string]$ClientId,
    
    [Parameter(Mandatory = $false)]
    [string]$ClientSecret,
    
    [Parameter(Mandatory = $false)]
    [string]$TenantId
)

$ErrorActionPreference = "Stop"

function Write-Step {
    param([string]$Message)
    Write-Host "`n$Message" -ForegroundColor Cyan
    Write-Host ("=" * 70) -ForegroundColor Gray
}

function Write-Success {
    param([string]$Message)
    Write-Host "  ✓ $Message" -ForegroundColor Green
}

function Write-Info {
    param([string]$Message)
    Write-Host "  ℹ $Message" -ForegroundColor Gray
}

try {
    Write-Step "Connecting to SharePoint"

    if ($ClientId -and $ClientSecret -and $TenantId) {
        Write-Info "Using app registration authentication"
        $securePassword = ConvertTo-SecureString -String $ClientSecret -AsPlainText -Force
        Connect-PnPOnline -Url $SiteUrl `
            -ClientId $ClientId `
            -Tenant $TenantId `
            -ClientSecret $securePassword
        Write-Success "Connected with app registration"
    } else {
        Write-Info "Using interactive authentication"
        Connect-PnPOnline -Url $SiteUrl -Interactive
        Write-Success "Connected interactively"
    }

    Write-Step "Adding Sample Resources"

    $resources = @(
        @{ Title = "Desk 101"; ResourceType = "Hot Desk"; Location = "Level 2 - East"; Description = "Window seat with view"; IsActive = $true },
        @{ Title = "Desk 102"; ResourceType = "Hot Desk"; Location = "Level 2 - East"; Description = "Standard setup"; IsActive = $true },
        @{ Title = "Desk 103"; ResourceType = "Hot Desk"; Location = "Level 2 - West"; Description = "Quiet zone"; IsActive = $true },
        @{ Title = "Parking A1"; ResourceType = "Parking"; Location = "Basement L1"; Description = "Reserved space"; IsActive = $true },
        @{ Title = "Parking A2"; ResourceType = "Parking"; Location = "Basement L1"; Description = "Standard space"; IsActive = $true },
        @{ Title = "Locker 201"; ResourceType = "Locker"; Location = "Ground Floor"; Description = "Small storage"; IsActive = $true },
        @{ Title = "Locker 202"; ResourceType = "Locker"; Location = "Ground Floor"; Description = "Large storage"; IsActive = $true },
        @{ Title = "Meeting Room A"; ResourceType = "Meeting Room"; Location = "Level 1"; Description = "Seats 6"; IsActive = $true }
    )

    $list = Get-PnPList -Identity "HotDeskResources"
    foreach ($resource in $resources) {
        Add-PnPListItem -List $list -Values $resource | Out-Null
        Write-Info "Added: $($resource.Title)"
    }
    Write-Success "All sample resources added"

    Disconnect-PnPOnline

    Write-Host "`n✓ Sample data added successfully!" -ForegroundColor Green

}
catch {
    Write-Host "`n✗ Error: $_" -ForegroundColor Red
    Disconnect-PnPOnline -ErrorAction SilentlyContinue
    exit 1
}
