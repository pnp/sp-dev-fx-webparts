/* eslint-disable @rushstack/no-new-null */
import { IAppDetails } from "../models/IAppDetails";
import { IListViewItem } from "../models/IListViewItem";

const getTemplateName = (templateId: number): string => {
  const templateMap: Record<number, string> = {
    100: "List",
    101: "Document Library",
    102: "Survey",
    103: "Links",
    104: "Announcements",
    105: "Contacts",
    106: "Calendar",
    107: "Tasks (2010)",
    108: "Discussion Board",
    109: "Picture Library",
    110: "Data Sources",
    115: "Form Library",
    117: "No Code Workflows",
    118: "Custom Workflow Process",
    119: "Wiki Page Library",
    120: "Custom List in Datasheet View",
    122: "No Code Public Workflows",
    130: "Data Connection Library",
    140: "Workflow History",
    150: "Project Tasks",
    170: "Promoted Links",
    171: "Tasks",
    175: "Maintenance Log Library Template",
    432: "Status List",
    433: "Report Library",
    544: "Persistent Storage List for MySite Published Feed",
    600: "External List",
    851: "Asset Library",
    1100: "Issue Tracking",
    1230: "Draft Apps",
    3100: "Access App",
    10102: "Converted Forms",
    [-1]: "App",
  };

  return templateMap[templateId] ?? "List";
};

export const generateListViewItems = (tiles: IAppDetails[]): IListViewItem[] => {
  const listViewItems: IListViewItem[] = [];
  tiles.forEach((tile) => {
    listViewItems.push({
      Name: tile.Title,
      Thumbnail: tile.Thumbnail,
      Type: getTemplateName(tile.BaseTemplate),
      Id: tile.AppId,
      Description: tile.Description,
      Modified: tile.LastModified,
      Target: tile.Target,
      Items: tile.ChildCount,
      BaseTemplate: tile.BaseTemplate,
      AppId: tile.AppId,
    });
  });
  return listViewItems;
};

export const getItemThumbnail = (url: string | undefined): string => {
  const defaultAppPath = "/images/spstorefrontappdefault";
  const defaultAppUrl = "https://res-1.cdn.office.net/files/sp-client/odsp-media-b0735558/images/sitehub/customapp.png";

  if (url?.includes(defaultAppPath)) {
    return defaultAppUrl;
  }

  return url?.replace(/(\/images\/)l/, "$1i") ?? "";
};

export const filterItems = (items: IListViewItem[], searchText: string | undefined | null): IListViewItem[] => {
  if (!searchText?.trim()) {
    return items; // return all if search is empty
  }

  // eslint-disable-next-line @rushstack/security/no-unsafe-regexp
  const regex = new RegExp(searchText, "i"); // case-insensitive regex

  return items.filter(
    (item) =>
      regex.test(item.Name) || regex.test(item.Type) || regex.test(item.Items?.toString() ?? "") || regex.test(item.Modified) || regex.test(item.Description)
  );
};
