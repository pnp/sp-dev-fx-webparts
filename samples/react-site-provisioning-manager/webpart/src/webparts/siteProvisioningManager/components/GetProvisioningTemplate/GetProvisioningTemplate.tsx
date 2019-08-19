import * as React from "react";
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import Handlers from './Handlers';
import styles from "../App/App.module.scss";
import { Label } from "office-ui-fabric-react/lib/Label";
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import AppContext from "../App/AppContext";
import HandlerValues from "../../../../models/Handlers";
import { HttpClientResponse } from "@microsoft/sp-http";
import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";

const GetProvisioningTemplate = () => {
    const ctx = React.useContext(AppContext);
    const [handlers, setHandlers] = React.useState([]);
    const [webUrl, setWebUrl] = React.useState(ctx.webUrl);
    const [template, setTemplate] = React.useState("");
    const [handlerValues, setHandlerValues] = React.useState(HandlerValues);
    const isNotAdmin = !ctx.isGlobalAdmin || !ctx.isSiteOwner;

    const resetHandlers = () => {
        const allHandlers = Object.keys(HandlerValues);
        let newValues = HandlerValues;
        allHandlers.map(value => newValues[value] = false);
        setHandlerValues(newValues);
    };

    const onHandlerChange = (ev: React.FormEvent<HTMLElement>, isChecked: boolean) => {
        const handlerName = ev.currentTarget.getAttribute("name");

        if (handlerName === "All") {
            if (isChecked) {
                setHandlers(["All"]);
                setHandlerValues({ ...handlerValues, [handlerName]: isChecked });
            }

            else {
                resetHandlers();
                setHandlers([]);
            }
        }
        else {
            let newHandlers = [...handlers];
            if (isChecked)
                newHandlers = newHandlers.concat(handlerName);
            else
                newHandlers = newHandlers.filter(h => h != handlerName);
            setHandlers(newHandlers);
            setHandlerValues({ ...handlerValues, [handlerName]: isChecked });
        }
    };

    const getTemplate = async () => {
        ctx.toggleLoading(true);
        ctx.updateMessageBarSettings({
            message: "",
            type: MessageBarType.success,
            visible: false
        });
        const response: HttpClientResponse = await ctx.appService.GetProvisioningTemplate(webUrl, handlers.join(","));
        
        const responseText = await response.text();
        if (response.status === 200)
            setTemplate(responseText);
        else
        ctx.updateMessageBarSettings({
            message: responseText,
            type: MessageBarType.error,
            visible: true
        });
        ctx.toggleLoading(false);
    };

    const downloadTemplate = () => {
        if (template !== "") {
            const fileName = "PnPProvisioningTemplate.xml";
            const fileContent = new Blob([template], { type: 'text/plain' });
            const downloadTag = document.createElement("a");
            downloadTag.setAttribute("href", window.URL.createObjectURL(fileContent));
            downloadTag.setAttribute("download", fileName);
            downloadTag.dataset.downloadurl = ['text/plain', downloadTag.download, downloadTag.href].join(':');
            downloadTag.draggable = true;
            downloadTag.classList.add('dragour');
            downloadTag.click();
        }
    };

    return (
        <div className={styles.pivotContainer}>
            <div hidden={ctx.isLoading || template.length > 1}>
                <TextField disabled={!ctx.isGlobalAdmin} label="Site URL" value={webUrl} onChanged={(value) => setWebUrl(value)} />
                <Label>Handlers</Label>
                <Handlers disabled={!isNotAdmin} values={handlerValues} onHandlerChange={onHandlerChange} />
                <div className={styles.topMargin}>
                    <PrimaryButton text="Get Template" className={styles.provisioningButton} disabled={(handlers.length < 1 || webUrl.length < 1)  || !isNotAdmin} onClick={getTemplate} />
                    <DefaultButton text="Reset" disabled={!isNotAdmin} onClick={resetHandlers} className={styles.provisioningButton} />
                </div>
            </div>
            <div hidden={template.length < 1}>
                <TextField label="Template" value={template} multiline rows={20} />
                <div className={styles.topMargin}>
                    <PrimaryButton text="Download" onClick={downloadTemplate} className={styles.provisioningButton} />
                    <DefaultButton text="Back" onClick={() => setTemplate("")} className={styles.provisioningButton} />
                </div>
            </div>
        </div>
    );
};

export default GetProvisioningTemplate;