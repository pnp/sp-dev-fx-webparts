import { PanelCallback } from "../../models";

export interface IMembersListProps {
    groupName: string;
    groupId: string;
    showPanel: boolean;
    closePanel: PanelCallback;
}