import { Version } from '@microsoft/sp-core-library';
import {
  IWebPartContext,
  IPropertyPaneConfiguration
} from '@microsoft/sp-webpart-base';
import { PropertyFieldSPListPicker, PropertyFieldSPListPickerOrderBy } from 'sp-client-custom-fields/lib/PropertyFieldSPListPicker';
import styles from './ListViewer.module.scss';
import { IListViewerWebPartProps } from './IListViewerWebPartProps';
import { RiotClientSideWebPart } from './../../core/riot/RiotClientSideWebPart';
import { ListViewer, IListViewerProps } from './../../components/Components';

export default class ListViewerWebPart extends RiotClientSideWebPart<IListViewerWebPartProps> {

  public constructor(context?: IWebPartContext) {
    super();
    this.onPropertyPaneFieldChanged = this.onPropertyPaneFieldChanged.bind(this);
  }

  protected get webPartOptions(): any {
    var properties: IListViewerProps = {
      styles: styles,
      listId: this.properties.listId
    };
    
    return properties;
  }

  protected get rootComponentType(): any {
    return ListViewer;
  }

  protected get tagName(): any {
    return "list-viewer";
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Use this webpart to display the content of the selected list using RiotJS"
          },
          groups: [
            {
              groupName: "List Configuration",
              groupFields: [
                 PropertyFieldSPListPicker('listId', {
                  label: 'Select a list',
                  selectedList: this.properties.listId,
                  includeHidden: false,
                  orderBy: PropertyFieldSPListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
