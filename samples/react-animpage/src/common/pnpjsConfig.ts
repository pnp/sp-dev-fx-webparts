import {spfi, SPFI, SPFx} from "@pnp/sp";
import {WebPartContext} from "@microsoft/sp-webpart-base";

export function getSP(context:WebPartContext):SPFI{
    return spfi().using(SPFx(context));
}