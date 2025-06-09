import * as React from 'react';
import styles from './TicketingDashboard.module.scss';
import { DashboardView } from './views/DashboardView';
import { MyTicketsView } from './views/MyTicketsView';
import { NewTicketView } from './views/NewTicketView';
import { TicketDetailView } from './views/TicketDetailView';
import { ITicketingDashboardProps } from './ITicketingDashboardProps';
import { ITicketFormData } from './ITicketFormData';
import { TicketService } from '../services/TicketService';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/site-users/web";
import { ITicketItem } from '../ITicketItem';

// Enums
export enum TicketPriority {
  High = "High",
  Normal = "Normal",
  Low = "Low"
}

export enum TicketStatus {
  Open = "Open",
  InProgress = "In Progress",
  Fixed = "Fixed",
  Closed = "Closed",
  WontFix = "Won't Fix"
}

export enum TicketCategory {
  UIUX = "UI/UX",
  Functionality = "Functionality",
  Performance = "Performance",
  Security = "Security",
  Data = "Data",
  Integration = "Integration"
}

export enum TicketEnvironment {
  Development = "Development",
  Test = "Test",
  Production = "Production"
}

export enum TicketSeverity {
  Critical = "Critical",
  Major = "Major",
  Minor = "Minor",
  Cosmetic = "Cosmetic"
}

export enum TicketRootCause {
  CodeBug = "Code bug",
  DesignFlaw = "Design flaw",
  RequirementsIssue = "Requirements issue",
  ExternalDependency = "External dependency",
  ConfigurationError = "Configuration error"
}

export enum RegressionTestStatus {
  NotStarted = "Not Started",
  InProgress = "In Progress",
  Passed = "Passed",
  Failed = "Failed"
}

interface ITicketingDashboardState {
  currentView: string;
  selectedTicketId?: number;
  allTickets: ITicketItem[];
  myTickets: ITicketItem[];
  isLoading: boolean;
  error?: string;
  ticketService: TicketService;
  currentUserId: number;
}

export default class TicketingDashboard extends React.Component<ITicketingDashboardProps, ITicketingDashboardState> {
  constructor(props: ITicketingDashboardProps) {
    super(props);

    const ticketService = new TicketService();

    this.state = {
      currentView: 'dashboard',
      allTickets: [],
      myTickets: [],
      isLoading: false,
      ticketService,
      currentUserId: 0 // Initialize with default value
    };
  }

  public componentDidMount(): void {
    this.loadTickets().catch(err => console.error("Error loading tickets", err));
  }

  private loadTickets = async (): Promise<void> => {
    this.setState({ isLoading: true, error: undefined });

    try {
      const { ticketService } = this.state;
      const sp = spfi().using(SPFx(this.props.context));

      // Get current user first
      const currentUser = await sp.web.currentUser();
      const currentUserId = currentUser.Id;

      // Then load tickets
      const allTickets = await ticketService.getTickets(sp);
      const myTickets = await ticketService.getMyTickets(currentUserId, sp);

      this.setState({
        allTickets,
        myTickets,
        isLoading: false,
        currentUserId // Save currentUserId in state
      });
      console.log('All Tickets:', allTickets);
    } catch (error) {
      console.error('Error loading tickets:', error);
      this.setState({
        isLoading: false,
        error: 'Failed to load tickets. Please refresh and try again.'
      });
    }
  }

  private showView = (id: string): void => {
    this.setState({ currentView: id });

    if (id === 'dashboard' || id === 'my-tickets') {
      this.loadTickets().catch(err => console.error("Error loading tickets", err));
    }
  }

  private showDetail = (id: number): void => {
    this.setState({
      selectedTicketId: id,
      currentView: 'ticket-detail'
    });
  }

  private handleFormSubmit = async (e: React.FormEvent, formData: ITicketFormData): Promise<void> => {
    e.preventDefault();
    this.setState({ isLoading: true });
    const sp = spfi().using(SPFx(this.props.context));
    try {
      await this.state.ticketService.createTicket(formData, sp);
      await this.loadTickets();
      this.showView('dashboard');
      alert('Ticket submitted successfully!');
    } catch (error) {
      console.error('Error submitting ticket:', error);
      this.setState({
        isLoading: false,
        error: 'Failed to submit ticket. Please try again.'
      });
      alert('Error: Failed to submit ticket. Please try again.');
    }
  }

  private handleTicketUpdate = async (id: number, updates: Partial<ITicketFormData>): Promise<void> => {
    this.setState({ isLoading: true });
    const sp = spfi().using(SPFx(this.props.context));
    try {
      await this.state.ticketService.updateTicket(id, updates as ITicketFormData, sp);
      this.loadTickets().catch(err => console.error("Error loading tickets", err));
      alert('Ticket updated successfully!');
      this.setState({ isLoading: false });
    } catch (error) {
      console.error('Error updating ticket:', error);
      this.setState({
        isLoading: false,
        error: 'Failed to update ticket. Please try again.'
      });
      alert('Error: Failed to update ticket. Please try again.');
    }
  }

  private handleTicketDelete = async (id: number): Promise<void> => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) {
      return;
    }

    this.setState({ isLoading: true });
    const sp = spfi().using(SPFx(this.props.context));

    try {
      await this.state.ticketService.deleteTicket(id, sp);
      this.loadTickets().catch(err => console.error("Error loading tickets", err));
      this.setState({
        isLoading: false,
        currentView: 'dashboard' // Navigate back to dashboard
      });
      alert('Ticket deleted successfully!');
    } catch (error) {
      console.error('Error deleting ticket:', error);
      this.setState({
        isLoading: false,
        error: 'Failed to delete ticket. Please try again.'
      });
      alert('Error: Failed to delete ticket. Please try again.');
    }
  }

  public render(): React.ReactElement<ITicketingDashboardProps> {
    const { context } = this.props;
    const { currentView, selectedTicketId, allTickets, myTickets, isLoading, error } = this.state;
    const sp = spfi().using(SPFx(this.props.context));

    return (
      <div className={styles.ticketManagementApp}>
        <div className={styles.sidebar}>
          <h2>Ticket Management</h2>
          <a
            className={`${styles.navLink} ${currentView === 'dashboard' ? styles.active : ''}`}
            onClick={() => this.showView('dashboard')}
          >
            Tickets
          </a>
          <a
            className={`${styles.navLink} ${currentView === 'my-tickets' ? styles.active : ''}`}
            onClick={() => this.showView('my-tickets')}
          >
            My Tickets
          </a>
          <a
            className={`${styles.navLink} ${currentView === 'new-ticket' ? styles.active : ''}`}
            onClick={() => this.showView('new-ticket')}
          >
            New Ticket
          </a>
        </div>

        <div className={styles.main}>
          {isLoading && (
            <div className={styles.loadingContainer}>
              <Spinner size={SpinnerSize.large} label="Loading..." />
            </div>
          )}

          {error && (
            <div className={styles.errorMessage}>{error}</div>
          )}

          {currentView === 'dashboard' && !isLoading && (
            <DashboardView
              tickets={allTickets}
              onTicketSelect={this.showDetail}
              loading={false}
              context={context}
              currentUserId={this.state.currentUserId}
            />
          )}

          {currentView === 'my-tickets' && !isLoading && (
            <MyTicketsView
              tickets={myTickets}
              onTicketSelect={this.showDetail}
              sp={sp}
              loading={false}
              context={context}
              currentUserId={this.state.currentUserId}
            />
          )}

          {currentView === 'new-ticket' && (
            <NewTicketView
              onSubmit={this.handleFormSubmit}
              context={context}
              onCancel={() => this.showView('dashboard')}
            />
          )}

          {currentView === 'ticket-detail' && selectedTicketId && (
            <TicketDetailView
              ticketId={selectedTicketId}
              onBack={() => this.showView('dashboard')}
              ticketService={this.state.ticketService}
              onUpdate={this.handleTicketUpdate}
              onDelete={this.handleTicketDelete}
              context={context}
            />
          )}
        </div>
      </div>
    );
  }
}
