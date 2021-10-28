export interface IApplications {
  value: IApplication[];
}

export interface IApplication {
  appId: string;
  displayName: string;
  passwordCredentials: IPasswordCredential[];
  keyCredentials: IKeyCredential[];
}

export interface IPasswordCredential {
  customKeyIdentifier: string;
  displayName: string;
  endDateTime: Date;
  hint: string;
  keyId: string;
  secretText: string;
  startDateTime: string;
}

export interface IKeyCredential {
  customKeyIdentifier: string;
  displayName: string;
  endDateTime: Date;
  key: string;
  keyId: string;
  startDateTime: string;
  type: string;
  usage: string;
}


export interface IFormattedApplication {
  applicationId: string;
  displayName: string;
  daysLeft: number;
  type: string;
  expirationDate: string;
}