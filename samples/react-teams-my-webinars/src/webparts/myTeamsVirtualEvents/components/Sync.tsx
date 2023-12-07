import { Accordion, AccordionHeader, AccordionItem, AccordionPanel, Button, Field, Label, ProgressBar, Text, makeStyles } from '@fluentui/react-components';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import * as React from 'react';
import * as strings from 'MyTeamsVirtualEventsWebPartStrings';
import { ISite, SitePicker } from "@pnp/spfx-controls-react/lib/SitePicker";
import { ListPicker } from "@pnp/spfx-controls-react/lib/ListPicker";
import * as MicrosoftGraphBeta from '@microsoft/microsoft-graph-types-beta';
import { MonacoEditor } from "@pnp/spfx-controls-react/lib/MonacoEditor";

interface ISyncProps {
    context: WebPartContext;
    webinars: MicrosoftGraphBeta.VirtualEventWebinar[];
}

const useStyles = makeStyles({
    AccordionPanel: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: '4px'
    }
})

export default function Sync(props: ISyncProps): React.ReactElement<ISyncProps> {
    const { context, webinars } = props;
    const [site, setSite] = React.useState<ISite>();
    const [list, setList] = React.useState<string>();
    const [running, setRunning] = React.useState<boolean>(false);
    const [status, setStatus] = React.useState<number>(-1);
    const [error, setError] = React.useState<string>();
    const styles = useStyles();

    const regLinkColFormatting = React.useMemo(() => JSON.stringify({
        "$schema": "https://developer.microsoft.com/json-schemas/sp/v2/column-formatting.schema.json",
        "elmType": "div",
        "children": [
            {
                "elmType": "div",
                "style": {
                    "display": "flex",
                    "flex-direction": "row"
                },
                "children": [
                    {
                        "elmType": "a",
                        "style": {
                            "width": "80px",
                            "height": "26px",
                            "border-radius": "3px",
                            "cursor": "pointer",
                            "display": "flex",
                            "align-items": "center",
                            "justify-content": "space-evenly",
                            "margin": "5px",
                            "text-decoration": "none"
                        },
                        "attributes": {
                            "href": "=[$RegistrationLink]",
                            "target": "_blank",
                            "class": "ms-bgColor-themePrimary ms-bgColor-themeDark--hover ms-fontColor-white ms-fontSize-12 ms-fontWeight-bold"
                        },
                        "children": [
                            {
                                "elmType": "span",
                                "attributes": {
                                    "iconName": "TeamsLogo"
                                }
                            },
                            {
                                "elmType": "span",
                                "txtContent": "Register"
                            }
                        ]
                    }
                ]
            }
        ]
    }, null, 2), []);

    const sync = async (): Promise<void> => {
        setRunning(true);
        setStatus(0);
        const client = await context.msGraphClientFactory.getClient('3');
        for (let i = 0; i < webinars.length; i++) {
            const webinar = webinars[i];
            try {
                await client.api(`/sites/${site?.id}/lists/${list}/items`)
                    .version("v1.0")
                    .header('Content-Type', 'application/json')
                    .post(JSON.stringify({
                        "fields": {
                            "Title": webinar.displayName,
                            "Description": webinar.description?.content,
                            "RegistrationLink": `https://events.teams.microsoft.com/event/${webinar.id}`,
                            "Start": `${webinar.startDateTime?.dateTime}Z`,
                            "End": `${webinar.endDateTime?.dateTime}Z`
                        }
                    }));
                setStatus(i + 1);
            } catch (e) {
                setStatus(i + 1);
                console.error(e);
                setError(`${error ? `${error}; ` : ''}${e.toString()}`);
            }
        }
        setRunning(false);
    };

    return (<div style={{ 'display': 'flex', 'flexDirection': 'column', 'alignItems': 'stretch', 'gap': '10px', 'position': 'relative' }}>
        <Label>{strings.SyncColumns}</Label>
        <Accordion collapsible>
            <AccordionItem value="title">
                <AccordionHeader>Title [Single line of text]</AccordionHeader>
                <AccordionPanel className={styles.AccordionPanel}>
                    <Text>{strings.TitleDescription}</Text>
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="description">
                <AccordionHeader>Description [Multiple lines of text with Rich Text]</AccordionHeader>
                <AccordionPanel className={styles.AccordionPanel}>
                    <Text>{strings.DescriptionDescription1}</Text>
                    <Text>{strings.DescriptionDescription2}</Text>
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="start">
                <AccordionHeader>Start [Date and time include time]</AccordionHeader>
                <AccordionPanel className={styles.AccordionPanel}>
                    <Text>{strings.Start1}</Text>
                    <Text>{strings.Start2}</Text>
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="end">
                <AccordionHeader>End [Date and time include time]</AccordionHeader>
                <AccordionPanel className={styles.AccordionPanel}>
                    <Text>{strings.End1}</Text>
                    <Text>{strings.End2}</Text>
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="link">
                <AccordionHeader>Registration Link [Single line of text]</AccordionHeader>
                <AccordionPanel className={styles.AccordionPanel}>
                    <Text>{strings.RegistrationLink}</Text>
                    <MonacoEditor value={regLinkColFormatting} showMiniMap={false} readOnly language={"json"} />
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
        <SitePicker context={context} label={strings.SelectTeamSync} mode={'site'} allowSearch={true} multiSelect={false} onChange={(sites) => setSite(sites[0] ?? undefined)}
            placeholder={strings.SelectTeamSync} searchPlaceholder={strings.SearchTeamSync} />
        <ListPicker context={context} label={strings.SelectList} placeHolder={strings.SelectList} baseTemplate={100} includeHidden={false}
            multiSelect={false} onSelectionChanged={(v) => setList(Array.isArray(v) ? v[0] : v ?? undefined)} webAbsoluteUrl={site?.url ?? undefined} disabled={!site} />
        <Button appearance='primary' style={{ alignSelf: 'start' }} disabled={!list || running} onClick={sync}>Sync</Button>
        {status >= 0 && <Field validationMessage={`${webinars.length === status ? strings.Done : `${strings.Processing.replace("{name}", webinars[status].displayName ?? '')} ${error ? ` ${strings.WithErrors}${error}` : ''}`}`}
            validationState={error ? 'error' : webinars.length === status ? 'success' : 'none'}>
            <ProgressBar max={webinars.length} value={status} color={error ? 'error' : webinars.length === status ? 'success' : 'brand'} />
        </Field>}
    </div>);
}