import * as React from "react";

import {
  Badge,
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuProps,
  MenuTrigger,
} from "@fluentui/react-components";

import { MoreHorizontal20Regular } from "@fluentui/react-icons";
import { TARGET_TYPES } from "../../constants/TargetTypes";
import { css } from "@emotion/css";

// Global state to track open menus by target types badge ID
const openMenus = new Set<string>();

export interface ITargetTypesBadgesProps {
  /** Array of target type keys to display as badges */
  targetTypes: string[];
  /** Optional CSS class name for custom styling */
  className?: string;
}

export const TargetTypesBadges: React.FC<ITargetTypesBadgesProps> = ({
  targetTypes,
  className,
}) => {
  // Use a stable ID that doesn't change on re-renders
  const menuId = React.useMemo(
    () => `target-types-menu-${targetTypes.sort().join("-")}`,
    [targetTypes]
  );

  // Initialize state from global set
  const [isMenuOpen, setIsMenuOpen] = React.useState(() =>
    openMenus.has(menuId)
  );
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [maxVisible, setMaxVisible] = React.useState(3); // Default to show 3 badges

  // Get display text for target types
  const targetTypeItems = React.useMemo(() => {
    return targetTypes.map((targetType) => {
      const targetTypeConfig = TARGET_TYPES.find((t) => t.key === targetType);
      return {
        id: targetType,
        text: targetTypeConfig?.text || targetType,
      };
    });
  }, [targetTypes]);

  // Simple responsive logic based on container width

  const onOpenChange: MenuProps["onOpenChange"] = React.useCallback(
    (event, data) => {
      setIsMenuOpen(data.open);
      if (data.open) {
        openMenus.add(menuId);
      } else {
        openMenus.delete(menuId);
      }
    },
    [menuId]
  );

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      openMenus.delete(menuId);
    };
  }, [menuId]);

  React.useEffect(() => {
    const updateVisibleCount = (): void => {
      if (!containerRef.current) return;

      const width = containerRef.current.offsetWidth;
      // Simple breakpoints - adjust based on typical badge widths
      if (width < 120) {
        setMaxVisible(1);
      } else if (width < 180) {
        setMaxVisible(2);
      } else if (width < 240) {
        setMaxVisible(3);
      } else if (width < 300) {
        setMaxVisible(4);
      } else {
        setMaxVisible(Math.min(targetTypeItems.length, 6));
      }
    };

    const resizeObserver = new ResizeObserver(updateVisibleCount);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
      updateVisibleCount(); // Initial calculation
    }

    return () => resizeObserver.disconnect();
  }, []);

  if (!targetTypes || targetTypes.length === 0) {
    return null;
  }

  const visibleItems = targetTypeItems.slice(0, maxVisible);
  const hiddenItems = targetTypeItems.slice(maxVisible);
  const hasOverflow = hiddenItems.length > 0;

  const containerStyles = css({
    display: "flex",
    alignItems: "center",
    gap: "4px",
    width: "100%",
    minWidth: 0,
    overflow: "hidden",
  });

  const badgeStyles = css({
    flexShrink: 0,
  });

  return (
    <div ref={containerRef}   className={`${containerStyles} ${className || ""}`}>
      {/* Render visible badges */}
      {visibleItems.map((item) => (
        <Badge
          key={item.id}
          appearance="filled"
          size="medium"
          className={badgeStyles}
          color="brand"
        >
          {item.text}
        </Badge>
      ))}

      {/* Render overflow menu if needed */}
      {hasOverflow && (
        <Menu open={isMenuOpen} onOpenChange={onOpenChange}>
          <MenuTrigger disableButtonEnhancement>
            <Button size="medium" appearance="transparent"  icon={<MoreHorizontal20Regular />} style={{padding:0}}/>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              {hiddenItems.map((item) => (
                <MenuItem key={item.id}>{item.text}</MenuItem>
              ))}
            </MenuList>
          </MenuPopover>
        </Menu>
      )}
    </div>
  );
};
