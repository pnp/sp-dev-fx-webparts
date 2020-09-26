# Function to connect to the SharePoint Online using cert or credentials
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
function uploadToUserProfilePictures ($mysiteurl, $filename, $streamval, $usecert) {
    connectSPOnline -targeturl $mysiteurl -usecert $usecert
    Add-PnPFile -Stream $streamval -FileName $filename -Folder $userphotofolder
}
function updateUserProperty($adminurl, $mysiteurl, $upn, $pictureName, $usecert) {
    connectSPOnline -targeturl $adminurl -usecert $usecert
    Set-PnPUserProfileProperty -Account $upn -PropertyName "PictureUrl" -Value "$mysiteurl/$userphotofolder/$pictureName"
    Set-PnPUserProfileProperty -Account $upn -PropertyName "SPS-PicturePlaceholderState" -Value 0
}
function getFileAndUpload ($adminurl, $mysiteurl, $targetsiteurl, $userid, $picfolder, $picname, $usecert) {
    try {
        connectSPOnline -targeturl $targetsiteurl -usecert $usecert        
        $lfilename = $picname+"_LThumb.jpg"
        $lpicurl = $picfolder+$lfilename
        $lfs = (Get-PnPFile -ServerRelativeUrl $lpicurl).OpenBinaryStream()
        Invoke-PnPQuery    
        uploadToUserProfilePictures -mysiteurl $mysiteurl -filename $lfilename -streamval $lfs.Value

        connectSPOnline -targeturl $targetsiteurl -usecert $usecert
        $mfilename = $picname+"_MThumb.jpg"
        $mpicurl = $picfolder+$mfilename
        $mfs = (Get-PnPFile -ServerRelativeUrl $mpicurl).OpenBinaryStream()    
        Invoke-PnPQuery
        uploadToUserProfilePictures -mysiteurl $mysiteurl -filename $mfilename -streamval $mfs.Value
        updateUserProperty -adminurl $adminurl -mysiteurl $mysiteurl -upn $userid -pictureName $mfilename

        connectSPOnline -targeturl $targetsiteurl -usecert $usecert
        $sfilename = $picname+"_SThumb.jpg"
        $spicurl = $picfolder+$sfilename
        $sfs = (Get-PnPFile -ServerRelativeUrl $spicurl).OpenBinaryStream()
        Invoke-PnPQuery
        uploadToUserProfilePictures -mysiteurl $mysiteurl -filename $sfilename -streamval $sfs.Value

        return $true
    } catch {
        return $false
    }    
}
# Read the request as a JSON object
$jsoninput = Get-Content $req -Raw | ConvertFrom-Json
# Configure local variable
$adminurl = $jsoninput.adminurl
$mysiteurl = $jsoninput.mysiteurl
$targetsiteurl = $jsoninput.targetsiteurl
$picfolder = $jsoninput.picfolder
$usecert = $jsoninput.usecert
$itemid = $jsoninput.itemid
$clearPhotos = $jsoninput.clearPhotos
$targetList = "UPS Photo Sync Jobs"
$userphotofolder = "User Photos/Profile Pictures"
# Update the status of the item to 'In-Progress'
connectSPOnline -targeturl $targetsiteurl -usecert $usecert
Set-PnPListItem -List $targetList -Identity $itemid -Values @{"Status" = "In-Progress" } -SystemUpdate
foreach ($val in $jsoninput.value) {
    if ($null -ne $val.userid -and $null -ne $val.picturename) { 
        $status = getFileAndUpload -adminurl $adminurl -mysiteurl $mysiteurl -targetsiteurl $targetsiteurl -userid $val.userid -picfolder $picfolder -picname $val.picturename -usecert $usecert
        if ($null -eq $val.Status) {
            if($true -eq $status) {
                $val | Add-Member -Name "Status" -Value "Updated" -MemberType NoteProperty
            } else {
                $val | Add-Member -Name "Status" -Value "Not Updated" -MemberType NoteProperty
            }            
        } else {
            if($true -eq $status) {
                $val.Status = "Updated"
            } else {
                $val.Status = "Not Updated"
            }
        }
        # If the clear photos flag is set delete all the temporary thumbnails
        connectSPOnline -targeturl $targetsiteurl -usecert $usecert
        if($true -eq $clearPhotos) {
            $filename = "{0}{1}{2}" -f $picfolder,$val.picturename,"_LThumb.jpg"
            Remove-PnPFile -ServerRelativeUrl $filename -Force
            $filename = "{0}{1}{2}" -f $picfolder,$val.picturename,"_MThumb.jpg"
            Remove-PnPFile -ServerRelativeUrl $filename -Force
            $filename = "{0}{1}{2}" -f $picfolder,$val.picturename,"_SThumb.jpg"
            Remove-PnPFile -ServerRelativeUrl $filename -Force
        }        
    }
}
# JSON after updating the properties of the user
$jsonOutput = $jsoninput | ConvertTo-Json -depth 100 -Compress
Set-PnPListItem -List $targetList -Identity $itemid -Values @{"SyncedData" = $jsonOutput; "Status" = "Completed" } -SystemUpdate