import * as React from 'react';
import { useFetchSites } from './useFetchSites';

import { Dropdown, MessageBar } from '@fluentui/react';
import * as strings from 'SvgToJsonWebPartStrings';



interface SiteSelectorProps {
  context: any;
  onSiteChange: (siteUrl: string) => void;
  className?: string;
}

const SiteSelector: React.FC<SiteSelectorProps> = ({ context, onSiteChange, className }) => {
  const { sites, message, messageType } = useFetchSites(context);

  return (
    <div className={className}>
      {message && <MessageBar messageBarType={messageType}>{message}</MessageBar>}
      <Dropdown
        placeholder={strings.SelectSite}
        options={sites}
        label={strings.Sites}
        onChange={(event, option) => onSiteChange(option?.key as string)}
      />
    </div>
  );
};

export default SiteSelector;