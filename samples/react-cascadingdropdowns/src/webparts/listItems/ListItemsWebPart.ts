import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'ListItemsWebPartStrings';
import ListItems from './components/ListItems';
import { IListItemsProps } from './components/IListItemsProps';

import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-property-pane';

export interface IListItemsWebPartProps {
  listName: string;
  itemName: string;
}

export default class ListItemsWebPart extends BaseClientSideWebPart<IListItemsWebPartProps> {
  private lists: IPropertyPaneDropdownOption[];
  private items: IPropertyPaneDropdownOption[];
  private listsDropdownDisabled: boolean = true;
  private itemsDropdownDisabled: boolean = true;
  private loadingIndicator: boolean = true;

  public render(): void {
    const element: React.ReactElement<IListItemsProps> = React.createElement(
      ListItems,
      {
        listName: this.properties.listName,
        itemName: this.properties.itemName,
        context: this.context,
        onConfigure: () => {
          this.context.propertyPane.open();
        }
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    return super.onInit();
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      showLoadingIndicator: this.loadingIndicator,   
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupFields: [
                PropertyPaneDropdown('listName', {
                  label: strings.ListNameFieldLabel,
                  options: this.lists,
                  disabled: this.listsDropdownDisabled
                }),
                PropertyPaneDropdown('itemName', {
                  label: strings.ItemNameFieldLabel,
                  options: this.items,
                  disabled: this.itemsDropdownDisabled,
                  selectedKey: this.properties.itemName // don't forget to bind this property so it is refreshed when the parent property changes
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected async onPropertyPaneConfigurationStart(): Promise<void> {
    // disable the item selector until lists have been loaded
    this.listsDropdownDisabled = !this.lists;

    // disable the item selector until items have been loaded or if the list has not been selected
    this.itemsDropdownDisabled = !this.properties.listName || !this.items;

    // nothing to do until someone selects a list
    if (this.lists) {
      return;
    }

    // show a loading indicator in the property pane while loading lists and items
    this.loadingIndicator = true;
    this.context.propertyPane.refresh();

    // load the lists from SharePoint
    const listOptions: IPropertyPaneDropdownOption[] = await this.loadLists();
    this.lists = listOptions;
    this.listsDropdownDisabled = false;

    // load the items from SharePoint
    const itemOptions: IPropertyPaneDropdownOption[] = await this.loadItems();
    this.items = itemOptions;
    this.itemsDropdownDisabled = !this.properties.listName;

    // remove the loading indicator
    this.loadingIndicator = false;
    this.context.propertyPane.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected async onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): Promise<void> {
    if (propertyPath === 'listName' && newValue) {
      // communicate loading items
      this.loadingIndicator = true;

      // push new list value
      super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);

      // reset selected item
      this.properties.itemName = ''; // use empty string to force property pane to reset the selected item. undefined will not trigger the reset

      // disable item selector until new items are loaded
      this.itemsDropdownDisabled = true;

      // refresh the item selector control by repainting the property pane
      this.context.propertyPane.refresh();

      // get new items
      const itemOptions: IPropertyPaneDropdownOption[] = await this.loadItems();

      // store items
      this.items = itemOptions;

      // enable item selector
      this.itemsDropdownDisabled = false;

      // clear status indicator
      this.loadingIndicator = false;

      // refresh the item selector control by repainting the property pane
      this.context.propertyPane.refresh();
    }
    else {
      super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
    }
  }


  private async loadLists(): Promise<IPropertyPaneDropdownOption[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await new Promise<IPropertyPaneDropdownOption[]>((resolve: (options: IPropertyPaneDropdownOption[]) => void, _reject: (error: any) => void) => {
      setTimeout((): void => {
        resolve([
          {
            key: 'sharedDocuments',
            text: 'Shared Documents'
          },
          {
            key: 'contracts',
            text: 'Contracts'
          },
          {
            key: 'policies',
            text: 'Company Policies'
          },
          {
            key: 'projectDocuments',
            text: 'Project Documents'
          },
          {
            key: 'tasks',
            text: 'Team Tasks'
          },
          {
            key: 'announcements',
            text: 'Announcements'
          },
          {
            key: 'contacts',
            text: 'Customer Contacts'
          },
          {
            key: 'projects',
            text: 'Active Projects'
          },
          {
            key: 'departments',
            text: 'Departments'
          },
          {
            key: 'trainingMaterials',
            text: 'Training Materials'
          }
        ]);
      }, 2000);
    });
  }

  private async loadItems(): Promise<IPropertyPaneDropdownOption[]> {
    if (!this.properties.listName) {
      // return empty options since no list has been selected
      return [];
    }

    // This is where you'd replace the mock data with the actual data from SharePoint
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await new Promise<IPropertyPaneDropdownOption[]>((resolve: (options: IPropertyPaneDropdownOption[]) => void, _reject: (error: any) => void) => {
      // timeout to simulate async call
      setTimeout(() => {
        const items: { [key: string]: { key: string; text: string }[] } = {
          sharedDocuments: [
            { key: 'annual_report_2024.pdf', text: 'Annual Report 2024.pdf' },
            { key: 'board_meeting_minutes.docx', text: 'Board Meeting Minutes Q3.docx' },
            { key: 'company_presentation.pptx', text: 'Company Overview Presentation.pptx' },
            { key: 'budget_planning_2025.xlsx', text: 'Budget Planning FY2025.xlsx' }
          ],
          contracts: [
            { key: 'vendor_agreement_001.pdf', text: 'Microsoft Enterprise Agreement.pdf' },
            { key: 'service_contract_002.pdf', text: 'AWS Cloud Services Contract.pdf' },
            { key: 'nda_template.docx', text: 'Non-Disclosure Agreement Template.docx' },
            { key: 'sla_document.pdf', text: 'Service Level Agreement - Support.pdf' }
          ],
          policies: [
            { key: 'hr_handbook_v3.pdf', text: 'Employee Handbook v3.0.pdf' },
            { key: 'it_security_policy.docx', text: 'IT Security Policy 2024.docx' },
            { key: 'remote_work_guidelines.pdf', text: 'Remote Work Guidelines.pdf' },
            { key: 'code_of_conduct.pdf', text: 'Code of Conduct and Ethics.pdf' },
            { key: 'data_privacy_policy.docx', text: 'Data Privacy Policy GDPR.docx' }
          ],
          projectDocuments: [
            { key: 'project_alpha_charter.docx', text: 'Project Alpha - Charter.docx' },
            { key: 'migration_plan.xlsx', text: 'SharePoint Migration Plan.xlsx' },
            { key: 'technical_design.pdf', text: 'Technical Architecture Design.pdf' },
            { key: 'test_results.xlsx', text: 'UAT Test Results Summary.xlsx' }
          ],
          tasks: [
            { key: 'task_001', text: '🔴 Critical: Fix production bug in payment module' },
            { key: 'task_002', text: '🟡 High: Complete quarterly review presentation' },
            { key: 'task_003', text: '🟢 Normal: Update team documentation' },
            { key: 'task_004', text: '🟡 High: Prepare for security audit' },
            { key: 'task_005', text: '🟢 Normal: Onboard new team members' }
          ],
          announcements: [
            { key: 'ann_001', text: '📢 Office Closure - Public Holiday Dec 25' },
            { key: 'ann_002', text: '🎉 Welcome New Team Members!' },
            { key: 'ann_003', text: '🔧 Scheduled Maintenance - Weekend' },
            { key: 'ann_004', text: '📊 Quarterly All-Hands Meeting - Dec 15' },
            { key: 'ann_005', text: '🏆 Employee of the Month - Congratulations!' }
          ],
          contacts: [
            { key: 'contact_001', text: 'John Smith - Contoso Ltd (CEO)' },
            { key: 'contact_002', text: 'Sarah Johnson - TechCorp (CTO)' },
            { key: 'contact_003', text: 'Michael Chen - Global Solutions (Sales Director)' },
            { key: 'contact_004', text: 'Emma Davis - Innovation Inc (Product Manager)' },
            { key: 'contact_005', text: 'Robert Williams - Enterprise Co (VP Engineering)' }
          ],
          projects: [
            { key: 'proj_001', text: '🚀 Digital Transformation Initiative (In Progress)' },
            { key: 'proj_002', text: '⏸️ Mobile App Development (On Hold)' },
            { key: 'proj_003', text: '✅ Website Redesign (Completed)' },
            { key: 'proj_004', text: '🔄 SharePoint Migration (In Progress)' },
            { key: 'proj_005', text: '📋 ISO Certification (Planning)' }
          ],
          departments: [
            { key: 'dept_001', text: 'Information Technology (45 members)' },
            { key: 'dept_002', text: 'Human Resources (12 members)' },
            { key: 'dept_003', text: 'Sales & Marketing (28 members)' },
            { key: 'dept_004', text: 'Finance & Accounting (18 members)' },
            { key: 'dept_005', text: 'Research & Development (32 members)' }
          ],
          trainingMaterials: [
            { key: 'training_001', text: '📚 SharePoint Basics for Beginners.mp4' },
            { key: 'training_002', text: '📖 Microsoft Teams Advanced Features.pdf' },
            { key: 'training_003', text: '🎓 Power Platform Fundamentals Course.zip' },
            { key: 'training_004', text: '💻 TypeScript Best Practices Guide.pdf' },
            { key: 'training_005', text: '🔐 Cybersecurity Awareness Training.pptx' }
          ]
        };
        resolve(items[this.properties.listName] || []);
      }, 2000);
    });
  }
}
