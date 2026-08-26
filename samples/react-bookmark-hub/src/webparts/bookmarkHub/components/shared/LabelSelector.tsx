import * as React from 'react';
import { Callout, DirectionalHint } from '@fluentui/react/lib/Callout';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { IBookmarkLabel } from '../../../../services/models/IBookmarkLabel';
import { BookmarkLabel } from './BookmarkLabel';
import styles from './LabelSelector.module.scss';

export interface ILabelSelectorProps {
  targetElement: HTMLElement | undefined;
  availableLabels: IBookmarkLabel[];
  selectedLabels: IBookmarkLabel[];
  onDismiss: () => void;
  onApply: (selectedLabels: IBookmarkLabel[]) => void;
}

export const LabelSelector: React.FC<ILabelSelectorProps> = ({
  targetElement,
  availableLabels,
  selectedLabels,
  onDismiss,
  onApply
}) => {
  const [tempSelectedLabels, setTempSelectedLabels] = React.useState<IBookmarkLabel[]>(selectedLabels);

  const handleToggle = (label: IBookmarkLabel, checked: boolean): void => {
    if (checked) {
      setTempSelectedLabels([...tempSelectedLabels, label]);
    } else {
      setTempSelectedLabels(tempSelectedLabels.filter(l => l.name !== label.name));
    }
  };

  const handleApply = (): void => {
    onApply(tempSelectedLabels);
    onDismiss();
  };

  if (!targetElement) {
    return null;
  }

  return (
    <Callout
      target={targetElement}
      onDismiss={onDismiss}
      directionalHint={DirectionalHint.bottomLeftEdge}
      isBeakVisible={false}
      className={styles.labelSelectorCallout}
    >
      <Stack tokens={{ childrenGap: 12 }} className={styles.container}>
        <Text variant="medium" block styles={{ root: { fontWeight: 600 } }}>
          Select Labels
        </Text>
        
        {availableLabels.length === 0 ? (
          <Text variant="small" styles={{ root: { color: '#605e5c', fontStyle: 'italic' } }}>
            No labels available. Create labels in &quot;Manage Labels&quot; first.
          </Text>
        ) : (
          <Stack tokens={{ childrenGap: 8 }} className={styles.labelList}>
            {availableLabels.map((label) => {
              const isChecked = tempSelectedLabels.some(l => l.name === label.name);
              return (
                <div key={label.name} className={styles.labelOption}>
                  <Checkbox
                    label=""
                    checked={isChecked}
                    onChange={(_, checked) => handleToggle(label, checked ?? false)}
                  />
                  <BookmarkLabel label={label} showRemove={false} />
                  {label.description && (
                    <Text variant="small" styles={{ root: { color: '#605e5c', marginLeft: 8 } }}>
                      {label.description}
                    </Text>
                  )}
                </div>
              );
            })}
          </Stack>
        )}
        
        <Stack horizontal tokens={{ childrenGap: 8 }} horizontalAlign="end">
          <DefaultButton text="Cancel" onClick={onDismiss} />
          <PrimaryButton 
            text="Apply" 
            onClick={handleApply}
            disabled={availableLabels.length === 0}
          />
        </Stack>
      </Stack>
    </Callout>
  );
};
