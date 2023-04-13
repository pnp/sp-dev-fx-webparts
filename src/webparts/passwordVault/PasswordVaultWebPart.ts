import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { ISPFxAppDevClientSideWebPartProps, SPFxAppDevClientSideWebPart } from '@spfxappdev/framework';
import PasswordVault,  { IPasswordVaultProps } from './components/PasswordVault';
import { PasswordVaultService, IPasswordVaultService } from '@src/services/PasswordVaultService';
import { IVaultData } from '@src/models/IVaultData';
import { PropertyPaneAboutWebPart } from '../PropertyPaneAboutWebPart';
import * as strings from 'PasswordVaultWebPartStrings';
import { IModule, ModuleType } from '@src/models';
import { Guid } from '@microsoft/sp-core-library';

export interface IPasswordVaultWebPartProps extends ISPFxAppDevClientSideWebPartProps, IVaultData {
  
  modules: IModule[];
}


export default class PasswordVaultWebPart extends SPFxAppDevClientSideWebPart<IPasswordVaultWebPartProps> {

    private passwordVaultService: IPasswordVaultService = null;

    public onInit(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
          super.onInit().then(() => {
            this.passwordVaultService = new PasswordVaultService(this.context.instanceId);
            this.migrateDataFromOldVersion();
            return resolve();
          });
        });
    }

    public render(): void {
        const element: React.ReactElement<IPasswordVaultProps> = React.createElement(
            PasswordVault,
            {
                WebPart: this,
                Title: this.properties.Title,
                passwordVaultService: this.passwordVaultService,
                masterPW: this.properties.masterPW,
                modules: this.properties.modules||[],
                onTitleChanged: (title: string): void => {
                  this.onTitleChanged(title);
                },
                onVaultDataChanged: (encryptedMasterPw: string, modules: IModule[]): void => {
                  this.onVaultDataChanged(encryptedMasterPw, modules);
                },
                onVaultPasswordChanged: (encryptedMasterPw: string): void => {
                  this.onMasterPasswordChanged(encryptedMasterPw);
                }
            }
        );

        ReactDom.render(element, this.domElement);
    }

    private migrateDataFromOldVersion(): void {
      const oldProps: any = this.properties as any;
      this.properties.modules = this.properties.modules||[];
      if (!this.helper.functions.isNullOrEmpty(oldProps.username)) {
        this.properties.modules.push({
          id: Guid.newGuid().toString(),
          type: ModuleType.UserField,
          data: oldProps.username
        });
      }

      if (!this.helper.functions.isNullOrEmpty(oldProps.password)) {
        this.properties.modules.push({
          id: Guid.newGuid().toString(),
          type: ModuleType.PasswordField,
          data: oldProps.password
        });
      }

      if (!this.helper.functions.isNullOrEmpty(oldProps.note)) {
        this.properties.modules.push({
          id: Guid.newGuid().toString(),
          type: ModuleType.NoteField,
          data: oldProps.note
        });
      }

      this.removePropertiesFromOldVersion();
    }

    private removePropertiesFromOldVersion(): void {
      const oldProps: any = this.properties as any;
      if (this.helper.functions.isset(oldProps.username)) {
        delete oldProps.username;
      }

      if (this.helper.functions.isset(oldProps.password)) {
        delete oldProps.password;
      }

      if (this.helper.functions.isset(oldProps.note)) {
        delete oldProps.note;
      }
    }

    public getLogCategory(): string {
        return 'PasswordVaultWebPart';
    }

    public onTitleChanged(title: string): void {
      this.properties.Title = title;
    }

    public onVaultDataChanged(encryptedMasterPW: string, modules: IModule[]): void {
      this.properties.masterPW = encryptedMasterPW;
      this.properties.modules = modules;
      this.removePropertiesFromOldVersion();
    }

    private onMasterPasswordChanged(encryptedMasterPW: string): void {
      this.properties.masterPW = encryptedMasterPW;
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
            description: ''
          },
          groups: [
            {
              groupName: strings.WebPartPropertyGroupAbout,
              groupFields: [
                PropertyPaneAboutWebPart({
                  key: `bbc94d63-5630-4077-b6a8-6b8d37551766_${this.context.instanceId}`,
                  html: `
                  <div>
                    <h3>Author</h3> 
                    <a href="https://spfx-app.dev/" data-interception="off" target="_blank">SPFx-App.dev</a>
                    <h3>Version</h3>
                    ${this.context.manifest.version}
                    <h3>Web Part Instance id</h3>
                    ${this.context.instanceId}
                  </div>
                  <div>
                    <a href="https://github.com/SPFxAppDev/sp-passwordvault-webpart" target="_blank">More info</a>
                  </div>
                  `
                })
              ]
            }
          ]
        }
        ]
      };
    }
}