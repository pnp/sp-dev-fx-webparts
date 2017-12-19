import * as React from "react";
import styles from "./SkypePresenceReact.module.scss";
import { ISkypePresenceReactProps } from "./ISkypePresenceReactProps";
import { ISkypePresenceWebPartState } from "./ISkypePresenceWebPartState";
import { SkypeForBusinessCommunicationService } from "../services";
import { escape } from "@microsoft/sp-lodash-subset";
import {
  Persona,
  PersonaSize,
  PersonaPresence
} from "office-ui-fabric-react/lib/Persona";


export default class SkypePresenceReact extends React.Component<ISkypePresenceReactProps, ISkypePresenceWebPartState> {
  private skypeService: SkypeForBusinessCommunicationService;
  constructor(props: ISkypePresenceReactProps) {
    super(props);
    this.state = {
      emailAddress: "",
      name: "",
      status: "Loading..."
    };
  }
  public render(): React.ReactElement<ISkypePresenceReactProps> {
    this.skypeService = new SkypeForBusinessCommunicationService(this.props.webPartContext);
    return (
      <div className={styles.skypePresenceReact}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Skype presence with UCWA JS SDK sample for SPFX</span>
              <p className={styles.subTitle}>Enter the email address of the user you want to see the status change</p>
              <input onChange={evt => this.onEmailChange(evt)} />
              <button className={styles.button} onClick={evt => this.subscribeStatus(evt)} >Subscribe</button><br />
              <Persona
                primaryText={this.state.name}
                size={ PersonaSize.size32 }
                presence={ this.mapSkypeStatusToPersonaStatus(this.state.status) }
                hidePersonaDetails={false}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  public onEmailChange(event: React.FormEvent<HTMLInputElement>): void {
    var state: ISkypePresenceWebPartState =  {
      emailAddress: event.currentTarget.value,
      status: this.state.status,
      name: this.state.name
   };
   this.setState(state);
  }
  public mapSkypeStatusToPersonaStatus(skypeStatus: string): PersonaPresence {
    switch (skypeStatus) {
      case "Online":
          return PersonaPresence.online;
      case "Idle":
      case "BeRightBack":
      case "Away":
          return PersonaPresence.away;
      case "DoNotDisturb":
          return PersonaPresence.dnd;
      case "Busy":
          return PersonaPresence.busy;
      case "Offline":
        return PersonaPresence.offline;
      case "Hidden":
      case "Unknown":
      default:
          return PersonaPresence.none;
  }
  }
  public async subscribeStatus(event: React.FormEvent<HTMLButtonElement>): Promise<any> {
    await this.skypeService.SubscribeToStatusChangeForUser(this.state.emailAddress, "Name", (newStatus, oldStatus, displayName) => {
      var state: ISkypePresenceWebPartState =  {
         emailAddress: this.state.emailAddress,
         status: newStatus,
         name: displayName
      };
      this.setState(state);
    });
  }
}
