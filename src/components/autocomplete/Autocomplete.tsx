import * as React from 'react';
// import styles from './Autocomplete.module.scss';
import { TextField, ITextFieldProps, Callout, DirectionalHint, ITextField } from 'office-ui-fabric-react';
import { isNullOrEmpty, cssClasses, getDeepOrDefault, isFunction } from '@spfxappdev/utility';


export interface IAutocompleteProps extends Omit<ITextFieldProps, "componentRef"> {
    showSuggestionsOnFocus?: boolean;
    minValueLength?: number;
    onLoadSuggestions?(newValue: string): void;
    onRenderSuggestions?(): JSX.Element;
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
        minValueLength: 3
    };

    private textFieldReference: ITextField = null;

    private textFieldDomElement: HTMLInputElement = null;

    private userIsTyping: boolean = false;

    private lastValue: string = "";
    
    public render(): React.ReactElement<IAutocompleteProps> {
        return (<>
        <TextField {...this.props}
        className={cssClasses("styles.autocomplete", this.props.className)}
        componentRef={(input: ITextField) => {
            this.textFieldReference = input;
            this.textFieldDomElement = getDeepOrDefault<HTMLInputElement>(input, "_textElement.current", null);
            
            
        }}
        onFocus={(ev: any) => {
            if(this.props.showSuggestionsOnFocus) {
                this.handleSuggestionListVisibility();
            }

            if(isFunction(this.props.onFocus)) {
                this.props.onFocus(ev);
            }
        }}
        onBlur={(ev: any) => {

            this.onTextFieldBlur();

            if(isFunction(this.props.onBlur)) {
                this.props.onBlur(ev);
            }
        }}
        onChange={(ev: any, newValue: string) => {
            
            this.onValueChanged(newValue);

            if(isFunction(this.props.onChange)) {
                this.props.onChange(ev, newValue);
            }
        }}
        defaultValue={this.state.currentValue}
        />

        {this.renderSuggesstionsFlyout()}
        </>);
    }

    private renderSuggesstionsFlyout(): JSX.Element {
        return (<Callout
            hidden={!this.state.isFlyoutVisible}
            className={"styles.bagHeaderMegamenu"}
            directionalHintFixed={true}
            gapSpace={0}
            // calloutWidth={window.outerWidth}
            isBeakVisible={false}
            target={this.textFieldDomElement}
            onDismiss={() => {
                this.hideSuggesstionsFlyout();
            }}
            preventDismissOnScroll={true}
            directionalHint={DirectionalHint.bottomCenter}>
                {isFunction(this.props.onRenderSuggestions) && this.props.onRenderSuggestions()}
        </Callout>
        );
    }

    private onValueChanged(newValue: string): void {
        this.userIsTyping = true;

        this.state.currentValue = newValue;
        this.setState({
            currentValue: newValue
        });

        this.handleSuggestionListVisibility();
    }

    private onTextFieldBlur(): void {
        this.userIsTyping = false;

    }

    private handleSuggestionListVisibility(): void {
        let val = this.state.currentValue;

        if(isNullOrEmpty(val)) {
            this.hideSuggesstionsFlyout();
            return;
        }

        if(val.length < this.props.minValueLength) {
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