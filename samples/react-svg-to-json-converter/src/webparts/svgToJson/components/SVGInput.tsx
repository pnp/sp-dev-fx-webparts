import * as React from 'react';
import { Dropdown, IDropdownOption, MessageBar, MessageBarType } from '@fluentui/react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { useSvgFiles } from './useSvgFiles';
import * as strings from 'SvgToJsonWebPartStrings';
import { spfi, SPFx } from "@pnp/sp";

interface SVGInputProps {
  siteUrl: string;
  libraryName: string;
  context: WebPartContext;
  setSvgContent: React.Dispatch<React.SetStateAction<string>>;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setMessageType: React.Dispatch<React.SetStateAction<MessageBarType>>;
}

const SVGInput: React.FC<SVGInputProps> = ({ siteUrl, libraryName, context, setSvgContent, setMessage, setMessageType }) => {
  const { files, error } = useSvgFiles(siteUrl, libraryName, context);

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

  const options: IDropdownOption[] = files.map((file: { name: string; url: string }) => ({
    key: file.url,
    text: file.name
  }));

  return (
    <div>
      {error && <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>}
      <Dropdown
        placeholder={strings.SelectSVGFile}
        options={options}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default SVGInput;