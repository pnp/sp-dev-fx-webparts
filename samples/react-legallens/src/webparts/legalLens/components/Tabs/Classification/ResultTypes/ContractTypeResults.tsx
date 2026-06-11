import * as React from 'react';
import { Stack, Text } from '@fluentui/react';
import { ConfidenceScore } from '../ConfidenceScore';
import styles from '../Classification.module.scss';

const FIELDS: [string, (r: any) => string][] = [
    ['Document Type', r => r.documentType],
    ['Parties', r => (r.parties || []).join(' · ')],
    ['Jurisdiction', r => r.jurisdiction],
    ['Effective Date', r => r.effectiveDate],
    ['Expiry Date', r => r.expiryDate],
    ['Key Clauses', r => (r.keyClauses || []).join(', ')],
];

export const ContractTypeResults: React.FC<{ result: any }> = ({ result }) => {
    return (
      <Stack tokens={{ childrenGap: 12 }} className={styles.resultFadeIn}>
        <Stack className={styles.contractPanel} tokens={{ childrenGap: 0 }}>
          {/* Header */}
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 5 }} className={styles.resultHeader}>
            <div className={styles.contractDot} />
            <Text className={styles.contractLabel}>
              Contract Type Classification
            </Text>
          </Stack>

          {/* Field rows */}
          {FIELDS.map(([label, getValue], i) => (
            <Stack horizontal horizontalAlign="space-between" key={i}
              className={`${styles.fieldRow} ${i < FIELDS.length - 1 ? styles.fieldRowBorder : ''}`}
            >
              <Text className={styles.fieldLabel}>{label}</Text>
              <Text className={styles.fieldValue}>{getValue(result) || 'Not specified'}</Text>
            </Stack>
          ))}

          {/* Auto-Tags */}
          {result.autoTags && result.autoTags.length > 0 && (
            <Stack horizontal horizontalAlign="space-between" className={`${styles.fieldRow} ${styles.fieldRowBorder}`}>
              <Text className={styles.fieldLabel}>Auto-Tags</Text>
              <Stack horizontal tokens={{ childrenGap: 4 }} wrap horizontalAlign="end">
                {result.autoTags.map((tag: string) => (
                  <Text key={tag} className={styles.autoTag}>{tag}</Text>
                ))}
              </Stack>
            </Stack>
          )}

          {/* Duplicate Flag */}
          <Stack horizontal horizontalAlign="space-between" className={styles.fieldRow}>
            <Text className={styles.fieldLabel}>Duplicate Flag</Text>
            <Text className={styles.duplicateFlag}>
              {result.duplicateFlag || 'No duplicates found ✓'}
            </Text>
          </Stack>
        </Stack>

        <ConfidenceScore value={result.confidence || 0.97} label="Classification Confidence" sublabel="Document Intelligence + semantic analysis" color="#10b981" />
      </Stack>
    );
};
