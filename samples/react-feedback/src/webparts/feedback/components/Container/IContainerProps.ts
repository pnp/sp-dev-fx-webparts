import { IReadonlyTheme } from "@microsoft/sp-component-base";

export interface IContainerProps {
    buttonLabel: string;
    showCategory: boolean;
    listitemid: number;
    selectedCategory: string;
    currentUser: {
        displayName: string;
        email: string;
        loginName?: string;
    };
    themeVariant: IReadonlyTheme;
}
