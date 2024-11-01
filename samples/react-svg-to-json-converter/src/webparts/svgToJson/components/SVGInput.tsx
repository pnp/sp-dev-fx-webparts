import { spfi, SPFx } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import '@pnp/sp/files'; // Import the files module
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Dropdown, IDropdownOption, MessageBarType } from '@fluentui/react';
import * as strings from 'SvgToJsonWebPartStrings';

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
        setMessage(strings.ErrorFetchingFileContent);
        setMessageType(MessageBarType.error);
      }
    }
  };

  return (
    <div>
      <Dropdown
        placeholder={strings.SelectSVGFile}
        options={files.map(file => ({ key: file.url, text: file.name }))}
        onChange={handleFileChange}
      />
  
    </div>
  );
};

export default SVGInput;