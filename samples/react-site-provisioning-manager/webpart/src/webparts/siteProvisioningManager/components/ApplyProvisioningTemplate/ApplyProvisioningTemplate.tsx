import * as React from 'react';
import styles from "../App/App.module.scss";
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { HttpClientResponse } from '@microsoft/sp-http';
import AppContext from "../App/AppContext";
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import * as Strings from "SiteProvisioningManagerWebPartStrings";

const SiteProvisioningTemplate = () => {
    const ctx = React.useContext(AppContext);
    const [template, setTemplate] = React.useState("");
    const [webUrl, setWebUrl] = React.useState(ctx.webUrl);
    const isNotAdmin = !ctx.isGlobalAdmin || !ctx.isSiteOwner;
    const applyTemplate = async () => {
        ctx.toggleLoading(true);
        ctx.updateMessageBarSettings({
            message: "",
            type: MessageBarType.error,
            visible: false
        });

        const response: HttpClientResponse = await ctx.appService.ApplyProvisioningTemplate(webUrl, template);
        const responseText = await response.text();
        if (response.status === 200)
            ctx.updateMessageBarSettings({
                message: Strings.SuccessMessage,
                type: MessageBarType.success,
                visible: true
            });
        else
            ctx.updateMessageBarSettings({
                message: responseText,
                type: MessageBarType.error,
                visible: true
            });

        ctx.toggleLoading(false);
    };

    return (
        <div className={styles.pivotContainer}>
            <div hidden={ctx.isLoading}>
                <TextField disabled={!ctx.isGlobalAdmin} label="Site URL" value={webUrl} onChanged={(value) => setWebUrl(value)} />
                <TextField disabled={!isNotAdmin} label="Template" value={template} onChanged={(value) => setTemplate(value)} multiline rows={20} />
                <div className={styles.topMargin}>
                    <PrimaryButton disabled={!isNotAdmin} text="Apply Template" onClick={applyTemplate} className={styles.provisioningButton} />
                    <DefaultButton disabled={!isNotAdmin} text="Reset" onClick={() => setTemplate("")} className={styles.provisioningButton} />
                </div>
            </div>
        </div>
    );
};

export default SiteProvisioningTemplate;