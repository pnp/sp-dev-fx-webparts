import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/clientside-pages/web";
import { IClientsidePage } from "@pnp/sp/clientside-pages";
import * as Constants from "./Constants";
import { FeedbackConfig } from "./Types";
import { getSP } from "../../../pnpjsConfig";
import FeedbackWebPart from "../FeedbackWebPart";

export const buildFeedbackConfigFromPage = async () => {
  let config: FeedbackConfig[] = [];
  let sp = getSP();

  const page: IClientsidePage = await sp.web.loadClientsidePage(
    FeedbackWebPart.pageUrl
  );

  page.findControl((c: any) => {
    config.push({
      title: c.title,
      position: c.order,
    });

    return false;
  });

  // remove duplicates
  config = config.filter(
    (value, index, self) =>
      index ===
      self.findIndex(
        (t) =>
          t.title &&
          t.title === value.title &&
          value.title !== Constants.WEBPART_NAME
      )
  );

  return config.sort((s) => s.position); //sort by webpart position
};
