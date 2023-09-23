import * as React from 'react';
import styles from './CsvImporter.module.scss';
import { ICsvImporterProps } from './ICsvImporterProps';
import { BaseRow, Importer, ImporterField, ImportInfo } from 'react-csv-importer';
import 'react-csv-importer/dist/index.css';
import { Logger, LogLevel } from '@pnp/logging';
import { WebPartTitle } from '@pnp/spfx-controls-react';
import { isEmpty } from '@microsoft/sp-lodash-subset';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { MessageBar, MessageBarType } from 'office-ui-fabric-react';
import * as strings from 'CsvImporterWebPartStrings';
import { useList } from "../hooks";

export const CsvImporter: React.FunctionComponent<ICsvImporterProps> = (props) => {
  const LOG_SOURCE: string = 'CsvImporter';

  const [error, setError] = React.useState<string>("");
  const [key, setKey] = React.useState(0);
  const { title, listId, showListTitle, displayMode, updateProperty, onConfigure, hasTeamsContext } = props;
  const { addListItems, listTitle, fields } = useList(listId);

  const handleOnstart = (info: ImportInfo): void => {
    const { file, fields } = info;
    Logger.write(`${LOG_SOURCE} - handleOnstart - Starting import of file ${file.name} (${file.size} bytes), with fields: ${fields}`, LogLevel.Info);
  }

  const handleProcessChunk = async (rows: BaseRow[]): Promise<void> => {
    Logger.write(`${LOG_SOURCE} - handleProcessChunk - Received batch of ${rows.length} rows`, LogLevel.Info);
    const result = await addListItems(listId, rows);
    if (!isEmpty(result)) setError(JSON.stringify(result));
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
            assumeNoHeaders={false}
            restartable={false}
            onStart={handleOnstart}
            processChunk={handleProcessChunk}
            onClose={handleOnClose}
          >
            {fields?.map((field, i) => (<ImporterField key={i} name={field.InternalName} label={field.Title} optional={!field.Required} />))}
          </Importer>
          {!isEmpty(error) ?
            <MessageBar
              messageBarType={MessageBarType.error}
              dismissButtonAriaLabel={strings.MessageBarDismissButtonAriaLabel}
              overflowButtonAriaLabel={strings.MessageBarOverflowButtonAriaLabel}
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
