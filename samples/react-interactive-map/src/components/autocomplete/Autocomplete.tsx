import * as React from 'react';
import styles from './Autocomplete.module.scss';
import { TextField, ITextFieldProps, Callout, ICalloutProps, DirectionalHint, ITextField, TextFieldBase } from '@fluentui/react';
import { isNullOrEmpty, cssClasses, getDeepOrDefault, isFunction } from '@spfxappdev/utility';


export interface IAutocompleteProps extends Omit<ITextFieldProps, "componentRef"> {
    showSuggestionsOnFocus?: boolean;
    minValueLength?: number;
    onLoadSuggestions?(newValue: string): void;
    onRenderSuggestions?(inputValue: string): JSX.Element;
    textFieldRef?(fluentUITextField: ITextField, autocompleteComponent: Autocomplete, htmlInput?: HTMLInputElement): void;
    onUpdated?(newValue: string): void;
    calloutProps?: Omit<ICalloutProps, "hidden" | "target" | "preventDismissOnScroll" | "directionalHint" | "directionalHintFixed" | "isBeakVisible">;
}

interface IAutocompleteState {
    currentValue: string;
    isFlyoutVisible: boolean;
}

export class Autocomplete extends React.Component<IAutocompleteProps, IAutocompleteState> {

    public state: IAutocompleteState = {
        currentValue: isNullOrEmpty(this.props.defaultValue) ? "" : this.props.defaultValue,
        isFlyoutVisible: false,
    };

    public static defaultProps: IAutocompleteProps = {
        showSuggestionsOnFocus: false,
        minValueLength: 3,
        calloutProps: {
            gapSpace: 0
        }
    };

    private textFieldReference: ITextField | undefined = undefined;

    private textFieldDomElement: HTMLInputElement | undefined = undefined;

    private userIsTyping: boolean = false;

    private lastValue: string = "";

    private onUpdateValueText: string = "";
    
    public render(): React.ReactElement<IAutocompleteProps> {

        return (<>
        <TextField {...this.props}
        autoComplete={"off"}
        className={cssClasses(styles.autocomplete, this.props.className)}
        componentRef={(input: ITextField | null) => {
            this.textFieldReference = input ?? undefined;
            this.textFieldDomElement = getDeepOrDefault<HTMLInputElement>(input, "_textElement.current", undefined);

            if(isFunction(this.props.textFieldRef)) {
                this.props.textFieldRef(input!, this, this.textFieldDomElement);
            }

        }}
        onFocus={(ev: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            if(this.props.showSuggestionsOnFocus) {
                this.handleSuggestionListVisibility();
            }

            if(isFunction(this.props.onFocus)) {
                this.props.onFocus(ev);
            }
        }}
        onBlur={(ev: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {

            this.onTextFieldBlur();

            if(isFunction(this.props.onBlur)) {
                this.props.onBlur(ev);
            }
        }}
        onChange={(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            this.onValueChanged(ev, newValue ?? "");
        }}
        defaultValue={this.state.currentValue}
        />

        {this.renderSuggesstionsFlyout()}
        </>);
    }

    public updateValue(newValue: string): void {
        this.onUpdateValueText = newValue;
        
        this.setState({
            currentValue: newValue
        }, () => {
            (this.textFieldReference as TextFieldBase).setState({
                uncontrolledValue: this.onUpdateValueText
            });
    
            if(isFunction(this.props.onUpdated)) {
                this.props.onUpdated(newValue);
            }
        });        
    }

    private renderSuggesstionsFlyout(): JSX.Element {
        let minWidth: number = getDeepOrDefault<number>(this.props, "calloutProps.calloutMinWidth", -1);

        if(minWidth <= 0) {
            minWidth = getDeepOrDefault<number>(this, "textFieldDomElement.clientWidth", -1);
        }

        if(minWidth > 0) {
            this.props.calloutProps!.calloutMinWidth = minWidth;
        }

        return (<Callout
            {...this.props.calloutProps}
            hidden={!this.state.isFlyoutVisible}
            directionalHintFixed={true}
            isBeakVisible={false}
            target={this.textFieldDomElement}
            onDismiss={(ev?: Event | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
                this.hideSuggesstionsFlyout();
                
                if(isFunction(this.props.calloutProps!.onDismiss)) {
                    this.props.calloutProps!.onDismiss(ev);
                }
            }}
            preventDismissOnScroll={true}
            directionalHint={DirectionalHint.bottomCenter}>
                {isFunction(this.props.onRenderSuggestions) && this.props.onRenderSuggestions(this.state.currentValue)}
        </Callout>
        );
    }

    private onValueChanged(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string): void {
        this.userIsTyping = true;

        this.setState({
            currentValue: newValue
        });

        this.handleSuggestionListVisibility();

        if(isFunction(this.props.onChange)) {
            this.props.onChange(ev, newValue);
        }
    }

    private onTextFieldBlur(): void {
        this.userIsTyping = false;
        window.setTimeout(() => {
            this.hideSuggesstionsFlyout();
        }, 150);
    }

    private handleSuggestionListVisibility(): void {
        const val = this.state.currentValue;

        if(isNullOrEmpty(val)) {
            this.hideSuggesstionsFlyout();
            return;
        }

        if(val.length < this.props.minValueLength!) {
            this.hideSuggesstionsFlyout();
            return;
        }

        let valueWasChanged = false;

        if(!val.Equals(this.lastValue)) {
            this.userIsTyping = false;
            valueWasChanged = true;
        }

        if(!valueWasChanged) {
            this.showSuggesstionsFlyout();
            return;
        }

        window.setTimeout(() => {
            if(this.userIsTyping) {
               return; 
            }

            this.showSuggesstionsFlyout();

            if(isFunction(this.props.onLoadSuggestions)) {
                this.props.onLoadSuggestions(this.state.currentValue);
            }
        }, 150);
    }

    private hideSuggesstionsFlyout(): void {
        this.setState({
            isFlyoutVisible: false
        });
    }

    private showSuggesstionsFlyout(): void {
        this.setState({
            isFlyoutVisible: true
        });
    }
}