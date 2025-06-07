import * as React from 'react';
import styles from '../TicketingDashboard.module.scss';
import { ITicketItem } from '../../ITicketItem';
import { format } from 'date-fns';
import { WebPartContext } from "@microsoft/sp-webpart-base";


export interface IDashboardViewProps {
  tickets: ITicketItem[];
  onTicketSelect: (id: number) => void;
  loading: boolean;
  context: WebPartContext;
  currentUserId: number;
}

export const DashboardView: React.FC<IDashboardViewProps> = ({
  tickets,
  onTicketSelect,
  loading,
  context,
  currentUserId
}) => {
  // Component implementation

  // Helper function to get status class
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
      case 'Won\'t Fix':
        return styles.statusWontFix;
      default:
        return '';
    }
  };

  // Helper function to format date
  const formatDate = (dateString: string): string => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.abs(now.getTime() - date.getTime()) / 36e5; // hours

    if (diffHours < 24) {
      return `${Math.floor(diffHours)}h ago`;
    } else if (diffHours < 48) {
      return 'Yesterday';
    } else {
      return format(date, 'MMM d, yyyy');
    }
  };

  return (
    <div id="dashboard" className={styles.view}>
      <div className={styles.header}>
        <h1>All Tickets</h1>
      </div>

      {tickets.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No tickets found. Create a new ticket to get started.</p>
        </div>
      ) : (
        tickets.map(ticket => (
          <div
            key={ticket.Id}
            className={styles.ticketCard}
            onClick={(): void => onTicketSelect(ticket.Id)}
          >
            <div>
              <span className={`${styles.statusBadge} ${getStatusClassName(ticket.Status)}`}>
                {ticket.Status}
              </span>
              <strong>{ticket.Title}</strong><br />
              {ticket.Author?.Title} – {formatDate(ticket.Created ?? '')
              }
              {ticket.Category && <span className={styles.categoryLabel}>{ticket.Category}</span>}
            </div>
            <div className={styles.ticketMeta}>
              <span className={styles.priorityIndicator} title={`Priority: ${ticket.Priority}`}>
                {ticket.Priority === 'High' && '🔴'}
                {ticket.Priority === 'Normal' && '🟠'}
                {ticket.Priority === 'Low' && '🟢'}
              </span>
              {ticket.AssignedTo  && (
                <span className={styles.assignedLabel} title={`Assigned to: ${ticket.AssignedTo.Title}`}>
                  👤 {ticket.AssignedTo.Title}
                </span>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

