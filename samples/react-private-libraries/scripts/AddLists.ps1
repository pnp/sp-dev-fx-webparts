cd C:\Users\trwg1\sp-dev-fx-webparts\samples\react-private-libraries\scripts\
#connect-pnponline -Url "https://russellwgove.sharepoint.com/sites/deleteme"
$it=Get-Content '.\rfx.json'-Raw 
Add-PNPSiteScript  -Title "RFx Lists" -Content $it

