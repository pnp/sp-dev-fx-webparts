import * as React from "react";
import styles from "./WorldClockWebPart.module.scss";
import {
  IWorldClockWebPartProps,
  ILocation,
  IWorldClockWebPartState,
} from "./IWorldClockWebPartProps";
import { escape } from "@microsoft/sp-lodash-subset";
import AnalogClock, { Themes } from "react-analog-clock";
import Clock from "react-live-clock";
import moment from "moment";
import { SPComponentLoader } from "@microsoft/sp-loader";

import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";

import { memoizeFunction } from "office-ui-fabric-react";

export default class WorldClockWebPart extends React.Component<
  IWorldClockWebPartProps,
  IWorldClockWebPartState
> {
  private clocks = [];
  private TitleText: string = "";
  constructor(props: IWorldClockWebPartProps, state: IWorldClockWebPartState) {
    super(props);
    this.state = { clocks: [] };
  }
  public componentDidMount() {
    const dayTheme = {
      background: "#ededed",
      border: "#222222",
      center: "#222222",
      seconds: "transparent",
      minutes: "#000",
      hour: "#000",
      tick: "#000",
      smallTickWidth: 1,
      largeTickWidth: 1,
      secondHandWidth: 1,
      minuteHandWidth: 1,
      hourHandWidth: 1,
    };
    const eveningTheme = {
      background: "#A9A9A9",
      border: "#868181",
      center: "#DCDCDC",
      seconds: "transparent",
      minutes: "#000000",
      hour: "#000000",
      tick: "#000000",
      smallTickWidth: 1,
      largeTickWidth: 1,
      secondHandWidth: 1,
      minuteHandWidth: 1,
      hourHandWidth: 1,
    };
    const nightTheme = {
      background: "#2e2e2e",
      border: "#868181",
      center: "#acabab",
      seconds: "transparent",
      minutes: "#acabab",
      hour: "#acabab",
      tick: "#acabab",
      smallTickWidth: 1,
      largeTickWidth: 1,
      secondHandWidth: 1,
      minuteHandWidth: 1,
      hourHandWidth: 1,
    };
    const WIDTH = 100;

    this.props.loadLocations().then((options) => {
      console.log(options);
      for (let i = 0; i < options.length; i++) {
        let myDate: any = new Date().setHours(
          new Date().getHours() +
            new Date().getTimezoneOffset() / 60 +
            Number(options[i].GMTValues)
        );

        let TimeofDay = moment(myDate).format("hh:mm A");
        let selectedTheme = null;
        var time = new Date(myDate).getHours();
        {
          let timeOfDayMessage: string = "";
          if (time > 4 && time < 18) {
            timeOfDayMessage = "is having a great day Today.";
            selectedTheme = dayTheme;
          } else if (time >= 18 && time < 21) {
            timeOfDayMessage = "is having a great evening right Now.";
            selectedTheme = eveningTheme;
          } else {
            timeOfDayMessage = "is all Good Night right now!";
            selectedTheme = nightTheme;
          }
          this.clocks.push(
            <span
              className={styles.Clock}
              title={
                "Current Time in " +
                options[i].Title +
                " (GMT" +
                options[i].GMTValues +
                ") is " +
                TimeofDay +
                " and it " +
                timeOfDayMessage
              }
            >
              <AnalogClock
                //theme={time > 6 && time < 18 ? dayTheme : nightTheme}
                theme={selectedTheme}
                gmtOffset={options[i].GMTValues}
                showSmallTicks={false}
                width={WIDTH}
                interval={1}
              />
              {this.props.ShowTime ? (
                <p
                  className={styles.ClockTitle}
                  title={
                    "Current Time in " +
                    options[i].Title +
                    " (GMT" +
                    options[i].GMTValues +
                    ") is " +
                    TimeofDay
                  }
                >
                  <Clock
                    date={myDate}
                    format={"hh:mm:ss"}
                    interval={1000}
                    ticking={true}
                  />
                </p>
              ) : (
                <div />
              )}
              <p className={styles.ClockTitle}>{options[i].Title}</p>
            </span>
          );
        }
      }
      this.setState({ clocks: this.clocks });
    });
  }
  public render(): React.ReactElement<IWorldClockWebPartProps> {
    const WIDTH = 250;
    const showTitle: boolean = this.props.showTitle;
    const listSelected: boolean =
      typeof this.props.selectedList !== "undefined" &&
      this.props.selectedList.length > 0;

    return (
      <div className={styles.worldClockWebPart}>
        {!listSelected && (
          <Placeholder
            iconName="Clock"
            iconText="Configure your web part"
            description="Select the already imported Clocks list and choose other settings."
            buttonLabel="Choose a List"
            onConfigure={this.props.onConfigure}
          />
        )}
        {showTitle && (
          <WebPartTitle
            title={this.props.description}
            displayMode={this.props.displayMode}
            updateProperty={this.props.updateProperty}
          />
        )}
        <div className={styles.container}>{this.clocks}</div>
      </div>
    );
  }
}
