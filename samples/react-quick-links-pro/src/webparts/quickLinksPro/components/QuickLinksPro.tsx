import * as React from 'react';
import { useState, useEffect } from 'react';
import { DisplayMode } from '@microsoft/sp-core-library';
import {
  Stack,
  IconButton,
  MessageBar,
  MessageBarType,
  Spinner,
  SpinnerSize
} from '@fluentui/react';
import { IQuickLinksProProps } from './IQuickLinksProProps';
import { ConfigurationPanel } from './ConfigurationPanel';
import { QuickLinkItem } from './QuickLinkItem';
import { SPService } from '../services/SPService';
import { IQuickLink } from '../models/IQuickLink';
import styles from './QuickLinksPro.module.scss';

export const QuickLinksPro: React.FC<IQuickLinksProProps> = (props) => {
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
  const [links, setLinks] = useState<IQuickLink[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [spService] = useState<SPService>(new SPService(props.context));

  const isEditMode = props.displayMode === DisplayMode.Edit;

  const loadLinks = async (): Promise<void> => {
    if (!props.selectedListId) {
      setLinks([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const listItems = await spService.getListItems(props.selectedListId);
      setLinks(listItems);
    } catch (err) {
      setError('Error loading quick links. Please check configuration.');
      console.error('Error loading links:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLinks().catch(err => console.error('Failed to load links:', err));
  }, [props.selectedListId]);

  const handleConfigurationSave = (
    quickLinks: IQuickLink[],
    selectedListId: string,
    selectedListTitle: string
  ): void => {
    props.updateProperty({
      selectedListId,
      selectedListTitle
    });
    
    setLinks(quickLinks);
    setIsPanelOpen(false);
  };

  const showGearIcon = isEditMode;

  const getContainerClassName = (): string => {
    switch (props.displayStyle) {
      case 'cards':
        return styles.linksGridCards;
      case 'buttons':
        return styles.linksGridButtons;
      case 'list':
        return styles.linksGridList;
      default:
        return styles.linksGridCards;
    }
  };

  return (
    <div className={styles.quickLinksPro}>
      {/* Gear Icon - Only visible in Edit Mode */}
      {showGearIcon && (
        <div className={styles.gearIconContainer}>
          <IconButton
            iconProps={{ iconName: 'Settings' }}
            title="Configure Quick Links"
            onClick={() => setIsPanelOpen(true)}
            className={styles.gearIcon}
          />
        </div>
      )}

      {/* Configuration Panel */}
      <ConfigurationPanel
        isOpen={isPanelOpen}
        onDismiss={() => setIsPanelOpen(false)}
        quickLinks={links}
        selectedListId={props.selectedListId}
        selectedListTitle={props.selectedListTitle}
        spService={spService}
        onSave={handleConfigurationSave}
      />

      {/* Content Area */}
      <div className={styles.container}>
        {isLoading && (
          <Stack horizontalAlign="center" tokens={{ padding: 20 }}>
            <Spinner size={SpinnerSize.large} label="Loading quick links..." />
          </Stack>
        )}

        {error && (
          <MessageBar messageBarType={MessageBarType.error}>
            {error}
          </MessageBar>
        )}

        {!isLoading && !error && links.length === 0 && (
          <MessageBar messageBarType={MessageBarType.info}>
            {isEditMode
              ? 'Tap the gear to configure links'
              : 'No quick links configured'}
          </MessageBar>
        )}

        {!isLoading && !error && links.length > 0 && (
          <div className={getContainerClassName()}>
            {links.map(link => (
              <QuickLinkItem
                key={link.id}
                link={link}
                displayStyle={props.displayStyle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickLinksPro;