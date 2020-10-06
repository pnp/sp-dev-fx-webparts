import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './SaveAttachments.module.scss';
import { IFolder } from '../../../models/IFolder';
import { ISaveAttachmentsProps } from './ISaveAttachmentsProps';
import { PrimaryButton, ActionButton } from 'office-ui-fabric-react/lib/Button';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
initializeIcons();

export const SaveAttachments: React.FunctionComponent<ISaveAttachmentsProps> = (props) => {
  const [folders, setFolders] = useState<IFolder[]>([]);
  const [selectedFolder, updateSelectedFolder] = useState<IFolder>(null);
  const [checkedAttachments, updateCheckedAttachments] = useState([]);
  const [status, updateStatus] = useState('');
  const [loading, updateLoading] = useState<boolean>(undefined);

  const successMessage = 'Attachments saved successfully';

  useEffect(() => {
    props.graphHelper.getOneDriveFolders().then((_folders) => {
      setFolders(_folders);
    });
  }, []);

  const updateAttachments = (ev: React.FormEvent<HTMLElement>, checked: boolean, attachment: any) => {
    let attachments = [...checkedAttachments];
    if (checked) {
      attachments.push(attachment);
    } else {
      attachments.splice(attachments.indexOf(attachment));
    }
    updateCheckedAttachments(attachments);
  };

  const copyToOneDrive = async () => {
    updateLoading(true);
    try {
      await Promise.all(checkedAttachments.map(async (attachment) => {
        const attachmentContent = await props.graphHelper.getAttachmentContent(props.mail.id, attachment.id.replace(/\//g, '-').replace(/\+/g, '_'));
        if (attachmentContent.size > 4 * 1024 * 1024) {
          await props.graphHelper.saveLargeAttachment(attachmentContent, attachment.name, selectedFolder.id);
        } else {
          await props.graphHelper.saveAttachment(attachmentContent, attachment.name, selectedFolder.id);
        }
      }));
      updateStatus(successMessage);
    } catch (error) {
      updateStatus('Some error occurred');
    }
    updateLoading(false);
  };

  return (
    <div className={styles.saveAttachments}>
      <div className={styles.container}>
        <div className={styles.row}>
          {props.mail && props.mail.attachments.length > 0 &&
            <div className={styles.column}>
              <div>
                <div className={styles.subTitle}>Select the folder:</div>
                {selectedFolder &&
                  <div className={styles.folderBreadcrumb}>
                    <div className={styles.folderTitle}
                      onClick={async () => {
                        updateLoading(undefined);
                        updateSelectedFolder(selectedFolder.parentFolder);
                        selectedFolder.parentFolder ?
                          setFolders(await props.graphHelper.getSubFolder(selectedFolder.parentFolder)) :
                          setFolders(await props.graphHelper.getOneDriveFolders());
                      }}
                    >
                      <b>{selectedFolder !== null && selectedFolder.parentFolder ? selectedFolder.parentFolder.name : 'OneDrive'}</b>
                    </div>
                    <div className={styles.folderTitle}>
                      &nbsp;<b>{selectedFolder ? `> ${selectedFolder.name}` : ''}</b>
                    </div>
                  </div>
                }
                {folders.map((folder, i) => {
                  return (
                    <div key={i} >
                      <ActionButton iconProps={{ iconName: 'FabricFolder' }}
                        allowDisabledFocus
                        styles={{ root: { height: '20px' } }}
                        onClick={async () => { updateLoading(undefined); updateSelectedFolder(folder); setFolders(await props.graphHelper.getSubFolder(folder)); }}
                      >
                        {folder.name}
                      </ActionButton>
                    </div>
                  );
                })}
              </div>
              <div className={styles.subTitle}>Select the attachments:</div>
              <div className={styles.checkboxGroup}>
                {props.mail.attachments.map((attachment) => {
                  return (
                    <div className={styles.checkboxRow}>
                      <Checkbox label={attachment.name}
                        onChange={(ev, checked) => { updateLoading(undefined); updateAttachments(ev, checked, attachment); }}
                        styles={{ checkbox: { width: '15px', height: '15px', marginTop: '3px' } }}
                      />
                    </div>
                  );
                })}
              </div>
              <br />
              {loading === false &&
                <div className={styles.status}>
                  {status === successMessage &&
                    <div className={styles.checkIcon}>
                      <Icon iconName='SkypeCircleCheck' />
                    </div>
                  }
                  <div className={styles.statusText}>
                    {status}
                  </div>
                </div>
              }
              {loading === true &&
                <div>
                  <Spinner />
                  <div className={styles.loaderText}>Uploading...</div>
                </div>
              }
              <br />
              <PrimaryButton text='Save'
                onClick={copyToOneDrive}
                disabled={selectedFolder === null || checkedAttachments.length === 0 ? true : false}
              />
            </div>
          }
          {props.mail && props.mail.attachments.length === 0 &&
            <div className={styles.column}>
              <div className={styles.subTitle}>This email does not contain any attachments</div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};
