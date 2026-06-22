import type { DropdownProps as FluentDropdownProps } from "@fluentui/react-components";

export interface ExtendedDropdownProps extends FluentDropdownProps {
  options: { key: string; text: string }[];
  placeholder?: string;
  defaultSelectedKey?: string;
}
