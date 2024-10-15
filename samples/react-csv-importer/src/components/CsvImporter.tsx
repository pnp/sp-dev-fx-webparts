import * as React from 'react';
import styles from './CsvImporter.module.scss';
import { ICsvImporterProps } from './ICsvImporterProps';
import { BaseRow, Importer, ImporterField, ImportInfo } from 'react-csv-importer';
import 'react-csv-importer/dist/index.css';
import { Logger, LogLevel } from '@pnp/logging';
import { WebPartTitle } from '@pnp/spfx-controls-react';
import { isEmpty } from '@microsoft/sp-lodash-subset';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { MessageBar, MessageBarType } from '@fluentui/react';
import * as strings from 'CsvImporterWebPartStrings';
import { useList } from "../hooks";

export const CsvImporter: React.FunctionComponent<ICsvImporterProps> = ({
  title, listId, showListTitle, displayMode, updateProperty, onConfigure, hasTeamsContext, chunkSize
}) => {
  const LOG_SOURCE = 'CsvImporter';

  const [error, setError] = React.useState<string>("");
  const [key, setKey] = React.useState(0);
  const { addListItems, listTitle, fields } = useList(listId, chunkSize);

  const handleOnstart = (info: ImportInfo): void => {
    const { file, fields } = info;
    Logger.write(`${LOG_SOURCE} - handleOnstart - Starting import of file ${file.name} (${file.size} bytes), with fields: ${fields}`, LogLevel.Info);
  }

  const handleProcessChunk = async (rows: BaseRow[], { startIndex, endIndex, totalRows }: { startIndex: number; endIndex: number; totalRows: number }): Promise<void> => {
    Logger.write(`${LOG_SOURCE} - handleProcessChunk - Processing rows ${startIndex} to ${endIndex} of ${totalRows}`, LogLevel.Info);
    try {
      const result = await addListItems(listId, rows);
      if (!isEmpty(result)) {
        setError(JSON.stringify(result));
      }
    } catch (err) {
      setError(err.message);
    }
  }

  const handleOnClose = (): void => {
    Logger.write(`${LOG_SOURCE} - handleOnClose - Import is done and user clicked [Finish]`, LogLevel.Info);
    setKey(key => key + 1);
    setError(null);
  }

  return (
    <section className={`${styles.csvImporter} ${hasTeamsContext ? styles.teams : ''}`}>
      <WebPartTitle displayMode={displayMode}
        title={title}
        updateProperty={updateProperty} />
      {showListTitle ? <div className={styles.title}>{listTitle}</div> : null}
      {isEmpty(listId) ?
        <Placeholder
          iconName='Edit'
          iconText={strings.PlaceholderIconText}
          description={strings.PlaceholderDescription}
          buttonLabel={strings.PlaceholderButtonLabel}
          onConfigure={onConfigure}
        />
        :
        <>
          <Importer
            key={key}
            defaultNoHeader={false}
            restartable={false}
            onStart={handleOnstart}
            dataHandler={handleProcessChunk}
            onClose={handleOnClose}
            chunkSize={chunkSize}
          >
            {fields?.map(({ InternalName, Title, Required }, i) => (<ImporterField key={i} name={InternalName} label={Title} optional={!Required} />))}
          </Importer>
          {!isEmpty(error) ?
            <MessageBar
              messageBarType={MessageBarType.error}
              dismissButtonAriaLabel={strings.MessageBarDismissButtonAriaLabel}
              expandButtonProps={{ ariaLabel: strings.MessageBarOverflowButtonAriaLabel }}
              isMultiline={false}
              truncated={true}
            >
              <b>{strings.MessageBarDescription}</b>
              <small>{error}</small>
            </MessageBar> : null}
        </>
      }
    </section>
  );
}
