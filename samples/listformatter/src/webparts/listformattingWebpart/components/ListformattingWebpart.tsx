import * as React from 'react';
import { Toggle, MessageBarType } from '@fluentui/react';
import styles from './ListformattingWebpart.module.scss';
import type { IListformattingWebpartProps } from './IListformattingWebpartProps';
import SiteSelector from './SiteSelector';
import ListSelector from './ListSelector';
import ColumnSelector from './ColumnSelector';
import ColumnTypeDisplay from './ColumnTypeDisplay';
import ColumnFormattingSamples from './ColumnFormattingSamples';
import SamplePreview from './SamplePreview';
import ApplyButton from './ApplyButton';
import * as strings from 'ListformattingWebpartWebPartStrings';

export default class ListformattingWebpart extends React.Component<IListformattingWebpartProps, { selectedSiteUrl: string, selectedListId: string, selectedListName: string, selectedColumnName: string, selectedColumnType: string, selectedSampleName: string, includeGenericSamples: boolean, message: string | undefined, messageType: MessageBarType }> {
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
      messageType: MessageBarType.info
    };
  }

  private handleSiteChange = (siteUrl: string): void => {
    this.setState({ selectedSiteUrl: siteUrl, selectedListId: '', selectedListName: '', selectedColumnName: '', selectedColumnType: '', selectedSampleName: '' });
  }

  private handleListChange = (listId: string, listName: string): void => {
    this.setState({ selectedListId: listId, selectedListName: listName, selectedColumnName: '', selectedColumnType: '', selectedSampleName: '' });
  }

  private handleColumnChange = (columnName: string): void => {
    this.setState({ selectedColumnName: columnName });
  }

  private handleColumnTypeChange = (columnType: string): void => {
    this.setState({ selectedColumnType: columnType });
  }

  private handleSampleChange = (sampleName: string): void => {
    this.setState({ selectedSampleName: sampleName });
  }

  private handleToggleChange = (event: React.MouseEvent<HTMLElement>, checked?: boolean): void => {
    this.setState({ includeGenericSamples: checked ?? true });
  }

  private resetInputs = (): void => {
    this.setState({ selectedColumnName: '', selectedSampleName: '' });
  }

  public render(): React.ReactElement<IListformattingWebpartProps> {
    const {
      hasTeamsContext
    } = this.props;

    return (
      <section className={`${styles.listformattingWebpart} ${hasTeamsContext ? styles.teams : ''}`}>
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
            <ColumnFormattingSamples columnType={this.state.selectedColumnType} includeGenericSamples={this.state.includeGenericSamples} onSampleChange={this.handleSampleChange} />
          )}
          {this.state.selectedSampleName && (
            <SamplePreview sampleName={this.state.selectedSampleName} />
          )}
          {this.state.selectedSampleName && (
            <ApplyButton
              selectedList={this.state.selectedListId}
              selectedColumn={this.state.selectedColumnName}
              selectedSample={this.state.selectedSampleName}
              selectedSite={this.state.selectedSiteUrl}
              context={this.props.context}
              selectedListName={this.state.selectedListName}
              resetInputs={this.resetInputs}
            />
          )}
        </div>
      </section>
    );
  }
}