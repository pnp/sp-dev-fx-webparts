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
import { IPeoplePickerUserItem } from '@pnp/spfx-controls-react/lib/PeoplePicker';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { PrimaryButton, DefaultButton, } from '@fluentui/react/lib/Button';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';

export interface ITicketDetailViewProps {
    ticketId: number;
    onBack: () => void;
    ticketService: TicketService;
    onUpdate: (id: number, updates: Partial<ITicketFormData>) => Promise<void>;
    onDelete: (id: number) => Promise<void>; // Add this line
    context: WebPartContext;
}

export const TicketDetailView: React.FC<ITicketDetailViewProps> = ({
    ticketId,
    onBack,
    ticketService,
    onUpdate,
    onDelete, // Add this
    context
}) => {
    const [ticket, setTicket] = React.useState<ITicketItem | undefined>(undefined);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | undefined>(undefined);
    const [isEditing, setIsEditing] = React.useState<boolean>(false);
    const [status, setStatus] = React.useState<string>('');
    const [assignedUsers, setAssignedUsers] = React.useState<IPeoplePickerUserItem[]>([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false); // Add this
    const [, setDueDate] = React.useState<string | undefined>(undefined); // Add dueDate state
    const [statusUpdating, setStatusUpdating] = React.useState<boolean>(false); // Add this near your other state declarations

    // Update the useEffect to handle AssignedTo properly
    React.useEffect(() => {
        const loadTicket = async (): Promise<void> => {
            setLoading(true);
            setError(undefined);
            const sp = spfi().using(SPFx(context));

            try {
                const ticketData = await ticketService.getTicketById(ticketId, sp);
                setTicket(ticketData);
                setStatus(ticketData.Status ?? '');

                // Initialize assigned users from ticket data - simplify this logic
                if (ticketData.AssignedTo) {
                    // Always treat as object
                    setAssignedUsers([{
                        id: ticketData.AssignedTo.Id.toString(),
                        text: ticketData.AssignedTo.Title,
                        secondaryText: ticketData.AssignedTo.Email || '',
                        loginName: ticketData.AssignedTo.LoginName || '',
                        imageUrl: '', // You may set a real image URL if available
                        imageInitials: ticketData.AssignedTo.Title ? ticketData.AssignedTo.Title.split(' ').map((n: string) => n[0]).join('') : '',
                        tertiaryText: '',
                        optionalText: ''
                    }]);
                } else {
                    setAssignedUsers([]);
                }

                // Set due date if available
                if (ticketData.DueDate) {
                    const parsedDate = new Date(ticketData.DueDate);
                    setDueDate(isNaN(parsedDate.getTime()) ? undefined : ticketData.DueDate.toString());
                } else {
                    setDueDate(undefined);
                }

            } catch (err) {
                console.error('Error loading ticket:', err);
                setError('Failed to load ticket details.');
            } finally {
                setLoading(false);
            }
        };

        loadTicket();
    }, [ticketId, ticketService, context]);

    const formatDate = (dateString?: string): string => {
        if (!dateString) return 'Not specified';

        // Try to parse the date, and return a fallback if it's invalid
        try {
            const date = new Date(dateString);

            // Check if the date is valid
            if (isNaN(date.getTime())) {
                return 'Invalid date';
            }

            return format(date, 'MMM d, yyyy h:mm a');
        } catch (error) {
            console.error('Error formatting date:', dateString, error);
            return 'Invalid date';
        }
    };

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

    // Update the handleStatusChange function to properly update the UI after status change
    const handleStatusChange = async (
        _event: React.FormEvent<HTMLDivElement>,
        option?: IDropdownOption
    ): Promise<void> => {
        if (!option || !ticket) return;

        setStatusUpdating(true);
        const newStatus = option.key as TicketStatus;

        try {
            // Update the status in the backend first
            await onUpdate(ticket.Id, { status: newStatus });

            // Then update local state
            setStatus(newStatus);

            // Update the ticket object to reflect the new status
            setTicket({
                ...ticket,
                Status: newStatus
            });

            // Exit edit mode after successful update
            setIsEditing(false);
        } catch (err) {
            console.error('Error updating status:', err);
            setError('Failed to update status. Please try again.');

            // Revert to the original status on error
            setStatus(ticket.Status);
        } finally {
            setStatusUpdating(false);
        }
    };

    const handleAssignmentChange = async (items: any[]): Promise<void> => {
        if (!ticket) return;

        try {
            if (items.length > 0) {
                const selectedUser = items[0];
                const newAssignedUsers = [{
                    id: selectedUser.id.toString(),
                    text: selectedUser.text || selectedUser.displayName,
                    secondaryText: '',
                    loginName:  '',
                    imageUrl: '',
                    imageInitials: selectedUser.text ? selectedUser.text.split(' ').map((n: string) => n[0]).join('') : '',
                    tertiaryText: '',
                    optionalText: ''
                   
                }];

                setAssignedUsers(newAssignedUsers);

                await onUpdate(ticket.Id, { assignedTo: selectedUser.id.toString() });

                // Update the ticket object with the new assignment
                setTicket({
                    ...ticket,
                    AssignedTo: {
                        Id: selectedUser.id,
                        Title: selectedUser.text || selectedUser.displayName,
                        Email: selectedUser.secondaryText || selectedUser.email || ''
                    }
                });

                // Exit edit mode after successful update
                setIsEditing(false);
            } else {
                setAssignedUsers([]);
                await onUpdate(ticket.Id, { assignedTo: undefined });

                // Update the ticket object to remove assignment
                setTicket({
                    ...ticket,
                    AssignedTo: undefined
                });

                // Exit edit mode after successful update
                setIsEditing(false);
            }
        } catch (err) {
            console.error('Error updating assignment:', err);

            if (ticket.AssignedTo) {
                setAssignedUsers([{
                    id: ticket.AssignedTo.Id.toString(),
                    text: ticket.AssignedTo.Title,
                    secondaryText: ticket.AssignedTo.Email || '',
                    loginName: ticket.AssignedTo.LoginName || '',
                    imageUrl: '',
                    imageInitials: ticket.AssignedTo.Title ? ticket.AssignedTo.Title.split(' ').map((n: string) => n[0]).join('') : '',
                    tertiaryText: '',
                    optionalText: ''
                }]);
            } else {
                setAssignedUsers([]);
            }
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

    const handleDeleteClick = (): void => {
        setShowDeleteConfirm(true);
    };

    const handleDeleteConfirm = async (): Promise<void> => {
        setShowDeleteConfirm(false);
        try {
            await onDelete(ticketId);
            // The parent component will handle navigation
        } catch (error) {
            setError('Failed to delete ticket. Please try again.');
        }
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
                <div className={styles.headerActions}>
                    {isEditing && <span className={styles.editingIndicator}>Editing</span>}
                    <button className={styles.btn} onClick={onBack}>
                        ← Back
                    </button>
                </div>
            </div>

            <div className={styles.ticketDetail}>
                <div className={styles.ticketSection}>
                    <h2>Essential Information</h2>
                    <div className={styles.fieldGroup}>
                        <div className={styles.field}>
                            <label>Status:</label>
                            {isEditing ? (
                                <>
                                    <Dropdown
                                        key={`status-dropdown-${status}`}
                                        selectedKey={status}
                                        options={statusOptions}
                                        onChange={handleStatusChange}
                                        disabled={statusUpdating}
                                    />
                                    {statusUpdating && <Spinner size={SpinnerSize.small} style={{ marginLeft: 8 }} />}
                                </>
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
                                    defaultSelectedUsers={
                                        assignedUsers.length > 0 ? [assignedUsers[0].text] : []
                                    }
                                    key={`people-picker-${ticket.Id}-${assignedUsers.length > 0 ? assignedUsers[0].id : 'none'}`}
                                />
                            ) : (
                                <span>
                                    {assignedUsers.length > 0
                                        ? assignedUsers[0].text
                                        : 'Unassigned'}
                                </span>
                            )}
                        </div>

                        <div className={styles.field}>
                            <label>Due Date:</label>
                            <span>
                                {ticket.DueDate
                                    ? formatDate(ticket.DueDate.toString())
                                    : 'Not specified'}
                            </span>
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
                    <DefaultButton onClick={onBack} text="Back" />
                    {!isEditing && (
                        <>
                            <PrimaryButton onClick={() => setIsEditing(true)} text="Edit" />
                            <DefaultButton
                                onClick={handleDeleteClick}
                                text="Delete"
                                className={styles.deleteButton}
                                iconProps={{ iconName: 'Delete' }}
                            />
                        </>
                    )}
                    {isEditing && (
                        <>
                            
                            <DefaultButton onClick={() => setIsEditing(false)} text="Cancel" />
                        </>
                    )}
                </div>

                <Dialog
                    hidden={!showDeleteConfirm}
                    onDismiss={() => setShowDeleteConfirm(false)}
                    dialogContentProps={{
                        type: DialogType.normal,
                        title: 'Delete Ticket',
                        subText: 'Are you sure you want to delete this ticket? This action cannot be undone.'
                    }}
                >
                    <DialogFooter>
                        <PrimaryButton
                            onClick={handleDeleteConfirm}
                            text="Delete"
                            className={styles.dangerButton}
                        />
                        <DefaultButton
                            onClick={() => setShowDeleteConfirm(false)}
                            text="Cancel"
                        />
                    </DialogFooter>
                </Dialog>
            </div>
        </div>
    );
};