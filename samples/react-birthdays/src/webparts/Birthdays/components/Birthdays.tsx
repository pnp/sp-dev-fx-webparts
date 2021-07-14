import * as React from 'react';
import styles from './Birthdays.module.scss';
import { IBirthdaysProps } from './IBirthdaysProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { HappyBirthday, IUser } from '../../../controls/happybirthday';
import * as moment from 'moment';
import { IBirthdayState } from './IBirthdaysState';
import SPService from '../../../services/SPService';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
const imgBackgroundBallons: string = require('../../../../assets/ballonsBackgroud.png');
import { Image, IImageProps, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Label } from 'office-ui-fabric-react/lib/Label';
import * as strings from 'ControlStrings';

export default class Birthdays extends React.Component<IBirthdaysProps, IBirthdayState> {
  private _users: IUser[] = [];
  private _spServices: SPService;
  constructor(props: IBirthdaysProps) {
    super(props);
    this._spServices = new SPService(this.props.context);
    this.state = {
      Users: [],
      showBirthdays: true
    };
  }

  public componentDidMount(): void {
    this.GetUsers();
  }

  public componentDidUpdate(prevProps: IBirthdaysProps, prevState: IBirthdayState): void {

  }
  // Render
  public render(): React.ReactElement<IBirthdaysProps> {
    let _center: any = !this.state.showBirthdays ? "center" : "";
    return (
      <div className={styles.happyBirthday}
        style={{ textAlign: _center }} >
        <div className={styles.container}>
          <WebPartTitle displayMode={this.props.displayMode}
            title={this.props.title}
            updateProperty={this.props.updateProperty} />
          {
            !this.state.showBirthdays ?
              <div className={styles.backgroundImgBallons}>
                <Image imageFit={ImageFit.cover}
                  src={imgBackgroundBallons}
                  width={150}
                  height={150}
                />
                <Label className={styles.subTitle}>{strings.MessageNoBirthdays}</Label>
              </div>
              :
              <HappyBirthday users={this.state.Users} imageTemplate={this.props.imageTemplate}
              />
          }
        </div>
      </div>
    );
  }

  // Sort Array of Birthdays
  private SortBirthdays(users: IUser[]) {
    return users.sort( (a, b) => {
      if (a.birthday > b.birthday) {
        return 1;
      }
      if (a.birthday < b.birthday) {
        return -1;
      }
      return 0;
    });
  }
  // Load List Of Users
  private async GetUsers() {
    let _otherMonthsBirthdays: IUser[], _dezemberBirthdays: IUser[];
    const listItems = await this._spServices.getPBirthdays(this.props.numberUpcomingDays);
    if (listItems && listItems.length > 0) {
      _otherMonthsBirthdays = [];
      _dezemberBirthdays = [];
      for (const item of listItems) {
        this._users.push({ key: item.fields.email, userName: item.fields.Title, message: item.fields.message,anniversary: item.fields.anniversary, userEmail: item.fields.email, jobDescription: item.fields.JobTitle, birthday: moment.utc(item.fields.Birthday).local().format() });
      }
      // Sort Items by Birthday MSGraph List Items API don't support ODATA orderBy
      // for end of year teste and sorting
      //  first select all bithdays of Dezember to sort this must be the first to show
      if (moment().format('MM') === '12') {
        _dezemberBirthdays = this._users.filter( (v) => {
          var _currentMonth = moment(v.birthday, ["MM-DD-YYYY", "YYYY-MM-DD", "DD/MM/YYYY", "MM/DD/YYYY"]).format('MM');
          return (_currentMonth === '12');
        });
        // Sort by birthday date in Dezember month
        _dezemberBirthdays = this.SortBirthdays(_dezemberBirthdays);
        // select birthdays != of month 12
        _otherMonthsBirthdays = this._users.filter((v) => {
          var _currentMonth = moment(v.birthday, ["MM-DD-YYYY", "YYYY-MM-DD", "DD/MM/YYYY", "MM/DD/YYYY"]).format('MM');
          return (_currentMonth !== '12');
        });
        // sort by birthday date
        _otherMonthsBirthdays = this.SortBirthdays(_otherMonthsBirthdays);
        // Join the 2 arrays
        this._users = _dezemberBirthdays.concat(_otherMonthsBirthdays);
      }
      else {
        this._users = this.SortBirthdays(this._users);
      }
    }

    //  this._users=[];
    this.setState(
      {
        Users: this._users,
        showBirthdays: this._users.length === 0 ? false : true
      });
  }
}
