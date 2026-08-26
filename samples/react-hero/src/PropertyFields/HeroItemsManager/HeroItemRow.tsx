import * as React from "react";
import { Icon } from "@iconify/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, tokens } from "@fluentui/react-components";
import {
  ButtonMenu,
  IButtonMenuOption,
  TypographyControl,
  StackV2,
} from "@spteck/react-controls-v2";
import { useHeroItemRowStyles } from "./useHeroItemRowStyles";
import { HeroItemDetail } from "./HeroItemDetail";
import { IHeroItemRowProps } from "../../models/IHeroItemRowProps";
import strings from 'HeroWebPartStrings';

export const HeroItemRow: React.FC<IHeroItemRowProps> = ({
  item,
  index,
  total,
  defaultOpen = false,
  onDelete,
  onMoveUp,
  onMoveDown,
  onDetailChange,
  resolveUrl,
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const styles = useHeroItemRowStyles();

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const displayTitle =
    item.title || item.alt || `${strings.DefaultTileTitle} ${index + 1}`;

  const menuOptions = React.useMemo<IButtonMenuOption[]>(
    () => [
      {
        key: "move-up",
        text: strings.MoveUpLabel,
        icon: <Icon icon="fluent:arrow-up-16-regular" width={16} height={16} />,
        disabled: index === 0,
        itemType: "item",
      },
      {
        key: "move-down",
        text: strings.MoveDownLabel,
        icon: (
          <Icon icon="fluent:arrow-down-16-regular" width={16} height={16} />
        ),
        disabled: index === total - 1,
        itemType: "item",
      },
      { key: "divider", text: "", itemType: "divider" },
      {
        key: "delete",
        text: strings.DeleteLabel,
        icon: <Icon icon="fluent:delete-16-regular" width={16} height={16} />,
        color: tokens.colorPaletteRedForeground1,
        itemType: "item",
      },
    ],
    [index, total],
  );

  const handleMenuSelected = React.useCallback(
    (opt: IButtonMenuOption): void => {
      if (opt.key === "move-up") onMoveUp(item.id);
      else if (opt.key === "move-down") onMoveDown(item.id);
      else if (opt.key === "delete") onDelete(item.id);
    },
    [item.id, onMoveUp, onMoveDown, onDelete],
  );

  const wrapperStyle: React.CSSProperties = {
    transform: CSS.Transform.toString(transform) || undefined,
    transition: transition || undefined,
    opacity: isDragging ? 0.4 : 1,
    position: isDragging ? "relative" : undefined,
    zIndex: isDragging ? 9999 : undefined,
  };

  const rowClass = [styles.row, isOpen ? styles.rowExpanded : ""]
    .filter(Boolean)
    .join(" ");
  const handleClass = [
    styles.dragHandle,
    isOpen ? styles.dragHandleExpanded : "",
    isDragging ? styles.dragHandleDragging : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <StackV2
      ref={setNodeRef}
      direction="vertical"
      className={styles.rowWrapper}
      style={wrapperStyle}
      {...(attributes as React.HTMLAttributes<HTMLDivElement>)}
    >
      {/*   Header row  */}
      <StackV2
        direction="horizontal"
        alignItems="center"
        className={rowClass}
        style={{ gap: tokens.spacingHorizontalXS }}
      >
        {/* Drag handle — Button forwards ref + event handlers; StackV2 drops unknown props */}
        <Button
          ref={setActivatorNodeRef as unknown as React.Ref<HTMLButtonElement>}
          appearance="subtle"
          size="medium"
          className={handleClass}
          icon={
            <Icon
              icon="fluent:re-order-dots-vertical-16-regular"
              width={32}
              height={32}
            />
          }
          aria-label={strings.DragToReorderLabel}
          style={{ touchAction: "none", minWidth: 0, padding: "2px" }}
          {...(listeners as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        />

        {/* Title */}
        <StackV2 style={{ flex: 1, minWidth: 0 }}>
          <TypographyControl
            as="span"
            fontSize="s"
            fontWeight="semibold"
            truncate
            color={isOpen ? tokens.colorBrandForeground1 : undefined}
          >
            {displayTitle}
          </TypographyControl>
        </StackV2>

        {/* Actions */}
        <StackV2
          direction="horizontal"
          alignItems="center"
          className={styles.actions}
        >
          {/* "..." more options menu */}
          <ButtonMenu
            apparence="subtle"
            size="medium"
            shape="square"
            icon={
              <Icon
                icon="fluent:more-horizontal-16-regular"
                width={32}
                height={32}
              />
            }
            defaultItemType="item"
            options={menuOptions}
            onSelected={handleMenuSelected}
          />

          {/* Expand / collapse chevron */}
          <Button
            appearance={isOpen ? "outline" : "subtle"}
            size="medium"
            icon={
              <Icon
                icon={
                  isOpen
                    ? "fluent:chevron-up-16-regular"
                    : "fluent:chevron-down-16-regular"
                }
                width={32}
                height={32}
              />
            }
            aria-label={isOpen ? strings.CollapseLabel : strings.ExpandLabel}
            onClick={() => setIsOpen((v) => !v)}
          />
        </StackV2>
      </StackV2>

      {/* Expanded detail */}
      {isOpen && (
        <HeroItemDetail
          item={item}
          onChange={onDetailChange}
          resolveUrl={resolveUrl}
        />
      )}
    </StackV2>
  );
};

HeroItemRow.displayName = "HeroItemRow";
