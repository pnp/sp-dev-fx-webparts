import * as React from 'react';
import { IKeyResult } from '../services/KeyResultsService';
import { Stack, TextField, Dropdown, DefaultButton, PrimaryButton, Spinner, Text } from '@fluentui/react';

export interface NewKeyResultFormProps {
    keyResult: Partial<IKeyResult>;
    onChange: (updates: Partial<IKeyResult>) => void;
    onSubmit: () => void;
    onCancel: () => void;
    loading?: boolean;
    error?: string;
}

const ragOptions = [
    { key: 'Green', text: 'Green' },
    { key: 'Yellow', text: 'Yellow' },
    { key: 'Red', text: 'Red' },
];

export const NewKeyResultForm: React.FC<NewKeyResultFormProps> = ({
    keyResult,
    onChange,
    onSubmit,
    onCancel,
    loading = false,
    error
}) => {
    return (
        <Stack tokens={{ childrenGap: 16 }} styles={{ root: { border: '1px solid #e1e1e1', borderRadius: 8, padding: 16, background: '#fff', boxShadow: '0 2px 8px #eee' } }}>
            <Text variant="large" styles={{ root: { fontWeight: 'bold' } }}>Add New Key Result</Text>

            {error && (
                <Text styles={{ root: { color: 'red', fontWeight: 'bold' } }}>{error}</Text>
            )}

            <TextField
                label="Title"
                value={keyResult.Title || ''}
                onChange={(_, v) => onChange({ Title: v || '' })}
                required
                placeholder="Enter key result title"
            />

            <Stack horizontal tokens={{ childrenGap: 8 }}>
                <TextField
                    label="Progress (%)"
                    type="number"
                    min={0}
                    max={100}
                    value={String(keyResult.Progress || 0)}
                    onChange={(_, v) => onChange({ Progress: Number(v) || 0 })}
                    styles={{ root: { flex: 1 } }}
                />
                <Dropdown
                    label="RAG Status"
                    selectedKey={keyResult.RAGStatus || 'Green'}
                    options={ragOptions}
                    onChange={(_, option) => onChange({ RAGStatus: option?.key as string })}
                    styles={{ root: { flex: 1 } }}
                />
            </Stack>

            <TextField
                label="Notes"
                multiline
                rows={3}
                value={keyResult.LastUpdate || ''}
                onChange={(_, v) => onChange({ LastUpdate: v })}
                placeholder="Add any notes or comments"
            />

            <Stack horizontal tokens={{ childrenGap: 8 }} horizontalAlign="end">
                <DefaultButton text="Cancel" onClick={onCancel} disabled={loading} />
                <PrimaryButton
                    text={loading ? "Adding..." : "Add Key Result"}
                    onClick={onSubmit}
                    disabled={loading || !keyResult.Title}
                />
            </Stack>

            {loading && <Spinner label="Adding key result..." />}
        </Stack>
    );
}; 