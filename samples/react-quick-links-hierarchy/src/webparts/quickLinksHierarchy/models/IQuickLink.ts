export interface IQuickLink {
    id: string;
    title: string;
    url?: string;
    description?: string;
    iconName?: string;
    sortOrder?: number;
    openWith?: 'Same Window' | 'New Tab';
    active?: boolean;
    isHeader?: boolean;
    parentId?: string | undefined;
    children?: IQuickLink[];
  }