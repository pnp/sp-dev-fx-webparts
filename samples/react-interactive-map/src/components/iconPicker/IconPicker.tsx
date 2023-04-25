import * as React from 'react';
import styles from './IconPicker.module.scss';
import { Icon, ITextField } from 'office-ui-fabric-react';
import { allIcons } from './availableIcons';
import { isNullOrEmpty, cssClasses, isFunction } from '@spfxappdev/utility';
import { Autocomplete, IAutocompleteProps } from '@src/components/autocomplete/Autocomplete';


export interface IIconPickerProps extends Omit<IAutocompleteProps, "onUpdated" | "onChange"> {
    enableDialogPicker?: boolean;
    dialogPickerIconName?: string;
    onIconChanged?(iconName: string): void;
}

interface IIconPickerState {
    currentValue: string;
}

export class IconPicker extends React.Component<IIconPickerProps, IIconPickerState> {

    public state: IIconPickerState = {
        currentValue: isNullOrEmpty(this.props.defaultValue) ? "" : this.props.defaultValue
    };

    public static defaultProps: IIconPickerProps = {
        dialogPickerIconName: "GroupedList",
        enableDialogPicker: true,   
        showSuggestionsOnFocus: false,
        minValueLength: 0
    };

    private inputValueOnClick: string = "";

    private textFieldReference: ITextField = null;

    private textFieldDomElement: HTMLInputElement = null;

    private autocompleteRef: Autocomplete = null;
    
    public render(): React.ReactElement<IIconPickerProps> {

        return (<>
        <Autocomplete {...this.props}
        textFieldRef={(fluentUITextField: ITextField, autocompleteComponent: Autocomplete, htmlInput: HTMLInputElement) => {
            this.textFieldReference = fluentUITextField;
            this.textFieldDomElement = htmlInput;
            this.autocompleteRef = autocompleteComponent;
            if(isFunction(this.props.textFieldRef)) {
                this.props.textFieldRef(fluentUITextField, autocompleteComponent, this.textFieldDomElement);
            }
        }}
        onChange={(ev: any, name: string) => {
            if(isFunction(this.props.onIconChanged)) {
                this.props.onIconChanged(name);
            }
        }}
        onUpdated={(name: string) => {
            if(isFunction(this.props.onIconChanged)) {
                this.props.onIconChanged(name);
            }
        }}
        className={cssClasses(styles.iconpicker)}
        defaultValue={this.state.currentValue}
        onLoadSuggestions={(newValue: string) => {
            this.setState({
                currentValue: newValue
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

        return (
            <div className={styles["suggesstion"]}>
            {allIcons.Where(icon => icon.StartsWith(this.state.currentValue)).map((iconName: string): JSX.Element => {
                return (<div 
                    key={`Icon_${iconName}`}
                    onClick={() => {
                        this.inputValueOnClick = iconName;
                        
                        this.setState({
                            currentValue: iconName
                        });
                        
                        this.autocompleteRef.updateValue(iconName);
                    }}
                    className={styles["suggesstion-item"]}>
                        <Icon  iconName={iconName} />
                        <span>{iconName}</span>
                    </div>);
            })}
            </div>
        );
    }
}