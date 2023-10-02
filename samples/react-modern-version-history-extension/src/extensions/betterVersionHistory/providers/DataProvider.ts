import { ListViewCommandSetContext } from "@microsoft/sp-listview-extensibility";
import { SPHttpClient } from "@microsoft/sp-http";
import { SPFx, SPFI, spfi, IFileInfo } from "@pnp/sp/presets/all";
import { IField } from "../models/IField";
import { IVersion } from "../models/IVersion";
import { GetChanges } from "../models/FieldValues";
import { IVersionsFilter } from "../models/IVersionsFilter";

export interface IDataProvider {
    GetVersions(filters: IVersionsFilter): Promise<IVersion[]>
    GetFileVersionMetadata(fileRef: string, versionId: number): Promise<IFileInfo>;
    GetFileInfo(): Promise<IFileInfo>;
    RestoreVersion(versionId: IVersion): Promise<void>;
    DeleteVersion(versionId: number): Promise<void>;
}

export class DataProvider implements IDataProvider {
    private _context: ListViewCommandSetContext = null;
    private _SPFI: SPFI = null;

    constructor(context: ListViewCommandSetContext) {
        this._context = context;
    }

    private getSPFI(): SPFI {
        if (this._SPFI === null)
            this._SPFI = spfi().using(SPFx(this._context));
        return this._SPFI;
    }

    private fieldsToSkip: string[] = ["Modified", "Created"];
    public async GetVersions(filters: IVersionsFilter): Promise<IVersion[]> {
        const fields = await this.GetFields(this._context.pageContext.list.id.toString());

        const filterQueries: string[] = [];

        if (filters.StartDate !== undefined)
            filterQueries.push(`Created ge datetime'${filters.StartDate.toISOString()}'`);

        if (filters.EndDate !== undefined)
            filterQueries.push(`Created le datetime'${filters.EndDate.toISOString()}'`);

        if (filters.VersionNumbers !== undefined && filters.VersionNumbers.length > 0)
            filterQueries.push(`(${filters.VersionNumbers.map(v => `VersionId eq ${v}`).join(" or ")})`);

        const endpoint = this.getSPFI().web.lists.getById(this._context.pageContext.list.id.toString()).items.getById(this._context.listView.selectedRows[0].getValueByName("ID")).versions;
        if (filterQueries.length > 0)
            endpoint.filter(filterQueries.join(" and "));

        const versions = await endpoint();
        const Changes: IVersion[] = [];

        for (let i = versions.length; i > 0; i--) {
            const version = versions[i - 1];
            const prevVersion = versions[i] ?? {};

            const FileLink = new URL(`${this._context.pageContext.web.absoluteUrl}/_layouts/15/versions.appx`);
            FileLink.searchParams.append("FileName", version.FileRef);
            FileLink.searchParams.append("list", this._context.pageContext.list.id.toString());
            FileLink.searchParams.append("ID", this._context.listView.selectedRows[0].getValueByName("ID"));
            FileLink.searchParams.append("col", "Number");
            //Todo: Add support
            // FileLink.searchParams.append("op", "Delete");
            // FileLink.searchParams.append("op", "Restore");
            FileLink.searchParams.append("ver", version.VersionId);
            FileLink.searchParams.append("IsDlg", "1");

            console.log(version.VersionLabel);
            console.log(FileLink.toString());

            // const fileVersionMetadata = (version.FSObjType && !version.IsCurrentVersion) ? await this.GetFileVersionMetadata(version.FileRef, version.VersionLabel) : undefined;
            const Version: IVersion = {
                VersionName: version.VersionLabel,
                Author: version.Editor,
                TimeStamp: new Date(`${version.Created}z`),
                Changes: [],
                VersionId: version.VersionId,
                // VersionLink: `${this._context.pageContext.list.serverRelativeUrl}/DispForm.aspx?ID=${this._context.listView.selectedRows[0].getValueByName("ID")}&VersionNo=${version.VersionId}`,
                VersionLink: version.ContentTypeId.StringValue.indexOf("0x0100") > -1 ? `${this._context.pageContext.list.serverRelativeUrl}/DispForm.aspx?ID=${this._context.listView.selectedRows[0].getValueByName("ID")}&VersionNo=${version.VersionId}` : encodeURI(`${this._context.pageContext.site.absoluteUrl}` + (version.IsCurrentVersion ? version.FileRef : `/_vti_history/${version.VersionId}${version.FileRef}`)),
                FileRef: version.FileRef,
                FileName: version.FileLeafRef,
                FileSize: version.SMTotalFileStreamSize,
                Moderation: {
                    ModerationStatus: (version.OData__x005f_ModerationStatus >= 0 ? version.OData__x005f_ModerationStatus : undefined),
                    ModerationComments: (version.OData__x005f_ModerationStatus >= 0 ? version.OData__x005f_ModerationComments : ''),
                }
            };

            for (const field of fields) {
                if (this.fieldsToSkip.indexOf(field.StaticName) !== -1)
                    continue;

                const change = GetChanges(field, version, prevVersion);
                if (change !== undefined)
                    Version.Changes.push(change);
            }

            Changes.push(Version);
        }

        Changes.reverse();

        return Changes;
    }

    public async GetFileInfo(): Promise<IFileInfo> {
        const item = this.getSPFI().web.lists.getById(this._context.pageContext.list.id.toString()).items.getById(this._context.listView.selectedRows[0].getValueByName("ID"));
        return await item.file();
    }

    private async GetFields(listId: string): Promise<IField[]> {
        return this.getSPFI().web.lists.getById(listId).fields.filter("Hidden eq false")();
    }

    public async GetFileVersionMetadata(fileRef: string, versionId: number): Promise<IFileInfo> {
        const result = (await this.getSPFI().web.getFileByServerRelativePath(fileRef).versions())
            .filter(v => v.ID === versionId)[0];
        return result;
    }

    public async DeleteVersion(versionId: number): Promise<void> {
        const item = this.getSPFI().web.lists.getById(this._context.pageContext.list.id.toString()).items.getById(this._context.listView.selectedRows[0].getValueByName("ID"));
        await item.versions.getById(versionId).delete();
    }

    public async RestoreVersion(version: IVersion): Promise<void> {
        const FileLink = new URL(`${this._context.pageContext.web.absoluteUrl}/_layouts/15/versions.aspx`);
        FileLink.searchParams.append("FileName", version.FileRef);
        FileLink.searchParams.append("list", `{${this._context.pageContext.list.id.toString().toUpperCase()}}`);
        FileLink.searchParams.append("ID", this._context.listView.selectedRows[0].getValueByName("ID"));
        FileLink.searchParams.append("col", "Number");
        FileLink.searchParams.append("order", "d");
        FileLink.searchParams.append("op", "Restore");
        FileLink.searchParams.append("ver", version.VersionId + "");
        FileLink.searchParams.append("IsDlg", "1");

        await this._context.spHttpClient.post(FileLink.toString(), SPHttpClient.configurations.v1, {});

    }
}