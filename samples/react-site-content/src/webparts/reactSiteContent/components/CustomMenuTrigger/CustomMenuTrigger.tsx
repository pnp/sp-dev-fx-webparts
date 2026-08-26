import { Button, MenuTriggerChildProps } from "@fluentui/react-components";
import { bundleIcon, MoreVerticalFilled, MoreVerticalRegular } from "@fluentui/react-icons";
import * as React from "react";

const MoreHorizontalIcon = bundleIcon(MoreVerticalFilled, MoreVerticalRegular);

export const CustomMenuTrigger = React.forwardRef<HTMLButtonElement, Partial<MenuTriggerChildProps>>((props, ref) => {
  return <Button icon={<MoreHorizontalIcon />} appearance="subtle" aria-label="More actions" {...props} ref={ref} />;
});
