export enum BuildingType {
  LIBRARY = 'LIBRARY',
  WAREHOUSE = 'WAREHOUSE',
  POST_OFFICE = 'POST_OFFICE',
  MUSEUM = 'MUSEUM',
  TOWN_HALL = 'TOWN_HALL',
  CLOCK_TOWER = 'CLOCK_TOWER',
  BULLETIN_BOARD = 'BULLETIN_BOARD',
  ART_GALLERY = 'ART_GALLERY',
  GENERAL_STORE = 'GENERAL_STORE',
  NEWSPAPER_OFFICE = 'NEWSPAPER_OFFICE',
  CRAFT_WORKSHOP = 'CRAFT_WORKSHOP',
  DOCUMENTS_LIBRARY = 'DOCUMENTS_LIBRARY',
  STYLE_LIBRARY = 'STYLE_LIBRARY',
}

// SharePoint BaseTemplate IDs
export const SP_BASE_TEMPLATE_MAP: Record<number, BuildingType | 'DOC_LIB_RANDOM'> = {
  107: BuildingType.TOWN_HALL,        // Tasks
  106: BuildingType.CLOCK_TOWER,      // Calendar
  104: BuildingType.BULLETIN_BOARD,   // Announcements
  109: BuildingType.ART_GALLERY,      // Picture Library
  100: BuildingType.GENERAL_STORE,    // Custom List
  850: BuildingType.NEWSPAPER_OFFICE, // Site Pages
  101: 'DOC_LIB_RANDOM',             // Document Library (picks one of 4)
};

export const DOC_LIB_VARIANTS: BuildingType[] = [
  BuildingType.LIBRARY,
  BuildingType.WAREHOUSE,
  BuildingType.POST_OFFICE,
  BuildingType.MUSEUM,
];

export const BUILDING_CONFIG: Record<BuildingType, {
  label: string;
  icon: string;
  baseColor: string;
  roofColor: string;
  doorColor: string;
  accentColor: string;
  description: string;
}> = {
  [BuildingType.LIBRARY]: {
    label: 'Library',
    icon: '📚',
    baseColor: '#c89a30',
    roofColor: '#8a6510',
    doorColor: '#7a4a10',
    accentColor: '#f0d060',
    description: 'Document Library',
  },
  [BuildingType.WAREHOUSE]: {
    label: 'Warehouse',
    icon: '🏭',
    baseColor: '#8ea8be',
    roofColor: '#4e6e84',
    doorColor: '#2e4e64',
    accentColor: '#bdd8ee',
    description: 'Storage Warehouse',
  },
  [BuildingType.POST_OFFICE]: {
    label: 'Post Office',
    icon: '📮',
    baseColor: '#d94040',
    roofColor: '#a02020',
    doorColor: '#6a1010',
    accentColor: '#ff8888',
    description: 'Post Office',
  },
  [BuildingType.MUSEUM]: {
    label: 'Museum',
    icon: '🏛',
    baseColor: '#d4c870',
    roofColor: '#a09040',
    doorColor: '#706020',
    accentColor: '#f0e8a0',
    description: 'Museum',
  },
  [BuildingType.TOWN_HALL]: {
    label: 'Town Hall',
    icon: '🏰',
    baseColor: '#9b59b6',
    roofColor: '#6e3080',
    doorColor: '#4a1060',
    accentColor: '#cc88ee',
    description: 'Task List — Town Hall',
  },
  [BuildingType.CLOCK_TOWER]: {
    label: 'Clock Tower',
    icon: '🕐',
    baseColor: '#2e88cc',
    roofColor: '#1a5a9a',
    doorColor: '#0a3068',
    accentColor: '#70c0ff',
    description: 'Calendar',
  },
  [BuildingType.BULLETIN_BOARD]: {
    label: "Town Crier's Post",
    icon: '📣',
    baseColor: '#e07820',
    roofColor: '#a84e08',
    doorColor: '#7a3000',
    accentColor: '#ffa840',
    description: 'Announcements',
  },
  [BuildingType.ART_GALLERY]: {
    label: 'Art Gallery',
    icon: '🖼',
    baseColor: '#c04888',
    roofColor: '#8a2060',
    doorColor: '#5a0840',
    accentColor: '#f090c0',
    description: 'Picture Library',
  },
  [BuildingType.GENERAL_STORE]: {
    label: 'General Store',
    icon: '🏪',
    baseColor: '#3aaa5c',
    roofColor: '#1e7838',
    doorColor: '#0e5020',
    accentColor: '#78dd90',
    description: 'List',
  },
  [BuildingType.NEWSPAPER_OFFICE]: {
    label: 'Newspaper Office',
    icon: '📰',
    baseColor: '#20a882',
    roofColor: '#0e7860',
    doorColor: '#044838',
    accentColor: '#60d8b8',
    description: 'Site Pages',
  },
  [BuildingType.CRAFT_WORKSHOP]: {
    label: 'Craft Workshop',
    icon: '🔨',
    baseColor: '#b07848',
    roofColor: '#7a5028',
    doorColor: '#502808',
    accentColor: '#e0a868',
    description: 'Site Assets',
  },
  [BuildingType.DOCUMENTS_LIBRARY]: {
    label: 'Documents',
    icon: '📄',
    baseColor: '#2e78d4',
    roofColor: '#1a50a0',
    doorColor: '#0a2870',
    accentColor: '#78b8ff',
    description: 'Documents Library',
  },
  [BuildingType.STYLE_LIBRARY]: {
    label: 'Style Library',
    icon: '🎨',
    baseColor: '#8840cc',
    roofColor: '#5a2090',
    doorColor: '#340060',
    accentColor: '#cc88ff',
    description: 'Style Library',
  },
};
