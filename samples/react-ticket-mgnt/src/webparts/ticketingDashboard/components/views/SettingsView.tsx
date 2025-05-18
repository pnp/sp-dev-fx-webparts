import * as React from 'react';
import styles from '../TicketingDashboard.module.scss';


export interface ISettingsViewProps {
  userDisplayName: string;
}

export const SettingsView: React.FC<ISettingsViewProps> = (props): React.ReactElement => {
  const { userDisplayName } = props;
  const [fullName, setFullName] = React.useState(userDisplayName);
  const [email, setEmail] = React.useState('');
  
  const handleSave = (): void => {
    alert('Settings saved!');
    // Here you would normally send the settings to your API
    console.log("Saved settings:", { fullName, email });
  };
  
  return (
    <div id="settings" className={styles.view}>
      <div className={styles.header}>
        <h1>Settings</h1>
      </div>
      <p>🧑‍💻 Profile Settings</p>
      <input 
        type="text" 
        placeholder="Full Name" 
        value={fullName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setFullName(e.target.value)}
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value)}
      />
      <button className={styles.btn} onClick={handleSave}>Save Settings</button>
    </div>
  );
};