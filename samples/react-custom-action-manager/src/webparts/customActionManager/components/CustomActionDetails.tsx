import * as React from 'react';
import {
  Stack,
  Text,
  Label,
  Separator,
  Icon
} from '@fluentui/react';
import styles from './styles/CustomActionDetails.module.scss';
import { ICustomAction, RegistrationType, CustomActionScope } from '../../../models';

export interface ICustomActionDetailsProps {
  customAction: ICustomAction;
}

export const CustomActionDetails: React.FunctionComponent<ICustomActionDetailsProps> = ({ customAction }) => {
  const renderPropertyRow = (label: string, value: string | number | undefined, isCode?: boolean): React.ReactElement => {
    const displayValue = value !== undefined && value !== null && value !== '' ? value.toString() : null;
    
    return (
      <div className={styles.propertyRow}>
        <div className={styles.propertyLabel}>{label}:</div>
        <div className={styles.propertyValue}>
          {displayValue ? (
            isCode ? (
              <div className={styles.codeBlock}>{displayValue}</div>
            ) : (
              <Text>{displayValue}</Text>
            )
          ) : (
            <Text className={styles.emptyValue}>Not specified</Text>
          )}
        </div>
      </div>
    );
  };

  const getRegistrationTypeName = (regType: number): string => {
    switch (regType) {
      case RegistrationType.None:
        return 'None';
      case RegistrationType.List:
        return 'List';
      case RegistrationType.ContentType:
        return 'Content Type';
      case RegistrationType.ProgId:
        return 'ProgId';
      case RegistrationType.FileType:
        return 'File Type';
      default:
        return `Unknown (${regType})`;
    }
  };

  const getScopeIcon = (scope: CustomActionScope): string => {
    return scope === CustomActionScope.Site ? 'WebTemplate' : 'Page';
  };

  return (
    <div className={styles.container}>
      {/* Basic Information */}
      <div className={styles.section}>
        <Label className={styles.sectionTitle}>Basic Information</Label>
        
        <div className={styles.propertyRow}>
          <div className={styles.propertyLabel}>Scope:</div>
          <div className={styles.scopeContainer}>
            <Icon iconName={getScopeIcon(customAction.Scope)} />
            <span className={styles.scopeIndicator}>{customAction.Scope}</span>
          </div>
        </div>
        
        {renderPropertyRow('ID', customAction.Id)}
        {renderPropertyRow('Title', customAction.Title)}
        {renderPropertyRow('Name', customAction.Name)}
        {renderPropertyRow('Description', customAction.Description)}
        {renderPropertyRow('Location', customAction.Location)}
        {renderPropertyRow('Sequence', customAction.Sequence)}
        {renderPropertyRow('Group', customAction.Group)}
      </div>

      <Separator className={styles.separator} />

      {/* Script Configuration */}
      <div className={styles.section}>
        <Label className={styles.sectionTitle}>Script Configuration</Label>
        {renderPropertyRow('Script Block', customAction.ScriptBlock, true)}
        {renderPropertyRow('Script Source', customAction.ScriptSrc)}
        {renderPropertyRow('URL', customAction.Url)}
        {renderPropertyRow('Image URL', customAction.ImageUrl)}
      </div>

      <Separator className={styles.separator} />

      {/* Advanced Settings */}
      <div className={styles.section}>
        <Label className={styles.sectionTitle}>Advanced Settings</Label>
        {renderPropertyRow('Registration Type', getRegistrationTypeName(customAction.RegistrationType))}
        {renderPropertyRow('Registration ID', customAction.RegistrationId)}
        {renderPropertyRow('Rights', customAction.Rights)}
        {renderPropertyRow('Host Properties', customAction.HostProperties, true)}
        {renderPropertyRow('Command UI Extension', customAction.CommandUIExtension, true)}
      </div>

      <Separator className={styles.separator} />

      {/* SPFx Integration */}
      <div className={styles.section}>
        <Label className={styles.sectionTitle}>SPFx Integration</Label>
        {renderPropertyRow('Client Side Component ID', customAction.ClientSideComponentId)}
        {renderPropertyRow('Client Side Component Properties', customAction.ClientSideComponentProperties, true)}
      </div>
    </div>
  );
};