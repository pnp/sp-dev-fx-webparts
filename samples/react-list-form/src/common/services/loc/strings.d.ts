
declare interface IServicesStrings {
    ErrorWebAccessDenied: string;
    ErrorWebNotFound: string;
}

declare module 'servicesStrings' {
    const strings: IServicesStrings;
    export = strings;
}
