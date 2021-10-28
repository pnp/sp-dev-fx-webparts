export interface ICalendarEvent {
    subject: string;
    start: {
        dateTime: string | undefined,
    };
    end: {
        dateTime: string | undefined,
    };
    createdDateTime: string | undefined;
    webLink: string | undefined;
    allDay: boolean;
    categories: string | undefined;
    organizer: {
        emailAddress: {
            name: string | undefined,
            address: string | undefined
        }
    };
    onlineMeeting: {
        joinUrl: string | undefined;

    };
    description: string | undefined;
    location: {
        address: {}
        coordinates: {}
        displayName: string | undefined;
        locationType: string | undefined;
        uniqueIdType: string | undefined;
    };
    eventLocation: string | undefined;
}
