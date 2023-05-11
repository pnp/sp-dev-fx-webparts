import { addYears, format } from "date-fns/esm";
import formatDistance from "date-fns/formatDistance";
import set from "date-fns/set";
import { Icon, IconButton } from "office-ui-fabric-react";
import * as React from "react";

import { BirthdaysInMonth } from "../../../models/BirthdaysInMonth";

interface IMonthSectionProps {
  data: BirthdaysInMonth;
  index: number;
}

const MonthSection = (props: IMonthSectionProps): JSX.Element => {
  const [isExpand, toggleExpand] = React.useReducer(
    (previous) => !previous,
    props.index === 0 || props.index === 1
  );

  const generateYearLabel = (): string => {
    if (props.data.title !== "January" || props.index === 0) return "";

    const today = new Date();
    today.setFullYear(today.getFullYear() + 1);
    return " " + today.getFullYear();
  };

  const getDate = (date: number, month: number): Date => {
    let birthdateDate = set(new Date(), { month, date });
    if (birthdateDate.getMonth() < new Date().getMonth()) {
      birthdateDate = addYears(birthdateDate, 1);
    }
    return birthdateDate;
  };

  const generateDateLabel = (date: number, month: number): string => {
    const birthdateDate = getDate(date, month);
    return format(birthdateDate, "E, d MMM");
  };

  const generateDistanceLabel = (date: number, month: number): string => {
    const birthdateDate = getDate(date, month);
    return formatDistance(birthdateDate, new Date(), { addSuffix: true });
  };

  return (
    <div onClick={toggleExpand}>
      <div className="hover:tw-cursor-pointer tw-p-3 tw-bg-[#f3f2f1] tw-font-semibold tw-text-lg tw-flex tw-gap-2">
        <Icon
          className={`${isExpand ? "tw-rotate-90" : ""} tw-transition-all`}
          iconName="ChevronRightMed"
        />
        <div>
          {props.data.title}
          {generateYearLabel()}
        </div>
      </div>
      {isExpand && (
        <div className="tw-flex tw-gap-8 tw-p-3 tw-pl-[2.35rem] tw-border tw-border-solid tw-border-[#f3f2f1]">
          {props.data.users.length === 0 && <div>No birthdays this month.</div>}
          {props.data.users.map((user) => (
            <div className="tw-flex tw-gap-4" key={user.id}>
              <div>
                <img
                  className="tw-rounded-full tw-w-20"
                  src={`/_layouts/15/userphoto.aspx?UserName=${user.email}`}
                />
              </div>
              <div className="tw-flex tw-flex-col tw-justify-center">
                <div className="tw-text-lg tw-font-semibold tw-flex tw-gap-1 tw-items-center">
                  <div>{user.name}</div>
                  <IconButton
                    iconProps={{ iconName: "Mail" }}
                    title="Mail"
                    onClick={(event) => {
                      event.stopPropagation();
                      window.open(`mailto:${user.email}`);
                    }}
                  />
                </div>
                <div>{generateDateLabel(user.date, user.monthIndex)}</div>
                <div>{generateDistanceLabel(user.date, user.monthIndex)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { MonthSection };
