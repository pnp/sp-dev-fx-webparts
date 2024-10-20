import * as React from 'react';
import { useState, useEffect } from 'react';
import { MessageBarType, MessageBar, TextField, PrimaryButton } from '@fluentui/react';
import { getTheme, ThemeProvider } from '@fluentui/react';
import { ISvgToJsonProps } from './ISvgToJsonProps';
import SVGInput from './SVGInput';
import SVGOutput from './SVGOutput';
import ConvertButton from './ConvertButton';
import ResetButton from './ResetButton';
import ApplyButton from './ApplyButton';
import ListSelector from './ListSelector';
import ColumnSelector from './ColumnSelector';
import Message from './Message';
import ToggleSwitch from './ToggleSwitch';
import SiteSelector from './SiteSelector';
import styles from './SvgToJson.module.scss';

const SvgToJson: React.FC<ISvgToJsonProps> = (props) => {
  const [svgContent, setSvgContent] = useState<string>('');
  const [jsonResult, setJsonResult] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);
  const [selectedSite, setSelectedSite] = useState<string | null>(props.siteUrl);
  const [libraryName, setLibraryName] = useState<string | null>(props.libraryName); // Use state for libraryName
  const [selectedList, setSelectedList] = useState<string | null>(null);
  const [selectedListName, setSelectedListName] = useState<string | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const [applyToColumn, setApplyToColumn] = useState<boolean>(false);
  const [isConverted, setIsConverted] = useState<boolean>(false);
  const [isTeams, setIsTeams] = useState<boolean>(false);

  useEffect(() => {
    if (props.context.sdks.microsoftTeams) {
      setIsTeams(true);
    }
  }, [props.context]);

  const handleSiteChange = (siteUrl: string): void => {
    setSelectedSite(siteUrl);
  };

  const handleListChange = (listId: string, listName: string): void => {
    setSelectedList(listId);
    setSelectedListName(listName);
  };

  const handleColumnChange = (columnName: string): void => {
    setSelectedColumn(columnName);
  };

  const resetInputs = (): void => {
    setSvgContent('');
    setJsonResult('');
    setMessage(null);
    setMessageType(MessageBarType.info);
    setSelectedSite(props.siteUrl);
    setLibraryName(props.libraryName); // Reset libraryName state
    setSelectedList(null);
    setSelectedListName(null);
    setSelectedColumn(null);
    setApplyToColumn(false);
    setIsConverted(false);
  };

  const handleSaveConfiguration = (): void => {
    // Save the configuration to web part properties
    props.siteUrl = selectedSite!;
    props.libraryName = libraryName!;
    props.context.propertyPane.refresh();
    setMessage('Configuration saved successfully.');
    setMessageType(MessageBarType.success);
  };

  const theme = getTheme();

  if (!props.siteUrl || !props.libraryName) {
    if (isTeams) {
      return (
        <ThemeProvider theme={theme}>
          <div className={styles.svgToJson}>
            <MessageBar messageBarType={MessageBarType.warning}>
              Let's configure this app first.
            </MessageBar>
            <TextField
              label="Site URL"
              value={selectedSite || ''}
              onChange={(e, newValue) => setSelectedSite(newValue || '')}
              className={styles.inputField}
            />
            <TextField
              label="Library Name"
              value={libraryName || ''}
              onChange={(e, newValue) => setLibraryName(newValue || '')}
              className={styles.inputField}
            />
            <PrimaryButton text="Save Configuration" onClick={handleSaveConfiguration} className={styles.saveButton} />
          </div>
        </ThemeProvider>
      );
    }
    return (
      <ThemeProvider theme={theme}>
        <MessageBar messageBarType={MessageBarType.warning}>
          Please configure the web part in the property pane.
        </MessageBar>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.svgToJson}>
        <Message message={message} messageType={messageType} />
        <SVGInput
          siteUrl={props.siteUrl}
          libraryName={props.libraryName}
          context={props.context}
          setSvgContent={setSvgContent}
          setMessage={setMessage}
          setMessageType={setMessageType}
        />
        <SVGOutput svgContent={svgContent} />
        <div className={styles.buttonContainer}>
          <ResetButton resetInputs={resetInputs} className={styles.buttonMargin} />
          <ConvertButton
            svgContent={svgContent}
            setJsonResult={setJsonResult}
            setMessage={setMessage}
            setMessageType={setMessageType}
            setIsConverted={setIsConverted}
            isConverted={isConverted}
          />
        </div>
        <ToggleSwitch applyToColumn={applyToColumn} setApplyToColumn={setApplyToColumn} />
        {applyToColumn && (
          <>
           
            <SiteSelector context={props.context} onSiteChange={handleSiteChange} className={styles.dropdown} />
            <ListSelector
              siteUrl={selectedSite!}
              context={props.context}
              onListChange={handleListChange}
            />
            <ColumnSelector
              siteUrl={selectedSite!}
              context={props.context}
              listId={selectedList}
              onColumnChange={handleColumnChange}
            />
            <ApplyButton
              selectedList={selectedList}
              selectedColumn={selectedColumn}
              jsonResult={jsonResult}
              selectedSite={selectedSite}
              context={props.context}
              setMessage={setMessage}
              setMessageType={setMessageType}
              selectedListName={selectedListName}
              resetInputs={resetInputs}
            />
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default SvgToJson;