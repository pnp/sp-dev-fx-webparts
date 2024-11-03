import * as React from 'react';
import { Toggle, MessageBar, MessageBarType } from '@fluentui/react';
import styles from './ListformattingWebpart.module.scss';
import type { IListformattingWebpartProps } from './IListformattingWebpartProps';
import SiteSelector from './SiteSelector';
import ListSelector from './ListSelector';
import ColumnSelector from './ColumnSelector';
import ColumnTypeDisplay from './ColumnTypeDisplay';
import SampleGallery from './SampleGallery';
import ApplyButton from './ApplyButton';
import * as strings from 'ListformattingWebpartWebPartStrings';

export default class ListformattingWebpart extends React.Component<IListformattingWebpartProps, { selectedSiteUrl: string, selectedListId: string, selectedListName: string, selectedColumnName: string, selectedColumnType: string, selectedSampleName: string, includeGenericSamples: boolean, message: string | undefined, messageType: MessageBarType, successMessage: string | undefined }> {
  constructor(props: IListformattingWebpartProps) {
    super(props);
    this.state = {
      selectedSiteUrl: '',
      selectedListId: '',
      selectedListName: '',
      selectedColumnName: '',
      selectedColumnType: '',
      selectedSampleName: '',
      includeGenericSamples: true, // Default to YES
      message: undefined,
      messageType: MessageBarType.info,
      successMessage: undefined
    };
  }

  private handleSiteChange = (siteUrl: string): void => {
    this.setState({ selectedSiteUrl: siteUrl });
  }

  private handleListChange = (listId: string, listName: string): void => {
    this.setState({ selectedListId: listId, selectedListName: listName });
  }

  private handleColumnChange = (columnName: string, columnType: string): void => {
    this.setState({ selectedColumnName: columnName, selectedColumnType: columnType });
  }

  private handleColumnTypeChange = (columnType: string): void => {
    this.setState({ selectedColumnType: columnType });
  }

  private handleSampleSelect = (sampleName: string): void => {
    this.setState({ selectedSampleName: sampleName });
  }

  private handleToggleChange = (event: React.MouseEvent<HTMLElement>, checked?: boolean): void => {
    this.setState({ includeGenericSamples: checked ?? true });
  }

  private resetInputs = (): void => {
    this.setState({ selectedColumnName: '', selectedSampleName: '' });
  }

  private handleApplySuccess = (message: string): void => {
    this.setState({ successMessage: message });
  }

  public render(): React.ReactElement<IListformattingWebpartProps> {
    const {
      hasTeamsContext
    } = this.props;

    return (
      <section className={`${styles.listformattingWebpart} ${hasTeamsContext ? styles.teams : ''}`}>
        {this.state.successMessage && (
          <MessageBar messageBarType={MessageBarType.success} onDismiss={() => this.setState({ successMessage: undefined })}>
            {this.state.successMessage}
          </MessageBar>
        )}
        <div>
          <h2>{strings.Title}</h2>
          <SiteSelector context={this.props.context} onSiteChange={this.handleSiteChange} />
          <ListSelector siteUrl={this.state.selectedSiteUrl} context={this.props.context} onListChange={this.handleListChange} />
          <ColumnSelector siteUrl={this.state.selectedSiteUrl} context={this.props.context} listId={this.state.selectedListId} onColumnChange={this.handleColumnChange} />
          <ColumnTypeDisplay siteUrl={this.state.selectedSiteUrl} context={this.props.context} listId={this.state.selectedListId} columnName={this.state.selectedColumnName} onColumnTypeChange={this.handleColumnTypeChange} />
          <Toggle
            label={strings.IncludeGenericSamples}
            checked={this.state.includeGenericSamples}
            onChange={this.handleToggleChange}
          />
          {this.state.selectedColumnName && (
            <SampleGallery columnType={this.state.selectedColumnType} includeGenericSamples={this.state.includeGenericSamples} onSampleSelect={this.handleSampleSelect} />
          )}
          <div className={styles.applyButtonContainer}>
            <ApplyButton
              onApply={() => console.log('Apply button clicked')}
              selectedList={this.state.selectedListId}
              selectedColumn={this.state.selectedColumnName}
              selectedSample={this.state.selectedSampleName}
              selectedSite={this.state.selectedSiteUrl}
              context={this.props.context}
              selectedListName={this.state.selectedListName}
              resetInputs={this.resetInputs}
              disabled={false}
              onSuccess={this.handleApplySuccess}
            />
          </div>
        </div>
      </section>
    );
  }
}