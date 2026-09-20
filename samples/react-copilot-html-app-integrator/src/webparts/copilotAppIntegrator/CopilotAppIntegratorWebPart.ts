import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneLabel,
  PropertyPaneSlider,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IFilePickerResult,
  PropertyFieldFilePicker
} from '@pnp/spfx-property-controls/lib/PropertyFieldFilePicker';

import * as strings from 'CopilotAppIntegratorWebPartStrings';
import { IHtmlManifest } from './models/IHtmlManifest';
import { ILiveDataResult } from './models/ILiveDataResult';
import { DataSourceResolver } from './services/DataSourceResolver';
import { HtmlDocumentBuilder } from './services/HtmlDocumentBuilder';
import { HtmlFileService } from './services/HtmlFileService';
import { HtmlManifestParser } from './services/HtmlManifestParser';

export interface ICopilotAppIntegratorWebPartProps {
  htmlFileWebUrl: string;
  htmlFileServerRelativeUrl: string;
  htmlFilePickerResult?: IFilePickerResult;
  minimumHeight: number;
  maximumHeight: number;
  hideCompatibilityWarnings: boolean;
}

interface IHostMessage {
  type?: string;
  instanceId?: string;
  height?: unknown;
  message?: string;
}

/** Keeps a handler that fails on every event from filling the page. */
const MAXIMUM_WARNINGS = 5;

export default class CopilotAppIntegratorWebPart
  extends BaseClientSideWebPart<ICopilotAppIntegratorWebPartProps> {

  private _loadVersion: number = 0;
  private _iframe?: HTMLIFrameElement;
  private _warningHost?: HTMLElement;
  private _warnings: string[] = [];
  private _messageHandler?: (event: MessageEvent) => void;
  private _filePickerBusy = false;
  private _filePickerErrorMessage?: string;

  public render(): void {
    const status = document.createElement('div');
    status.setAttribute('role', 'status');
    status.textContent = strings.LoadingMessage;
    this.domElement.replaceChildren(status);

    this.loadApplication().catch(console.error);
  }

  protected get disableReactivePropertyChanges(): boolean {
    // Reload only on Apply; a reactive pane would refetch the HTML
    // file and all data sources on every keystroke.
    return true;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected onDispose(): void {
    ++this._loadVersion;
    this.disposeIframe();
  }

  private get tenantOrigin(): string {
    return new URL(this.context.pageContext.web.absoluteUrl).origin;
  }

  /**
   * The srcdoc iframe inherits the SharePoint page's CSP, whose
   * script-src allows inline scripts only via the page's per-load
   * nonce. The nonce content attribute is hidden after insertion, but
   * the IDL property remains readable from same-document code.
   */
  private getPageNonce(): string | undefined {
    return Array.from(document.scripts)
      .map(script => script.nonce)
      .find(nonce => !!nonce);
  }

  private async loadApplication(): Promise<void> {
    const loadVersion = ++this._loadVersion;

    try {
      this.validateProperties();

      const fileService = new HtmlFileService(this.context.spHttpClient);

      const html = await fileService.getHtml(
        this.properties.htmlFileWebUrl,
        this.properties.htmlFileServerRelativeUrl
      );

      if (loadVersion !== this._loadVersion) {
        return;
      }

      const htmlDocument = new DOMParser().parseFromString(
        html,
        'text/html'
      );

      const manifest = new HtmlManifestParser(this.tenantOrigin)
        .parse(htmlDocument);

      const results = await this.resolveManifestData(manifest);

      if (loadVersion !== this._loadVersion) {
        return;
      }

      const instanceId = crypto.randomUUID();

      const sourceFileUrl = new URL(
        this.properties.htmlFileServerRelativeUrl,
        this.properties.htmlFileWebUrl
      ).toString();

      const built = new HtmlDocumentBuilder().build(
        htmlDocument,
        {
          sourceFileUrl,
          instanceId,
          tenantOrigin: this.tenantOrigin,
          results,
          pageNonce: this.getPageNonce()
        }
      );

      this.createIframe(built.html, instanceId);
      this.addWarnings(built.warnings);
    } catch (error) {
      if (loadVersion !== this._loadVersion) {
        return;
      }

      this.renderLoadError(error);
    }
  }

  private async resolveManifestData(
    manifest: IHtmlManifest
  ): Promise<Record<string, ILiveDataResult>> {
    const resolver = new DataSourceResolver(this.context.spHttpClient);

    const entries = await Promise.all(
      manifest.items.map(async item => {
        const result = await resolver.resolve(item);

        return [item.spItemUrl, result] as const;
      })
    );

    return Object.fromEntries(entries);
  }

  private validateProperties(): void {
    if (
      !this.properties.htmlFileWebUrl ||
      !this.properties.htmlFileServerRelativeUrl
    ) {
      throw new Error(strings.SelectFileMessage);
    }

    if (!this.isHtmlFile(this.properties.htmlFileServerRelativeUrl)) {
      throw new Error(strings.OnlyHtmlFilesMessage);
    }

    if (!this.isSameTenantOrigin(this.properties.htmlFileWebUrl)) {
      throw new Error(strings.WrongTenantMessage);
    }
  }

  private isHtmlFile(serverRelativeUrl: string): boolean {
    return serverRelativeUrl.toLowerCase().endsWith('.html');
  }

  private isSameTenantOrigin(url: string): boolean {
    return new URL(url).origin === this.tenantOrigin;
  }

  private onFileSelected(result: IFilePickerResult): void {
    this.handleFileSelected(result).catch(console.error);
  }

  private async handleFileSelected(result: IFilePickerResult): Promise<void> {
    if (!result?.fileAbsoluteUrl) {
      this._filePickerErrorMessage = strings.SelectFileMessage;
      this.context.propertyPane.refresh();
      return;
    }

    const serverRelativeUrl = decodeURIComponent(
      new URL(result.fileAbsoluteUrl).pathname
    );

    if (!this.isHtmlFile(serverRelativeUrl)) {
      this._filePickerErrorMessage = strings.OnlyHtmlFilesMessage;
      this.context.propertyPane.refresh();
      return;
    }

    this._filePickerBusy = true;
    this._filePickerErrorMessage = undefined;
    this.context.propertyPane.refresh();

    try {
      const webUrl = await new HtmlFileService(
        this.context.spHttpClient
      ).resolveWebUrl(
        this.context.pageContext.web.absoluteUrl,
        result.fileAbsoluteUrl
      );

      if (!this.isSameTenantOrigin(webUrl)) {
        throw new Error(strings.WrongTenantMessage);
      }

      this.properties.htmlFileWebUrl = webUrl;
      this.properties.htmlFileServerRelativeUrl = serverRelativeUrl;
      this.properties.htmlFilePickerResult = result;
    } catch (error) {
      this._filePickerErrorMessage =
        error instanceof Error ? error.message : String(error);
    } finally {
      this._filePickerBusy = false;
      this.context.propertyPane.refresh();
    }
  }

  private getSelectedFileStatusText(): string {
    if (this._filePickerBusy) {
      return strings.ResolvingSiteUrlMessage;
    }

    if (this._filePickerErrorMessage) {
      return `${strings.WebUrlResolutionFailedMessage}${this._filePickerErrorMessage}`;
    }

    if (this.properties.htmlFileServerRelativeUrl) {
      return `${strings.CurrentFileLabelPrefix}${this.properties.htmlFileServerRelativeUrl}`;
    }

    return strings.NoFileSelectedMessage;
  }

  private createIframe(html: string, instanceId: string): void {
    this.disposeIframe();

    const iframe = document.createElement('iframe');

    iframe.title = 'HTML application';
    iframe.style.width = '100%';
    iframe.style.height = `${this.properties.minimumHeight || 300}px`;
    iframe.style.border = '0';
    iframe.style.display = 'block';
    iframe.style.overflow = 'hidden';

    // Deliberately no allow-same-origin: combined with allow-scripts
    // it would let the embedded document escape the sandbox.
    iframe.setAttribute(
      'sandbox',
      [
        'allow-scripts',
        'allow-forms',
        'allow-popups',
        'allow-popups-to-escape-sandbox'
      ].join(' ')
    );

    iframe.setAttribute('referrerpolicy', 'no-referrer');

    this._messageHandler = (event: MessageEvent): void => {
      // event.origin is the string "null" for a sandboxed srcdoc
      // frame; the source window is the only reliable filter.
      if (event.source !== iframe.contentWindow) {
        return;
      }

      const message = event.data as IHostMessage | undefined;

      if (
        message?.type === 'spfx-html-host:resize' &&
        message.instanceId === instanceId
      ) {
        this.resizeIframe(iframe, message.height);
      }

      // The refresh message carries no instanceId (contract with the
      // embedded applications), so it is gated on the source window
      // check alone.
      if (message?.type === 'ka-html-viewer-refresh') {
        this.loadApplication().catch(console.error);
      }

      if (
        message?.type === 'spfx-html-host:warning' &&
        message.instanceId === instanceId &&
        typeof message.message === 'string'
      ) {
        this.addWarnings([message.message]);
      }

      if (
        message?.type === 'spfx-html-host:error' &&
        message.instanceId === instanceId
      ) {
        console.error('Embedded HTML error:', message.message);
      }
    };

    window.addEventListener('message', this._messageHandler);

    iframe.srcdoc = html;

    // The warning host is a sibling of the iframe rather than part of a
    // re-render, so warnings arriving from the running application can
    // be shown without reloading it.
    const warningHost = document.createElement('div');
    const container = document.createElement('div');
    container.append(warningHost, iframe);

    this.domElement.replaceChildren(container);
    this._iframe = iframe;
    this._warningHost = warningHost;
    this._warnings = [];
  }

  private addWarnings(messages: string[]): void {
    for (const message of messages) {
      if (
        this._warnings.length >= MAXIMUM_WARNINGS ||
        this._warnings.indexOf(message) >= 0
      ) {
        continue;
      }

      this._warnings.push(message);

      // Logged whatever the banner setting is, so a page author who
      // turned the banner off can still diagnose the app.
      console.warn('Embedded HTML compatibility:', message);
    }

    this.renderWarnings();
  }

  private renderWarnings(): void {
    if (!this._warningHost) {
      return;
    }

    if (this.properties.hideCompatibilityWarnings || !this._warnings.length) {
      this._warningHost.replaceChildren();
      return;
    }

    this._warningHost.style.cssText =
      'font-family:"Segoe UI","Segoe UI Web (West European)",-apple-system,' +
      'BlinkMacSystemFont,Roboto,sans-serif;font-size:14px;color:#323130;';

    this._warningHost.replaceChildren(
      this.createMessageBox({
        role: 'status',
        background: '#fff4ce',
        iconSvg:
          '<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">' +
          '<path d="M10 2.3 19 17.7H1z" fill="#ffb900"/>' +
          '<rect x="9.1" y="7.4" width="1.8" height="5.6" rx="0.9" fill="#323130"/>' +
          '<circle cx="10" cy="15.4" r="1.1" fill="#323130"/>' +
          '</svg>',
        contentHtml: '',
        contentTitle: strings.CompatibilityWarningsTitle,
        contentItems: this._warnings,
        contentNote: strings.CompatibilityWarningsNote
      })
    );
  }

  private resizeIframe(
    iframe: HTMLIFrameElement,
    requestedHeight: unknown
  ): void {
    const minimum = this.properties.minimumHeight || 300;
    const maximum = this.properties.maximumHeight || 20000;

    const numericHeight = Number(requestedHeight);

    if (!Number.isFinite(numericHeight)) {
      return;
    }

    const height = Math.min(
      Math.max(Math.ceil(numericHeight), minimum),
      maximum
    );

    iframe.style.height = `${height}px`;
  }

  private renderLoadError(error: unknown): void {
    const message = error instanceof Error ? error.message : String(error);

    const container = document.createElement('div');
    container.style.cssText =
      'font-family:"Segoe UI","Segoe UI Web (West European)",-apple-system,' +
      'BlinkMacSystemFont,Roboto,sans-serif;font-size:14px;color:#323130;';

    container.appendChild(
      this.createMessageBox({
        role: 'alert',
        background: '#fde7e9',
        iconSvg:
          '<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">' +
          '<circle cx="10" cy="10" r="9" fill="#d13438"/>' +
          '<rect x="9.1" y="4.8" width="1.8" height="7" rx="0.9" fill="#fff"/>' +
          '<circle cx="10" cy="14.4" r="1.2" fill="#fff"/>' +
          '</svg>',
        contentHtml: '',
        contentText: `${strings.ErrorPrefix}${message}`
      })
    );

    if (message === strings.SelectFileMessage) {
      container.appendChild(
        this.createMessageBox({
          background: '#eff6fc',
          iconSvg:
            '<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" ' +
            'fill="none" stroke="#0078d4" stroke-width="1.5" stroke-linecap="round">' +
            '<rect x="3.25" y="2.25" width="13.5" height="15.5" rx="1.5"/>' +
            '<line x1="6.5" y1="6.5" x2="13.5" y2="6.5"/>' +
            '<line x1="6.5" y1="10" x2="13.5" y2="10"/>' +
            '<line x1="6.5" y1="13.5" x2="11" y2="13.5"/>' +
            '</svg>',
          contentHtml:
            `<div style="font-weight:600;margin-bottom:6px;">${strings.SetupTitle}</div>` +
            `<div>${strings.SetupIntro}</div>` +
            '<ol style="margin:8px 0 0;padding-left:20px;">' +
            [
              strings.SetupStep1,
              strings.SetupStep2,
              strings.SetupStep3,
              strings.SetupStep4
            ]
              .map(step => `<li style="margin-bottom:4px;">${step}</li>`)
              .join('') +
            '</ol>' +
            `<div style="margin-top:8px;color:#605e5c;">${strings.SetupNote}</div>`
        })
      );
    }

    this.domElement.replaceChildren(container);
  }

  /**
   * iconSvg and contentHtml carry only static, developer-authored
   * markup (localized strings); runtime text must go through
   * contentText, contentTitle, contentItems or contentNote, all of
   * which are assigned via textContent.
   */
  private createMessageBox(options: {
    background: string;
    iconSvg: string;
    contentHtml: string;
    contentText?: string;
    contentTitle?: string;
    contentItems?: string[];
    contentNote?: string;
    role?: string;
  }): HTMLElement {
    const box = document.createElement('div');

    if (options.role) {
      box.setAttribute('role', options.role);
    }

    box.style.cssText =
      'display:flex;align-items:flex-start;gap:10px;' +
      'padding:12px 14px;border-radius:4px;margin-bottom:12px;' +
      `background:${options.background};`;

    const icon = document.createElement('div');
    icon.style.cssText = 'flex-shrink:0;line-height:0;padding-top:1px;';
    icon.innerHTML = options.iconSvg;

    const content = document.createElement('div');
    content.style.cssText = 'min-width:0;line-height:20px;';

    if (options.contentItems) {
      content.append(
        this.createTextElement('div', options.contentTitle ?? '', 'font-weight:600;'),
        ...options.contentItems.map(item =>
          this.createTextElement('div', item, 'margin-top:4px;')
        ),
        this.createTextElement(
          'div',
          options.contentNote ?? '',
          'margin-top:8px;color:#605e5c;'
        )
      );
    } else if (options.contentText !== undefined) {
      content.textContent = options.contentText;
    } else {
      content.innerHTML = options.contentHtml;
    }

    box.append(icon, content);

    return box;
  }

  private createTextElement(
    tagName: string,
    text: string,
    style: string
  ): HTMLElement {
    const element = document.createElement(tagName);

    element.textContent = text;
    element.style.cssText = style;

    return element;
  }

  private disposeIframe(): void {
    if (this._messageHandler) {
      window.removeEventListener('message', this._messageHandler);
      this._messageHandler = undefined;
    }

    this._iframe?.remove();
    this._iframe = undefined;
    this._warningHost = undefined;
    this._warnings = [];
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: strings.HtmlSourceGroupName,
              groupFields: [
                PropertyFieldFilePicker('htmlFilePickerResult', {
                  key: 'htmlFilePickerFieldId',
                  context: this.context,
                  properties: this.properties,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  filePickerResult: this.properties
                    .htmlFilePickerResult as IFilePickerResult,
                  label: strings.FilePickerFieldLabel,
                  buttonLabel: strings.FilePickerButtonLabel,
                  onSave: (result: IFilePickerResult) =>
                    this.onFileSelected(result),
                  accepts: ['.html'],
                  disabled: this._filePickerBusy,
                  hideOneDriveTab: true,
                  hideLocalUploadTab: true,
                  hideLinkUploadTab: true,
                  hideWebSearchTab: true,
                  hideStockImages: true,
                  hideOrganisationalAssetTab: true
                }),
                PropertyPaneLabel('selectedFileStatus', {
                  text: this.getSelectedFileStatusText()
                }),
                PropertyPaneSlider('minimumHeight', {
                  label: strings.MinimumHeightFieldLabel,
                  min: 100,
                  max: 1000,
                  step: 50
                }),
                PropertyPaneSlider('maximumHeight', {
                  label: strings.MaximumHeightFieldLabel,
                  min: 1000,
                  max: 20000,
                  step: 500
                })
              ]
            },
            {
              groupName: strings.AdvancedGroupName,
              isCollapsed: true,
              groupFields: [
                PropertyPaneLabel('advancedGroupIntro', {
                  text: strings.AdvancedGroupDescription
                }),
                PropertyPaneTextField('htmlFileWebUrl', {
                  label: strings.HtmlFileWebUrlFieldLabel
                }),
                PropertyPaneTextField('htmlFileServerRelativeUrl', {
                  label: strings.HtmlFileServerRelativeUrlFieldLabel
                }),
                PropertyPaneToggle('hideCompatibilityWarnings', {
                  label: strings.HideCompatibilityWarningsFieldLabel,
                  onText: strings.HideCompatibilityWarningsOnText,
                  offText: strings.HideCompatibilityWarningsOffText
                }),
                PropertyPaneLabel('hideCompatibilityWarningsNote', {
                  text: strings.HideCompatibilityWarningsDescription
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
