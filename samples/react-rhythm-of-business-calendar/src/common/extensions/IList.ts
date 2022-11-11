import { extendFactory } from "@pnp/odata";
import { spGet, SharePointQueryable } from "@pnp/sp";
import { List, IList } from "@pnp/sp/lists";
import { ICurrentChangeTokenResult } from "common/sharepoint";

declare module "@pnp/sp/lists/types" {
    interface IList {
        currentChangeToken: (this: IList) => Promise<string>;
    }
}

extendFactory(List, {
    async currentChangeToken(this: IList): Promise<string> {
        const result = await spGet(SharePointQueryable(this, "CurrentChangeToken")) as ICurrentChangeTokenResult;
        return result.StringValue;
    },
});