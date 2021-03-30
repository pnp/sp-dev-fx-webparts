import * as React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useBoolean } from '@uifabric/react-hooks';
import styles from './PhotoSync.module.scss';
import * as strings from 'PhotoSyncWebPartStrings';
import { AppContext, AppContextProps } from '../common/AppContext';
import MessageContainer from '../common/MessageContainer';
import { MessageScope, IUserPickerInfo, IAzFuncValues, SyncType } from '../common/IModel';
import { PrimaryButton } from 'office-ui-fabric-react/lib/components/Button';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { DetailsList, IColumn, DetailsListLayoutMode, ConstrainMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { IPersonaSharedProps, Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { useDropzone } from 'react-dropzone';

import { css } from 'office-ui-fabric-react/lib/Utilities';

const map: any = require('lodash/map');
const find: any = require('lodash/find');
const filter: any = require('lodash/filter');
const uniqBy: any = require('lodash/uniqBy');

export interface IBulkPhotoSyncProps {
    updateSPWithPhoto: (data: IAzFuncValues[], itemid: number) => void;
}

const BulkPhotoSync: React.FC<IBulkPhotoSyncProps> = (props) => {
    const appContext: AppContextProps = useContext(AppContext);
    const [loading, { setTrue: showLoading, setFalse: hideLoading }] = useBoolean(false);
    const [columns, setColumns] = useState<IColumn[]>([]);
    const [showUpdateButton, { setTrue: enableUpdateButton, setFalse: hideUpdateButton }] = useBoolean(false);
    const [processingPhotoUpdate, { setTrue: showPhotoUpdateProcessing, setFalse: hidePhotoUpdateProcessing }] = useBoolean(false);
    const [disableUpload, { toggle: toggleDisableUpload }] = useBoolean(false);
    const [message, setMessage] = useState<any>({ Message: '', Scope: MessageScope.Info });
    const [clearItems, setclearItems] = useState<boolean>(false);
    const { getRootProps, getInputProps, fileRejections, acceptedFiles } = useDropzone({
        accept: 'image/jpeg, image/jpg, image/png',
        disabled: disableUpload,
        noClick: disableUpload,
        noDrag: disableUpload,
        noDragEventsBubbling: disableUpload,
        noKeyboard: disableUpload
    });

    const StatusRender = (childprops) => {
        switch (childprops.Status.toLowerCase()) {
            case 'valid':
                return (
                    <div className={css(styles.fieldContent, styles.greenbgColor)}>
                        <span className={css(styles.spnContent, styles.greenBox)}>{childprops.Status}</span>
                    </div>
                );
            case 'invalid':
                return (
                    <div className={css(styles.fieldContent, styles.redbgColor)}>
                        <span className={css(styles.spnContent, styles.redBox)}>{childprops.Status}</span>
                    </div>
                );
        }
    };

    /**
     * Build columns for Datalist.     
     */
    const _buildColumns = () => {
        let cols: IColumn[] = [];
        let col: string = 'path';
        cols.push({
            key: 'loginname', name: 'User ID', fieldName: col, minWidth: 250, maxWidth: 350,
            onRender: (item: any) => {
                return (<div className={styles.fieldCustomizer}>{item[col].replace('.' + item[col].split('.').pop(), '')}</div>);
            }
        } as IColumn);
        cols.push({
            key: 'usertitle', name: 'Title', fieldName: 'title', minWidth: 250, maxWidth: 350,
            onRender: (item: any, index: number, column: IColumn) => {
                const authorPersona: IPersonaSharedProps = {
                    imageUrl: `/_layouts/15/userphoto.aspx?Size=S&username=${item.name.replace('.' + item.name.split('.').pop(), '')}`,
                    text: item.title,
                    className: styles.divPersona
                };
                return (
                    <div className={styles.fieldCustomizer}><Persona {...authorPersona} size={PersonaSize.size24} /></div>
                );
            }
        } as IColumn);
        cols.push({
            key: 'preview', name: 'Photo', fieldName: col, minWidth: 100, maxWidth: 100,
            onRender: (item: any, index: number, column: IColumn) => {
                return (
                    <div className={styles.fieldCustomizer}>
                        <img style={{ width: '50px' }} src={URL.createObjectURL(item)} />
                    </div>
                );
            }
        } as IColumn);
        cols.push({
            key: 'status', name: 'Status', fieldName: 'status', minWidth: 250, maxWidth: 350,
            onRender: (item: any) => {
                return (<div className={styles.fieldCustomizer}><StatusRender Status={item.status} /></div>);
            }
        } as IColumn);
        setColumns(cols);
    };
    const _listUploadedFiles = async () => {
        if (acceptedFiles.length > 0) {
            showLoading();
            let userids: string[] = map(acceptedFiles, (o) => { return o.name.replace('.' + o.name.split('.').pop(), ''); });
            let userinfo: any[] = await appContext.helper.getUsersInfo(userids);
            console.log(userinfo);
            if (userinfo && userinfo.length > 0) {
                userinfo.map((user: any) => {
                    let fil: any = find(acceptedFiles, (o) => { return o.name.replace('.' + o.name.split('.').pop(), '') == user.loginname; });
                    if (fil) {
                        fil['title'] = user.title;
                        fil['status'] = user.status;
                    }
                });
            }
            _buildColumns();
            hideLoading();
            hidePhotoUpdateProcessing();
            enableUpdateButton();
        }
    };
    /**
     * To generate the photo thumbnails and upload to the temp library.
     * To send the updated final json to the Azure function to trigger the job for photo sync
     */
    const _syncPhotoToSPUPS = async () => {
        showPhotoUpdateProcessing();
        toggleDisableUpload();
        let finalFiles = filter(acceptedFiles, (o) => { return o.status.toLowerCase() == "valid"; });
        console.log(finalFiles);
        let userVals: IAzFuncValues[] = await appContext.helper.generateAndStorePhotoThumbnails(finalFiles, appContext.tempLib);
        let itemID = await appContext.helper.createSyncItem(SyncType.Bulk);
        await props.updateSPWithPhoto(uniqBy(userVals, 'userid'), itemID);
        toggleDisableUpload();
        hidePhotoUpdateProcessing();
        hideUpdateButton();
        setclearItems(true);
        setMessage({ Message: strings.UpdateProcessInitialized, Scope: MessageScope.Success });
    };

    useEffect(() => {
        setMessage({ Message: '' });
        setclearItems(false);
        _listUploadedFiles();
    }, [acceptedFiles]);
    return (
        <div>
            <div style={{ margin: '5px 0px' }}>
                <MessageContainer MessageScope={MessageScope.Info} Message={strings.BulkSyncNote} />
            </div>
            <section className={styles.dropZoneContainer}>
                <div {...getRootProps({ className: css(styles.dropzone, disableUpload ? styles.dropZonedisabled : '') })}>
                    <input {...getInputProps()} />
                    <p>{strings.BulkPhotoDragDrop}</p>
                </div>
            </section>
            {loading &&
                <ProgressIndicator label="Loading Photos..." description="Please wait..." />
            }
            {!loading && message && message.Message && message.Message.length > 0 &&
                <MessageContainer MessageScope={message.Scope} Message={message.Message} />
            }
            {!loading && !clearItems && acceptedFiles && acceptedFiles.length > 0 &&
                <>
                    <div className={styles.detailsListContainer}>
                        <DetailsList
                            items={clearItems ? [] : acceptedFiles}
                            setKey="set"
                            columns={columns}
                            compact={true}
                            layoutMode={DetailsListLayoutMode.justified}
                            constrainMode={ConstrainMode.unconstrained}
                            isHeaderVisible={true}
                            selectionMode={SelectionMode.none}
                            enableShimmer={true} />
                    </div>
                    {showUpdateButton &&
                        <div style={{ marginTop: "5px" }}>
                            <PrimaryButton text={strings.BtnUpdatePhoto} onClick={_syncPhotoToSPUPS} disabled={processingPhotoUpdate} />
                            {processingPhotoUpdate && <Spinner className={styles.generateTemplateLoader} label={strings.PropsLoader} ariaLive="assertive" labelPosition="right" />}
                        </div>
                    }
                </>
            }
        </div>
    );
};

export default BulkPhotoSync;