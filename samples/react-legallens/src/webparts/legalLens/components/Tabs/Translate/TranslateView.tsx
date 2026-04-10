import * as React from 'react';
import { Stack, Text } from '@fluentui/react';
import { IContract } from "../../../models/IContract";
import { ILang } from '../../../constants/languages';
import { LocalLanguage24Regular } from '@fluentui/react-icons';
import { TranslatedDocument } from './TranslatedDocument';
import { MultilingualQA } from './MultilingualQA';
import { IAzureAIFoundryService } from '../../../services/AzureAIFoundryService';
import styles from './Translate.module.scss';

export interface ITranslateViewProps {
  contracts: IContract[];
  aiFoundryService: IAzureAIFoundryService;
  langs: ILang[];
}

interface ITranslationCache {
  [key: string]: { summary: string; clauses: any[] };
}

export const TranslateView: React.FC<ITranslateViewProps> = ({ contracts, aiFoundryService, langs }) => {
    const [selectedContract, setSelectedContract] = React.useState(0);
    const [selectedLang, setSelectedLang] = React.useState('en');
    const [translating, setTranslating] = React.useState(false);
    const [translateProgress, setTranslateProgress] = React.useState(0);
    const [translateError, setTranslateError] = React.useState<string | null>(null);
    const [cache, setCache] = React.useState<ITranslationCache>({});
    const mountedRef = React.useRef(true);

    React.useEffect(() => {
        return () => { mountedRef.current = false; };
    }, []);

    // Auto-populate English cache (original document, no translation needed)
    React.useEffect(() => {
        if (contracts.length === 0) return;
        const contract = contracts[selectedContract];
        const cacheKey = `${selectedContract}-en`;
        setCache(prev => {
            if (prev[cacheKey]) return prev;
            return {
                ...prev,
                [cacheKey]: {
                    summary: contract.summary,
                    clauses: contract.clauses.map(c => ({ ref: c.ref, translated: `${c.title}: ${c.text}` }))
                }
            };
        });
    }, [selectedContract, contracts]);

    const runTranslation = async (): Promise<void> => {
        const cacheKey = `${selectedContract}-${selectedLang}`;

        if (cache[cacheKey]) return;

        const contract = contracts[selectedContract];
        const selectedLangObj = langs.find(l => l.code === selectedLang) ?? langs[0];

        if (selectedLang === 'en') {
            setCache(prev => ({
                ...prev,
                [cacheKey]: {
                    summary: contract.summary,
                    clauses: contract.clauses.map(c => ({ ref: c.ref, translated: `${c.title}: ${c.text}` }))
                }
            }));
            return;
        }

        setTranslating(true);
        setTranslateProgress(0);
        setTranslateError(null);

        try {
            const transSummary = await aiFoundryService.translate(
                contract.summary, selectedLangObj.name
            );

            if (mountedRef.current) setTranslateProgress(1);

            const transClauses: Array<{ ref: string; translated: string }> = [];
            for (let i = 0; i < contract.clauses.length; i++) {
                const c = contract.clauses[i];
                const translated = await aiFoundryService.translate(
                    `${c.title}: ${c.text}`, selectedLangObj.name
                );
                transClauses.push({ ref: c.ref, translated });

                if (mountedRef.current) {
                    setTranslateProgress(2 + (i / contract.clauses.length));
                }
            }

            if (mountedRef.current) {
                setCache(prev => ({
                    ...prev,
                    [cacheKey]: { summary: transSummary, clauses: transClauses }
                }));
                setTranslateProgress(3);
                setTranslating(false);
            }
        } catch (error) {
            console.error('Translation error:', error);
            if (mountedRef.current) {
                setTranslateError('Translation failed. Please try again.');
                setTranslating(false);
            }
        }
    };

    if (contracts.length === 0) {
      return (
        <Stack horizontalAlign="center" className={styles.viewHeader}>
          <Text className={styles.viewSubtitle}>No contracts available</Text>
        </Stack>
      );
    }

    const cacheKey = `${selectedContract}-${selectedLang}`;
    const cached = cache[cacheKey];
    const contract = contracts[selectedContract];

    return (
      <Stack className={styles.viewWrap}>
        <Stack className={styles.viewHeader}>
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }} className={styles.viewTitleRow}>
            <Text className={styles.viewTitle}>TranslatePro</Text>
            <Text className={styles.aiBadge}>AI POWERED</Text>
          </Stack>
          <Text className={styles.viewSubtitle}>
            Live legal translation via Azure AI Foundry · Multilingual Q&A · Preserves clause references
          </Text>
        </Stack>

        <Stack className={styles.controlPanel}>
          <Stack horizontal tokens={{ childrenGap: 12 }} className={styles.controlRow}>
            <Stack className={styles.contractSelectWrap}>
              <Text className={styles.controlLabel}>Select Contract</Text>
              <select
                value={selectedContract}
                onChange={e => setSelectedContract(Number(e.target.value))}
                className={styles.contractSelect}
              >
                {contracts.map((c, i) => (
                  <option key={i} value={i}>{c.name}</option>
                ))}
              </select>
            </Stack>

            <Stack className={styles.langSelectWrap}>
              <Text className={styles.controlLabel}>Translation Language</Text>
              <div className={styles.langButtonRow}>
                {langs.map(l => (
                  <button
                    key={l.code}
                    onClick={() => setSelectedLang(l.code)}
                    className={`${styles.langBtn}${selectedLang === l.code ? ` ${styles.langBtnSelected}` : ''}`}
                  >
                    <div className={styles.langBtnLabel}>{l.label}</div>
                  </button>
                ))}
              </div>
            </Stack>

            <button
              onClick={runTranslation}
              disabled={translating || !!cached}
              className={`${styles.translateBtn} ${cached ? `${styles.translateBtnCached}` : translating ? `${styles.translateBtnTranslating}` : ''}`}
            >
              {translating ? <>⏳ Translating...</> : cached ? <>✓ Cached</> : <>🌐 Translate</>}
            </button>
          </Stack>

          {translateError && (
            <Stack className={styles.translateError}>
              <Text className={styles.translateErrorText}>⚠ {translateError}</Text>
            </Stack>
          )}
        </Stack>

        {translating && (
          <Stack className={styles.progressPanel}>
            <Stack horizontal horizontalAlign="space-between" className={styles.progressHeader}>
              <Text className={styles.progressLabel}>Translating contract...</Text>
              <Text className={styles.progressPct}>{Math.round((translateProgress / 3) * 100)}%</Text>
            </Stack>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${(translateProgress / 3) * 100}%` }} />
            </div>
          </Stack>
        )}

        {cached ? (
          <Stack>
            <TranslatedDocument contract={contract} cached={cached} selectedLanguage={selectedLang} langs={langs} />
            <MultilingualQA contract={contract} aiFoundryService={aiFoundryService} langs={langs} />
          </Stack>
        ) : !translating && (
          <Stack horizontalAlign="center" className={styles.emptyDoc}>
            <LocalLanguage24Regular className={styles.emptyDocIcon} />
            <Text className={styles.emptyDocTitle}>Select a contract and language above</Text>
            <Text className={styles.emptyDocHint}>AI will translate the summary and all key clauses in real-time.</Text>
          </Stack>
        )}
      </Stack>
    );
}
