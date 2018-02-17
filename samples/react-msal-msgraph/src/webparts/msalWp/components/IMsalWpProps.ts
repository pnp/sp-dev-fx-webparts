import { IWebPartContext } from "@microsoft/sp-webpart-base";

export interface IMsalWpProps {
  description: string;
  context: IWebPartContext;
}

export interface IMsalWpState {
    loading?: boolean;
    loggedIn?: boolean;
    person?: IPerson;
    mails?: IMail[];
}

export interface IPerson {
    id: string;
    businessPhones?: any[];
    displayName?: string;
    givenName?: string;
    jobTitle?: string;
    mail?: string;
    mobilePhone?: any;
    officeLocation?: any;
    preferredLanguage?: string;
    surname?: string;
    userPrincipalName?: string;
}

export interface IMails {
    value: IMail[];
}

export interface IMail {
    subject: string;
}
