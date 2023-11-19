import * as React from 'react';
import styles from './PasswordVault.module.scss';
import { cssClasses, isNullOrEmpty } from '@spfxappdev/utility';
import { ActionButton, Callout, Icon, TooltipHost, DirectionalHint } from 'office-ui-fabric-react';
import { ModuleType } from '@src/models';
import * as strings from 'PasswordVaultWebPartStrings';

export interface IAddNewModuleProps {
    onModuleSelected(module: ModuleType): void;
}

interface IAddNewModuleState {
    showAddNewCallout: boolean;
}

export default class AddNewModule extends React.Component<IAddNewModuleProps, IAddNewModuleState> {

    private addNewButtonRef: HTMLButtonElement = null;

    public state: IAddNewModuleState = {
        showAddNewCallout: false
    };
    
    public render(): React.ReactElement<IAddNewModuleProps> {
        const callOutVisbileClass: string = styles["active-separator"];
        const isCallOutVisibleClass = {};
        isCallOutVisibleClass[callOutVisbileClass] = this.state.showAddNewCallout;

        return (
            <div className={cssClasses(styles["separator-container"], isCallOutVisibleClass)}>
                <button type="button"
                aria-haspopup="true" 
                aria-label={strings.AddNewModuleLabel} 
                ref={(ref: HTMLButtonElement) => { this.addNewButtonRef = ref }}
                onClick={() => {
                this.setState({
                    showAddNewCallout: true
                });
                }}>
                <TooltipHost content={strings.AddNewModuleLabel} 
                    // id={this.WebPart.instanceId + "_addNewControl"}
                >
                    <Icon iconName="Add" />
                </TooltipHost>
                </button>

                {this.renderAddNewCallout()}
            </div>
        )
    }

    private renderAddNewCallout(): JSX.Element {

        if(isNullOrEmpty(this.addNewButtonRef)) {
          return <></>;
        }

        const icon = this.addNewButtonRef.querySelector(".ms-TooltipHost");

        return (
          <> 
          <Callout 
            target={icon}
            className={"addnew-callout"}
            hidden={!this.state.showAddNewCallout} 
            directionalHint={DirectionalHint.bottomCenter}
            onDismiss={() => {
                this.setState({
                    showAddNewCallout: false
                });
            }}
            >
            <ActionButton iconProps={{iconName: "PasswordField"}} onClick={() => { this.onModuleSelected(ModuleType.PasswordField); }}>
              <div>{strings.PasswordModuleLabel}</div>
            </ActionButton>

            <ActionButton iconProps={{iconName: "UserOptional"}} onClick={() => { this.onModuleSelected(ModuleType.UserField); }}>
              <div>{strings.UsernameModuleLabel}</div>
            </ActionButton>

            <ActionButton iconProps={{iconName: "EditNote"}} onClick={() => { this.onModuleSelected(ModuleType.NoteField); }}>
              <div>{strings.NoteModuleLabel}</div>
            </ActionButton>
          </Callout>
          </>
        );
    }

    private onModuleSelected(module: ModuleType): void {
        this.setState({
            showAddNewCallout: false
        });

        this.props.onModuleSelected(module);
    }
}