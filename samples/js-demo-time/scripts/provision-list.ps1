$siteUrl = "https://tenanttocheck.sharepoint.com/sites/hack" # Update to your site URL

Write-host 'ensure logged in'
$m365Status = m365 status --output text
if ($m365Status -eq "Logged Out") {
  m365 login
}

Write-host 'create demo time list'
$listName = 'demoTime'
$list = m365 spo list get --title $listName --webUrl $siteUrl --output 'json'
if ($null -eq $list) {
  Write-host 'list does not exist, I will create it'
  $list = m365 spo list add --title $listName --baseTemplate 'GenericList' --webUrl $siteUrl --output 'json'
}
else {
  Write-host 'list already exists'
}
$list = $list | ConvertFrom-Json

Write-host 'add pageName column'
$columnName = 'Page'
$column = m365 spo field get --webUrl $siteUrl --listUrl "Lists/$listName" --title $columnName --output 'json'
if ($null -eq $column) {
  $columnXml = "<Field ID='{ac827b0c-8b45-4b4f-927b-cddc4feee79e}' Type='Text' Name='Page' DisplayName='Page' Required='FALSE' SourceID='http://schemas.microsoft.com/sharepoint/v3' StaticName='Page' FromBaseType='TRUE' />"
  $column = m365 spo field add --webUrl $siteUrl --listTitle $listName --xml $columnXml --output 'json'
}

Write-host 'add section column'
$columnName = 'Section'
$column = m365 spo field get --webUrl $siteUrl --listUrl "Lists/$listName" --title $columnName --output 'json'
if ($null -eq $column) {
  $columnXml = "<Field ID='{6085e32a-339b-4da7-ab6d-c1e013e5ab27}' Type='Number' Name='Section' DisplayName='Section' Required='FALSE' SourceID='http://schemas.microsoft.com/sharepoint/v3' StaticName='Section' FromBaseType='TRUE' />"
  $column = m365 spo field add --webUrl $siteUrl --listTitle $listName --xml $columnXml --output 'json'
}

Write-host 'add comment column'
$columnName = 'Comment'
$column = m365 spo field get --webUrl $siteUrl --listUrl "Lists/$listName" --title $columnName --output 'json'
if ($null -eq $column) {
  $columnXml = "<Field ID='{5ee2dd25-d941-455a-9bdb-7f2c54aed11b}' Type='Text' Name='Comment' DisplayName='Comment' Required='FALSE' SourceID='http://schemas.microsoft.com/sharepoint/v3' StaticName='Comment' FromBaseType='TRUE' />"
  $column = m365 spo field add --webUrl $siteUrl --listTitle $listName --xml $columnXml --output 'json'
}

Write-Host 'done'