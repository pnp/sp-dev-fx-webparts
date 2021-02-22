import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, ServiceScope } from '@microsoft/sp-core-library';
import {
    IPropertyPaneConfiguration,
    PropertyPaneTextField,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { CalloutTriggers } from '@pnp/spfx-property-controls/lib/PropertyFieldHeader';
import { PropertyFieldToggleWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldToggleWithCallout';
import { PropertyFieldChoiceGroupWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldChoiceGroupWithCallout';
import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
import { DateTimePicker, DateConvention, TimeConvention } from '@pnp/spfx-controls-react/lib/DateTimePicker';
import "@pnp/polyfill-ie11";
import { sp } from "@pnp/sp/presets/all";
import * as strings from 'SimplePollWebPartStrings';
import SimplePoll from './components/SimplePoll';
import { ISimplePollProps } from './components/ISimplePollProps';
import SPHelper from '../../Common/SPHelper';
import { IUserInfo } from '../../Models';
import { ChartType } from '@pnp/spfx-controls-react/lib/ChartControl';


export interface ISimplePollWebPartProps {
    pollQuestions: any[];
    MsgAfterSubmission: string;
    BtnSubmitVoteText: string;
    chartType: ChartType;
    ResponseMsgToUser: string;
    pollBasedOnDate: boolean;
    NoPollMsg: string;
}

export default class SimplePollWebPart extends BaseClientSideWebPart<ISimplePollWebPartProps> {
    private helper: SPHelper = null;
    private userinfo: IUserInfo = null;
    protected async onInit(): Promise<void> {
        await super.onInit();
        sp.setup({
            ie11: true,
            spfxContext: this.context
        });
        this.helper = new SPHelper();
        this.userinfo = await this.helper.getCurrentUserInfo();
    }

    public render(): void {
        const element: React.ReactElement<ISimplePollProps> = React.createElement(
            SimplePoll,
            {
                pollQuestions: this.properties.pollQuestions,
                SuccessfullVoteSubmissionMsg: this.properties.MsgAfterSubmission,
                ResponseMsgToUser: this.properties.ResponseMsgToUser,
                BtnSubmitVoteText: this.properties.BtnSubmitVoteText,
                chartType: this.properties.chartType ? this.properties.chartType : ChartType.Doughnut,
                pollBasedOnDate: this.properties.pollBasedOnDate,
                NoPollMsg: this.properties.NoPollMsg,
                currentUserInfo: this.userinfo,
                openPropertyPane: this.openPropertyPane
            }
        );

        ReactDom.render(element, this.domElement);
    }

    protected get disableReactivePropertyChanges() {
        return false;
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
                                PropertyFieldToggleWithCallout('pollBasedOnDate', {
                                    calloutTrigger: CalloutTriggers.Hover,
                                    key: 'pollBasedOnDateFieldId',
                                    label: strings.PollDateLabel,
                                    calloutContent: React.createElement('div', {}, strings.PollDateCalloutText),
                                    onText: 'Yes',
                                    offText: 'No',
                                    checked: this.properties.pollBasedOnDate
                                }),
                                PropertyFieldCollectionData("pollQuestions", {
                                    key: "pollQuestions",
                                    label: strings.PollQuestionsLabel,
                                    panelHeader: strings.PollQuestionsPanelHeader,
                                    manageBtnLabel: strings.PollQuestionsManageButton,
                                    enableSorting: true,
                                    value: this.properties.pollQuestions,
                                    fields: [
                                        {
                                            id: "QTitle",
                                            title: strings.Q_Title_Title,
                                            type: CustomCollectionFieldType.custom,
                                            required: true,
                                            onCustomRender: (field, value, onUpdate, item, itemId) => {
                                                return (
                                                    React.createElement("div", null,
                                                        React.createElement("textarea",
                                                            {
                                                                style: { width: "220px", height: "70px" },
                                                                placeholder: strings.Q_Title_Placeholder,
                                                                key: itemId,
                                                                value: value,
                                                                onChange: (event: React.FormEvent<HTMLTextAreaElement>) => {
                                                                    onUpdate(field.id, event.currentTarget.value);
                                                                },
                                                            })
                                                    )
                                                );
                                            }
                                        },
                                        {
                                            id: "QOptions",
                                            title: strings.Q_Options_Title,
                                            type: CustomCollectionFieldType.custom,
                                            required: true,
                                            onCustomRender: (field, value, onUpdate, item, itemId) => {
                                                return (
                                                    React.createElement("div", null,
                                                        React.createElement("textarea",
                                                            {
                                                                style: { width: "220px", height: "70px" },
                                                                placeholder: strings.Q_Options_Placeholder,
                                                                key: itemId,
                                                                value: value,
                                                                onChange: (event: React.FormEvent<HTMLTextAreaElement>) => {
                                                                    onUpdate(field.id, event.currentTarget.value);
                                                                },
                                                            })
                                                    )
                                                );
                                            }
                                        },
                                        {
                                            id: "QMultiChoice",
                                            title: strings.MultiChoice_Title,
                                            type: CustomCollectionFieldType.boolean,
                                            defaultValue: false
                                        },
                                        {
                                            id: "QStartDate",
                                            title: strings.Q_StartDate_Title,
                                            type: CustomCollectionFieldType.custom,
                                            required: false,
                                            onCustomRender: (field, value, onUpdate, item, itemId) => {
                                                return (
                                                    React.createElement(DateTimePicker, {
                                                        key: itemId,
                                                        showLabels: false,
                                                        dateConvention: DateConvention.Date,
                                                        showGoToToday: true,
                                                        showMonthPickerAsOverlay: true,
                                                        value: value ? new Date(value) : null,
                                                        disabled: !this.properties.pollBasedOnDate,
                                                        onChange: (date: Date) => {
                                                            onUpdate(field.id, date);
                                                        }
                                                    })
                                                );
                                            }
                                        },
                                        {
                                            id: "QEndDate",
                                            title: strings.Q_EndDate_Title,
                                            type: CustomCollectionFieldType.custom,
                                            required: false,
                                            onCustomRender: (field, value, onUpdate, item, itemId) => {
                                                return (
                                                    React.createElement(DateTimePicker, {
                                                        key: itemId,
                                                        showLabels: false,
                                                        dateConvention: DateConvention.Date,
                                                        showGoToToday: true,
                                                        showMonthPickerAsOverlay: true,
                                                        value: value ? new Date(value) : null,
                                                        disabled: !this.properties.pollBasedOnDate,
                                                        onChange: (date: Date) => {
                                                            onUpdate(field.id, date);
                                                        }
                                                    })
                                                );
                                            }
                                        }
                                    ],
                                    disabled: false
                                }),
                                PropertyPaneTextField('MsgAfterSubmission', {
                                    label: strings.MsgAfterSubmissionLabel,
                                    description: strings.MsgAfterSubmissionDescription,
                                    maxLength: 150,
                                    multiline: true,
                                    rows: 3,
                                    resizable: false,
                                    placeholder: strings.MsgAfterSubmissionPlaceholder,
                                    value: this.properties.MsgAfterSubmission
                                }),
                                PropertyPaneTextField('ResponseMsgToUser', {
                                    label: strings.ResponseMsgToUserLabel,
                                    description: strings.ResponseMsgToUserDescription,
                                    maxLength: 150,
                                    multiline: true,
                                    rows: 3,
                                    resizable: false,
                                    placeholder: strings.ResponseMsgToUserPlaceholder,
                                    value: this.properties.ResponseMsgToUser
                                }),
                                PropertyPaneTextField('BtnSubmitVoteText', {
                                    label: strings.BtnSumbitVoteLabel,
                                    description: strings.BtnSumbitVoteDescription,
                                    maxLength: 50,
                                    multiline: false,
                                    resizable: false,
                                    placeholder: strings.BtnSumbitVotePlaceholder,
                                    value: this.properties.BtnSubmitVoteText
                                }),
                                PropertyPaneTextField('NoPollMsg', {
                                    label: strings.NoPollMsgLabel,
                                    description: strings.NoPollMsgDescription,
                                    maxLength: 150,
                                    multiline: true,
                                    rows: 3,
                                    resizable: false,
                                    placeholder: strings.NoPollMsgPlaceholder,
                                    value: this.properties.NoPollMsg
                                }),
                                PropertyFieldChoiceGroupWithCallout('chartType', {
                                    calloutContent: React.createElement('div', {}, strings.ChartFieldCalloutText),
                                    calloutTrigger: CalloutTriggers.Hover,
                                    key: 'choice_charttype',
                                    label: strings.ChartFieldLabel,
                                    options: [
                                        {
                                            key: 'pie',
                                            text: 'Pie',
                                            checked: this.properties.chartType === ChartType.Pie,
                                            iconProps: { officeFabricIconFontName: 'PieSingle' }
                                        }, {
                                            key: 'doughnut',
                                            text: 'Doughnut',
                                            checked: this.properties.chartType === ChartType.Doughnut,
                                            iconProps: { officeFabricIconFontName: 'DonutChart' }
                                        }, {
                                            key: 'bar',
                                            text: 'Bar',
                                            checked: this.properties.chartType === ChartType.Bar,
                                            iconProps: { officeFabricIconFontName: 'BarChartVertical' }
                                        }, {
                                            key: 'horizontalBar',
                                            text: 'Horizontal Bar',
                                            checked: this.properties.chartType === ChartType.HorizontalBar,
                                            iconProps: { officeFabricIconFontName: 'BarChartHorizontal' }
                                        }, {
                                            key: 'line',
                                            text: 'Line',
                                            checked: this.properties.chartType === ChartType.Line,
                                            iconProps: { officeFabricIconFontName: 'LineChart' }
                                        }]
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    }
}
