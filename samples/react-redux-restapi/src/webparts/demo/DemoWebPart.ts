import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
    BaseClientSideWebPart,
    IPropertyPaneConfiguration,
    PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'demoStrings';
import Demo from './components/Demo';
import { IDemoProps } from './components/IDemoProps';
import { IDemoWebPartProps } from './IDemoWebPartProps';

import configureStore from './store/configureStore';
import { Provider, ProviderProps } from 'react-redux';
const store = configureStore();

export default class DemoWebPart extends BaseClientSideWebPart<IDemoWebPartProps> {

    public render(): void {
        // const element: React.ReactElement<IDemoProps> = 
        // );

        const provider: React.ReactElement<Provider> = React.createElement(typeof Provider, { }, React.createElement(
            Demo,
            {
				store: store,
                description: this.properties.description
            }));


        ReactDom.render(provider, this.domElement);
        // <Provider store={store}>
        // 	<Demo description={this.properties.description}/>
        // </Provider>

        //ReactDom.render(element, this.domElement);
    }

    protected get dataVersion(): Version {
        return Version.parse('1.0');
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
                                PropertyPaneTextField('description', {
                                    label: strings.DescriptionFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    }
}
