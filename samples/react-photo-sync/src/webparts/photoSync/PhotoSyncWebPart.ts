import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as strings from 'PhotoSyncWebPartStrings';
import { Version } from '@microsoft/sp-core-library';
import {
    IPropertyPaneConfiguration,
    PropertyPaneTextField,
    IPropertyPanePage
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import { CalloutTriggers } from '@pnp/spfx-property-controls/lib/PropertyFieldHeader';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import { PropertyFieldToggleWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldToggleWithCallout';
import { PropertyPaneWebPartInformation } from '@pnp/spfx-property-controls/lib/PropertyPaneWebPartInformation';
import { PropertyFieldPeoplePicker, PrincipalType, IPropertyFieldGroupOrPerson } from '@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker';

import { MSGraphClient } from '@microsoft/sp-http';
import { sp } from '@pnp/sp';
import { ISiteUserInfo } from '@pnp/sp/site-users/types';
import { IPhotoSyncProps } from './components/PhotoSync';
import PhotoSync from './components/PhotoSync';
import Helper, { IHelper } from './common/helper';

export interface IPhotoSyncWebPartProps {
    useFullWidth: boolean;
    appTitle: string;
    allowedUsers: IPropertyFieldGroupOrPerson[];
    enableBulkUpdate: boolean;
    tempLib: string;
    UseCert: boolean;
    dateFormat: string;
    deleteThumbnails: boolean;
    AzFuncUrl: string;
}

export default class PhotoSyncWebPart extends BaseClientSideWebPart<IPhotoSyncWebPartProps> {
    private wpPropertyPages: IPropertyPanePage[] = [];
    private helper: IHelper = null;
    private client: MSGraphClient = null;

    protected async onInit() {
        await super.onInit();
        sp.setup(this.context);
        this.client = await this.context.msGraphClientFactory.getClient();
        this.helper = new Helper(this.context.pageContext.web.serverRelativeUrl, '', this.client);
    }

    public async render(): Promise<void> {
        const element: React.ReactElement<IPhotoSyncProps> = React.createElement(
            PhotoSync,
            {
                context: this.context,
                httpClient: this.context.httpClient,
                siteUrl: this.context.pageContext.legacyPageContext.webAbsoluteUrl,
                domainName: this.context.pageContext.legacyPageContext.webDomain,
                displayMode: this.displayMode,
                helper: this.helper,
                useFullWidth: this.properties.useFullWidth,
                appTitle: this.properties.appTitle,
                updateProperty: (value: string) => {
                    this.properties.appTitle = value;
                },
                openPropertyPane: this.openPropertyPane,
                allowedUsers: this.properties.allowedUsers,
                enableBulkUpdate: this.properties.enableBulkUpdate,
                tempLib: this.properties.tempLib,
                deleteThumbnails: this.properties.deleteThumbnails,
                UseCert: this.properties.UseCert,
                dateFormat: this.properties.dateFormat,
                AzFuncUrl: this.properties.AzFuncUrl
            }
        );

        ReactDom.render(element, this.domElement);
    }

    protected onDispose(): void {
        ReactDom.unmountComponentAtNode(this.domElement);
    }

    protected get dataVersion(): Version {
        return Version.parse('1.0');
    }

    protected get disableReactivePropertyChanges() {
        return true;
    }

    private openPropertyPane = (): void => {
        this.context.propertyPane.open();
    }

    private getUserWPProperties = (): IPropertyPanePage[] => {
        return [
            {
                header: {
                    description: strings.PropertyPaneDescription
                },
                groups: [
                    {
                        groupName: strings.BasicGroupName,
                        groupFields: [
                            PropertyPaneWebPartInformation({
                                description: `${strings.PropInfoNormalUser}`,
                                key: 'normalUserInfoId'
                            }),
                        ]
                    }
                ]
            }
        ];
    }

    private getAdminWPProperties = (): IPropertyPanePage[] => {
        return [
            {
                header: {
                    description: strings.PropertyPaneDescription
                },
                groups: [
                    {
                        groupName: strings.BasicGroupName,
                        groupFields: [
                            PropertyFieldListPicker('tempLib', {
                                key: 'tempLibFieldId',
                                label: strings.PropTempLibLabel,
                                selectedList: this.properties.tempLib,
                                includeHidden: false,
                                orderBy: PropertyFieldListPickerOrderBy.Title,
                                disabled: false,
                                onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                                properties: this.properties,
                                context: this.context,
                                onGetErrorMessage: null,
                                deferredValidationTime: 0,
                                baseTemplate: 101,
                                listsToExclude: ['Documents']
                            }),
                            PropertyPaneWebPartInformation({
                                description: `${strings.PropInfoTempLib}`,
                                key: 'tempLibInfoId'
                            }),
                            PropertyFieldToggleWithCallout('deleteThumbnails', {
                                calloutTrigger: CalloutTriggers.Hover,
                                key: 'deleteThumbnailsFieldId',
                                label: strings.PropDelThumbnail,
                                calloutContent: React.createElement('div', {}, strings.PropDelThumbnailCallout),
                                onText: 'ON',
                                offText: 'OFF',
                                checked: this.properties.deleteThumbnails
                            }),
                            PropertyPaneTextField('AzFuncUrl', {
                                label: strings.PropAzFuncLabel,
                                description: strings.PropAzFuncDesc,
                                multiline: true,
                                placeholder: strings.PropAzFuncLabel,
                                resizable: true,
                                rows: 5,
                                value: this.properties.AzFuncUrl
                            }),
                            PropertyFieldToggleWithCallout('UseCert', {
                                calloutTrigger: CalloutTriggers.Hover,
                                key: 'UseCertFieldId',
                                label: strings.PropUseCertLabel,
                                calloutContent: React.createElement('div', {}, strings.PropUseCertCallout),
                                onText: 'ON',
                                offText: 'OFF',
                                checked: this.properties.UseCert
                            }),
                            PropertyPaneWebPartInformation({
                                description: `${strings.PropInfoUseCert}`,
                                key: 'useCertInfoId'
                            }),
                            PropertyPaneTextField('dateFormat', {
                                label: strings.PropDateFormatLabel,
                                description: '',
                                multiline: false,
                                placeholder: strings.PropDateFormatLabel,
                                resizable: false,
                                value: this.properties.dateFormat
                            }),
                            PropertyPaneWebPartInformation({
                                description: `${strings.PropInfoDateFormat}`,
                                key: 'dateFormatInfoId'
                            }),
                            PropertyFieldPeoplePicker('allowedUsers', {
                                label: 'SharePoint Groups',
                                initialData: this.properties.allowedUsers,
                                allowDuplicate: false,
                                principalType: [PrincipalType.SharePoint],
                                onPropertyChange: this.onPropertyPaneFieldChanged,
                                context: this.context,
                                properties: this.properties,
                                onGetErrorMessage: null,
                                deferredValidationTime: 0,
                                key: 'allowedUsersFieldId'
                            }),
                            PropertyPaneWebPartInformation({
                                description: `${strings.PropAllowedUserInfo}`,
                                key: 'allowedUsersInfoId'
                            }),
                            PropertyFieldToggleWithCallout('enableBulkUpdate', {
                                key: 'enableBulkUpdateFieldId',
                                label: strings.PropEnableBUCallout,
                                onText: 'ON',
                                offText: 'OFF',
                                checked: this.properties.enableBulkUpdate
                            }),
                            PropertyFieldToggleWithCallout('useFullWidth', {
                                key: 'useFullWidthFieldId',
                                label: 'Use page full width',
                                onText: 'ON',
                                offText: 'OFF',
                                checked: this.properties.useFullWidth
                            }),
                        ]
                    }
                ]
            }
        ];
    }

    protected async onPropertyPaneConfigurationStart() {
        this.context.statusRenderer.displayLoadingIndicator(this.domElement, 'Loading properties...');
        let currentUserInfo: ISiteUserInfo = await this.helper.getCurrentUserDefaultInfo();
        if (currentUserInfo.IsSiteAdmin)
            this.wpPropertyPages = this.getAdminWPProperties();
        else this.wpPropertyPages = this.getUserWPProperties();
        this.context.propertyPane.refresh();
        this.context.statusRenderer.clearLoadingIndicator(this.domElement);
        this.render();
    }

    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
        return {
            pages: this.wpPropertyPages
        };
    }
}
