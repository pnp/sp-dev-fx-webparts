import { IFieldInfo } from "@pnp/sp/fields";
import { format } from "date-fns";
import * as React from "react";
import styles from "../EnhancedPageProperties.module.scss";

export interface IValueProps {
  field: IFieldInfo;
  value: string | string[];
}

export default function Value(props: IValueProps): JSX.Element {
  if (!props.value) return <span>-</span>;

  switch (props.field.TypeDisplayName) {
    case "Choice": {
      const value = props.value as string[];
      return (
        <div className={styles.choice}>
          {value.map((item: string) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      );
    }
    case "Date and Time": {
      return (
        <span>{format(new Date(props.value as string), "dd MMMM yyyy")}</span>
      );
    }
    default: {
      return <span>{props.value}</span>;
    }
  }
}
