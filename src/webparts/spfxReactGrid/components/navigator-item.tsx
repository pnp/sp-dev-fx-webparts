import * as React from 'react';
export interface INavigatorItemProps extends React.Props<any> {
  isVisible?: boolean;
  mr?: boolean;
  ml?: boolean;
}
export default function NavigatorItem({
  children = null,
  isVisible = true,
  mr = false,
  ml = false,
}: INavigatorItemProps) {
  return (
    <div >
      { children }
    </div>
  );
}
