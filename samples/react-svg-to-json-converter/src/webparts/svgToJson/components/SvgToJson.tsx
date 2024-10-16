import * as React from 'react';
import { useEffect, useState } from 'react';
import { PrimaryButton, TextField, MessageBar, MessageBarType, Dropdown, IDropdownOption } from '@fluentui/react';
import styles from './SvgToJson.module.scss';
import { ISvgToJsonProps } from './ISvgToJsonProps'; // Import the props interface

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

  useEffect((): void => {
    const fetchSvgFiles = async (): Promise<void> => {
      try {
        const response = await fetch("/sites/TECH/_api/web/lists/getbytitle('Approved SVGs')/items?$select=FileLeafRef,Status");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseText = await response.text(); 
        console.log('Response text:', responseText); 
  
        // Parse the XML response
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(responseText, 'application/xml');
        console.log('Parsed XML Document:', xmlDoc); 
  
        const entries = xmlDoc.getElementsByTagName('entry');
        console.log('Entries:', entries);

        // Extract SVG file names and update state
        const svgOptions: IDropdownOption[] = Array.from(entries).map(entry => {
          const fileLeafRefElement = entry.getElementsByTagNameNS('http://schemas.microsoft.com/ado/2007/08/dataservices', 'FileLeafRef')[0];
          const fileName = fileLeafRefElement ? fileLeafRefElement.textContent : '';
          console.log('File name:', fileName); // Log file name for debugging
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
  }, []);

  const handleFileChange = async (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): Promise<void> => {
    if (option) {
      try {
        const response = await fetch(`/sites/TECH/_api/web/getfilebyserverrelativeurl('/sites/TECH/Approved SVGs/${option.key}')/$value`);
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

  const convertSvgToJson = (): void => {
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
            viewBox: svgDoc.documentElement.getAttribute('viewBox')
          },
          style: {
            width: "100%",
            height: "100%"
          },
          children: []
        }
      ]
    };

    // Process each <path> element and add it to the JSON structure
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

    setJsonResult(JSON.stringify(result, null, 2));
    setMessage(null);
  };

  // Copy JSON result to clipboard
  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(jsonResult).then(() => {
      setMessage('Copied to clipboard!');
      setMessageType(MessageBarType.success);
      setTimeout(() => setMessage(null), 3000); 
    }).catch(() => {
      setMessage('Failed to copy to clipboard.');
      setMessageType(MessageBarType.error);
      setTimeout(() => setMessage(null), 3000); 
    });
  };

  return (
    <div className={styles.svgToJson}>
      {message && <MessageBar messageBarType={messageType}>{message}</MessageBar>}
      <Dropdown
        placeholder="Select an SVG file"
        options={svgFiles}
        onChange={handleFileChange}
        className={styles.dropdown}
      />
      {svgContent && (
        <div className={styles.svgPreview}>
          <div dangerouslySetInnerHTML={{ __html: svgContent }} />
        </div>
      )}
      <PrimaryButton text="Convert to JSON" onClick={convertSvgToJson} className={styles.button} />
      {jsonResult && (
        <div>
          <h3>JSON Result:</h3>
          <TextField
            multiline
            rows={10}
            readOnly
            value={jsonResult}
            className={styles.outputBox}
          />
          <div className={styles.buttonContainer}>
            <PrimaryButton text="Copy to Clipboard" onClick={copyToClipboard} className={styles.button} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SvgToJson;