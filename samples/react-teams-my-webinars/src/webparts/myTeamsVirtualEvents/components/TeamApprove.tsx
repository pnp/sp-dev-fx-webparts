/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import * as MicrosoftGraphBeta from '@microsoft/microsoft-graph-types-beta';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import {
    Skeleton, SkeletonItem, Spinner, makeStyles, shorthands, tokens, DataGrid, DataGridBody,
    DataGridCell, DataGridHeader, DataGridHeaderCell, DataGridRow, TableColumnDefinition, 
    createTableColumn, DataGridProps, PresenceBadge, Title1
} from '@fluentui/react-components';
import { MSGraphClientV3 } from '@microsoft/sp-http';
import { GraphError } from '@microsoft/microsoft-graph-client';
import Teams from './Teams';
import * as strings from 'MyTeamsVirtualEventsWebPartStrings';

interface ITeamApproveProps {
    context: WebPartContext
    id: string;
}

const useStyles = makeStyles({
    invertedWrapper: {
        backgroundColor: tokens.colorNeutralBackground1,
    },
    skeletonRow: {
        alignItems: "center",
        display: "grid",
        paddingBottom: "10px",
        width: "100%",
        position: "relative",
        ...shorthands.gap("10px"),
        gridTemplateColumns: "min-content 20% 20% 15% 15%",
    },
});

export default function TeamApprove(props: ITeamApproveProps): React.ReactElement<ITeamApproveProps> {
    const [registrants, setRegistrants] = React.useState<MicrosoftGraphBeta.VirtualEventRegistration[]>();
    const [selTeam, setSelTeam] = React.useState<string>();
    const [myTeams, setMyTeams] = React.useState<MicrosoftGraph.Team[]>();
    const [teamMembers, setTeamMembers] = React.useState<MicrosoftGraph.User[]>();
    const { id, context } = props;
    const styles = useStyles();

    React.useEffect(() => {
        if (id) context.msGraphClientFactory
            .getClient('3')
            .then((client: MSGraphClientV3) => {
                if (!registrants) client
                    .api(`solutions/virtualEvents/webinars/${id}/registrations`)
                    .version("Beta")
                    .get((err: GraphError, res: { value: MicrosoftGraphBeta.VirtualEventRegistration[] }) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        setRegistrants(res.value.filter(r => r.status === 'pendingApproval'));
                    }).catch(console.error);
                if (!myTeams) client
                    .api(`me/joinedTeams`)
                    .version("v1.0")
                    .get((err: GraphError, res: { value: MicrosoftGraph.Team[] }) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        setMyTeams(res.value);
                    }).catch(console.error);
            }).catch(console.error);
    }, [context]);

    React.useEffect(() => {
        setTeamMembers(undefined);
        if (selTeam) context.msGraphClientFactory
            .getClient('3')
            .then((client: MSGraphClientV3) => {
                client
                    .api(`groups/${selTeam}/members`)
                    .version("v1.0")
                    .top(999)
                    .get((err: GraphError, res: { value: MicrosoftGraph.User[] }) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        setTeamMembers(res.value);
                    }).catch(console.error);
            }).catch(console.error);
    }, [selTeam, context]);

    const columns: TableColumnDefinition<MicrosoftGraphBeta.VirtualEventRegistration>[] = [
        createTableColumn<MicrosoftGraphBeta.VirtualEventRegistration>({
            columnId: "firstName",
            compare: (a, b) => (a.firstName ?? "").localeCompare(b.firstName ?? ""),
            renderHeaderCell: () => strings.FirstName,
            renderCell: (item) => item.firstName!
        }),
        createTableColumn<MicrosoftGraphBeta.VirtualEventRegistration>({
            columnId: "lastName",
            compare: (a, b) => (a.lastName ?? "").localeCompare(b.lastName ?? ""),
            renderHeaderCell: () => strings.LastName,
            renderCell: (item) => item.lastName!
        }),
        createTableColumn<MicrosoftGraphBeta.VirtualEventRegistration>({
            columnId: "email",
            compare: (a, b) => (a.email ?? "").localeCompare(b.email ?? ""),
            renderHeaderCell: () => strings.Email,
            renderCell: (item) => item.email!
        }),
        createTableColumn<MicrosoftGraphBeta.VirtualEventRegistration>({
            columnId: "matched",
            renderHeaderCell: () => strings.Matched,
            // eslint-disable-next-line @rushstack/security/no-unsafe-regexp
            renderCell: (item) => <PresenceBadge status={teamMembers?.find(t => new RegExp(item.email!, "gi").test(t.mail!)) ? 'available' : 'blocked'} />
        }),
    ];

    const defaultSortState = React.useMemo<Parameters<NonNullable<DataGridProps["onSortChange"]>>[1]>(() => ({ sortColumn: "email", sortDirection: "ascending" }), []);

    return (
        <div style={{ 'display': 'flex', 'flexDirection': 'column', 'alignItems': 'stretch', 'gap': '10px' }}>
            {!registrants}
            {(!myTeams || !registrants) && <div style={{ 'display': 'flex', 'flexDirection': 'column', 'alignItems': 'stretch', 'gap': '10px' }}>
                {!registrants && <Spinner labelPosition='below' size='extra-large' label='Loading registrants' />}
                {!myTeams && <Spinner labelPosition='below' size='extra-large' label='Loading My Teams Webinars' />}
                <Skeleton><SkeletonItem /></Skeleton>
            </div>}
            {registrants?.length === 0 && <Title1>{strings.NoPending}</Title1>}
            {registrants && registrants.length > 0 && <>
                {myTeams && <Teams context={context} label={strings.SelectTeamApprove} onOptionSelect={(e, d) => setSelTeam(d.optionValue)} />}
                {selTeam && registrants && !teamMembers && <div className={styles.invertedWrapper}>
                    <Skeleton>
                        {registrants.map((v, i) => (<div key={`skeleton-${i}`} className={styles.skeletonRow}>
                            <SkeletonItem size={36} />
                            <SkeletonItem size={12} />
                        </div>))}
                    </Skeleton>
                </div>}
                {selTeam && registrants && teamMembers && <DataGrid items={registrants} columns={columns} sortable getRowId={(item) => item.id}
                    focusMode="composite" defaultSortState={defaultSortState} resizableColumns>
                    <DataGridHeader>
                        <DataGridRow>
                            {({ renderHeaderCell }) => (<DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>)}
                        </DataGridRow>
                    </DataGridHeader>
                    <DataGridBody<MicrosoftGraphBeta.VirtualEventRegistration>>
                        {({ item, rowId }) => (<DataGridRow<MicrosoftGraphBeta.VirtualEventRegistration> key={rowId}>
                            {({ renderCell }) => (<DataGridCell>{renderCell(item)}</DataGridCell>)}
                        </DataGridRow>)}
                    </DataGridBody>
                </DataGrid>}
            </>}
        </div>
    );
}