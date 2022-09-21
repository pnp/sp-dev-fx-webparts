import React, { FC, ReactNode } from 'react';
import { css } from '@fluentui/react';

interface IGridProps {
    className?: string;
    children?: ReactNode;
}

export const ResponsiveGrid: FC<IGridProps> = ({ className, children }) =>
    <div className={css('ms-Grid', className)}>
        {children}
    </div>;


interface IRowProps {
    className?: string;
    children?: ReactNode;
}

export const GridRow: FC<IRowProps> = ({ className, children }) =>
    <div className={css('ms-Grid-row', className)}>
        {children}
    </div>;

type ColumnCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type PushPullCount = Exclude<ColumnCount, 12>;

interface IColumnProps {
    className?: string;
    children?: ReactNode;
    sm?: ColumnCount;
    md?: ColumnCount;
    lg?: ColumnCount;
    xl?: ColumnCount;
    xxl?: ColumnCount;
    xxxl?: ColumnCount;

    smPush?: PushPullCount;
    mdPush?: PushPullCount;
    lgPush?: PushPullCount;
    xlPush?: PushPullCount;
    xxlPush?: PushPullCount;
    xxxlPush?: PushPullCount;

    smPull?: PushPullCount;
    mdPull?: PushPullCount;
    lgPull?: PushPullCount;
    xlPull?: PushPullCount;
    xxlPull?: PushPullCount;
    xxxlPull?: PushPullCount;

    hiddenSm?: boolean;
    hiddenMd?: boolean;
    hiddenMdDown?: boolean;
    hiddenMdUp?: boolean;
    hiddenLg?: boolean;
    hiddenLgDown?: boolean;
    hiddenLgUp?: boolean;
    hiddenXl?: boolean;
    hiddenXlDown?: boolean;
    hiddenXlUp?: boolean;
    hiddenXxl?: boolean;
    hiddenXxlDown?: boolean;
    hiddenXxlUp?: boolean;
    hiddenXxxl?: boolean;
}

const buildGridColClassName = ({
    className,
    sm = 12, md, lg, xl, xxl, xxxl,
    smPush, mdPush, lgPush, xlPush, xxlPush, xxxlPush,
    smPull, mdPull, lgPull, xlPull, xxlPull, xxxlPull,
    hiddenSm, hiddenMd, hiddenMdDown, hiddenMdUp, hiddenLg, hiddenLgDown, hiddenLgUp, hiddenXl, hiddenXlDown, hiddenXlUp, hiddenXxl, hiddenXxlDown, hiddenXxlUp, hiddenXxxl
}: IColumnProps) => {
    return css(
        'ms-Grid-col',
        {
            ['ms-sm' + sm]: true,   // always specify column count on small and up screens
            ['ms-md' + md]: !!md,   // only specify column count for medium and up screens if md value is provided
            ['ms-lg' + lg]: !!lg,
            ['ms-xl' + xl]: !!xl,
            ['ms-xxl' + xxl]: !!xxl,
            ['ms-xxxl' + xxxl]: !!xxxl
        },
        {
            ['ms-smPush' + smPush]: !!smPush,
            ['ms-mdPush' + mdPush]: !!mdPush,
            ['ms-lgPush' + lgPush]: !!lgPush,
            ['ms-xlPush' + xlPush]: !!xlPush,
            ['ms-xxlPush' + xxlPush]: !!xxlPush,
            ['ms-xxxlPush' + xxxlPush]: !!xxxlPush
        },
        {
            ['ms-smPull' + smPull]: !!smPull,
            ['ms-mdPull' + mdPull]: !!mdPull,
            ['ms-lgPull' + lgPull]: !!lgPull,
            ['ms-xlPull' + xlPull]: !!xlPull,
            ['ms-xxlPull' + xxlPull]: !!xxlPull,
            ['ms-xxxlPull' + xxxlPull]: !!xxxlPull
        },
        {
            'ms-hiddenSm': hiddenSm,
            'ms-hiddenMd': hiddenMd,
            'ms-hiddenMdDown': hiddenMdDown,
            'ms-hiddenMdUp': hiddenMdUp,
            'ms-hiddenLLg': hiddenLg,
            'ms-hiddenLLgDown': hiddenLgDown,
            'ms-hiddenLLgUp': hiddenLgUp,
            'ms-hiddenLXl': hiddenXl,
            'ms-hiddenLXlDown': hiddenXlDown,
            'ms-hiddenLXlUp': hiddenXlUp,
            'ms-hiddenLXxl': hiddenXxl,
            'ms-hiddenLXxlDown': hiddenXxlDown,
            'ms-hiddenLXxlUp': hiddenXxlUp,
            'ms-hiddenLXxxl': hiddenXxxl
        },
        className
    );
};

export const GridCol: FC<IColumnProps> = ({ children, ...classNameParameters }) =>
    <div className={buildGridColClassName(classNameParameters)}>
        {children}
    </div>;