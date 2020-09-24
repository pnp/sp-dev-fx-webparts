# React My Tasks Web Part 

## Summary

This web part allows user to manage planner tasks in SharePoint Site. The UI was inspired on Planner UI, it is full implemented with Office-UI-Fabric Components. Use MSGraph API's and PnPjs to data access.

The user can search task by name, can filter by progress status, all data are dynamic updated on change.

![MyTasks](./assets/MyTasks.gif)

## List of Task Cards

![MyTasks](./assets/screen1.png)

## Filter Tasks

![MyTasks](./assets/screen2.png)  

</br>
</br>


![tenant properties](./assets/screen3.png)  


</br>
</br>


![tenant properties](./assets/screen4.png) 


</br>
</br>


![tenant properties](./assets/screen5.png)  

</br>
</br>

## Add Task  
  
![MyTasks](./assets/AddTask.gif)

</br>
</br>



![tenant properties](./assets/screen6.png)  

</br>
</br>


![tenant properties](./assets/screen7.png)  

</br>
</br>

## Edit Tasks


![MyTasks](./assets/EditTask.gif)

</br>
</br>

![tenant properties](./assets/screen8.png)  
  

</br>
</br>


![tenant properties](./assets/screen9.png)  
  

</br>
</br>


![tenant properties](./assets/screen10.png)  

</br>
</br>


![tenant properties](./assets/screen11.png)  

  

</br>
</br>


![tenant properties](./assets/screen12.png)  


</br>
</br>



![tenant properties](./assets/screen13.png)  

  
</br>
</br>



![tenant properties](./assets/screen14.png)  

  


## Used SharePoint Framework Version 
![SPFx 1.11](https://img.shields.io/badge/version-1.11.0-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## WebPart Properties
 
Property |Type|Required| comments
--------------------|----|--------|----------
WebPart Title| Text| no|
 

## Solution

The Web Part Use PnPjs library, Office-ui-fabric-react components and MSGraph API's

Solution|Author(s)
--------|---------
My Tasks |João Mendes
My Tasks |Swaminathan Sriram

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|November 17, 2019|Initial release
1.0.1|September 9, 2020|Upgraded to SPFx 1.11.

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Move to sample folder
- in the command line run:
  - `npm install`
  - `gulp build`
  - `gulp bundle --ship`
  - `gulp package-solution --ship`
  - `Add to AppCatalog and deploy`
   - `go to SharePoint Admin Center and Approve required API Permissions`


<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-MyTask" />
