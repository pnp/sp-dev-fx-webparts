import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@fluentui/react-components";
import { useFilterEventsStyles } from "./useFilterEventsStyles";
import {
  CalendarClockRegular,
  CalendarDataBarRegular,
  CalendarLtrRegular,
  CalendarMonthRegular,
  CalendarSearchRegular,
  CalendarWorkWeekRegular,
} from "@fluentui/react-icons";
import {
  DropdownField,
  IOption,
  SelectDay,
  StackV2,
  TypographyControl,
} from "@spteck/react-controls-v2";
import * as strings from "EventsFeedWebPartStrings";

type DateRangeOption =
  | "all-upcoming"
  | "this-week"
  | "next-two-weeks"
  | "this-month"
  | "this-quarter"
  | "select-date-range";

const DATE_PICKERS_VALUE = "__date-pickers__";
const CLOSE_BUTTON_VALUE = "__close__";

export interface IFilterEventsProps {
  onChange: (startDateTime: string, endDateTime: string) => void;
  onDescriptionChange?: (description: string) => void;
}

function computeDateRange(
  option: DateRangeOption,
  fromDate: Date,
  toDate: Date,
): [string, string] {
  const now = new Date();
  switch (option) {
    case "all-upcoming":
      return [
        now.toISOString(),
        new Date(now.getTime() + 180 * 24 * 60 * 60 * 1000).toISOString(),
      ];
    case "this-week": {
      const day = now.getDay();
      const monday = new Date(now);
      monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1));
      monday.setHours(0, 0, 0, 0);
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      sunday.setHours(23, 59, 59, 999);
      return [monday.toISOString(), sunday.toISOString()];
    }
    case "next-two-weeks":
      return [
        now.toISOString(),
        new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      ];
    case "this-month": {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
        999,
      );
      return [start.toISOString(), end.toISOString()];
    }
    case "this-quarter": {
      const quarter = Math.floor(now.getMonth() / 3);
      const start = new Date(now.getFullYear(), quarter * 3, 1);
      const end = new Date(
        now.getFullYear(),
        quarter * 3 + 3,
        0,
        23,
        59,
        59,
        999,
      );
      return [start.toISOString(), end.toISOString()];
    }
    case "select-date-range":
      return [fromDate.toISOString(), toDate.toISOString()];
  }
}

function formatDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function buildDescription(
  option: DateRangeOption,
  fromDate: Date,
  toDate: Date,
): string {
  switch (option) {
    case "all-upcoming":
      return strings.FilterEventsDescriptionAllUpcoming;
    case "this-week":
      return strings.FilterEventsDescriptionThisWeek;
    case "next-two-weeks":
      return strings.FilterEventsDescriptionNextTwoWeeks;
    case "this-month":
      return strings.FilterEventsDescriptionThisMonth;
    case "this-quarter":
      return strings.FilterEventsDescriptionThisQuarter;
    case "select-date-range":
      return `${strings.FilterEventsDescriptionFrom} ${formatDate(fromDate)} ${strings.FilterEventsDescriptionTo} ${formatDate(toDate)}`;
  }
}

export const FilterEvents: React.FC<IFilterEventsProps> = ({ onChange, onDescriptionChange }) => {
  const styles = useFilterEventsStyles();
  const [option, setOption] = useState<DateRangeOption>("all-upcoming");
  const [fromDate, setFromDate] = useState<Date>(() => new Date());
  const [toDate, setToDate] = useState<Date>(
    () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  );
  const [isOpen, setIsOpen] = useState(false);
  // Tracks the current option synchronously so onOpenChange sees the latest value
  const optionRef = useRef<DateRangeOption>("all-upcoming");

  const description = useMemo(
    () => buildDescription(option, fromDate, toDate),
    [option, fromDate, toDate],
  );

  useEffect(() => {
    onDescriptionChange?.(description);
  }, [description, onDescriptionChange]);

  const handleFromChange = useCallback(
    (date: Date): void => {
      // SelectDay applies toZonedTime internally, which shifts the UTC timestamp.
      // Reconstruct from date parts so new Date(y, m, d) gives local midnight.
      const localMidnight = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
      setFromDate(localMidnight);
      onChange(localMidnight.toISOString(), toDate.toISOString());
      setIsOpen(false);
    },
    [toDate, onChange],
  );

  const handleToChange = useCallback(
    (date: Date): void => {
      // Same fix: reconstruct to end-of-day local time (consistent with preset options).
      const localEndOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
      setToDate(localEndOfDay);
      onChange(fromDate.toISOString(), localEndOfDay.toISOString());
      setIsOpen(false);
    },
    [fromDate, onChange],
  );

  const options = useMemo(
    (): IOption[] => [
      {
        value: "all-upcoming",
        text: strings.FilterEventsAllUpcomingLabel,
        icon: <CalendarClockRegular />,
      },
      {
        value: "this-week",
        text: strings.FilterEventsThisWeekLabel,
        icon: <CalendarWorkWeekRegular />,
      },
      {
        value: "next-two-weeks",
        text: strings.FilterEventsNextTwoWeeksLabel,
        icon: <CalendarLtrRegular />,
      },
      {
        value: "this-month",
        text: strings.FilterEventsThisMonthLabel,
        icon: <CalendarMonthRegular />,
      },
      {
        value: "this-quarter",
        text: strings.FilterEventsThisQuarterLabel,
        icon: <CalendarDataBarRegular />,
      },
      {
        value: "select-date-range",
        text: strings.FilterEventsSelectDateRangeLabel,
        icon: <CalendarSearchRegular />,
      },
      {
        value: DATE_PICKERS_VALUE,
        text: "",
        as: "div",
        onRender: () => (
          renderDaysSelector()
        ),
      },
      {
        value: CLOSE_BUTTON_VALUE,
        text: "",
        as: "div",
        onRender: () => (
          <StackV2
            direction="horizontal"
            justifyContent="flex-end"
            paddingTop="s"
            paddingBottom="xs"
            width="100%"
            className={styles.closeButtonContainer}
          >
            <Button appearance="primary" shape="circular"    size="small">
              {strings.FilterEventsCloseLabel}
            </Button>
          </StackV2>
        ),
      },
    ],
    [fromDate, toDate, handleFromChange, handleToChange],
  );

  const visibleOptions = useMemo(
    () =>
      option === "select-date-range"
        ? options
        : options.filter((o) => o.value !== DATE_PICKERS_VALUE),
    [option, options],
  );

  const handleOptionChange = useCallback(
    (val: string): void => {
      if (val === DATE_PICKERS_VALUE) return;
      if (val === CLOSE_BUTTON_VALUE) {
        setIsOpen(false);
        return;
      }
      const newOption = val as DateRangeOption;
      // Update ref synchronously before state batching so handleOpenChange sees it
      optionRef.current = newOption;
      setOption(newOption);
      if (newOption !== "select-date-range") {
        const [start, end] = computeDateRange(newOption, fromDate, toDate);
        onChange(start, end);
      }
    },
    [fromDate, toDate, onChange],
  );

  const handleOpenChange = useCallback(
    (e: React.SyntheticEvent | Event, data: { open: boolean }): void => {
      // While date range pickers are showing, only keyboard events (Escape) can close.
      // SelectDay's calendar is a Menu portal — the Dropdown's onBlur/outside-click
      // handlers see any calendar interaction as "outside", so we must block those.
      if (!data.open && optionRef.current === "select-date-range") {
        const isKeyboard = e.type === "keydown" || e.type === "keyup";
        if (!isKeyboard) return;
      }
      setIsOpen(data.open);
    },
    [],
  );

  return (
    <DropdownField
      value={option}
      options={visibleOptions}
      onChange={handleOptionChange}
      open={isOpen}
      onOpenChange={handleOpenChange}
      showSelectedIcon
    />
  );

    function renderDaysSelector(): React.ReactNode {
        return <StackV2
            direction="vertical"
            gap="s"
            paddingTop="s"
            paddingBottom="s"
        >
            <StackV2 direction="vertical" gap="xxs">
                <TypographyControl fontWeight="semibold">
                    {strings.FilterEventsFromLabel}
                </TypographyControl>
                <SelectDay value={fromDate} onSelected={handleFromChange} />
            </StackV2>
            <StackV2 direction="vertical" gap="xxs">
                <TypographyControl fontWeight="semibold">
                    {strings.FilterEventsToLabel}
                </TypographyControl>
                <SelectDay value={toDate} onSelected={handleToChange} />
            </StackV2>
        </StackV2>;
    }
};
