function connectSPOnline ($targeturl, $usecert) {
    if($usecert -eq $true) {
        # Using cert
        $tenant = $env:Tenant
        $clientid = $env:ClientID
        $thumbprint = $env:Thumbprint
        # Connect to the root site collections using cert
        Connect-PnPOnline -Url $targeturl -ClientId $clientid -Thumbprint $thumbprint -Tenant $tenant
    } else {
        # Using service account and password
        $serviceAccount = $env:ServiceAccount
        $serviceAccountPwd = $env:ServiceAccountPwd
        # Connect to the root site collections with the service account
        $encPassword = ConvertTo-SecureString -String $serviceAccountPwd -AsPlainText -Force
        $cred = New-Object -TypeName System.Management.Automation.PSCredential -ArgumentList $serviceAccount, $encPassword
        Connect-PnPOnline -Url $targeturl -Credentials $cred
    }
}

# Read the request as a JSON object
$jsoninput = Get-Content $req -Raw | ConvertFrom-Json
# Configure local variable
$targetSiteUrl = $jsoninput.targetSiteUrl
$targetAdminUrl = $jsoninput.targetAdminUrl
$usecert = $jsoninput.usecert
$itemid = $jsoninput.itemId
$targetList = "UPS Sync Jobs"

$targetSiteUrl

# Formatted compressed JSON to be stored in list.
$dataToSync = $jsoninput | ConvertTo-Json -depth 100 -Compress

connectSPOnline -targeturl $targetSiteUrl -usecert $usecert
Set-PnPListItem -List $targetList -Identity $itemid -Values @{"Status" = "In-Progress" } -SystemUpdate

connectSPOnline -targeturl $targetAdminUrl -usecert $usecert
# Iterate the JSON object and update SharePoint User Profile property
foreach ($val in $jsoninput.value) {
    if ($null -ne $val.properties) { 
        foreach ($prop in $val.properties) {
            try {
                if(($null -ne $prop.value) -and ($prop.value -ne "")) {
                    if($prop.name -eq "Department") {
                        Set-PnPUserProfileProperty -Account $val.userid -Property "SPS-Department" -Value $prop.value
                    }
                    if($prop.name -eq "Title"){
                        Set-PnPUserProfileProperty -Account $val.userid -Property "SPS-JobTitle" -Value $prop.value
                    }
                    if($prop.name -eq "Office"){
                        Set-PnPUserProfileProperty -Account $val.userid -Property "SPS-Location" -Value $prop.value
                    }                    
                    Set-PnPUserProfileProperty -Account $val.userid -Property $prop.name -Value $prop.value
                    if ($null -eq $prop.Status) {
                        $prop | Add-Member -Name "Status" -Value "Updated" -MemberType NoteProperty
                    }
                    else {
                        $prop.Status = "Updated"
                    }
                }
                else {
                    if ($null -eq $prop.Status) {
                        $prop | Add-Member -Name "Status" -Value "Not Updated" -MemberType NoteProperty
                    }
                    else {
                        $prop.Status = "Not Updated"
                    }
                }                
            }
            catch {
                if ($null -eq $prop.Error) {
                    $prop | Add-Member -Name "Error" -Value "An error occurred while updating the property!" -MemberType NoteProperty
                }
                else {
                    $prop.Error = "An error occurred while updating the property!"
                }
            }            
        }
    }
}

connectSPOnline -targeturl $targetSiteUrl -usecert $usecert
# JSON after updating the properties of the user
$jsonOutput = $jsoninput | ConvertTo-Json -depth 100 -Compress
Set-PnPListItem -List $targetList -Identity $itemid -Values @{"SyncedData" = $jsonOutput; "Status" = "Completed" } -SystemUpdate