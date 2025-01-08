# Deploy a Microsoft Copilot Studio copilot as a SharePoint component with single sign-on (SSO) enabled.

To follow through the end-to-end setup process, you would need to:

1. Configure Microsoft Entra ID authentication for your copilot.
2. Register your SharePoint site as a canvas app – an application that will host your copilot and handle the single sign-on flow.
3. Build the SharePoint component and configure its properties based on values from step (2).
4. Upload the component to SharePoint and add the component to your site.

## Step 1 - Configure Microsoft Entra ID authentication for your copilot

This step can be completed mostly by following the instructions here: [Configure user authentication with Microsoft Entra ID](https://learn.microsoft.com/en-us/power-virtual-agents/configuration-authentication-azure-ad), with some added configuration which is specified below. 

1. **Optional – add scopes for SharePoint and OneDrive**. For your copilot to use the Generative Answers capability over a SharePoint or OneDrive data source, you would need to configure additional scopes for the API permissions assigned to your app. Please refer to [Generative answers with Search and summarize: Authentication](https://learn.microsoft.com/en-us/power-virtual-agents/nlu-boost-node#authentication).


<p align="center">
  <img src="./images/apiPermissions.png" alt="API Permissions">
  <br>
  <em>API Permissions of the copilot app registration</em>
</p>


2. **Mandatory – populate the token exchange URL in the copilot’s authentication settings.** Your copilot will send this URL to any custom application hosting it, instructing the custom application it should sign users in by acquiring a token matching this custom scope. The value for “token exchange URL” is the full URI for the custom scope you have added when configuring a custom API. 

<p align="center">
  <img src="./images/customScope.png" alt="Custom Scope">
  <br>
  <em>The custom scope for the copilot app registration</em>
</p>
<br/>
<p align="center">
  <img src="./images/toeknExchangeURL.png" alt="Authentication Settings">
  <br>
  <em>Authentication configuration of the copilot, including token exchange URL</em>
</p>


Once all the steps under [Configure user authentication with Microsoft Entra ID](https://learn.microsoft.com/en-us/power-virtual-agents/configuration-authentication-azure-ad) have been completed and the optional additional scopes have been specified, you should be able to use Generative Answers over a SharePoint or OneDrive data source from the Microsoft Copilot Studio authoring experience. Please refer to [Use content on SharePoint or OneDrive for Business for generative answers](https://learn.microsoft.com/en-us/power-virtual-agents/nlu-generative-answers-sharepoint-onedrive) for instructions on add a SharePoint or OneDrive data source for your Copilot Generative Answers node.

Before moving to Step 2, make sure the Copilot Studio authoring canvas can successfully sign you in. If "Require users to sign in" is selected in the authentication settings, the canvas will try to sign in you in as soon as the conversation starts. Otherwise, the-sign in topic will have to be triggered by a specific event in the conversation. In case Generative Answers is configured over SharePoint or OneDrive, please make sure your copilot responds to questions as expected. 

**Important:** For now, the copilot canvas will use a validation code to sign you in, but once the setup is complete, users will be signed-in seamlessly.

## Step 2 - Register your SharePoint site as a custom canvas

A custom canvas is a custom application that hosts your copilot. In our case, it is also the application that will be responsible for a seamless sign-in experience.

In order to configure your SharePoint site as a canvas application with single sign-on enabled, follow the steps specified in [Configure single sign-on with Microsoft Entra ID](https://learn.microsoft.com/en-us/power-virtual-agents/configure-sso?tabs=webApp#create-app-registrations-for-your-custom-website). 

When configuring the canvas app registration, pay attention to the following details:

1. When adding a platform to the canvas app registration, select “Single-page application” and not “Web”. Web redirect URIs only support the implicit grant flow for authentication, which is considered less secure and cannot be used with MSAL.js 2.x, which is the authentication library included in the code sample provided here. For a discussion about the differences between Web and SPA redirects, please refer to: [https://github.com/MicrosoftDocs/azure-docs/issues/70484#issuecomment-791077654](https://github.com/MicrosoftDocs/azure-docs/issues/70484#issuecomment-791077654)

2. The redirect URI should be the same as the URL for your SharePoint site that will host the copilot. For example, if you plan to deploy the copilot on <https://mytenant.sharepoint.com/sites/MySite>, set this as your redirect URI.

   **Important:** Users can reach your SharePoint site via addresses that include trailing slashes. Since redirect URIs are sensitive to this variation, consider creating two redirect URIs representing the same site, with and without a trailing slash (for example: <https://mytenant.sharepoint.com/sites/MySite> and <https://mytenant.sharepoint.com/sites/MySite/>) 

3. The canvas app registration will need permissions for the custom API that was configured in *Step 1*. To add this permission, select an API from “APIs my organization uses” and search for the name you have given your copilot app registration in *Step 1*. For example, if your copilot app registration is called “SharePoint Bot Authentication” search for that name in the list of APIs, and select your custom scope (a name for your custom scope has been selected while configuring a custom API for your copilot app registration)

<p align="center">
  <img src="./images/apisMyOrganization.png" alt="APIs my organization uses">
  <br>
  <em>The API can be found under “APIs my organization uses”</em>
</p>
<br/>
<p align="center">
  <img src="./images/scopePermissions.png" alt="Permissions for the custom scope">
  <br>
  <em>Selecting the scope for the API</em>
</p>

4. After registering your canvas app, you will not have to use the code sample the page refers to. The code sample provided is a standalone web page implementing SSO for Microsoft Copilot Studio which can be used for testing purposes, but it is not a SharePoint component. 

   However, you will need to document the Application (client) ID for the SharePoint component configuration in the next step.

<p align="center">
  <img src="./images/clientID.png" alt="Document the Client ID">
  <br>
  <em>The Application (client) ID</em>
</p>



## Step 3 - Download and configure the SharePoint SPFx component

At this point you have a choice whether to configure and build the component yourself, or use the pre-built package that is included with this sample. Since this is only a reference sample, we encourage you to build the component yourself, but if you choose to deploy the pre-built package, skip ahead to **step 4**

1. Make sure your development environment includes the following tools and libraries:
   1. VS Code (or a similar code editor)
   2. A version of Node.JS which is [supported by the SPFx framework](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/compatibility#spfx-development-environment-compatibility) (for this sample, use either v16 or v18)
   3. A [Git](https://git-scm.com/downloads)  client for your OS
2. If the prerequisites above are satisfied, clone [CopilotStudioSamples (github.com)](https://github.com/microsoft/CopilotStudioSamples) into a local folder. 

   In this repo, you will find the SharePointSSOComponent project, which is a code sample for a SharePoint SPFx component (an Application Customizer), which renders a copilot at the bottom of all pages on a specific site. This SPFx component uses the MSAL library to perform a silent login and shares the user’s token with Microsoft Copilot Studio, providing a seamless single sign-on experience.
3. Using Visual Studio Code, open the local folder to which you have cloned the repository. The folder structure should look like below:

<p align="center">
  <img src="./images/folderStructure.png" alt="The project folder structure">
  <br>
  <em>The Project Folder Structure</em>
</p>


1. Locate elements.xml under SharePointSSOComponent/sharepoint/assets, and update the values in the file, using one of the two following options:

   *Option 1*: run the following python script and provide values based values from Steps 1 & 2 
   
   ```python
   python .\populate_elements_xml.py
   ```
    
   *Option 2*: manually replace placeholders in elements.xml with actual values. ClientSideComponentProperties accepts an escaped JSON string. 

    ```xml
    ClientSideComponentProperties="{&quot;botURL&quot;:&quot;YOUR_BOT_URL&quot;,&quot;customScope&quot;:&quot;YOUR_CUSTOM_SCOPE&quot;,&quot;clientID&quot;:&quot;YOU_CLIENT_ID&quot;,&quot;authority&quot;:&quot;YOUR_AAD_LOGIN_URL&quot;,&quot;greet&quot;:TRUE,&quot;buttonLabel&quot;:&quot;CHAT_BUTTON_LABEL&quot;,&quot;botName&quot;:&quot;BOT_NAME&quot;}"
    ```


    *Option 3*: leave elements.xml without changing any details, build and deploy the component on a site, and later configure the component by running [Configure-MCSForSite.ps1](./Configure-MCSForSite.ps1) (see instructions on how to run this script in step 4)


    ### Property details

    |Property Name|Explanation|Mandatory?|
    | :- | :- | :- |
    |botURL|The token endpoint for MCS. This can be found in the MCS designer, under Settings -> Channels -> Mobile App|Yes|
    |customScope|<p>The scope defined for the custom API in the copilot app registration (Step 1). For example:</p><p></p><p>api://35337616-eee1-4049-9d37-a78b24c3bef2/SPO.Read</p>|Yes|
    |clientID|The Application ID from the Canvas app registration configured in step 2|Yes|
    |authority|<p>The login URL for your tenant. For example:<br>https://login.microsoftonline.com/mytenant.onmicrosoft.com|Yes|
    |greet|Should the copilot greet users at the beginning of the conversation|No|
    |buttonLabel|The label for the button opening the chat dialog|No|
    |botName|The title for the copilot dialog|No|

<br/>

5. after populating properties in elements.xml, or if you left elements.xml untouched and plan to run Configure-MCSForSite.ps1 after building and deploying the component, open a new terminal in VS Code and navigate to the solution folder (the SharePointSSOComponent folder). Run the following commands:

    ```shell
    npm install
    gulp bundle --ship
    gulp package-solution --ship
    ```

    if gulp is not available, install it by running:

    ```shell
    npm install gulp-cli --global
    ```

6. The gulp package-solution command should create a packaged solution (.sppkg) in the sharepoint/solution folder

## Step 4 – Upload the component to SharePoint

1. Whether you have built the component yourself, or opted to use the pre-built package, you should see a file called **pva-extension-sso.sppkg** under [sharepoint/solution](./sharepoint/solution/). Follow the instructions in [Manage apps using the Apps site - SharePoint - SharePoint in Microsoft 365 | Microsoft Learn](https://learn.microsoft.com/en-us/sharepoint/use-app-catalog#add-custom-apps) to upload the sppkg file using your SharePoint admin center. After uploading the sppkg file, choose **Enable App** and not **Enable this app and add it to all sites**. 

   Once the app has been successfully uploaded and enabled, it will be visible under “Apps for SharePoint”

2. Add the app to a site where your copilot should be available for users. This should be the same site as the one you provided for “Redirect URI” in step 2. 

   To add an app to your site, follow the instructions in: [Add an app to a site - Microsoft Support](https://support.microsoft.com/en-us/office/add-an-app-to-a-site-ef9c0dbd-7fe1-4715-a1b0-fe3bc81317cb?ui=en-us&rs=en-us&ad=us).

3. If you left elements.xml untouched, or if you are uploading the pre-built package, or even in case you would like to override the values configured in elements.xml for the site on which the component has been deployed, you can now run [Configure-MCSForSite.ps1](./Configure-MCSForSite.ps1):

```PowerShell
.\Configure-McsForSite.ps1 -siteUrl "<siteUrl>" -botUrl "<botUrl>" -botName "<botName>" -greet $True -customScope "<customScope>" -clientId "<clientId>" -authority "<authority>" -buttonLabel "<buttonLabel>"
```

4. After adding the app (and running Configure-MCSForSite.ps1 in case elements.xml has been left untouched), a button will be appear at the bottom of all the pages under the target site. Clicking on the button will open a dialog with a chat canvas for your copilot. Based on the logic of your copilot, users will be signed in automatically at the beginning of the conversation, or when a specific event occurs. 

    <p align="center">
      <img src="./images/SharePointSSOComponent.png" alt="Copilot Component">
      <br>
      <em>The Copilot Component Dialog</em>
    </p>

    
