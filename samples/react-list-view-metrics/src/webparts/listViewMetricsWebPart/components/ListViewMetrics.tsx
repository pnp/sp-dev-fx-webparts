/* eslint-disable @typescript-eslint/no-explicit-any */
// React
import { useState } from "react";

// 3rd-party libs
import { useCountUp } from "react-countup";
import * as _ from "lodash";

// SPFx
import { Guid } from "@microsoft/sp-core-library";

// Fluent UI & PnP controls
import {
  Icon,
  IconButton,
  MessageBar,
  MessageBarType,
  TeachingBubble,
} from "@fluentui/react";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";

// Types
import type { IListViewMetricsProps } from "./IListViewMetricsProps";

// Local components & styles
import { LoadingSpinner } from "./LoadingSpinner";
import styles from "./ListViewMetricsWebPart.module.scss";

// Localization (replace all hard-coded UI text)
import * as strings from "ListViewMetricsWebPartStrings";

export default function ListViewMetrics(
  props: IListViewMetricsProps
): JSX.Element {
  // Props
  const {
    metricsCollection,
    viewItems,
    title,
    designConfigurations,
    displayMode,
    isLoading,
    loadingMessage,
    error,
    updateProperty,
  } = props;

  // Local UI state (single tooltip at a time)
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [activeTooltip, setActiveTooltip] = useState<number>(0);

  // Format numbers with grouping and up to 1 decimal (locale-aware)
  const formatNumber = (value: unknown): string => {
    const n = Number(value);
    if (!isFinite(n)) return "0";
    return new Intl.NumberFormat(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }).format(n);
  };

  // Extract field value; supports lookups (expand), ISO dates, currency-like strings
  const getFieldValue = (
    item: any,
    fieldName: string,
    fieldExpand?: string
  ): any => {
    const value =
      fieldExpand && _.isObject(item[fieldName])
        ? item[fieldName][fieldExpand]
        : item[fieldName];

    // ISO date → localized date string
    if (
      _.isString(value) &&
      _.includes(value, "T") &&
      _.endsWith(value, "Z") &&
      !isNaN(Date.parse(value))
    ) {
      const date = new Date(value);
      return new Intl.DateTimeFormat(undefined, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date);
    }

    // Currency-like strings → numeric (strip all non-digits except '.' and '-')
    if (_.isString(value)) {
      if (/[^\d.-]/.test(value)) {
        const cleaned = _.replace(value, /[^\d.-]/g, "");
        const asNumber = _.toNumber(cleaned);
        return _.isNaN(asNumber) ? value : asNumber;
      }
      return value;
    }

    // Else try numeric conversion
    return _.isNumber(value) ? value : _.toNumber(value);
  };

  // Calculate metric value against items
  const calculateMetricValue = (
    metric: string,
    items: any[],
    fieldName: string,
    fieldExpand?: string
  ): any => {
    if (!items || items.length === 0) {
      return metric === "mostPopularValue" ? strings.NoPopularValue : "0";
    }

    const values = _.map(items, (it) => getFieldValue(it, fieldName, fieldExpand));

    switch (metric) {
      case "totalItemCount":
        return items.length;

      case "totalUniqueCount":
        return _.uniq(values).length;

      case "sumValues":
        return _.sumBy(values, _.toNumber);

      case "average": {
        const sum = _.sumBy(values, _.toNumber);
        return items.length > 0 ? sum / items.length : 0;
      }

      case "maxValue":
        return _.maxBy(values, _.toNumber);

      case "minValue":
        return _.minBy(values, _.toNumber);

      case "mostPopularValue": {
        const freq = _.countBy(values);
        const most = _.maxBy(Object.keys(freq), (k) => freq[k]);
        return most ?? strings.NoPopularValue;
      }

      default:
        return strings.NoValue;
    }
  };

  // Show target area if at least one metric has a numeric target
  const showTargetArea =
    !!metricsCollection &&
    metricsCollection.filter(
      (m) => m.targetValue && !isNaN(Number(m.targetValue?.toString()))
    ).length > 0;

  const showHorizontalDesign =
    designConfigurations.viewDesign === "horizontalCard";

  return (
    <section
      className={styles.listViewMetricsWebPart}
      style={{
        marginTop: designConfigurations.cardMarginTop
          ? `${designConfigurations.cardMarginTop}px`
          : undefined,
        marginBottom: designConfigurations.cardMarginBottom
          ? `${designConfigurations.cardMarginBottom}px`
          : undefined,
      }}
      aria-label={strings.Aria_Section_Label}
    >
      {/* Editable title (in edit mode) */}
      <WebPartTitle
        displayMode={displayMode}
        title={title}
        updateProperty={updateProperty}
      />

      {/* Loading & error wrapper */}
      <LoadingSpinner
        isLoading={!!isLoading}
        message={loadingMessage}
        error={error}
      >
        {viewItems && metricsCollection && metricsCollection.length > 0 ? (
          <div
            className={styles.metricCardContainer}
            style={{ justifyContent: designConfigurations.cardFlexBoxValue }}
          >
            {metricsCollection.map((item, index) => {
              const metricValue = calculateMetricValue(
                item.metrics,
                viewItems,
                item.fieldName,
                item.fieldExpand
              );

              const targetValue =
                item.targetValue && !isNaN(Number(metricValue?.toString()))
                  ? item.targetValue
                  : undefined;

              const delta =
                targetValue !== undefined
                  ? Number(metricValue) - targetValue
                  : undefined;

              const pct =
                targetValue !== undefined && targetValue !== 0
                  ? ((Number(metricValue) - targetValue) / targetValue) * 100
                  : undefined;

              const isPositive = delta !== undefined && delta >= 0;

              const displayValue =
                typeof metricValue === "number"
                  ? formatNumber(metricValue)
                  : metricValue;

              // Unique id for the animated counter element
              const id = Guid.newGuid();
              const counterId = `counter_${id}_${index}`;

              // Inner component solely to host the CountUp hook
              const SimpleCounterHook = (): JSX.Element => {
                useCountUp({
                  ref: counterId,
                  end: Number(metricValue) || 0,
                  duration:
                    designConfigurations.animationTimeLength ?? 2,
                  suffix: item.metricSuffix ? String(item.metricSuffix) : "",
                });
                return (
                  <span
                    id={counterId}
                    style={{
                      fontSize: designConfigurations.bodyFontSize
                        ? `${designConfigurations.bodyFontSize}px`
                        : undefined,
                      fontWeight: designConfigurations.bodyFontWeight,
                    }}
                    aria-label={strings.Aria_AnimatedValue}
                  />
                );
              };

              return (
                <div
                  key={index}
                  className={
                    showHorizontalDesign
                      ? styles.metricCardWrapperHorizontal
                      : styles.metricCardWrapperVertical
                  }
                  style={{
                    backgroundColor:
                      item.metricCardBackgroundColor ??
                      designConfigurations.cardDefaultBackgroundColor,
                    color: item.metricCardFontColor ?? undefined,
                    maxWidth: designConfigurations.containerWidth,
                    boxShadow:
                      designConfigurations.cardBoxShadow === false
                        ? "none"
                        : undefined,
                    borderRadius: designConfigurations.cardBoxRadius,
                  }}
                >
                  {/* Optional info tooltip */}
                  {item.metricTooltip && (
                    <>
                      <IconButton
                        onClick={() => {
                          setShowTooltip(!showTooltip);
                          setActiveTooltip(index);
                        }}
                        iconProps={{ iconName: "Info" }}
                        title={strings.Tooltip_Title}
                        ariaLabel={strings.Tooltip_AriaLabel}
                        id={`metricsTooltip${index}`}
                        styles={{
                          rootHovered: {
                            backgroundColor: "transparent",
                            color: "inherit",
                          },
                          rootPressed: {
                            backgroundColor: "transparent",
                            color: "inherit",
                          },
                          root: {
                            position: "absolute",
                            right: "-3px",
                            top: "-3px",
                            color: item.metricCardFontColor ?? "inherit",
                          },
                        }}
                      />
                      {showTooltip && activeTooltip === index && (
                        <TeachingBubble
                          target={`#metricsTooltip${index}`}
                          hasCondensedHeadline={false}
                          onDismiss={() => setShowTooltip(false)}
                          headline={strings.Tooltip_Headline}
                        >
                          {String(item.metricTooltip)}
                        </TeachingBubble>
                      )}
                    </>
                  )}

                  {/* Optional leading icon */}
                  {item.metricIcon && (
                    <div className={styles.metricIcon}>
                      <Icon
                        iconName={item.metricIcon}
                        style={{
                          fontSize: designConfigurations.iconFontSize,
                          color:
                            item.metricCardFontColor ??
                            designConfigurations.iconFontColor,
                        }}
                        aria-hidden
                      />
                    </div>
                  )}

                  {/* Card content */}
                  <div
                    className={
                      showHorizontalDesign
                        ? styles.metricCardWrapperHorizontalContent
                        : styles.metricCardWrapperVerticalContent
                    }
                  >
                    <div
                      className={styles.metricHeader}
                      style={{
                        paddingTop:
                          item.metricIcon || showHorizontalDesign ? "0px" : "5px",
                      }}
                    >
                      <h1
                        style={{
                          fontSize: designConfigurations.headerFontSize
                            ? `${designConfigurations.headerFontSize}px`
                            : undefined,
                          fontWeight: designConfigurations.headerFontWeight,
                          color:
                            item.metricCardFontColor ??
                            designConfigurations.headerFontColor,
                        }}
                      >
                        {String(item.metricsTitle ?? "")}
                      </h1>
                    </div>

                    <div className={styles.metricBody}>
                      <span
                        style={{
                          fontSize: designConfigurations.bodyFontSize
                            ? `${designConfigurations.bodyFontSize}px`
                            : undefined,
                          fontWeight: designConfigurations.bodyFontWeight,
                          color:
                            item.metricCardFontColor ??
                            designConfigurations.bodyFontColor,
                        }}
                      >
                        {typeof metricValue === "number" &&
                        designConfigurations.showNumberAnimation ? (
                          <SimpleCounterHook />
                        ) : (
                          String(displayValue) +
                          (item.metricSuffix ? String(item.metricSuffix) : "")
                        )}
                      </span>
                    </div>

                    {/* Target delta / percentage */}
                    {showTargetArea && (
                      <div
                        className={`${styles.metricGrowth} ${
                          isPositive ? styles.positive : styles.negative
                        }`}
                        style={{
                          color: isPositive
                            ? designConfigurations.targetEffectiveFontColor
                            : designConfigurations.targetInEffectiveFontColor,
                          fontSize: designConfigurations.targetFontSize
                            ? `${designConfigurations.targetFontSize}px`
                            : undefined,
                          fontWeight: designConfigurations.targetFontWeight,
                        }}
                        aria-live="polite"
                      >
                        {targetValue !== undefined && (
                          <Icon
                            iconName={isPositive ? "Market" : "MarketDown"}
                            styles={{ root: { marginRight: 5 } }}
                            aria-hidden
                          />
                        )}
                        {targetValue !== undefined &&
                          (item.targetShowValueAs === "targetValueAsPercentage"
                            ? `${formatNumber(pct)}%`
                            : formatNumber(delta))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <MessageBar
            messageBarType={!viewItems ? MessageBarType.blocked : MessageBarType.info}
            role="status"
          >
            {!viewItems
              ? strings.Msg_ViewQueryIssue
              : strings.Msg_NoMetricsDefined}
          </MessageBar>
        )}
      </LoadingSpinner>
    </section>
  );
}
