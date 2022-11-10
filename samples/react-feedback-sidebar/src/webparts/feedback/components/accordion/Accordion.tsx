import clsx from "clsx";
import * as React from "react";
import { useState } from "react";
import { AccordionProps } from "../../utils/Types";
import { Image, ImageEnum } from "../image/Image";

import { AccordionStyles, AccordionContentStyles } from "./Accordion.styles";

export const Accordion = ({
  headText,
  expanded,
  children,
  className,
  style = "default",
}: AccordionProps): JSX.Element => {
  const accordionStyle = AccordionStyles();
  const accordionContentStyle = AccordionContentStyles();

  const [isOpen, setOpen] = useState(expanded);

  const PanelToggleHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.stopPropagation();
    setOpen((st) => !st);
  };

  const wChilds = Array.isArray(children) ? children : [children];

  return (
    <div
      className={clsx(
        accordionStyle.Accordion,
        className,
        style,
        isOpen && "open"
      )}
    >
      <button
        className={accordionStyle.ToggleButton}
        onClick={PanelToggleHandler}
      >
        <div className={accordionStyle.ToggleTitle}>{headText}</div>
        <Image
          imageId={ImageEnum.angle}
          className={clsx(
            accordionStyle.ToggleIcon,
            isOpen ? "expanded" : "collapsed"
          )}
        />
      </button>
      <div
        className={clsx(
          accordionContentStyle.ContentSection,
          "accordion-body",
          isOpen ? "expanded" : "collapsed"
        )}
      >
        {wChilds
          .filter(() => isOpen)
          .map((child, idx) => {
            if (child) {
              const key = child.key || `content-${idx}`;
              return { ...child, key };
            }
            return <React.Fragment key={`tmp-${idx}`} />;
          })}
      </div>
    </div>
  );
};
