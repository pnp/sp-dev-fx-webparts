import { ThemeProvider } from '@fluentui/react';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import * as React from 'react';
import * as strings from 'ReactHtmWebPartStrings';

export interface IShowPlaceholderProps {
    context: WebPartContext;
    themeVariant: IReadonlyTheme;
}

function ShowPlaceholder(props: IShowPlaceholderProps) {
    return (
        <ThemeProvider theme={props.themeVariant}>
            <Placeholder iconName='CodeEdit'
                iconText={strings.PlaceholderIconText}
                description={strings.PlaceholderDescription}
                buttonLabel={strings.PlaceholderButtonLabel}
                onConfigure={() => {
                    this.props.context.propertyPane.open();
                }} />
        </ThemeProvider>
    );
}

export default ShowPlaceholder;