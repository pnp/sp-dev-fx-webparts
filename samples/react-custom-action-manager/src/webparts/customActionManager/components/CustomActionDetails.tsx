import * as React from 'react';
import {
  Text,
  Label,
  Separator,
  Icon,
  MessageBar,
  MessageBarType
} from '@fluentui/react';
import styles from './styles/CustomActionDetails.module.scss';
import { ICustomAction, RegistrationType, CustomActionScope } from '../../../models';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { ValidationUtils } from '../../../utils/ValidationUtils';

export interface ICustomActionDetailsProps {
  customAction: ICustomAction | null | undefined;
}

const CustomActionDetails: React.FunctionComponent<ICustomActionDetailsProps> = React.memo(({ customAction }) => {
  if (!customAction) {
    return (
      <ErrorBoundary>
        <MessageBar messageBarType={MessageBarType.warning}>
          No custom action data provided.
        </MessageBar>
      </ErrorBoundary>
    );
  }

  const renderPropertyRow = React.useCallback((label: string, value: string | number | undefined, isCode?: boolean): React.ReactElement => {
    let displayValue: string | null = null;

    if (value !== undefined && value !== null && value !== '') {
      displayValue = isCode
        ? value.toString() // Don't sanitize code blocks as they may contain valid HTML/XML
        : ValidationUtils.sanitizeInput(value.toString());
    }

    return (
      <div className={styles.propertyRow}>
        <div className={styles.propertyLabel}>{ValidationUtils.sanitizeInput(label)}:</div>
        <div className={styles.propertyValue}>
          {displayValue ? (
            isCode ? (
              <div className={styles.codeBlock}>
                <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {displayValue}
                </pre>
              </div>
            ) : (
              <Text>{displayValue}</Text>
            )
          ) : (
            <Text className={styles.emptyValue}>Not specified</Text>
          )}
        </div>
      </div>
    );
  }, []);

  const getRegistrationTypeName = React.useCallback((regType: number | undefined): string => {
    if (regType === undefined || regType === null) {
      return 'Not specified';
    }

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
  }, []);

  const getScopeIcon = React.useCallback((scope: CustomActionScope | undefined): string => {
    if (!scope) return 'Help';
    return scope === CustomActionScope.Site ? 'WebTemplate' : 'Page';
  }, []);

  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <div className={styles.section}>
          <Label className={styles.sectionTitle}>Basic Information</Label>

          <div className={styles.propertyRow}>
            <div className={styles.propertyLabel}>Scope:</div>
            <div className={styles.scopeContainer}>
              <Icon iconName={getScopeIcon(customAction.Scope)} />
              <span className={styles.scopeIndicator}>
                {ValidationUtils.sanitizeInput(customAction.Scope || 'Unknown')}
              </span>
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

        <div className={styles.section}>
          <Label className={styles.sectionTitle}>Script Configuration</Label>
          {renderPropertyRow('Script Block', customAction.ScriptBlock, true)}
          {renderPropertyRow('Script Source', customAction.ScriptSrc)}
          {renderPropertyRow('URL', customAction.Url)}
          {renderPropertyRow('Image URL', customAction.ImageUrl)}
        </div>

        <Separator className={styles.separator} />

        <div className={styles.section}>
          <Label className={styles.sectionTitle}>Advanced Settings</Label>
          {renderPropertyRow('Registration Type', getRegistrationTypeName(customAction.RegistrationType))}
          {renderPropertyRow('Registration ID', customAction.RegistrationId)}
          {renderPropertyRow('Rights', customAction.Rights)}
          {renderPropertyRow('Host Properties', customAction.HostProperties, true)}
          {renderPropertyRow('Command UI Extension', customAction.CommandUIExtension, true)}
        </div>

        <Separator className={styles.separator} />

        <div className={styles.section}>
          <Label className={styles.sectionTitle}>SPFx Integration</Label>
          {renderPropertyRow('Client Side Component ID', customAction.ClientSideComponentId)}
          {renderPropertyRow('Client Side Component Properties', customAction.ClientSideComponentProperties, true)}
        </div>
      </div>
    </ErrorBoundary>
  );
});

CustomActionDetails.displayName = 'CustomActionDetails';

export { CustomActionDetails };
