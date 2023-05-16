import { BaseComponentContext } from "@microsoft/sp-component-base"
import { SaveObject } from "../Models/SaveObject";
import { SPFI, SPFx, spfi } from '@pnp/sp/presets/all'

export interface IDataProvider {
    SaveSubmission: (Submission: SaveObject) => Promise<string>;
    GetSubmission: (ServerRelativeUrl: string) => Promise<SaveObject>;
}

export class SharePointProvider implements IDataProvider {
    private SP: SPFI;
    private LIST_ID: string;

    constructor(context: BaseComponentContext, ListID: string) {
        this.SP = spfi().using(SPFx(context));
        this.LIST_ID = ListID;
    }

    public async SaveSubmission(Submission: SaveObject): Promise<string> {
        const item = await this.SP.web.lists.getById(this.LIST_ID).rootFolder.files.addUsingPath(`${new Date().getTime()}.json`, JSON.stringify(Submission, null, 2))
        return item.data.ServerRelativeUrl;
    }

    public async GetSubmission(ServerRelativeUrl: string): Promise<SaveObject> {
        const form = await this.SP.web.getFileByServerRelativePath(ServerRelativeUrl).getText();
        return JSON.parse(form);
    }


}