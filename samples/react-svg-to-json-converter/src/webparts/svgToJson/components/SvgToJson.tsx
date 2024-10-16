import * as React from 'react';
import { useEffect, useState } from 'react';
import { PrimaryButton, TextField, MessageBar, MessageBarType, IconButton, Dropdown, IDropdownOption } from '@fluentui/react';
import styles from './SvgToJson.module.scss';
import { ISvgToJsonProps } from './ISvgToJsonProps'; // Import the props interface

const SvgToJson: React.FC<ISvgToJsonProps> = (props) => {
  const [svgFiles, setSvgFiles] = useState<IDropdownOption[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | undefined>(undefined);
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
  
        const options: IDropdownOption[] = [];
  
        for (let i = 0; i < entries.length; i++) {
          const fileLeafRef = entries[i].getElementsByTagName('d:FileLeafRef')[0]?.textContent;
          if (fileLeafRef) {
            options.push({ key: fileLeafRef, text: fileLeafRef });
          }
        }
  
        console.log('Parsed SVG files:', options);
        setSvgFiles(options);
      } catch (error) {
        console.error('Failed to fetch SVG files:', error); 
        setMessage('Failed to fetch SVG files.');
        setMessageType(MessageBarType.error);
      }
    };
  
    fetchSvgFiles().catch(error => {
      console.error('Failed to fetch SVG files:', error); 
      setMessage('Failed to fetch SVG files.');
      setMessageType(MessageBarType.error);
    });
  }, []);

  // Handle file selection change
  const handleFileChange = async (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): Promise<void> => {
    if (option) {
      setSelectedFile(option.key as string);
      try {
        // Get file content
        const fileName = option.key as string;
        const url = `/sites/TECH/_api/web/GetFileByServerRelativeUrl('/sites/TECH/Approved%20SVGs/${encodeURIComponent(fileName)}')/$value`;
        console.log('Constructed URL:', url); 

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const svgText = await response.text();
        console.log('Fetched SVG content:', svgText); 
        setSvgContent(svgText);
      } catch (error) {
        console.error('Failed to fetch SVG content:', error); 
        setMessage('Failed to fetch SVG content.');
        setMessageType(MessageBarType.error);
      }
    }
  };

  // Convert SVG content to JSON
  const processSvgToJson = (): void => {
    if (!svgContent.includes('<svg')) {
      setMessage('Please provide valid SVG content.');
      setMessageType(MessageBarType.error);
      return;
    }

    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
    const paths = Array.from(svgDoc.querySelectorAll('path')) as Element[];

    if (!paths.length) {
      setMessage('No <path> elements found in the SVG.');
      setMessageType(MessageBarType.error);
      return;
    }

    const result: {
      "$schema": string;
      "elmType": string;
      "children": [
        {
          "elmType": string;
          "txtContent": string;
        },
        {
          "elmType": string;
          "attributes": {
            "viewBox": string | null;
          };
          "children": {
            "elmType": string;
            "attributes": {
              "d": string | null;
            };
            "style": {
              "fill": string;
            };
          }[];
        }
      ];
    } = {
      "$schema": "https://developer.microsoft.com/json-schemas/sp/v2/column-formatting.schema.json",
      "elmType": "div",
      "children": [
        {
          "elmType": "span",
          "txtContent": "@currentField"
        },
        {
          "elmType": "svg",
          "attributes": {
            "viewBox": svgDoc.documentElement.getAttribute("viewBox")
          },
          "children": []
        }
      ]
    };

    // Process each <path> element and add it to the JSON structure
    paths.forEach(path => {
      const pathObj = {
        "elmType": "path",
        "attributes": {
          "d": path.getAttribute('d')
        },
        "style": {
          "fill": path.getAttribute('fill') || "#000000" 
        }
      };
      result.children[1].children.push(pathObj);
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
      <h2>SVG to JSON Converter</h2>
      <Dropdown
        placeholder="Select an SVG file"
        options={svgFiles}
        onChange={handleFileChange}
        selectedKey={selectedFile}
        className={styles['ms-Dropdown']}
      />
      <TextField
        className={styles['ms-TextField']}
        placeholder="SVG content will appear here"
        multiline
        rows={10}
        value={svgContent}
        readOnly
      />
      <PrimaryButton className={styles['ms-Button']} onClick={processSvgToJson}>
        Convert
      </PrimaryButton>
      {message && (
        <MessageBar
          messageBarType={messageType}
          isMultiline={false}
          onDismiss={() => setMessage(null)}
          className={styles.messageBar}
        >
          {message}
        </MessageBar>
      )}
      {jsonResult && (
        <div className={styles.outputContainer}>
          <TextField
            className={styles['ms-TextField']}
            label="JSON Result"
            multiline
            rows={10}
            readOnly
            value={jsonResult}
          />
          <IconButton
            iconProps={{ iconName: 'Copy' }}
            title="Copy to clipboard"
            ariaLabel="Copy to clipboard"
            onClick={copyToClipboard}
            className={styles.copyButton}
          />
        </div>
      )}
    </div>
  );
};

export default SvgToJson;