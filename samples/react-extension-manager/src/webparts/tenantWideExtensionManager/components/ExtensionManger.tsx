import * as React from 'react';
import useExtension from '../../../Hooks/UseExtension';
import { Icon, Panel, Spinner, SpinnerSize, Text, Toggle, Stack, Dropdown, TextField, PanelType, Label, DialogFooter, PrimaryButton, DefaultButton } from '@fluentui/react';
import { ExtensionLocation, LocationStrings } from '../../../Models/Location';
import { Locations } from '../../../Models/Location';
import { ListType, ListTypeStrings, ListTypes } from '../../../Models/ListType';
import { ApplicationContext } from '../../../Contexsts/ApplicationContext';
import CodeEditor from '@uiw/react-textarea-code-editor';

export interface IExtensionManagerProps {
    ExtensionId: number;
    OnSubmit: () => void;
    OnClose: () => void;
}

export const ExtensionManager: React.FunctionComponent<IExtensionManagerProps> = (props: React.PropsWithChildren<IExtensionManagerProps>) => {
    const { Provider } = React.useContext(ApplicationContext);
    const { ExtensionId, OnClose, OnSubmit } = props;
    const { isLoading, extension, update, changes } = useExtension(ExtensionId);

    return (
        <Panel
            isOpen={ExtensionId !== null}
            onDismiss={OnClose}
            type={PanelType.medium}
        >
            {ExtensionId !== null && <>
                {isLoading && <Spinner label='Loading...' size={SpinnerSize.large} />}
                {!isLoading && <>
                    <Stack tokens={{ childrenGap: 10 }}>
                        <span><Icon styles={{ root: { fontSize: "3em" } }} iconName='ProductRelease' /><Text variant='large'>&nbsp;{extension.Title}</Text></span>
                        <Toggle offText='Disabled' onText='Enabled' checked={!extension.TenantWideExtensionDisabled} onChange={(_, val) => update({ TenantWideExtensionDisabled: !val })} />

                        <Dropdown label='Location/type' options={Locations.map(loc => ({ key: loc, text: LocationStrings[loc] }))} selectedKey={extension.TenantWideExtensionLocation} onChange={(_, val) => update({ TenantWideExtensionLocation: val.key as ExtensionLocation })} />
                        <Dropdown label='List type' options={ListTypes.map(listType => ({ key: parseInt(listType + ""), text: ListTypeStrings[listType] }))} selectedKey={extension.TenantWideExtensionListTemplate} onChange={(_, val) => update({ TenantWideExtensionListTemplate: val.key as ListType })} />
                        <div>
                            <Label>Component properties</Label>
                            <CodeEditor
                                language='json'
                                value={extension.TenantWideExtensionComponentProperties}
                                onChange={(evn: React.FormEvent<HTMLInputElement>) => update({ TenantWideExtensionComponentProperties: (evn.target as HTMLInputElement).value })}
                                padding={15}
                                style={{
                                    fontSize: 12,
                                    backgroundColor: "#f5f5f5",
                                    fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                                }}
                            />
                        </div>

                        <TextField type='number' value={extension.TenantWideExtensionSequence + ""} label='Sequence' onChange={(_, val) => update({ TenantWideExtensionSequence: parseInt(val) })} />

                        <DialogFooter>
                            <PrimaryButton onClick={async () => {
                                await Provider.updateExtension(props.ExtensionId, changes);
                                OnSubmit();
                            }} text='Save' />
                            <DefaultButton onClick={OnClose} text='Close' />
                        </DialogFooter>
                    </Stack>
                </>}

            </>}


        </Panel>
    );
};