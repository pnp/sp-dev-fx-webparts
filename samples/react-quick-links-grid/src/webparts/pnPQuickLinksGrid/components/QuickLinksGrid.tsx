import * as React from 'react';
import { Icon } from '@fluentui/react';
import styles from '../PnPQuickLinksGridWebPart.module.scss';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

// Interface for a single quick link item
export interface IQuickLink {
  title: string;
  url: string;
  iconName: string;
}

// Props expected by the QuickLinks component
export interface IQuickLinksProps {
  context: any;  // Consider typing this more specifically if possible
  listTitle: string;  // SharePoint list title
  titleField: string; // Field for link titles
  urlField: string;   // Field for link URLs
  iconField: string;  // Field for link icons
}

// State for the QuickLinks component
export interface IQuickLinksState {
  quickLinks: IQuickLink[];  // Array of quick links
}

// QuickLinks component
class QuickLinks extends React.Component<IQuickLinksProps, IQuickLinksState> {
  constructor(props: IQuickLinksProps) {
    super(props);
    this.state = {
      quickLinks: []
    };
  }

  // Fetch data when the component mounts
  public async componentDidMount(): Promise<void> {   
    await this.fetchListItems();
  }

  // Fetch list items from SharePoint and update state
  private async fetchListItems(): Promise<void> {
    const { listTitle, titleField, urlField, iconField, context } = this.props;
    const apiUrl = `${context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('${listTitle}')/items?$select=${titleField},${urlField},${iconField}`;

    try {
      const response: SPHttpClientResponse = await context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
      const data = await response.json();
     
      // Map SharePoint list data to quick links
      const quickLinks: IQuickLink[] = data.value.map((item: any) => ({
        title: item[titleField],
        url: item[urlField],
        iconName: item[iconField]
      }));

      // Update state with fetched quick links
      this.setState({ quickLinks });
    } catch (error) {
      console.error('Error fetching list items:', error);
    }
  }

  // Render the quick links in a grid
  public render(): React.ReactElement<IQuickLinksProps> {
    return (
      <div className={styles.quickLinks}>
        <div className={styles.grid}>
          {this.state.quickLinks.map((link, index) => (
            <div key={index} className={styles.gridItem}>
              <a href={link.url}>
                <Icon iconName={link.iconName} className={styles.icon} />
                <div>{link.title}</div>
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default QuickLinks;
