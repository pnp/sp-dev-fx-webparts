import * as React from 'react';
import ResultsLayoutOption from '../../models/ResultsLayoutOption';
import { IPropertyPaneField } from '@microsoft/sp-property-pane';
import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
import * as strings from 'PeopleSearchWebPartStrings';
import { PropertyPaneChoiceGroup } from "@microsoft/sp-property-pane";
import { IPeopleSearchWebPartProps } from '../../webparts/peoplesearch/IPeopleSearchWebPartProps';
import { DebugViewComponent, IDebugViewProps } from '../../components/DebugViewComponent';
import ITemplateContext from '../../models/ITemplateContext';
import { PeopleViewComponent, IPeopleViewProps } from '../../components/PeopleViewComponent/PeopleViewComponent';
import { IPeopleShimmerViewProps, PeopleShimmerViewComponent } from '../../components/PeopleViewComponent/PeopleShimmerViewComponent';

const PEOPLE_RESULT_SOURCEID = 'b09a7990-05ea-4af9-81ef-edfab16c4e31';

export interface IComponentFieldsConfiguration {

    /**
     * The name of the field
     */
    name: string;

    /**
     * The field name for the inner component props
     */
    field: string;

    /**
     * The value of the field
     */
    value: string;
}

export class TemplateService {
    /**
     * Gets template parameters
     * @param layout the selected layout
     * @param properties the Web Part properties
     * @param onUpdateAvailableProperties callback when the list of managed properties is fetched by the control (Optional)
     * @param availableProperties the list of available managed properties already fetched once (Optional)
     */
    public getTemplateParameters(layout: ResultsLayoutOption, properties: IPeopleSearchWebPartProps): IPropertyPaneField<any>[] {

        switch (layout) {
            case ResultsLayoutOption.People:
                return this._getPeopleLayoutFields(properties);
            default:
                return [];
        }
    }

    public getTemplateComponent(layout: ResultsLayoutOption, results: ITemplateContext): JSX.Element {
        let templateComponent = null;
        switch (layout) {
            case ResultsLayoutOption.People:
                templateComponent = React.createElement(
                    PeopleViewComponent,
                    {
                        templateContext: results
                    } as IPeopleViewProps
                );
                break;
            case ResultsLayoutOption.Debug:
                templateComponent = React.createElement(
                    DebugViewComponent,
                    {
                        content: JSON.stringify(results.items, undefined, 2)
                    } as IDebugViewProps
                );
                break;
        }
        return templateComponent;
    }

    public getShimmerTemplateComponent(layout: ResultsLayoutOption, results: ITemplateContext): JSX.Element {
        let templateComponent = null;
        switch (layout) {
            case ResultsLayoutOption.People:
                templateComponent = React.createElement(
                    PeopleShimmerViewComponent,
                    {
                        templateContext: results
                    } as IPeopleShimmerViewProps
                );
                break;
        }
        return templateComponent;
    }

        /**
     * Replaces item field values with field mapping values configuration
     * @param fieldsConfigurationAsString the fields configuration as stringified object
     * @param itemAsString the item context as stringified object
     * @param themeVariant the current theem variant
     */
    public static processFieldsConfiguration<T>(fieldsConfiguration: IComponentFieldsConfiguration[], item: any): T {

        let processedProps = {};

        // Use configuration
        fieldsConfiguration.map(configuration => {

            let processedValue = item[configuration.value];
            processedProps[configuration.field] = processedValue;
        });

        return processedProps as T;
    }

    private _getPeopleLayoutFields(properties: IPeopleSearchWebPartProps): IPropertyPaneField<any>[] {
        
        // Setup default values
        if (!properties.templateParameters.peopleFields) {

            properties.templateParameters.peopleFields = [
                { name: 'User Principal Name', field: 'upn', value: "userPrincipalName" },
                { name: 'Primary Text', field: 'text', value: "displayName" },
                { name: 'Secondary Text', field: 'secondaryText', value: "jobTitle" },
                { name: 'Tertiary Text', field: 'tertiaryText',  value: "mail" },
                { name: 'Optional Text', field: 'optionalText',  value: "mobilePhone" }
            ] as IComponentFieldsConfiguration[];
        }

        if (!properties.templateParameters.personaSize) {
            properties.templateParameters.personaSize = 14;
        }

        return [
            
            // Careful, the property names should match the React components props. These will be injected in the Handlebars template context and passed as web component attributes
            PropertyFieldCollectionData('templateParameters.peopleFields', {
                manageBtnLabel: strings.TemplateParameters.ManagePeopleFieldsLabel,
                key: 'templateParameters.peopleFields',
                panelHeader: strings.TemplateParameters.ManagePeopleFieldsLabel,
                panelDescription: strings.TemplateParameters.ManagePeopleFieldsPanelDescriptionLabel,
                enableSorting: false,
                disableItemCreation: true,
                disableItemDeletion: true,
                label: strings.TemplateParameters.ManagePeopleFieldsLabel,
                value: properties.templateParameters.peopleFields,
                fields: [
                    {
                        id: 'name',
                        type: CustomCollectionFieldType.string,
                        disableEdit: true,
                        title: strings.TemplateParameters.PlaceholderNameFieldLabel
                    },
                    {
                        id: 'value',
                        type: CustomCollectionFieldType.string,
                        title: strings.TemplateParameters.PlaceholderValueFieldLabel,
                    }
                ]
            }),
            PropertyPaneChoiceGroup('templateParameters.personaSize', {
                label: strings.TemplateParameters.PersonaSizeOptionsLabel,
                options: [
                    {
                        key: 11,
                        text: strings.TemplateParameters.PersonaSizeExtraSmall
                    },
                    {
                        key: 12,
                        text: strings.TemplateParameters.PersonaSizeSmall
                    },
                    {
                        key: 13,
                        text: strings.TemplateParameters.PersonaSizeRegular
                    },
                    {
                        key: 14,
                        text: strings.TemplateParameters.PersonaSizeLarge
                    },
                    {
                        key: 15,
                        text: strings.TemplateParameters.PersonaSizeExtraLarge
                    }
                ]
            }),      
        ];
    }
}