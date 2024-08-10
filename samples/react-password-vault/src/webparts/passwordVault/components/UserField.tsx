import * as React from 'react';
import { Callout, Icon, DirectionalHint, TextField, ITextField } from 'office-ui-fabric-react';
import * as strings from 'PasswordVaultWebPartStrings';
import { getDeepOrDefault, issetDeep, isset } from '@spfxappdev/utility';

export interface IUserFieldProps {
    isDisplayMode: boolean;
    defaultValue: string;
    onChange?(newValue: string): void;
    tabIndex?: number;
}

interface IUserFieldState {
    isCopyUsernameToClipboardCalloutHidden: boolean;
}

export default class UserField extends React.Component<IUserFieldProps, IUserFieldState> {

    private usernameTextFieldDomElement: HTMLInputElement = null;

    public state: IUserFieldState = {
        isCopyUsernameToClipboardCalloutHidden: false
    };
    
    public render(): React.ReactElement<IUserFieldProps> {

        if(this.props.isDisplayMode) {
            return this.renderDisplayMode();
        }

        return this.renderEditMode();

        
    }

    public renderDisplayMode(): JSX.Element {
        const showCopyToClipboard: boolean = issetDeep(window, "navigator.clipboard.writeText");

        return (<>
        <TextField
            label={strings.UsernameLabel}
            disabled={true}
            defaultValue={this.props.defaultValue}
            componentRef={(input: ITextField) => {
                this.usernameTextFieldDomElement = getDeepOrDefault(input, "_textElement.current", null);                      
            }}
            onRenderSuffix={() => {

                if(!showCopyToClipboard) {
                return <></>;
                }

                return (<Icon iconName={"Copy"} className="copy-icon" onClick={() => { this.copyToClipboard(this.props.defaultValue); }} />);
            }}
            />
            {showCopyToClipboard && isset(this.usernameTextFieldDomElement) &&
            <Callout
                hidden={this.state.isCopyUsernameToClipboardCalloutHidden}
                target={this.usernameTextFieldDomElement.parentElement}
                isBeakVisible={false}
                className={"clipboard-callout"}
                directionalHint={DirectionalHint.rightCenter}
            >
                {strings.UsernameCopiedLabel}
            </Callout>
            }
        </>)
    }

    public renderEditMode(): JSX.Element {
        return (<><TextField
            label={strings.UsernameLabel}
            type="text"
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
            isCopyUsernameToClipboardCalloutHidden: false
          });
    
          window.setTimeout(() => {
            this.setState({
              isCopyUsernameToClipboardCalloutHidden: true
            });
          }, 2000);
    
        });
      }
}
