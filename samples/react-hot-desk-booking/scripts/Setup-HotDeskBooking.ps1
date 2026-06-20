<#
.SYNOPSIS
    Complete setup script for Hot Desk Booking solution
.DESCRIPTION
    One-step provisioning that creates lists and adds sample data
    Supports both interactive (user) and app registration device code authentication
.PARAMETER SiteUrl
    The URL of the SharePoint site collection (required)
.PARAMETER ClientId
    Azure AD app registration Client ID (for device code authentication)
.PARAMETER TenantId
    Azure AD Tenant ID (for device code authentication)
.PARAMETER SkipSampleData
    Skip adding sample resources (defaults to $false)
.EXAMPLE
    # Interactive authentication (default)
    .\Setup-HotDeskBooking.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/mysite"
    
    # Device code authentication
    .\Setup-HotDeskBooking.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/mysite" `
        -ClientId "12345678-1234-1234-1234-123456789012" `
        -TenantId "contoso.onmicrosoft.com"
    
    # Skip sample data
    .\Setup-HotDeskBooking.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/mysite" -SkipSampleData
#>

param(
    [Parameter(Mandatory = $true)]
    [string]$SiteUrl,
    
    [Parameter(Mandatory = $false)]
    [string]$ClientId,
    
    [Parameter(Mandatory = $false)]
    [string]$TenantId,
    
    [switch]$SkipSampleData
)

$ErrorActionPreference = "Stop"

function Write-Step {
    param([string]$Message, [int]$Step, [int]$Total)
    Write-Host "`n[$Step/$Total] $Message" -ForegroundColor Cyan
    Write-Host ("=" * 70) -ForegroundColor Gray
}

function Write-Success {
    param([string]$Message)
    Write-Host "  ✓ $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "  ⚠ $Message" -ForegroundColor Yellow
}

function Write-Info {
    param([string]$Message)
    Write-Host "  ℹ $Message" -ForegroundColor Gray
}

try {
    Write-Host "`n" -ForegroundColor Cyan
    Write-Host "╔════════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "║        Hot Desk Booking - Complete Setup                          ║" -ForegroundColor Cyan
    Write-Host "╚════════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan

    # Step 1: Check prerequisites
    Write-Step "Checking Prerequisites" 1 3
    
    if (-not (Get-Module -ListAvailable -Name PnP.PowerShell)) {
        Write-Warning "PnP.PowerShell not found"
        Write-Info "Installing PnP.PowerShell..."
        Install-Module -Name PnP.PowerShell -Force -AllowClobber
        Write-Success "PnP.PowerShell installed"
    } else {
        Write-Success "PnP.PowerShell is installed"
    }

    # Step 2: Provision lists
    Write-Step "Provisioning SharePoint Lists" 2 3

    Write-Info "Connecting to $SiteUrl"
    
    if ($ClientId -and $TenantId) {
        Write-Info "Using device code authentication with app registration"
        Connect-PnPOnline -Url $SiteUrl `
            -ClientId $ClientId `
            -Tenant $TenantId `
            -DeviceLogin
        Write-Success "Connected with device code flow"
    } else {
        Write-Info "Using interactive authentication"
        Connect-PnPOnline -Url $SiteUrl -Interactive -ClientId "31359c7f-bd7e-475c-86db-fdb8c937548e"
        Write-Success "Connected interactively"
    }

    # Create HotDeskResources
    Write-Info "Creating HotDeskResources list..."
    $resourcesList = New-PnPList -Title "HotDeskResources" `
        -Template GenericList `
        -Url "Lists/HotDeskResources" `
        -ErrorAction SilentlyContinue

    if ($null -ne $resourcesList -or (Get-PnPList -Identity "HotDeskResources" -ErrorAction SilentlyContinue)) {
        $resList = Get-PnPList -Identity "HotDeskResources"
        
        Add-PnPField -List $resList -DisplayName "ResourceType" -InternalName "ResourceType" `
            -Type Text -Required -ErrorAction SilentlyContinue
        Add-PnPField -List $resList -DisplayName "Location" -InternalName "Location" `
            -Type Text -ErrorAction SilentlyContinue
        Add-PnPField -List $resList -DisplayName "Description" -InternalName "Description" `
            -Type Note -ErrorAction SilentlyContinue
        Add-PnPField -List $resList -DisplayName "IsActive" -InternalName "IsActive" `
            -Type Boolean -Required -ErrorAction SilentlyContinue
        
        $field = Get-PnPField -List $resList -Identity "IsActive"
        $field.DefaultValue = "1"
        $field.Update()
        Invoke-PnPQuery
        
        Write-Success "HotDeskResources list created with columns"
    }

    # Create HotDeskBookings
    Write-Info "Creating HotDeskBookings list..."
    $bookingsList = New-PnPList -Title "HotDeskBookings" `
        -Template GenericList `
        -Url "Lists/HotDeskBookings" `
        -ErrorAction SilentlyContinue

    if ($null -ne $bookingsList -or (Get-PnPList -Identity "HotDeskBookings" -ErrorAction SilentlyContinue)) {
        $bookList = Get-PnPList -Identity "HotDeskBookings"
        
        $resourceList = Get-PnPList -Identity "HotDeskResources"
        $resourceLookupXml = "<Field Type='Lookup' DisplayName='Resource' Name='Resource' StaticName='Resource' List='{$($resourceList.Id)}' ShowField='Title' Required='TRUE' />"
        Add-PnPFieldFromXml -List $bookList -FieldXml $resourceLookupXml -ErrorAction SilentlyContinue

        Add-PnPField -List $bookList -DisplayName "BookingDate" -InternalName "BookingDate" `
            -Type DateTime -Required -ErrorAction SilentlyContinue
        Add-PnPField -List $bookList -DisplayName "BookedBy" -InternalName "BookedBy" `
            -Type User -Required -ErrorAction SilentlyContinue
        Add-PnPField -List $bookList -DisplayName "Notes" -InternalName "Notes" `
            -Type Note -ErrorAction SilentlyContinue
        Add-PnPField -List $bookList -DisplayName "ResourceId" -InternalName "ResourceId" `
            -Type Text -ErrorAction SilentlyContinue
        
        Write-Success "HotDeskBookings list created with columns"
    }

    # Step 3: Add sample data (optional)
    if (-not $SkipSampleData) {
        Write-Step "Adding Sample Data" 3 3

        $resources = @(
            @{ Title = "Desk 101"; ResourceType = "Hot Desk"; Location = "Level 2 - East"; Description = "Window seat"; IsActive = $true },
            @{ Title = "Desk 102"; ResourceType = "Hot Desk"; Location = "Level 2 - East"; Description = "Standard setup"; IsActive = $true },
            @{ Title = "Parking A1"; ResourceType = "Parking"; Location = "Basement L1"; Description = "Reserved space"; IsActive = $true },
            @{ Title = "Locker 201"; ResourceType = "Locker"; Location = "Ground Floor"; Description = "Storage"; IsActive = $true }
        )

        $list = Get-PnPList -Identity "HotDeskResources"
        foreach ($resource in $resources) {
            Add-PnPListItem -List $list -Values $resource | Out-Null
            Write-Info "Added: $($resource.Title)"
        }
        Write-Success "Sample resources added"
    }

    Disconnect-PnPOnline

    # Summary
    Write-Host "`n" -ForegroundColor Cyan
    Write-Host "╔════════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║              Setup Completed Successfully! ✓                       ║" -ForegroundColor Green
    Write-Host "╚════════════════════════════════════════════════════════════════════╝" -ForegroundColor Green

    Write-Host "`nLists Created:" -ForegroundColor Cyan
    Write-Host "  • HotDeskResources" -ForegroundColor White
    Write-Host "  • HotDeskBookings" -ForegroundColor White

    if (-not $SkipSampleData) {
        Write-Host "`nSample Data Added:" -ForegroundColor Cyan
        Write-Host "  • 2 Hot Desks" -ForegroundColor White
        Write-Host "  • 1 Parking Space" -ForegroundColor White
        Write-Host "  • 1 Locker" -ForegroundColor White
    }

    Write-Host "`nNext Steps:" -ForegroundColor Yellow
    Write-Host "  1. Build the web part: npm run build" -ForegroundColor White
    Write-Host "  2. Package the solution: npm run package-solution" -ForegroundColor White
    Write-Host "  3. Upload the .sppkg file to App Catalog" -ForegroundColor White
    Write-Host "  4. Add the web part to your site page" -ForegroundColor White
    Write-Host "  5. Configure web part settings:" -ForegroundColor White
    Write-Host "     - Resources List Name: HotDeskResources" -ForegroundColor White
    Write-Host "     - Bookings List Name: HotDeskBookings" -ForegroundColor White

    Write-Host "`nDocumentation:" -ForegroundColor Yellow
    Write-Host "  • README.md - Script documentation" -ForegroundColor White
    Write-Host "  • APP-REGISTRATION-SETUP.md - Device code authentication guide" -ForegroundColor White

}
catch {
    Write-Host "`n✗ Error: $_" -ForegroundColor Red
    Disconnect-PnPOnline -ErrorAction SilentlyContinue
    exit 1
}


