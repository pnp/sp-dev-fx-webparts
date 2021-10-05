import * as React from 'react';
import styles from './LeadAssistDashboardSettings.module.scss';
import { ILeadAssistDashboardSettingsProps } from './ILeadAssistDashboardSettingsProps';
import DataService from '../../../services/DataService';
import * as strings from 'LeadAssistDashboardWebPartStrings';
import * as settingsStrings from 'LeadAssistDashboardSettingsWebPartStrings';
import { PrimaryButton } from 'office-ui-fabric-react';
import { WidgetSize, Dashboard, IWidget } from '@pnp/spfx-controls-react/lib/Dashboard';

export default class LeadAssistDashboardSettings extends React.Component<ILeadAssistDashboardSettingsProps, {}> {
  private async generateSharePointDemoListsClick(): Promise<void> {  
    await DataService.generateDemoLists();
  }

  private async generateSharePointDemoDataClick(): Promise<void> {  
    await DataService.generateListsDemoData();
  }

  private async generateGraphDemoDataClick(): Promise<void> {  
    await DataService.generateGraphDemoData();
  }

  private async deleteSharePointDemoListsClick(): Promise<void> {  
    await DataService.deleteSharePointDemoLists();
  }
  
  public render(): React.ReactElement<ILeadAssistDashboardSettingsProps> {
    const content: JSX.Element = <Dashboard widgets={this.getDashboardWidgets()} />;
    return (
      <div className={ styles.leadAssistDashboardSettings }>
        {content}
      </div>
    );
  }

  /**
   * Get the dashboard widgets
   * @returns An array of the widgets to be added to the dashboard element
   */
   private getDashboardWidgets() : IWidget[] {
    return [{
      title: settingsStrings.DataSettingsTabTitle,
      size: WidgetSize.Single,
      body: [
        {
          id: "settingsTab",
          title: settingsStrings.DataSettingsTabTitle,
          content: (
            <div className={ styles.container }>
              <div>
                {strings.PropertyPaneDescription}
              </div>
              <br />
              <div>
                {strings.GenerateDemoDataGroupName}
              </div>
              <div>
                <div className={styles.buttonRow}>
                  <PrimaryButton text={strings.GenerateSharePointDemoListsButton} onClick={this.generateSharePointDemoListsClick.bind(this)} />
                </div>
                <div className={styles.buttonRow}>
                  <PrimaryButton text={strings.GenerateSharePointDemoDataButton} onClick={this.generateSharePointDemoDataClick.bind(this)} />
                </div>
                <div className={styles.buttonRow}>
                  <PrimaryButton text={strings.GenerateGraphDemoDataButton} onClick={this.generateGraphDemoDataClick.bind(this)} />
                </div>
              </div>
              <br/>
              <div>
                {strings.CleanDemoDataGroupName}
              </div>
              <div>
                <div className={styles.buttonRow}>
                  <PrimaryButton text={strings.DeleteDemoDataButton} onClick={this.deleteSharePointDemoListsClick.bind(this)} />
                </div>
              </div>
            </div>
          )
        }
      ]
    }];
  }
}
