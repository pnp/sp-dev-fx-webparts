export interface IDetailsRowCheckProps {
    selected?: boolean;
    /**
     * @deprecated
     * Deprecated at v.65.1 and will be removed by v 1.0. Use 'selected' instead.
     */
    isSelected?: boolean;
    anySelected: boolean;
    ariaLabel: string;
    canSelect: boolean;
}
export declare const DetailsRowCheck: (props: IDetailsRowCheckProps) => JSX.Element;
