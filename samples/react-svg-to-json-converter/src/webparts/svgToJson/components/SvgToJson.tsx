import * as React from 'react';
import { useEffect, useState } from 'react';
import { IDropdownOption, MessageBarType } from '@fluentui/react';
import styles from './SvgToJson.module.scss';
import { ISvgToJsonProps } from './ISvgToJsonProps';
import SVGInput from './SVGInput';
import SVGOutput from './SVGOutput';
import ConvertButton from './ConvertButton';
import ListColumnSelector from './ListColumnSelector';
import Message from './Message';
import ToggleSwitch from './ToggleSwitch';
import ApplyButton from './ApplyButton';

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
  const [selectedList, setSelectedList] = useState<string | null>(null);
  const [selectedListName, setSelectedListName] = useState<string | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const [applyToColumn, setApplyToColumn] = useState<boolean>(false);
  const [isConverted, setIsConverted] = useState<boolean>(false); // New state to track conversion

  useEffect((): void => {
    const fetchSvgFiles = async (): Promise<void> => {
      try {
        const response = await fetch(`${props.siteUrl}/_api/web/lists/getbytitle('${props.libraryName}')/items?$select=FileLeafRef,Status`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseText = await response.text();
        console.log('Response text:', responseText);

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(responseText, 'application/xml');
        console.log('Parsed XML Document:', xmlDoc);

        const entries = xmlDoc.getElementsByTagName('entry');
        console.log('Entries:', entries);

        const svgOptions: IDropdownOption[] = Array.from(entries).map(entry => {
          const fileLeafRefElement = entry.getElementsByTagNameNS('http://schemas.microsoft.com/ado/2007/08/dataservices', 'FileLeafRef')[0];
          const fileName = fileLeafRefElement ? fileLeafRefElement.textContent : '';
          console.log('File name:', fileName);
          return { key: fileName || '', text: fileName || '' };
        });
        setSvgFiles(svgOptions);
      } catch (error) {
        console.error('Error fetching SVG files:', error);
        setMessage(`Error fetching SVG files: ${error.message}`);
        setMessageType(MessageBarType.error);
      }
    };

    fetchSvgFiles();
  }, [props.siteUrl, props.libraryName]);

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
      console.log('Applying column formatting:', {
        selectedList,
        selectedColumn,
        jsonResult
      });

      const digestResponse = await fetch(`${props.siteUrl}/_api/contextinfo`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json;odata=verbose',
          'Content-Type': 'application/json;odata=verbose'
        }
      });

      if (!digestResponse.ok) {
        const errorText = await digestResponse.text();
        throw new Error(`HTTP error! status: ${digestResponse.status}, response: ${errorText}`);
      }

      const digestData = await digestResponse.json();
      const formDigestValue = digestData.d.GetContextWebInformation.FormDigestValue;

      const response = await fetch(`${props.siteUrl}/_api/web/lists(guid'${selectedList}')/fields/getbyinternalnameortitle('${selectedColumn}')`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json;odata=verbose',
          'Content-Type': 'application/json;odata=verbose',
          'X-HTTP-Method': 'MERGE',
          'IF-MATCH': '*',
          'X-RequestDigest': formDigestValue
        },
        body: JSON.stringify({
          __metadata: { type: 'SP.Field' },
          CustomFormatter: jsonResult
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, response: ${errorText}`);
      }

      setMessage('Column formatting applied successfully!');
      setMessageType(MessageBarType.success);

      const listUrl = `${props.siteUrl}/Lists/${selectedListName}/AllItems.aspx`;
      window.open(listUrl, '_blank');
    } catch (error) {
      console.error('Error applying column formatting:', error);
      setMessage(`Error applying column formatting: ${error.message}`);
      setMessageType(MessageBarType.error);
    }
  };

  const handleFileChange = async (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
    if (option) {
      try {
        const siteRelativeUrl = new URL(props.siteUrl).pathname;
        const fileUrl = `${siteRelativeUrl}/${props.libraryName}/${option.key}`;
        const apiUrl = `${props.siteUrl}/_api/web/getfilebyserverrelativeurl('${fileUrl}')/$value`;
        console.log('Attempting to fetch SVG content from URL:', apiUrl);

        const response = await fetch(apiUrl);
        console.log('Fetch response status:', response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const svgText = await response.text();
        console.log('Fetched SVG content:', svgText);

        setSvgContent(svgText);
        setIsConverted(false); // Reset conversion state
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

  return (
    <div className={styles.svgToJson}>
      <Message message={message} messageType={messageType} />
      <div style={{ marginBottom: '20px' }} /> {/* Added margin */}
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
          <ListColumnSelector
            siteUrl={props.siteUrl}
            onListChange={handleListChange}
            onColumnChange={handleColumnChange}
          />
          <ApplyButton applyColumnFormatting={applyColumnFormatting} />
        </>
      )}
    </div>
  );
};

export default SvgToJson;