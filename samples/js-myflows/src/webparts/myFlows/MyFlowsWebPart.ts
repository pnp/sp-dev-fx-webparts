import { Version, Guid } from "@microsoft/sp-core-library";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from "@microsoft/sp-property-pane";
import { escape } from "@microsoft/sp-lodash-subset";

import styles from "./MyFlowsWebPart.module.scss";
import * as strings from "MyFlowsWebPartStrings";
import service from "./../../services/services";

export interface IMyFlowsWebPartProps {
  title: string;
}

export default class MyFlowsWebPart extends BaseClientSideWebPart<
  IMyFlowsWebPartProps
> {
  private _msFlowSdk: any = null;
  private _services: service = null;
  private _guid =  Guid.newGuid();
  private _classColor:string;
  public constructor(props: IMyFlowsWebPartProps) {
    super();

    // Initialize flow SDK
    this._msFlowSdk = window["MsFlowSdk"];

  }

  /**
   * Gets context
   * @returns context
   */
  private getContext():Promise<string>{
    return new Promise( (resolve, reject)=>{
      let classColor = styles.titleSharePoint;
     this.context.microsoftTeams.getContext( (teamsContext) => {
       classColor = teamsContext.theme !== 'default!' ? styles.titleTeams : styles.titleSharePoint;
       resolve(classColor);
    });

    });
  }
  /**
   * Renders my flows web part
   */
  public render(): void {
    this.domElement.setAttribute("Id", `"${this._guid}"`);
    this.domElement.setAttribute("class", `"${styles.sdk}"`);
    this.getContext().then( (classColor)=>{
      this.domElement.innerHTML = `<div><label class=${classColor}>${this.properties.title}</label></div>`;
    });
   //
    this._services = new service(this.context);
    this._services.getAccessToken().then((token: string) => {
      const flowSDK = new this._msFlowSdk({
        hostName: "https://flow.microsoft.com",
        locale: this.context.pageContext.cultureInfo.currentCultureName
      });
      // Render Flow widget
      let widget: any = flowSDK.renderWidget("flows", {
        container: `"${this._guid}"`,
        sdkVersion: "1.1",
        enableOnBehalfOfTokens: true,
        debugMode: false,
        allowOptionalEvents: true,
        flowsSettings: {
          createFromBlankTemplateId: "05ed784f63df4ac7b8cbb465005d6068",
          encodedFlowsFilter: "",
          isMini: false,
          enableBusinessProcessFlow: true
        },
        templatesSettings: {
          defaultParams: '',
          category: "PowerAppsButton",
          destination: "new",
          metadataSortProperty: "",
          pageSize: 6,
          searchTerm: "",
          useServerSideProvisioning: false,
          showGoBack: true,
          enableWidgetCloseOnFlowSave: false,
          showCreateFromBlank: false,
          enableDietDesigner: false,
          showHiddenTemplates: false,
          allowCustomFlowName: false,
          oneClickCategory: "",
          dietCategory: ""
        },
        widgetStyleSettings: {
          backgroundColor: "",
          themeName: ""
        }
      });
      // Register handler
      widget.listen("GET_ACCESS_TOKEN", (requestParam, widgetDoneCallback) => {
        widgetDoneCallback(null, { token: token });
      });
      // Register handler
      widget.listen("WIDGET_READY", () => {
        console.log("The flow widget is now ready.");
      });
    });
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
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
                PropertyPaneTextField("title", {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
