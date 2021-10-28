import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps } from './IHelloWorldProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {
  PrimaryButton,
  TextField,
  Toggle,
  Spinner,
  SpinnerSize
} from 'office-ui-fabric-react';
import { MSGraphClient } from '@microsoft/sp-http';

interface IUserData {
  Theme: string;
  Token: string;
  Preference1: string;
}

let _Theme: string = '';
let _Token: string = '';
let _Preference1: string = '';

const Dashboard: React.FunctionComponent<IHelloWorldProps> = (props) => {
  const [userSettings, setUserSettings] = React.useState<IUserData | null>(null);
  const [currentTheme, setTheme] = React.useState<string>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const setUserData = async () => {
    props.context.msGraphClientFactory
      .getClient()
      .then((client: MSGraphClient) => {
        client
          .api("me/drive/special/approot:/CrossDeviceApp/settings.json:/content")
          .version("v1.0")
          .put(`{"Theme": "${_Theme}", "Token": "${_Token}", "Preference1": "${_Preference1}"}`, (err, res) => {
            console.log(err, res);
          });
      });
  };

  const getUserData = async () => {

    try {
      const msGraphClient = await props.context.msGraphClientFactory.getClient();
      const result = await msGraphClient
        .api("me/drive/special/approot:/CrossDeviceApp/settings.json?select=@microsoft.graph.downloadUrl")
        .version("v1.0")
        .get();
      console.log(result);
      const response = await fetch(`${result['@microsoft.graph.downloadUrl']}`);
      console.log('response', response);
      const userData: IUserData = await response.json();
      _Theme = userData.Theme;
      _Token = userData.Token;
      _Preference1 = userData.Preference1;
      console.log('userData', userData);
      return userData;
    } catch (error) {
      const userData: IUserData = JSON.parse(`{"Theme": "", "Token": "", "Preference1": ""}`);
      return userData;      
    }
  };

  const loadUserData = async () => {
    return await getUserData();
  };

  const onChangeTheme = (ev: React.MouseEvent<HTMLElement>, checked?: boolean): void => {
    if (checked) {
      _Theme = 'Dark';
    } else {
      _Theme = 'Light';
    }
    setTheme(_Theme);
  };
  const onChangeToken = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newText: string): void => {
    _Token = newText;
  };
  const onChangePreference1 = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newText: string): void => {
    _Preference1 = newText;
  };

  React.useEffect(() => {
    console.log('useEffect');
    (async () => {
      let data = await loadUserData();
      console.log('loadUserData', data);
      setUserSettings(data);
      setIsLoading(false);
    })();
  }, []);

  let view: any = <Spinner size={SpinnerSize.large} />;
  if (isLoading !== true) {
    let theme: any =
      userSettings.Theme == 'Dark'
        ? <Toggle label="Which Theme do you prefer?" defaultChecked onText="Dark" offText="Light" onChange={onChangeTheme} className={(_Theme === 'Dark') ? styles.textFieldcssStyledDark : styles.textFieldcssStyledLight} />
        : <Toggle label="Which Theme do you prefer?" onText="Dark" offText="Light" onChange={onChangeTheme} className={(_Theme === 'Dark') ? styles.textFieldcssStyledDark : styles.textFieldcssStyledLight} />;
    if (userSettings !== null) {
      view =
        <div>
          <div className={(_Theme === 'Dark') ? styles.rowDark : styles.rowLight}>
            <div className={styles.column}>
              {theme}
              {/* <TextField label="Theme:" underlined placeholder="Enter text here" defaultValue={userSettings.Theme} onChange={onChangeTheme} className={styles.textFieldcssStyled} /> */}
            </div>
          </div>
          <div className={(_Theme === 'Dark') ? styles.rowDark : styles.rowLight}>
            <div className={styles.column}>
              <TextField label="Token:" underlined placeholder="Enter text here" defaultValue={userSettings.Token} onChange={onChangeToken} className={(_Theme === 'Dark') ? styles.textFieldcssStyledDark : styles.textFieldcssStyledLight} />
            </div>
          </div>
          <div className={(_Theme === 'Dark') ? styles.rowDark : styles.rowLight}>
            <div className={styles.column}>
              <TextField label="Preference1:" underlined placeholder="Enter text here" defaultValue={userSettings.Preference1} onChange={onChangePreference1} className={(_Theme === 'Dark') ? styles.textFieldcssStyledDark : styles.textFieldcssStyledLight} />
            </div>
          </div>
          <div className={(_Theme === 'Dark') ? styles.rowDark : styles.rowLight}>
            <div className={styles.column}>
              <PrimaryButton text='Save current user data' onClick={setUserData} ></PrimaryButton>
            </div>
          </div>
          <div className={(_Theme === 'Dark') ? styles.rowDark : styles.rowLight}>
            <div className={styles.column}>
              <PrimaryButton text='Get current user data' onClick={getUserData} ></PrimaryButton>
            </div>
          </div>
        </div>;
    }
  }

  return (
    <div className={styles.helloWorld}>
      <div className={styles.container}>
        {view}
      </div>
    </div>
  );
};

export default Dashboard;
