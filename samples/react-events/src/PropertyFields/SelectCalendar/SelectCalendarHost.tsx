import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Avatar, tokens } from "@fluentui/react-components";
import {
  FluentUIProvider,
  StackV2,
  ItemPicker,
  IItemPickerOption,
  TypographyControl,
} from "@spteck/react-controls-v2";
import { useEventManagement, IUnifiedCalendar } from "@spteck/m365-hooks";
import { ISelectCalendarComponentProps } from "../../models/ISelectCalendarProps";
import * as strings from "EventsFeedWebPartStrings";

// Composite key: siteOrGroupId + id + type — ensures uniqueness even for OOB
// calendars (e.g. the built-in "Events" list) that share the same list ID across sites.
const calendarKey = (cal: IUnifiedCalendar): string =>
  `${cal.siteOrGroupId ?? ""}|${cal.id}|${cal.type}`;

const SelectCalendarHost: React.FC<ISelectCalendarComponentProps> = ({
  spfxContext,
  selectedCalendars,
  theme,
  onChange,
}) => {
  const [currentSelected, setCurrentSelected] =
    useState<IUnifiedCalendar[]>(selectedCalendars);
  const [searchResults, setSearchResults] = useState<IUnifiedCalendar[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Persistent lookup map: calendarKey → IUnifiedCalendar
  // Avoids stale-closure issues in handleSelectionChange regardless of when
  // searchResults state is cleared after a selection.
  const calendarMapRef = useRef<Map<string, IUnifiedCalendar>>(
    new Map(selectedCalendars.map((cal) => [calendarKey(cal), cal])),
  );

  const { getTenantCalendars } = useEventManagement(spfxContext as never);

  // Reset search results whenever the search value is cleared
  useEffect(() => {
    if (searchValue.trim().length < 3) {
      setSearchResults([]);
    }
  }, [searchValue]);

  const calendarToOption = useCallback(
    (cal: IUnifiedCalendar): IItemPickerOption => ({
      value: calendarKey(cal),
      text: cal.name,
      secondaryText: cal.siteOrGpoupName,
      media: (
        <Avatar
          name={cal.name}
          color={cal.color as never}
          idForColor={cal.id}
          shape="square"
          size={32}
        />
      ),
    }),
    [],
  );

  const options = useMemo(() => {
    if (searchValue.trim().length < 3) return [];
    const selectedKeys = new Set(currentSelected.map(calendarKey));
    return searchResults
      .filter((c) => !selectedKeys.has(calendarKey(c)))
      .map(calendarToOption);
  }, [searchValue, searchResults, currentSelected, calendarToOption]);

  const selectedOptions = useMemo(
    () => currentSelected.map(calendarToOption),
    [currentSelected, calendarToOption],
  );

  const handleSearchChange = useCallback(
    (value: string): void => {
      setSearchValue(value);
      if (value.trim().length < 3) return;
      setIsLoading(true);
      getTenantCalendars(value)
        .then((results: IUnifiedCalendar[]) => {
          // Keep the map populated so handleSelectionChange can always resolve
          // the full IUnifiedCalendar regardless of when searchResults is cleared.
          for (const cal of results) {
            calendarMapRef.current.set(calendarKey(cal), cal);
          }
          setSearchResults(results);
          setIsLoading(false);
        })
        .catch(() => {
          setSearchResults([]);
          setIsLoading(false);
        });
    },
    [getTenantCalendars],
  );

  const handleSelectionChange = useCallback(
    (selected: IItemPickerOption[]): void => {
      const updated: IUnifiedCalendar[] = [];
      for (const opt of selected) {
        const cal = calendarMapRef.current.get(opt.value);
        if (cal !== undefined) updated.push(cal);
      }
      setCurrentSelected(updated);
      onChange({ selectedCalendars: updated });
    },
    [onChange],
  );

  return (
    <FluentUIProvider
      theme={theme}
      applicationName="eventsfeed-selectcalendar-property-pane"
      applyStylesToPortals
      styles={{ background: 'transparent' }}
    >
      <StackV2 direction="vertical" gap="m" paddingTop="s">
        <TypographyControl fontWeight="semibold">{strings.SelectCalendarLabel}</TypographyControl>
        <TypographyControl fontSize="xs" color={tokens.colorNeutralForeground2}>
          {strings.SelectCalendarDescription}
        </TypographyControl>

        <ItemPicker
          options={options}
          selectedOptions={selectedOptions}
          placeholder={strings.SelectCalendarPlaceholder}
          disabled={isLoading}
          width="100%"
          tagMaxWidth={160}
          onSelectionChange={handleSelectionChange}
          onSearchChange={handleSearchChange}
        />
      </StackV2>
    </FluentUIProvider>
  );
};

export default SelectCalendarHost;
