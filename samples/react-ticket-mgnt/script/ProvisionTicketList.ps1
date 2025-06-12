# PowerShell script to provision a SharePoint list for ticket management
# Filename: Provision-TicketsList.ps1

<#
.SYNOPSIS
    Creates a SharePoint list for ticket/defect tracking with all required columns.
.DESCRIPTION
    This script connects to a SharePoint site and provisions a comprehensive ticket tracking list
    with all necessary columns for defect management including priorities, statuses, categories, etc.
.PARAMETER SiteUrl
    The URL of the SharePoint site where the list will be created.
.PARAMETER ListName
    The name of the list to be created (default: "Tickets").
.EXAMPLE
    .\Provision-TicketsList.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/projectsite" -ListName "Defects"
.NOTES
    Requires PnP PowerShell module. 
    Install using: Install-Module -Name PnP.PowerShell -Scope CurrentUser
#>

param (
    [Parameter(Mandatory = $true)]
    [string]$SiteUrl,
    
    [Parameter(Mandatory = $false)]
    [string]$ListName = "Tickets"
)

# Function to check if PnP PowerShell is installed
function Test-PnPPowerShell {
    if (-not (Get-Module -Name PnP.PowerShell -ListAvailable)) {
        Write-Host "PnP PowerShell module is not installed. Installing now..." -ForegroundColor Yellow
        try {
            Install-Module -Name PnP.PowerShell -Scope CurrentUser -Force
            Write-Host "PnP PowerShell module installed successfully." -ForegroundColor Green
        }
        catch {
            Write-Error "Failed to install PnP PowerShell module. Please install it manually: Install-Module -Name PnP.PowerShell -Scope CurrentUser"
            return $false
        }
    }
    return $true
}



try {
    # Connect to SharePoint site
    Write-Host "Connecting to SharePoint site: $SiteUrl" -ForegroundColor Cyan
    Connect-PnPOnline -Url $SiteUrl -UseWebLogin
    Write-Host "Connected successfully to $SiteUrl" -ForegroundColor Green
    
    # Check if list already exists
    $existingList = Get-PnPList -Identity $ListName -ErrorAction SilentlyContinue
    if ($existingList) {
        Write-Warning "List '$ListName' already exists! Would you like to remove it and create a new one? (Y/N)"
        $confirm = Read-Host
        if ($confirm -eq "Y" -or $confirm -eq "y") {
            Write-Host "Removing existing list..." -ForegroundColor Yellow
            Remove-PnPList -Identity $ListName -Force
        }
        else {
            Write-Host "Operation cancelled by user. Existing list will not be modified." -ForegroundColor Cyan
            exit 0
        }
    }
    
    # Create the list
    Write-Host "Creating list: $ListName" -ForegroundColor Cyan
    New-PnPList -Title $ListName -Template GenericList -EnableVersioning
    
    # Rename Title field to Subject
    Set-PnPField -List $ListName -Identity "Title" -Values @{Title = "Subject" }
    
    # Add Description field (multiple lines of text)
    Add-PnPField -List $ListName -DisplayName "Description" -InternalName "Description" -Type Note -AddToDefaultView
    
    # Add Priority choice field
    $priorityChoices = @"
High|High
Normal|Normal
Low|Low
"@
    Add-PnPField -List $ListName -DisplayName "Priority" -InternalName "Priority" -Type Choice -Choices $priorityChoices.Split("`n") -AddToDefaultView
    
    # Add Status choice field
    $statusChoices = @"
Open|Open
In Progress|In Progress
Fixed|Fixed
Closed|Closed
Won't Fix|Won't Fix
"@
    # 1. Create the choice field (without DefaultValue)
Add-PnPField -List $ListName -DisplayName "Status" -InternalName "Status" -Type Choice -Choices $statusChoices.Split("`n") -AddToDefaultView

# 2. Then set the default value
Set-PnPField -List $ListName -Identity "Status" -Values @{ DefaultValue = "Open" }

    
    # Add Assigned To person field
    Add-PnPField -List $ListName -DisplayName "Assigned To" -InternalName "AssignedTo" -Type User -AddToDefaultView
    
    # Add Due Date field
    Add-PnPField -List $ListName -DisplayName "Due Date" -InternalName "DueDate" -Type DateTime -AddToDefaultView
    
    # Add Category choice field
    $categoryChoices = @"
UI/UX|UI/UX
Functionality|Functionality
Performance|Performance
Security|Security
Data|Data
Integration|Integration
"@
    Add-PnPField -List $ListName -DisplayName "Category" -InternalName "Category" -Type Choice -Choices $categoryChoices.Split("`n") -AddToDefaultView
    
    # Add Environment choice field
    $environmentChoices = @"
Development|Development
Test|Test
Production|Production
"@
    Add-PnPField -List $ListName -DisplayName "Environment" -InternalName "Environment" -Type Choice -Choices $environmentChoices.Split("`n") -AddToDefaultView
    
    # Add Steps to Reproduce field
    Add-PnPField -List $ListName -DisplayName "Steps to Reproduce" -InternalName "StepsToReproduce" -Type Note
    
    # Add Expected Result field
    Add-PnPField -List $ListName -DisplayName "Expected Result" -InternalName "ExpectedResult" -Type Note
    
    # Add Actual Result field
    Add-PnPField -List $ListName -DisplayName "Actual Result" -InternalName "ActualResult" -Type Note
    
    # Add Affected Version field
    Add-PnPField -List $ListName -DisplayName "Affected Version" -InternalName "AffectedVersion" -Type Text
    
    # Add Resolution field
    Add-PnPField -List $ListName -DisplayName "Resolution" -InternalName "Resolution" -Type Note
    
    # Add Resolution Date field
    Add-PnPField -List $ListName -DisplayName "Resolution Date" -InternalName "ResolutionDate" -Type DateTime
    
    # Add Severity choice field
    $severityChoices = @"
Critical|Critical
Major|Major
Minor|Minor
Cosmetic|Cosmetic
"@
    Add-PnPField -List $ListName -DisplayName "Severity" -InternalName "Severity" -Type Choice -Choices $severityChoices.Split("`n")
    
    # Add Root Cause choice field
    $rootCauseChoices = @"
Code bug|Code bug
Design flaw|Design flaw
Requirements issue|Requirements issue
External dependency|External dependency
Configuration error|Configuration error
"@
    Add-PnPField -List $ListName -DisplayName "Root Cause" -InternalName "RootCause" -Type Choice -Choices $rootCauseChoices.Split("`n")
    
    # Add Time Spent field (number)
    Add-PnPField -List $ListName -DisplayName "Time Spent (Hours)" -InternalName "TimeSpent" -Type Number
    
    # Add Regression Test Status choice field
    $regressionStatusChoices = @"
Not Started|Not Started
In Progress|In Progress
Passed|Passed
Failed|Failed
"@
    Add-PnPField -List $ListName -DisplayName "Regression Test Status" -InternalName "RegressionTestStatus" -Type Choice -Choices $regressionStatusChoices.Split("`n")
    
    # Add Release field
    Add-PnPField -List $ListName -DisplayName "Release" -InternalName "Release" -Type Text
    
    # Create a view for open tickets
Add-PnPView -List $ListName -Title "Open Tickets" -Fields "Title", "Priority", "Status", "Category", "AssignedTo", "DueDate" `
    -Query "<Where><Neq><FieldRef Name='Status' /><Value Type='Choice'>Closed</Value></Neq></Where>" `
    -SetAsDefault

# Create a view for closed tickets
Add-PnPView -List $ListName -Title "Closed Tickets" -Fields "Title", "Priority", "Status", "Category", "AssignedTo", "Resolution" `
    -Query "<Where><Eq><FieldRef Name='Status' /><Value Type='Choice'>Closed</Value></Eq></Where>"

# Create a view for high priority items
Add-PnPView -List $ListName -Title "High Priority" -Fields "Title", "Status", "Category", "AssignedTo", "DueDate" `
    -Query "<Where><Eq><FieldRef Name='Priority' /><Value Type='Choice'>High</Value></Eq></Where>"

    
    Write-Host "List '$ListName' has been successfully created with all required fields and views." -ForegroundColor Green
    
    # Create sample items (optional)
    $createSampleItems = Read-Host "Would you like to create sample ticket items? (Y/N)"
    if ($createSampleItems -eq "Y" -or $createSampleItems -eq "y") {
        Write-Host "Creating sample tickets..." -ForegroundColor Cyan
        
        # Create first sample ticket
        $item = Add-PnPListItem -List $ListName -Values @{
            Title            = "Login page error in Chrome browser"
            Description      = "Users are unable to log in when using Chrome browser version 98+"
            Priority         = "High"
            Status           = "Open"
            Category         = "Functionality"
            Environment      = "Production"
            StepsToReproduce = "1. Go to login page`n2. Enter valid credentials`n3. Click Login button`n4. See error message"
            ExpectedResult   = "User should be logged in successfully"
            ActualResult     = "Error message appears: 'Invalid credentials'"
            AffectedVersion  = "2.3.0"
            Severity         = "Critical"
        }
        
        # Create second sample ticket
        $item = Add-PnPListItem -List $ListName -Values @{
            Title            = "Report dashboard loads slowly"
            Description      = "The main reporting dashboard takes more than 10 seconds to load"
            Priority         = "Normal"
            Status           = "In Progress"
            Category         = "Performance"
            Environment      = "Production"
            StepsToReproduce = "1. Navigate to Reports section`n2. Click on Dashboard`n3. Wait for page to load"
            ExpectedResult   = "Page should load within 3 seconds"
            ActualResult     = "Page takes 10-15 seconds to load"
            AffectedVersion  = "2.3.0"
            Severity         = "Major"
        }
        
        # Create third sample ticket
        $item = Add-PnPListItem -List $ListName -Values @{
            Title            = "Incorrect calculation in monthly report totals"
            Description      = "The monthly report is showing incorrect totals in the summary section"
            Priority         = "High"
            Status           = "Fixed"
            Category         = "Data"
            Environment      = "Production"
            StepsToReproduce = "1. Generate monthly report for April 2023`n2. Check totals in summary section`n3. Compare with raw data"
            ExpectedResult   = "Totals should match raw data sum"
            ActualResult     = "Totals are off by approximately 5%"
            AffectedVersion  = "2.2.5"
            Severity         = "Major"
            RootCause        = "Code bug"
            Resolution       = "Fixed calculation error in TotalCalculationService.CalculateMonthly method"
            ResolutionDate   = (Get-Date).AddDays(-2)
            TimeSpent        = 3.5
            Release          = "2.3.1"
        }
        
        Write-Host "Sample tickets created successfully!" -ForegroundColor Green
    }
    
}
catch {
    Write-Error "An error occurred: $_"
    Write-Error $_.Exception
}
finally {
    # Disconnect from SharePoint site
    Disconnect-PnPOnline
    Write-Host "Disconnected from SharePoint site." -ForegroundColor Cyan
}

Write-Host "Script completed." -ForegroundColor Green