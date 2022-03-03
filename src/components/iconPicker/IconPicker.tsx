import * as React from 'react';
import styles from './IconPicker.module.scss';
import { ITextFieldProps, Icon } from 'office-ui-fabric-react';
import { allIcons } from './availableIcons';
import { isNullOrEmpty, cssClasses } from '@spfxappdev/utility';
import { Autocomplete, IAutocompleteProps } from '@src/components/autocomplete/Autocomplete';


export interface IIconPickerProps extends Omit<ITextFieldProps, "componentRef">, IAutocompleteProps {
    enableDialogPicker?: boolean;
    dialogPickerIconName?: string;
}

interface IIconPickerState {
    currentValue: string;
    isFlyoutVisible: boolean;
}

export class IconPicker extends React.Component<IIconPickerProps, IIconPickerState> {

    public state: IIconPickerState = {
        currentValue: isNullOrEmpty(this.props.defaultValue) ? "" : this.props.defaultValue,
        isFlyoutVisible: false,
    };

    public static defaultProps: IIconPickerProps = {
        dialogPickerIconName: "GroupedList",
        enableDialogPicker: true,   
        showSuggestionsOnFocus: false,
        minValueLength: 0
    };
    
    public render(): React.ReactElement<IIconPickerProps> {
        return (<>
        <Autocomplete {...this.props}
        className={cssClasses(styles.iconpicker)}
        defaultValue={this.state.currentValue}
        onLoadSuggestions={(newValue: string) => {
            this.state.currentValue = newValue;
            
            this.setState({
                currentValue: newValue,
                isFlyoutVisible: true
            });
        }}
        onRenderSuggestions={() => {
            return this.renderSuggesstionsFlyout();
        }}
        iconProps={{
            iconName: this.state.currentValue
        }} />

        
        </>);
    }

    private renderSuggesstionsFlyout(): JSX.Element {
        
        return (<>
            <ul>
            {allIcons.Where(icon => icon.StartsWith(this.state.currentValue)).map((iconName: string): JSX.Element => {
                return (<li key={`Icon_${iconName}`}><Icon  iconName={iconName} /></li>);
            })}
            </ul>
        </>
        );
    }
}