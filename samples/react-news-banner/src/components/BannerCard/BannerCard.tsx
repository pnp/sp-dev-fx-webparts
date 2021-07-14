/* tslint:disable */
import { format, parseISO } from "date-fns";
import React from "react";
import styles from "./BannerCard.module.scss";
import { IBannerCardProps } from "./IBannerCardProps";

export const BannerCard: React.FunctionComponent<IBannerCardProps> = (
  props: React.PropsWithChildren<IBannerCardProps>
) => {
  const { item, isSelected } = props;
  const _date = format(parseISO(item.publishedDate), "PPPP");
  return (
    <>
      <div
        className={
          isSelected ? styles.documentCardSeleted : styles.documentCard
        }
        onClick={() => {
          props.onSeletedItem(item);
        }}
      >
        <div className={styles.subTitleNews}>{_date}</div>
        <div className={styles.description}>{item.description}</div>
      </div>
    </>
  );
};
