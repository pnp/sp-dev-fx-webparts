import * as React from 'react';
import { IObjective } from '../services/ObjectivesService';
import { IKeyResult } from '../services/KeyResultsService';
import { Stack, Text, Persona, PersonaSize, DefaultButton, TextField, Dropdown, PrimaryButton, ProgressIndicator } from '@fluentui/react';
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ObjectiveCardProps {
    objective: IObjective;
    keyResults: IKeyResult[];
    onAddKeyResult: (objectiveId: number) => void;
    onEditKeyResult: (keyResult: IKeyResult) => void;
    isEditing?: boolean;
    onEdit?: () => void;
    onSave?: () => void;
    onCancel?: () => void;
    onChange?: (updates: Partial<IObjective>) => void;
    // Key result editing props
    editingKeyResult?: { [krId: number]: Partial<IKeyResult> };
    onKeyResultChange?: (krId: number, updates: Partial<IKeyResult>) => void;
    onKeyResultSave?: (krId: number) => void;
    onKeyResultCancel?: (krId: number) => void;
    context?: WebPartContext;
}

const statusOptions = [
    { key: 'Not Started', text: 'Not Started' },
    { key: 'In Progress', text: 'In Progress' },
    { key: 'Completed', text: 'Completed' },
    { key: 'On Hold', text: 'On Hold' }
];

const quarterOptions = [
    { key: 'Q1', text: 'Q1' },
    { key: 'Q2', text: 'Q2' },
    { key: 'Q3', text: 'Q3' },
    { key: 'Q4', text: 'Q4' }
];

export const ObjectiveCard: React.FC<ObjectiveCardProps> = ({
    objective,
    keyResults,
    onAddKeyResult,
    onEditKeyResult,
    isEditing = false,
    onEdit,
    onSave,
    onCancel,
    onChange,
    editingKeyResult,
    onKeyResultChange,
    onKeyResultSave,
    onKeyResultCancel,
    context
}) => {
    return (
        <Stack tokens={{ childrenGap: 12 }} styles={{ root: { border: '1px solid #e1e1e1', borderRadius: 8, padding: 16, background: '#fff', boxShadow: '0 2px 8px #eee' } }}>
            <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
                {isEditing ? (
                    <Stack tokens={{ childrenGap: 8 }} styles={{ root: { flex: 1 } }}>
                        <TextField
                            label="Title"
                            value={objective.Title}
                            onChange={(_, v) => onChange?.({ Title: v || '' })}
                            required
                        />
                        <Stack horizontal tokens={{ childrenGap: 8 }}>
                            <Dropdown
                                label="Status"
                                selectedKey={objective.Status}
                                options={statusOptions}
                                onChange={(_, option) => onChange?.({ Status: option?.key as string })}
                                styles={{ root: { flex: 1 } }}
                            />
                            <Dropdown
                                label="Quarter"
                                selectedKey={objective.Quarter}
                                options={quarterOptions}
                                onChange={(_, option) => onChange?.({ Quarter: option?.key as string })}
                                styles={{ root: { flex: 1 } }}
                            />
                            <TextField
                                label="Year"
                                type="number"
                                value={String(objective.Year)}
                                onChange={(_, v) => onChange?.({ Year: Number(v) || new Date().getFullYear() })}
                                styles={{ root: { flex: 1 } }}
                            />
                        </Stack>

                       
                        <TextField
                            label="Author"
                            value={objective.AuthorName}
                            readOnly
                            disabled
                        />

                        <TextField
                            label="Notes"
                            multiline
                            rows={3}
                            value={objective.Notes || ''}
                            onChange={(_, v) => onChange?.({ Notes: v })}
                        />
                    </Stack>
                ) : (
                    <>
                        <Text variant="xLarge">{objective.Title}</Text>
                        <Text variant="medium" styles={{ root: { fontWeight: 600, color: "#0078d4" } }}>
                            {objective.Status}
                        </Text>
                    </>
                )}
            </Stack>

            {!isEditing && (
                <>
                    <Stack horizontal tokens={{ childrenGap: 16 }} verticalAlign="center">
                        {/* Display Author name with Persona component */}
                        <Persona
                            text={objective.AuthorName || 'Unknown Author'}
                            size={PersonaSize.size32}
                            secondaryText="Author"
                        />
                        <Text>{objective.Quarter} {objective.Year}</Text>
                    </Stack>
                    <Text>{objective.Notes}</Text>
                </>
            )}

            {/* Key Results Section */}
            {!isEditing && keyResults.length > 0 && (
                <Stack tokens={{ childrenGap: 8 }}>
                    <Text variant="medium" styles={{ root: { fontWeight: 'bold', marginBottom: 8 } }}>
                        Key Results ({keyResults.length})
                    </Text>
                    {keyResults.map(kr => {
                        const isEditingKr = editingKeyResult && editingKeyResult[kr.Id!];
                        const krData = isEditingKr ? { ...kr, ...editingKeyResult[kr.Id!] } : kr;

                        return (
                            <div key={kr.Id} style={{ marginBottom: 8, padding: 8, border: '1px solid #f0f0f0', borderRadius: 4 }}>
                                {isEditingKr ? (
                                    <Stack tokens={{ childrenGap: 8 }}>
                                        <TextField
                                            label="Title"
                                            value={krData.Title}
                                            onChange={(_, v) => onKeyResultChange?.(kr.Id!, { Title: v || '' })}
                                            required
                                        />
                                        <Stack horizontal tokens={{ childrenGap: 8 }}>
                                            <TextField
                                                label="Progress (%)"
                                                type="number"
                                                min={0}
                                                max={100}
                                                value={String(krData.Progress)}
                                                onChange={(_, v) => onKeyResultChange?.(kr.Id!, { Progress: Number(v) || 0 })}
                                                styles={{ root: { flex: 1 } }}
                                            />
                                            <Dropdown
                                                label="RAG Status"
                                                selectedKey={krData.RAGStatus}
                                                options={[
                                                    { key: 'Green', text: 'Green' },
                                                    { key: 'Yellow', text: 'Yellow' },
                                                    { key: 'Red', text: 'Red' }
                                                ]}
                                                onChange={(_, option) => onKeyResultChange?.(kr.Id!, { RAGStatus: option?.key as string })}
                                                styles={{ root: { flex: 1 } }}
                                            />
                                        </Stack>
                                        <TextField
                                            label="Notes"
                                            multiline
                                            rows={2}
                                            value={krData.LastUpdate || ''}
                                            onChange={(_, v) => onKeyResultChange?.(kr.Id!, { LastUpdate: v })}
                                        />
                                        <Stack horizontal tokens={{ childrenGap: 8 }} horizontalAlign="end">
                                            <PrimaryButton text="Save" onClick={() => onKeyResultSave?.(kr.Id!)} />
                                            <DefaultButton text="Cancel" onClick={() => onKeyResultCancel?.(kr.Id!)} />
                                        </Stack>
                                    </Stack>
                                ) : (
                                    <>
                                        <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
                                            <Text styles={{ root: { fontWeight: 'bold' } }}>{kr.Title}</Text>
                                            <DefaultButton text="Edit" onClick={() => onEditKeyResult(kr)} />
                                        </Stack>
                                        <Stack tokens={{ childrenGap: 8 }} styles={{ root: { marginTop: 8 } }}>
                                            <ProgressIndicator percentComplete={kr.Progress / 100} />
                                            <Stack horizontal tokens={{ childrenGap: 16 }} verticalAlign="center">
                                                <Text>Progress: {kr.Progress}%</Text>
                                                <Text styles={{ root: { color: kr.RAGStatus === 'Green' ? '#107c10' : kr.RAGStatus === 'Yellow' ? '#ff8c00' : '#d13438' } }}>
                                                    Status: {kr.RAGStatus}
                                                </Text>
                                                {kr.LastUpdate && (
                                                    <Text variant="small">Notes: {kr.LastUpdate}</Text>
                                                )}
                                            </Stack>
                                        </Stack>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </Stack>
            )}

            <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
                {isEditing ? (
                    <Stack horizontal tokens={{ childrenGap: 8 }}>
                        <PrimaryButton text="Save" onClick={onSave} />
                        <DefaultButton text="Cancel" onClick={onCancel} />
                    </Stack>
                ) : (
                    <Stack horizontal tokens={{ childrenGap: 8 }}>
                        <DefaultButton text="Edit Objective" onClick={onEdit} />
                        <DefaultButton text="Add Key Result" onClick={() => onAddKeyResult(objective.Id!)} />
                    </Stack>
                )}
            </Stack>
        </Stack>
    );
};