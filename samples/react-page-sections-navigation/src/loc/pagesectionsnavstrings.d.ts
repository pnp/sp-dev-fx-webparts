declare interface IPageSectionsNavigationStrings {
    NavGroupName: string;
    ScrollBehaviorFieldLabel: string;
    AutoScrollBehavior: string;
    SmoothScrollBehavior: string;
    PositionLabel: string;
    PositionSection: string;
    PositionTop: string;
    ThemeLabel: string;
    ThemeLight: string;
    ThemeDark: string;
    ThemeTheme: string;
    AlignLabel: string;
    AlignLeft: string;
    AlignCenter: string;
    AlignRight: string;
    HomeNavItemCbxLabel: string;
    HomeNavItemTextLabel: string;
    HomeNavItemDefaultText: string;
    CustomCSSLabel: string;
    NavigationWebPartPlaceholderText: string;
    NavAnchorGroupName: string;
    ShowTitleFieldLabel: string;
    AnchorTitlePlaceholder: string;
}

declare module 'PageSectionsNavigationStrings' {
    const strings: IPageSectionsNavigationStrings;
    export = strings;
}