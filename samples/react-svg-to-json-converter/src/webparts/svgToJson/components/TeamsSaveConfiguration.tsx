import * as React from 'react';
import { TextField, PrimaryButton, MessageBar, MessageBarType } from '@fluentui/react';
import { ThemeProvider, getTheme } from '@fluentui/react';
import styles from './SvgToJson.module.scss';

interface TeamsSaveConfigurationProps {
  selectedSite: string | null;
  setSelectedSite: React.Dispatch<React.SetStateAction<string | null>>;
  libraryName: string | null;
  setLibraryName: React.Dispatch<React.SetStateAction<string | null>>;
  handleSaveConfiguration: () => void;
  message: string | null;
  messageType: MessageBarType;
}

const TeamsSaveConfiguration: React.FC<TeamsSaveConfigurationProps> = ({
  selectedSite,
  setSelectedSite,
  libraryName,
  setLibraryName,
  handleSaveConfiguration,
  message,
  messageType
}) => {
  const theme = getTheme();

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.svgToJson}>
        <MessageBar messageBarType={MessageBarType.info}>
          Let's configure this app first.
        </MessageBar>
        {message && <MessageBar messageBarType={messageType}>{message}</MessageBar>}
        <TextField
          label="Site URL"
          value={selectedSite || ''}
          onChange={(e, newValue) => setSelectedSite(newValue || '')}
          className={styles.inputField}
        />
        <TextField
          label="Library Name"
          value={libraryName || ''}
          onChange={(e, newValue) => setLibraryName(newValue || '')}
          className={styles.inputField}
        />
        <PrimaryButton text="Save Configuration" onClick={handleSaveConfiguration} className={styles.teamsButton} />
      </div>
    </ThemeProvider>
  );
};

export default TeamsSaveConfiguration;