declare interface IControlStrings {
  BirdthayControlDefaultDay: string,
  HappyBirthdayMsg: string,
  NextBirthdayMsg: string,
  MessageNoBirthdays: string
}

declare module 'ControlStrings' {
  const strings: IControlStrings;
  export = strings;
}
