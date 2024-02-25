# CONNECTING TO ENVIRONMENT
$dev = ""
$test = ""
$prod = ""

$envurl = $dev
Connect-PnPOnline -Interactive -Url $envurl

#Create content types
Add-PnPContentType -Name "ToolItem" -ContentTypeId "0x0100b2a59b27e25341959bc1687f68d1785e" -Group "Custom" -Description "Content type to hold information about the tool"
Add-PnPContentType -Name "PersonalTools" -ContentTypeId "0x01001ba482dd07974a06a154ce8bc0240bed" -Group "Custom" -Description "Content Type to hold info about the current users selected tools"

#Add Fields
Add-PnPField -InternalName "tool_name" -DisplayName "Tool display name" -Type Text -Group "Tools"
Add-PnPField -InternalName "tool_url" -DisplayName "Tool url" -Type Text -Group "Tools"
Add-PnPField -InternalName "tool_username" -DisplayName "User email" -Type Text -Group "Tools"
Add-PnPField -InternalName "tool_usertools" -DisplayName "Personal Tools Settings" -Type Note -Group "Tools"

#Add fields to content type
Add-PnPFieldToContentType -Field "tool_name" -ContentType "ToolItem"
Add-PnPFieldToContentType -Field "tool_url" -ContentType "ToolItem"
#Add fields to content type
Add-PnPFieldToContentType -Field "tool_username" -ContentType "PersonalTools"
Add-PnPFieldToContentType -Field "tool_usertools" -ContentType "PersonalTools"


#Create list and add CT
New-PnPList -Title "AvailableTools" -Url "lists/availabletools" -Template GenericList
Add-PnPContentTypeToList -List "AvailableTools" -ContentType "ToolItem" 
Remove-PnPContentTypeFromList -List "AvailableTools" -ContentType "Item"


#Create list and add CT
New-PnPList -Title "PersonalTools" -Url "lists/personaltools" -Template GenericList
Add-PnPContentTypeToList -List "PersonalTools" -ContentType "PersonalTools"
Remove-PnPContentTypeFromList -List "PersonalTools" -ContentType "Item"