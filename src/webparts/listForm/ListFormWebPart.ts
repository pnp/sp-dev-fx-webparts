import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Environment, EnvironmentType, Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-webpart-base';

import * as strings from 'ListFormWebPartStrings';
import ListForm from './components/ListForm';
import { IListFormProps } from './components/IListFormProps';
import { IListFormWebPartProps } from './IListFormWebPartProps';

import { PropertyPaneAsyncDropdown } from '../../controls/PropertyPaneAsyncDropdown/PropertyPaneAsyncDropdown';
import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import { update, get } from '@microsoft/sp-lodash-subset';

import { ListService } from '../../common/services/ListService';
import { ControlMode } from '../../common/datatypes/ControlMode';


export default class ListFormWebPart extends BaseClientSideWebPart<IListFormWebPartProps> {

  private listService: ListService;

  public render(): void {
    const element: React.ReactElement<IListFormProps > = React.createElement(
      ListForm,
      {
        spContext: this.context,
        description: this.properties.description,
        listUrl: this.properties.listUrl,
        formType: this.properties.formType,
        id: this.properties.itemId,
        fields: (this.properties.fields) ? this.properties.fields.split(',').filter(String) : [],
        onSubmitSucceeded: (id: number) => alert('Saved with ID ' + id),
        onSubmitFailed: (fieldErrors) => alert('Error on saving. Please recheck fields.'),
        // onUpdateFields: (fields: string[]) => this.updateField(fields),
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return super.onInit().then( _ => {
      this.listService = new ListService(this.context.spHttpClient);
    });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const mainGroup = {
        groupName: strings.BasicGroupName,
        groupFields: [
          PropertyPaneTextField('description', {
            label: strings.DescriptionFieldLabel
          }),
          new PropertyPaneAsyncDropdown('listUrl', {
            label: strings.ListFieldLabel,
            loadOptions: this.loadLists.bind(this),
            onPropertyChange: this.onListChange.bind(this),
            selectedKey: this.properties.listUrl
          }),
          PropertyPaneDropdown('formType', {
            label: strings.FormTypeFieldLabel,
            options: Object.keys(ControlMode)
                             .map( (k) => ControlMode[k]).filter( (v) => typeof v === 'string' )
                               .map( (n) => ({key: ControlMode[n], text: n}) ),
            disabled: !this.properties.listUrl
          }),

        ]
      };
    if (this.properties.formType !== ControlMode.New) {
      mainGroup.groupFields.push(
        PropertyPaneTextField( 'itemId', {
          label: strings.ItemIdFieldLabel
        }));
    }
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [mainGroup]
        }
      ]
    };
  }

  private loadLists(): Promise<IDropdownOption[]> {
    return new Promise<IDropdownOption[]>((resolve: (options: IDropdownOption[]) => void, reject: (error: any) => void) => {
      if (Environment.type === EnvironmentType.Local) {
        resolve( [{
            key: 'sharedDocuments',
            text: 'Shared Documents',
          },
          {
            key: 'someList',
            text: 'Some List',
          }] );
      } else if (Environment.type === EnvironmentType.SharePoint ||
                Environment.type === EnvironmentType.ClassicSharePoint) {
        try {
          return this.listService.getListsFromWeb(this.context.pageContext.web.absoluteUrl)
            .then( (lists) => { resolve( lists.map( (l) => ({ key: l.url, text: l.title } as IDropdownOption) ) ); } );
        } catch (error) {
          // set a new state conserving the previous state + the new error
          alert( 'Error on loading lists: ' + error );
        }
      }
    });
  }

  private onListChange(propertyPath: string, newValue: any): void {
    const oldValue: any = get(this.properties, propertyPath);
    // store new value in web part properties
    update( this.properties, propertyPath, (): any => newValue );
    // refresh web part
    this.render();
  }


}
