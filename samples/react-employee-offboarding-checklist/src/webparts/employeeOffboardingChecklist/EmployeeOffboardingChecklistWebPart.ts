import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'EmployeeOffboardingChecklistWebPartStrings';
import EmployeeOffboardingChecklist from './components/EmployeeOffboardingChecklist';
import { IEmployeeOffboardingChecklistProps } from './components/IEmployeeOffboardingChecklistProps';
import { getSP } from './pnpjsConfig';

export interface IEmployeeOffboardingChecklistWebPartProps {
  title: string;
  employeesListName: string;
  tasksListName: string;
}

export default class EmployeeOffboardingChecklistWebPart extends BaseClientSideWebPart<IEmployeeOffboardingChecklistWebPartProps> {

  public async onInit(): Promise<void> {
    await super.onInit();
    getSP(this.context); // Bootstrap PnP JS with the SP context before any component mounts.
  }

  public render(): void {
    const element: React.ReactElement<IEmployeeOffboardingChecklistProps> = React.createElement(
      EmployeeOffboardingChecklist,
      {
        title: this.properties.title || 'Employee Offboarding Dashboard',
        employeesListName: this.properties.employeesListName || 'OffboardingEmployees',
        tasksListName: this.properties.tasksListName || 'OffboardingTasks',
      }
    );
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: strings.PropertyPaneDescription },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title', { label: strings.TitleLabel }),
                PropertyPaneTextField('employeesListName', { label: strings.EmployeesListNameLabel }),
                PropertyPaneTextField('tasksListName', { label: strings.TasksListNameLabel }),
              ]
            }
          ]
        }
      ]
    };
  }
}
