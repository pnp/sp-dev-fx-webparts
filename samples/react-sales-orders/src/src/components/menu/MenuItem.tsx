import * as React from 'react';

import {
  Body1Strong,
  Caption1,
  mergeClasses,
  tokens,
} from '@fluentui/react-components';
import { Icon } from '@iconify/react';

import { IMenuItem } from '../../models/IMenuItem';
import { useMenuStyles } from './useMenuStyles';

export interface IStepItemProps {
  item: IMenuItem;
  isCurrentItem: boolean;
  onItemClick: () => void;
}

export const MenuItem: React.FunctionComponent<IStepItemProps> = (props: React.PropsWithChildren<IStepItemProps>) => {
  const { item, isCurrentItem,   onItemClick } = props;
  const { icon, title, description } = item;
  const styles = useMenuStyles();
  
  const color = isCurrentItem ? tokens.colorBrandForeground1 : tokens.colorNeutralStrokeAccessible;
   
 

  const ItemInfo = (props: { title: string; description: string; icon: JSX.Element;  }):JSX.Element => {
    const { title, description, icon } = props;
    return (
        <div className={styles.itemContainer}>
            <div className={styles.itemTitle}>
             {icon}
            <Body1Strong className={styles.headerTitle}  style={{ color: color   }}>{title}</Body1Strong>
            </div>
            <Caption1 className={mergeClasses(styles.headerDescription, styles.itemDescription)}>
             {description}
            </Caption1>
        </div>
    )
  };
  return (
    <>
      <div  style={{color: color}}  className={mergeClasses(styles.menuItem)} onClick={() => onItemClick()}>
        <ItemInfo title={title} description={description as string} icon={<Icon icon={`${icon}`} width={24} height={24}  color={color}/> } />
      </div>
    </>
  );
};