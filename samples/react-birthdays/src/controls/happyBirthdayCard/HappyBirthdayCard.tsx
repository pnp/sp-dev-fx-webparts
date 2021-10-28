import * as React from 'react';
import styles from './HappyBirthdayCard.module.scss';
import { IHappyBirthdayCardProps } from './IHappyBirthdayCardProps';
import { IHappyBirthdayCardPState } from './IHappyBirthdayCardState';
import { escape } from '@microsoft/sp-lodash-subset';
import { IPersonaSharedProps, Persona, PersonaSize, IPersonaProps, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import { Image, IImageProps, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Label } from 'office-ui-fabric-react/lib/Label';
import * as strings from 'ControlStrings';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import * as moment from 'moment';
import {
  DocumentCardActions,
} from 'office-ui-fabric-react/lib/DocumentCard';
const img: string = require('../../../assets/cof11.png');

const IMG_WIDTH: number = 200;
const IMG_HEIGTH: number = 190;

const imageTemplate: { imageUrl: string }[] = [{
  imageUrl: require('.../../../assets/cof.png')
},
{
  imageUrl: require('.../../../assets/cof5.png')
},
{
  imageUrl: require('.../../../assets/cof1.png')
},
{
  imageUrl: require('.../../../assets/cof3.png')
},
{
  imageUrl: require('.../../../assets/cof8.png')
},
{
  imageUrl: require('.../../../assets/baloons.png')
},
{
  imageUrl: require('.../../../assets/cof2.png')
},
{
  imageUrl: require('.../../../assets/cof10.png')
},
{
  imageUrl: require('.../../../assets/cof11.png')
},
{
  imageUrl: require('.../../../assets/cof12.png')
},
{
  imageUrl: require('.../../../assets/cof14.png')
},
{
  imageUrl: require('.../../../assets/cof14_1.png')
},
{
  imageUrl: require('.../../../assets/cof18.png')
},
{
  imageUrl: require('.../../../assets/cof17.png')
},
{
  imageUrl: require('.../../../assets/cof19.png')
},
{
  imageUrl: require('.../../../assets/cof20.png')
},
{
  imageUrl: require('.../../../assets/cof22.png')
},
{
  imageUrl: require('.../../../assets/cof24.png')
},
{
  imageUrl: require('.../../../assets/cof28.png')
},
{
  imageUrl: require('.../../../assets/cof29.png')
},
{
  imageUrl: require('.../../../assets/cof30.png')
}
];


export class HappyBirthdayCard extends React.Component<IHappyBirthdayCardProps, IHappyBirthdayCardPState> {
  private _Persona: IPersonaSharedProps;
  private _birthdayMsg: string = '';

  constructor(props: IHappyBirthdayCardProps) {
    super(props);
    const photo: string = `/_layouts/15/userphoto.aspx?size=L&username=${this.props.userEmail}`;
    console.log(photo);
    this._Persona = {
      imageUrl: photo ? photo : '',
      imageInitials: this._getInitial(this.props.userName),
      text: this.props.userName,
      secondaryText: this.props.jobDescription,
      tertiaryText: this.props.birthday,
    };

    this.state = {
      isBirthdayToday: this._birthdayIsToday(this.props.birthday)
    };

    this._onRenderTertiaryText = this._onRenderTertiaryText.bind(this);
    this._getInitial = this._getInitial.bind(this);
    this._birthdayIsToday = this._birthdayIsToday.bind(this);
  }
  // Render
  public render(): React.ReactElement<IHappyBirthdayCardProps> {
    
    this._birthdayMsg = this.state.isBirthdayToday ? (this.props.anniversary? strings.HappyAnniversaryMsg: strings.HappyBirthdayMsg) : (this.props.anniversary? strings.NextAnniversaryMsg: strings.NextBirthdayMsg);
    return (
      <div className={styles.happyBirdthay}>
        <div className={styles.documentCardWrapper}>
          <div className={styles.documentCard}>
            <Image

              imageFit={ImageFit.cover}
              src={imageTemplate[this.props.imageTemplate].imageUrl}
              width={IMG_WIDTH}
              height={IMG_HEIGTH}
            />
            <Label className={styles.centered} >{this._birthdayMsg}</Label>
            {
              this.state.isBirthdayToday ?
                <Label className={styles.displayBirthdayToday}>{this.props.birthday}</Label>
                :
                <Label className={styles.displayBirthday}>{this.props.birthday}</Label>
            }

            <div className={styles.personaContainer}>
              <Persona
                {...this._Persona}
                size={PersonaSize.regular}
                className={styles.persona}
                onRenderTertiaryText={this._onRenderTertiaryText}
              />
            </div>
            <div className={styles.actions}>
              <DocumentCardActions
                actions={[
                  {
                    iconProps: { iconName: 'Mail' },
                    onClick: (ev: any) => {
                      ev.preventDefault();
                      ev.stopPropagation();
                      window.location.href = `mailto:${this.props.userEmail}?subject=${this._birthdayMsg}!`;
                    },
                    ariaLabel: 'email'
                  }
                ]}
              />
              {
                this.state.isBirthdayToday ?
                  <Icon iconName="BirthdayCake" className={styles.birthdaycake} />
                  :
                  ''
              }
            </div>
          </div>
        </div>
      </div>
    );
  }


  // Today is Birthday ?
  private _birthdayIsToday(birthday: string): boolean {
    const _todayDay = moment().date();
    const _todayMonth = moment().month() + 1;
    const _birthdayDay = moment(birthday, 'Do MMM').date();
    const _birthdayMonth = moment(birthday, 'Do MMM').month() + 1;

    const _retvalue = (_todayDay === _birthdayDay && _todayMonth === _birthdayMonth) ? true : false;

    return _retvalue;
  }
  // Get Initials
  private _getInitial(userName: string): string {
    const _arr = userName.split(' ');
    const _initial = _arr[0].charAt(0).toUpperCase() + (_arr[1] ? _arr[1].charAt(0).toLocaleUpperCase() : "");
    return _initial;
  }
  // Render tertiary text
  private _onRenderTertiaryText = (props: IPersonaProps): JSX.Element => {
    return (
      <div>
        <span className='ms-fontWeight-semibold' style={{ color: '#71afe5' }}>
          {props.tertiaryText}</span>
      </div>
    );
  }
}
export default HappyBirthdayCard;
