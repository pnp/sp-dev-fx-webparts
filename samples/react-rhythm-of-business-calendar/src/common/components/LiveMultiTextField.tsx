import React, { useCallback } from "react";
import { ITextFieldProps, Label } from "@fluentui/react";
import { ValidationRule, PropsOfType } from "common";
import { ListItemEntity } from "common/sharepoint";
import LiveUpdate from "./LiveUpdate";
import { getCurrentValue, LiveType, setValue } from "./LiveUtils";
import { Validation } from "./Validation";
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";

type DataType = string | number;

interface IConverter<T> {
    parse: (val: string) => T;
    toString: (val: T) => string;
}

class NonConverter implements IConverter<string> {
    public parse(val: string) {
        return val;
    }
    public toString(val: string) {
        return val;
    }
}

interface IProps<
    E extends ListItemEntity<any>,
    P extends PropsOfType<E, DataType>
> extends ITextFieldProps {
    entity: E;
    propertyName: P;
    updateField: (update: (data: E) => void, callback?: () => any) => void;
    converter?: IConverter<LiveType<E, P>>;
    rules?: ValidationRule<E>[];
    showValidationFeedback?: boolean;
    liveUpdateMarkClassName?: string;
    tooltip?: string;
    nextFocusComponent?: (assignFocus: boolean) => void;
}

const LiveMultiTextField = <
    E extends ListItemEntity<any>,
    P extends PropsOfType<E, DataType>
>(
    props: IProps<E, P>
) => {
    const {
        entity,
        propertyName,
        converter = new NonConverter() as unknown as IConverter<LiveType<E, P>>,
        rules,
        showValidationFeedback,
        label,
        liveUpdateMarkClassName,
        updateField,
        nextFocusComponent,
    } = props;

    const value = converter.toString(getCurrentValue(entity, propertyName));
    const updateValue = useCallback(
        (val: LiveType<E, P>) =>
            updateField((e) => setValue(e, propertyName, val)),
        [updateField, propertyName]
    );
    const renderValue = useCallback(
        (val: LiveType<E, P>) => (
            <>{(converter ? converter.toString(val) : val) || "-"}</>
        ),
        [converter]
    );

    const onChangeNew = useCallback(
        (ev, val) => {
            updateField((e) => {
                setValue(
                    e,
                    propertyName,
                    converter
                        ? converter.parse(val)
                        : (val as unknown as LiveType<E, P>)
                );
            });
        },
        [updateField, propertyName, converter]
    );

    const onChange = (val: string) => {
        onChangeNew(entity, val);
        if (val.endsWith("\t</p>")) nextFocusComponent(true);
        return val;
    };

    return (
        <Validation
            entity={entity}
            rules={rules}
            active={showValidationFeedback}
        >
            <LiveUpdate
                entity={entity}
                propertyName={propertyName}
                updateValue={updateValue}
                renderValue={renderValue}
            >
                {(renderLiveUpdateMark) => (
                    <>
                        <Label aria-label={label}>{label}</Label>
                        <RichText value={value} onChange={onChange} />
                        {!label &&
                            renderLiveUpdateMark({
                                className: liveUpdateMarkClassName,
                            })}
                    </>
                )}
            </LiveUpdate>
        </Validation>
    );
};

export default LiveMultiTextField;
