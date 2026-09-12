import { IAppDetails, ISiteContentItem } from '../types/ISiteContent';

/** SharePoint list base-template id → friendly name. */
const TEMPLATE_MAP: Record<number, string> = {
  100: 'List',
  101: 'Document Library',
  102: 'Survey',
  103: 'Links',
  104: 'Announcements',
  105: 'Contacts',
  106: 'Calendar',
  107: 'Tasks (2010)',
  108: 'Discussion Board',
  109: 'Picture Library',
  110: 'Data Sources',
  115: 'Form Library',
  117: 'No Code Workflows',
  118: 'Custom Workflow Process',
  119: 'Wiki Page Library',
  120: 'Custom List in Datasheet View',
  122: 'No Code Public Workflows',
  130: 'Data Connection Library',
  140: 'Workflow History',
  150: 'Project Tasks',
  170: 'Promoted Links',
  171: 'Tasks',
  175: 'Maintenance Log Library Template',
  432: 'Status List',
  433: 'Report Library',
  544: 'Persistent Storage List for MySite Published Feed',
  600: 'External List',
  851: 'Asset Library',
  1100: 'Issue Tracking',
  1230: 'Draft Apps',
  3100: 'Access App',
  10102: 'Converted Forms',
  [-1]: 'App'
};

export function getTemplateName(templateId: number): string {
  return TEMPLATE_MAP[templateId] ?? 'List';
}

/** Resolve a usable thumbnail URL, substituting the SP default-app image. */
export function getItemThumbnail(url: string | undefined): string {
  const defaultAppPath = '/images/spstorefrontappdefault';
  const defaultAppUrl =
    'https://res-1.cdn.office.net/files/sp-client/odsp-media-b0735558/images/sitehub/customapp.png';

  if (url && url.indexOf(defaultAppPath) !== -1) {
    return defaultAppUrl;
  }
  return url ? url.replace(/(\/images\/)l/, '$1i') : '';
}

/** Map raw app tiles to normalized site-content items. */
export function mapTilesToItems(tiles: IAppDetails[]): ISiteContentItem[] {
  return tiles.map((tile) => ({
    id: tile.AppId,
    name: tile.Title,
    type: getTemplateName(tile.BaseTemplate),
    items: tile.ChildCount,
    modified: tile.LastModified,
    modifiedDate: tile.LastModifiedDate,
    description: tile.Description,
    thumbnail: tile.Thumbnail,
    target: tile.Target,
    baseTemplate: tile.BaseTemplate,
    appId: tile.AppId
  }));
}
