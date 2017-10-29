#################
# Configuration #
#################
$cdnSite = "https://giuleon.sharepoint.com/" # => CDN SharePoint site
$cdnLib = "cdn/SPFx-react-webhooks-realtime" # => Document library and eventual folders
#######
# End #
#######

Write-Host ************************************************************************************** -ForegroundColor Yellow
Write-Host * Reading the cdnBasePath from write-manifests.json and collectiong the bundle files * -ForegroundColor Yellow
Write-Host ************************************************************************************** -ForegroundColor Yellow
$cdnConfig = Get-Content -Raw -Path .\config\copy-assets.json | ConvertFrom-Json
$bundlePath = Convert-Path $cdnConfig.deployCdnPath
$files = Get-ChildItem $bundlePath\*.*

Write-Host **************************************** -ForegroundColor Yellow
Write-Host Uploading the bundle on Office 365 CDN * -ForegroundColor Yellow
Write-Host **************************************** -ForegroundColor Yellow
Connect-PnPOnline $cdnSite -Credentials giuleon
foreach ($file in $files) {
    $fullPath = $file.DirectoryName + "\" + $file.Name
    Add-PnPFile -Path $fullPath -Folder $cdnLib
}