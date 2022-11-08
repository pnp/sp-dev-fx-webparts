import React, { CSSProperties, FC, useCallback } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useConst, useForceUpdate } from '@fluentui/react-hooks';
import { ActionButton, IconButton, IIconProps, IStackTokens, Stack, Text, TooltipHost } from '@fluentui/react';
import { GripperDotsVerticalIcon } from '@fluentui/react-icons-mdl2';
import { Refiner } from 'model';
import { useEventsService } from 'services';

import { SettingsPanel as strings } from "ComponentStrings";

import styles from './SettingsPanel.module.scss';

interface IProps {
    refiners: Refiner[];
    onNewRefiner: () => void;
    onEditRefiner: (refiner: Refiner) => void;
}

interface IRefinerItemProps {
    index: number;
    refiner: Refiner;
    onEditRefiner: (refiner: Refiner) => void;
}

export const RefinerItem: FC<IRefinerItemProps> = ({ index, refiner, onEditRefiner }) => {
    const { key, displayName } = refiner;
    const onclickEdit = useCallback(
        () => onEditRefiner(refiner),
        [refiner, onEditRefiner]
    );

    const stackTokens: IStackTokens = useConst({ childrenGap: 12 });
    const gripperIconStyle: CSSProperties = useConst({ position: 'relative', top: -2 });
    const editIconProps: IIconProps = useConst({ iconName: 'Edit' });

    return (
        <Draggable draggableId={`refiner-${key}`} index={index}>
            {({ innerRef, draggableProps, dragHandleProps }, { isDragging, draggingOver }) => (
                <div ref={innerRef} {...draggableProps}>
                    <Stack horizontal verticalAlign='center' tokens={stackTokens} className={styles.refiner}>
                        <span {...dragHandleProps} aria-label={strings.Command_ReorderRefiner.AriaLabel}>
                            <Text><GripperDotsVerticalIcon style={gripperIconStyle} /></Text>
                        </span>
                        <Text className={styles.name}>
                            {displayName}
                        </Text>
                        {!isDragging && !draggingOver &&
                            <TooltipHost content={strings.Command_EditRefiner.Tooltip}>
                                <IconButton className={styles.edit} iconProps={editIconProps} onClick={onclickEdit} content={strings.Command_EditRefiner.AriaLabel} />
                            </TooltipHost>
                        }
                    </Stack>
                </div>
            )}
        </Draggable>
    );
}

export const RefinerEditor: FC<IProps> = ({ refiners, onNewRefiner, onEditRefiner }) => {
    const forceUpdate = useForceUpdate();
    const events = useEventsService();

    const onRefinerDragStart = useCallback(() => {
        refiners.forEach((refiner, idx) => {
            refiner.snapshot();
            refiner.order = idx;
        });
    }, [refiners]);

    const onRefinerDragEnd = useCallback(async (result: DropResult) => {
        if (!result.destination) return;

        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;

        if (destinationIndex !== sourceIndex) {
            refiners.splice(destinationIndex, 0, ...refiners.splice(sourceIndex, 1));

            refiners.forEach((refiner, idx) => {
                refiner.order = idx;
            });

            try {
                await events.persist();
                refiners.forEach(refiner => refiner.immortalize());
            } catch (ex) {
                refiners.forEach(refiner => refiner.revert());
            }

            forceUpdate();
        }
    }, [refiners, events, forceUpdate]);

    return <>
        <DragDropContext onDragStart={onRefinerDragStart} onDragEnd={onRefinerDragEnd}>
            <Droppable droppableId="refiners-list" type="REFINER">
                {({ innerRef, droppableProps, placeholder }, snapshot) => (
                    <div ref={innerRef} {...droppableProps} className={styles.refiners}>
                        {refiners.map((refiner, idx) =>
                            <RefinerItem
                                key={refiner.key}
                                index={idx}
                                refiner={refiner}
                                onEditRefiner={onEditRefiner}
                            />
                        )}
                        {placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
        <ActionButton iconProps={{ iconName: 'Add' }} onClick={onNewRefiner}>
            {strings.Command_AddRefiner.Text}
        </ActionButton>
    </>;
};