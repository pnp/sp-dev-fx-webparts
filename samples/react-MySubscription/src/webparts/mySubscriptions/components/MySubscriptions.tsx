import * as React from "react";
import styles from "./MySubscriptions.module.scss";
import { IMySubscriptionsProps } from "./IMySubscriptionsProps";
import { MSGraphClient } from "@microsoft/sp-http";
import { MSGraphService } from "../services/GroupService";
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { Label } from "office-ui-fabric-react/lib/Label";

import {
  FocusZone,
  List,
  autobind,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  Shimmer,
  ShimmerElementType,
} from "office-ui-fabric-react";
import { IGroup } from "./interface/IGroup";
import { IIconProps } from "office-ui-fabric-react";
import { IGroupMember } from "./interface/IGroupMember";
import { IMySubscriptionState } from "./IMySubscriptionsState";
import {
  ConstantsMySubscription,
  IMySubscriptionsListConfig,
} from "../Constants";

import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { DisplayMode } from "@microsoft/sp-core-library";

const Checkbox: IIconProps = { iconName: "Checkbox" };
const CheckboxComposite: IIconProps = { iconName: "CheckboxComposite" };

export default class MySubscriptions extends React.Component<
  IMySubscriptionsProps,
  IMySubscriptionState
> {
  public _originalItems: IGroup[];
  public _mySubscribedItems: IGroupMember[];
  public userId: any;
  public listConfig: IMySubscriptionsListConfig;
  constructor(props: IMySubscriptionsProps) {
    super(props);
    this.state = {
      groups: [],
      showMessageBar: false,
      message: "",
      messageBarType: "",
      isdataLoaded: false,
      isdataLoadedMessage: this.props.strings.PleaseWait,
    };

    this._onRenderCell = this._onRenderCell.bind(this);
    this._joinGroup_leaveGRoup = this._joinGroup_leaveGRoup.bind(this);
  }
  public render(): React.ReactElement<IMySubscriptionsProps> {
    const messageBarType = this.state.messageBarType;
    const { semanticColors }: IReadonlyTheme = this.props.themeVariant;
    if (
      this.props.siteurl == undefined ||
      (this.props.siteurl.trim() == "" && this.props.listname == undefined) ||
      this.props.listname.trim() == ""
    ) {
      return (
        <FocusZone>
          <Placeholder
            iconName="Edit"
            iconText="Configure your web part"
            description="Please configure the web part."
            buttonLabel="Configure"
            hideButton={this.props.displayMode === DisplayMode.Read}
            onConfigure={this._onConfigure}
          />
        </FocusZone>
      );
    } else {
      return (
        <FocusZone>
          <div
            style={{ backgroundColor: semanticColors.bodyBackground }}
            className={styles.mySubscriptions}
          >
            <Label
              style={{ display: this.state.isdataLoaded ? "none" : "block" }}
              className={styles.title}
            >
              {this.state.isdataLoadedMessage}
            </Label>

            <Shimmer
              isDataLoaded={this.state.isdataLoaded}
              shimmerColors={{
                shimmer: semanticColors.listItemBackgroundChecked,
                shimmerWave: semanticColors.listItemBackgroundCheckedHovered,
                background: semanticColors.bodyBackground, // to match the background color of the containing div
              }}
              shimmerElements={[
                { type: ShimmerElementType.line, height: 100 },
                { type: ShimmerElementType.gap, width: "4%" },
                { type: ShimmerElementType.line, height: 100 },
                { type: ShimmerElementType.gap, width: "4%" },
                { type: ShimmerElementType.line, height: 100 },
                { type: ShimmerElementType.gap, width: "4%" },
                { type: ShimmerElementType.line, height: 100 },
              ]}
            />

            {this.state.showMessageBar && (
              <MessageBar
                messageBarType={
                  messageBarType == "success"
                    ? MessageBarType.success
                    : messageBarType == "warning"
                    ? MessageBarType.warning
                    : MessageBarType.error
                }
                isMultiline={false}
                onDismiss={() => this.closeMessageBar()}
                dismissButtonAriaLabel="Close"
              >
                {this.state.message}
              </MessageBar>
            )}

            <List items={this.state.groups} onRenderCell={this._onRenderCell} />
          </div>
        </FocusZone>
      );
    }
  }

  public async componentDidUpdate(
    prevProps: IMySubscriptionsProps,
    prevState: IMySubscriptionState
  ) {
    try {
      if (
        this.props.siteurl !== prevProps.siteurl ||
        this.props.listname !== prevProps.listname
      ) {
        await this.componentDidMount();
      }
    } catch (error) {

      console.log("MySubscriptions.componentDidMount Error: ", error);
    }
  }

  /**
   * Close the message bar ....
   */
  protected closeMessageBar = () => {
    this.setState({ showMessageBar: false });
  }

  /**
   *
   * @param item : each item
   * @param index : index
   */
  private _onRenderCell(item: IGroup, index: number | undefined): JSX.Element {
    //const { semanticColors }: IReadonlyTheme = this.props.themeVariant;

    return (
      <div
        className={styles.row}
        style={{ minWidth: window.innerWidth < 480 ? "250px" : "176px" }}
      >
        <span className={styles.title}>{item.Title}</span>
        <span className={styles.subTitle}>{item.description.slice(0, 99)}</span>

        <div className={styles.subscribe}>
          {!item.subscribe ? (
            <PrimaryButton
              className={styles.subscribedButtonRed}
              iconProps={Checkbox}
              text={this.props.strings.SubscribeLabel}
              id={item.groupid}
              onClick={() => {
                this._joinGroup_leaveGRoup(
                  item.groupid,
                  item.subscribe,
                  item.Title
                );
              }}
            />
          ) : (
            <PrimaryButton
              className={styles.subscribedButton}
              iconProps={CheckboxComposite}
              text={this.props.strings.SubscribedLabel}
              id={item.groupid}
              onClick={() => {
                this._joinGroup_leaveGRoup(
                  item.groupid,
                  item.subscribe,
                  item.Title
                );
              }}
            />
          )}
        </div>
      </div>
    );
  }
  private _onConfigure = () => {
    // Context of the web part
    this.props.context.propertyPane.open();
  }
  /**
   *  Join or leave a group
   */
  @autobind
  private async _joinGroup_leaveGRoup(
    groupID: string,
    subscribe: boolean,
    title: string
  ) {
    try {
      if (this.userId == undefined || this.userId == "") {
        let response = await MSGraphService.getUserID(this.props.context);
        this.userId = response["id"];
      }

      //If subscribed already, that means unsubscribe operation will be performed.
      if (subscribe) {
        let response = await MSGraphService.removeMember(
          groupID,
          this.userId,
          this.props.context
        );
        //if response was successfull.
        if (typeof response == "undefined") {
          this.setState({
            groups: await MSGraphService.mutateList(
              this.state.groups,
              groupID,
              false
            ),
          });
          this.setState({ messageBarType: "warning" });
          this.setState({ showMessageBar: true });
          this.setState({
            message: this.props.strings.UnsubscribedSuccessMsg + title,
          });
        } else {
          this.setState({ showMessageBar: true });
          this.setState({ messageBarType: "error" });
          this.setState({ message: this.props.strings.ErrorMessage1 });
        }
      }
      //If unsubscribed already, that means subscribe operation will be performed.
      else {
        let response = await MSGraphService.addMember(
          groupID,
          this.userId,
          this.props.context
        );
        if (typeof response == "undefined") {
          this.setState({
            groups: await MSGraphService.mutateList(
              this.state.groups,
              groupID,
              true
            ),
          });
          this.setState({ messageBarType: "success" });
          this.setState({ showMessageBar: true });
          this.setState({
            message: this.props.strings.SubscriptionSuccessMsg + title,
          });
        } else {
          this.setState({ showMessageBar: true });
          this.setState({ messageBarType: "error" });
          this.setState({ message: this.props.strings.ErrorMessage1 });
        }
      }
    } catch (error) {

      console.log("MySubscriptions._joinGroup_leaveGRoup: ", error);
    }
  }

  /**
   * Called on page load are the various functions
   *
   */
  public async componentDidMount() {
    try {
      //Get list configuration i.e the place where audiences are stored.
      let start1 = performance.now();
      let start, end;
      start = performance.now();
      end = performance.now();
      console.log(end - start + ": getUserBrowserLanguage");
      //Gets all group ids where i am member
      start = performance.now();
      this._mySubscribedItems = await MSGraphService.getGroupsIAmMemberOf(
        this.props.context
      );
      end = performance.now();
      console.log(end - start + ": getGroupsIAmMemberOf");
      //Get all audiences/groups
      start = performance.now();
      this._originalItems = await MSGraphService.getAllAudiences(
        this.props.siteurl,
        this.props.listname
      );
      end = performance.now();
      console.log(end - start + ": getAllAudiences");
      //get mysubscriptions i.e which audience I have subscribed to
      start = performance.now();
      this._originalItems = await MSGraphService.mySubscriptions(
        this._originalItems,
        this._mySubscribedItems
      );
      end = performance.now();
      console.log(end - start + ": mySubscriptions");
      this.setState({ isdataLoaded: true });
      this.setState({ groups: this._originalItems });
      let end1 = performance.now();
      console.log(end1 - start1, ":End");
    } catch (error) {

      console.log("MySubscriptions.componentDidMount Error: ", error);
    }
  }
}
