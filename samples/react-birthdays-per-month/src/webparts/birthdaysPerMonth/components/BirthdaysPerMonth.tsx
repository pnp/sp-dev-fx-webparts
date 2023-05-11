import * as React from "react";
import { BirthdaysInMonth } from "../../../models/BirthdaysInMonth";
import { MonthSection } from "./MonthSection";

interface IBirthdaysPerMonthProps {
  data: Array<BirthdaysInMonth>;
}

const BirthdaysPerMonth = (props: IBirthdaysPerMonthProps): JSX.Element => {
  return (
    <section>
      {props.data.map((month, index) => (
        <MonthSection key={month.title} data={month} index={index} />
      ))}
    </section>
  );
};

export { IBirthdaysPerMonthProps, BirthdaysPerMonth };
