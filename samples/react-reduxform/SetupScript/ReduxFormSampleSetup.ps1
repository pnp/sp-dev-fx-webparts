Connect-PnPOnline -Url <URL>

Write-Host "Starting the setup....."

$fieldAndCTGroup = "ReduxFormSample"

Write-Host "Creating fields....."

Add-PnPField -DisplayName ProductCode -InternalName ProductCode -Type Text -Group  $fieldAndCTGroup -ErrorAction SilentlyContinue
Add-PnPField -DisplayName PurchasedFor -InternalName PurchasedFor -Type Choice -Choices IT,Admin,HR,Finance -Group  $fieldAndCTGroup -ErrorAction SilentlyContinue
Add-PnPField -DisplayName TypeOfPR -InternalName TypeOfPR -Type Choice -Choices @("Maintenance","IT Asset Purchase","Stationary","Other Services") -Group  $fieldAndCTGroup -ErrorAction SilentlyContinue
Add-PnPField -DisplayName PurchaseRequestID -InternalName PurchaseRequestID -Type Number -Group  $fieldAndCTGroup -ErrorAction SilentlyContinue
Add-PnPField -DisplayName Quantity -InternalName Quantity -Type Number -Group  $fieldAndCTGroup -ErrorAction SilentlyContinue
Add-PnPField -DisplayName RatePerUnit -InternalName RatePerUnit -Type Number -Group  $fieldAndCTGroup -ErrorAction SilentlyContinue
Add-PnPField -DisplayName TotalCost -InternalName TotalCost -Type Number -Group  $fieldAndCTGroup -ErrorAction SilentlyContinue

Write-Host "Creating content types....."

Add-PnPContentType -Name 'PurchaseRequest' -Group $fieldAndCTGroup -ErrorAction SilentlyContinue
$purchaseRequestCT = Get-PnPContentType -Identity 'PurchaseRequest'

Add-PnPContentType -Name 'PurchaseRequestItems' -Group $fieldAndCTGroup -ErrorAction SilentlyContinue
$purchaseRequestItemsCT = Get-PnPContentType -Identity 'PurchaseRequestItems'


Write-Host "Adding fields to content type....."

# Add columns to purchase request CT
Add-PnPFieldToContentType -Field PurchasedFor -ContentType $purchaseRequestCT
Add-PnPFieldToContentType -Field TypeOfPR -ContentType $purchaseRequestCT

# Add columns to purchase request items CT
Add-PnPFieldToContentType -Field ProductCode -ContentType $purchaseRequestItemsCT
Add-PnPFieldToContentType -Field Quantity -ContentType $purchaseRequestItemsCT
Add-PnPFieldToContentType -Field RatePerUnit -ContentType $purchaseRequestItemsCT
Add-PnPFieldToContentType -Field TotalCost -ContentType $purchaseRequestItemsCT
Add-PnPFieldToContentType -Field PurchaseRequestID -ContentType $purchaseRequestItemsCT

Write-Host "Creating lists....."

New-PnPList -Title 'PurchaseRequest' -Template GenericList -Url Lists/PurchaseRequest -ErrorAction SilentlyContinue
$purchaseRequestList = Get-PnPList -Identity Lists/PurchaseRequest
Set-PnPList -Identity 'PurchaseRequest' -EnableContentTypes $true
Add-PnPContentTypeToList -List $purchaseRequestList -ContentType $purchaseRequestCT -DefaultContentType


New-PnPList -Title 'PurchaseRequestItems' -Template GenericList -Url Lists/PurchaseRequestItems -ErrorAction SilentlyContinue
$purchaseRequestItemsList = Get-PnPList -Identity Lists/PurchaseRequestItems
Set-PnPList -Identity 'PurchaseRequestItems' -EnableContentTypes $true
Add-PnPContentTypeToList -List $purchaseRequestItemsList -ContentType $purchaseRequestItemsCT -DefaultContentType


Write-Host "Setting up list views....."

Add-PnPView -List $purchaseRequestList -Title PurchaseRequest -SetAsDefault -Fields PurchasedFor,TypeOfPR,Author
Add-PnPView -List $purchaseRequestItemsList -Title PurchaseRequestItems -SetAsDefault -Fields ProductCode,Quantity,RatePerUnit,TotalCost,PurchaseRequestID


Write-Host "Setup completed....."