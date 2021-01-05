import * as React from 'react';
import * as ReactDom from 'react-dom';
import { DisplayMode, Environment, EnvironmentType, Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import {
  IPropertyPaneConfiguration, PropertyPaneDropdown,
  PropertyPaneTextField, PropertyPaneToggle, IPropertyPaneField
} from "@microsoft/sp-property-pane";
import { initializeIcons } from '@uifabric/icons';

import * as strings from 'ListFormWebPartStrings';
import ListForm from './components/ListForm';
import { IListFormProps } from './components/IListFormProps';
import { IListFormWebPartProps } from './IListFormWebPartProps';
import { IFieldConfiguration } from './components/IFieldConfiguration';

import { PropertyPaneAsyncDropdown } from '../../controls/PropertyPaneAsyncDropdown/PropertyPaneAsyncDropdown';
import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import ConfigureWebPart from '../../common/components/ConfigureWebPart';
import { update, get } from '@microsoft/sp-lodash-subset';

import { ListService } from '../../common/services/ListService';
import { ControlMode } from '../../common/datatypes/ControlMode';

initializeIcons();

export default class ListFormWebPart extends BaseClientSideWebPart<IListFormWebPartProps> {

  private listService: ListService;
  private cachedLists = null;

  protected onInit(): Promise<void> {
    return super.onInit().then((_) => {
      this.listService = new ListService(this.context.spHttpClient);
      //Polyfill array find
      if (!Array.prototype["find"]) {
        Array.prototype["find"] = function (predicate, argument) {
          if (this == null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
          }
          if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
          }
          var list = Object(this);
          var length = list.length >>> 0;
          var thisArg = argument;
          var value;

          for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
              return value;
            }
          }
          return undefined;
        };
      }
    });
  }

  public render(): void {

    let itemId;
    if (this.properties.itemId) {
      itemId = Number(this.properties.itemId);
      if (isNaN(itemId)) {
        // if item Id is not a number we assume it is a query string parameter
        const urlParams = new URLSearchParams(window.location.search);
        itemId = Number(urlParams.get(this.properties.itemId));
      }
    }

    let element;
    if (Environment.type === EnvironmentType.Local) {
      // show message that local worbench is not supported
      element = React.createElement(
        MessageBar,
        { messageBarType: MessageBarType.blocked },
        strings.LocalWorkbenchUnsupported
      );
    } else if (this.properties.listUrl) {
      // show actual list form react component
      element = React.createElement(
        ListForm,
        {
          inDesignMode: this.displayMode === DisplayMode.Edit,
          spHttpClient: this.context.spHttpClient,
          title: this.properties.title,
          description: this.properties.description,
          webUrl: this.context.pageContext.web.absoluteUrl,
          listUrl: this.properties.listUrl,
          formType: this.properties.formType,
          id: itemId,
          fields: this.properties.fields,
          showUnsupportedFields: this.properties.showUnsupportedFields,
          onSubmitSucceeded: (id: number) => this.formSubmitted(id),
          onUpdateFields: (fields: IFieldConfiguration[]) => this.updateField(fields),
          context: this.context,
        }
      );
    } else {
      // show configure web part react component
      element = React.createElement(
        ConfigureWebPart,
        {
          webPartContext: this.context,
          title: this.properties.title,
          description: strings.MissingListConfiguration,
          buttonText: strings.ConfigureWebpartButtonText
        }
      );
    }

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const mainGroup = {
      groupName: strings.BasicGroupName,
      groupFields: [
        PropertyPaneTextField('title', {
          label: strings.TitleFieldLabel
        }),
        PropertyPaneTextField('description', {
          label: strings.DescriptionFieldLabel,
          multiline: true
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
            .map((k) => ControlMode[k]).filter((v) => typeof v === 'string')
            .map((n) => ({ key: ControlMode[n], text: n })),
          disabled: !this.properties.listUrl
        }),

      ]
    };
    if (this.properties.formType !== ControlMode.New) {
      mainGroup.groupFields.push(
        PropertyPaneTextField('itemId', {
          label: strings.ItemIdFieldLabel,
          deferredValidationTime: 2000,
          description: strings.ItemIdFieldDescription
        }));
    } else {
      this.properties.itemId = null;
    }

    mainGroup.groupFields.push(
      PropertyPaneToggle('showUnsupportedFields', {
        label: strings.ShowUnsupportedFieldsLabel,
        disabled: !this.properties.listUrl
      }) as IPropertyPaneField<any> // for some reasong the PropertyPaneToggle was not being accepted as IPropertyPaneField<any>
    );
    mainGroup.groupFields.push(
      PropertyPaneTextField('redirectUrl', {
        label: strings.RedirectUrlFieldLabel,
        description: strings.RedirectUrlFieldDescription,
        disabled: !this.properties.listUrl
      })
    );
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
        resolve([{
          key: 'sharedDocuments',
          text: 'Shared Documents',
        },
        {
          key: 'someList',
          text: 'Some List',
        }]);
      } else if (Environment.type === EnvironmentType.SharePoint ||
        Environment.type === EnvironmentType.ClassicSharePoint) {
        try {
          if (!this.cachedLists) {
            return this.listService.getListsFromWeb(this.context.pageContext.web.absoluteUrl)
              .then((lists) => {
                this.cachedLists = lists.map((l) => ({ key: l.url, text: l.title } as IDropdownOption));
                resolve(this.cachedLists);
              });
          } else {
            // using cached lists if available to avoid loading spinner every time property pane is refreshed
            return resolve(this.cachedLists);
          }
        } catch (error) {
          alert(strings.ErrorOnLoadingLists + error);
        }
      }
    });
  }

  private onListChange(propertyPath: string, newValue: any): void {
    const oldValue: any = get(this.properties, propertyPath);
    if (oldValue !== newValue) {
      this.properties.fields = null;
    }
    // store new value in web part properties
    update(this.properties, propertyPath, (): any => newValue);
    // refresh property Pane
    this.context.propertyPane.refresh();
    // refresh web part
    this.render();
  }

  private updateField(fields: IFieldConfiguration[]): any {
    this.properties.fields = fields;
    // render web part again so that React List Form component is rerendered with changed fields
    this.render();
  }

  private formSubmitted(id: number) {
    if (this.properties.redirectUrl) {
      // redirect to configured URL after successfully submitting form
      window.location.href = this.properties.redirectUrl.replace('[ID]', id.toString());
    }
  }

}
