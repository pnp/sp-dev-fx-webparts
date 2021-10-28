cd C:\Users\trwg1\sp-dev-fx-webparts\samples\react-private-libraries\scripts\
connect-pnponline -Url "https://{tenant}.sharepoint.com/sites/{site}"
$it=Get-Content '.\rfx.json'-Raw 
$script=Add-PNPSiteScript  -Title "RFx Lists" -Content $it

$design=Add-PNPSiteDesign `
  -Title "Rfx Listes" `
  -WebTemplate "64" `
  -SiteScriptIds $script.Id `
  -Description "Creates RFX Libraries"

Invoke-PnPSiteDesign -Identity $design.Id


