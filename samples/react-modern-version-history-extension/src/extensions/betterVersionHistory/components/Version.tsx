import * as React from 'react';
import { IVersion } from '../models/IVersion';
import { FieldUser } from './FieldUserPerson';
import { Icon, Text, TooltipHost, PersonaSize, Link, Checkbox, Stack, StackItem, ActionButton, IContextualMenuProps } from '@fluentui/react';
import { FieldType } from '../models/FieldTypes';
import { IFieldUrlValue, IFieldUserValue } from '../models/FieldValues';
import { IDataProvider } from '../providers/DataProvider';
import useVersionMetadata from '../hooks/useVersionMetadata';
import styles from './BetterVersionHistory.module.scss';

export interface IVersionProps {
    Version: IVersion;
    className: string;
    selectedVersions?: number[];
    onVersionSelected?: () => void;
    provider: IDataProvider;
    reloadVersions: () => void;
}

export const Version: React.FunctionComponent<IVersionProps> = (props: React.PropsWithChildren<IVersionProps>) => {
    const { Version, provider, reloadVersions } = props;
    const { versionMetadata } = useVersionMetadata(Version, provider);

    const versionMenuProps: IContextualMenuProps = {
        items: [
            {
                key: 'version-view',
                text: 'View version',
                iconProps: { iconName: 'EntryView' },
                href: `${Version.VersionLink}`,
                target: '_blank',
            },
            {
                key: 'version-delete',
                text: 'Delete version',
                iconProps: { iconName: 'Delete' },
                onClick: () => {
                    provider
                        .DeleteVersion(Version.VersionId)
                        .then(() => {
                            reloadVersions();
                        });
                },
                target: '_blank'
            },
            {
                key: 'version-restore',
                text: 'Restore version',
                iconProps: { iconName: 'UpdateRestore' },
                onClick: () => {
                    provider
                        .RestoreVersion(Version)
                        .then(() => {
                            reloadVersions();
                        })
                },
                target: '_blank'
            },
        ]
    };

    // ES-lint-disable-next-line
    const fileSize: number = ((versionMetadata as any)?.Size ?? 0) ? ((versionMetadata as any)?.Size ?? 0) / 1024 : Version.FileSize / 1024;
    const fileSizeText = fileSize > 10**3 ? `${(fileSize / 10**3).toFixed(2)} MB` : fileSize > 10**6 ? `${(fileSize / 10**6).toFixed(2)} GB` : `${fileSize.toFixed(2)} KB`;

    return (
        <Stack tokens={{ childrenGap: 10 }} horizontal verticalAlign='start' >
            <StackItem
                style={{ paddingTop: '3px' }}
                children={<Checkbox checked={props.selectedVersions.indexOf(Version.VersionId) > -1} onChange={(e, checked) => props.onVersionSelected()} />} />
            <StackItem grow={1}>
                <Stack tokens={{ childrenGap: 15 }} horizontal styles={{ root: { paddingBottom: '10px' } }} verticalAlign='center'>
                    <StackItem>
                        <ActionButton className={styles.version} text={`Version ${Version.VersionName}`} menuProps={versionMenuProps} />
                    </StackItem>
                    <StackItem>
                        <Text>{fileSizeText}</Text>
                    </StackItem>
                    {Version.Moderation &&
                        <StackItem grow={2}>
                            {Version.Moderation.ModerationStatus === 0 && <><Icon iconName="FileComment" style={{ color: 'darkgreen' }} title='Document approved' />&nbsp;Approved</>}
                            {Version.Moderation.ModerationStatus === 1 && <><Icon iconName="FileComment" style={{ color: 'darkred' }} title='Document approval rejected' />&nbsp;Rejected</>}
                            {Version.Moderation.ModerationStatus === 2 && <><Icon iconName="FileComment" title='Document approval pending' />&nbsp;Pending</>}
                            {Version.Moderation.ModerationComments && <Text variant='small'> &middot; {Version.Moderation.ModerationComments}</Text>}
                        </StackItem>
                    }
                    <StackItem grow={1} style={{ textAlign: 'right', lineHeight: '1em' }}>
                        <Text variant='small'>{Version.Author.LookupValue}</Text><br />
                        <Text variant='small'>{Version.TimeStamp.toLocaleString()}</Text>
                    </StackItem>
                </Stack>
                {Version.Moderation &&
                    <Stack>
                        {versionMetadata?.CheckInComment &&
                            <StackItem styles={{ root: { backgroundColor: 'lightgrey', borderRadius: 3, padding: '0.25em', width: '100%' } }}>
                                <Icon iconName="PageCheckedin" title='Document Status Information' />&nbsp;
                                <Text variant='medium'>{versionMetadata.CheckInComment}</Text>
                            </StackItem>
                        }
                    </Stack>
                }
                <Stack>
                    {Version.Changes && Version.Changes.map((change) => {
                        switch (change.FieldType) {
                            case FieldType.User:
                                return <Text styles={{ root: { display: 'flex' } }}>{change.FieldName}:&nbsp;&nbsp;<FieldUser user={change.Data as IFieldUserValue} size={PersonaSize.size8} /></Text>
                            case FieldType.UserMulti:
                                return <Text styles={{ root: { display: 'flex' } }}>{change.FieldName}:&nbsp;&nbsp; {(change.Data as (IFieldUserValue[]) ?? []).map(user => <FieldUser user={user} size={PersonaSize.size8} />)} </Text>
                            case FieldType.URL: {
                                const link = change.Data as IFieldUrlValue;
                                return <Text>{change.FieldName}: <Link href={link.Url} target='_blank'>{link.Description}</Link></Text>
                            }
                            case FieldType.Lookup:
                                return <Text>{change.FieldName}: <Link href={change.Link} target='_blank'>{change.NewValue}</Link></Text>
                            default:
                                return <Text>{change.FieldName}: <TooltipHost content={change.OldValue}>{change.NewValue}</TooltipHost></Text>
                        }
                    })}
                </Stack>
            </StackItem>
        </Stack >
    );
};