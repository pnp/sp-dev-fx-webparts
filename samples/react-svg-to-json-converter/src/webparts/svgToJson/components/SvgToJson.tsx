import * as React from 'react';
import { useState } from 'react';
import { MessageBarType, MessageBar } from '@fluentui/react';
import styles from './SvgToJson.module.scss';
import { ISvgToJsonProps } from './ISvgToJsonProps';
import SVGInput from './SVGInput';
import SVGOutput from './SVGOutput';
import ConvertButton from './ConvertButton';
import ListSelector from './ListSelector';
import ColumnSelector from './ColumnSelector';
import Message from './Message';
import ToggleSwitch from './ToggleSwitch';
import ApplyButton from './ApplyButton';
import SiteSelector from './SiteSelector';

const SvgToJson: React.FC<ISvgToJsonProps> = (props) => {
  const [svgContent, setSvgContent] = useState<string>('');
  const [jsonResult, setJsonResult] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);
  const [selectedSite, setSelectedSite] = useState<string | null>(props.siteUrl); // Initialize with props.siteUrl
  const [selectedList, setSelectedList] = useState<string | null>(null);
  const [selectedListName, setSelectedListName] = useState<string | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const [applyToColumn, setApplyToColumn] = useState<boolean>(false);
  const [isConverted, setIsConverted] = useState<boolean>(false); // New state to track conversion

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

  if (!props.siteUrl || !props.libraryName) {
    return (
      <MessageBar messageBarType={MessageBarType.warning}>
        Please configure the web part in the property pane.
      </MessageBar>
    );
  }

  return (
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
      <ConvertButton
        isConverted={isConverted}
        svgContent={svgContent}
        setJsonResult={setJsonResult}
        setMessage={setMessage}
        setMessageType={setMessageType}
        setIsConverted={setIsConverted}
      />
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
          />
        </>
      )}
    </div>
  );
};

export default SvgToJson;