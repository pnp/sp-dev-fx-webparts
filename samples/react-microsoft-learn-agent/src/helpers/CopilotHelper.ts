import { ConnectionSettings } from "@microsoft/agents-copilotstudio-client";

export class CopilotHelper {
    public static getConnectionSettings(props: {
        environmentId: string;
        agentIdentifier: string;
        tenantId: string;
        appClientId: string;
    }): ConnectionSettings {
        return {
            environmentId: props.environmentId,
            agentIdentifier: props.agentIdentifier,
            tenantId: props.tenantId,
            appClientId: props.appClientId,
            authority: `https://login.microsoftonline.com/${props.tenantId}`
        };
    }
}
