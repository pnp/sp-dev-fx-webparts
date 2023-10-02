import * as React from 'react';
import { IFileInfo } from '@pnp/sp/files';
import { IDataProvider } from '../providers/DataProvider';
import { IVersion } from '../models/IVersion';

export default function useVersionMetadata(version: IVersion, provider: IDataProvider): { versionMetadata: IFileInfo } {
  const [versionMetadata, setVersionMetadata] = React.useState<IFileInfo>(undefined);

  async function getMetadata(): Promise<void> {
    const { FileRef, VersionId } = version;
    const metadata = await provider.GetFileVersionMetadata(FileRef, VersionId);
    setVersionMetadata(metadata);
  }

  React.useMemo(() => {
    getMetadata();
  }, [version, provider]);

  return { versionMetadata };
}