import * as React from 'react';
import { IKeyResult } from '../services/KeyResultsService';
import { Stack, Text, ProgressIndicator, Dropdown, TextField, DefaultButton } from '@fluentui/react';

export interface KeyResultRowProps {
    keyResult: IKeyResult;
    isEditing: boolean;
    onChange: (updates: Partial<IKeyResult>) => void;
    onSave: () => void;
    onEdit: () => void;
}

const ragOptions = [
    { key: 'Green', text: 'Green' },
    { key: 'Yellow', text: 'Yellow' },
    { key: 'Red', text: 'Red' },
];

export const KeyResultRow: React.FC<KeyResultRowProps> = ({ keyResult, isEditing, onChange, onSave, onEdit }) => {
    return (
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 12 }}>
            <Text styles={{ root: { minWidth: 120 } }}>{keyResult.Title}</Text>
            <ProgressIndicator percentComplete={keyResult.Progress / 100} styles={{ root: { minWidth: 120, maxWidth: 180 } }} />
            <Dropdown
                selectedKey={keyResult.RAGStatus}
                options={ragOptions}
                disabled={!isEditing}
                onChange={(_, option) => onChange({ RAGStatus: option?.key as string })}
                styles={{ root: { minWidth: 100 } }}
            />
            <TextField
                value={String(keyResult.Progress)}
                type="number"
                min={0}
                max={100}
                disabled={!isEditing}
                onChange={(_, v) => onChange({ Progress: Number(v) })}
                styles={{ root: { width: 60 } }}
            />
            <TextField
                value={keyResult.LastUpdate || ''}
                placeholder="Add comment"
                disabled={!isEditing}
                onChange={(_, v) => onChange({ LastUpdate: v })}
                styles={{ root: { minWidth: 120 } }}
            />
            {isEditing ? (
                <DefaultButton text="Save" onClick={onSave} />
            ) : (
                <DefaultButton text="Edit" onClick={onEdit} />
            )}
        </Stack>
    );
}; 