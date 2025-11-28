import { IWebInfo } from "@pnp/sp/webs";

export const webInfoSelectFields: (keyof IWebInfo)[] = [
  "Title",
  "Created",
  "Description",
  "Id",
  "LastItemModifiedDate",
  "NoCrawl",
  "ServerRelativeUrl",
  "Url",
  "WelcomePage",
  "WebTemplate",
];
