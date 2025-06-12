# Connect to your SharePoint site
Connect-PnPOnline -Url "<SiteUrl>" -UseWebLogin

# Create the custom list
$listTitle = "Employee Recognition"
$list = New-PnPList -Title $listTitle -Template GenericList -OnQuickLaunch

# Set the description for the list (correct usage)
Set-PnPList -Identity $listTitle -Description "A list to capture employee-to-employee recognitions."

# Add fields
Add-PnPField -List $listTitle -DisplayName "From" -InternalName "From" -Type "User"
Add-PnPField -List $listTitle -DisplayName "To" -InternalName "To" -Type "User"
Add-PnPField -List $listTitle -DisplayName "Message" -InternalName "Message" -Type "Note"
Add-PnPField -List $listTitle -DisplayName "AwardType" -InternalName "AwardType" -Type "Choice" -AddToDefaultView `
    -Choices @("Commendation", "Team Player", "Milestone")
Add-PnPField -List $listTitle -DisplayName "Reactions_Medal" -InternalName "Reactions_Medal" -Type "Number"
Add-PnPField -List $listTitle -DisplayName "Reactions_Heart" -InternalName "Reactions_Heart" -Type "Number"
Add-PnPField -List $listTitle -DisplayName "Reactions_Clap" -InternalName "Reactions_Clap" -Type "Number"
Add-PnPField -List $listTitle -DisplayName "DateRecognized" -InternalName "DateRecognized" -Type "DateTime"