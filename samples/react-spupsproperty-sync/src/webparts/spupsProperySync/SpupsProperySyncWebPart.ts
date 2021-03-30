import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
    IPropertyPaneConfiguration,
    PropertyPaneTextField,
    IPropertyPanePage
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';
import { CalloutTriggers } from '@pnp/spfx-property-controls/lib/PropertyFieldHeader';
import { PropertyFieldLabelWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldLabelWithCallout';
import { PropertyFieldToggleWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldToggleWithCallout';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import { PropertyPaneWebPartInformation } from '@pnp/spfx-property-controls/lib/PropertyPaneWebPartInformation';
import { PropertyFieldPeoplePicker, PrincipalType, IPropertyFieldGroupOrPerson } from '@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker';
import { sp } from '@pnp/sp';
import { graph } from "@pnp/graph";
import * as strings from 'SpupsProperySyncWebPartStrings';
import SpupsProperySync from './components/SpupsProperySync';
import { ISpupsProperySyncProps } from './components/SpupsProperySync';
import SPHelper from '../../Common/SPHelper';
import { IUserInfo } from '../../Common/IModel';

export interface ISpupsProperySyncWebPartProps {
    context: WebPartContext;
    templateLib: string;
    appTitle: string;
    AzFuncUrl: string;
    UseCert: boolean;
    dateFormat: string;
    toggleInfoHeaderValue: boolean;
    useFullWidth: boolean;
    allowedUsers: IPropertyFieldGroupOrPerson[];
}

export default class SpupsProperySyncWebPart extends BaseClientSideWebPart<ISpupsProperySyncWebPartProps> {
    private loadingIndicator: boolean = true;
    private wpPropertyPages: IPropertyPanePage[] = [];

    protected async onInit() {
        await super.onInit();
        sp.setup(this.context);
        graph.setup({ spfxContext: this.context });
    }

    public render(): void {
        const element: React.ReactElement<ISpupsProperySyncProps> = React.createElement(
            SpupsProperySync,
            {
                context: this.context,
                templateLib: this.properties.templateLib,
                displayMode: this.displayMode,
                appTitle: this.properties.appTitle,
                AzFuncUrl: this.properties.AzFuncUrl,
                UseCert: this.properties.UseCert,
                dateFormat: this.properties.dateFormat ? this.properties.dateFormat : "DD, MMM YYYY hh:mm A",
                allowedUsers: this.properties.allowedUsers,
                useFullWidth: this.properties.useFullWidth,
                updateProperty: (value: string) => {
                    this.properties.appTitle = value;
                },
                openPropertyPane: this.openPropertyPane
            }
        );

        ReactDom.render(element, this.domElement);
    }

    protected get disableReactivePropertyChanges() {
        return true;
    }

    protected onDispose(): void {
        ReactDom.unmountComponentAtNode(this.domElement);
    }

    protected get dataVersion(): Version {
        return Version.parse('1.0');
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
                            PropertyFieldListPicker('templateLib', {
                                key: 'templateLibFieldId',
                                label: strings.PropTemplateLibLabel,
                                selectedList: this.properties.templateLib,
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
                                description: `${strings.PropInfoTemplateLib}`,
                                key: 'templateLibInfoId'
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
        let helper = new SPHelper(this.context.pageContext.legacyPageContext.siteAbsoluteUrl,
            this.context.pageContext.legacyPageContext.tenantDisplayName,
            this.context.pageContext.legacyPageContext.webDomain,
            this.context.pageContext.web.serverRelativeUrl,
            ''
        );
        let currentUserInfo: IUserInfo = await helper.getCurrentUserInfo();
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
