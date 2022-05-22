# SPFx Web part / Teams tab Group members suggestion

## Summary

This web part uses Graph API to suggest you members to add to a group (based on People endpoint), so you can easily add those members to the Group / Teams. It can be used as a SharePoint web part or Teams tab

![Suggested Group Members Teams Tab](./assets/SuggestedMembersTeamsTab.jpg)



## Solution

Solution|Author(s)
--------|---------
react-teams-tab-suggested-members|[Luis Mañez](https://github.com/luismanez) (MVP, [ClearPeople](http://www.clearpeople.com), @luismanez)

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|Nov 18, 2018|Initial release

## Minimal Path to Awesome

* clone repo
* `gulp bundle --ship`
* `gulp package-solution --ship`
* deploy package to SharePoint App Catalog (check tenant deploy)
* `gulp package-teams` (custom gulp task to zip the Teams folder)
* follow Teams deployment instructions from here: [https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-web-part-as-ms-teams-tab#packaging-and-deploying-your-web-part-as-a-microsoft-teams-tab](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-web-part-as-ms-teams-tab#packaging-and-deploying-your-web-part-as-a-microsoft-teams-tab)

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features

This sample illustrates the following concepts on top of the SharePoint Framework:

* __Teams__ tab web part using ReactJS
* Using __GraphClient__ to call _/me/people_
* Graph API __Batch request__ to add members to a Group
* Gulp custom task to zip Teams folder
* Using _async / await_ for the async calls
* Office UI fabric PeoplePicker


## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-teams-tab-suggested-members") to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-teams-tab-suggested-members) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-teams-tab-suggested-members&template=bug-report.yml&sample=react-teams-tab-suggested-members&authors=@luismanez&title=react-teams-tab-suggested-members%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-teams-tab-suggested-members&template=question.yml&sample=react-teams-tab-suggested-members&authors=@luismanez&title=react-teams-tab-suggested-members%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-teams-tab-suggested-members&template=question.yml&sample=react-teams-tab-suggested-members&authors=@luismanez&title=react-teams-tab-suggested-members%20-%20).


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-teams-tab-suggested-members" />
