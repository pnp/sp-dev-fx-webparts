# Install-Module -Name "PnP.PowerShell" -Scope CurrentUser
# Connect to your SharePoint site
Connect-PnPOnline -Url "https://thetaco1nz.sharepoint.com/sites/sudeep" -UseWebLogin

# Create the list
$list = New-PnPList -Title "Books" -Template GenericList -OnQuickLaunch:$true 

# Add fields matching your data structure
Add-PnPField -List $list -DisplayName "Number" -InternalName "Number" -Type Number -AddToDefaultView
Add-PnPField -List $list -DisplayName "BookAuthor" -InternalName "BookAuthor" -Type Text -AddToDefaultView
Add-PnPField -List $list -DisplayName "BookAbstract" -InternalName "BookAbstract" -Type Note -AddToDefaultView
Add-PnPField -List $list -DisplayName "Category" -InternalName "Category" -Type Text -AddToDefaultView
Add-PnPField -List $list -DisplayName "Price" -InternalName "Price" -Type Text -AddToDefaultView

# Add test data (sample items)
Add-PnPListItem -List $list -Values @{
    Number       = 1
    BookAuthor       = "GEORGE ORWELL"
    BookAbstract = "A dystopian social science fiction novel and cautionary tale. The novel is set in Airstrip One, a province of the superstate Oceania in a world of perpetual war, omnipresent government surveillance and public manipulation."
    Category     = "FICTION"
    Price        = "$12.99"
}
Add-PnPListItem -List $list -Values @{
    Number       = 2
    BookAuthor       = "J.R.R. TOLKIEN"
    BookAbstract = "An epic high-fantasy novel about a hobbit, Frodo Baggins, who inherits the One Ring from his cousin Bilbo and must destroy it in the fires of Mount Doom."
    Category     = "FANTASY"
    Price        = "$15.99"
}
Add-PnPListItem -List $list -Values @{
    Number       = 3
    BookAuthor       = "HARPER LEE"
    BookAbstract = "A story of racial injustice and the loss of innocence in the American South. The novel is renowned for its warmth and humor, despite dealing with serious issues of rape and racial inequality."
    Category     = "DRAMA"
    Price        = "$11.99"
}
Add-PnPListItem -List $list -Values @{
    Number       = 4
    BookAuthor       = "F. SCOTT FITZGERALD"
    BookAbstract = "A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan. The novel explores themes of decadence, idealism, resistance to change, and excess."
    Category     = "ROMANCE"
    Price        = "$13.99"
}
# Add more items as needed, following the same pattern

Write-Host "SharePoint list and test data provisioned successfully."