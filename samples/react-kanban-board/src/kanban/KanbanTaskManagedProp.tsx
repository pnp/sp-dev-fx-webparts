


import * as React from 'react';
import styles from './KanbanTaskManagedProp.module.scss';
import { IKanbanTaskManagedProps, KanbanTaskMamagedPropertyType } from './IKanbanTask';
import { IPersonaProps, Persona, PersonaSize, Stack } from '@fluentui/react';
import HTMLReactParser from 'html-react-parser';


export interface IKanbanTaskManagedPropProps extends IKanbanTaskManagedProps { }

export interface IKanbanTaskManagedPropState { }

export default class KanbanTaskManagedProp extends React.Component<IKanbanTaskManagedPropProps, IKanbanTaskManagedPropState> {
    public render(): React.ReactElement<IKanbanTaskManagedPropProps> {
        const { displayName, name } = this.props;
        return (
            <Stack horizontal horizontalAlign="stretch">
                <Stack.Item align="auto" className={styles.rowcol1}>
                    <span>{displayName ? displayName : name}</span>
                </Stack.Item>
                <Stack.Item align="stretch" className={styles.rowcol2}>
                    {this.renderValue()}
                </Stack.Item>
            </Stack>
        );
    }
    private renderValue():JSX.Element {
        const { name, type, value } = this.props;
        if (this.props.renderer) {
            return this.props.renderer(name, value, type);
        }
        switch (this.props.type) {
            case KanbanTaskMamagedPropertyType.string:
                return (<span>{value} </span>);
                break;
            case KanbanTaskMamagedPropertyType.number:
                return (<span>{value} </span>);
                //TODO  maybe Formater
                break;
            case KanbanTaskMamagedPropertyType.percent:
                return (value?<span>{`${(value as any) * 100}%`} </span>:<span/>);
                //TODO  maybe better Formater
                break;
            case KanbanTaskMamagedPropertyType.html:
                return (value?<span>{HTMLReactParser(value)}</span>:<span/>);
                break;
            case KanbanTaskMamagedPropertyType.person:

                return (<span>
                    {value && (
                        <Persona
                            {...value}
                            size={PersonaSize.size32}
                            hidePersonaDetails={false} />
                    )}
                </span>);
                break;
            case KanbanTaskMamagedPropertyType.persons:
                return (<span>
                    {
                        (value && (
                            (value as IPersonaProps[]).map((p, i) => (<Persona
                                key={'persona' + i}
                                {...value}
                                size={PersonaSize.size32}
                                hidePersonaDetails={false}
                            />))
                        ))
                    }
                </span>);
                break;
            case KanbanTaskMamagedPropertyType.complex:
                return (<span>{JSON.stringify(value)}</span>);
                break;
            default:
                throw new Error("Unknow KanbanTaskMamagedPropertyType");
                break;
        }
    }
}
