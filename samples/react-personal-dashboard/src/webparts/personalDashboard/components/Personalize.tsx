import * as React from 'react';
import styles from './Personalize.module.scss';
import { Icon } from '@fluentui/react/lib/Icon';
import { DefaultButton, PrimaryButton, ActionButton, IIconProps } from '@fluentui/react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { ContextualMenu } from '@fluentui/react/lib/ContextualMenu';
import { IListItem } from '../models/IListItem';

const persIcon: IIconProps = { iconName: 'Personalize', style: { color: 'white', fontWeight: 'bold' } };

interface IPersonalizeProps {
    widgets: IListItem[];
    selectedWidgets: IListItem[];
    handleWidgetSelected(id: string): void;
    handleWidgetUnselected(id: string): void;
    moveWidgetRight(): void;
    moveWidgetLeft(): void;
    reorderSelectedWidgets(isUp: boolean): void;
    saveSelection(ids: string[]): Promise<void>;
}

const dragOptions = {
    moveMenuItemText: 'Move',
    closeMenuItemText: 'Close',
    menu: ContextualMenu,
};

const dialogContentProps = {
    type: DialogType.normal,
    title: 'Personalize dashboard',
};

export interface IDialogcontrolState {
    isActive: boolean;
    hideDialog: boolean;
}

export const Personalize: React.FC<IPersonalizeProps> = (props) => {
    const [isHidden, setHide] = React.useState(true);
    const { handleWidgetSelected, handleWidgetUnselected, moveWidgetRight, moveWidgetLeft, reorderSelectedWidgets, selectedWidgets, saveSelection } = props;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _handleSelected = React.useCallback((e: any): void => {
        handleWidgetSelected(e.target.id);
    }, [handleWidgetSelected]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _handleUnselected = React.useCallback((e: any): void => {
        handleWidgetUnselected(e.target.id);
    }, [handleWidgetUnselected]);

    const _moveRight = React.useCallback((): void => {
        moveWidgetRight();
    }, [moveWidgetRight]);

    const _moveLeft = React.useCallback((): void => {
        moveWidgetLeft();
    }, [moveWidgetLeft]);

    const _reOrderUp = React.useCallback((): void => {
        reorderSelectedWidgets(true);
    }, [reorderSelectedWidgets]);

    const _reOrderDown = React.useCallback((): void => {
        reorderSelectedWidgets(false);
    }, [reorderSelectedWidgets]);

    const _showDialog = React.useCallback(() => {
        setHide(false);
    }, []);

    const _closeDialog = React.useCallback(() => {
        setHide(true);
    }, []);

    const _saveSelectedWidgets = React.useCallback((): void => {
        const ids: string[] = [];
        selectedWidgets.forEach((widget) => {
            ids.push(widget.id.toString());
        });
        saveSelection(ids)
            .then(() => {
                _closeDialog();
            }).catch(() => {
                _showDialog();
            });
    }, [selectedWidgets, saveSelection, _closeDialog, _showDialog]);

    return (
        <div className={styles.personalizeContainer}>
            <ActionButton className={styles.customLink} iconProps={persIcon} allowDisabledFocus onClick={_showDialog}>
                Personalize
            </ActionButton>
            <Dialog
                hidden={isHidden}
                onDismiss={_closeDialog}
                dialogContentProps={dialogContentProps}
                minWidth={500}
                maxWidth={550}
                modalProps={{
                    isBlocking: true,
                    dragOptions: dragOptions
                }}>

                <div className={styles.container}>
                    <div className={styles.listBox}>
                        <div className={styles.selectable}>
                            {props.widgets.length > 0 &&
                                <ul>
                                    {props.widgets.map((item: IListItem) => {
                                        return <li key={item.id} className={item.selected ? styles.liSelected : ''}
                                            onClick={_handleSelected} id={item.id}>
                                            {item.title}
                                        </li>;
                                    })}
                                </ul>
                            }
                        </div>
                        <div className={styles.selectionpanel}>
                            <div className={styles.btns}>
                                <button type='button' title='Right' onClick={_moveRight}> <Icon iconName="DoubleChevronRight8" /> </button>
                                <button type='button' title='Up' onClick={_reOrderUp}> <Icon iconName="ChevronUpSmall" />  </button>
                                <button type='button' title='Down' onClick={_reOrderDown}> <Icon iconName="ChevronDownSmall" />  </button>
                                <button type='button' title='Left' onClick={_moveLeft}> <Icon iconName="DoubleChevronLeft8" /> </button>
                            </div>
                        </div>
                        <div className={styles.selected}>
                            {props.selectedWidgets.length > 0 &&
                                <ul>
                                    {props.selectedWidgets.map((item) => {
                                        return <li key={item.id} className={item.selected ? styles.liSelected : ''}
                                            onClick={_handleUnselected} id={item.id}>
                                            {item.title}
                                        </li>;
                                    })}
                                </ul>
                            }
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <PrimaryButton onClick={_saveSelectedWidgets} text="Save" />
                    <DefaultButton onClick={_closeDialog} text="Cancel" />
                </DialogFooter>
            </Dialog>
        </div>
    );
}