import * as React from 'react';
import { Stack, Text } from '@fluentui/react';
import { ConfidenceScore } from '../ConfidenceScore';
import styles from '../Classification.module.scss';

const camelToTitle = (key: string): string =>
    key.replace(/([A-Z])/g, ' $1').trim();

export const EntityExtractionResults: React.FC<{ result: any }> = ({ result }) => {
    return (
      <Stack tokens={{ childrenGap: 12 }} className={styles.resultFadeIn}>
        <Stack className={styles.entityPanel} tokens={{ childrenGap: 14 }}>
          {/* Header */}
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 5 }}>
            <div className={styles.entityDot} />
            <Text className={styles.entityLabel}>Entity Extraction Complete</Text>
          </Stack>

          {/* Parties */}
          {result.parties && result.parties.length > 0 && (
            <Stack tokens={{ childrenGap: 6 }}>
              <Text className={styles.sectionTitle}>PARTIES</Text>
              {result.parties.map((party: any, i: number) => (
                <Stack key={i} className={styles.entityCard} tokens={{ childrenGap: 2 }}>
                  <Text className={styles.entityName}>{party.name}</Text>
                  <Text className={styles.entityMeta}>{party.role} • {party.jurisdiction}</Text>
                  {party.contact && (
                    <Text className={styles.entityContact}>{party.contact}</Text>
                  )}
                </Stack>
              ))}
            </Stack>
          )}

          {/* Key Dates */}
          {result.dates && (
            <Stack tokens={{ childrenGap: 6 }}>
              <Text className={styles.sectionTitle}>KEY DATES</Text>
              <Stack className={styles.entityCard}>
                {Object.entries(result.dates).map(([key, value], i) => (
                  <Stack horizontal horizontalAlign="space-between" key={i}
                    className={`${styles.kvRow} ${i < Object.keys(result.dates).length - 1 ? styles.kvRowBorder : ''}`}
                  >
                    <Text className={styles.kvKey}>{camelToTitle(key)}</Text>
                    <Text className={styles.kvValue}>{value as string}</Text>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          )}

          {/* Financial Terms */}
          {result.financialTerms && (
            <Stack tokens={{ childrenGap: 6 }}>
              <Text className={styles.sectionTitle}>FINANCIAL TERMS</Text>
              <Stack className={styles.entityCard}>
                {Object.entries(result.financialTerms).map(([key, value], i) => (
                  <Stack horizontal horizontalAlign="space-between" key={i}
                    className={`${styles.kvRow} ${i < Object.keys(result.financialTerms).length - 1 ? styles.kvRowBorder : ''}`}
                  >
                    <Text className={styles.kvKey}>{camelToTitle(key)}</Text>
                    <Text className={styles.kvFinancialValue}>{value as string}</Text>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          )}

          {/* Key Obligations */}
          {result.keyObligations && result.keyObligations.length > 0 && (
            <Stack tokens={{ childrenGap: 4 }}>
              <Text className={styles.sectionTitle}>KEY OBLIGATIONS</Text>
              {result.keyObligations.map((obligation: string, i: number) => (
                <Text key={i} className={styles.obligationItem}>• {obligation}</Text>
              ))}
            </Stack>
          )}

          {/* Governing Law / Dispute */}
          <Stack className={styles.entityCard} tokens={{ childrenGap: 6 }}>
            <Text className={styles.legalNote}>
              <strong>Governing Law:</strong> {result.governingLaw}
            </Text>
            {result.disputeResolution && (
              <Text className={styles.legalNote}>
                <strong>Dispute Resolution:</strong> {result.disputeResolution}
              </Text>
            )}
          </Stack>
        </Stack>

        <ConfidenceScore value={result.confidence || 0.94} label="Extraction Confidence" sublabel="Entity recognition" color="#06b6d4" />
      </Stack>
    );
};
