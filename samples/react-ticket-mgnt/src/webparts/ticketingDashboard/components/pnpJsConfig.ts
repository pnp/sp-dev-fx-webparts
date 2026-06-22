import { spfi } from "@pnp/sp";
import { SPFx } from "@pnp/sp/presets/all";
import { WebPartContext } from "@microsoft/sp-webpart-base";

let _sp: ReturnType<typeof spfi> | undefined = undefined;

export const getSP = (): ReturnType<typeof spfi> => {
    if (!_sp) throw new Error("SPFI not initialized. Call setupSP(context) first.");
    return _sp;
};

export const setupSP = (context: WebPartContext): void => {
    _sp = spfi().using(SPFx(context));
};
