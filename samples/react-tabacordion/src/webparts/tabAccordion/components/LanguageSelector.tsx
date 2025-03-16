import * as React from 'react';
import { 
  Dropdown, 
  IDropdownOption,
  Stack,
  Icon,
  IDropdownStyles,
  getTheme
} from '@fluentui/react';
import { ILanguage } from '../services/LanguageService';

export interface ILanguageSelectorProps {
  availableLanguages: ILanguage[];
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

export const LanguageSelector: React.FC<ILanguageSelectorProps> = (props) => {
  const theme = getTheme();
  
  const handleLanguageChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): void => {
    if (option) {
      props.onLanguageChange(option.key as string);
    }
  };
  
  // Generate language options for dropdown
  const languageOptions: IDropdownOption[] = props.availableLanguages.map(lang => ({
    key: lang.code,
    text: lang.name
  }));
  
  // Custom styles for the dropdown
  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: {
      width: 180
    },
    title: {
      border: 'none',
      background: 'transparent',
      color: theme.palette.neutralPrimary
    },
    caretDownWrapper: {
      color: theme.palette.neutralPrimary
    }
  };
  
  return (
    <Stack horizontal horizontalAlign="end" style={{ marginBottom: 10 }}>
      {/* Language icon displayed separately */}
      <Icon iconName="Globe" styles={{ root: { marginRight: 8, marginTop: 3 } }} />
      <Dropdown
        selectedKey={props.currentLanguage}
        options={languageOptions}
        onChange={handleLanguageChange}
        placeholder="Select language"
        styles={dropdownStyles}
        ariaLabel="Select language"
      />
    </Stack>
  );
};