import * as React from 'react';
import {
  Button,
  Drawer as FluentDrawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle
} from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';
import type { IDrawerProps } from './Drawer.types';

export const Drawer: React.FC<IDrawerProps> = ({
  open,
  onClose,
  position = 'end',
  size = 'medium',
  title,
  children,
  closeButtonAriaLabel = 'Close panel'
}) => (
  <FluentDrawer
    type="overlay"
    position={position}
    size={size}
    open={Boolean(open)}
    onOpenChange={(_, data) => {
      if (!data.open) onClose?.();
    }}
  >
    {title ? (
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              icon={<DismissRegular />}
              aria-label={closeButtonAriaLabel}
              onClick={() => onClose?.()}
            />
          }
        >
          {title}
        </DrawerHeaderTitle>
      </DrawerHeader>
    ) : null}
    <DrawerBody>{children}</DrawerBody>
  </FluentDrawer>
);

Drawer.displayName = 'Drawer';
