import * as React from 'react';
import { useState } from 'react';
import { Toggle, MessageBar, MessageBarType } from '@fluentui/react';
import styles from './ListformattingWebpart.module.scss';
import SiteSelector from './SiteSelector';
import ListSelector from './ListSelector';
import ColumnSelector from './ColumnSelector';
import ColumnTypeDisplay from './ColumnTypeDisplay';
import SampleGallery from './SampleGallery';
import * as strings from 'ListformattingWebpartWebPartStrings';
import { IListformattingWebpartProps } from './IListformattingWebpartProps';

const ListformattingWebpart: React.FC<IListformattingWebpartProps> = (props) => {
  const [selectedSiteUrl, setSelectedSiteUrl] = useState<string>('');
  const [selectedListId, setSelectedListId] = useState<string>('');
  const [selectedListName, setSelectedListName] = useState<string>('');
  const [selectedColumnName, setSelectedColumnName] = useState<string>('');
  const [selectedColumnType, setSelectedColumnType] = useState<string>('');
  const [selectedSampleName, setSelectedSampleName] = useState<string>('');
  const [includeGenericSamples, setIncludeGenericSamples] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | undefined>(undefined);

  const handleSiteChange = (siteUrl: string): void => {
    setSelectedSiteUrl(siteUrl);
  };

  const handleListChange = (listId: string, listName: string): void => {
    setSelectedListId(listId);
    setSelectedListName(listName);
  };

  const handleColumnChange = (columnName: string, columnType: string): void => {
    setSelectedColumnName(columnName);
    setSelectedColumnType(columnType);
  };

  const handleColumnTypeChange = (columnType: string): void => {
    setSelectedColumnType(columnType);
  };

  const handleSampleSelect = async (sampleName: string): Promise<void> => {
    setSelectedSampleName(sampleName);
  };

  const handleToggleChange = (event: React.MouseEvent<HTMLElement>, checked?: boolean): void => {
    setIncludeGenericSamples(checked ?? true);
  };

  const handleApplySuccess = (message: string): void => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(undefined);
    }, 3000); 
  };

  const resetInputs = (): void => {
    setSelectedColumnName('');
    setSelectedSampleName('');
  };

  return (
    <section className={`${styles.listformattingWebpart} ${props.hasTeamsContext ? styles.teams : ''}`}>
      {successMessage && (
        <MessageBar messageBarType={MessageBarType.success} onDismiss={() => setSuccessMessage(undefined)}>
          {successMessage}
        </MessageBar>
      )}
      <div>
        <h2>{strings.Title}</h2>
        <p>
          {strings.Description}{strings.PoweredBy}
          <a href="https://github.com/pnp/sp-dev-list-formatting" target="_blank" rel="noopener noreferrer">{strings.Credits}</a>
          {strings.MadeBy}
          <a href="https://linkedin.com/in/luisefreese" target="_blank" rel="noopener noreferrer">{strings.Author}</a>
        </p>
        <SiteSelector context={props.context} onSiteChange={handleSiteChange} />
        <ListSelector siteUrl={selectedSiteUrl} context={props.context} onListChange={handleListChange} />
        <ColumnSelector siteUrl={selectedSiteUrl} context={props.context} listId={selectedListId} onColumnChange={handleColumnChange} />
        <ColumnTypeDisplay siteUrl={selectedSiteUrl} context={props.context} listId={selectedListId} columnName={selectedColumnName} onColumnTypeChange={handleColumnTypeChange} />
        <Toggle
          label={strings.IncludeGenericSamples}
          checked={includeGenericSamples}
          onChange={handleToggleChange}
        />
        {selectedColumnName && (
          <SampleGallery
            columnType={selectedColumnType}
            includeGenericSamples={includeGenericSamples}
            onSampleSelect={handleSampleSelect}
            selectedList={selectedListId}
            selectedColumn={selectedColumnName}
            selectedSample={selectedSampleName}
            selectedSite={selectedSiteUrl}
            context={props.context}
            selectedListName={selectedListName}
            resetInputs={resetInputs}
            disabled={!selectedListId || !selectedColumnName || !selectedSampleName}
            onSuccess={handleApplySuccess}
          />
        )}
      </div>
    </section>
  );
};

export default ListformattingWebpart;