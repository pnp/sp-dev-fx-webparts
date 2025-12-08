import * as React from 'react';
import { marked } from 'marked';
import styles from './SummarizePageContent.module.scss';
import type { ISummarizePageContentProps } from './ISummarizePageContentProps';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Shimmer } from '@fluentui/react/lib/Shimmer';
import { Icon } from '@fluentui/react/lib/Icon';
import { MessageBar, MessageBarType } from '@fluentui/react/lib/MessageBar';
import { ProgressIndicator } from '@fluentui/react/lib/ProgressIndicator';
import { SPPermission } from '@microsoft/sp-page-context';
import { useSPFxPermissions, useSPFxPageContext } from '@apvee/spfx-react-toolkit';
import { useSummarizer, useSummaryCache } from '../../../hooks';

const SummarizePageContent: React.FC<ISummarizePageContentProps> = (props) => {
  const { hasWebPermission } = useSPFxPermissions();
  const canEditListItems = hasWebPermission(SPPermission.editListItems);
  const pageContext = useSPFxPageContext();
  const { getCachedSummary } = useSummaryCache();
  
  const [hasCachedSummary, setHasCachedSummary] = React.useState<boolean | null>(null);
  
  const {
    isLoading,
    summary,
    error,
    isSupported,
    downloadProgress,
    statusMessage,
    summarizePage,
    stopSummarizing
  } = useSummarizer(
    props.useStreaming ?? true,
    props.summarizerType ?? 'key-points',
    props.summarizerFormat ?? 'markdown',
    props.summarizerLength ?? 'medium',
    props.sharedContext ?? 'This is a SharePoint page with business content.',
    props.context ?? 'This is SharePoint page content that needs to be summarized for business users.',
    {
      initializing: props.statusInitializing,
      checkingCache: props.statusCheckingCache,
      preparingTranslation: props.statusPreparingTranslation,
      downloadingModel: props.statusDownloadingModel,
      initializingModel: props.statusInitializingModel,
      fetchingContent: props.statusFetchingContent,
      generatingSummary: props.statusGeneratingSummary
    }
  );

  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(false);
  const prevSummaryRef = React.useRef<string>('');

  // Check for cached summary on mount if user doesn't have edit permissions
  React.useEffect(() => {
    if (!canEditListItems && !summary && !isLoading) {
      const checkCache = async (): Promise<void> => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const pageId = (pageContext.listItem as any)?.uniqueId;
          if (pageId) {
            const locale = pageContext.cultureInfo?.currentCultureName || 'en-US';
            const languageCode = locale.split('-')[0];
            const cached = await getCachedSummary(pageId, languageCode);
            setHasCachedSummary(cached !== undefined);
          }
        } catch (err) {
          console.error('Error checking cache:', err);
          setHasCachedSummary(false);
        }
      };
      checkCache().catch(console.error);
    }
  }, [canEditListItems, summary, isLoading, pageContext, getCachedSummary]);

  const handleToggleCollapse = (): void => {
    setIsCollapsed(!isCollapsed);
  };

  // Track if this is a new summary (initial or regenerated) for fade-in effect
  const isNewSummary = summary && summary !== prevSummaryRef.current;
  
  React.useEffect(() => {
    if (summary) {
      prevSummaryRef.current = summary;
    }
  }, [summary]);

  const renderSummary = (): JSX.Element | null => {
    if (!summary) return null;

    let summaryContent;
    
    if (props.summarizerFormat === 'markdown') {
      // Parse markdown to HTML
      summaryContent = { dangerouslySetInnerHTML: { __html: marked.parse(summary) as string } };
    } else {
      // For plain-text format, preserve stars but ensure line breaks
      const formattedText = summary.replace(/\n/g, '\n');
      summaryContent = { style: { whiteSpace: 'pre-line' }, children: formattedText };
    }

    return (
      <>
        <div className={styles.summaryHeader}>
          <Icon iconName="BulletedList" className={styles.summaryIcon} />
          <span className={styles.summaryTitle}>{props.summaryTitle}</span>
        </div>

        <div className={styles.summaryContent}>
          <div className={styles.summaryText} {...summaryContent} />
        </div>

        <div className={styles.disclaimer}>
          {props.disclaimerText}
        </div>
      </>
    );
  };

  return (
    <div className={styles.summarizePageContent}>
      {!isSupported && (
        <MessageBar messageBarType={MessageBarType.warning}>
          {props.apiNotSupportedWarning}
        </MessageBar>
      )}

      {error && (
        <MessageBar messageBarType={MessageBarType.error}>
          {error}
        </MessageBar>
      )}

      {isSupported && !summary && !isLoading && (canEditListItems || hasCachedSummary !== null) && (
        <div className={styles.actionContainer}>
          <PrimaryButton
            text={(!canEditListItems && hasCachedSummary === false) ? props.waitForEditorText : props.summarizeButtonText}
            iconProps={{ iconName: 'BulletedList' }}
            onClick={() => summarizePage(false)}
            className={styles.summarizeButton}
            disabled={!canEditListItems && hasCachedSummary === false}
          />
        </div>
      )}

      {(isLoading || summary) && (
        <>
          {/* Top Section: Actions (Stop/Hide/Regenerate) */}
          <div className={`${styles.actionContainer} ${!isCollapsed ? styles.withMargin : ''}`}>
            <div 
              className={styles.hideButton} 
              onClick={isLoading ? stopSummarizing : handleToggleCollapse} 
              role="button" 
              tabIndex={0} 
              onKeyPress={(e) => e.key === 'Enter' && (isLoading ? stopSummarizing() : handleToggleCollapse())}
            >
              <Icon iconName={isLoading ? "StatusCircleBlock" : (isCollapsed ? "ChevronDown" : "ChevronUp")} />
              <span>{isLoading ? props.stopGeneratingText : (isCollapsed ? props.showSummaryText : props.hideText)}</span>
            </div>
            {canEditListItems && (
              <PrimaryButton
                text={props.regenerateSummaryText}
                iconProps={{ iconName: 'Refresh' }}
                onClick={() => summarizePage(true)}
                className={`${styles.regenerateButton} ${(!summary || isCollapsed || isLoading) ? styles.hidden : ''}`}
              />
            )}
          </div>

          {/* Bottom Section: Shimmer or Summary Content */}
          {isLoading && !summary && (
            <div className={styles.shimmerWrapper}>
              <Shimmer width="100%" />
              <Shimmer width="100%" />
              <Shimmer width="75%" />
              <Shimmer width="100%" />
              <Shimmer width="50%" />
            </div>
          )}

          {downloadProgress !== undefined && downloadProgress < 100 && (
            <div className={styles.progressContainer}>
              <ProgressIndicator 
                label={props.downloadingModelText}
                description={statusMessage}
                percentComplete={downloadProgress / 100}
                barHeight={4}
              />
            </div>
          )}

          {summary && (
            <div className={`${styles.summaryContainer} ${isCollapsed ? styles.collapsed : ''} ${isNewSummary ? styles.fadeIn : ''}`}>
              <div className={styles.summaryInner}>
                {renderSummary()}
              </div>
            </div>
          )}

          {downloadProgress === undefined && isLoading && statusMessage && !isCollapsed && (
            <div className={styles.progressContainer}>
              <ProgressIndicator 
                label={statusMessage}
                percentComplete={undefined}
                barHeight={4}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SummarizePageContent;
