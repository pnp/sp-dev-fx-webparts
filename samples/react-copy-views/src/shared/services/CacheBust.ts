import { TimelinePipe } from "@pnp/core";
import { Queryable } from "@pnp/queryable";

export function CacheBust(): TimelinePipe<Queryable> {

    return (instance: Queryable) => {

        instance.on.pre(async (url, init, result) => {

            url += url.indexOf("?") > -1 ? "&" : "?";

            url += "nonce=" + encodeURIComponent(new Date().toISOString());

            return [url, init, result];
        });

        return instance;
    };
}