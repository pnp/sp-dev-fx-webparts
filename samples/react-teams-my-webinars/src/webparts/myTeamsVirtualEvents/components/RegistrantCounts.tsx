import * as React from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import * as MicrosoftGraphBeta from '@microsoft/microsoft-graph-types-beta';
import { Label, Skeleton, SkeletonItem, Tooltip, makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { MSGraphClientV3 } from '@microsoft/sp-http';
import { GraphError } from '@microsoft/microsoft-graph-client';
import * as strings from 'MyTeamsVirtualEventsWebPartStrings';

interface IRegistrantCountsProps {
    id: string;
    context: WebPartContext;
}

const useStyles = makeStyles({
    regdetails: {
        alignItems: "center",
        display: 'flex',
        flexDirection: 'row',
        ...shorthands.gap("10px")
    },
    regcount: {
        fontSize: tokens.fontSizeBase100
    }
});

export default function RegistrantCounts(props: IRegistrantCountsProps): React.ReactElement<IRegistrantCountsProps> {
    const [registrants, setRegistrants] = React.useState<MicrosoftGraphBeta.VirtualEventRegistration[]>();
    const { id, context } = props;
    const styles = useStyles();

    React.useEffect(() => {
        context.msGraphClientFactory
            .getClient('3')
            .then((client: MSGraphClientV3) => {
                client
                    .api(`solutions/virtualEvents/webinars/${id}/registrations`)
                    .version("Beta")
                    .get((err: GraphError, res: { value: MicrosoftGraphBeta.VirtualEventRegistration[] }) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        setRegistrants(res.value);
                    }).catch(console.error);
            }).catch(console.error);
    }, [context]);

    if (!registrants) return (<Skeleton><SkeletonItem /></Skeleton>);
    else return (<div className={styles.regdetails}>
        <Tooltip content={strings.ThereAreRegistrantsRegistered.replace("{x}", registrants.filter(r => r.status === 'registered').length.toString())}
            relationship="label">
            <Label className={styles.regcount}>R: {registrants.filter(r => r.status === 'registered').length}</Label>
        </Tooltip>
        <Tooltip content={strings.ThereAreRegistrantsPendingApproval.replace("{x}", registrants.filter(r => r.status === 'pendingApproval').length.toString())}
            relationship="label">
            <Label className={styles.regcount}>P: {registrants.filter(r => r.status === 'pendingApproval').length}</Label>
        </Tooltip>
    </div>);
}