param (
    [Parameter(Mandatory=$true)]
    [string]$siteUrl)
    
Connect-PnPOnline -Url $siteUrl -Interactive

Set-PnPSite -NoScriptSite $false
Invoke-PnPSiteTemplate -Path ".\templates\Offerings.xml"

$ct = Get-PnPContentType -Identity "Offering"
Set-PnPContentType -Identity $ct -UpdateChildren

Set-PnPSite -NoScriptSite $true