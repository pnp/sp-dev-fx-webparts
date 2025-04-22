import * as React from 'react';
import styles from './EmpRecognitionWebpart.module.scss';
import type { IEmpRecognitionWebpartProps } from './IEmpRecognitionWebpartProps';
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export interface IEmployeeRecognitionItem {
  Id: number;
  From: {
    Title: string;
    Picture:any
  };
  To: {
    Title: string;
    Picture: any
  };
  Message: string;
  AwardType: string;
  Reactions_Medal: number;
  Reactions_Heart: number;
  Reactions_Clap: number;
  DateRecognized: string;
}

export default class EmpRecognitionWebpart extends React.Component<IEmpRecognitionWebpartProps, { items: IEmployeeRecognitionItem[] }> {
  constructor(props: IEmpRecognitionWebpartProps) {
    super(props);
    this.state = {
      items: []
    };
  }

  public async componentDidMount(): Promise<void> {
    const sp = spfi().using(SPFx(this.props.context)); // Ensure you pass the context from the web part
    try {
      const items = await sp.web.lists.getByTitle("Employee Recognition").items
        .select(
          "Id",
          "From/Title",
          "From/EMail",
          "To/Title",
          "To/EMail",
          "Message",
          "AwardType",
          "Reactions_Medal",
          "Reactions_Heart",
          "Reactions_Clap",
          "DateRecognized"
        )
        .expand("From", "To")(); // Expand the people fields

      console.log("Fetched items:", items); // Debugging: Check the structure of the fetched items

      // Map the data to match the expected structure
      const mappedItems = items.map(item => ({
        Id: item.Id,
        From: {
          Title: item.From?.Title || "Unknown", // Use Title for the display name
          Picture: item.From?.EMail
            ? `https://${this.props.context.pageContext.web.absoluteUrl.split('/')[2]}/_layouts/15/userphoto.aspx?size=L&accountname=${item.From.EMail}`
            : "https://via.placeholder.com/40"
        },
        To: {
          Title: item.To?.Title || "Unknown", // Use Title for the display name
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

      console.log("Mapped items:", mappedItems); // Debugging: Check the structure of the mapped items

      // Update the state with the mapped items
      this.setState({ items: mappedItems });
    } catch (error) {
      console.error("Error fetching Employee Recognition items:", error);
    }
  }

  private async handleReactionClick(itemId: number, reactionType: string): Promise<void> {
    const sp = spfi().using(SPFx(this.props.context)); 
    try {
      // Fetch the current value of the reaction field
      const item = await sp.web.lists.getByTitle("Employee Recognition").items.getById(itemId).select(reactionType)();
      const currentValue = item[reactionType] || 0;

      // Increment the reaction count
      await sp.web.lists.getByTitle("Employee Recognition").items.getById(itemId).update({
        [reactionType]: currentValue + 1
      });

      console.log(`Updated ${reactionType} for item ID: ${itemId}`);

      // Update the state to reflect the new reaction count
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

  public render(): React.ReactElement<IEmpRecognitionWebpartProps> {
    const { items } = this.state;

    return (
      <div className={styles.empRecognitionWebpart}>
        {items.map((item, index) => (
          <div key={index} className={styles.recognitionCard}>
            {/* Sender Info */}
            <div className={styles.senderInfo}>
              <img src={item.From.Picture} alt={item.From.Title} />
              <div>
                <div className={styles.senderName}>{item.From.Title}</div>
                <div className={styles.senderRole}>Employee</div>
              </div>
            </div>

            {/* Recognition Info */}
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

            {/* Message */}
            <div className={styles.message}>
              {item.Message}
            </div>

            {/* Reactions */}
            <div className={styles.reactions}>
              <div
                className={styles.reaction}
                onClick={() => this.handleReactionClick(item.Id, "Reactions_Medal")}
              >
                🥇 {item.Reactions_Medal}
              </div>
              <div
                className={styles.reaction}
                onClick={() => this.handleReactionClick(item.Id, "Reactions_Heart")}
              >
                💖 {item.Reactions_Heart}
              </div>
              <div
                className={styles.reaction}
                onClick={() => this.handleReactionClick(item.Id, "Reactions_Clap")}
              >
                👏 {item.Reactions_Clap}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
