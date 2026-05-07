# provision-offboarding-lists.ps1
# Creates the two SharePoint lists required by the Employee Offboarding Checklist web part.
# Prerequisites: PnP.PowerShell module installed and a valid connection to your SharePoint site.
#
# Usage:
#   Connect-PnPOnline -Url "https://yourtenant.sharepoint.com/sites/yoursite" -Interactive
#   .\scripts\provision-offboarding-lists.ps1

param(
    [string]$EmployeesListName = "OffboardingEmployees",
    [string]$TasksListName     = "OffboardingTasks"
)

Write-Host "Creating list: $EmployeesListName" -ForegroundColor Cyan

if (-not (Get-PnPList -Identity $EmployeesListName -ErrorAction SilentlyContinue)) {
    New-PnPList -Title $EmployeesListName -Template GenericList -EnableVersioning
    Write-Host "  Created $EmployeesListName" -ForegroundColor Green
} else {
    Write-Host "  $EmployeesListName already exists — skipping" -ForegroundColor Yellow
}

# Department choice field
$deptXml = @"
<Field Type="Choice" DisplayName="Department" Name="Department" Required="FALSE">
  <CHOICES>
    <CHOICE>IT</CHOICE>
    <CHOICE>HR</CHOICE>
    <CHOICE>Finance</CHOICE>
    <CHOICE>Management</CHOICE>
    <CHOICE>Security</CHOICE>
    <CHOICE>IAM</CHOICE>
    <CHOICE>Legal</CHOICE>
    <CHOICE>Facilities</CHOICE>
  </CHOICES>
</Field>
"@
Add-PnPFieldFromXml -List $EmployeesListName -FieldXml $deptXml -ErrorAction SilentlyContinue
Add-PnPField -List $EmployeesListName -DisplayName "Last Day" -InternalName "LastDay" -Type DateTime -AddToDefaultView -ErrorAction SilentlyContinue

Write-Host "  Fields provisioned for $EmployeesListName" -ForegroundColor Green

# ── OffboardingTasks ──────────────────────────────────────────────────────────

Write-Host "Creating list: $TasksListName" -ForegroundColor Cyan

if (-not (Get-PnPList -Identity $TasksListName -ErrorAction SilentlyContinue)) {
    New-PnPList -Title $TasksListName -Template GenericList -EnableVersioning
    Write-Host "  Created $TasksListName" -ForegroundColor Green
} else {
    Write-Host "  $TasksListName already exists — skipping" -ForegroundColor Yellow
}

# Owning department choice field (the team responsible for completing the task)
$owningDeptXml = @"
<Field Type="Choice" DisplayName="Owning Department" Name="OwningDepartment" Required="FALSE">
  <CHOICES>
    <CHOICE>IT</CHOICE>
    <CHOICE>HR</CHOICE>
    <CHOICE>Finance</CHOICE>
    <CHOICE>Management</CHOICE>
    <CHOICE>Security</CHOICE>
    <CHOICE>IAM</CHOICE>
    <CHOICE>Legal</CHOICE>
    <CHOICE>Facilities</CHOICE>
  </CHOICES>
</Field>
"@
Add-PnPFieldFromXml -List $TasksListName -FieldXml $owningDeptXml -ErrorAction SilentlyContinue
Add-PnPField -List $TasksListName -DisplayName "Assigned To"   -InternalName "AssignedTo"   -Type User             -AddToDefaultView -ErrorAction SilentlyContinue
Add-PnPField -List $TasksListName -DisplayName "Notes"         -InternalName "Notes"        -Type Note              -AddToDefaultView -ErrorAction SilentlyContinue

# Status choice field
$statusXml = @"
<Field Type="Choice" DisplayName="Status" Name="Status" Required="FALSE">
  <CHOICES>
    <CHOICE>Pending</CHOICE>
    <CHOICE>Done</CHOICE>
    <CHOICE>Blocked</CHOICE>
  </CHOICES>
  <Default>Pending</Default>
</Field>
"@
Add-PnPFieldFromXml -List $TasksListName -FieldXml $statusXml -ErrorAction SilentlyContinue

# Lookup to OffboardingEmployees
Add-PnPField -List $TasksListName -DisplayName "Employee" -InternalName "Employee" `
    -Type Lookup -AddToDefaultView -ErrorAction SilentlyContinue

$lookupField = Get-PnPField -List $TasksListName -Identity "Employee" -ErrorAction SilentlyContinue
if ($lookupField) {
    $employeeList = Get-PnPList -Identity $EmployeesListName
    Set-PnPField -List $TasksListName -Identity "Employee" -Values @{
        LookupList  = $employeeList.Id.ToString()
        LookupField = "Title"
    } -ErrorAction SilentlyContinue
}

Write-Host "  Fields provisioned for $TasksListName" -ForegroundColor Green

# ── Sample data ───────────────────────────────────────────────────────────────

Write-Host "Adding sample data..." -ForegroundColor Cyan

$currentUser = Get-PnPCurrentUser

# Employee 1 — leaving in 5 days, offboarding well underway
$emp1 = Add-PnPListItem -List $EmployeesListName -Values @{
    Title      = "Alex Johnson"
    Department = "IT"
    LastDay    = (Get-Date).AddDays(5).ToString("yyyy-MM-dd")
}

$emp1Tasks = @(
    @{ Title = "Disable Active Directory account";    OwningDepartment = "IT";         Status = "Done";    Notes = "Account disabled 2026-05-01. Confirmed by IT lead." },
    @{ Title = "Revoke VPN and remote access";        OwningDepartment = "IAM";        Status = "Done";    Notes = "All remote access tokens revoked." },
    @{ Title = "Collect laptop and access badge";     OwningDepartment = "IT";         Status = "Pending"; Notes = "Laptop to be returned on last day. Badge collected early." },
    @{ Title = "Remove from all distribution lists";  OwningDepartment = "IT";         Status = "Pending"; Notes = "" },
    @{ Title = "Final payroll and expense claims";    OwningDepartment = "Finance";     Status = "Done";    Notes = "Final pay run processed. Outstanding expense claim of `$240 approved." },
    @{ Title = "Terminate health and insurance";      OwningDepartment = "HR";         Status = "Blocked"; Notes = "Cover ends on last working day. HR to notify provider." },
    @{ Title = "Exit interview";                      OwningDepartment = "HR";         Status = "Pending"; Notes = "Scheduled for last day, 2pm." },
    @{ Title = "Knowledge transfer — system docs";   OwningDepartment = "Management"; Status = "Blocked"; Notes = "Waiting on Alex to complete runbook. Escalated to line manager." },
    @{ Title = "Revoke SaaS tool licences";          OwningDepartment = "IAM";        Status = "Pending"; Notes = "GitHub, Jira, Confluence, Figma, Slack — all to be deprovisioned." },
    @{ Title = "Archive and transfer project files"; OwningDepartment = "IT";         Status = "Pending"; Notes = "Files to be moved to shared drive before account closure." }
)

foreach ($task in $emp1Tasks) {
    Add-PnPListItem -List $TasksListName -Values @{
        Title            = $task.Title
        OwningDepartment = $task.OwningDepartment
        AssignedTo       = $currentUser.LoginName
        Status           = $task.Status
        Notes            = $task.Notes
        Employee         = $emp1.Id
    } | Out-Null
}

# Employee 2 — last day is further out, mostly not started
$emp2 = Add-PnPListItem -List $EmployeesListName -Values @{
    Title      = "Maria Santos"
    Department = "Finance"
    LastDay    = (Get-Date).AddDays(21).ToString("yyyy-MM-dd")
}

$emp2Tasks = @(
    @{ Title = "Disable Active Directory account";    OwningDepartment = "IT";         Status = "Pending"; Notes = "" },
    @{ Title = "Revoke financial system access";      OwningDepartment = "IAM";        Status = "Pending"; Notes = "Includes Xero, NetSuite, and banking portal." },
    @{ Title = "Collect laptop and access badge";     OwningDepartment = "IT";         Status = "Pending"; Notes = "" },
    @{ Title = "Final payroll processing";            OwningDepartment = "Finance";     Status = "Pending"; Notes = "Confirm outstanding leave balance payout with payroll." },
    @{ Title = "Handover of open purchase orders";   OwningDepartment = "Finance";     Status = "Pending"; Notes = "12 open POs to be reassigned to remaining team." },
    @{ Title = "Exit interview";                      OwningDepartment = "HR";         Status = "Pending"; Notes = "" },
    @{ Title = "Remove from finance approvals workflow"; OwningDepartment = "Finance"; Status = "Pending"; Notes = "Update delegation of authority register." },
    @{ Title = "Knowledge transfer — month-end close"; OwningDepartment = "Management"; Status = "Pending"; Notes = "Maria to document month-end procedure before departure." }
)

foreach ($task in $emp2Tasks) {
    Add-PnPListItem -List $TasksListName -Values @{
        Title            = $task.Title
        OwningDepartment = $task.OwningDepartment
        AssignedTo       = $currentUser.LoginName
        Status           = $task.Status
        Notes            = $task.Notes
        Employee         = $emp2.Id
    } | Out-Null
}

# Employee 3 — leaving today, offboarding complete
$emp3 = Add-PnPListItem -List $EmployeesListName -Values @{
    Title      = "James Okafor"
    Department = "HR"
    LastDay    = (Get-Date).ToString("yyyy-MM-dd")
}

$emp3Tasks = @(
    @{ Title = "Disable Active Directory account";   OwningDepartment = "IT";         Status = "Done"; Notes = "Completed." },
    @{ Title = "Revoke HR system access";            OwningDepartment = "IAM";        Status = "Done"; Notes = "Access removed from Workday and all HR portals." },
    @{ Title = "Collect laptop and access badge";    OwningDepartment = "IT";         Status = "Done"; Notes = "All equipment returned and checked in." },
    @{ Title = "Final payroll processing";           OwningDepartment = "Finance";    Status = "Done"; Notes = "Processed in this month's pay run." },
    @{ Title = "Exit interview";                     OwningDepartment = "HR";         Status = "Done"; Notes = "Completed. Feedback logged." },
    @{ Title = "Remove from mailing lists";          OwningDepartment = "IT";         Status = "Done"; Notes = "Removed from all internal and external distribution groups." },
    @{ Title = "Knowledge transfer — recruitment";  OwningDepartment = "Management"; Status = "Done"; Notes = "Handover notes provided to HR manager." },
    @{ Title = "Terminate benefits";                 OwningDepartment = "HR";         Status = "Done"; Notes = "KiwiSaver and health insurance terminated." }
)

foreach ($task in $emp3Tasks) {
    Add-PnPListItem -List $TasksListName -Values @{
        Title            = $task.Title
        OwningDepartment = $task.OwningDepartment
        AssignedTo       = $currentUser.LoginName
        Status           = $task.Status
        Notes            = $task.Notes
        Employee         = $emp3.Id
    } | Out-Null
}

$totalTasks = $emp1Tasks.Count + $emp2Tasks.Count + $emp3Tasks.Count
Write-Host "Sample data added: 3 employees, $totalTasks tasks" -ForegroundColor Green
Write-Host "Done. Open the hosted workbench and add the web part to test." -ForegroundColor Cyan
