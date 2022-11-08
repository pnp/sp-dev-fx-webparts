import { useCallback, useRef } from "react";
import { useForceUpdate } from "@fluentui/react-hooks";
import { useConfigurationService, useDirectoryService } from "services";
import { IConfigureApproversPanel } from "../approvals";
import { ISettingsPanel } from "../settings";

export const useSettings = () => {
    const forceUpdate = useForceUpdate();
    const { active: config } = useConfigurationService();
    const { currentUserIsSiteAdmin } = useDirectoryService();

    const userCanManageSettings = currentUserIsSiteAdmin;

    const settingsPanel = useRef<ISettingsPanel>();

    const editSettings = useCallback(async () => {
        try {
            await settingsPanel.current.edit(config);
        } finally { forceUpdate(); }
    }, [config, settingsPanel, forceUpdate]);

    const configureApproversPanel = useRef<IConfigureApproversPanel>();

    return [
        userCanManageSettings,
        settingsPanel,
        configureApproversPanel,
        editSettings
    ] as const;
};