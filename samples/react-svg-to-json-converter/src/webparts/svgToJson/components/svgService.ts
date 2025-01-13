import { spfi, SPFx } from "@pnp/sp";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/files";

export const fetchSvgFiles = async (siteUrl: string, libraryName: string, context: WebPartContext): Promise<{ name: string; url: string }[]> => {
  try {
    const sp = spfi(siteUrl).using(SPFx({ pageContext: context.pageContext }));
    const files = await sp.web.lists.getByTitle(libraryName).items.select('FileLeafRef', 'FileRef')();
    return files.map((file: { FileLeafRef: string; FileRef: string }) => ({
      name: file.FileLeafRef,
      url: file.FileRef
    }));
  } catch (error) {
    console.error(`Error fetching SVG files: ${error.message}`);
    throw error;
  }
};

export const fetchFileContent = async (siteUrl: string, fileUrl: string, context: WebPartContext): Promise<string> => {
  try {
    const sp = spfi(siteUrl).using(SPFx({ pageContext: context.pageContext }));
    const fileContent = await sp.web.getFileByServerRelativePath(fileUrl).getText();
    return fileContent;
  } catch (error) {
    console.error('Error fetching file content:', error);
    throw error;
  }
};