import * as React from 'react';
import {
  Stack,
  Text,
  DefaultButton,
  Icon,
  TooltipHost
} from '@fluentui/react';
import { ISiteInfo } from '../services/SiteService';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import styles from './styles/CurrentSiteInfo.module.scss';

export interface ICurrentSiteInfoProps {
  context: WebPartContext;
  selectedSite?: ISiteInfo | null;
  onChangeSite: () => void;
  disabled?: boolean;
  additionalSelectedCount?: number;
}

export const CurrentSiteInfo: React.FunctionComponent<ICurrentSiteInfoProps> = (props) => {
  const { context, selectedSite, onChangeSite, disabled, additionalSelectedCount = 0 } = props;

  const currentSite: ISiteInfo = selectedSite || {
    id: context.pageContext.site.id?.toString() || '',
    title: context.pageContext.web.title,
    url: context.pageContext.web.absoluteUrl,
    serverRelativeUrl: context.pageContext.web.serverRelativeUrl,
    description: context.pageContext.web.description || '',
    template: context.pageContext.web.templateName || 'STS',
    isSubsite: (context.pageContext.web as any).isSubWeb || false,
    lastModified: new Date(),
    created: new Date()
  };

  const isRemoteSite = selectedSite && selectedSite.url !== context.pageContext.web.absoluteUrl;

  return (
    <div className={styles.currentSiteInfo}>
      <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 12 }}>
        <Icon
          iconName={currentSite.isSubsite ? 'WebAppBuilderFragment' : 'Website'}
          style={{
            color: isRemoteSite ? '#0078d4' : '#107c10',
            fontSize: '16px'
          }}
        />

        <Stack grow={1} tokens={{ childrenGap: 2 }}>
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
            <Text variant="medium" style={{ fontWeight: '600' }}>
              {currentSite.title}
            </Text>
            {isRemoteSite && (
              <TooltipHost content="You are managing a remote site">
                <Icon
                  iconName="Globe"
                  style={{ color: '#0078d4', fontSize: '12px' }}
                />
              </TooltipHost>
            )}
            {currentSite.isSubsite && (
              <TooltipHost content="This is a subsite">
                <Icon
                  iconName="WebAppBuilderFragment"
                  style={{ color: '#666', fontSize: '12px' }}
                />
              </TooltipHost>
            )}
          </Stack>
          <Text variant="small" style={{ color: '#666' }}>
            {currentSite.url}
            {additionalSelectedCount > 0 && (
              <span style={{ color: '#0078d4' }}>{` (+${additionalSelectedCount} more)`}</span>
            )}
          </Text>
        </Stack>

        <TooltipHost content="Switch to a different site">
          <DefaultButton
            iconProps={{ iconName: 'Switch' }}
            text="Change Site"
            onClick={onChangeSite}
            disabled={disabled}
            styles={{
              root: {
                minWidth: '100px'
              }
            }}
          />
        </TooltipHost>
      </Stack>

      {(isRemoteSite || additionalSelectedCount > 0) && (
        <div className={styles.remoteWarning}>
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
            <Icon iconName="Info" style={{ color: '#0078d4', fontSize: '14px' }} />
            <Text variant="small" style={{ color: '#0078d4' }}>
              {additionalSelectedCount > 0
                ? `You are managing custom actions on ${additionalSelectedCount + 1} sites. Changes will be applied to all selected sites.`
                : `You are managing custom actions on a remote site. Changes will be applied to ${currentSite.title}.`}
            </Text>
          </Stack>
        </div>
      )}
    </div>
  );
};

export default CurrentSiteInfo;
