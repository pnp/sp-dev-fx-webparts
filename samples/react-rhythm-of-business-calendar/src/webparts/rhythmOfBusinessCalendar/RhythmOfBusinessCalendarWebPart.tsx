import React from 'react';
import ReactDom from "react-dom";
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { RhythmOfBusinessCalendarApp } from 'apps';

import * as strings from 'RhythmOfBusinessCalendarWebPartStrings';
import './RhythmOfBusinessCalendar.module.scss';

export interface IWebPartProps {
}

export default class RhythmOfBusinessCalendarWebPart extends BaseClientSideWebPart<IWebPartProps> {
    public render(): void {
        ReactDom.render(
            <RhythmOfBusinessCalendarApp webpart={this} />,
            this.domElement
        );
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
                        description: strings.PropertyPane.Heading
                    },
                    groups: [
                    ]
                }
            ]
        };
    }
}