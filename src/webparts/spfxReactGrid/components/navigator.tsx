import * as React from 'react';

export interface INavigatorProps extends React.Props<any> {
  testid?: string;
}

export default function Navigator({

  children = null,
  testid = ''
}: INavigatorProps) {
  return (
    <nav
      data-testid={ testid }
      className="flex items-center p1 bg-white border-bottom">
      { children }
    </nav>
  );
}
