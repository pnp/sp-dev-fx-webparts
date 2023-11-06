import * as React from 'react';

import { IMenuItem } from '../../models/IMenuItem';
import { MenuItem } from './MenuItem';
import { useMenuStyles } from './useMenuStyles';

export interface IMenuProps {
 
  currentItem: IMenuItem;
  onItemClick: (item: IMenuItem) => void;
}

const menuItems:IMenuItem[] = [
    {
        id : 1,
        title: "Orders",
        description: "Manage orders",
        icon: "map:grocery-or-supermarket" ,
    },
    {
      id: 2,
        title: "Customers",
        description: "Manage customers",
        icon: "mingcute:user-2-line" ,
    }  
];

export const Menu: React.FunctionComponent<IMenuProps> = (props: React.PropsWithChildren<IMenuProps>) => {
  const { currentItem, onItemClick } = props;
  const styles =  useMenuStyles();


  return (
    <>
      <div className={styles.mainContainer}>
        {menuItems.map((item, index) => {
          const isCurrentItem = item.id === currentItem.id;      
          return (
            <MenuItem key={index} item={item} isCurrentItem={isCurrentItem}  onItemClick={() => onItemClick(item)} />
          );
        })}
      </div>
    </>
  );
};