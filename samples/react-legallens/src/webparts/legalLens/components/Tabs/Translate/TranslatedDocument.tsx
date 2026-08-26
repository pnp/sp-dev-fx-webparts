import * as React from 'react';
import { Stack, Text } from '@fluentui/react';
import { IContract } from '../../../models/IContract';
import { ILang } from '../../../constants/languages';
import styles from './Translate.module.scss';

export interface ITranslatedDocumentProps {
  contract: IContract;
  cached: any;
  selectedLanguage: string;
  langs: ILang[];
}

export const TranslatedDocument: React.FC<ITranslatedDocumentProps> = ({ contract, cached, selectedLanguage, langs }) => {
    const isTranslated = selectedLanguage !== 'en';
    const langData = isTranslated ? langs.find(l => l.code === selectedLanguage) : undefined;

    return (
      <Stack className={styles.docWrap}>
        {/* Language bar(s) */}
        {isTranslated ? (
          <div className={styles.langGrid}>
            <Stack horizontal verticalAlign="center" className={styles.langBar}>
              <Text className={styles.langName}>English</Text>
            </Stack>
            <Stack horizontal verticalAlign="center" className={`${styles.langBar} ${styles.langBarActive}`}>
              <Text className={`${styles.langName} ${styles.langNameActive}`}>{langData?.name}</Text>
            </Stack>
          </div>
        ) : (
          <Stack horizontal verticalAlign="center" className={`${styles.langBar} ${styles.langBarMargin}`}>
            <Text className={styles.langName}>English — Original Document</Text>
          </Stack>
        )}

        {/* Summary card */}
        <Stack className={styles.glassCard}>
          <Stack className={styles.summaryHeader}>
            <Text className={styles.sectionLabel}>📝 Contract Summary</Text>
          </Stack>
          {isTranslated ? (
            <div className={styles.splitGrid}>
              <div className={styles.splitLeft}>
                <Text className={styles.splitLeftText}>{contract.summary}</Text>
              </div>
              <div className={styles.splitRight}>
                <Text className={styles.splitRightText}>{cached.summary}</Text>
              </div>
            </div>
          ) : (
            <Stack className={styles.summaryBody}>
              <Text className={styles.bodyText}>{contract.summary}</Text>
            </Stack>
          )}
        </Stack>

        {/* Clause cards */}
        {contract.clauses.map((c, i) => (
          <Stack key={i} className={styles.glassCard}>
            <Stack horizontal verticalAlign="center" className={styles.clauseHeader}>
              <Text className={`${styles.clauseRef} ${isTranslated ? styles.clauseRefTranslated : ''}`}>{c.ref}</Text>
              <Text className={styles.clauseTitle}>{c.title}</Text>
            </Stack>
            {isTranslated ? (
              <div className={styles.splitGrid}>
                <div className={styles.splitLeftClause}>
                  <Text className={styles.splitLeftText}>{c.text}</Text>
                </div>
                <div className={styles.splitRightClause}>
                  <Text className={styles.splitRightText}>{cached.clauses[i]?.translated || '…'}</Text>
                </div>
              </div>
            ) : (
              <Stack className={styles.clauseBody}>
                <Text className={styles.bodyText}>{c.text}</Text>
              </Stack>
            )}
          </Stack>
        ))}
      </Stack>
    );
};
