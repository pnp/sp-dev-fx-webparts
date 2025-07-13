import * as React from 'react';
import { useState } from 'react';
import styles from './MigratePersonalSettings.module.scss';
import type { IMigratePersonalSettingsProps } from './IMigratePersonalSettingsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { PrimaryButton, MessageBar, MessageBarType, Spinner } from '@fluentui/react';
import { ListView, SelectionMode } from '@pnp/spfx-controls-react/lib/ListView';

interface DriveItem {
  id: string;
  name: string;
  size?: number;
  lastModifiedDateTime?: string;
  webUrl?: string;
}

interface FileContent {
  name: string;
  content: string;
}

const MigratePersonalSettings: React.FC<IMigratePersonalSettingsProps> = ({
  isDarkTheme,
  environmentMessage,
  hasTeamsContext,
  userDisplayName,
  msGraphClient
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: MessageBarType } | null>(null);
  const [legacyFiles, setLegacyFiles] = useState<DriveItem[]>([]);
  const [selectedFileContent, setSelectedFileContent] = useState<FileContent | null>(null);
  const [isLoadingContent, setIsLoadingContent] = useState(false);

  const handleBrowseLegacyFiles = async (): Promise<void> => {
    setIsLoading(true);
    setMessage(null);
    
    try {
      // Use the MSGraphClient instance passed via props
      const response = await msGraphClient
        .api('/me/drive/root:/Apps/SharePoint Online Client Extensibility Web Application Principal:/children')
        .get();
      
      console.log('Legacy app files (native MSGraphClient):', response);
      setLegacyFiles(response.value || []);
      setMessage({ 
        text: `Legacy app files retrieved successfully! Found ${response.value?.length || 0} items.`, 
        type: MessageBarType.success 
      });
      
    } catch (error) {
      console.error('Failed to browse legacy app files with native MSGraphClient:', error);
      setMessage({ 
        text: `Failed to browse legacy app files: ${error instanceof Error ? error.message : 'Unknown error'}. Make sure you have the required permissions.`, 
        type: MessageBarType.error 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewFileContent = async (file: DriveItem): Promise<void> => {
    setIsLoadingContent(true);
    setMessage(null);
    
    try {
      // Get the file content using the file's download URL
      const response = await msGraphClient
        .api(`/me/drive/items/${file.id}/content`)
        .get();
      
      console.log('File content retrieved:', file.name, typeof response);
      
      // Handle different response types
      let contentString: string;
      if (typeof response === 'string') {
        contentString = response;
      } else if (response && typeof response === 'object') {
        // If it's an object, try to convert to string or extract meaningful content
        contentString = JSON.stringify(response, null, 2);
      } else {
        contentString = String(response || 'No content available');
      }
      
      setSelectedFileContent({
        name: file.name,
        content: contentString
      });
      
      setMessage({ 
        text: `File content loaded successfully for: ${file.name}`, 
        type: MessageBarType.success 
      });
      
    } catch (error) {
      console.error('Failed to load file content:', error);
      setMessage({ 
        text: `Failed to load file content: ${error instanceof Error ? error.message : 'Unknown error'}. The file might be binary or access is restricted.`, 
        type: MessageBarType.error 
      });
    } finally {
      setIsLoadingContent(false);
    }
  };

  return (
    <section className={`${styles.migratePersonalSettings} ${hasTeamsContext ? styles.teams : ''}`}>
      <div className={styles.welcome}>
        <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
        <h2>Well done, {escape(userDisplayName)}!</h2>
        <div>{environmentMessage}</div>
      </div>
      
      {/* Legacy Files Browser Section */}
      <div className={styles.authSection}>
        <h3>Legacy app files browser</h3>
        
        {message && (
          <div className={styles.messageBarContainer}>
            <MessageBar messageBarType={message.type} onDismiss={() => setMessage(null)}>
              {message.text}
            </MessageBar>
          </div>
        )}
        
        {isLoading && <Spinner label="Loading legacy files..." />}
        
        <div className={styles.buttonContainer}>
          <PrimaryButton 
            text="Browse legacy app files" 
            onClick={handleBrowseLegacyFiles} 
            disabled={isLoading}
          />
        </div>
        
        {legacyFiles.length > 0 && (
          <div className={styles.filesSection}>
            <strong>Legacy App Files:</strong>
            <ListView
              items={legacyFiles}
              viewFields={[
                {
                  name: 'name',
                  displayName: 'File Name',
                  maxWidth: 200,
                  render: (item: DriveItem) => {
                    return <span>{item.name}</span>;
                  }
                },
                {
                  name: 'size',
                  displayName: 'Size',
                  maxWidth: 100,
                  render: (item: DriveItem) => {
                    return <span>{item.size ? `${Math.round(item.size / 1024)} KB` : 'N/A'}</span>;
                  }
                },
                {
                  name: 'lastModifiedDateTime',
                  displayName: 'Modified',
                  maxWidth: 150,
                  render: (item: DriveItem) => {
                    return item.lastModifiedDateTime ? 
                      <span>{new Date(item.lastModifiedDateTime).toLocaleDateString()}</span> : 
                      <span>N/A</span>;
                  }
                },
                {
                  name: 'webUrl',
                  displayName: 'Actions',
                  maxWidth: 150,
                  render: (item: DriveItem) => {
                    return (
                      <div className={styles.actionsContainer}>
                        {item.webUrl && (
                          <a href={item.webUrl} target="_blank" rel="noopener noreferrer">View</a>
                        )}
                        <button 
                          onClick={() => handleViewFileContent(item)}
                          disabled={isLoadingContent}
                          className={styles.contentButton}
                        >
                          {isLoadingContent ? 'Loading...' : 'Content'}
                        </button>
                      </div>
                    );
                  }
                }
              ]}
              iconFieldName=""
              compact={false}
              selectionMode={SelectionMode.none}
              showFilter={true}
              filterPlaceHolder="Search files..."
            />
          </div>
        )}
        
        {selectedFileContent && (
          <div className={styles.contentSection}>
            <div className={styles.contentHeader}>
              <strong>File Content: {selectedFileContent.name}</strong>
              <button 
                onClick={() => setSelectedFileContent(null)}
                className={styles.closeButton}
              >
                ×
              </button>
            </div>
            <div className={styles.contentDisplay}>
              <pre className={styles.contentText}>
                {selectedFileContent.content}
              </pre>
            </div>
          </div>
        )}
      </div>      
    </section>
  );
};

export default MigratePersonalSettings;
