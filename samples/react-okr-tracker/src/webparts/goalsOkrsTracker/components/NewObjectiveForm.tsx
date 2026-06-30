import * as React from 'react';
import { Stack, TextField, Dropdown, DefaultButton, PrimaryButton, Text } from '@fluentui/react';
import { IObjective } from '../services/ObjectivesService';

const quarterOptions = [
    { key: 'Q1', text: 'Q1' },
    { key: 'Q2', text: 'Q2' },
    { key: 'Q3', text: 'Q3' },
    { key: 'Q4', text: 'Q4' },
];
const statusOptions = [
    { key: 'On Track', text: 'On Track' },
    { key: 'At Risk', text: 'At Risk' },
    { key: 'Off Track', text: 'Off Track' },
    { key: 'Completed', text: 'Completed' },
];

export interface NewObjectiveFormProps {
    objective: Partial<IObjective>;
    onChange: (updates: Partial<IObjective>) => void;
    onSubmit: () => void;
    onCancel: () => void;
    loading: boolean;
    error?: string;
}

export const NewObjectiveForm: React.FC<NewObjectiveFormProps> = ({ objective, onChange, onSubmit, onCancel, loading, error }) => {
    return (
        <Stack tokens={{ childrenGap: 12 }} styles={{ root: { maxWidth: 400, background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px #eee' } }}>
            <Text variant="large">New Objective</Text>
            <TextField label="Title" value={objective.Title || ''} onChange={(_, v) => onChange({ Title: v })} required />
            <Dropdown label="Quarter" options={quarterOptions} selectedKey={objective.Quarter} onChange={(_, o) => onChange({ Quarter: o?.key as string })} required />
            <TextField label="Year" type="number" value={objective.Year ? String(objective.Year) : ''} onChange={(_, v) => onChange({ Year: Number(v) })} required />
            <Dropdown label="Status" options={statusOptions} selectedKey={objective.Status} onChange={(_, o) => onChange({ Status: o?.key as string })} required />
            <TextField label="Notes" multiline value={objective.Notes || ''} onChange={(_, v) => onChange({ Notes: v })} />
            {error && <Text styles={{ root: { color: 'red' } }}>{error}</Text>}
            <Stack horizontal tokens={{ childrenGap: 8 }}>
                <PrimaryButton text="Create" onClick={onSubmit} disabled={loading} />
                <DefaultButton text="Cancel" onClick={onCancel} disabled={loading} />
            </Stack>
        </Stack>
    );
}; 