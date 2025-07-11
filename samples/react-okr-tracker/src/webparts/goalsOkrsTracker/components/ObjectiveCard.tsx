import * as React from 'react';
import { IObjective } from '../services/ObjectivesService';
import { IKeyResult } from '../services/KeyResultsService';
import { Stack, Text, Persona, PersonaSize, DefaultButton } from '@fluentui/react';


export interface ObjectiveCardProps {
    objective: IObjective;
    keyResults: IKeyResult[];
    onAddKeyResult: (objectiveId: number) => void;
    onEditKeyResult: (keyResult: IKeyResult) => void;
}



export const ObjectiveCard: React.FC<ObjectiveCardProps> = ({ objective, keyResults, onAddKeyResult, onEditKeyResult }) => {
    return (
        <Stack tokens={{ childrenGap: 12 }} styles={{ root: { border: '1px solid #e1e1e1', borderRadius: 8, padding: 16, background: '#fff', boxShadow: '0 2px 8px #eee' } }}>
            <Stack horizontal horizontalAlign="space-between">
                <Text variant="xLarge">{objective.Title}</Text>
                <Text variant="medium" styles={{ root: { fontWeight: 600, color: "#0078d4" } }}>
                    {objective.Status}
                </Text>
            </Stack>
            <Stack horizontal tokens={{ childrenGap: 16 }} verticalAlign="center">
                <Persona text={`Owner: ${objective.OwnerId}`} size={PersonaSize.size32} />
                <Text>{objective.Quarter} {objective.Year}</Text>
            </Stack>
            <Text>{objective.Notes}</Text>
            <Stack tokens={{ childrenGap: 8 }}>
                {keyResults.map(kr => (
                    <div key={kr.Id} style={{ marginBottom: 8 }}>
                        {/* Key Result row (to be replaced with KeyResult component) */}
                        <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
                            <Text>{kr.Title}</Text>
                            <DefaultButton text="Edit" onClick={() => onEditKeyResult(kr)} />
                        </Stack>
                    </div>
                ))}
            </Stack>
            <DefaultButton text="Add Key Result" onClick={() => onAddKeyResult(objective.Id!)} />
        </Stack>
    );
}; 