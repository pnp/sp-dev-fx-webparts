import * as React from 'react';
import { useEffect, useState } from 'react';
import { Dropdown, IDropdownOption, MessageBarType } from '@fluentui/react';
import { spfi, SPFx } from '@pnp/sp';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

interface SVGInputProps {
  siteUrl: string;
  libraryName: string;
  context: any;
  setSvgContent: React.Dispatch<React.SetStateAction<string>>;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setMessageType: React.Dispatch<React.SetStateAction<MessageBarType>>;
}

const SVGInput: React.FC<SVGInputProps> = ({ siteUrl, libraryName, context, setSvgContent, setMessage, setMessageType }) => {
  const [svgFiles, setSvgFiles] = useState<IDropdownOption[]>([]);

  useEffect((): void => {
    const fetchSvgFiles = async (): Promise<void> => {
      try {
        const fullSiteUrl = siteUrl;
        console.log('Fetching SVG files from site:', fullSiteUrl);
        console.log('Using library name:', libraryName);

        const sp = spfi(fullSiteUrl).using(SPFx(context));

        const items = await sp.web.lists.getByTitle(libraryName).items.select("FileLeafRef")();
        const svgOptions: IDropdownOption[] = items.map((item: { FileLeafRef: string }) => ({
          key: item.FileLeafRef,
          text: item.FileLeafRef
        }));
        setSvgFiles(svgOptions);
      } catch (error) {
        console.error(`Error fetching SVG files: ${error.message}`);
        setMessage(`Error fetching SVG files: ${error.message}`);
        setMessageType(MessageBarType.error);
      }
    };

    if (siteUrl && libraryName) {
      fetchSvgFiles();
    }
  }, [siteUrl, libraryName, context]);

  const handleFileChange = async (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
    if (option) {
      const fileKey = String(option.key); // Ensure key is treated as a string
      const siteRelativeUrl = new URL(siteUrl).pathname;
      const fileUrl = `${siteRelativeUrl}/${libraryName}/${fileKey}`;
      const apiUrl = `${siteUrl}/_api/web/getfilebyserverrelativeurl('${fileUrl}')/$value`;

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

  return (
    <Dropdown
      placeholder="Select an SVG file"
      label="SVG Files"
      options={svgFiles}
      onChange={handleFileChange}
      aria-label="Select a list"
    />
  );
};

export default SVGInput;