import * as React from "react";
import { useRef, useMemo, useCallback, useState, useEffect } from "react";
import clsx from "clsx";
import * as strings from "FeedbackWebPartStrings";
import { buildFeedbackConfigFromPage } from "../../utils/SpHelper";
import { FeedbackConfig, FeedbackWrapperProps } from "../../utils/Types";
import { FeedbackWrapperStyles } from "./FeedbackWrapper.styles";
import { Accordion } from "../accordion/Accordion";
import { Image, ImageEnum } from "../image/Image";
import { Loader } from "../loader/Loader";
import { FeedbackForm } from "../feedbackForm/FeedbackForm";

export const FeedbackWrapper = ({
  onClose,
  open,
}: FeedbackWrapperProps): JSX.Element => {
  const style = FeedbackWrapperStyles();
  const [sections, setSections] = useState<FeedbackConfig[]>([]);

  useEffect(() => {
    buildFeedbackConfigFromPage()
      .then((sections) => {
        setSections(sections);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const SectionsList = useMemo<JSX.Element[]>(
    () =>
      sections.map((section) => (
        <li
          className={style.FeedbackWrapperItem}
          key={`${section.title.replace(/ /, "-")}`}
        >
          <ul className={style.FeedbackWrapperList}>
            <Accordion
              className={style.FeedbackSectionAccordion}
              headText={section.title}
              style="secondary"
            >
              <FeedbackForm
                sectionTitle={section.title}
                title={strings.SectionTitle}
                template="section"
              />
            </Accordion>
          </ul>
        </li>
      )),
    [sections]
  );

  const onOuterClick = useCallback(
    (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onClose(event);
      }
    },
    [onClose, wrapperRef]
  );

  return (
    <div className={clsx(style.FeedbackSection)} onClick={onOuterClick}>
      <div
        ref={wrapperRef}
        className={clsx(
          style.FeedbackWrapper,
          open ? "animate-in" : "animate-out"
        )}
      >
        <div className={clsx(style.FeedbackWrapperRow, "to-end")}>
          <button
            className={style.FeedbackWrapperClose}
            type="button"
            onClick={onClose}
          >
            <Image imageId={ImageEnum.close} />
          </button>
        </div>
        <div
          className={clsx(
            style.FeedbackWrapperRow,
            SectionsList.length === 0 && "loader-row"
          )}
        >
          <div className={clsx(style.FeedbackWrapperRow, "no-margin")}>
            <p className={style.FeedbackWrapperTitle}>
              {strings.FeedbackWrapperTitle}
            </p>
            <p className={style.FeedbackWrapperDescription}>
              {strings.FeedbackWrapperDescription}
            </p>
          </div>
          {SectionsList.length > 0 ? (
            <div className={clsx(style.FeedbackWrapperRow, "no-margin")}>
              <FeedbackForm
                sectionTitle="generic"
                title={strings.SectionTitle}
                template="main"
              />
            </div>
          ) : (
            <div className={clsx(style.FeedbackWrapperRow, "loader-row")}>
              <Loader />
            </div>
          )}
        </div>
        {SectionsList.length > 0 && (
          <div
            className={clsx(
              style.FeedbackWrapperRow,
              "no-margin",
              "accordion-row"
            )}
          >
            <ul className={style.FeedbackWrapperList}>{SectionsList}</ul>
          </div>
        )}
      </div>
    </div>
  );
};
