import * as React from 'react';
import styles from './MyTimeline.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';

//Import all Interfaces
import { IMyTimelineProps, IMyTimelineState } from './IMyTimelineProps';

//import { Caching } from "@pnp/queryable";
import { getSP } from "../../../pnpJsConfig";
import { SPFI } from "@pnp/sp";
import { Logger, LogLevel } from "@pnp/logging";

import { IListModelResponse, IListModel } from "../../../interfaces/models";

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import StarIcon from '@material-ui/icons/Star';

import "../../myTimeline/timelineStyle.css";
import * as CSS from "csstype";
import { Computer, NoteRounded, SquareFootOutlined } from '@material-ui/icons';

var BackStyle: CSS.Properties<string | number> = {
  background: 'rgb(227, 227, 227)'
};

export default class MyTimeline extends React.Component<IMyTimelineProps, IMyTimelineState> {
  private LOG_SOURCE = "PNP_JS";
  private LIST_SOURCE = "TimelineList"
  private _sp: SPFI;


  constructor(props: IMyTimelineProps) {
    super(props);
    // set initial state
    this.state = {
      items: [],
      errors: []
    };
    this._sp = getSP();
  }

  public componentDidMount(): void {
    // read all items to Timeline
    this._readTimeline();
  }

  public render(): React.ReactElement<IMyTimelineProps> {

    try {
      styles
      const {
        description,
        isDarkTheme,
        environmentMessage,
        hasTeamsContext,
        userDisplayName
      } = this.props;

      return (
        <section className={`${styles.myTimeline} ${hasTeamsContext ? styles.teams : ''}`}>
          <div className={styles.welcome}>
            <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
            <h2>Well done, {escape(userDisplayName)}!</h2>
            <div>{environmentMessage}</div>
            <div>Web part property value: <strong>{escape(description)}</strong></div>
          </div>
          <div>
            <br /><br /><br />
            <div style={BackStyle}>
              <VerticalTimeline>
                <VerticalTimelineElement
                  iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                  icon={<StarIcon />}
                />

                {this.state.items.map((item, idx) => {
                  return (
                    <VerticalTimelineElement
                      key={idx}
                      className="vertical-timeline-element--work"
                      date={item.TimelineNodeTitle}
                      iconStyle={{ background: item.RgbColor, color: '#fff' }}
                      icon={item.ChoiceIcon === "Computer" ? <Computer /> : <NoteRounded />}
                    >
                      <h3 className="vertical-timeline-element-title">{item.CardTitle}</h3>
                      <h4 className="vertical-timeline-element-subtitle">{item.ChoiceArea}</h4>
                      <p>
                        {item.ShortText} <br /><br />
                        <a href={item.Link} target="_blank" rel="noreferrer">OPEN LINK</a>
                      </p>
                    </VerticalTimelineElement>
                  );
                })}

                <VerticalTimelineElement
                  iconStyle={{ background: 'rgb(204,0,0)', color: '#fff' }}
                  icon={<SquareFootOutlined />}
                />
              </VerticalTimeline>
            </div>
          </div>
        </section>
      );
    } catch (err) {
      Logger.write(`${this.LOG_SOURCE} (render) - ${JSON.stringify(err)} - `, LogLevel.Error);
    }
    return null;
  }

  private _readTimeline = async (): Promise<void> => {
    try {
      // do PnP JS query, some notes:
      //   - .expand() method will retrive Item.File item but only Length property
      //   - .get() always returns a promise
      //   - await resolves proimises making your code act syncronous, ergo Promise<IResponseItem[]> becomes IResponse[]

      //Extending our sp object to include caching behavior, this modification will add caching to the sp object itself
      //this._sp.using(Caching("session"));

      //Creating a new sp object to include caching behavior. This way our original object is unchanged.
      //const spCache = spfi(this._sp).using(Caching("session"));

      const response: IListModelResponse[] = await this._sp.web.lists
        .getByTitle(this.LIST_SOURCE)
        .items
        .select("Id", "Title", "MyCardTitle", "MyAreas", "MyShortText", "MyHyperlink", "MyIcon", "MyIconRgb")();

      // use map to convert IListModelResponse[] into our internal object IListModel[]
      const items: IListModel[] = response.map((item: IListModelResponse) => {
        return {
          Id: item.Id,
          TimelineNodeTitle: item.Title || "Unknown",
          CardTitle: item.MyCardTitle || "Unknown",
          ChoiceArea: item.MyAreas || "Unknown",
          ShortText: item.MyShortText || "Unknown",
          Link: item.MyHyperlink.Url || "Unknown",
          ChoiceIcon: item.MyIcon || "Unknown",
          RgbColor: item.MyIconRgb || "Unknown"
        };
      });

      // Add the items to the state
      this.setState({ items });
      console.log(items);
    } catch (err) {
      Logger.write(`${this.LOG_SOURCE} (_readTimeline) - ${JSON.stringify(err)} - `, LogLevel.Error);
    }
  }
}
