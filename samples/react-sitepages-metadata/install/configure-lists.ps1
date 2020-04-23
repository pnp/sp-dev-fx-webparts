function EnsureLookupField($fieldName, $fieldDisplayName, $targetList, $lookupList) {
    $field = $null
    $field = Get-PnPField -List $targetList -Identity $fieldName -ErrorAction SilentlyContinue
    if ($field -eq $null) {
        $guid = [System.Guid]::NewGuid().ToString("B")
        $xml = "<Field Type='Lookup' `
            DisplayName='$fieldDisplayName' `
            Required='FALSE' `
            EnforceUniqueValues='FALSE' UnlimitedLengthInDocumentLibrary='FALSE' RelationshipDeleteBehavior='None' `
            List='$($lookupList.Id.ToString("B"))' `
            ShowField='Title' `
            ID='$guid' `
            Name='$fieldName'  />"
        $field = Add-PnPFieldFromXml -List $targetList -FieldXml $xml
        $targetList.Update()
        $dv = $targetList.DefaultView
        $dv.ViewFields.Add($fieldName)
        $dv.Update()
    }
} 

function EnsureLookupStructure($lookupsList) {   
    $lstSitePages = Get-PnpList -Identity "SitePages"

    $lookupsList | Foreach {
        # ensure list
        $list = $null
        $list = Get-PnPList -Identity $_.InternalName
        if ($list -eq $null) {
            $list = New-PnPList -Template GenericList -Url $_.InternalName -Title $_.Title
            $list = Get-PnPList -Identity $_.InternalName

            # ensure lookup field in SitePAges
            EnsureLookupField $_.InternalName $_.Title $lstSitePages $list
        }       
    }
}


############################
# ENTRY POINT 
############################
$targetUrl = "https://<your-tenant>.sharepoint.com/sites/<target-site>"
Connect-PnPOnline -Url $targetUrl -UseWebLogin

# Fill the list with internal name / title pairs for lookup lists / fields
$lookupsList = @()
$lookupsList += @{InternalName="Category";Title="Category"}
$lookupsList += @{InternalName="CustomValue";Title="Custom value"}

EnsureLookupStructure $lookupsList