import * as React from 'react';
import { Stack, Text, Spinner, SpinnerSize, MessageBar, MessageBarType } from '@fluentui/react';
import { ISharePointService } from '../../../services/SharePointService';
import { useContracts } from '../../../hooks/useContracts';
import { IContract } from '../../../models/IContract';
import { ContractTable } from './ContractTable';
import { StatsCards } from './StatsCards';
import { TagFilter } from './TagFilter';
import { DocumentOverview } from './DocumentOverview';
import styles from './Library.module.scss';
import { IAzureAIFoundryService } from '../../../services/AzureAIFoundryService';
import { ILang } from '../../../constants/languages';

export interface ILibraryViewProps {
  sharePointService: ISharePointService;
  aiFoundryService: IAzureAIFoundryService;
  langs: ILang[];
}

export const LibraryView: React.FC<ILibraryViewProps> = ({ sharePointService, aiFoundryService, langs }) => {
  const {
    loading,
    error,
    filteredContracts,
    topTags,
    stats,
    selectedTag,
    setSelectedTag
  } = useContracts(sharePointService);

  const [selectedContract, setSelectedContract] = React.useState<IContract | null>(null);

  if (loading) {
    return (
      <Stack horizontalAlign="center" verticalAlign="center" className={styles.loadingWrap}>
        <Spinner
          size={SpinnerSize.large}
          label="Loading contracts..."
          className={styles.spinner}
        />
      </Stack>
    );
  }

  if (error) {
    return (
      <Stack style={{ animation: 'fadeIn 0.35s ease' }}>
        <MessageBar
          messageBarType={MessageBarType.error}
          isMultiline={false}
          styles={{
            root: { background: 'rgba(239,68,68,0.1)', borderRadius: '8px', marginBottom: '16px' },
            text: { color: '#fca5a5' }
          }}
        >
          {error}
        </MessageBar>
      </Stack>
    );
  }

  if (selectedContract) {
    return (
      <Stack tokens={{ childrenGap: 16 }} style={{ animation: 'fadeIn 0.35s ease' }}>
        <Stack horizontal horizontalAlign='space-between' style={{ marginBottom: 12 }}>
          <h2 className={styles.viewTitle}>
            Document Overview
          </h2>
          <button className={styles.backBtn} onClick={() => setSelectedContract(null)}>
            ← Back to Library
          </button>
        </Stack>
        <DocumentOverview contract={selectedContract} aiFoundryService={aiFoundryService} langs={langs}/>
      </Stack>
    );
  }

  return (
    <Stack style={{ animation: 'fadeIn 0.35s ease' }}>
      <TagFilter
        topTags={topTags}
        selectedTag={selectedTag}
        onTagSelect={setSelectedTag}
      />

      <Stack horizontal verticalAlign="end" horizontalAlign="space-between"
        tokens={{ childrenGap: 12 }} className={styles.headerRow}>
        <Stack>
          <h2 className={styles.viewTitle}>
            {selectedTag ? `Contracts tagged: "${selectedTag}"` : 'Governed Contract Library'}
          </h2>
          <Text className={styles.viewSubtitle}>
            {selectedTag
              ? `Showing ${filteredContracts.length} of ${stats.total} contracts`
              : 'Auto-classified · Metadata enriched · Compliance monitored'
            }
          </Text>
        </Stack>

        <StatsCards
          total={stats.total}
          compliant={stats.compliant}
          warnings={stats.warnings}
          alerts={stats.alerts}
        />
      </Stack>

      <ContractTable contracts={filteredContracts} onSelect={setSelectedContract} />
    </Stack>
  );
};
