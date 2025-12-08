import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { TextField } from '@fluentui/react/lib/TextField';
import { Stack } from '@fluentui/react/lib/Stack';
import * as strings from 'QrCodeWebPartStrings';

export interface ISaveToListDialogProps {
  isOpen: boolean;
  onSave: (title: string, description: string) => void;
  onDismiss: () => void;
}

export const SaveToListDialog: React.FunctionComponent<ISaveToListDialogProps> = (props) => {
  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [titleError, setTitleError] = React.useState<string>('');

  const handleSave = (): void => {
    if (!title.trim()) {
      setTitleError(strings.SaveDialogTitleRequired || 'Title is required');
      return;
    }
    props.onSave(title, description);
    // Reset form
    setTitle('');
    setDescription('');
    setTitleError('');
  };

  const handleDismiss = (): void => {
    setTitle('');
    setDescription('');
    setTitleError('');
    props.onDismiss();
  };

  return (
    <Dialog
      hidden={!props.isOpen}
      onDismiss={handleDismiss}
      dialogContentProps={{
        type: DialogType.normal,
        title: strings.SaveDialogTitle || 'Save QR Code to SharePoint',
        subText: strings.SaveDialogSubText || 'Enter a title and optional description for this QR code.'
      }}
      modalProps={{
        isBlocking: true
      }}
    >
      <Stack tokens={{ childrenGap: 15 }}>
        <TextField
          label={strings.SaveDialogTitleLabel || 'Title'}
          required
          value={title}
          onChange={(_, newValue) => {
            setTitle(newValue || '');
            setTitleError('');
          }}
          errorMessage={titleError}
          placeholder={strings.SaveDialogTitlePlaceholder || 'Enter a title for this QR code'}
        />
        <TextField
          label={strings.SaveDialogDescriptionLabel || 'Description'}
          multiline
          rows={4}
          value={description}
          onChange={(_, newValue) => setDescription(newValue || '')}
          placeholder={strings.SaveDialogDescriptionPlaceholder || 'Enter an optional description'}
        />
      </Stack>
      <DialogFooter>
        <PrimaryButton onClick={handleSave} text={strings.SaveButton || 'Save'} />
        <DefaultButton onClick={handleDismiss} text={strings.CancelButton || 'Cancel'} />
      </DialogFooter>
    </Dialog>
  );
};
