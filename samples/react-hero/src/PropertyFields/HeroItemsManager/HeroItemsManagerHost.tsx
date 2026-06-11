import * as React from "react";
import { Icon } from "@iconify/react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { Button, webLightTheme } from "@fluentui/react-components";
import {
  FluentUIProvider,
  IHeroItem,
  StackV2,
} from "@spteck/react-controls-v2";
import { HeroItemRow } from "./HeroItemRow";
import { useHeroItemsManagerStyles } from "./useHeroItemsManagerStyles";
import { IHeroItemsManagerHostProps } from "../../models/IHeroItemsManagerProps";
import { generateId } from "../../utils/useUtils";
import strings from 'HeroWebPartStrings';

const createDefaultItem = (): IHeroItem => ({
  id: generateId(),
  mediaType: "image",
  src: "",
  title: "",
  textPosition: "bottom-left",
  overlayOpacity: 0.45,
});

//  Host

const HeroItemsManagerContent: React.FC<IHeroItemsManagerHostProps> = ({
  items: initialItems,
  onStructuralChange,
  onDetailChange,
  resolveUrl,
}) => {
  const styles = useHeroItemsManagerStyles();
  const [items, setItems] = React.useState<IHeroItem[]>(initialItems);
  const [autoExpandIds, setAutoExpandIds] = React.useState<string[]>([]);

  // Always-fresh ref so callbacks never capture stale items state
  const itemsRef = React.useRef<IHeroItem[]>(items);
  itemsRef.current = items;

  React.useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const commit = React.useCallback(
    (updated: IHeroItem[], structural: boolean): void => {
      setItems(updated);
      if (structural) onStructuralChange(updated);
      else onDetailChange(updated);
    },
    [onStructuralChange, onDetailChange],
  );

  const handleAdd = React.useCallback((): void => {
    const newItem = createDefaultItem();
    const updated = [...itemsRef.current, newItem];
    setAutoExpandIds((prev) => prev.concat(newItem.id));
    commit(updated, true);
  }, [commit]);

  const handleDelete = React.useCallback(
    (id: string): void => {
      commit(
        itemsRef.current.filter((i) => i.id !== id),
        true,
      );
    },
    [commit],
  );

  const handleMoveUp = React.useCallback(
    (id: string): void => {
      const prev = itemsRef.current;
      const idx = prev.findIndex((i) => i.id === id);
      if (idx <= 0) return;
      const updated = [...prev];
      const tmp = updated[idx - 1];
      updated[idx - 1] = updated[idx];
      updated[idx] = tmp;
      commit(updated, true);
    },
    [commit],
  );

  const handleMoveDown = React.useCallback(
    (id: string): void => {
      const prev = itemsRef.current;
      const idx = prev.findIndex((i) => i.id === id);
      if (idx < 0 || idx >= prev.length - 1) return;
      const updated = [...prev];
      const tmp = updated[idx + 1];
      updated[idx + 1] = updated[idx];
      updated[idx] = tmp;
      commit(updated, true);
    },
    [commit],
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = React.useCallback(
    (event: DragEndEvent): void => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      const prev = itemsRef.current;
      const oldIndex = prev.findIndex((i) => i.id === active.id);
      const newIndex = prev.findIndex((i) => i.id === over.id);
      commit(arrayMove(prev, oldIndex, newIndex), true);
    },
    [commit],
  );

  const handleDetailChange = React.useCallback(
    (updated: IHeroItem): void => {
      commit(
        itemsRef.current.map((i) => (i.id === updated.id ? updated : i)),
        false,
      );
    },
    [commit],
  );

  return (
    <StackV2 direction="vertical" padding="0px" paddingTop="m">
      <StackV2 direction="horizontal" className={styles.addButtonWrapper}>
        <Button
          appearance="outline"
          size="medium"
          icon={
            <Icon icon="fluent:add-circle-16-regular" width={16} height={16} />
          }
          style={{ width: "100%", justifyContent: "center" }}
          onClick={handleAdd}
        >
          {strings.AddTileLabel}
        </Button>
      </StackV2>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <StackV2 direction="vertical" className={styles.list}>
            {items.map((item, index) => (
              <HeroItemRow
                key={item.id}
                item={item}
                index={index}
                total={items.length}
                defaultOpen={autoExpandIds.indexOf(item.id) !== -1}
                onDelete={handleDelete}
                onMoveUp={handleMoveUp}
                onMoveDown={handleMoveDown}
                onDetailChange={handleDetailChange}
                resolveUrl={resolveUrl}
              />
            ))}
          </StackV2>
        </SortableContext>
      </DndContext>
    </StackV2>
  );
};

export const HeroItemsManagerHost: React.FC<IHeroItemsManagerHostProps> = (
  props,
) => (
  <FluentUIProvider
    theme={props.hostType === "sharepoint" ? webLightTheme : props.theme}
    applicationName="hero-items-manager"
    targetDocument={document}
    applyStylesToPortals
    styles={{ backgroundColor: "transparent" }}
  >
    <HeroItemsManagerContent {...props} />
  </FluentUIProvider>
);

HeroItemsManagerHost.displayName = "HeroItemsManagerHost";
