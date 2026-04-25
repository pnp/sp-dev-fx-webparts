import * as React from 'react';
import { Stack, Text } from '@fluentui/react';
import { DocumentRegular } from '@fluentui/react-icons';
import { IContract } from '../../../models/IContract';
import { ISharePointService } from '../../../services/SharePointService';
import styles from './Upload.module.scss';

interface IUploadSelectProps {
  contracts: IContract[];
  sharePointService: ISharePointService;
  onFileUpload: (file: File | null) => Promise<void>;
}

export const UploadSelect: React.FC<IUploadSelectProps> = ({
  contracts,
  sharePointService,
  onFileUpload,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <Stack tokens={{ childrenGap: 0 }}>
      <div
        className={styles.dropZone}
        onDrop={e => { e.preventDefault(); const file = e.dataTransfer.files[0]; if (file) onFileUpload(file); }}
        onDragOver={e => e.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
      >
        <DocumentRegular className={styles.dropZoneIcon} />
        <Text block className={styles.dropZoneTitle}>Drag & drop contract file here</Text>
        <Text block className={styles.dropZoneHint}>or click to browse</Text>
        <Text block className={styles.dropZoneNote}>Supported: PDF, DOCX · Max size: 10MB</Text>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx"
          onChange={e => onFileUpload(e.target.files?.[0] || null)}
          style={{ display: 'none' }}
        />
      </div>

      <Text block className={styles.orDivider}>— OR —</Text>

      <Stack>
        <label className={styles.libraryLabel}>Select from Library</label>
        <select
          className={styles.librarySelect}
          onChange={async e => {
            const idx = Number(e.target.value);
            if (idx >= 0) {
              const contract = contracts[idx];
              if (contract.fileUrl) {
                const blob = await sharePointService.getContractFile(contract.fileUrl);
                const file = new File([blob], contract.name, { type: 'application/pdf' });
                onFileUpload(file);
              }
            }
          }}
        >
          <option value="-1">Choose contract from library...</option>
          {contracts.map((c, i) => (
            <option key={i} value={i}>{c.name}</option>
          ))}
        </select>
      </Stack>
    </Stack>
  );
};
