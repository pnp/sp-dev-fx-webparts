import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import * as strings from 'TinymceEditorWebPartStrings';
import { ITinymceEditorProps } from './components/ITinymceEditorProps';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import SharePointService from './services/SharePointService';
import { IFieldSchema } from './model/IFieldSchema';
import { TinymceEditor } from './components/TinymceEditor';
import { Providers, SharePointProvider } from '@microsoft/mgt';
import { FieldType } from './model/FieldType';

export interface ITinymceEditorWebPartProps {
  listId: string;
  siteUrl: string;
  listItemId: string;
  listFieldsSchema: IFieldSchema[];
  editorContent: string;
}

export default class TinymceEditorWebPart extends BaseClientSideWebPart<ITinymceEditorWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  public render(): void {
    const element: React.ReactElement<ITinymceEditorProps> = React.createElement(
      TinymceEditor,
      {
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        siteUrl: this.properties.siteUrl,
        listId: this.properties.listId,
        listItemId: this.properties.listItemId,
        listFieldsSchema: this.properties.listFieldsSchema,
        context: this.context,
        displayMode: this.displayMode,
        editorContent: this.properties.editorContent,
        onContentUpdate: this.onContentUpdate.bind(this)
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {

    //Init SharePoint Service
    SharePointService.Init(this.context.spHttpClient);

    //Init MGT SharePoint Provider
    Providers.globalProvider = new SharePointProvider(this.context);

    return this._getEnvironmentMessage().then(message => {
      this._environmentMessage = message;
    });

    return super.onInit();
  }



  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office': // running in Office
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook': // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams': // running in Teams
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
              break;
            default:
              throw new Error('Unknown host');
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
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
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('siteUrl', {
                  label: "Site URL"
                }),
                PropertyFieldListPicker('listId', {
                  label: 'Select a list',
                  selectedList: this.properties.listId,
                  includeHidden: false,
                  multiSelect: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context as any,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId',
                  webAbsoluteUrl: this.properties.siteUrl
                }),
                PropertyPaneTextField('listItemId', {
                  label: "List Item Id"
                }),
              ]
            }
          ]
        }
      ]
    };
  }

  protected async onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): Promise<void> {
    if (propertyPath === 'listId' && newValue) {
      // push new list value
      super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);

      //Get list fields
      this.loadListFields(this.properties.siteUrl, newValue);

      // refresh the item selector control by repainting the property pane
      this.context.propertyPane.refresh();
      // re-render the web part as clearing the loading indicator removes the web part body
      this.render();
    }
    else {
      super.onPropertyPaneFieldChanged(propertyPath, oldValue, oldValue);
    }
  }

  private async loadListFields(siteUrl: string, listGuid: string): Promise<void> {

    this.properties.listFieldsSchema = [];
    const listUrl = await SharePointService.getListUrl(siteUrl, listGuid);
    const hostUrl = `${window.location.protocol}//${window.location.hostname}`;
    const siteRelativeUrl = siteUrl.substring(hostUrl.length);
    const listRelativeUrl = listUrl.substring(siteRelativeUrl.length);
    const listFieldsResponse: any[] = await SharePointService.getListFieldsAsDataStream(siteRelativeUrl, listRelativeUrl);
    let fields: IFieldSchema[] = listFieldsResponse.map((field: any) => {
      return {
        id: field.Id,
        title: field.Title,
        staticName: field.StaticName || field.InternalName,
        required: field.Required ?? false,
        fieldType: field.FieldType || field.TypeAsString,
        typeAsString: field.TypeAsString,
        description: field.Description,
        choices: field.Choices,
        multiChoices: field.MultiChoices,
        displayFormat: field.DisplayFormat,
        firstDayOfWeek: field.FirstDayOfWeek,
        localeId: field.LocaleId,
        termSetId: field.TermSetId
      } as IFieldSchema;
    });

    if (fields.length > 0) {
      fields = fields.filter(f => f.staticName &&
        f.fieldType !== FieldType.Thumbnail &&
        f.fieldType !== FieldType.Lookup &&
        f.fieldType !== FieldType.LookupMulti &&
        f.fieldType !== FieldType.Attachments &&
        f.fieldType !== FieldType.Location &&
        f.staticName !== 'Target_x0020_Audiences' &&
        f.staticName !== '_ModernAudienceTargetUserField');
    }

    // this.properties.listFields = [...fields.map(field => ({ key: field.staticName, text: field.title }))];
    this.properties.listFieldsSchema = fields;
    // refresh the item selector control by repainting the property pane
    this.context.propertyPane.refresh();
    // re-render the web part as clearing the loading indicator removes the web part body
    this.render();
  }
  private onContentUpdate(content: string): void {
    this.properties.editorContent = content;
  }
}
