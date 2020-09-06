# React My Tasks Web Part 

## Summary


This web part allows user to manage planner tasks in SharePoint Site. The UI was inspired on Planner UI, it is full implemented with Office-UI-Fabric Components. Use MSGraph API's and PnPjs to data access.

The user can search task by name, can filter by progress status, all data are dynamic updated on change.


</br>
</br>


![MyTasks](/samples/react-mytasks/assets/MyTasks.gif)



##  List of Task Cards



![MyTasks](https://github.com/joaojmendes/sp-dev-fx-webparts/blob/My-Tasks/samples/react-mytasks/assets/screen1.png)

## Filter Tasks


![MyTasks](https://github.com/joaojmendes/sp-dev-fx-webparts/blob/My-Tasks/samples/react-mytasks/assets/screen2.png)  

</br>
</br>


![tenant properties](https://github.com/joaojmendes/sp-dev-fx-webparts/blob/My-Tasks/samples/react-mytasks/assets/screen3.png)  


</br>
</br>


![tenant properties](/samples/react-mytasks/assets/screen4.png) 


</br>
</br>


![tenant properties](/samples/react-mytasks/assets/screen5.png)  

</br>
</br>

## Add Task  
  
![MyTasks](/samples/react-mytasks/assets/AddTask.gif)

</br>
</br>



![tenant properties](/samples/react-mytasks/assets/screen6.png)  

</br>
</br>


![tenant properties](/samples/react-mytasks/assets/screen7.png)  

</br>
</br>

## Edit Tasks


![MyTasks](/samples/react-mytasks/assets/EditTask.gif)

</br>
</br>

![tenant properties](/samples/react-mytasks/assets/screen8.png)  
  

</br>
</br>


![tenant properties](/samples/react-mytasks/assets/screen9.png)  
  

</br>
</br>


![tenant properties](/samples/react-mytasks/assets/screen10.png)  

</br>
</br>


![tenant properties](/samples/react-mytasks/assets/screen11.png)  

  

</br>
</br>


![tenant properties](/samples/react-mytasks/assets/screen12.png)  


</br>
</br>



![tenant properties](/samples/react-mytasks/assets/screen13.png)  

  
</br>
</br>



![tenant properties](/samples/react-mytasks/assets/screen14.png)  

  


## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/version-1.9.1-green.svg)

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

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|November 17, 2019|Initial release

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
