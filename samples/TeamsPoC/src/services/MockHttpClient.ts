import { IClient, IMatter, INote, IBilledTime } from "../models";

export class MockHttpClient {
    public static getClientsFromMock(): Promise<IClient[]> {
        return new Promise<IClient[]>((resolve) => {
            resolve(MockHttpClient._clients);
        });
    }
    public static getMattersFromMock(): Promise<IMatter[]> {
        return new Promise<IMatter[]>((resolve) => {
            resolve(MockHttpClient._matters);
        });
    }
    public static getNotesFromMock(matterId: number): Promise<INote[]> {
        return new Promise<INote[]>((resolve) => {
            resolve(MockHttpClient._notes);
        });
    }
    public static getBilledTimeFromMock(matterId: number): Promise<IBilledTime[]> {
        return new Promise<IBilledTime[]>((resolve) => {
            resolve(MockHttpClient._billedTime);
        });
    }

    private static _billedTime = [];
    private static _notes = [];

    private static _matters = [];

    private static _clients = [
        {
            "@odata.type": "#SP.Data.ClientsItem",
            "@odata.id": "76b68ae1-e6ab-4131-a54b-54444a9669db",
            "@odata.etag": "\"1\"",
            "@odata.editLink": "Web/Lists(guid'db2389f9-e375-4987-accc-923938bb82e4')/Items(1)",
            "Id": 1,
            "Title": "Client 1",
            "ID": 1,
            "Created": "2017-01-30T17:25:45Z",
            "Modified": "2017-02-01T18:14:28Z",
            "Author@odata.navigationLink": "Web/Lists(guid'db2389f9-e375-4987-accc-923938bb82e4')/Items(1)/Author",
            "Author": {
                "@odata.type": "#SP.Data.UserInfoItem",
                "@odata.id": "f5eddca7-8ac8-4712-b031-db4eb3142874",
                "LastName": "McDermott",
                "FirstName": "Matthew"
            },
            "Editor@odata.navigationLink": "Web/Lists(guid'db2389f9-e375-4987-accc-923938bb82e4')/Items(1)/Editor",
            "Editor": {
                "@odata.type": "#SP.Data.UserInfoItem",
                "@odata.id": "3e3eaad7-cc79-4882-8df8-12f4ff5fd00c",
                "LastName": "Last",
                "FirstName": "First"
            }
        },
        {
            "@odata.type": "#SP.Data.ClientsItem",
            "@odata.id": "76b68ae1-e6ab-4131-a54b-54444a9669db",
            "@odata.etag": "\"1\"",
            "@odata.editLink": "Web/Lists(guid'db2389f9-e375-4987-accc-923938bb82e4')/Items(2)",
            "Id": 2,
            "Title": "Client 2",
            "ID": 2,
            "Created": "2017-01-30T17:25:45Z",
            "Modified": "2017-02-01T18:14:28Z",
            "Author@odata.navigationLink": "Web/Lists(guid'db2389f9-e375-4987-accc-923938bb82e4')/Items(2)/Author",
            "Author": {
                "@odata.type": "#SP.Data.UserInfoItem",
                "@odata.id": "f5eddca7-8ac8-4712-b031-db4eb3142874",
                "LastName": "McDermott",
                "FirstName": "Matthew"
            },
            "Editor@odata.navigationLink": "Web/Lists(guid'db2389f9-e375-4987-accc-923938bb82e4')/Items(2)/Editor",
            "Editor": {
                "@odata.type": "#SP.Data.UserInfoItem",
                "@odata.id": "3e3eaad7-cc79-4882-8df8-12f4ff5fd00c",
                "LastName": "Last",
                "FirstName": "First"
            }
        }
    ];
}