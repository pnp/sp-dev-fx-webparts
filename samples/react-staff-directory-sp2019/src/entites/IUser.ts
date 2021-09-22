export interface IUser {
    id?: string;
    displayName: string;
    firstName?:string;
    lastName?:string;
    mail?: string;
    jobTitle?: string;
    mobilePhone?: string;
    department?: string;
    businessPhones?: string[];
    userPrincipalName?: string;
    city?: string;
    companyName?: string;
    country?: string;
    employeeId?: string;
    imAddresses?: string[];
    officeLocation?: string;
    postalCode?: string;
    userType?: string;
    accuntName?:string,
}
