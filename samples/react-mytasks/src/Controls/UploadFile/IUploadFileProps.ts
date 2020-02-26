import spservices from '../../services/spservices';
import { ITaskExternalReference } from '../../services/ITaskExternalReference';
import { ChunkedFileUploadProgressData } from '@pnp/sp';
export interface IUploadFileProps {
onFileUpload?: (file:File, groupDefaultLibrary:string) => void;
spservice: spservices;
groupId: string;
}
