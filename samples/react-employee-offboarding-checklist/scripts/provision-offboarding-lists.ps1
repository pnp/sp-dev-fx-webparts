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


