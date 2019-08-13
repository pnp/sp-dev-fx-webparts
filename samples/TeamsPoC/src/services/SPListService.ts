import { IClient, IMatter, INote, IBilledTime, IBill, IEmployee } from "../models";
import { IWebPartContext } from "@microsoft/sp-webpart-base";
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { MockHttpClient } from "./MockHttpClient";

export interface ISPListService {
    getClients(): Promise<IClient[]>;
    getMatters(): Promise<IMatter[]>;
    getNotes(matterId: number): Promise<INote[]>;
    getBilledTime(matterId: number): Promise<IBilledTime[]>;
    getEmployees(matterId: number): Promise<IEmployee[]>;
}

export class SPListService implements ISPListService {
    private context: IWebPartContext;

    constructor(context: IWebPartContext) {
        this.context = context;
    }

    public getClients(): Promise<IClient[]> {
        if (Environment.type === EnvironmentType.Local) {
            return this.getClientsFromMock();
        }
        const restUrl: string = `${ this.context.pageContext.web.serverRelativeUrl }/_api/web/lists/getbytitle('Clients')/items?$expand=Author,Editor` +
            `&$select=Id,Title,CliSysNbr,CliCode,CliNickName,Created,Modified,Author/LastName,Author/FirstName,Editor/LastName,Editor/FirstName`;
        return this.context.spHttpClient.get(restUrl, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json();
            })
            .then(json => {
                return json.value as IClient[];
            }) as Promise<IClient[]>;
    }

    public getMatters(): Promise<IMatter[]> {
        if (Environment.type === EnvironmentType.Local) {
            return this.getMattersFromMock();
        }
        const restUrl: string = `${ this.context.pageContext.web.serverRelativeUrl }/_api/web/lists/getbytitle('Matters')/items?$expand=Author,Editor` + 
            `&$select=Id,Title,MatSysNbr,MatCliNbr,MatBillTo,MatCode,MatDescription,Created,Modified,Author/LastName,Author/FirstName,Editor/LastName,Editor/FirstName`;
        return this.context.spHttpClient.get(restUrl, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json();
            })
            .then(json => {
                return json.value as IMatter[];
            }) as Promise<IMatter[]>;
    }

    public getNotes(matterId: number): Promise<INote[]> {
        if (Environment.type === EnvironmentType.Local) {
            return this.getNotesFromMock(matterId);
        }
        const restUrl: string = `${ this.context.pageContext.web.serverRelativeUrl }/_api/web/lists/getbytitle('Matter Notes')/items?$expand=Author,Editor` +
            `&$select=Id,Title,MNMatter,MNNoteText,Created,Modified,Author/LastName,Author/FirstName,Editor/LastName,Editor/FirstName` +
            `&$filter=MNMatter eq ${ matterId }`;
        return this.context.spHttpClient.get(restUrl, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json();
            })
            .then(json => {
                return json.value as INote[];
            }) as Promise<INote[]>;
    }
  
    public getBilledTime(matterId: number): Promise<IBilledTime[]> {
        if (Environment.type === EnvironmentType.Local) {
            return this.getBilledTimeFromMock(matterId);
        }
        const restUrl: string = `${ this.context.pageContext.web.serverRelativeUrl }/_api/web/lists/getbytitle('Billed Time')/items?$expand=Author,Editor` +
            `&$select=Id,Title,MNMatter,BTBillNbr,BTMatter,BTActualHrsWrk,BTDate,BTTkprName,Created,Modified,Author/LastName,Author/FirstName,Editor/LastName,Editor/FirstName` +
            `&$filter=BTMatter eq ${ matterId }`;
        return this.context.spHttpClient.get(restUrl, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json();
            })
            .then(json => {
                return json.value as IBilledTime[];
            }) as Promise<IBilledTime[]>;
    }

    public getAllBills(matterId: number): Promise<IBill[]> {
        if (Environment.type === EnvironmentType.Local) {
            return this.getBilledTimeFromMock(matterId);
        }
        const restUrl: string = `${ this.context.pageContext.web.serverRelativeUrl }/_api/web/lists/getbytitle('All Bills')/items?$expand=Author,Editor` +
            `&$select=Id,Title,CliCode,BTDate,BillType,BillNbr,BillAmt,BillBalance,MatBillTo,Created,Modified,Author/LastName,Author/FirstName,Editor/LastName,Editor/FirstName` +
            `&$filter=MatBillTo eq ${ matterId }`;
        return this.context.spHttpClient.get(restUrl, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json();
            })
            .then(json => {
                return json.value as IBill[];
            }) as Promise<IBill[]>;
    }

    public getEmployees(matterId: number): Promise<IEmployee[]> {
        if (Environment.type === EnvironmentType.Local) {
            return this.getBilledTimeFromMock(matterId);
        }
        const restUrl: string = `${ this.context.pageContext.web.serverRelativeUrl }/_api/web/lists/getbytitle('Employees')/items?$expand=Author,Editor` +
            `&$select=Id,Title,MatBillTo,Created,Modified,Author/LastName,Author/FirstName,Editor/LastName,Editor/FirstName` +
            `&$filter=MatBillTo eq ${ matterId }`;
        return this.context.spHttpClient.get(restUrl, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json();
            })
            .then(json => {
                return json.value as IEmployee[];
            }) as Promise<IEmployee[]>;
    }

    private getClientsFromMock(): Promise<IClient[]> {
        return MockHttpClient.getClientsFromMock()
            .then((data: IClient[]) => {
                return data;
        }) as Promise<IClient[]>;
    }
    private getMattersFromMock(): Promise<IMatter[]> {
        return MockHttpClient.getMattersFromMock()
            .then((data: IMatter[]) => {
                return data;
        }) as Promise<IMatter[]>;
    }
    private getNotesFromMock(matterId: number): Promise<IMatter[]> {
        return MockHttpClient.getNotesFromMock(matterId)
            .then((data: IMatter[]) => {
                return data;
        }) as Promise<IMatter[]>;
    }
    private getBilledTimeFromMock(matterId: number): Promise<IBilledTime[]> {
        return MockHttpClient.getBilledTimeFromMock(matterId)
            .then((data: IBilledTime[]) => {
                return data;
        }) as Promise<IBilledTime[]>;
    }

}