<#
    Clone the repository first: git clone https://github.com/pnp/copilot-prompts.git

    Execute;
    .\prepare-sample-data.ps1 -RepoPath "C:\temp\copilot-prompts" -OutputPath "C:\temp\reports\copilot-prompts-samples.json"
#>

param(
    [Parameter(Mandatory = $true, HelpMessage = "Path to the local copilot-prompts repository")]
    [string]$RepoPath,
    [Parameter(HelpMessage = "Output path for the JSON report")]
    [string]$OutputPath = ".\copilot-prompts-samples.json"
)

function TestRepositoryPath {
    param(
        [string]$Path
    )
    
    if (-not (Test-Path $Path)) {
        Write-Error "Repository path does not exist: $Path"
        return $false
    }
    
    $samplesPath = Join-Path $Path "samples"
    if (-not (Test-Path $samplesPath)) {
        Write-Error "Samples directory not found at: $samplesPath"
        Write-Host "Please ensure you are pointing to the root of the copilot-prompts repository." -ForegroundColor Yellow
        return $false
    }
    
    return $true
}

function GetSampleDirectories {
    param(
        [string]$SamplesPath
    )
    
    if (-not (Test-Path $SamplesPath)) {
        Write-Warning "Samples path does not exist: $SamplesPath"
        return @()
    }
    
    $sampleDirs = Get-ChildItem -Path $SamplesPath -Directory
    return $sampleDirs
}

function GetContentBetweenHeaders {
    param(
        [string[]]$Lines,
        [string]$StartHeader,
        [string]$EndHeader = $null
    )
    
    $startIndex = -1
    $endIndex = $Lines.Count
    
    for ($i = 0; $i -lt $Lines.Count; $i++) {
        $line = $Lines[$i].Trim()
        if ($line -match "^#+\s*$StartHeader" -or 
            $line -match "^#+\s*.*$StartHeader.*" -or
            $line -match "^$StartHeader\s*$" -or
            $line -match "^.*$StartHeader.*💡.*$" -or
            $line -match "^.*$StartHeader.*ℹ️.*$") {
            $startIndex = $i + 1
            break
        }
    }
    
    if ($startIndex -eq -1) {
        return ""
    }
    
    for ($i = $startIndex; $i -lt $Lines.Count; $i++) {
        $line = $Lines[$i].Trim()
        if ($line -match "^#+\s+" -and 
            -not ($line -match "^#+\s*$StartHeader") -and
            -not ($line -match "^#+\s*###")) {  
            $endIndex = $i
            break
        }
    }
    
    if ($startIndex -ge $endIndex) {
        return ""
    }
    
    $content = $Lines[$startIndex..($endIndex - 1)] | Where-Object { $_ -ne $null }
    $result = ($content -join "`n").Trim()
    
    $result = $result -replace "^### Description.*ℹ️.*`n", ""
    $result = $result -replace "^## Description.*ℹ️.*`n", ""
    $result = $result -replace "^Description.*ℹ️.*`n", ""
    
    return $result
}

function GetImagesFromMarkdown {
    param(
        [string]$Content,
        [string]$SamplePath,
        [string]$RepoUrl
    )
    
    $images = @()
    $imagePattern = '!\[[^\]]*\]\(([^)]+)\)'
    $sampleMatches = [regex]::Matches($Content, $imagePattern)

    foreach ($match in $sampleMatches) {
        $imagePath = $match.Groups[1].Value
        
        if ($imagePath.StartsWith('./')) {
            $fullPath = "$RepoUrl/blob/main/$SamplePath/" + $imagePath.Substring(2)
            
            $images += @{
                RelativePath  = $imagePath
                FullGitHubUrl = $fullPath
            }
        }
        elseif ($imagePath.StartsWith('/')) {
            $fullPath = "$RepoUrl/blob/main" + $imagePath
            
            $images += @{
                RelativePath  = $imagePath
                FullGitHubUrl = $fullPath
            }
        }
        else {
            if (-not $imagePath.Contains("m365-visitor-stats.azurewebsites.net")) {
                $images += @{
                    RelativePath  = $imagePath
                    FullGitHubUrl = $imagePath
                }
            }
        }
    }
    
    return $images
}

function ParsePrerequisites {
    param(
        [string]$Content
    )
    
    if ([string]::IsNullOrWhiteSpace($Content)) {
        return @("Other")
    }
    
    $prerequisites = @()
    $lines = $Content -split "`n" | Where-Object { $_.Trim() -ne "" }
    
    foreach ($line in $lines) {
        $cleanLine = $line.Trim()
        
        if ($cleanLine -match "^#+\s*" -or $cleanLine -eq "") {
            continue
        }
        
        if ($cleanLine -match '\[([^\]]+)\]\(([^)]+)\)') {
            $name = $matches[1].Trim()
            $url = $matches[2].Trim()
            
            $type = GetPrerequisiteType -Name $name -Url $url
            $prerequisites += $type
        }
        elseif ($cleanLine -match '^\*\s*(.+)' -or $cleanLine -match '^-\s*(.+)' -or $cleanLine -notmatch '^\s*$') {
            $text = if ($cleanLine -match '^\*\s*(.+)') { $matches[1].Trim() } 
            elseif ($cleanLine -match '^-\s*(.+)') { $matches[1].Trim() }
            else { $cleanLine.Trim() }
            
            $type = GetPrerequisiteType -Name $text
            $prerequisites += $type
        }
    }

    return ($prerequisites | Sort-Object -Unique)
}

function GetPrerequisiteType {
    param(
        [string]$Name,
        [string]$Url = ""
    )
    
    $nameAndUrl = "$Name $Url".ToLower()
    
    if ($nameAndUrl -match "copilot.*microsoft.*365|microsoft.*365.*copilot|m365.*copilot") {
        return "Microsoft 365 Copilot"
    }
    elseif ($nameAndUrl -match "github.*copilot|copilot.*github") {
        return "GitHub Copilot"
    }
    elseif ($nameAndUrl -match "copilot.*studio|studio.*copilot") {
        return "Copilot Studio"
    }
    elseif ($nameAndUrl -match "power.*platform|powerplatform") {
        return "Power Platform"
    }
    elseif ($nameAndUrl -match "sharepoint|sp") {
        return "SharePoint"
    }
    elseif ($nameAndUrl -match "teams") {
        return "Microsoft Teams"
    }
    elseif ($nameAndUrl -match "excel") {
        return "Microsoft Excel"
    }
    elseif ($nameAndUrl -match "word") {
        return "Microsoft Word"
    }
    elseif ($nameAndUrl -match "powerpoint|ppt") {
        return "Microsoft PowerPoint"
    }
    elseif ($nameAndUrl -match "outlook") {
        return "Microsoft Outlook"
    }
    elseif ($nameAndUrl -match "azure") {
        return "Microsoft Azure"
    }
    elseif ($nameAndUrl -match "whiteboard") {
        return "Microsoft Whiteboard"
    }
    elseif ($nameAndUrl -match "viva") {
        return "Microsoft Viva"
    }
    elseif ($nameAndUrl -match "developer.*program|dev.*program") {
        return "Developer Program"
    }
    else {
        return "Other"
    }
}

function ParseReadmeContent {
    param(
        [string]$Content,
        [string]$SamplePath,
        [string]$RepoUrl,
        [string]$SampleName
    )
    
    $lines = $Content -split "`n"
    
    $title = ""
    foreach ($line in $lines) {
        if ($line -match "^#\s*(.+)") {
            $title = $matches[1].Trim()
            break
        }
    }
    
    $promptPatterns = @("Prompt.*💡", "Prompt", "## Prompt💡")
    $prompt = ""
    foreach ($pattern in $promptPatterns) {
        $prompt = GetContentBetweenHeaders -Lines $lines -StartHeader $pattern
        if ($prompt -ne "") { break }
    }
    
    $descPatterns = @("Description.*ℹ️", "Description", "Summary", "## Summary")
    $description = ""
    foreach ($pattern in $descPatterns) {
        $description = GetContentBetweenHeaders -Lines $lines -StartHeader $pattern
        if ($description -ne "") { break }
    }
    
    $images = GetImagesFromMarkdown -Content $Content -SamplePath $SamplePath -RepoUrl $RepoUrl
    
    $contributorsPattern = @("Contributors.*👨‍💻", "Contributors", "## Contributors")
    $contributors = ""
    foreach ($pattern in $contributorsPattern) {
        $contributors = GetContentBetweenHeaders -Lines $lines -StartHeader $pattern
        if ($contributors -ne "") { break }
    }
    
    $versionPattern = @("Version history", "## Version history")
    $versionHistory = ""
    $firstVersionDate = ""
    foreach ($pattern in $versionPattern) {
        $versionHistory = GetContentBetweenHeaders -Lines $lines -StartHeader $pattern
        if ($versionHistory -ne "") { 
            $versionLines = $versionHistory -split "`n"
            foreach ($versionLine in $versionLines) {
                if ($versionLine -match "^\s*[\d\.]+\s*\|\s*([^|]+)\s*\|") {
                    $firstVersionDate = $matches[1].Trim()
                    break
                }
            }
            break 
        }
    }
    
    $prerequisitesPattern = @("Prerequisites", "## Prerequisites", "Prerequisite")
    $prerequisites = ""
    foreach ($pattern in $prerequisitesPattern) {
        $prerequisites = GetContentBetweenHeaders -Lines $lines -StartHeader $pattern
        if ($prerequisites -ne "") { break }
    }
    
    $parsedPrerequisites = ParsePrerequisites -Content $prerequisites
    
    return @{
        Title            = $title
        SamplePath       = $SamplePath
        SampleName       = $SampleName
        Prompt           = $prompt
        Description      = $description
        Images           = $images
        Contributors     = $contributors
        FirstVersionDate = $firstVersionDate
        Prerequisites    = $parsedPrerequisites
        ReadmeUrl        = "$RepoUrl/blob/main/$SamplePath/README.md"
    }
}

Write-Host "Begin processing Copilot prompts samples..." -ForegroundColor Green

$repoUrl = "https://github.com/pnp/copilot-prompts"

Write-Host "Validating repository path..." -ForegroundColor Yellow
if (-not (TestRepositoryPath -Path $RepoPath)) {
    Write-Host "Please clone the repository https://github.com/pnp/copilot-prompts.git and provide the correct path to the repository root" -ForegroundColor Yellow
    exit 1
}

$samplesPath = Join-Path $RepoPath "samples"

$sampleDirs = GetSampleDirectories -SamplesPath $samplesPath

if ($sampleDirs.Count -eq 0) {
    Write-Warning "No sample directories found in: $samplesPath"
    exit 1
}

$sampleResults = @()
$totalSamples = $sampleDirs.Count
$currentSample = 0
$successCount = 0
$failureCount = 0

Write-Host "Processing $totalSamples sample directories..." -ForegroundColor Cyan

foreach ($sampleDir in $sampleDirs) {
    $currentSample++
    $sampleName = $sampleDir.Name
    $samplePath = $sampleDir.FullName
    $readmePath = Join-Path $samplePath "README.md"
    
    Write-Host "[$currentSample/$totalSamples] Processing sample: $sampleName" -ForegroundColor Yellow
    
    if (Test-Path $readmePath) {
        try {
            $readmeContent = Get-Content -Path $readmePath -Raw -Encoding UTF8
            
            $relativeSamplePath = "samples/$sampleName"
            $parsedData = ParseReadmeContent -Content $readmeContent -SamplePath $relativeSamplePath -RepoUrl $repoUrl -SampleName $sampleName
            
            $sampleResults += $parsedData
            $successCount++
            
            Write-Host "  Successfully processed $sampleName" -ForegroundColor Green
        }
        catch {
            Write-Warning "  Failed to parse README for $sampleName : $($_.Exception.Message)"
            $failureCount++
        }
    }
    else {
        Write-Warning "  No README.md found for sample: $sampleName"
        $failureCount++
    }
}

Write-Host "`nGenerating report..." -ForegroundColor Yellow

$report = @{
    GeneratedOn           = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    Repository            = $GitHubRepo
    Branch                = $Branch
    LocalRepositoryPath   = $RepoPath
    TotalSamples          = $sampleResults.Count
    SuccessfulExtractions = $successCount
    FailedExtractions     = $failureCount
    Samples               = $sampleResults
}

try {
    $jsonReport = $report | ConvertTo-Json -Depth 10
    $jsonReport | Out-File -FilePath $OutputPath -Encoding UTF8

    Write-Host "  Total samples processed: $totalSamples" -ForegroundColor Cyan
    Write-Host "  Successful extractions: $successCount" -ForegroundColor Green
    Write-Host "  Failed extractions: $failureCount" -ForegroundColor Red
}
catch {
    Write-Error "Failed to generate JSON report: $($_.Exception.Message)"
    exit 1
}

Write-Host "`nProcessing completed successfully!" -ForegroundColor Green