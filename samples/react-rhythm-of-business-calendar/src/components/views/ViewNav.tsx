import React, { useCallback } from "react";
import { Pivot, PivotItem } from "@fluentui/react";
import { useNavigate } from "react-router";
import { IViewDescriptor } from "./IViewDescriptor";
import { ViewDescriptors } from "./Views";
import { useView } from "./useView";

import styles from './ViewNav.module.scss';

type OnLinkClickType = (item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) => void;

const renderViewNavPivotItem = ({ id, title }: IViewDescriptor) =>
    <PivotItem itemKey={id} headerText={title} />

export const ViewNav = () => {
    const view = useView();
    const navigate = useNavigate();
    const onViewPivotItemClicked: OnLinkClickType = useCallback(
        ({ props: { itemKey } }, ev) => navigate(`/${itemKey}`),
        [navigate]
    );

    return (
        <div className={styles.viewNavContainer}>
            <Pivot headersOnly selectedKey={view.id} onLinkClick={onViewPivotItemClicked}>
                {ViewDescriptors.map(renderViewNavPivotItem)}
            </Pivot>
        </div>
    );
};

export default ViewNav;