import * as React from 'react';
import * as strings from 'PasswordVaultWebPartStrings';
import { Label } from 'office-ui-fabric-react';
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";

export interface INoteFieldProps {
    isDisplayMode: boolean;
    defaultValue: string;
    onChange?(newValue: string): string;
}

interface INoteFieldState {
}

export default class NoteField extends React.Component<INoteFieldProps, INoteFieldState> {

    public state: INoteFieldState = {
    };
    
    public render(): React.ReactElement<INoteFieldProps> {
        if(this.props.isDisplayMode) {
            return this.renderDisplayMode();
        }

        return this.renderEditMode();
    }

    private renderDisplayMode(): JSX.Element {
        return (<>
        <RichText
          isEditMode={false}
          value={this.props.defaultValue}
        />
        </>);
    }

    private renderEditMode(): JSX.Element {
        return (<>
            <Label>{strings.NoteLabel}</Label>
            <RichText
            isEditMode={true}
            value={this.props.defaultValue}
            onChange={(note: string): string => {

                return this.props.onChange(note);
            }}
            />
        </>);
    }
}