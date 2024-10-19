import * as React from 'react';
import { useEffect, useState } from 'react';
import { IDropdownOption, MessageBarType, MessageBar } from '@fluentui/react';
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";
import "@pnp/sp/context-info";
import styles from './SvgToJson.module.scss';
import { ISvgToJsonProps } from './ISvgToJsonProps';
import SVGInput from './SVGInput';
import SVGOutput from './SVGOutput';
import ConvertButton from './ConvertButton';
import ListColumnSelector from './ListColumnSelector';
import Message from './Message';
import ToggleSwitch from './ToggleSwitch';
import ApplyButton from './ApplyButton';
import SiteSelector from './SiteSelector';

interface IJsonResult {
  elmType: string;
  attributes: { [key: string]: string | null };
  style: { [key: string]: string };
  children: IJsonResult[];
}

const SvgToJson: React.FC<ISvgToJsonProps> = (props) => {
  const [svgFiles, setSvgFiles] = useState<IDropdownOption[]>([]);
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

  useEffect((): void => {
    const fetchSvgFiles = async (): Promise<void> => {
      try {
        const fullSiteUrl = props.siteUrl;
        console.log('Fetching SVG files from site:', fullSiteUrl);
        console.log('Using library name:', props.libraryName);

        const sp = spfi(fullSiteUrl).using(SPFx(props.context));

        const items = await sp.web.lists.getByTitle(props.libraryName).items.select("FileLeafRef")();
        const svgOptions: IDropdownOption[] = items.map((item: { FileLeafRef: string }) => ({
          key: item.FileLeafRef,
          text: item.FileLeafRef
        }));
        setSvgFiles(svgOptions);
      } catch (error) {
        setMessage(`Error fetching SVG files: ${error.message}`);
        setMessageType(MessageBarType.error);
      }
    };

    if (props.siteUrl && props.libraryName) {
      fetchSvgFiles();
    }
  }, [props.siteUrl, props.libraryName, props.context]);

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

  const applyColumnFormatting = async (): Promise<void> => {
    if (!selectedList || !selectedColumn || !jsonResult) {
      setMessage('Please select a list, column, and generate JSON result before applying formatting.');
      setMessageType(MessageBarType.error);
      return;
    }

    try {
      const fullSiteUrl = selectedSite!;
      const sp = spfi(fullSiteUrl).using(SPFx(props.context));

      const { FormDigestValue: formDigestValue } = await sp.web.getContextInfo();
      console.log(formDigestValue);
      await sp.web.lists.getById(selectedList!).fields.getByInternalNameOrTitle(selectedColumn!).update({
        CustomFormatter: jsonResult
      }, `${formDigestValue}`);

      setMessage('Column formatting applied successfully!');
      setMessageType(MessageBarType.success);

      const listUrl = `${selectedSite}/Lists/${selectedListName}/AllItems.aspx`;
      window.open(listUrl, '_blank');
    } catch (error) {
      console.error('Error applying column formatting:', error);
      setMessage(`Error applying column formatting: ${error.message}`);
      setMessageType(MessageBarType.error);
    }
  };

  const handleFileChange = async (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
    if (option) {
      const fileKey = String(option.key); // Ensure key is treated as a string
      const siteRelativeUrl = new URL(props.siteUrl).pathname;
      const fileUrl = `${siteRelativeUrl}/${props.libraryName}/${fileKey}`;
      const apiUrl = `${props.siteUrl}/_api/web/getfilebyserverrelativeurl('${fileUrl}')/$value`;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const svgText = await response.text();
        setSvgContent(svgText);
      } catch (error) {
        console.error('Error fetching SVG content:', error);
        setMessage(`Error fetching SVG content: ${error.message}`);
        setMessageType(MessageBarType.error);
      }
    }
  };

  const convertSvgToJson = async (): Promise<void> => {
    if (!svgContent) {
      setMessage('No SVG content to convert.');
      setMessageType(MessageBarType.error);
      return;
    }

    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
    const paths = Array.from(svgDoc.getElementsByTagName('path'));

    const result: IJsonResult = {
      elmType: "div",
      attributes: {},
      style: {},
      children: [
        {
          elmType: "svg",
          attributes: {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: svgDoc.documentElement.getAttribute('viewBox'),
            style: "max-width: 48px; max-height: 48px;"
          },
          style: {
            width: "100%",
            height: "100%",
            maxWidth: "48px",
            maxHeight: "48px"
          },
          children: []
        }
      ]
    };

    paths.forEach((path: SVGPathElement) => {
      const pathObj: IJsonResult = {
        elmType: "path",
        attributes: {
          d: path.getAttribute('d')
        },
        style: {
          fill: path.getAttribute('fill') || "#000000"
        },
        children: []
      };
      result.children[0].children.push(pathObj);
    });

    const jsonString = JSON.stringify(result, null, 2);
    setJsonResult(jsonString);
    setMessage(null);
    setIsConverted(true); // Set conversion state to true

    // Copy JSON result to clipboard
    try {
      await navigator.clipboard.writeText(jsonString);
      setMessage('Converted to JSON and copied to clipboard!');
      setMessageType(MessageBarType.success);
    } catch (error) {
      setMessage('Failed to copy to clipboard.');
      setMessageType(MessageBarType.error);
    }
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
      <div style={{ marginBottom: '10px' }} /> {/* Added margin */}
      <SVGInput svgFiles={svgFiles} onChange={handleFileChange} />
      <div style={{ marginBottom: '10px' }} /> {/* Added margin */}
      <SVGOutput svgContent={svgContent} />
      <ConvertButton
        isConverted={isConverted}
        svgContent={svgContent}
        convertSvgToJson={convertSvgToJson}
      />
      <ToggleSwitch applyToColumn={applyToColumn} setApplyToColumn={setApplyToColumn} />
      {applyToColumn && (
        <>
          <SiteSelector context={props.context} onSiteChange={handleSiteChange} className={styles.dropdown} />
          <ListColumnSelector
            siteUrl={selectedSite!} 
            context={props.context}
            onListChange={handleListChange}
            onColumnChange={handleColumnChange}
            className={styles.dropdown}
/>
          <ApplyButton applyColumnFormatting={applyColumnFormatting} />
        </>
      )}
    </div>
  );
};

export default SvgToJson;