import * as React from 'react';
import styles from './PersonalAppSettings.module.scss';
import AppContext, { IAppContext } from '../common/AppContext';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { SettingsPanel } from './settingsPanel/SettingsPanel';
import * as strings from 'PersonalAppSettingsWebPartStrings';

/**
 * Component to render web part props
 */
const PersonalAppSettings: React.FC = () => {
  // getting context
  const { webPartProps } = React.useContext<IAppContext>(AppContext);
  // flag if the edit panel is open
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = React.useState<boolean>(false);

  return <div className={styles.personalAppSettings}>
    <div>
      <TextField readOnly={true} label={strings.WebPartTitle} value={webPartProps ? webPartProps.title : ''}></TextField>
      <TextField readOnly={true} label={strings.WebPartDescription} value={webPartProps ? webPartProps.description : ''}></TextField>
    </div>
    <div className={styles.edit}>
      <PrimaryButton text={strings.Edit} onClick={() => { setIsSettingsPanelOpen(true); }}></PrimaryButton>
    </div>
    {isSettingsPanelOpen &&
      <SettingsPanel
        onClosePanel={() => { setIsSettingsPanelOpen(false); }}
      />
    }
  </div>;
};

export default PersonalAppSettings;
