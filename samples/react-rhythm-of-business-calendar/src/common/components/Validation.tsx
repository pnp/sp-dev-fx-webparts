import { isFunction } from "lodash";
import React from "react";
import { css, DelayedRender } from "@fluentui/react";
import { ErrorIcon } from "@fluentui/react-icons-mdl2";
import { Entity } from "../Entity";
import { ValidationRule } from "../ValidationRules";

export interface IValidationProps<E extends Entity<any>> extends React.HTMLAttributes<HTMLElement | React.FC<IValidationProps<E>>> {
    active: boolean;
    entity: E;
    rules: ValidationRule<E>[];
}

export const Validation = <E extends Entity<any>>(props: IValidationProps<E>) => {
    const {
        active,
        entity,
        rules = [],
        children
    } = props;

    let valid = true;
    let failMessage = "";

    rules.filter(Boolean).forEach(rule => {
        if (valid) {
            valid = rule.validate(entity);
            if (!valid) {
                failMessage = isFunction(rule.failMessage) ? rule.failMessage(entity) : rule.failMessage;
            }
        }
    });

    return (
        <div className={css(props.className, { "validation-error": active && !valid })}>
            {children}
            {active && !valid &&
                <DelayedRender>
                    <p className="error-message ms-font-s ms-fontColor-redDark ms-slideDownIn20">
                        <ErrorIcon />
                        &nbsp;
                        <span aria-live='assertive' data-automation-id='error-message'>{failMessage}</span>
                    </p>
                </DelayedRender>
            }
        </div>
    );
};