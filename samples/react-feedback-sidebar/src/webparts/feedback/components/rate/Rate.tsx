import * as React from "react";
import { useCallback } from "react";
import { useEffect, useMemo, useState } from "react";
import { RateStyles } from "./Rate.styles";
import { Image, ImageEnum } from "../image/Image";
import clsx from "clsx";
import { RateProps } from "../../utils/Types";

const handleRate = (value: number): number => {
  if (value < 0) {
    return 0;
  } else if (value > 5) {
    return 5;
  }

  return value !== Math.floor(value) ? Math.floor(value) + 0.5 : value;
};

export const Rate = ({
  onRate: onRateProp,
  rate,
  name,
  className,
  rateLenght,
}: RateProps): JSX.Element => {
  const style = RateStyles();

  const [currentRate, setCurrentRate] = useState<number>(handleRate(rate));

  useEffect(() => {
    setCurrentRate(handleRate(rate));
  }, [rate]);

  const onRate = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      onRateProp(event);
      setCurrentRate(parseFloat(event.target.value));
    },
    [onRateProp]
  );

  const List = useMemo<JSX.Element[]>(
    () =>
      Array.from({ length: rateLenght * 2 }).map((_, index) => (
        <li
          key={`${index}`}
          className={clsx(style.rateItem, index % 2 !== 0 && "margin")}
        >
          <input
            className={style.rateInput}
            type="radio"
            onChange={onRate}
            name={name}
            id={`${name}-${index}`}
            value={(index + 1) / 2}
          />
          <label className={style.rateLabel} htmlFor={`${name}-${index}`}>
            <Image
              className={clsx(
                style.rateIcon,
                currentRate >= (index + 1) / 2 && "checked"
              )}
              imageId={ImageEnum[index % 2 === 0 ? "starLeft" : "starRight"]}
            />
          </label>
        </li>
      )),
    [onRate, currentRate, name, currentRate]
  );

  return (
    <div className={clsx(style.rate, className)}>
      <ul className={style.rateList}>{List}</ul>
    </div>
  );
};
