[CmdletBinding()]
Param (

    [Parameter(Mandatory = $False)]
    [switch]$OverwriteSettings,

    [Parameter(Mandatory = $False)]
    [switch]$Minified
)

$0 = $myInvocation.MyCommand.Definition
$CommandDirectory = [System.IO.Path]::GetDirectoryName($0)

$AppSettingsFilePath = Join-Path -Path $CommandDirectory -ChildPath "src\local.settings.json"
$AppSettings = Get-Content -Path $AppSettingsFilePath -Raw | ConvertFrom-Json

$ErrorActionPreference = 'Continue'

# Execute tests
npm run test:ci 2>&1 | Write-Host

if ($LASTEXITCODE -eq 1) {
    throw "Error during tests!"
}

# Build the solution
$ErrorActionPreference = 'Stop'

if ($Minified.IsPresent) {
    npm run build
} else {
    npm run build:dev
}

# Deploy the functions
Push-Location '.\dist'

# Get the Azure function name according to the settings
$AzureFunctionName = $AppSettings.Values.Azure_Function_Name

Write-Output "Deploy to function $AzureFunctionName..."

if ($OverwriteSettings.IsPresent) {
    # https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local#publish
    func azure functionapp publish $AzureFunctionName --publish-local-settings --overwrite-settings
} else {
    func azure functionapp publish $AzureFunctionName
}

Pop-Location