// React & libs (external)
import { MessageBarType } from "@fluentui/react/lib/components/MessageBar";

// SPFx (platform)
import type { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import {
  PropertyPaneButton,
  PropertyPaneChoiceGroup,
  PropertyPaneDropdown,
  PropertyPaneTextField,
  PropertyPaneToggle,
} from "@microsoft/sp-property-pane";
import type { BaseWebPartContext } from "@microsoft/sp-webpart-base";

// PnP SPFx Property Controls
import { PropertyFieldSitePicker } from "@pnp/spfx-property-controls/lib/PropertyFieldSitePicker";
import {
  PropertyFieldListPicker,
  PropertyFieldListPickerOrderBy,
} from "@pnp/spfx-property-controls/lib/PropertyFieldListPicker";
import {
  PropertyFieldViewPicker,
  PropertyFieldViewPickerOrderBy,
} from "@pnp/spfx-property-controls/lib/PropertyFieldViewPicker";
import {
  CustomCollectionFieldType,
  PropertyFieldCollectionData,
} from "@pnp/spfx-property-controls/lib/PropertyFieldCollectionData";
import { PropertyFieldMessage } from "@pnp/spfx-property-controls/lib/PropertyFieldMessage";
import { PropertyFieldNumber } from "@pnp/spfx-property-controls/lib/PropertyFieldNumber";
import {
  PropertyFieldColorPicker,
  PropertyFieldColorPickerStyle,
} from "@pnp/spfx-property-controls/lib/PropertyFieldColorPicker";

// Local (utils/types/strings)
import { MetricFieldValidator } from "../utils/MetricFieldValidator";
import type { IListViewMetricsWebPartProps } from "../IListViewMetricsWebPartProps";
import * as strings from "ListViewMetricsWebPartStrings";

// Internal shape used for list field dropdowns
type SPFieldInfo = {
  InternalName: string;
  Title: string;
  TypeAsString: string;
};

export class PropertyPaneConfigurationHelper {
  /**
   * Returns the full property pane configuration (all pages).
   */
  public static getConfiguration(
    properties: IListViewMetricsWebPartProps,
    spListViewFields: SPFieldInfo[] | undefined,
    onPropertyPaneFieldChanged: (
      propertyPath: string,
      oldValue: unknown,
      newValue: unknown
    ) => Promise<void>,
    context: BaseWebPartContext
  ): IPropertyPaneConfiguration {
    return {
      pages: [
        this.getSourcePage(properties, onPropertyPaneFieldChanged, context),
        this.getMetricsPage(properties, spListViewFields, onPropertyPaneFieldChanged),
        this.getDesignPage(properties, onPropertyPaneFieldChanged),
      ],
    };
  }

  /**
   * SOURCE page: site/list selection, plus view or custom filter controls.
   */
  private static getSourcePage(
    properties: IListViewMetricsWebPartProps,
    onPropertyPaneFieldChanged: (
      propertyPath: string,
      oldValue: unknown,
      newValue: unknown
    ) => Promise<void>,
    context: BaseWebPartContext
  ): IPropertyPaneConfiguration["pages"][number] {
    const selectViewControl = this.getViewControl(properties, onPropertyPaneFieldChanged, context);
    const customFilterControls = this.getCustomFilterControls(properties);

    return {
      groups: [
        {
          groupName: strings.PP_Source_GroupName,
          groupFields: [
            PropertyFieldSitePicker("spSites", {
              label: strings.PP_SelectSite_Label_Required,
              initialSites: properties.spSites ?? [],
              context: context as never,
              deferredValidationTime: 500,
              multiSelect: false,
              onPropertyChange: onPropertyPaneFieldChanged.bind(this),
              properties,
              key: "spSites",
            }),
            PropertyFieldListPicker("spListId", {
              label: strings.PP_SelectList_Label_Required,
              selectedList: properties.spListId,
              webAbsoluteUrl: properties.spSites?.[0]?.url ?? "",
              includeHidden: false,
              orderBy: PropertyFieldListPickerOrderBy.Title,
              disabled: !(properties?.spSites && properties.spSites[0]?.url),
              onPropertyChange: onPropertyPaneFieldChanged.bind(this),
              properties,
              context: context as never,
              deferredValidationTime: 0,
              key: "spListId",
            }),
            PropertyFieldMessage("", {
              key: "msgSelectViewOrQuery",
              text: strings.PP_SelectViewOrQuery_Message,
              messageType: MessageBarType.warning,
              isVisible: true,
            }),
            PropertyPaneChoiceGroup("spViewType", {
              label: strings.PP_ViewType_Label_Required,
              options: [
                {
                  key: "listView",
                  text: strings.PP_ViewType_ListView_Text,
                  iconProps: { officeFabricIconFontName: "EntryView" },
                },
                {
                  key: "customFilter",
                  text: strings.PP_ViewType_Custom_Text,
                  iconProps: { officeFabricIconFontName: "Settings" },
                },
              ],
            }),
            ...selectViewControl,
            ...customFilterControls,
          ],
        },
      ],
    };
  }

  /**
   * Returns the "pick a view" control when spViewType = listView; otherwise empty.
   */
  private static getViewControl(
    properties: IListViewMetricsWebPartProps,
    onPropertyPaneFieldChanged: (
      propertyPath: string,
      oldValue: unknown,
      newValue: unknown
    ) => Promise<void>,
    context: BaseWebPartContext
  ): any[] {
    if (properties.spViewType !== "listView") return [];
    return [
      PropertyFieldViewPicker("spViewId", {
        label: strings.PP_SelectViewLabel,
        webAbsoluteUrl: properties.spSites?.[0]?.url ?? "",
        listId: properties.spListId,
        selectedView: properties.spViewId,
        orderBy: PropertyFieldViewPickerOrderBy.Title,
        disabled: !(properties.spSites?.[0]?.url && properties.spListId),
        onPropertyChange: onPropertyPaneFieldChanged.bind(this),
        properties,
        context: context as never,
        deferredValidationTime: 0,
        key: "spViewId",
      }),
    ];
  }

  /**
   * Returns the custom filter controls when spViewType = customFilter; otherwise empty.
   */
  private static getCustomFilterControls(
    properties: IListViewMetricsWebPartProps
  ): any[] {
    if (properties.spViewType !== "customFilter") return [];
    return [
      PropertyPaneTextField("customFilterSelectParams", {
        label: strings.PP_Custom_SelectQuery_Label,
        description: strings.PP_CommaSeparated_Description,
      }),
      PropertyPaneTextField("customFilterExpandParams", {
        label: strings.PP_Custom_ExpandQuery_Label,
        description: strings.PP_CommaSeparated_Description,
      }),
      PropertyPaneTextField("customFilterQueryFilterParams", {
        label: strings.PP_Custom_FilterQuery_Label,
        description: strings.PP_Custom_FilterQuery_Description,
      }),
    ];
  }

  /**
   * METRICS page: configure the metric cards (field, calc, styling).
   */
  private static getMetricsPage(
    properties: IListViewMetricsWebPartProps,
    spListViewFields: SPFieldInfo[] | undefined,
    onPropertyPaneFieldChanged: (
      propertyPath: string,
      oldValue: unknown,
      newValue: unknown
    ) => Promise<void>
  ): IPropertyPaneConfiguration["pages"][number] {
    return {
      groups: [
        {
          groupName: strings.PP_Metrics_GroupName,
          groupFields: [
            PropertyFieldCollectionData("metricsCollection", {
              key: "metricsCollection",
              label: strings.PP_Metrics_Label,
              panelHeader: strings.PP_Metrics_PanelHeader,
              manageBtnLabel: strings.PP_Metrics_ManageBtnLabel,
              value: properties.metricsCollection,
              enableSorting: true,
              disabled: !(
                properties.spSites?.[0]?.url &&
                properties.spListId &&
                (properties.spViewId || properties.customFilterSelectParams)
              ),
              fields: [
                {
                  id: "metricsTitle",
                  title: strings.PP_Metrics_Field_Title,
                  type: CustomCollectionFieldType.string,
                  required: true,
                },
                {
                  id: "fieldName",
                  title: strings.PP_Metrics_Field_FieldName,
                  type: CustomCollectionFieldType.dropdown,
                  options:
                    spListViewFields?.map((f) => ({
                      key: f.InternalName,
                      text: f.Title,
                      type: f.TypeAsString,
                    })) ?? [],
                  required: true,
                },
                {
                  id: "fieldExpand",
                  title: strings.PP_Metrics_Field_FieldExpand,
                  type: CustomCollectionFieldType.string,
                  required: false,
                },
                {
                  id: "metricIcon",
                  title: strings.PP_Metrics_Field_Icon,
                  type: CustomCollectionFieldType.fabricIcon,
                  required: false,
                  iconFieldRenderMode: "picker",
                },
                {
                  id: "metrics",
                  title: strings.PP_Metrics_Field_MetricKind,
                  type: CustomCollectionFieldType.dropdown,
                  options: [
                    { key: "totalItemCount", text: strings.PP_Metric_TotalCount },
                    { key: "totalUniqueCount", text: strings.PP_Metric_TotalUniqueCount },
                    { key: "average", text: strings.PP_Metric_Average },
                    { key: "maxValue", text: strings.PP_Metric_MaxValue },
                    { key: "minValue", text: strings.PP_Metric_MinValue },
                    { key: "mostPopularValue", text: strings.PP_Metric_MostPopularValue },
                    { key: "sumValues", text: strings.PP_Metric_Sum },
                  ],
                  onGetErrorMessage: (value: string, _index: number, crntItem: any) => {
                    if (!value || !crntItem.fieldName) return "";
                    const selectedField = spListViewFields?.find(
                      f => f.InternalName === crntItem.fieldName
                    );
                    if (!selectedField) return "";
                    const validation = MetricFieldValidator.validateMetricFieldCompatibility(
                      value,
                      selectedField.TypeAsString
                    );
                    return validation.isValid ? "" : validation.errorMessage;
                  },
                  required: true,
                },
                {
                  id: "metricSuffix",
                  title: strings.PP_Metrics_Field_Suffix,
                  type: CustomCollectionFieldType.string,
                  required: false,
                },
                {
                  id: "metricTooltip",
                  title: strings.PP_Metrics_Field_Tooltip,
                  type: CustomCollectionFieldType.string,
                  required: false,
                },
                {
                  id: "metricCardBackgroundColor",
                  title: strings.PP_Metrics_Field_CardBackgroundColor,
                  type: CustomCollectionFieldType.color,
                  required: false,
                },
                {
                  id: "metricCardFontColor",
                  title: strings.PP_Metrics_Field_CardFontColor,
                  type: CustomCollectionFieldType.color,
                  required: false,
                },
                {
                  id: "targetValue",
                  title: strings.PP_Metrics_Field_TargetValue,
                  type: CustomCollectionFieldType.number,
                  required: false,
                },
                {
                  id: "targetShowValueAs",
                  title: strings.PP_Metrics_Field_TargetShowAs,
                  type: CustomCollectionFieldType.dropdown,
                  options: [
                    { key: "targetValueAsValue", text: strings.PP_TargetShowAs_Value },
                    { key: "targetValueAsPercentage", text: strings.PP_TargetShowAs_Percentage },
                  ],
                  required: false,
                },
              ],
            }),
          ],
        },
      ],
    };
  }

  /**
   * DESIGN page: layout and typography controls.
   */
  private static getDesignPage(
    properties: IListViewMetricsWebPartProps,
    onPropertyPaneFieldChanged: (
      propertyPath: string,
      oldValue: unknown,
      newValue: unknown
    ) => Promise<void>
  ): IPropertyPaneConfiguration["pages"][number] {
    return {
      groups: [
        {
          groupName: strings.PP_Design_GroupName,
          groupFields: [
            PropertyPaneChoiceGroup("viewDesign", {
              label: strings.PP_Design_ViewDesign_Label,
              options: [
                {
                  key: "verticalCard",
                  text: strings.PP_Design_ViewDesign_Vertical,
                  iconProps: { officeFabricIconFontName: "AnalyticsReport" },
                },
                {
                  key: "horizontalCard",
                  text: strings.PP_Design_ViewDesign_Horizontal,
                  iconProps: { officeFabricIconFontName: "AnalyticsReport" },
                },
              ],
            }),

            // Container
            PropertyFieldNumber("containerWidth", {
              key: "containerWidth",
              label: strings.PP_Design_ContainerWidth_Label,
              value:
                properties.containerWidth ??
                (properties.viewDesign === "horizontalCard" ? 250 : 150),
              maxValue: 500,
              minValue: 100,
              disabled: false,
            }),
            PropertyPaneToggle("cardBoxShadow", {
              label: strings.PP_Design_ShowCardShadow_Label,
              onText: strings.PP_Toggle_Yes,
              offText: strings.PP_Toggle_No,
            }),
            PropertyPaneDropdown("cardFlexBoxValue", {
              label: strings.PP_Design_CardFlexValue_Label,
              options: [
                { key: "start", text: strings.PP_Flex_Start },
                { key: "center", text: strings.PP_Flex_Center },
                { key: "end", text: strings.PP_Flex_End },
                { key: "space-around", text: strings.PP_Flex_SpaceAround },
                { key: "space-between", text: strings.PP_Flex_SpaceBetween },
                { key: "space-evenly", text: strings.PP_Flex_SpaceEvenly },
              ],
            }),
            PropertyFieldNumber("cardBoxRadius", {
              key: "cardBoxRadius",
              label: strings.PP_Design_CardRadius_Label,
              value: properties.cardBoxRadius ?? 8,
              maxValue: 100,
              minValue: 0,
              disabled: false,
            }),
            PropertyFieldColorPicker("cardDefaultBackgroundColor", {
              label: strings.PP_Design_CardDefaultBg_Label,
              selectedColor: properties.cardDefaultBackgroundColor,
              onPropertyChange: onPropertyPaneFieldChanged,
              properties,
              disabled: false,
              debounce: 1000,
              isHidden: false,
              alphaSliderHidden: false,
              style: PropertyFieldColorPickerStyle.Inline,
              iconName: "Precipitation",
              key: "cardDefaultBackgroundColor",
            }),
            PropertyPaneButton("resetCardDefaultBackgroundColor", {
              text: strings.PP_Button_Reset,
              onClick: () => {
                properties.cardDefaultBackgroundColor = undefined;
              },
            }),

            // Icon
            PropertyFieldNumber("iconFontSize", {
              key: "iconFontSize",
              label: strings.PP_Design_IconFontSize_Label,
              value: properties.iconFontSize ?? 28,
              maxValue: 50,
              minValue: 10,
              disabled: false,
            }),
            PropertyFieldColorPicker("iconFontColor", {
              label: strings.PP_Design_IconFontColor_Label,
              selectedColor: properties.iconFontColor,
              onPropertyChange: onPropertyPaneFieldChanged,
              properties,
              disabled: false,
              debounce: 1000,
              isHidden: false,
              alphaSliderHidden: false,
              style: PropertyFieldColorPickerStyle.Inline,
              iconName: "Precipitation",
              key: "iconFontColor",
            }),
            PropertyPaneButton("resetIconFontColor", {
              text: strings.PP_Button_Reset,
              onClick: () => {
                properties.iconFontColor = undefined;
              },
            }),

            // Header font
            PropertyFieldNumber("headerFontSize", {
              key: "headerFontSize",
              label: strings.PP_Design_HeaderFontSize_Label,
              value: properties.headerFontSize ?? 14,
              maxValue: 50,
              minValue: 5,
              disabled: false,
            }),
            PropertyFieldNumber("headerFontWeight", {
              key: "headerFontWeight",
              label: strings.PP_Design_HeaderFontWeight_Label,
              value: properties.headerFontWeight ?? 500,
              maxValue: 900,
              minValue: 100,
              disabled: false,
            }),
            PropertyFieldColorPicker("headerFontColor", {
              label: strings.PP_Design_HeaderFontColor_Label,
              selectedColor: properties.headerFontColor,
              onPropertyChange: onPropertyPaneFieldChanged,
              properties,
              disabled: false,
              debounce: 1000,
              isHidden: false,
              alphaSliderHidden: false,
              style: PropertyFieldColorPickerStyle.Inline,
              iconName: "Precipitation",
              key: "headerFontColor",
            }),
            PropertyPaneButton("resetHeaderFontColor", {
              text: strings.PP_Button_Reset,
              onClick: () => {
                properties.headerFontColor = undefined;
              },
            }),

            // Body font
            PropertyFieldNumber("bodyFontSize", {
              key: "bodyFontSize",
              label: strings.PP_Design_BodyFontSize_Label,
              value: properties.bodyFontSize ?? 21,
              maxValue: 50,
              minValue: 5,
              disabled: false,
            }),
            PropertyFieldNumber("bodyFontWeight", {
              key: "bodyFontWeight",
              label: strings.PP_Design_BodyFontWeight_Label,
              value: properties.bodyFontWeight ?? 700,
              maxValue: 900,
              minValue: 100,
              disabled: false,
            }),
            PropertyFieldColorPicker("bodyFontColor", {
              label: strings.PP_Design_BodyFontColor_Label,
              selectedColor: properties.bodyFontColor,
              onPropertyChange: onPropertyPaneFieldChanged,
              properties,
              disabled: false,
              debounce: 1000,
              isHidden: false,
              alphaSliderHidden: false,
              style: PropertyFieldColorPickerStyle.Inline,
              iconName: "Precipitation",
              key: "bodyFontColor",
            }),
            PropertyPaneButton("resetBodyFontColor", {
              text: strings.PP_Button_Reset,
              onClick: () => {
                properties.bodyFontColor = undefined;
              },
            }),

            // Target font
            PropertyFieldNumber("targetFontSize", {
              key: "targetFontSize",
              label: strings.PP_Design_TargetFontSize_Label,
              value: properties.targetFontSize ?? 12,
              maxValue: 20,
              minValue: 5,
              disabled: false,
            }),
            PropertyFieldNumber("targetFontWeight", {
              key: "targetFontWeight",
              label: strings.PP_Design_TargetFontWeight_Label,
              value: properties.targetFontWeight ?? 400,
              maxValue: 900,
              minValue: 100,
              disabled: false,
            }),
            PropertyFieldColorPicker("targetEffectiveFontColor", {
              label: strings.PP_Design_TargetEffectiveFontColor_Label,
              selectedColor: properties.targetEffectiveFontColor,
              onPropertyChange: onPropertyPaneFieldChanged,
              properties,
              disabled: false,
              debounce: 1000,
              isHidden: false,
              alphaSliderHidden: false,
              style: PropertyFieldColorPickerStyle.Inline,
              iconName: "Precipitation",
              key: "targetEffectiveFontColor",
            }),
            PropertyPaneButton("resetTargetEffectiveFontColor", {
              text: strings.PP_Button_Reset,
              onClick: () => {
                properties.targetEffectiveFontColor = undefined;
              },
            }),
            PropertyFieldColorPicker("targetInEffectiveFontColor", {
              label: strings.PP_Design_TargetIneffectiveFontColor_Label,
              selectedColor: properties.targetInEffectiveFontColor,
              onPropertyChange: onPropertyPaneFieldChanged,
              properties,
              disabled: false,
              debounce: 1000,
              isHidden: false,
              alphaSliderHidden: false,
              style: PropertyFieldColorPickerStyle.Inline,
              iconName: "Precipitation",
              key: "targetInEffectiveFontColor",
            }),
            PropertyPaneButton("resetTargetInEffectiveFontColor", {
              text: strings.PP_Button_Reset,
              onClick: () => {
                properties.targetInEffectiveFontColor = undefined;
              },
            }),

            // Animation & margins
            PropertyPaneToggle("showNumberAnimation", {
              label: strings.PP_Design_ShowNumberAnimation_Label,
              onText: strings.PP_Toggle_Yes,
              offText: strings.PP_Toggle_No,
            }),
            PropertyFieldNumber("animationTimeLength", {
              key: "animationTimeLength",
              label: strings.PP_Design_AnimationTime_Label,
              value: properties.animationTimeLength ?? 3,
              maxValue: 10,
              minValue: 0,
              disabled: false,
            }),
            PropertyFieldNumber("cardMarginTop", {
              key: "cardMarginTop",
              label: strings.PP_Design_CardMarginTop_Label,
              value: properties.cardMarginTop ?? 0,
              maxValue: 500,
              minValue: -500,
              disabled: false,
            }),
            PropertyFieldNumber("cardMarginBottom", {
              key: "cardMarginBottom",
              label: strings.PP_Design_CardMarginBottom_Label,
              value: properties.cardMarginBottom ?? 0,
              maxValue: 500,
              minValue: -500,
              disabled: false,
            }),
          ],
        },
      ],
    };
  }
}
