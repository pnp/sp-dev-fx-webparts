import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'EffectiveAccessAuditWebPartStrings';
import EffectiveAccessAudit from './components/EffectiveAccessAudit';
import {
  EffectiveAccessAuditService
} from './services/EffectiveAccessAuditService';
import type { IAccessAuditConfig } from './models/IAccessAudit';
import { validateRootPath } from './utils/auditUtils';

export interface IEffectiveAccessAuditWebPartProps extends IAccessAuditConfig {
}

const defaultProperties: IEffectiveAccessAuditWebPartProps = {
  rootPath: '',
  listTitle: ''
};

export default class EffectiveAccessAuditWebPart extends BaseClientSideWebPart<IEffectiveAccessAuditWebPartProps> {
  private service: EffectiveAccessAuditService | undefined;
  private serviceRootPath = '';

  public render(): void {
    const config: IAccessAuditConfig = { ...defaultProperties, ...this.properties };
    const rootPath = config.rootPath || '';
    const safeRootPath = validateRootPath(rootPath) ? rootPath : '';
    let service = this.service;

    if (!service || this.serviceRootPath !== safeRootPath) {
      service = new EffectiveAccessAuditService(this.context, safeRootPath);
      this.service = service;
      this.serviceRootPath = safeRootPath;
    }

    ReactDom.render(React.createElement(EffectiveAccessAudit, { config, service }), this.domElement);
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
                PropertyPaneTextField('rootPath', { label: strings.RootPathFieldLabel }),
                PropertyPaneTextField('listTitle', { label: strings.ListTitleFieldLabel })
              ]
            }
          ]
        }
      ]
    };
  }
}
