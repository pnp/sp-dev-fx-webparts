import * as React from 'react';
import { FormDisplayMode } from '@microsoft/sp-core-library';
import { FormCustomizerContext } from '@microsoft/sp-listview-extensibility';
import { DynamicForm } from '@pnp/spfx-controls-react/lib/DynamicForm';
import { IDynamicFieldProps } from '@pnp/spfx-controls-react/lib/controls/dynamicForm/dynamicField';
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import { ITextFieldProps, TextField } from 'office-ui-fabric-react/lib/TextField';
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';
import { Icon, IIconStyles } from 'office-ui-fabric-react/lib/Icon';
import styles from './NewSiteForm.module.scss';
import { SharePointService } from '../../../shared/services/SharePointService';
import * as strings from 'NewSiteFormFormCustomizerStrings';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { endsWith, isEmpty, startsWith } from 'lodash';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { ISiteListItem } from '../../../shared/interfaces';
import { aliasPattern } from '../../../shared/constants';
import { formatAlias } from '../../../shared/utils';

export interface INewSiteFormProps {
    context: FormCustomizerContext;
    displayMode: FormDisplayMode;
    emailDomain: string;
    managedPath?: string;
    onSave: () => void;
    onClose: () => void;
}

interface INewSiteFormState {
    verified: boolean;
    verifying: boolean;
    submitError?: string;
}

interface IUrlFieldState {
    urlName?: string;
    url?: string;
    urlAvailable?: boolean;
    urlError?: string;
    customizeUrl: boolean;
}

interface IGroupFieldState {
    groupAlias?: string;
    groupEmail?: string;
    groupAliasAvailable?: boolean;
    groupAliasError?: string;
    customizeGroupAlias: boolean;
}

interface ISiteNameFieldState {
    siteName?: string;
    siteNameAvailable?: boolean;
    siteNameError?: string;
}

const stackTokens: IStackTokens = { childrenGap: 4, maxWidth: 300, };
const iconStyles: Partial<IIconStyles> = { root: { marginBottom: -3 } };
let debouncer: number;

export default function NewSiteForm(props:INewSiteFormProps): React.ReactElement<INewSiteFormProps> {
    const spService = props.context.serviceScope.consume(SharePointService.serviceKey);

    const [state, setState] = React.useState<INewSiteFormState>({
        verified: false,
        verifying: false
    });
    
    const [urlFieldState, setUrlFieldState] = React.useState<IUrlFieldState>({
        customizeUrl: false
    });

    const [groupFieldState, setGroupFieldState] = React.useState<IGroupFieldState>({
        customizeGroupAlias: false
    });

    const [siteNameFieldState, setSiteNameFieldState] = React.useState<ISiteNameFieldState>({});


    
    function setListItemData(listItemData: ISiteListItem): Promise<void> {
        if (listItemData === undefined) {
            return;
        }

        let urlName = null;

        if (listItemData.URL?.Url !== undefined) {
            const segments = listItemData.URL.Url.split('/');
            urlName = segments[segments.length - 1];
        }

        setGroupFieldState({
            ...groupFieldState, 
            groupAlias: listItemData.GroupMailbox?.split('@')[0],
            groupEmail: listItemData.GroupMailbox
        });

        setUrlFieldState({
            ...urlFieldState, 
            urlName: urlName,
            url: listItemData.URL?.Url,
        });
        
        setSiteNameFieldState({
            ...siteNameFieldState, 
            siteName: listItemData.Title
        });

        return Promise.resolve();
    }

    async function onBeforeSubmit(listItemData: ISiteListItem): Promise<boolean> {
        console.log(listItemData);

        setState({ ...state, submitError: null });

        //set the custom fields group mailbox and url
        //the rest is saved by the dynamic form
        listItemData.URL = { Url: urlFieldState.url, Description: '' };
        listItemData.GroupMailbox = groupFieldState.groupEmail;

        return false;
    }

    function renderSiteNameField(fieldProperties: IDynamicFieldProps): React.ReactElement<IDynamicFieldProps> {
        const { verified, verifying } = state;
        const { groupAliasAvailable } = groupFieldState;
        const { siteNameAvailable, siteNameError } = siteNameFieldState;

        return <>
            <div className={styles.fieldWrapper}>
                <TextField label={fieldProperties.fieldTitle} onRenderLabel={(p, dr) => labelRenderer(p, dr, "TextField")} defaultValue={fieldProperties.fieldDefaultValue} onChange={(ev, newValue) => onChangeSiteNameField(fieldProperties, newValue)} required={fieldProperties.required} disabled={fieldProperties.disabled} placeholder={fieldProperties.placeholder} autoComplete="off" />
                <text className={styles.fieldDescription}>{fieldProperties.description}</text>
                {
                    verifying ? <Stack horizontal><Spinner size={SpinnerSize.small} label={strings.Verifying} labelPosition='right' /></Stack> : <></>
                }
                {
                    verified && groupAliasAvailable ? <>
                        {
                            siteNameAvailable === true
                                ? <text className={styles.greenStatus}>{strings.SiteNameAvailable}</text>
                                : <text className={styles.redStatus}>{siteNameError}</text>
                        }
                        <br />
                    </> : <></>
                }
            </div>
        </>;
    }

    function renderGroupEmailField(fieldProperties: IDynamicFieldProps): React.ReactElement<IDynamicFieldProps> {
        const { verified, verifying } = state;
        const { groupAlias, customizeGroupAlias, groupEmail, groupAliasAvailable, groupAliasError } = groupFieldState;

        return <>
            <div className={styles.fieldWrapper}>
                <div className={styles.buttonFieldContainer}>
                    <div className={styles.buttonFieldInput}>
                        <TextField label={fieldProperties.fieldTitle} onRenderLabel={(p, dr) => labelRenderer(p, dr, "Mail")} value={groupAlias} onChange={(ev, newValue) => onChangeGroupEmailField(newValue)} disabled={!customizeGroupAlias} required={true} placeholder={fieldProperties.placeholder} />
                    </div>
                    {
                        !customizeGroupAlias ? <>
                            <div className={styles.buttonFieldButton}>
                                <IconButton iconProps={{ iconName: "Edit" }} onClick={() => { setGroupFieldState({ ...groupFieldState, customizeGroupAlias: true }) }} disabled={fieldProperties.disabled} />
                            </div>
                        </> : <></>
                    }
                </div>

                <text className={styles.fieldDescription}>{fieldProperties.description}</text>
                {
                    verifying ? <Stack horizontal><Spinner size={SpinnerSize.small} label={strings.Verifying} labelPosition='right' /></Stack> : <></>
                }
                {verified && groupAliasAvailable === true ? <><text className={styles.greenStatus}>{strings.GroupAliasAvailable}</text><br /></> : <></>}
                {verified && groupAliasAvailable === false ? <><text className={styles.redStatus}>{groupAliasError}</text><br /></> : <></>}
                {groupEmail !== undefined && !groupAliasError ? <text>{groupEmail}</text> : <></>}
            </div>
        </>;
    }

    function renderURLField(fieldProperties: IDynamicFieldProps): React.ReactElement<IDynamicFieldProps> {
        const { verified, verifying } = state;
        const { groupAliasAvailable } = groupFieldState;
        const { url, customizeUrl, urlAvailable, urlName, urlError } = urlFieldState;

        return <>
            <div className={styles.fieldWrapper}>
                <div className={styles.buttonFieldContainer}>
                    <div className={styles.buttonFieldInput}>
                        <TextField label={fieldProperties.fieldTitle} onRenderLabel={(p, dr) => labelRenderer(p, dr, "Globe")} value={urlName} onChange={(ev, newValue) => onChangeURLField(newValue)} required={true} disabled={!customizeUrl} placeholder={fieldProperties.placeholder} />
                    </div>
                    {
                        !customizeUrl ? <>
                            <div className={styles.buttonFieldButton}>
                                <IconButton iconProps={{ iconName: "Edit" }} onClick={() => { setUrlFieldState({ ...urlFieldState, customizeUrl: true }) }} disabled={fieldProperties.disabled} />
                            </div>
                        </> : <></>
                    }
                </div>

                <text className={styles.fieldDescription}>{fieldProperties.description}</text>
                {
                    verifying ? <Stack horizontal><Spinner size={SpinnerSize.small} label={strings.Verifying} labelPosition='right' /></Stack> : <></>
                }
                {groupAliasAvailable && verified && urlAvailable === true ? <><text className={styles.greenStatus}>{strings.UrlAvailable}</text><br /></> : <></>}
                {groupAliasAvailable && verified && urlAvailable === false ? <><text className={styles.redStatus}>{urlError || strings.UrlAvailableWithModification}</text><br /></> : <></>}
                {url !== undefined && !urlError ? <text>{url}</text> : <></>}
            </div>
        </>;
    }

    function labelRenderer(props: ITextFieldProps, defaultRender: IRenderFunction<ITextFieldProps>, iconName?: string): JSX.Element {
        return <>
            <Stack horizontal verticalAlign="center" tokens={stackTokens}>
                {iconName ? <Icon iconName={iconName} styles={iconStyles} /> : <></>}
                {defaultRender(props)}
            </Stack>
        </>;
    }

    function onChangeSiteNameField(fieldProperties: IDynamicFieldProps, newValue: string): void {
        const { customizeUrl } = urlFieldState;
        const { groupAlias, customizeGroupAlias } = groupFieldState;

        fieldProperties.newValue = newValue;
        setSiteNameFieldState({ ...siteNameFieldState, siteName: newValue });
        

        clearTimeout(debouncer);
        debouncer = setTimeout(async () => {
            await verifyGroupInformation(newValue, customizeGroupAlias ? groupAlias : undefined);
            if (!customizeUrl) {
                await verifySiteURL(newValue);
            }
        }, 400);
    }

    async function onChangeGroupEmailField(newValue: string): Promise<void> {
        if (isEmpty(newValue))
            return setGroupFieldState({ ...groupFieldState, groupAlias: newValue, groupAliasAvailable: false, groupAliasError: strings.PleaseEnterGroupAliasError });
        else if (aliasPattern.test(newValue) || endsWith(newValue, '.') || startsWith(newValue, '.'))
            return setGroupFieldState({ ...groupFieldState, groupAlias: newValue, groupAliasAvailable: false, groupAliasError: strings.GroupAliasFormatError });

        setGroupFieldState({ ...groupFieldState, groupAlias: newValue });

        clearTimeout(debouncer);
        debouncer = setTimeout(async () => {
            await verifyGroupInformation(siteNameFieldState.siteName, newValue);
        }, 400);
    }

    async function onChangeURLField(newValue: string): Promise<void> {
        if (isEmpty(newValue))
            return setUrlFieldState({ ...urlFieldState, urlName: newValue, urlAvailable: false, urlError: strings.PleaseEnterSiteAddressError });
        else if (aliasPattern.test(newValue) || endsWith(newValue, '.') || startsWith(newValue, '.'))
            return setUrlFieldState({ ...urlFieldState, urlName: newValue, urlAvailable: false, urlError: strings.SiteAddressFormatError });

        setUrlFieldState({ ...urlFieldState, urlName: newValue });

        clearTimeout(debouncer);
        debouncer = setTimeout(async () => {
            await verifySiteURL(newValue);
        }, 400);
    }

    async function verifySiteURL(newAlias?: string): Promise<void> {
        const alias = formatAlias(newAlias);
        const newState: INewSiteFormState = { ...state, verifying: true, verified: false };
        const newUrlFieldState: IUrlFieldState = { ...urlFieldState, urlName: alias, urlError: null };
        
        setState(newState);
        setUrlFieldState(newUrlFieldState);

        if (console?.log) {
            console.log(`Site Form: Verifying Site URL`);
        }

        const expectedUrl = `${window.location.origin}/${props.managedPath || 'sites'}/${alias}`;
        const resultingUrl = await spService.getValidUrl(alias, props.managedPath);

        setState({ ...newState, verified: true, verifying: false });
        setUrlFieldState({ ...newUrlFieldState, url: resultingUrl, urlAvailable: expectedUrl === resultingUrl });
    }

    async function verifyGroupInformation(siteName: string, useAlias?: string): Promise<void> {
        const alias = formatAlias(useAlias || siteName);
        const newState: INewSiteFormState = { ...state, verifying: true, verified: false };
        const newGroupFieldState: IGroupFieldState = { ...groupFieldState, groupAlias: alias, groupAliasError: null };
        
        setState(newState);
        setGroupFieldState(newGroupFieldState);

        if (console?.log) {
            console.log(`Site Form: Verifying Group Alias '${alias}'`);
        }

        const response = await spService.isGroupNameAvailable(siteName, alias);

        setState({ ...newState, verified: true, verifying: false });
        setGroupFieldState({ ...newGroupFieldState, groupEmail: `${alias}@${props.emailDomain}`, groupAliasAvailable: response.aliasAvailable, groupAliasError: response.aliasErrorMessage });
        setSiteNameFieldState({ ...siteNameFieldState, siteNameAvailable: response.siteNameAvailable, siteNameError: response.siteNameErrorMessage });
    }

    const fieldOverrides: { [columnInternalName: string]: (fieldProperties: IDynamicFieldProps) => React.ReactElement<IDynamicFieldProps> } = {
        "Title": (fieldProperties: IDynamicFieldProps) => renderSiteNameField(fieldProperties),
        "GroupMailbox": (fieldProperties: IDynamicFieldProps) => renderGroupEmailField(fieldProperties),
        "URL": (fieldProperties: IDynamicFieldProps) => renderURLField(fieldProperties)
    };
        
    return <>
        <div className={styles.newSiteForm}>
            <h1>{strings.FormHeader}</h1>
            {
                state.submitError && (
                    <MessageBar messageBarType={MessageBarType.error} style={{ marginBottom: 10 }}>
                        {state.submitError}
                    </MessageBar>)
            }

            <DynamicForm
                context={props.context as never}
                listId={props.context.list.guid.toString()}
                listItemId={props.context.itemId}
                onListItemLoaded={(listItemData) => setListItemData(listItemData as never)}
                onBeforeSubmit={onBeforeSubmit}
                onCancelled={props.onClose}
                onSubmitted={props.onSave}
                onSubmitError={(listItemData: unknown, error: Error) => { console.log(listItemData); setState({ ...state, submitError: error.message }) }}
                disabled={props.displayMode === FormDisplayMode.Display}
                fieldOverrides={fieldOverrides}
            />
        </div>
    </>;
}