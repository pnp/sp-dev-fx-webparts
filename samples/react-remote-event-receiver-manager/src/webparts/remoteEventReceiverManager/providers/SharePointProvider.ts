import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp } from "@pnp/sp/presets/all";
import { IEventReceiver } from "../models/IEventReceiver";
import { IList } from "../models/IList";
import { SPHttpClient, SPHttpClientConfiguration, SPHttpClientResponse, ODataVersion, ISPHttpClientConfiguration } from '@microsoft/sp-http';

export interface ISharePointProvider {
    getLists(): Promise<IList[]>;
    getEventReceivers(listID: string): Promise<IEventReceiver[]>;
    addEventReceiver(eventReceiver: IEventReceiver, listId: string): Promise<void>;
    deleteEventReceiver(eventReceiver: IEventReceiver, listId: string): Promise<void>;
}

export class SharePointProvider implements ISharePointProvider {
    private context: WebPartContext;

    constructor(context: WebPartContext) {
        this.context = context;
    }


    public async getLists(): Promise<IList[]> {
        try {
            return await sp.web.lists.get();
        } catch {
            alert("Faild to get lists!");
        }
    }

    public async getEventReceivers(listID: string): Promise<IEventReceiver[]> {
        try {
            let eventReceivers = await sp.web.lists.getById(listID).eventReceivers.get();
            //Remove all OData properties as these will cause issues when saving later!
            eventReceivers = eventReceivers.map(x => {
                delete x["odata.editLink"];
                delete x["odata.id"];
                delete x["odata.type"];
                return x;
            });
            return eventReceivers;
        } catch {
            alert("Failed to get event receivers!");
        }
    }

    public async addEventReceiver(eventReceiver: IEventReceiver, listId: string): Promise<void> {
        delete eventReceiver.ReceiverId;

        let url = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists(guid'${listId}')/EventReceivers`;
        try {
            let result = await this.context.spHttpClient.post(url, SPHttpClient.configurations.v1, { body: JSON.stringify(eventReceiver) });
        } catch {
            alert("Failed to add event receiver");
        }

    }
    public async deleteEventReceiver(eventReceiver: IEventReceiver, listId: string): Promise<void> {

        let header: HeadersInit = new Headers();
        header.append("IF-MATCH", "*");
        header.append("X-HTTP-Method", "DELETE");

        let url = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists(guid'${listId}')/EventReceivers/GetById(guid'${eventReceiver.ReceiverId}')`;
        try {
            let result = await this.context.spHttpClient.post(url, SPHttpClient.configurations.v1, { body: JSON.stringify(eventReceiver), headers: header });
        } catch {
            alert("Failed to delte event receiver");
        }
    }
}