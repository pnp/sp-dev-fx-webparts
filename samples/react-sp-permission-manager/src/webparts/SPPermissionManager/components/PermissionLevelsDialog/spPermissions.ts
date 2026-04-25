/**
 * Full list of SharePoint site-collection permissions that can be toggled in a
 * custom permission level editor. Matches what SharePoint Online shows OOB.
 *
 * All standard SP permissions fit within the Low 32-bit word of BasePermissions
 * (bit positions 0-30). A small number of additional permissions live in the
 * High 32-bit word.
 */
export interface ISPPermissionDef {
  key: string;
  label: string;
  description: string;
  category: 'List' | 'Site' | 'Personal';
  /** Bit mask in the Low 32-bit value (0 if this perm is in High) */
  lowBit: number;
  /** Bit mask in the High 32-bit value (0 if this perm is in Low) */
  highBit: number;
}

export const SP_PERMISSIONS: ISPPermissionDef[] = [
  // ── List Permissions ──────────────────────────────────────────────────────
  {
    key: 'ManageLists',
    label: 'Manage Lists',
    description: 'Create and edit lists, document libraries, and surveys.',
    category: 'List',
    lowBit: 2048,
    highBit: 0
  },
  {
    key: 'CancelCheckout',
    label: 'Override Check Out',
    description: 'Discard or check in a document which is checked out to another user.',
    category: 'List',
    lowBit: 256,
    highBit: 0
  },
  {
    key: 'AddListItems',
    label: 'Add Items',
    description: 'Add items to lists and add documents to document libraries.',
    category: 'List',
    lowBit: 2,
    highBit: 0
  },
  {
    key: 'EditListItems',
    label: 'Edit Items',
    description: 'Edit items in lists, edit documents in document libraries, and customise Web Part Pages in document libraries.',
    category: 'List',
    lowBit: 4,
    highBit: 0
  },
  {
    key: 'DeleteListItems',
    label: 'Delete Items',
    description: 'Delete items from a list and documents from a document library.',
    category: 'List',
    lowBit: 8,
    highBit: 0
  },
  {
    key: 'ViewListItems',
    label: 'View Items',
    description: 'View items in lists and documents in document libraries.',
    category: 'List',
    lowBit: 1,
    highBit: 0
  },
  {
    key: 'ApproveItems',
    label: 'Approve Items',
    description: 'Approve a minor version of a list item or document.',
    category: 'List',
    lowBit: 16,
    highBit: 0
  },
  {
    key: 'OpenItems',
    label: 'Open Items',
    description: 'View the source of documents with server-side file handlers.',
    category: 'List',
    lowBit: 32,
    highBit: 0
  },
  {
    key: 'ViewVersions',
    label: 'View Versions',
    description: 'View past versions of a list item or document.',
    category: 'List',
    lowBit: 64,
    highBit: 0
  },
  {
    key: 'DeleteVersions',
    label: 'Delete Versions',
    description: 'Delete past versions of list items or documents.',
    category: 'List',
    lowBit: 128,
    highBit: 0
  },
  {
    key: 'CreateAlerts',
    label: 'Create Alerts',
    description: 'Create e-mail alerts.',
    category: 'List',
    lowBit: 0,
    highBit: 512
  },
  {
    key: 'ViewFormPages',
    label: 'View Application Pages',
    description: 'View forms, views, and application pages. Enumerate lists.',
    category: 'List',
    lowBit: 4096,
    highBit: 0
  },

  // ── Site Permissions ──────────────────────────────────────────────────────
  {
    key: 'ManagePermissions',
    label: 'Manage Permissions',
    description: 'Create and change permission levels on the Web site and assign permissions to users and groups.',
    category: 'Site',
    lowBit: 33554432,
    highBit: 0
  },
  {
    key: 'ViewUsageData',
    label: 'View Web Analytics Data',
    description: 'View reports on Web site usage.',
    category: 'Site',
    lowBit: 2097152,
    highBit: 0
  },
  {
    key: 'CreateSSCSite',
    label: 'Create Subsites',
    description: 'Create subsites such as team sites, Meeting Workspace sites, and Document Workspace sites.',
    category: 'Site',
    lowBit: 4194304,
    highBit: 0
  },
  {
    key: 'ManageWeb',
    label: 'Manage Web Site',
    description: 'Grants the ability to perform all administration tasks for the Web site.',
    category: 'Site',
    lowBit: 1073741824,
    highBit: 0
  },
  {
    key: 'AddAndCustomizePages',
    label: 'Add and Customise Pages',
    description: 'Add, change or delete HTML pages or Web Part pages, and edit the Web site using a Windows SharePoint Services-compatible editor.',
    category: 'Site',
    lowBit: 262144,
    highBit: 0
  },
  {
    key: 'ApplyThemesAndBorders',
    label: 'Apply Themes and Borders',
    description: 'Apply a theme or borders to the entire Web site.',
    category: 'Site',
    lowBit: 524288,
    highBit: 0
  },
  {
    key: 'ApplyStyleSheets',
    label: 'Apply Style Sheets',
    description: 'Apply a style sheet (.css file) to the Web site.',
    category: 'Site',
    lowBit: 1048576,
    highBit: 0
  },
  {
    key: 'CreateGroups',
    label: 'Create Groups',
    description: 'Create a group of users that can be used anywhere within the site collection.',
    category: 'Site',
    lowBit: 16777216,
    highBit: 0
  },
  {
    key: 'ManageSubwebs',
    label: 'Manage Subsites',
    description: 'Create, change or delete child sites.',
    category: 'Site',
    lowBit: 8388608,
    highBit: 0
  },
  {
    key: 'BrowseDirectories',
    label: 'Browse Directories',
    description: 'Enumerate files and folders in a Web site using SharePoint Designer and Web DAV interfaces.',
    category: 'Site',
    lowBit: 67108864,
    highBit: 0
  },
  {
    key: 'ViewPages',
    label: 'View Pages',
    description: 'View pages in a Web site.',
    category: 'Site',
    lowBit: 131072,
    highBit: 0
  },
  {
    key: 'EnumeratePermissions',
    label: 'Enumerate Permissions',
    description: 'Enumerate permissions on the Web site, list, folder, document, or list item.',
    category: 'Site',
    lowBit: 0,
    highBit: 536870912
  },
  {
    key: 'BrowseUserInfo',
    label: 'Browse User Information',
    description: 'View information about users of the Web site.',
    category: 'Site',
    lowBit: 134217728,
    highBit: 0
  },
  {
    key: 'ManageAlerts',
    label: 'Manage Alerts',
    description: 'Manage alerts for all users of the Web site.',
    category: 'Site',
    lowBit: 0,
    highBit: 64
  },
  {
    key: 'UseClientIntegration',
    label: 'Use Client Integration Features',
    description: 'Use features that launch client applications.',
    category: 'Site',
    lowBit: 0,
    highBit: 16
  },
  {
    key: 'UseRemoteAPIs',
    label: 'Use Remote Interfaces',
    description: 'Use SOAP, Web DAV, or SharePoint Designer interfaces to access the Web site.',
    category: 'Site',
    lowBit: 0,
    highBit: 32
  },
  {
    key: 'Open',
    label: 'Open',
    description: 'Allow users to open a Web site, list, or folder to access items inside that container.',
    category: 'Site',
    lowBit: 65536,
    highBit: 0
  },
  {
    key: 'EditMyUserInfo',
    label: 'Edit Personal User Information',
    description: 'Allows a user to change his or her own user information, such as adding a picture.',
    category: 'Site',
    lowBit: 0,
    highBit: 1024
  },

  // ── Personal Permissions ──────────────────────────────────────────────────
  {
    key: 'ManagePersonalViews',
    label: 'Manage Personal Views',
    description: 'Create, change, and delete personal views of lists.',
    category: 'Personal',
    lowBit: 512,
    highBit: 0
  },
  {
    key: 'AddDelPrivateWebParts',
    label: 'Add/Remove Personal Web Parts',
    description: 'Add or remove personal Web Parts on a Web Part page.',
    category: 'Personal',
    lowBit: 268435456,
    highBit: 0
  },
  {
    key: 'UpdatePersonalWebParts',
    label: 'Update Personal Web Parts',
    description: 'Update Web Parts to display personalised information.',
    category: 'Personal',
    lowBit: 536870912,
    highBit: 0
  }
];

/**
 * Checks whether a specific permission is enabled in the given Low/High mask pair.
 */
export function isPermissionEnabled(
  def: ISPPermissionDef,
  low: number,
  high: number
): boolean {
  if (def.lowBit !== 0) {
    // eslint-disable-next-line no-bitwise
    return (low & def.lowBit) !== 0;
  }
  if (def.highBit !== 0) {
    // eslint-disable-next-line no-bitwise
    return (high & def.highBit) !== 0;
  }
  return false;
}

/**
 * Computes new Low/High values by toggling a specific permission bit.
 */
export function togglePermission(
  def: ISPPermissionDef,
  low: number,
  high: number,
  enable: boolean
): { low: number; high: number } {
  let nextLow = low;
  let nextHigh = high;
  if (def.lowBit !== 0) {
    // eslint-disable-next-line no-bitwise
    nextLow = enable ? (low | def.lowBit) : (low & ~def.lowBit);
  }
  if (def.highBit !== 0) {
    // eslint-disable-next-line no-bitwise
    nextHigh = enable ? (high | def.highBit) : (high & ~def.highBit);
  }
  return { low: nextLow, high: nextHigh };
}
