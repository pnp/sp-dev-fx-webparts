Connect-PnPOnline -Url "https://yourtenant.sharepoint.com/sites/yoursite" -UseWebLogin

# Create Objectives list
New-PnPList -Title "Objectives" -Template GenericList -OnQuickLaunch
Add-PnPField -List "Objectives" -DisplayName "Quarter" -InternalName "Quarter" -Type Choice -AddToDefaultView -Choices @("Q1", "Q2", "Q3", "Q4")
Add-PnPField -List "Objectives" -DisplayName "Year" -InternalName "Year" -Type Number
Add-PnPField -List "Objectives" -DisplayName "Status" -InternalName "Status" -Type Choice -AddToDefaultView -Choices @("On Track", "At Risk", "Off Track", "Completed")
Add-PnPField -List "Objectives" -DisplayName "Notes" -InternalName "Notes" -Type Note

# Create Key Results list
New-PnPList -Title "Key Results" -Template GenericList -OnQuickLaunch
Add-PnPField -List "Key Results" -DisplayName "Progress" -InternalName "Progress" -Type Number
Add-PnPField -List "Key Results" -DisplayName "RAG Status" -InternalName "RAGStatus" -Type Choice -AddToDefaultView -Choices @("Green", "Yellow", "Red")
Add-PnPField -List "Key Results" -DisplayName "Last Update" -InternalName "LastUpdate" -Type Note
Add-PnPField -List "Key Results" -DisplayName "Updated By" -InternalName "UpdatedBy" -Type User


# Get the Objectives list
$objectivesList = Get-PnPList -Identity "Objectives"

# Define the lookup field XML
$lookupFieldXml = @"
<Field Type='Lookup'
       DisplayName='Objective'
       StaticName='Objective'
       Name='Objective'
       List='{$($objectivesList.Id)}'
       ShowField='Title'
       Required='FALSE'
       Group='Custom Columns' />
"@

# Add the lookup field to the "Key Results" list
Add-PnPFieldFromXml -List "Key Results" -FieldXml $lookupFieldXml