export interface IMessages {
  value: IMessage[];
}

export interface IMessage {
  bodyPreview: string;
  from: {
    emailAddress: {
      address: string;
      name: string;
    }
  };
  receivedDateTime: string;
  subject: string;
  webLink: string;
}