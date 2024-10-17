import * as React from 'react';
import { useEffect, useState } from 'react';
import { PrimaryButton, TextField, MessageBar, MessageBarType, Dropdown, IDropdownOption, Toggle } from '@fluentui/react';
import styles from './SvgToJson.module.scss';
import { ISvgToJsonProps } from './ISvgToJsonProps'; 




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
  const [lists, setLists] = useState<IDropdownOption[]>([]);
  const [selectedList, setSelectedList] = useState<string | null>(null);
  const [selectedListName, setSelectedListName] = useState<string | null>(null); // New state for list name
  const [columns, setColumns] = useState<IDropdownOption[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const [applyToColumn, setApplyToColumn] = useState<boolean>(false);
  const [showToggle, setShowToggle] = useState<boolean>(false); // New state to control visibility

  useEffect((): void => {
    const fetchSvgFiles = async (): Promise<void> => {
      try {
        const response = await fetch(`${props.siteUrl}/_api/web/lists/getbytitle('${props.libraryName}')/items?$select=FileLeafRef,Status`);
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
  }, [props.siteUrl, props.libraryName]);

  useEffect((): void => {
    const fetchLists = async (): Promise<void> => {
      try {
        const response = await fetch(`${props.siteUrl}/_api/web/lists?$filter=Hidden eq false`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseText = await response.text();
        
        // Parse the XML response
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(responseText, 'application/xml');
        
        const entries = xmlDoc.getElementsByTagName('entry');
        
        // Extract list IDs and titles and update state
        const excludedTitles = ["TaxonomyHiddenList", "Master Page Gallery", "Web Part Gallery", "Site Assets", "Style Library", "Teams Wiki Data", "Form Templates","Site Pages"];
        const listOptions: IDropdownOption[] = Array.from(entries).map(entry => {
          const idElement = entry.getElementsByTagNameNS('http://schemas.microsoft.com/ado/2007/08/dataservices', 'Id')[0];
          const titleElement = entry.getElementsByTagNameNS('http://schemas.microsoft.com/ado/2007/08/dataservices', 'Title')[0];
          const id = idElement ? idElement.textContent : '';
          const title = titleElement ? titleElement.textContent : '';
          return { key: id || '', text: title || '' };
        }).filter(option => excludedTitles.indexOf(option.text) === -1);
        setLists(listOptions);
      } catch (error) {
        console.error('Error fetching lists:', error);
        setMessage(`Error fetching lists: ${error.message}`);
        setMessageType(MessageBarType.error);
      }
    };

    fetchLists();
  }, [props.siteUrl]);

  const handleListChange = async (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): Promise<void> => {
    if (option) {
      setSelectedList(option.key as string);
      setSelectedListName(option.text as string); // Set the list name
      try {
        const response = await fetch(`${props.siteUrl}/_api/web/lists(guid'${option.key}')/fields`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseText = await response.text();
        
        // Parse the XML response
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(responseText, 'application/xml');
        
        const entries = xmlDoc.getElementsByTagName('entry');
        
        // Extract column internal names and titles and update state
        const excludedInternalNames = ["ID", "ContentType", "Modified", "Created", "Author", "Editor"];
        const columnOptions: IDropdownOption[] = Array.from(entries).map(entry => {
          const internalNameElement = entry.getElementsByTagNameNS('http://schemas.microsoft.com/ado/2007/08/dataservices', 'InternalName')[0];
          const titleElement = entry.getElementsByTagNameNS('http://schemas.microsoft.com/ado/2007/08/dataservices', 'Title')[0];
          const readOnlyFieldElement = entry.getElementsByTagNameNS('http://schemas.microsoft.com/ado/2007/08/dataservices', 'ReadOnlyField')[0];
          const internalName = internalNameElement ? internalNameElement.textContent : '';
          const title = titleElement ? titleElement.textContent : '';
          const readOnlyField = readOnlyFieldElement ? readOnlyFieldElement.textContent === 'true' : false;
          return { key: internalName || '', text: title || '', readOnlyField };
        }).filter(option => excludedInternalNames.indexOf(option.key) === -1 && !option.readOnlyField);
        console.log('Fetched columns:', columnOptions); // Log fetched columns for debugging
        setColumns(columnOptions);
      } catch (error) {
        console.error('Error fetching columns:', error);
        setMessage(`Error fetching columns: ${error.message}`);
        setMessageType(MessageBarType.error);
      }
    }
  };

  const handleColumnChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): void => {
    if (option) {
      setSelectedColumn(option.key as string);
    }
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

      // Fetch the form digest value
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

      // Open the list in a new tab using the list name
      const listUrl = `${props.siteUrl}/Lists/${selectedListName}/AllItems.aspx`;
      window.open(listUrl, '_blank');
    } catch (error) {
      console.error('Error applying column formatting:', error);
      setMessage(`Error applying column formatting: ${error.message}`);
      setMessageType(MessageBarType.error);
    }
  };

  const handleFileChange = async (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): Promise<void> => {
    if (option) {
      try {
        // Extract the server-relative URL of the site
        const siteRelativeUrl = new URL(props.siteUrl).pathname;
        // Construct the server-relative URL
        const fileUrl = `${siteRelativeUrl}/${props.libraryName}/${option.key}`;
        const apiUrl = `${props.siteUrl}/_api/web/getfilebyserverrelativeurl('${fileUrl}')/$value`;
        console.log('Attempting to fetch SVG content from URL:', apiUrl); // Log the URL being fetched

        const response = await fetch(apiUrl);
        console.log('Fetch response status:', response.status); // Log the response status

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const svgText = await response.text();
        console.log('Fetched SVG content:', svgText); // Log the fetched SVG content

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
            viewBox: svgDoc.documentElement.getAttribute('viewBox'),
            style: "max-width: 48px; max-height: 48px;" // Limit the size of the SVG
          },
          style: {
            width: "100%",
            height: "100%",
            maxWidth: "48px", // Limit the width of the SVG
            maxHeight: "48px" // Limit the height of the SVG
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
          fill: path.getAttribute('fill') || "#000000" // Default to black if no fill provided
        },
        children: []
      };
      result.children[0].children.push(pathObj);
    });

    setJsonResult(JSON.stringify(result, null, 2));
    setMessage(null);
    setShowToggle(true); // Show the toggle and label
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
      <PrimaryButton
        text="Convert to JSON"
        onClick={convertSvgToJson}
        className={styles.button}
        disabled={!svgContent} // Disable button if no SVG content
        styles={{
          root: {
            backgroundColor: svgContent ? 'var(--primary-color) !important' : 'lightgrey !important',
            borderColor: svgContent ? 'var(--primary-color) !important' : 'lightgrey !important',
            color: svgContent ? 'white !important' : 'grey !important',
          },
        }}
      />
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
      <div className={`${styles.toggleContainer} ${showToggle ? styles.visible : ''}`} style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '10px' }}>Do you want to directly apply this SVG format to a column in a list?</span>
        <Toggle
          onText="Yes"
          offText="No"
          checked={applyToColumn}
          onChange={(e, checked) => setApplyToColumn(!!checked)}
          styles={{
            root: { marginBottom: 10 },
            pill: {
              backgroundColor: applyToColumn ? '#ff69b4 !important' : 'white !important',
              borderColor: applyToColumn ? '#ff69b4 !important' : 'black !important',
            },
            thumb: {
              backgroundColor: applyToColumn ? 'white !important' : 'black !important',
            },
          }}
        />
      </div>
      {applyToColumn && (
        <>
          <Dropdown
            placeholder="Select a List"
            options={lists}
            onChange={handleListChange}
            className={styles.dropdown}
          />
          <Dropdown
            placeholder="Select a Column"
            options={columns}
            onChange={handleColumnChange}
            className={styles.dropdown}
          />
          <PrimaryButton
            text="Apply Column Formatting"
            onClick={applyColumnFormatting}
            className={styles.button}
          />
        </>
      )}
    </div>
  );
};

export default SvgToJson;