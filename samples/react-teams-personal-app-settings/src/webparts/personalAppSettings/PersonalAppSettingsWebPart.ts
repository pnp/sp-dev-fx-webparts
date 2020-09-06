import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PersonalAppSettingsWebPartStrings';
import PersonalAppSettings from './components/PersonalAppSettings';
import AppContext from './common/AppContext';
import { IWebPartProps } from './common/IWebPartProps';
import { IWebPartPropertiesService } from './services/webPartPropertiesService/IWebPartPropertiesService';
import { OneDriveListWebPartPropertiesService } from './services/webPartPropertiesService/OneDriveListWebPartPropertiesService';
import { WebPartKey } from './common/Constants';

export default class PersonalAppSettingsWebPart extends BaseClientSideWebPart <IWebPartProps> {

  private _props: IWebPartProps | null;
  private _webPartPropertiesService: IWebPartPropertiesService<IWebPartProps>;

  private _onUpdateProps = async (webPartProps: IWebPartProps): Promise<void> => {
    this._props = webPartProps;
    try {
      await this._webPartPropertiesService.setProperties(WebPartKey, webPartProps);
      this.render();
    }
    catch (err) {
      this.renderError(err);
    }
  }

  public async onInit(): Promise<any> {
    this.context.statusRenderer.displayLoadingIndicator(this.domElement, strings.Loading);
    this._webPartPropertiesService = new OneDriveListWebPartPropertiesService<IWebPartProps>(this.context);
    try {
      this._props = await this._webPartPropertiesService.getProperties(WebPartKey);
    }
    catch (err) {
      this.context.statusRenderer.clearLoadingIndicator(this.domElement);
      this.renderError(err);
    }
  }

  public render(): void {
    const element: React.ReactElement = React.createElement(
      AppContext.Provider,
      {
        value: {
          webPartProps: this._props,
          onUpdateProps: this._onUpdateProps
        }
      },
      React.createElement(PersonalAppSettings)
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
