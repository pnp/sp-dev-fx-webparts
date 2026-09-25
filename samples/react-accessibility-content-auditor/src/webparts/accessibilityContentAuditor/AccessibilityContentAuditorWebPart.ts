import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration, PropertyPaneDropdown, PropertyPaneTextField, PropertyPaneSlider } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme, ThemeProvider } from '@microsoft/sp-component-base';
import { FluentProvider, webDarkTheme, webLightTheme } from '@fluentui/react-components';
import { ContentAuditor } from './components/ContentAuditor';
import { DEFAULT_AUDIT_CONFIG, normalizeAuditConfig } from '../../models/AuditConfig';
import { IAuditConfig } from '../../models/AuditModels';
import { SharePointContentService } from '../../services/SharePointContentService';

export interface IAccessibilityContentAuditorWebPartProps {
  sourceType: 'page' | 'list';
  pagePath: string;
  listTitle: string;
  itemLimit: number;
  contentFields: string;
  requiredFields: string;
}

export default class AccessibilityContentAuditorWebPart extends BaseClientSideWebPart<IAccessibilityContentAuditorWebPartProps> {
  private theme?: IReadonlyTheme;

  protected async onInit(): Promise<void> { await super.onInit(); this.theme = this.context.serviceScope.consume(ThemeProvider.serviceKey).tryGetTheme(); }

  public render(): void {
    const config: IAuditConfig = normalizeAuditConfig({
      sourceType: this.properties.sourceType,
      pagePath: this.properties.pagePath || DEFAULT_AUDIT_CONFIG.pagePath,
      listTitle: this.properties.listTitle || DEFAULT_AUDIT_CONFIG.listTitle,
      itemLimit: this.properties.itemLimit || DEFAULT_AUDIT_CONFIG.itemLimit,
      contentFields: (this.properties.contentFields || '').split(','),
      requiredFields: (this.properties.requiredFields || '').split(',')
    });
    const contentAuditor = React.createElement(ContentAuditor, { service: new SharePointContentService(this.context), config });
    const provider = React.createElement(FluentProvider, { theme: (this.theme as (IReadonlyTheme & { isInverted?: boolean }) | undefined)?.isInverted ? webDarkTheme : webLightTheme }, contentAuditor);
    ReactDom.render(provider, this.domElement);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void { this.theme = currentTheme; this.render(); }
  protected onDispose(): void { ReactDom.unmountComponentAtNode(this.domElement); }
  protected get dataVersion(): Version { return Version.parse('1.0'); }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return { pages: [{ header: { description: 'Read-only audit source and bounds' }, groups: [{ groupName: 'Source', groupFields: [
      PropertyPaneDropdown('sourceType', { label: 'Source type', options: [{ key: 'page', text: 'Page' }, { key: 'list', text: 'List' }] }),
      PropertyPaneTextField('pagePath', { label: 'Page path', description: 'Example: /SitePages/Home.aspx' }),
      PropertyPaneTextField('listTitle', { label: 'List title' }),
      PropertyPaneSlider('itemLimit', { label: 'Maximum list items', min: 1, max: 50, value: 25, showValue: true }),
      PropertyPaneTextField('contentFields', { label: 'Allow-listed content fields', description: 'Title, Description, CanvasContent1, WikiField, LinkUrl, LinkDescription' }),
      PropertyPaneTextField('requiredFields', { label: 'Required fields', description: 'Subset of the allow-list; comma separated' })
    ] }] }] };
  }
}
