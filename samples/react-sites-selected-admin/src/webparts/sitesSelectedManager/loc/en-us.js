define([], function () {
  return {
    "DescriptionFieldLabel": "Webpart Title",
    "ShowAboutFieldLabel": "Show Home / About Tab",
    "AADGuidLabel": "Sites Selected Permission GUID",
    "ErrorNoAppsFoundMessage": `We couldn't find any apps with [Sites.Selected] - Don't think that's right? 
    Then you might want to double check the guid in webpart settings - The default is 883ea226-0bf2-4a8f-9f9d-92c9162a727d`,
    "ErrorGettingApps": "Unknown error occured getting your apps",
    "ErrorHintGettingApps": "- have you consented this web part in API management?",
    "ErrorHttp": "Http error occured",
    "ErrorGeneric": "Error occured",
    "ErrorUnknown": "Error occured",
    "ErrorNoPermissionsFound": "No permissions found for removal for app:",

    "ErrorHintUrlFormat": `- Check the format of your URL
    Correct format below:
    https://tenant.sharepoint.com/sites/thesite`,

    "HomeTabTitle": "Home / About",
    "HomeTitleMain": "What can this webpart do?",
    "HomeTitleFYI": "Good to know",
    "HomeFYI": `Due to api- and other limitations it is "not possible" to list all sites that have an app with permissions via this concept.
    Furthermore, when checking a site you will see that it has n apps with access but not what access (Read,Write or Read/Write)`,
    "HomeAccessTitle": "User access",
    "HomeAccess": "In order to grant access for an app, the user of this webpart has to be a Site Collection Administrator of the site.",
    "HomeBulletList": "List Azure AD applications that have the Microsoft graph api scope [Sites.Selected]",
    "HomeBulletAdd": "Add SharePoint sites to the listed apps which will enable the app to interact with these sites via the graph api",
    "HomeBulletClear": "Clear all SharePoint site permissions for the selected app",
    "HomeBulletCheck": "Check what app(s) that has been added to a specific SharePoint site",

    "AddTabTitle": "Add/Remove sites to Apps",

    "CheckTabTitle": "Check app permissions on a site",
    "CheckSiteLabel": "SharePoint site",
    "CheckSitePlaceholder": "Please enter URL here",
    "CheckButtonText": "Check permission",
    "CheckTextAreaLabel": "(Raw) - Permission object for site",

    "DialogAddSuccess": "Yay! - Permissions successfully added!",
    "DialogRemoveSuccess": "Yay! - Permissions successfully removed!",

    "DialogAddTitle": "Grant access",
    "DialogAddSubTitle": "Enter a SharePoint site collection URL into the text field and select the wanted access level",
    "DialogDelTitle": "Remove access",
    "DialogDelSubTitle": "Enter a SharePoint site collection URL into the text field and click \"remove\" to remove the access",

    "ListCommandBarAdd": "Add app permissions",
    "ListCommandBarDelete": "Clear app permissions",
    "ListColAppName": "App Name",
    "ListColAppId": "Azure AD App Id",

    "PermCheckTitle": "Check Permissions",
    "PermCheckHint": "If the result box shows [] it means there is no permissions granted",



    "LoadingMessage": "...loading",
    "Close": "Close",
    "WorkingOnIt": "Working on it...",


    "Read": "Read",
    "Write": "Write",
    "ReadWrite": "Read / Write",
    "Remove": "Remove",
    "Grant": "Grant",
    "Cancel": "Cancel",
    "Info": "Info"
  }
});