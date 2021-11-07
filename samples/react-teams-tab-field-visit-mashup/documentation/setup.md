# Configuration - Field Visit Demo

## 1.	Setting up your development environment

The FieldVisit demo is a SharePoint Framework (SPFx) implementation. It is intended to demonstrate key SPFx capabilities hosted in SharePoint as well as Microsoft Teams.
Follow instructions from articles below to setup your Office 365 tenant and development environment

*	[Set up Office 365 Tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
* [Set up development environment](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment)

## 2.	SharePoint and Teams Configuration
The sample uses content from Teams and SharePoint to build the demo scenario. In this section we will walk through configuring Teams and SharePoint with demo content.

### Calendar Configuration
Select a Team in Microsoft Teams where you are owner and follow steps below

1.	Browse to the Team where you’d like this sample to be configured and navigate to General channel. **NOTE:** You can choose to configure the demo on any channel of your choice. For sake of simplicity, we will be referring to General channel throughout this document.
2.	Create a scheduled meeting and name it “Visit The Big Cheese (THEBI)”.
    *  Ensure the meeting is scheduled in the General channel
    * The demo shows the upcoming 1 week's appointments, so to keep the demo working, ensure the meeting is repeated once a week for however long you need the demo
    * Set the meeting duration as you wish, such as 1 hour from 10 AM to 11 AM
    * You may choose to add participants, but not mandatory. The meeting will be displayed under a tab for your username as well as any other users you add as participants.
    Since the meeting is scheduled in the channel, all team members will be able to join this meeting
3.	Log out and Log in using a different user login which has access to the same team. Repeat step 2 with a different name and time, for example "Building inspection (ANTON)”

**NOTE**: The meeting names have a 5 characters code in parenthesis, such as THEBI and ANTON. These are sample customer codes from Northwind database. If you’d like to use any other customer code, you can select one from link [here](https://services.odata.org/V3/Northwind/Northwind.svc/Customers). Note that the mock transaction data is not provided for every customer; you can view or add the mock data in the [Activity Service Mock](../src/webparts/fieldVisitTab/services/ActivityService/ActivityServiceMock.ts) class.

## SharePoint Configuration
In this section we will walk through configuration of SharePoint site, which will hold documents and photos.

1.	Browse to the SharePoint site collection of the Team configured above
    * Navigate to Files tab within your Teams’ General channel
    * Click on ‘Open in SharePoint’
    * Navigate to root of the document library ‘Documents’
2.	Add a new Column 
    * Click on ‘Add column’ -> Single line of Text
    * **Name:** Customer
    * Click Save
3.	Upload 3 sample documents / spreadsheets / PDF to Documents 
4.	Update properties of these 3 files with **Customer** attribute as THEBI
5.	Upload additional 3 documents / spreadsheets / PDF to Documents
6.	Update properties of these 3 files to ANTON
7.	Create a new ‘Picture Library’
    * Click on **Add an app** from the **Settings** menu
    * Search for **Picture Library**
    * Name the library **Photos**
8.	Navigate to newly created **Photos** picture library
9.	Create two new folders with names **THEBI** and **ANTON**
10.	Upload 2 sample pictures (.jpg or .png) in each folder

## 3.	Sample Project Updates
In this section we will make changes to the sample FieldVisit project
1.	Download the FieldVisit project from GitHub (link here)
2.	If you do not already have installed, download and install Visual Studio Code
3.	Open the folder where you've placed the demo code
4.	This sample uses Weather and Bing Map API to display Weather and Map within the web part. In order for the weather and map APIs to work, you will need to generate API keys using the links below:
    * **[Open Weather Maps](https://openweathermap.org/api)**
    * **[Bing Maps](https://docs.microsoft.com/en-us/bingmaps/getting-started/bing-maps-dev-center-help/getting-a-bing-maps-key)**
5.	Copy file **constants.sample.ts** in src\webparts\fieldvisittab to **constants.ts**
6.	Open constants.ts and update keys with your own keys. **NOTE:** These keys are used to retrieve map and weather from Bing. If you do not provide a valid key, maps and weather will not be displayed
7.	In Visual Studio Code, click on menu **Terminal -> New Terminal**
8.	Issue command `gulp bundle -–ship`
9.	Issue command `gulp trust-dev-cert` (**NOTE:** This step needs to be performed only once per development machine)
10.	Issue command `gulp package-solution -–ship`
11.	Ensure there are no errors for any of these commands.

## 4. Deploying Solution in SharePoint

In this section we will deploy the SPFx solution package into SharePoint App Catalog.

1.	Login as tenant admin in Office 365 and navigate to SharePoint Admin center at https://&lt;tenant&gt;-admin.sharepoint.com/_layouts/15/online/SiteCollections.aspx
2.	On the left menu bar, click on **apps**
3.	Click on **App Catalog**
4.	On the left menu bar, click on **Apps for SharePoint**
5.	Click on Upload and browse to folder where you have deployed the same code
6.	Navigate to **FieldVisitDemo\SPFx\sharepoint\solution** and select the **field-visit-demo-tab.spppkg** file
7.	Click on OK
8.	In the popup window **check** on **Make this solution available to all sites in organization** and click on **Deploy**
9.	Navigate to new SharePoint Admin Center at the following link: https://&lt;tenant&gt;-admin.sharepoint.com/_layouts/15/online/AdminHome.aspx
10.	From the left menu bar, click on **API Management**
11.	Select the permission for the field visit solution click on the  **Approve or Reject** button
12. Click **Approve** to approve the permissions

## 5. Using the Solution in SharePoint
In this section we will configure the web part on a SharePoint page.

1.	Navigate to SharePoint site collection configured in section SharePoint Configuration
2.	Add a new page
3.	Provide title of the page **Field Visit**
4.	Add a new web part and select **FieldVisitTab** web part
5.	Edit the properties of the web part and fill in as following
    * **Group Name:** Name of the Team where the sample is installed. Refer to Teams Configuration section
    * **Group/Team ID:** Here you need ID of the Team. Use the [Microsoft Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer) to find the ID of the Team
    * **Channel ID:** ID of the General channel. Use the [Microsoft Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer) to find the channel ID as well
6.	Save the web part configuration
7.	Publish this page 
8.	Navigate to the site collection home page and then navigate back to the page 
9.	You should see 2 appointments. Click on each appointment to see the documents, pictures, map and weather

## 6.	Deploying Solution in Teams

In this section we will deploy the SPFx FieldVisit TAB web part in Microsoft Teams as a tab. For simplicity sake, we will sideload the solution to a particular Team. Ensure Teams is [configured to allow side loading](https://docs.microsoft.com/en-us/microsoftteams/enable-features-office-365).

1.	Open File Explorer and navigate to **FieldVisitDemo\SPFx\teams** folder
2.	You will find 3 files – manifest.json, tab20x20.png and tab96x96.png. Select all 3 files and add them to a new compressed zip file
3.	Name the zip file **FieldVisitTeamsManifest.zip**
4.	Navigate to Team in which the solution is configured. Refer to Teams Configuration section
5.	Navigate to **Manage Team -> Apps**
6.	Click on **Upload a custom app** in the bottom right corner
7.	Select the Zip file you created, **FieldVisitTeamsManifest.zip**
8.	Navigate to the **General** channel and click on + to add a new TAB
9.	Select **FieldVisitTab**
10.	Click on **Save** in the TAB configuration screen. **NOTE:** We do not need to provide Team name, ID and Channel ID when configuring TAB in Team because the web part retrieves this information from the Teams context.
11.	Your new FIeldVisit Tab should now be configured showing 2 appointments. Click on each appointment to view further details such as documents, pictures, map and weather

## Acknowledgements

Many thanks to [Arbindo Chattopadhyay](https://www.linkedin.com/in/arbindoc/) for writing these instructions.
