export interface IFlaggedEmail {
    id: string;
    subject: string;
    bodyPreview: string;
    from: {
        emailAddress: {
            name: string;
            address: string;
        }
    };
    receivedDateTime: string;
    webLink: string;
}
