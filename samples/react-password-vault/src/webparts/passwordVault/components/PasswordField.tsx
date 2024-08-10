import * as React from 'react';
import { Callout, Icon, DirectionalHint, TextField, ITextField } from 'office-ui-fabric-react';
import * as strings from 'PasswordVaultWebPartStrings';
import { getDeepOrDefault, issetDeep, isset } from '@spfxappdev/utility';

export interface IPasswordFieldProps {
    isDisplayMode: boolean;
    defaultValue: string;
    onChange?(newValue: string): void;
    tabIndex?: number;
}

interface IPasswordFieldState {
    isCopyPasswordToClipboardCalloutHidden: boolean;
}

export default class PasswordField extends React.Component<IPasswordFieldProps, IPasswordFieldState> {

    private passwordTextFieldDomElement: HTMLInputElement = null;

    public state: IPasswordFieldState = {
        isCopyPasswordToClipboardCalloutHidden: false
    };
    
    public render(): React.ReactElement<IPasswordFieldProps> {

        if(this.props.isDisplayMode) {
            return this.renderDisplayMode();
        }

        return this.renderEditMode();
    }

    public renderDisplayMode(): JSX.Element {
        const showCopyToClipboard: boolean = issetDeep(window, "navigator.clipboard.writeText");

        return (<>
        <TextField
            label={strings.PasswordLabel}
            type="password"
            disabled={true}
            canRevealPassword={true}
            defaultValue={this.props.defaultValue}
            componentRef={(input: ITextField) => {
            this.passwordTextFieldDomElement = getDeepOrDefault(input, "_textElement.current", null);   
            }}
            onRenderSuffix={() => {
            
            if(!showCopyToClipboard) {
                return <></>;
            }

            return (<Icon iconName={"Copy"} className="copy-icon" onClick={() => { 
                this.copyToClipboard(this.props.defaultValue); 
            }} />);
            }}
        />
        {showCopyToClipboard && isset(this.passwordTextFieldDomElement) &&
        <Callout
            hidden={this.state.isCopyPasswordToClipboardCalloutHidden}
            target={this.passwordTextFieldDomElement.parentElement}
            isBeakVisible={false}
            className={"clipboard-callout"}
            directionalHint={DirectionalHint.rightCenter}
        >
            {strings.PasswordCopiedLabel}
        </Callout>
        }
        </>)
    }

    public renderEditMode(): JSX.Element {
        return (<><TextField
          label={strings.PasswordLabel}
          type="password"
          canRevealPassword={true}
          tabIndex={this.props.tabIndex}
          onChange={(ev: any, newValue: string) => {
            this.props.onChange(newValue);
          }}
          defaultValue={this.props.defaultValue}
        /></>);
    }

    private copyToClipboard(text: string): void {
        window.navigator.clipboard.writeText(text).then(() => {
    
          this.setState({
            isCopyPasswordToClipboardCalloutHidden: false
          });
    
          window.setTimeout(() => {
            this.setState({
                isCopyPasswordToClipboardCalloutHidden: true
            });
          }, 2000);
    
        });
      }
}