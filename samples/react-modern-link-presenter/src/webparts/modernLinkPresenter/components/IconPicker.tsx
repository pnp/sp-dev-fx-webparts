import * as React from 'react';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { Icon } from '@fluentui/react/lib/Icon';

const ICON_OPTIONS: IDropdownOption[] = [
  { key: '', text: 'None' },
  { key: 'Link', text: 'Link' },
  { key: 'Globe', text: 'Globe' },
  { key: 'Mail', text: 'Mail' },
  { key: 'Document', text: 'Document' },
  { key: 'Share', text: 'Share' },
  { key: 'FavoriteStar', text: 'FavoriteStar' },
  { key: 'Home', text: 'Home' },
  { key: 'NavigateExternalInline', text: 'NavigateExternalInline' },
  { key: 'OpenInNewTab', text: 'OpenInNewTab' },
  { key: 'World', text: 'World' },
  { key: 'ReadingMode', text: 'ReadingMode' },
  { key: 'Page', text: 'Page' },
  { key: 'People', text: 'People' },
  { key: 'Contact', text: 'Contact' },
  { key: 'Phone', text: 'Phone' },
  { key: 'Chat', text: 'Chat' },
  { key: 'TeamsLogo', text: 'TeamsLogo' },
  { key: 'SkypeLogo', text: 'SkypeLogo' },
  { key: 'Settings', text: 'Settings' },
  { key: 'Info', text: 'Info' },
  { key: 'Help', text: 'Help' },
  { key: 'Warning', text: 'Warning' },
  { key: 'Error', text: 'Error' },
  { key: 'CheckMark', text: 'CheckMark' },
  { key: 'ChevronRight', text: 'ChevronRight' },
  { key: 'ChevronDown', text: 'ChevronDown' },
  { key: 'ChevronUp', text: 'ChevronUp' },
  { key: 'ChevronLeft', text: 'ChevronLeft' },
];

export interface IconPickerProps {
  value?: string;
  onChange: (iconName: string) => void;
}

export const IconPicker: React.FC<IconPickerProps> = ({ value, onChange }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Dropdown
        options={ICON_OPTIONS}
        selectedKey={value || ''}
        onChange={(_, option) => onChange(option?.key as string)}
        style={{ minWidth: 120 }}
      />
      {value && <Icon iconName={value} style={{ fontSize: 20 }} />}
    </div>
  );
}; 