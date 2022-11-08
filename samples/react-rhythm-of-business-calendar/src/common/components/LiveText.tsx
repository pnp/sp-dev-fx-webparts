import React, { ReactNode } from 'react';
import { ITextFieldProps, Stack, Label, Text, ILabelStyles } from '@fluentui/react';
import { ListItemEntity } from 'common/sharepoint';
import { InfoTooltip } from './InfoTooltip';
import LiveUpdate, { ITransformer, NonTransformer, StateType } from './LiveUpdate';
import { getCurrentValue, LiveType } from './LiveUtils';

const labelStyles: ILabelStyles = {
    root: { display: 'inline-block' }
};

interface IProps<E extends ListItemEntity<any>, P extends keyof E> extends ITextFieldProps {
    entity: E;
    propertyName: P;
    label?: string;
    labelAlign?: 'normal' | 'centered';
    tooltip?: string;
    transformer?: ITransformer<LiveType<E, P>>;
    children?: (val: LiveType<E, P>, state: StateType) => ReactNode;
}

const LiveText = <E extends ListItemEntity<any>, P extends keyof E>(props: IProps<E, P>) => {
    const {
        entity,
        propertyName,
        label,
        labelAlign = 'normal',
        tooltip,
        transformer = new NonTransformer(),
        children = val => <Text tabIndex={0}>{val || '-'}</Text>
    } = props;

    const value = transformer.transform(getCurrentValue(entity, propertyName));

    return (
        <LiveUpdate entity={entity} propertyName={propertyName} renderValue={children} transformer={transformer}>
            {(renderLiveUpdateMark) => <>
                {label &&
                    <Stack horizontal horizontalAlign={labelAlign === 'centered' ? 'space-around' : 'start'}>
                        <InfoTooltip text={tooltip}><Label styles={labelStyles}>{label}</Label></InfoTooltip>
                        {renderLiveUpdateMark()}
                    </Stack>
                }
                {children(value, 'current')}
                {!label && renderLiveUpdateMark()}
            </>}
        </LiveUpdate>
    );
};

export default LiveText;
