import * as React from 'react';
import styles from '../TicketingDashboard.module.scss';
import { TicketService } from '../../services/TicketService';
import { ITicketItem } from '../../ITicketItem';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { format } from 'date-fns';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ITicketFormData } from '../ITicketFormData';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { PeoplePicker, PrincipalType } from '@pnp/spfx-controls-react/lib/PeoplePicker';
import { TicketStatus } from '../TicketingDashboard';
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export interface ITicketDetailViewProps {
    ticketId: number;
    onBack: () => void;
    ticketService: TicketService;
    onUpdate: (id: number, updates: Partial<ITicketFormData>) => Promise<void>;
    context: WebPartContext;
}

export const TicketDetailView: React.FC<ITicketDetailViewProps> = ({
    ticketId,
    onBack,
    ticketService,
    onUpdate,
    context,
}) => {
    const [ticket, setTicket] = React.useState<ITicketItem | undefined>(undefined);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | undefined>(undefined);
    const [isEditing, setIsEditing] = React.useState<boolean>(false);
    const [status, setStatus] = React.useState<string>('');

    React.useEffect(() => {
        const loadTicket = async (): Promise<void> => {
            setLoading(true);
            setError(undefined);
            const sp = spfi().using(SPFx(context));

            try {
                const ticketData = await ticketService.getTicketById(ticketId, sp);
                setTicket(ticketData);
                setStatus(ticketData.Status ?? '');
            } catch (err) {
                console.error('Error loading ticket:', err);
                setError('Failed to load ticket details.');
            } finally {
                setLoading(false);
            }
        };

        loadTicket();
    }, [ticketId, ticketService, context]);

    const formatDate = (dateString?: string): string =>
        dateString ? format(new Date(dateString), 'MMM d, yyyy h:mm a') : 'Not specified';

    const getStatusClassName = (status: string): string => {
        switch (status) {
            case 'Open':
                return styles.statusOpen;
            case 'In Progress':
                return styles.statusInProgress;
            case 'Fixed':
                return styles.statusFixed;
            case 'Closed':
                return styles.statusClosed;
            case "Won't Fix":
                return styles.statusWontFix;
            default:
                return '';
        }
    };

    const handleStatusChange = async (
        _event: React.FormEvent<HTMLDivElement>,
        option?: IDropdownOption
    ) => {
        if (!option || !ticket) return;
        const newStatus = option.key as TicketStatus;
        setStatus(newStatus);
        try {
            await onUpdate(ticket.Id, { status: newStatus });
        } catch (err) {
            console.error('Error updating status:', err);
        }
    };

    // Handle the assignment changes here
    const handleAssignmentChange = async (items: any[]) => {
        if (!ticket) return;
        try {
            const assignedToId = items.length > 0 ? items[0].id : undefined;
            if (assignedToId !== undefined) {
                await onUpdate(ticket.Id, {assignedTo: assignedToId.toString()});
            }
        } catch (err) {
            console.error('Error updating assignment:', err);
        }
    };

    const statusOptions: IDropdownOption[] = Object.values(TicketStatus).map((value) => ({
        key: value,
        text: value,
    }));

    const peoplePickerContext = {
        absoluteUrl: context.pageContext.web.absoluteUrl,
        spHttpClient: context.spHttpClient,
        msGraphClientFactory: context.msGraphClientFactory,
    };

    if (loading) {
        return (
            <div className={styles.view}>
                <Spinner size={SpinnerSize.large} label="Loading ticket details..." />
            </div>
        );
    }

    if (error || !ticket) {
        return (
            <div className={styles.view}>
                <div className={styles.header}>
                    <h1>Error</h1>
                    <button className={styles.btn} onClick={onBack}>
                        ← Back
                    </button>
                </div>
                <div className={styles.errorMessage}>{error || 'Failed to load ticket details.'}</div>
            </div>
        );
    }

    return (
        <div id="ticket-detail" className={styles.view}>
            <div className={styles.header}>
                <h1>{ticket.Title}</h1>
                <button className={styles.btn} onClick={onBack}>
                    ← Back
                </button>
            </div>

            <div className={styles.ticketDetail}>
                <div className={styles.ticketSection}>
                    <h2>Essential Information</h2>
                    <div className={styles.fieldGroup}>
                        <div className={styles.field}>
                            <label>Status:</label>
                            {isEditing ? (
                                <Dropdown selectedKey={status} options={statusOptions} onChange={handleStatusChange} />
                            ) : (
                                <span className={`${styles.statusBadge} ${getStatusClassName(ticket.Status)}`}>
                                    {ticket.Status}
                                </span>
                            )}
                        </div>

                        <div className={styles.field}>
                            <label>Priority:</label>
                            <span>{ticket.Priority}</span>
                        </div>

                        <div className={styles.field}>
                            <label>Assigned To:</label>
                            {isEditing ? (
                                <PeoplePicker
                                    context={peoplePickerContext}
                                    personSelectionLimit={1}
                                    principalTypes={[PrincipalType.User]}
                                    resolveDelay={1000}
                                    onChange={handleAssignmentChange}
                                    ensureUser={true}
                                />
                            ) : (
                                <span>{ticket.AssignedTo?.Title || 'Unassigned'}</span>
                            )}
                        </div>

                        <div className={styles.field}>
                            <label>Due Date:</label>
                            <span>{formatDate(ticket.DueDate ? ticket.DueDate.toDateString() : undefined)}</span>
                        </div>
                    </div>

                    <div className={styles.ticketDescription}>
                        <h3>Description:</h3>
                        <p>{ticket.Description || 'No description provided.'}</p>
                    </div>
                </div>

                {(ticket.Category ||
                    ticket.Environment ||
                    ticket.StepsToReproduce ||
                    ticket.ExpectedResult ||
                    ticket.ActualResult) && (
                        <div className={styles.ticketSection}>
                            <h2>Additional Information</h2>
                            <div className={styles.fieldGroup}>
                                {ticket.Category && (
                                    <div className={styles.field}>
                                        <label>Category:</label>
                                        <span>{ticket.Category}</span>
                                    </div>
                                )}
                                {ticket.Environment && (
                                    <div className={styles.field}>
                                        <label>Environment:</label>
                                        <span>{ticket.Environment}</span>
                                    </div>
                                )}
                                {ticket.AffectedVersion && (
                                    <div className={styles.field}>
                                        <label>Affected Version:</label>
                                        <span>{ticket.AffectedVersion}</span>
                                    </div>
                                )}
                                {ticket.Severity && (
                                    <div className={styles.field}>
                                        <label>Severity:</label>
                                        <span>{ticket.Severity}</span>
                                    </div>
                                )}
                            </div>

                            {ticket.StepsToReproduce && (
                                <div className={styles.ticketNotes}>
                                    <h3>Steps to Reproduce:</h3>
                                    <pre>{ticket.StepsToReproduce}</pre>
                                </div>
                            )}
                            {ticket.ExpectedResult && (
                                <div className={styles.ticketNotes}>
                                    <h3>Expected Result:</h3>
                                    <p>{ticket.ExpectedResult}</p>
                                </div>
                            )}
                            {ticket.ActualResult && (
                                <div className={styles.ticketNotes}>
                                    <h3>Actual Result:</h3>
                                    <p>{ticket.ActualResult}</p>
                                </div>
                            )}
                        </div>
                    )}

                <div className={styles.ticketSection}>
                    <h2>Ticket Information</h2>
                    <div className={styles.fieldGroup}>
                        <div className={styles.field}>
                            <label>Created By:</label>
                            <span>{ticket.Author?.Title || 'Unknown'}</span>
                        </div>
                        <div className={styles.field}>
                            <label>Modified By:</label>
                            <span>{ticket.Editor?.Title || 'Unknown'}</span>
                        </div>
                        <div className={styles.field}>
                            <label>Created On:</label>
                            <span>{formatDate(ticket.Created)}</span>
                        </div>
                        <div className={styles.field}>
                            <label>Last Modified:</label>
                            <span>{formatDate(ticket.Modified)}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.ticketActions}>
                    <button className={styles.btn} onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? 'Done Editing' : 'Edit Ticket'}
                    </button>
                </div>
            </div>
        </div>
    );
};