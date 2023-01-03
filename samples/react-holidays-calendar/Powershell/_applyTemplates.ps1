$siteurl = "<Site URL>"


Connect-PnPOnline -Url $siteurl -Interactive
Write-Host "...Connected successfully"
$continue = Read-Host "Click C to continue"
if ($continue -ne "C") {
    exit
}

$inputTemplateFile = "Metadata.xml" 
Invoke-PnPSiteTemplate -Path $inputTemplateFile -Handlers Lists