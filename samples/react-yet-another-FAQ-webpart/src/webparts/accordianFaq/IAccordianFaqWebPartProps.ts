export interface IAccordianFaqWebPartProps {
    title: string;
    listName: string;
    orderBy: string;
    orderAsc: boolean;
    groupBy: boolean;
    groupField: string;
    darkMode: boolean;
    enableMarkdown: boolean;
    cacheDuration: number;
    headerBgColor: string;
    headerTextColor: string;
    panelBgColor: string;
    hideSearchBar: boolean;
    hideExpandCollapseButtons: boolean;
    headerPosition?: 'left' | 'center';
    expandButtonsPosition: 'left' | 'right';
  }