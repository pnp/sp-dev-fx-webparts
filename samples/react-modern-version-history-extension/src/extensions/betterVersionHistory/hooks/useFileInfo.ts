import { useEffect, useState } from "react";
import { IDataProvider } from "../providers/DataProvider";
import { IFileInfo } from "@pnp/sp/files";

export default function useFileInfo(provider: IDataProvider): { fileInfo: IFileInfo } {
  const [selectedFile, setSelectedFile] = useState<IFileInfo>(undefined);

  async function fetchFileInfo(): Promise<void> {
    const file = await provider.GetFileInfo();
    setSelectedFile(file);
  }

  useEffect(() => {
    fetchFileInfo();
  }, []);

  return { fileInfo: selectedFile };
}