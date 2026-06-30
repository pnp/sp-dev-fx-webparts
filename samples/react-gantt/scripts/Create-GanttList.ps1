<#
.SYNOPSIS
    Creates a SharePoint list with the required Gantt fields and populates it with sample data.

.DESCRIPTION
    This script uses PnP PowerShell to:
      1. Create a Generic list named "Project Tasks"
      2. Add all required/optional columns: StartDate, Duration, DueDate, PercentComplete, TaskType, ParentID
         (Title already exists by default)
      3. Insert 13 sample task items matching the web part mock data

.NOTES
    Prerequisites:
      - PnP.PowerShell module installed  →  Install-Module PnP.PowerShell -Scope CurrentUser
      - Run Connect-PnPOnline before executing this script

.EXAMPLE
    Connect-PnPOnline -Url "https://contoso.sharepoint.com/sites/yoursite" -Interactive -ClientId "your-app-id"
    .\Create-GanttList.ps1
#>

param(
    [Parameter()]
    [string]$ListName = "Project Tasks"
)

# ── Strict mode ──────────────────────────────────────────────────────
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Write-Host "▶ Creating list '$ListName'..." -ForegroundColor Cyan

# ── 1. Create the list ───────────────────────────────────────────────
$list = Get-PnPList -Identity $ListName -ErrorAction SilentlyContinue
if ($list) {
    Write-Host "  List '$ListName' already exists — skipping creation." -ForegroundColor Yellow
} else {
    New-PnPList -Title $ListName -Template GenericList -EnableVersioning | Out-Null
    Write-Host "  ✔ List created." -ForegroundColor Green
}

# ── 2. Add columns ──────────────────────────────────────────────────
Write-Host "▶ Adding columns..." -ForegroundColor Cyan

# StartDate (DateTime)
$field = Get-PnPField -List $ListName -Identity "StartDate" -ErrorAction SilentlyContinue
if (-not $field) {
    Add-PnPField -List $ListName -InternalName "StartDate" -DisplayName "Start Date" -Type DateTime -AddToDefaultView | Out-Null
    Write-Host "  ✔ StartDate" -ForegroundColor Green
} else {
    Write-Host "  – StartDate already exists" -ForegroundColor Yellow
}

# Duration (Number)
$field = Get-PnPField -List $ListName -Identity "Duration" -ErrorAction SilentlyContinue
if (-not $field) {
    Add-PnPField -List $ListName -InternalName "Duration" -DisplayName "Duration" -Type Number -AddToDefaultView | Out-Null
    Write-Host "  ✔ Duration" -ForegroundColor Green
} else {
    Write-Host "  – Duration already exists" -ForegroundColor Yellow
}

# DueDate (DateTime)
$field = Get-PnPField -List $ListName -Identity "DueDate" -ErrorAction SilentlyContinue
if (-not $field) {
    Add-PnPField -List $ListName -InternalName "DueDate" -DisplayName "Due Date" -Type DateTime -AddToDefaultView | Out-Null
    Write-Host "  ✔ DueDate" -ForegroundColor Green
} else {
    Write-Host "  – DueDate already exists" -ForegroundColor Yellow
}

# PercentComplete (Number)
$field = Get-PnPField -List $ListName -Identity "PercentComplete" -ErrorAction SilentlyContinue
if (-not $field) {
    Add-PnPField -List $ListName -InternalName "PercentComplete" -DisplayName "% Complete" -Type Number -AddToDefaultView | Out-Null
    Write-Host "  ✔ PercentComplete" -ForegroundColor Green
} else {
    Write-Host "  – PercentComplete already exists" -ForegroundColor Yellow
}

# TaskType (Choice: task, summary, milestone)
$field = Get-PnPField -List $ListName -Identity "TaskType" -ErrorAction SilentlyContinue
if (-not $field) {
    Add-PnPField -List $ListName -InternalName "TaskType" -DisplayName "Task Type" -Type Choice -Choices "task","summary","milestone" -AddToDefaultView | Out-Null
    Write-Host "  ✔ TaskType" -ForegroundColor Green
} else {
    Write-Host "  – TaskType already exists" -ForegroundColor Yellow
}

# ParentID (Number — stores the SP Item Id of the parent task)
$field = Get-PnPField -List $ListName -Identity "ParentID" -ErrorAction SilentlyContinue
if (-not $field) {
    Add-PnPField -List $ListName -InternalName "ParentID" -DisplayName "Parent Task ID" -Type Number -AddToDefaultView | Out-Null
    Write-Host "  ✔ ParentID" -ForegroundColor Green
} else {
    Write-Host "  – ParentID already exists" -ForegroundColor Yellow
}

Write-Host ""

# ── 3. Add sample data ──────────────────────────────────────────────
Write-Host "▶ Adding sample tasks..." -ForegroundColor Cyan

$today = [DateTime]::Today

function Get-OffsetDate([int]$offset) {
    return $today.AddDays($offset)
}

# Each task: Title, StartDate offset, Duration, Progress, TaskType, ParentID ($null = none)
$tasks = @(
    @{ Title = "Project Planning";        Offset =  0; Duration = 15; Progress = 45; Type = "summary";   ParentID = $null },
    @{ Title = "Requirements Gathering";  Offset =  0; Duration =  5; Progress = 80; Type = "task";      ParentID = 1     },
    @{ Title = "Architecture Design";     Offset =  5; Duration =  4; Progress = 50; Type = "task";      ParentID = 1     },
    @{ Title = "Design Review";           Offset =  9; Duration =  0; Progress =  0; Type = "milestone"; ParentID = 1     },
    @{ Title = "Development";             Offset = 10; Duration = 20; Progress = 25; Type = "summary";   ParentID = $null },
    @{ Title = "Frontend Development";    Offset = 10; Duration = 12; Progress = 30; Type = "task";      ParentID = 5     },
    @{ Title = "Backend Development";     Offset = 10; Duration = 14; Progress = 20; Type = "task";      ParentID = 5     },
    @{ Title = "API Integration";         Offset = 20; Duration =  6; Progress = 10; Type = "task";      ParentID = 5     },
    @{ Title = "Testing & QA";            Offset = 28; Duration = 10; Progress =  0; Type = "summary";   ParentID = $null },
    @{ Title = "Unit Tests";              Offset = 28; Duration =  5; Progress =  0; Type = "task";      ParentID = 9     },
    @{ Title = "Integration Tests";       Offset = 33; Duration =  5; Progress =  0; Type = "task";      ParentID = 9     },
    @{ Title = "Deployment";              Offset = 38; Duration =  3; Progress =  0; Type = "task";      ParentID = $null },
    @{ Title = "Go Live";                 Offset = 41; Duration =  0; Progress =  0; Type = "milestone"; ParentID = $null }
)

$count = 0
foreach ($task in $tasks) {
    $startDate = Get-OffsetDate -offset $task.Offset
    $dueDate   = $startDate.AddDays([Math]::Max($task.Duration, 1))

    $values = @{
        "Title"           = $task.Title
        "StartDate"       = $startDate
        "Duration"        = $task.Duration
        "DueDate"         = $dueDate
        "PercentComplete" = $task.Progress
        "TaskType"        = $task.Type
    }

    if ($null -ne $task.ParentID) {
        $values["ParentID"] = $task.ParentID
    }

    Add-PnPListItem -List $ListName -Values $values | Out-Null
    $count++
    Write-Host "  ✔ [$count/13] $($task.Title)" -ForegroundColor Green
}

Write-Host ""
Write-Host "Done! List '$ListName' created with $count sample tasks." -ForegroundColor Green
Write-Host "   Columns: Title, StartDate, Duration, DueDate, PercentComplete, TaskType, ParentID" -ForegroundColor Gray
