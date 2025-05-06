import * as React from 'react';
import styles from './EmpRecognitionWebpart.module.scss';
import type { IEmpRecognitionWebpartProps } from './IEmpRecognitionWebpartProps';
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import AddRecognitionForm from './AddRecognitionForm';

export interface IEmployeeRecognitionItem {
  Id: number;
  From: {
    Title: string;
    Picture: any;
    JobTitle: string; // Add this field
  };
  To: {
    Title: string;
    Picture: any;
  };
  Message: string;
  AwardType: string;
  Reactions_Medal: number;
  Reactions_Heart: number;
  Reactions_Clap: number;
  DateRecognized: string;
}

export default class EmpRecognitionWebpart extends React.Component<IEmpRecognitionWebpartProps, {
  items: IEmployeeRecognitionItem[];
  isModalOpen: boolean;
  showAddForm: boolean; // New state to track whether to show the form
}> {
  constructor(props: IEmpRecognitionWebpartProps) {
    super(props);
    this.state = {
      items: [],
      isModalOpen: false,
      showAddForm: false // Initialize as hidden
    };
  }

  public async componentDidMount(): Promise<void> {
    await this.fetchItems();
  }

  private async fetchItems(): Promise<void> {
    const sp = spfi().using(SPFx(this.props.context));
    try {
      const items = await sp.web.lists.getByTitle("Employee Recognition").items
        .select(
          "Id",
          "From/Title",
          "From/EMail",
          "From/JobTitle", // Add this field
          "To/Title",
          "To/EMail",
          "Message",
          "AwardType",
          "Reactions_Medal",
          "Reactions_Heart",
          "Reactions_Clap",
          "DateRecognized"
        )
        .expand("From", "To")();

      const mappedItems = items.map(item => ({
        Id: item.Id,
        From: {
          Title: item.From?.Title || "Unknown",
          JobTitle: item.From?.JobTitle || "Team Member", // Add this field with a fallback
          Picture: item.From?.EMail
            ? `https://${this.props.context.pageContext.web.absoluteUrl.split('/')[2]}/_layouts/15/userphoto.aspx?size=L&accountname=${item.From.EMail}`
            : "https://via.placeholder.com/40"
        },
        To: {
          Title: item.To?.Title || "Unknown",
          Picture: item.To?.EMail
            ? `https://${this.props.context.pageContext.web.absoluteUrl.split('/')[2]}/_layouts/15/userphoto.aspx?size=L&accountname=${item.To.EMail}`
            : "https://via.placeholder.com/48"
        },
        Message: item.Message,
        AwardType: item.AwardType,
        Reactions_Medal: item.Reactions_Medal,
        Reactions_Heart: item.Reactions_Heart,
        Reactions_Clap: item.Reactions_Clap,
        DateRecognized: item.DateRecognized
      }));

      this.setState({ items: mappedItems });
    } catch (error) {
      console.error("Error fetching Employee Recognition items:", error);
    }
  }

  private async handleReactionClick(itemId: number, reactionType: string): Promise<void> {
    const sp = spfi().using(SPFx(this.props.context));
    try {
      const item = await sp.web.lists.getByTitle("Employee Recognition").items.getById(itemId).select(reactionType)();
      const currentValue = item[reactionType] || 0;

      await sp.web.lists.getByTitle("Employee Recognition").items.getById(itemId).update({
        [reactionType]: currentValue + 1
      });

      this.setState(prevState => ({
        items: prevState.items.map(item =>
          item.Id === itemId
            ? { ...item, [reactionType]: currentValue + 1 }
            : item
        )
      }));
    } catch (error) {
      console.error(`Error updating ${reactionType} for item ID: ${itemId}`, error);
    }
  }

  private toggleAddForm = (): void => {
    this.setState(prevState => ({ showAddForm: !prevState.showAddForm }));
  };

  private handleFormSubmitted = (): void => {
    this.setState({ showAddForm: false });
    this.fetchItems(); // Refresh the items list
  };



  public render(): React.ReactElement<IEmpRecognitionWebpartProps> {
    const { items, showAddForm } = this.state;

    return (
      <div className={styles.empRecognitionWebpart}>
        <button
          onClick={this.toggleAddForm}
          className={styles.openModalButton}
        >
          {showAddForm ? 'Hide Form' : 'Add New Recognition'}
        </button>

        {showAddForm && (

          <AddRecognitionForm
            context={this.props.context}
            listName="Employee Recognition"
            onItemAdded={this.handleFormSubmitted}
          />

        )}

        <div className={styles.cardsContainer}>
          {items.map((item, index) => (
            <div key={index} className={styles.recognitionCard}>
              {/* Card content - no changes needed here */}
              <div className={styles.senderInfo}>
                <div className={styles.senderLabel}>Commended by:</div>
                <div className={styles.senderDetails}>
                  <img src={item.From.Picture} alt={item.From.Title} />
                  <div>
                    <div className={styles.senderName}>{item.From.Title}</div>
                    <div className={styles.senderRole}>{item.From.JobTitle}</div>
                  </div>
                </div>
              </div>

              <div className={styles.recognition}>
                <img src={item.To.Picture} alt={item.To.Title} />
                <div className={styles.recognitionText}>
                  <div className={styles.trophyIcon}>🏆</div>
                  <div className={styles.championDetails}>
                    <div className={styles.championName}>{item.To.Title}</div>
                    <div className={styles.championTitle}>{item.AwardType}</div>
                  </div>
                </div>
              </div>

              <div className={styles.message}>{item.Message}</div>

              <div className={styles.reactions}>
                <div onClick={() => this.handleReactionClick(item.Id, "Reactions_Medal")}>🥇 {item.Reactions_Medal}</div>
                <div onClick={() => this.handleReactionClick(item.Id, "Reactions_Heart")}>💖 {item.Reactions_Heart}</div>
                <div onClick={() => this.handleReactionClick(item.Id, "Reactions_Clap")}>👏 {item.Reactions_Clap}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
