declare interface IControlStrings {
  BirthdayControlDefaultDay: string,
  HappyBirthdayMsg: string,
  NextBirthdayMsg: string,
  HappyAnniversaryMsg: string,
  NextAnniversaryMsg: string,
  MessageNoBirthdays: string
}

declare module 'ControlStrings' {
  const strings: IControlStrings;
  export = strings;
}
