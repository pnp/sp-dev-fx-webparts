$spSite = "https://giuleon.sharepoint.com/sites/demo" # => SharePoint site
$spListTitle = "Events" # => List name

Connect-PnPOnline $spSite -Credentials (Get-Credential)

New-PnPList -Title $spListTitle -Template GenericList

Add-PnPField -List $spListTitle -DisplayName "Description" -InternalName "SPFxDescription" -Type Text -Group "SPFx Group" -AddToDefaultView
Add-PnPField -List $spListTitle -DisplayName "Thumbnail" -InternalName "SPFxThumbnail" -Type Url -Group "SPFx Group" -AddToDefaultView