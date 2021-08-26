import { ThemeProvider } from '@fluentui/react/lib/Theme';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react';
import * as React from 'react';

export interface IShowErrorProps {
    message: string;
    themeVariant: IReadonlyTheme;
}

function ShowError(props: IShowErrorProps) {
    return (
        <ThemeProvider theme={props.themeVariant}>
            <MessageBar messageBarType={MessageBarType.error}>
                {props.message}
            </MessageBar>
        </ThemeProvider>
    );
}

export default ShowError;