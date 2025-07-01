import * as React from 'react';
import styles from './PersonalSettings.module.scss';
import type { IPersonalSettingsProps } from './IPersonalSettingsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { useState, useEffect } from 'react';
import { AadHttpClient } from '@microsoft/sp-http';

interface Setting {
  key: string;
  value: string;
}

const PersonalSettings: React.FC<IPersonalSettingsProps> = ({
  aadHttpClient,
  apiUrl,
  isDarkTheme,
  environmentMessage,
  hasTeamsContext,
  userDisplayName
}) => {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [editKey, setEditKey] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const fetchSettings = async (): Promise<void> => {
    if (!aadHttpClient) return;
    setLoading(true);
    setMessage('');
    try {
      const res = await aadHttpClient.get(apiUrl, AadHttpClient.configurations.v1);
      if (!res.ok) throw new Error('Failed to list settings');
      const data = await res.json();
      setSettings(Array.isArray(data) ? data : []);
    } catch (err) {
      setMessage((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect((): void => {
    fetchSettings().catch(() => { /* error already handled in fetchSettings */ });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aadHttpClient]);

  const handleAdd = async (): Promise<void> => {
    if (!aadHttpClient || !key) return;
    setLoading(true);
    setMessage('');
    try {
      const res = await aadHttpClient.fetch(`${apiUrl}/${encodeURIComponent(key)}`, AadHttpClient.configurations.v1, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value)
      });
      if (!res.ok) throw new Error('Failed to add setting');
      setKey('');
      setValue('');
      await fetchSettings();
    } catch (err) {
      setMessage((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (): Promise<void> => {
    if (!aadHttpClient || !editKey) return;
    setLoading(true);
    setMessage('');
    try {
      const res = await aadHttpClient.fetch(`${apiUrl}/${encodeURIComponent(editKey)}`, AadHttpClient.configurations.v1, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value)
      });
      if (!res.ok) throw new Error('Failed to update setting');
      setEditKey(null);
      setKey('');
      setValue('');
      await fetchSettings();
    } catch (err) {
      setMessage((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (removeKey: string): Promise<void> => {
    if (!aadHttpClient) return;
    setLoading(true);
    setMessage('');
    try {
      const res = await aadHttpClient.fetch(`${apiUrl}/${encodeURIComponent(removeKey)}`, AadHttpClient.configurations.v1, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to remove setting');
      await fetchSettings();
    } catch (err) {
      setMessage((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (setting: Setting): void => {
    setEditKey(setting.key);
    setKey(setting.key);
    setValue(setting.value);
  };

  const cancelEdit = (): void => {
    setEditKey(null);
    setKey('');
    setValue('');
  };

  if (!aadHttpClient) {
    return (
      <section className={`${styles.personalSettings} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <h2>Personal Settings</h2>
          <div style={{ color: 'red', margin: '16px 0' }}>
            Please configure the API URL in the web part properties.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${styles.personalSettings} ${hasTeamsContext ? styles.teams : ''}`}>
      <div className={styles.welcome}>
        <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
        <h2>Welcome, {escape(userDisplayName)}!</h2>
        <div>{environmentMessage}</div>
      </div>
      <div>
        <h3>Personal Settings</h3>
        {message && <div style={{ color: 'red' }}>{message}</div>}
        <div>
          <input
            type="text"
            placeholder="Key"
            value={key}
            onChange={e => setKey(e.target.value)}
            disabled={!!editKey}
          />
          <input
            type="text"
            placeholder="Value"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          {editKey ? (
            <>
              <button onClick={handleUpdate} disabled={loading}>Update</button>
              <button onClick={cancelEdit} disabled={loading}>Cancel</button>
            </>
          ) : (
            <button onClick={handleAdd} disabled={loading}>Add</button>
          )}
        </div>
        <table style={{ width: '100%', marginTop: 16 }}>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {settings.map(s => (
              <tr key={s.key}>
                <td>{escape(s.key)}</td>
                <td>{escape(s.value)}</td>
                <td>
                  <button onClick={() => startEdit(s)} disabled={loading}>Edit</button>
                  <button onClick={() => handleRemove(s.key)} disabled={loading}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PersonalSettings;
