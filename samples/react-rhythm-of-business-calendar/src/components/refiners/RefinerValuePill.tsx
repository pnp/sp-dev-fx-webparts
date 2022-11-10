import React, { CSSProperties, FC, useMemo } from 'react';
import { useTheme } from '@fluentui/react';
import { RefinerValue } from 'model';

import styles from './RefinerValuePill.module.scss';

interface IProps {
    refinerValue: RefinerValue;
}

export const RefinerValuePill: FC<IProps> = ({ refinerValue }) => {
    const { palette: { white, neutralPrimary } } = useTheme();

    const { title, color, tag } = refinerValue;
    const { enableTags, enableColors } = refinerValue.refiner.get();

    const refinerValueStyle: CSSProperties = useMemo(() => {
        return {
            color: enableColors ? white : neutralPrimary,
            backgroundColor: (enableColors && color?.toCssString()) || white,
            borderColor: ((enableColors && color?.toCssString()) || neutralPrimary)
        };
    }, [enableColors, enableTags, color, tag]);

    return (
        <span className={styles.pill} style={refinerValueStyle} data-is-focusable>
            {enableTags && tag && `[${tag}]`} {title}
        </span>
    );
}