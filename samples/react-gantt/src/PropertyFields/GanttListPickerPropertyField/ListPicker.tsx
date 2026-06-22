import * as React from "react";
import {
  Dropdown,
  Option,
  Spinner,
  Text,
  MessageBar,
  MessageBarBody,
} from "@fluentui/react-components";
import { ListRegular } from "@fluentui/react-icons";
import { useGanttListPickerStyles } from "./useGanttListPickerStyles";
import type { ISPList } from "./IGanttFieldDefinitions";
import type { SPListService, ISPListPage } from "../../services/SPListService";
import * as strings from 'GanttWebPartStrings';

export interface IListPickerProps {
  selectedListId: string;
  service: SPListService;
  onListChange: (listId: string) => void;
  error?: string;
  onError: (error: string | undefined) => void;
}

const SCROLL_THRESHOLD = 0.8;

export const ListPicker: React.FC<IListPickerProps> = (props) => {
  const { selectedListId, service, onListChange, error, onError } = props;
  const { styles } = useGanttListPickerStyles();

  const [lists, setLists] = React.useState<ISPList[]>([]);
  const [isLoadingInitial, setIsLoadingInitial] = React.useState(true);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(false);

  const nextPageUrlRef = React.useRef<string | undefined>(undefined);
  // Refs mirror state so scroll handler never reads stale values
  const isLoadingMoreRef = React.useRef(false);
  const hasMoreRef = React.useRef(false);

  React.useEffect(() => { isLoadingMoreRef.current = isLoadingMore; }, [isLoadingMore]);
  React.useEffect(() => { hasMoreRef.current = hasMore; }, [hasMore]);

  React.useEffect(() => {
    setIsLoadingInitial(true);
    onError(undefined);
    service
      .getListsPage()
      .then((page: ISPListPage) => {
        setLists(page.lists);
        setHasMore(page.hasMore);
        nextPageUrlRef.current = page.nextPageUrl;
        setIsLoadingInitial(false);
      })
      .catch((err: Error) => {
        onError(err.message);
        setIsLoadingInitial(false);
      });
  }, [service]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadMore = React.useCallback(() => {
    if (isLoadingMoreRef.current || !hasMoreRef.current || !nextPageUrlRef.current) return;
    setIsLoadingMore(true);
    isLoadingMoreRef.current = true;
    service
      .getListsPage(nextPageUrlRef.current)
      .then((page: ISPListPage) => {
        setLists((prev) => {
          const ids = new Set(prev.map((l) => l.Id));
          return [...prev, ...page.lists.filter((l) => ids.has(l.Id) === false)];
        });
        setHasMore(page.hasMore);
        hasMoreRef.current = page.hasMore;
        nextPageUrlRef.current = page.nextPageUrl;
        setIsLoadingMore(false);
        isLoadingMoreRef.current = false;
      })
      .catch((err: Error) => {
        onError(err.message);
        setIsLoadingMore(false);
        isLoadingMoreRef.current = false;
      });
  }, [service, onError]);

  const handleListboxScroll = React.useCallback(
    (ev: React.UIEvent<HTMLDivElement>) => {
      const el = ev.currentTarget;
      if (el.scrollHeight <= el.clientHeight) return;
      if ((el.scrollTop + el.clientHeight) / el.scrollHeight >= SCROLL_THRESHOLD) {
        loadMore();
      }
    },
    [loadMore]
  );

  const handleOptionSelect = React.useCallback(
    (_ev: unknown, data: { optionValue?: string }) => {
      if (data.optionValue) onListChange(data.optionValue);
    },
    [onListChange]
  );

  return (
    <div className={styles.section}>
      <Text className={styles.sectionTitle}>{strings.SelectListTitle}</Text>

      {isLoadingInitial ? (
        <div className={styles.spinner}>
          <Spinner size="tiny" label={strings.LoadingLists} />
        </div>
      ) : (
        <Dropdown
          placeholder={strings.SelectAList}
          selectedOptions={selectedListId ? [selectedListId] : []}
          value={lists.find((l) => l.Id === selectedListId)?.Title ?? ""}
          onOptionSelect={handleOptionSelect}
          listbox={{
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onScroll: handleListboxScroll as any,
            style: { maxHeight: "220px" },
          }}
          style={{ width: "100%" }}
        >
          {lists.map((list) => (
            <Option key={list.Id} value={list.Id} text={list.Title}>
              <ListRegular style={{ flexShrink: 0 }} />
              {list.Title} ({list.ItemCount} {strings.ItemsSuffix})
            </Option>
          ))}
          {hasMore && (
            <Option key="__loading__" disabled value="" text="">
              <Spinner size="tiny" label={isLoadingMore ? strings.LoadingMore : ""} />
            </Option>
          )}
        </Dropdown>
      )}

      {error && (
        <MessageBar intent="error">
          <MessageBarBody>{error}</MessageBarBody>
        </MessageBar>
      )}
    </div>
  );
};
