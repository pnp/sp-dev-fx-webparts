<#
.SYNOPSIS
    Creates the SharePoint document libraries, columns, and views for LegalLens.

.PARAMETER SiteUrl
    The SharePoint site URL where the libraries will be created.

.PARAMETER LibraryName
    The name of the contracts document library. Defaults to "Contracts".

.PARAMETER ClientId
    The Azure AD app client ID for authentication.

.EXAMPLE
    .\Setup-LegalLens-SharePoint.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/LegalLens" -ClientId "your-client-id"

.EXAMPLE
    .\Setup-LegalLens-SharePoint.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/LegalLens" -ClientId "your-client-id" -LibraryName "LegalDocs"
#>

param(
    [Parameter(Mandatory = $true)]
    [string]$SiteUrl,

    [Parameter(Mandatory = $true)]
    [string]$ClientId,

    [Parameter(Mandatory = $false)]
    [string]$LibraryName = "Contracts"
)

$LibraryDescription = "Contract repository for LegalLens AI analysis"
$SignedLibraryName = "Signed Documents"
$SignedLibraryDescription = "E-signature document repository for LegalLens"
$TokensListName = "Signature Tokens"
$TokensListDescription = "E-signature token tracking list for LegalLens"


# STEP 1: Connect to SharePoint
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "LegalLens SharePoint Setup" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check if PnP PowerShell is installed
if (-not (Get-Module -ListAvailable -Name PnP.PowerShell)) {
    Write-Host "PnP.PowerShell module not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Installing PnP.PowerShell module..." -ForegroundColor Yellow
    Install-Module -Name PnP.PowerShell -Scope CurrentUser -Force
    Write-Host "Module installed successfully!" -ForegroundColor Green
    Write-Host ""
}

Write-Host "Connecting to SharePoint site..." -ForegroundColor Yellow
Write-Host "Site: $SiteUrl" -ForegroundColor Gray
Write-Host ""

try {
    Connect-PnPOnline -Url $SiteUrl -Interactive -ClientId $ClientId
    Write-Host "Connected successfully!" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "Failed to connect to SharePoint!" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
    exit
}


# STEP 2: Create Document Library
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Creating Document Library" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check if library already exists
$existingLibrary = Get-PnPList -Identity $LibraryName -ErrorAction SilentlyContinue

if ($existingLibrary) {
    Write-Host "Library '$LibraryName' already exists!" -ForegroundColor Yellow
    $response = Read-Host "Do you want to add missing columns to existing library? (Y/N)"
    
    if ($response -ne "Y" -and $response -ne "y") {
        Write-Host "Setup cancelled by user" -ForegroundColor Red
        exit
    }
    
    Write-Host "Using existing library" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "Creating library: $LibraryName" -ForegroundColor Yellow
    
    try {
        New-PnPList -Title $LibraryName -Template DocumentLibrary -OnQuickLaunch
        Write-Host "Library created successfully!" -ForegroundColor Green
        Write-Host ""
    } catch {
        Write-Host "Failed to create library!" -ForegroundColor Red
        Write-Host "Error: $_" -ForegroundColor Red
        exit
    }
}

# Update library description
Set-PnPList -Identity $LibraryName -Description $LibraryDescription


# STEP 3: Create Custom Columns
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Creating Custom Columns" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Function to add field safely (skip if exists)
function Add-CustomField {
    param(
        [string]$ListName,
        [string]$FieldName,
        [string]$DisplayName,
        [string]$FieldType,
        [hashtable]$AdditionalParams = @{},
        [hashtable]$FieldProperties = @{}
    )

    $existingField = Get-PnPField -List $ListName -Identity $FieldName -ErrorAction SilentlyContinue

    if ($existingField) {
        Write-Host "  ⏭️  Field '$DisplayName' already exists - skipping" -ForegroundColor Gray
    } else {
        Write-Host "  Creating field: $DisplayName" -ForegroundColor Yellow
        try {
            Add-PnPField -List $ListName -DisplayName $DisplayName -InternalName $FieldName -Type $FieldType -AddToDefaultView @AdditionalParams
            # Set additional properties that Add-PnPField doesn't support directly
            if ($FieldProperties.Count -gt 0) {
                Set-PnPField -List $ListName -Identity $FieldName -Values $FieldProperties
            }
            Write-Host "  Created: $DisplayName" -ForegroundColor Green
        } catch {
            Write-Host "  Warning: Could not create '$DisplayName'" -ForegroundColor Yellow
            Write-Host "  Error: $_" -ForegroundColor Gray
        }
    }
}

# Contract Type (Choice field)
Write-Host ""
Write-Host "1. Contract Type" -ForegroundColor Cyan
Add-CustomField -ListName $LibraryName -FieldName "ContractType" -DisplayName "Contract Type" -FieldType "Choice" -AdditionalParams @{
    Choices = @(
        "Vendor Agreement",
        "Service Agreement",
        "NDA",
        "SaaS Agreement",
        "Employment Agreement",
        "Lease Agreement",
        "Partnership Agreement",
        "License Agreement",
        "Master Service Agreement",
        "Statement of Work",
        "General Agreement",
        "Other"
    )
} -FieldProperties @{
    DefaultValue = "General Agreement"
}

# Jurisdiction (Single line of text)
Write-Host ""
Write-Host "2. Jurisdiction" -ForegroundColor Cyan
Add-CustomField -ListName $LibraryName -FieldName "Jurisdiction" -DisplayName "Jurisdiction" -FieldType "Text"

# Status (Choice field)
Write-Host ""
Write-Host "3. Status" -ForegroundColor Cyan
Add-CustomField -ListName $LibraryName -FieldName "Status" -DisplayName "Status" -FieldType "Choice" -AdditionalParams @{
    Choices = @("Compliant", "Warning", "Critical")
} -FieldProperties @{
    DefaultValue = "Compliant"
}

# Parties (Multiple lines of text - semicolon separated)
Write-Host ""
Write-Host "4. Parties" -ForegroundColor Cyan
Add-CustomField -ListName $LibraryName -FieldName "Parties" -DisplayName "Parties" -FieldType "Note" -FieldProperties @{
    NumberOfLines = 2
}

# Expiry Date (Date field)
Write-Host ""
Write-Host "5. Expiry Date" -ForegroundColor Cyan
Add-CustomField -ListName $LibraryName -FieldName "ExpiryDate" -DisplayName "Expiry Date" -FieldType "DateTime" -FieldProperties @{
    DisplayFormat = [Microsoft.SharePoint.Client.DateTimeFieldFormatType]::DateOnly
}

# Tags (Multiple lines of text - semicolon separated)
Write-Host ""
Write-Host "6. Tags" -ForegroundColor Cyan
Add-CustomField -ListName $LibraryName -FieldName "Tags" -DisplayName "Tags" -FieldType "Note" -FieldProperties @{
    NumberOfLines = 3
}

# Risk Score (Number field)
Write-Host ""
Write-Host "7. Risk Score" -ForegroundColor Cyan
Add-CustomField -ListName $LibraryName -FieldName "RiskScore" -DisplayName "Risk Score" -FieldType "Number" -FieldProperties @{
    MinimumValue = 0
    MaximumValue = 100
    DefaultValue = "0"
}

# AI Analysis Complete (Yes/No field)
Write-Host ""
Write-Host "8. AI Analysis Complete" -ForegroundColor Cyan
Add-CustomField -ListName $LibraryName -FieldName "AIAnalysisComplete" -DisplayName "AI Analysis Complete" -FieldType "Boolean" -FieldProperties @{
    DefaultValue = "0"
}

# Analysis Date (Date field)
Write-Host ""
Write-Host "9. Analysis Date" -ForegroundColor Cyan
Add-CustomField -ListName $LibraryName -FieldName "AnalysisDate" -DisplayName "Analysis Date" -FieldType "DateTime" -FieldProperties @{
    DisplayFormat = [Microsoft.SharePoint.Client.DateTimeFieldFormatType]::DateOnly
}

# Effective Date (Date field)
Write-Host ""
Write-Host "10. Effective Date" -ForegroundColor Cyan
Add-CustomField -ListName $LibraryName -FieldName "EffectiveDate" -DisplayName "Effective Date" -FieldType "DateTime" -FieldProperties @{
    DisplayFormat = [Microsoft.SharePoint.Client.DateTimeFieldFormatType]::DateOnly
}


# STEP 4: Create Views
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Creating Custom Views" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# All Documents View (Enhanced)
Write-Host "Creating view: All Contracts" -ForegroundColor Yellow
try {
    $viewFields = @("DocIcon", "LinkFilename", "ContractType", "Jurisdiction", "Status", "Parties", "ExpiryDate", "RiskScore", "Modified")
    
    # Check if view exists
    $existingView = Get-PnPView -List $LibraryName -Identity "All Contracts" -ErrorAction SilentlyContinue
    
    if ($existingView) {
        Write-Host " View 'All Contracts' already exists - skipping" -ForegroundColor Gray
    } else {
        Add-PnPView -List $LibraryName -Title "All Contracts" -Fields $viewFields -SetAsDefault
        Write-Host "  Created view: All Contracts" -ForegroundColor Green
    }
} catch {
    Write-Host " Warning: Could not create 'All Contracts' view" -ForegroundColor Yellow
}

# High Risk Contracts View
Write-Host "Creating view: High Risk Contracts" -ForegroundColor Yellow
try {
    $existingView = Get-PnPView -List $LibraryName -Identity "High Risk Contracts" -ErrorAction SilentlyContinue
    
    if ($existingView) {
        Write-Host "View 'High Risk Contracts' already exists - skipping" -ForegroundColor Gray
    } else {
        Add-PnPView -List $LibraryName -Title "High Risk Contracts" -Fields $viewFields -Query "<Where><Geq><FieldRef Name='RiskScore'/><Value Type='Number'>70</Value></Geq></Where>"
        Write-Host "Created view: High Risk Contracts" -ForegroundColor Green
    }
} catch {
    Write-Host "Warning: Could not create 'High Risk Contracts' view" -ForegroundColor Yellow
}

# Expiring Soon View
Write-Host "Creating view: Expiring Soon" -ForegroundColor Yellow
try {
    $existingView = Get-PnPView -List $LibraryName -Identity "Expiring Soon" -ErrorAction SilentlyContinue
    
    if ($existingView) {
        Write-Host "View 'Expiring Soon' already exists - skipping" -ForegroundColor Gray
    } else {
        $in90Days = (Get-Date).AddDays(90).ToString("yyyy-MM-dd")
        Add-PnPView -List $LibraryName -Title "Expiring Soon" -Fields $viewFields -Query "<Where><And><IsNotNull><FieldRef Name='ExpiryDate'/></IsNotNull><Leq><FieldRef Name='ExpiryDate'/><Value Type='DateTime'>$in90Days</Value></Leq></And></Where>"
        Write-Host " Created view: Expiring Soon" -ForegroundColor Green
    }
} catch {
    Write-Host " Warning: Could not create 'Expiring Soon' view" -ForegroundColor Yellow
}


# STEP 5: Create Signed Documents Library
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Creating Signed Documents Library" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

$existingSignedLibrary = Get-PnPList -Identity $SignedLibraryName -ErrorAction SilentlyContinue

if ($existingSignedLibrary) {
    Write-Host "Library '$SignedLibraryName' already exists!" -ForegroundColor Yellow
    $response = Read-Host "Do you want to add missing columns to existing library? (Y/N)"

    if ($response -ne "Y" -and $response -ne "y") {
        Write-Host "Skipping '$SignedLibraryName' setup" -ForegroundColor Yellow
    } else {
        Write-Host "Using existing library" -ForegroundColor Green
        Write-Host ""
    }
} else {
    Write-Host "Creating library: $SignedLibraryName" -ForegroundColor Yellow

    try {
        New-PnPList -Title $SignedLibraryName -Template DocumentLibrary -OnQuickLaunch
        Set-PnPList -Identity $SignedLibraryName -Description $SignedLibraryDescription
        Write-Host "Library created successfully!" -ForegroundColor Green
        Write-Host ""
    } catch {
        Write-Host "Failed to create '$SignedLibraryName' library!" -ForegroundColor Red
        Write-Host "Error: $_" -ForegroundColor Red
    }
}

# Signed Documents Columns
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Creating Signed Documents Columns" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan

# ContractType (Single line of text)
Write-Host ""
Write-Host "1. Contract Type" -ForegroundColor Cyan
Add-CustomField -ListName $SignedLibraryName -FieldName "ContractType" -DisplayName "Contract Type" -FieldType "Text"

# Status (Single line of text)
Write-Host ""
Write-Host "2. Status" -ForegroundColor Cyan
Add-CustomField -ListName $SignedLibraryName -FieldName "Status" -DisplayName "Status" -FieldType "Text"

# Parties (Single line of text)
Write-Host ""
Write-Host "3. Parties" -ForegroundColor Cyan
Add-CustomField -ListName $SignedLibraryName -FieldName "Parties" -DisplayName "Parties" -FieldType "Text"

# Tags (Single line of text)
Write-Host ""
Write-Host "4. Tags" -ForegroundColor Cyan
Add-CustomField -ListName $SignedLibraryName -FieldName "Tags" -DisplayName "Tags" -FieldType "Text"

# Risk Score (Number field)
Write-Host ""
Write-Host "5. Risk Score" -ForegroundColor Cyan
Add-CustomField -ListName $SignedLibraryName -FieldName "RiskScore" -DisplayName "Risk Score" -FieldType "Number" -FieldProperties @{
    MinimumValue = 0
    MaximumValue = 100
    DefaultValue = "0"
}


# STEP 6: Create Signature Tokens List
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Creating Signature Tokens List" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

$existingTokensList = Get-PnPList -Identity $TokensListName -ErrorAction SilentlyContinue

if ($existingTokensList) {
    Write-Host "List '$TokensListName' already exists!" -ForegroundColor Yellow
    $response = Read-Host "Do you want to add missing columns to existing list? (Y/N)"

    if ($response -ne "Y" -and $response -ne "y") {
        Write-Host "Skipping '$TokensListName' setup" -ForegroundColor Yellow
    } else {
        Write-Host "Using existing list" -ForegroundColor Green
        Write-Host ""
    }
} else {
    Write-Host "Creating list: $TokensListName" -ForegroundColor Yellow

    try {
        New-PnPList -Title $TokensListName -Template GenericList -OnQuickLaunch
        Set-PnPList -Identity $TokensListName -Description $TokensListDescription
        Write-Host "List created successfully!" -ForegroundColor Green
        Write-Host ""
    } catch {
        Write-Host "Failed to create '$TokensListName' list!" -ForegroundColor Red
        Write-Host "Error: $_" -ForegroundColor Red
    }
}

# Signature Tokens Columns
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Creating Signature Tokens Columns" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan

# TokenID (Single line of text)
Write-Host ""
Write-Host "1. TokenID" -ForegroundColor Cyan
Add-CustomField -ListName $TokensListName -FieldName "TokenID" -DisplayName "TokenID" -FieldType "Text"

# ContractID (Number)
Write-Host ""
Write-Host "2. ContractID" -ForegroundColor Cyan
Add-CustomField -ListName $TokensListName -FieldName "ContractID" -DisplayName "ContractID" -FieldType "Number"

# ContractName (Single line of text)
Write-Host ""
Write-Host "3. ContractName" -ForegroundColor Cyan
Add-CustomField -ListName $TokensListName -FieldName "ContractName" -DisplayName "ContractName" -FieldType "Text"

# FileName (Single line of text)
Write-Host ""
Write-Host "4. FileName" -ForegroundColor Cyan
Add-CustomField -ListName $TokensListName -FieldName "FileName" -DisplayName "FileName" -FieldType "Text"

# SignerEmail (Single line of text)
Write-Host ""
Write-Host "5. SignerEmail" -ForegroundColor Cyan
Add-CustomField -ListName $TokensListName -FieldName "SignerEmail" -DisplayName "SignerEmail" -FieldType "Text"

# SignerName (Single line of text)
Write-Host ""
Write-Host "6. SignerName" -ForegroundColor Cyan
Add-CustomField -ListName $TokensListName -FieldName "SignerName" -DisplayName "SignerName" -FieldType "Text"

# SignerID (Single line of text)
Write-Host ""
Write-Host "7. SignerID" -ForegroundColor Cyan
Add-CustomField -ListName $TokensListName -FieldName "SignerID" -DisplayName "SignerID" -FieldType "Text"

# DriveItemID (Single line of text)
Write-Host ""
Write-Host "8. DriveItemID" -ForegroundColor Cyan
Add-CustomField -ListName $TokensListName -FieldName "DriveItemID" -DisplayName "DriveItemID" -FieldType "Text"

# Expires (Date and Time)
Write-Host ""
Write-Host "9. Expires" -ForegroundColor Cyan
Add-CustomField -ListName $TokensListName -FieldName "Expires" -DisplayName "Expires" -FieldType "DateTime"

# Used (Yes/No)
Write-Host ""
Write-Host "10. Used" -ForegroundColor Cyan
Add-CustomField -ListName $TokensListName -FieldName "Used" -DisplayName "Used" -FieldType "Boolean" -FieldProperties @{
    DefaultValue = "0"
}

# SignedDate (Date and Time)
Write-Host ""
Write-Host "11. SignedDate" -ForegroundColor Cyan
Add-CustomField -ListName $TokensListName -FieldName "SignedDate" -DisplayName "SignedDate" -FieldType "DateTime"


# STEP 7: Configure Library Settings
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Configuring Library Settings" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Enabling versioning..." -ForegroundColor Yellow
try {
    Set-PnPList -Identity $LibraryName -EnableVersioning $true -MajorVersions 50
    Write-Host "Versioning enabled (50 major versions)" -ForegroundColor Green
} catch {
    Write-Host " Warning: Could not enable versioning" -ForegroundColor Yellow
}

Write-Host "Disabling content approval..." -ForegroundColor Yellow
try {
    Set-PnPList -Identity $LibraryName -EnableModeration $false
    Write-Host "Content approval configured" -ForegroundColor Green
} catch {
    Write-Host " Warning: Could not configure content approval" -ForegroundColor Yellow
}


# STEP 8: Summary
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Libraries/Lists Created/Updated: $LibraryName, $SignedLibraryName, $TokensListName" -ForegroundColor Green
Write-Host "Contracts Columns: 10 fields" -ForegroundColor Green
Write-Host "Signed Documents Columns: 5 fields" -ForegroundColor Green
Write-Host "Signature Tokens Columns: 11 fields" -ForegroundColor Green
Write-Host "Custom Views: 3 views created (Contracts)" -ForegroundColor Green
Write-Host "Library Settings: Configured" -ForegroundColor Green
Write-Host ""

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "$LibraryName - Column Summary" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  1. Contract Type       (Choice)" -ForegroundColor White
Write-Host "  2. Jurisdiction        (Text)" -ForegroundColor White
Write-Host "  3. Status             (Choice: Compliant, Warning, Critical)" -ForegroundColor White
Write-Host "  4. Parties            (Multi-line text)" -ForegroundColor White
Write-Host "  5. Expiry Date        (Date)" -ForegroundColor White
Write-Host "  6. Tags               (Multi-line text)" -ForegroundColor White
Write-Host "  7. Risk Score         (Number: 0-100)" -ForegroundColor White
Write-Host "  8. AI Analysis Complete (Yes/No)" -ForegroundColor White
Write-Host "  9. Analysis Date      (DateTime)" -ForegroundColor White
Write-Host " 10. Effective Date     (Date)" -ForegroundColor White
Write-Host ""

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "$SignedLibraryName - Column Summary" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  1. Contract Type       (Text)" -ForegroundColor White
Write-Host "  2. Status             (Text: E-Signature status)" -ForegroundColor White
Write-Host "  3. Parties            (Text)" -ForegroundColor White
Write-Host "  4. Tags               (Text)" -ForegroundColor White
Write-Host "  5. Risk Score         (Number: 0-100)" -ForegroundColor White
Write-Host ""

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "$TokensListName - Column Summary" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  1. Title          (Text: Token display label)" -ForegroundColor White
Write-Host "  2. TokenID        (Text: Cryptographic token, 48 hex chars)" -ForegroundColor White
Write-Host "  3. ContractID     (Number: SharePoint list item ID)" -ForegroundColor White
Write-Host "  4. ContractName   (Text: Display name of the contract)" -ForegroundColor White
Write-Host "  5. FileName       (Text: Filename in Contracts library)" -ForegroundColor White
Write-Host "  6. SignerEmail    (Text: Recipient email)" -ForegroundColor White
Write-Host "  7. SignerName     (Text: Recipient display name)" -ForegroundColor White
Write-Host "  8. SignerID       (Text: Internal signer identifier)" -ForegroundColor White
Write-Host "  9. DriveItemID    (Text: Graph drive item ID)" -ForegroundColor White
Write-Host " 10. Expires        (DateTime: Token expiry)" -ForegroundColor White
Write-Host " 11. Used           (Yes/No: Marked true after signing)" -ForegroundColor White
Write-Host " 12. SignedDate     (DateTime: Timestamp of signature)" -ForegroundColor White
Write-Host ""

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Next Steps" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Upload sample contracts to the '$LibraryName' library" -ForegroundColor Yellow
Write-Host "2. Upload signed documents to the '$SignedLibraryName' library" -ForegroundColor Yellow
Write-Host "3. Update web part properties with library name: '$LibraryName'" -ForegroundColor Yellow
Write-Host "4. Deploy Azure Functions and update TOKENS_LIST_ID in local.settings.json" -ForegroundColor Yellow
Write-Host "5. Deploy LegalLens web part to your site" -ForegroundColor Yellow
Write-Host "6. Test the AI analysis and e-signature features" -ForegroundColor Yellow
Write-Host ""

Write-Host "Library/List URLs:" -ForegroundColor Cyan
Write-Host "  $SiteUrl/$LibraryName" -ForegroundColor White
Write-Host "  $SiteUrl/Signed%20Documents" -ForegroundColor White
Write-Host "  $SiteUrl/Lists/Signature%20Tokens" -ForegroundColor White
Write-Host ""

Write-Host " Setup complete! You can now use LegalLens." -ForegroundColor Green
Write-Host ""

# Disconnect
Disconnect-PnPOnline