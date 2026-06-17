<#
.SYNOPSIS
    Provisions SharePoint lists for Hot Desk Booking solution
.DESCRIPTION
    Creates HotDeskResources and HotDeskBookings lists with all required columns
    Supports both interactive (user) and app registration device code authentication
.PARAMETER SiteUrl
    The URL of the SharePoint site collection
.PARAMETER ClientId
    Azure AD app registration Client ID (for device code authentication)
.PARAMETER TenantId
    Azure AD Tenant ID (for device code authentication)
.PARAMETER Interactive
    Use interactive authentication instead of device code (default if no app params provided)
.EXAMPLE
    # Interactive authentication (default)
    .\Provision-HotDeskLists.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/mysite"
    
    # Device code authentication with app registration
    .\Provision-HotDeskLists.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/mysite" `
        -ClientId "12345678-1234-1234-1234-123456789012" `
        -TenantId "contoso.onmicrosoft.com"
.NOTES
    Requires PnP.PowerShell module to be installed
    Site collection admin permissions required
#>

param(
    [Parameter(Mandatory = $true)]
    [string]$SiteUrl,
    
    [Parameter(Mandatory = $false)]
    [string]$ClientId,
    
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
    Write-Step "Checking Prerequisites"
    
    if (-not (Get-Module -ListAvailable -Name PnP.PowerShell)) {
        Write-Host "  Installing PnP.PowerShell..." -ForegroundColor Yellow
        Install-Module -Name PnP.PowerShell -Force -AllowClobber
        Write-Success "PnP.PowerShell installed"
    } else {
        Write-Success "PnP.PowerShell is installed"
    }

    Write-Step "Connecting to SharePoint"

    # Determine authentication method
    if ($ClientId -and $TenantId) {
        Write-Info "Using device code authentication with app registration"
        Connect-PnPOnline -Url $SiteUrl `
            -ClientId $ClientId `
            -Tenant $TenantId `
            -DeviceLogin
        Write-Success "Connected with device code flow"
    } else {
        Write-Info "Using interactive authentication"
        Connect-PnPOnline -Url $SiteUrl -Interactive
        Write-Success "Connected interactively"
    }

    Write-Step "Provisioning SharePoint Lists"

    # Create HotDeskResources list
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

    # Create HotDeskBookings list
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

    Disconnect-PnPOnline

    Write-Host "`n✓ Provisioning completed successfully!" -ForegroundColor Green

}
catch {
    Write-Host "`n✗ Error: $_" -ForegroundColor Red
    Disconnect-PnPOnline -ErrorAction SilentlyContinue
    exit 1
}


