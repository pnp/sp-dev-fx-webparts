import { spfi, SPFx } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import '@pnp/sp/files'; // Import the files module
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Dropdown, IDropdownOption, MessageBarType } from '@fluentui/react'; // Import from @fluentui/react

interface SVGInputProps {
  siteUrl: string;
  libraryName: string;
  context: any;
  setSvgContent: (content: string) => void;
  setMessage: (message: string) => void;
  setMessageType: (type: MessageBarType) => void;
}

const SVGInput: React.FC<SVGInputProps> = ({ siteUrl, libraryName, context, setSvgContent, setMessage, setMessageType }) => {
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);

  useEffect((): void => {
    const fetchSvgFiles = async (libraryName: string): Promise<{ name: string; url: string }[]> => {
      try {
        const sp = spfi(siteUrl).using(SPFx(context));
        const files = await sp.web.lists.getByTitle(libraryName).items.select('FileLeafRef', 'FileRef')();
        return files.map((file: { FileLeafRef: string; FileRef: string }) => ({
          name: file.FileLeafRef,
          url: file.FileRef
        }));
      } catch (error) {
        console.error('Error fetching SVG files:', error);
        return [];
      }
    };

    if (siteUrl && libraryName) {
      fetchSvgFiles(libraryName).then(fetchedFiles => setFiles(fetchedFiles));
    }
  }, [siteUrl, libraryName, context]);

  const handleFileChange = async (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
    if (option) {
      try {
        const sp = spfi(siteUrl).using(SPFx(context));
        const fileContent = await sp.web.getFileByServerRelativePath(option.key as string).getText();
        setSvgContent(fileContent);
      } catch (error) {
        console.error('Error fetching file content:', error);
        setMessage('Error fetching file content');
        setMessageType(MessageBarType.error);
      }
    }
  };

  return (
    <div>
      <Dropdown
        placeholder="Select an SVG file"
        options={files.map(file => ({ key: file.url, text: file.name }))}
        onChange={handleFileChange}
      />
      {/* Your component JSX here */}
    </div>
  );
};

export default SVGInput;