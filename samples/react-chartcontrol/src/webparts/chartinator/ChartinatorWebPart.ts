import * as React from 'react';
import * as ReactDom from 'react-dom';

// Needed for data versions
import { Version } from '@microsoft/sp-core-library';

// Stuff for out-of-the-box property panes
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneChoiceGroup, PropertyPaneLabel, PropertyPaneDropdown, PropertyPaneToggle, PropertyPaneTextField, IPropertyPaneChoiceGroupOption, PropertyPaneSlider, IPropertyPaneGroup, PropertyPaneButton, IPropertyPaneDropdownOption, PropertyPaneHorizontalRule } from "@microsoft/sp-property-pane";

// Needed to create drop down choices
import {
  IDropdownOption
} from '@fluentui/react/lib/Dropdown';

// Needed for charts
import { ChartPalette, PaletteGenerator, ChartType } from '@pnp/spfx-controls-react/lib/ChartControl';

// PnP property fields
import { PropertyFieldNumber } from '@pnp/spfx-property-controls/lib/PropertyFieldNumber';
import { PropertyFieldSpinButton } from '@pnp/spfx-property-controls/lib/PropertyFieldSpinButton';
import { PropertyFieldToggleWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldToggleWithCallout';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import { CalloutTriggers } from '@pnp/spfx-property-controls/lib/PropertyFieldHeader';
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';

// Component that actually renders the web part content
import { Chartinator } from './components/Chartinator';
import { IChartinatorProps, DataSourceType } from './components/Chartinator.types';

// Needed to generate unique data row ids
import { Guid } from '@microsoft/sp-core-library';

// Custom property field
import { PropertyFieldRepeatingData } from './controls/PropertyFieldRepeatingData';
import { PropertyPaneChartPaletteSelector } from './controls/PropertyPaneChartPaletteSelector';
import { PropertyPaneDashSelector } from './controls/PropertyPaneDashSelector';

// Properties for this web part
// I prefer to keep the web part props as a
// separate file -- keeps things cleaner
// (in my mind, at least)
import {
  IChartinatorWebPartProps,
} from './ChartinatorWebPart.types';

// Needed for localization and other resource-types
import * as Assets from './LocalizedResources';
import * as strings from 'ChartinatorWebPartStrings';
import { ListService } from '../../services/ListService/ListService';
import { IListService } from '../../services/ListService/IListService';
import { IListField } from '../../services/ListService/IListField';
import { DashType, DashStrokes } from './controls/PropertyPaneDashSelector/components/DashSelector.types';

/**
 * Constant for the number of colors to show in the
 * palette previews.
 * Chart palettes in Office show 6 colours, so who
 * am I to argue with them?
 */
const NUMCOLORS: number = 6;

/**Default values -- store them as constants because
 * we refer to them in a few places
 */
const DEFAULT_CUTOUTPERCENTAGE: number = 50;
const DEFAULT_CIRCUMFERENCE: number = 100;
const DEFAULT_CHARTROTATION: number = -180;
const DEFAULT_POINTRADIUS = 3;

export default class ChartinatorWebPart extends BaseClientSideWebPart<IChartinatorWebPartProps> {
  private _fields: IListField[];

  /**
   * Draws the chartinator
   */
  public render(): void {
    const element: React.ReactElement<IChartinatorProps> = React.createElement(
      Chartinator,
      {
        ...this.properties, // passes all properties without having to list every single one
        context: this.context,
        displayMode: this.displayMode,
        radialChart: this._isRadialChart(),
        updateTitle: (value: string) => {
          // when title is changed, store the new title
          this.properties.title = value;
        }
      }
    );

    ReactDom.render(element, this.domElement);
  }

  /**
   * Resets data when the chart type changes
   */
  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    // If the chart type is changed, always reset the data to prevent
    // nasty errors from ChartJs.
    if (propertyPath === 'chartType') {
      // Bubble charts datasets are incompatible with other chart types
      if (oldValue === ChartType.Bubble || newValue === ChartType.Bubble) {
        this._initalizeData();

      }
      // so are scatter charts
      else if (oldValue === ChartType.Scatter || newValue === ChartType.Scatter) {
        this._initalizeData();
      }

      // every other chart type is compatible with other charts
    }

    if (propertyPath === 'dataSourceListId' && newValue) {
      this._getFields().then(fields => {
        this.properties.dataLabelField = undefined;
        this.properties.dataValueField = undefined;
        this.properties.dataYValueField = undefined;
        this.properties.dataRValueField = undefined;
        this._fields = fields;
        this.context.propertyPane.refresh();
      });
    }
  }

  protected onPropertyPaneConfigurationStart(): void {
    this._getFields().then(fields => {
      this._fields = fields;
      this.context.propertyPane.refresh();
    });
  }

  /***
   * called when web part is disposed
   */
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  /**
   * Initializes properties for the web part.
   * You could absolutely replace this function with
   * pre-setting the properties in the manifest file,
   * but I wanted to make it easy to test all the settings
   * without having to remove and re-add the web part.
   */
  protected onInit(): Promise<void> {
    return new Promise<void>((resolve, _reject) => {

      // Initialize data if no data yet
      if (this.properties.data === undefined) {
        this._initalizeData();
      }

      // Default chart type is bar
      if (this.properties.chartType === undefined) {
        this.properties.chartType = ChartType.Bar;
      }

      // Default data type is manual
      if (this.properties.dataSourceType === undefined) {
        this.properties.dataSourceType = DataSourceType.Static;
      }

      // Default ChartJs animation duration is 1000 milliseconds
      if (this.properties.animationDuration === undefined) {
        this.properties.animationDuration = 1000;
      }

      // Default ChartJs animation is easOutQuart
      if (this.properties.animationEasing === undefined) {
        this.properties.animationEasing = 'easeOutQuart';
      }

      // Layout: default is no padding.
      if (this.properties.leftPadding === undefined) {
        this.properties.leftPadding = 0;
      }

      if (this.properties.rightPadding === undefined) {
        this.properties.rightPadding = 0;
      }

      if (this.properties.topPadding === undefined) {
        this.properties.topPadding = 0;
      }

      if (this.properties.bottomPadding === undefined) {
        this.properties.bottomPadding = 0;
      }

      // legend: ChartJs's default is to show it, but
      // we hide it to appear consistent with the
      // out-of-the-box Quick Chart web part.
      if (this.properties.legendPosition === undefined) {
        this.properties.legendPosition = 'none';
      }

      // legends are not reversed by default
      if (this.properties.legendReversed === undefined) {
        this.properties.legendReversed = false;
      }

      // ChartJs will render 'undefined' in the tooltips
      // and legends if you don't provide a dataset name.
      // Use the standard 'My Dataset' as the default value.
      if (this.properties.dataSetName === undefined) {
        this.properties.dataSetName = strings.DataSetDefault;
      }

      // tooltip are enabled by default in ChartJs, but
      // we want this to behave more like the
      // out-of-the-box Quick Charts web part, so we
      // disable them.
      if (this.properties.tooltipEnabled === undefined) {
        this.properties.tooltipEnabled = false;
      }

      // Default ChartJs tooltip mode is 'nearest'
      if (this.properties.tooltipMode === undefined) {
        this.properties.tooltipMode = 'nearest';
      }

      // Default ChartJs interset is enabled.
      if (this.properties.tooltipIntersect === undefined) {
        this.properties.tooltipIntersect = true;
      }

      // Default tooltip position in ChartJs is average
      if (this.properties.tooltipPosition === undefined) {
        this.properties.tooltipPosition = 'average';
      }

      // ChartControl uses Colorful1 as the default option
      // -- just like Office charts do.
      if (this.properties.chartPalette === undefined) {
        this.properties.chartPalette = ChartPalette.OfficeColorful1;
      }

      // Lines are usually on for line charts... otherwise, they'd
      // just be charts :-)
      if (this.properties.lineShowLine === undefined) {
        this.properties.lineShowLine = true;
      }

      // Stepped lines are off by default
      if (this.properties.lineStepped === undefined) {
        this.properties.lineStepped = false;
      }

      if (this.properties.lineFill === undefined) {
        this.properties.lineFill = 'none';
      }

      // Point style default in ChartJs is circle
      if (this.properties.pointStyle === undefined) {
        this.properties.pointStyle = 'circle';
      }

      // Point radius default in ChartJs is 3
      if (this.properties.pointRadius === undefined) {
        this.properties.pointRadius = DEFAULT_POINTRADIUS;
      }

      // Point rotation default in ChartJs is 0
      if (this.properties.pointRotation === undefined) {
        this.properties.pointRotation = 0; // don't rotate
      }

      // Default cutout percentage for donut charts is 50
      if (this.properties.cutoutPercentage === undefined) {
        this.properties.cutoutPercentage = DEFAULT_CUTOUTPERCENTAGE;
      }

      if (this.properties.chartRotation === undefined) {
        this.properties.chartRotation = DEFAULT_CHARTROTATION;
      }

      if (this.properties.circumference === undefined) {
        this.properties.circumference = DEFAULT_CIRCUMFERENCE;
      }

      if (this.properties.offsetGridLines === undefined) {
        this.properties.offsetGridLines = true;
      }

      if (this.properties.borderWidth === undefined) {
        this.properties.borderWidth = 1;
      }

      if (this.properties.borderDash === undefined) {
        this.properties.borderDash = DashType.Solid;
      }

      if (this.properties.borderJoinStyle === undefined) {
        this.properties.borderJoinStyle = 'miter';
      }

      if (this.properties.borderCapStyle === undefined) {
        this.properties.borderCapStyle = 'butt';
      }

      // We like to show gridlines by default
      if (this.properties.xAxisShowGridlines === undefined) {
        this.properties.xAxisShowGridlines = true;
      }

      if (this.properties.yAxisShowGridlines === undefined) {
        this.properties.yAxisShowGridlines = true;
      }

      if (this.properties.yAxisBeginAtZero === undefined) {
        this.properties.yAxisBeginAtZero = true;
      }

      resolve(undefined);
    });
  }

  /**
   * Renders the property pane.
   *
   * Note that normally the property groups are rendered directly within
   * this function, but we have so many settings (and we wanted some
   * conditional settings) that we split each setting group into their
   * respective function.
   *
   * Here, we just call each _render____PropertyGroup function in the order
   * we want them to appear.
   */
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const { chartType } = this.properties;
    // create a configuration variable so that we can change its content
    // before returning it
    const configuration: IPropertyPaneConfiguration = {
      pages: [
        {
          displayGroupsAsAccordion: true,
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            // chart type
            this._renderChartTypePropertyGroup(),

            // Data Source
            this._renderDataSourcePropertyGroup(),

            // Chart Palette
            this._renderPalettePropertyGroup(),

            // Layout
            this._renderLayoutPropertyGroup(),

            // Legend
            this._renderLegendPropertyGroup(),

            // Tooltips
            this._renderTooltipPropertyGroup(),

            // Animation
            this._renderAnimationGroup(),
          ]
        },
      ]
    };

    // Insert options in reverse order so that we don't have to worry about
    // whether something else was inserted before it
    const { groups } = configuration.pages[0];

    // These two options shouldn't appear if the charts are radial
    // e.g.: pie, donut, etc.
    if (!this._isRadialChart()) {
      // X Axis -- insert as the 4th item
      groups.splice(3, 0, this._renderXAxisPropertyGroup());

      // Y Axis -- insert as the 5th item
      groups.splice(4, 0, this._renderYAxisPropertyGroup());
    }

    // Chart settings -- changes based on what chart type you select

    // Scatter, radar and line charts can configure points
    if (chartType === ChartType.Line || chartType === ChartType.Scatter || chartType === ChartType.Radar || chartType === ChartType.Bubble) {
      groups.splice(3, 0, this._renderPointSettingsPropertyGroup());
    }

    // Line charts can configure line and area settings
    if (chartType === ChartType.Line) {
      groups.splice(3, 0, this._renderLineSettingsPropertyGroup());
    }

    // Donut charts, pie charts, polar charts
    if (chartType === ChartType.Doughnut || chartType == ChartType.Pie || chartType == ChartType.PolarArea) {
      groups.splice(3, 0, this._renderDonutPiePolarSettingsPropertyGroup());
    }

    if (chartType === ChartType.Bar || chartType === ChartType.HorizontalBar) {
      groups.splice(3, 0, this._renderBarSettingsPropertyGroup());
    }

    return configuration;
  }

  /**
   * Shows legend settings
   */
  private _renderLegendPropertyGroup = (): IPropertyPaneGroup => {
    return {
      groupName: strings.LegendGroupName,
      isCollapsed: true,
      groupFields: [
        PropertyPaneLabel('legendPosition', {
          text: strings.LegendGroupDescription
        }),
        PropertyPaneChoiceGroup('legendPosition', {
          label: strings.LegendPositionFieldLabel,
          options: [
            {
              key: 'none',
              text: strings.None,
              selectedImageSrc: Assets.LegendNone,
              imageSrc: Assets.LegendNone,
            },
            {
              key: 'top',
              text: strings.Top,
              selectedImageSrc: Assets.LegendTop,
              imageSrc: Assets.LegendTop,
            },
            {
              key: 'bottom',
              text: strings.Bottom,
              selectedImageSrc: Assets.LegendBottom,
              imageSrc: Assets.LegendBottom,
            },
            {
              key: 'left',
              text: strings.Left,
              selectedImageSrc: Assets.LegendLeft,
              imageSrc: Assets.LegendLeft,
            },
            {
              key: 'right',
              text: strings.Right,
              selectedImageSrc: Assets.LegendRight,
              imageSrc: Assets.LegendRight,
            },
          ]
        }),
        this.properties.legendPosition !== 'none' && PropertyPaneToggle('legendReversed', {
          label: strings.LegendReversedFieldLabel,
          onText: strings.On,
          offText: strings.Off
        })
      ]
    };
  }

  /**
   * Shows layout settings
   */
  private _renderLayoutPropertyGroup = (): IPropertyPaneGroup => {
    const {
      leftPadding,
      topPadding,
      rightPadding,
      bottomPadding
    } = this.properties;
    return {
      groupName: strings.LayoutGroupName,
      isCollapsed: true,
      groupFields: [
        PropertyPaneLabel('topPadding', {
          text: strings.LayoutGroupDescription
        }),
        PropertyFieldNumber('topPadding', {
          key: 'topPadding',
          label: strings.TopPaddingFieldLabel,
          value: topPadding,
          minValue: 0
        }),
        PropertyFieldNumber('leftPadding', {
          key: 'leftPadding',
          label: strings.LeftPaddingFieldLabel,
          value: leftPadding,
          minValue: 0
        }),
        PropertyFieldNumber('bottomPadding', {
          key: 'bottomPadding',
          label: strings.BottomPaddingFieldLabel,
          value: bottomPadding,
          minValue: 0
        }),
        PropertyFieldNumber('rightPadding', {
          key: 'rightPadding',
          label: strings.RightPaddingFieldLabel,
          value: rightPadding,
          minValue: 0
        }),
      ]
    };
  }

  /**
   * Shows X axis settings
   */
  private _renderXAxisPropertyGroup = (): IPropertyPaneGroup => {
    const radialChart: boolean = this._isRadialChart();
    const {
      xAxisLabelEnabled
    } = this.properties;

    // Axis settings don't show up if the chart type is radial
    return {
      groupName: strings.XAxisGroupName,
      isCollapsed: true,
      groupFields: [
        PropertyPaneLabel('chartType', {
          text: radialChart ? strings.GroupNotAvailable : strings.XAxisGroupDescription
        }),
        PropertyPaneToggle('xAxisLabelEnabled', {
          disabled: radialChart,
          label: strings.AxisShowLabel,
          offText: strings.Hide,
          onText: strings.Show,
        }),
        PropertyPaneTextField('xAxisLabelText', {
          disabled: xAxisLabelEnabled !== true,
          label: strings.AxisLabelText,
        }),
        PropertyPaneHorizontalRule(),
        PropertyPaneToggle('xAxisShowGridlines', {
          label: strings.ShowGridlinesFieldLabel,
          offText: strings.Hide,
          onText: strings.Show
        }),
      ]
    };
  }

  /**
   * Shows Y axis settings
   */
  private _renderYAxisPropertyGroup = (): IPropertyPaneGroup => {
    const radialChart: boolean = this._isRadialChart();
    const {
      yAxisLabelEnabled,
      yAxisBeginAtZero,
      yAxisMax,
      yAxisMaxTicksLimit,
      yAxisMin,
      yAxisStepSize
    } = this.properties;

    return {
      groupName: strings.YAxisGroupName,
      isCollapsed: true,
      groupFields: [
        PropertyPaneLabel('chartType', {
          text: radialChart ? strings.GroupNotAvailable : strings.YAxisGroupDescription
        }),
        PropertyPaneToggle('yAxisLabelEnabled', {
          disabled: radialChart,
          label: strings.AxisShowLabel,
          offText: strings.Hide,
          onText: strings.Show
        }),
        PropertyPaneTextField('yAxisLabelText', {
          disabled: yAxisLabelEnabled !== true,
          label: strings.AxisLabelText,
        }),
        PropertyPaneHorizontalRule(),
        PropertyPaneToggle('yAxisShowGridlines', {
          label: strings.ShowGridlinesFieldLabel,
          offText: strings.Hide,
          onText: strings.Show
        }),
        PropertyPaneHorizontalRule(),
        PropertyPaneToggle('yAxisBeginAtZero', {
          disabled: radialChart,
          label: strings.YAxisBeginAtZero,
          offText: strings.Off,
          onText: strings.On
        }),
        PropertyFieldNumber('yAxisMin', {
          key: 'yAxisMin',
          label: strings.YAxisMinValueFieldLabel,
          value: yAxisMin,
          disabled: radialChart || yAxisBeginAtZero
        }),
        PropertyFieldNumber('yAxisMax', {
          key: 'yAxisMax',
          label: strings.YAxisMaxValueFieldLabel,
          value: yAxisMax,
          disabled: radialChart
        }),
        PropertyFieldNumber('yAxisMaxTicksLimit', {
          key: 'yAxisMaxTicksLimit',
          label: strings.YAxisMaxStepsFieldLabel,
          value: yAxisMaxTicksLimit,
          disabled: radialChart
        }),
        PropertyFieldNumber('yAxisStepSize', {
          key: 'yAxisStepSize',
          label: strings.YAxisStepSizeFieldLabel,
          value: yAxisStepSize,
          disabled: radialChart
        })
      ]
    };
  }

  /**
   * Shows palette settings
   */
  private _renderPalettePropertyGroup = (): IPropertyPaneGroup => {
    const {
      chartPalette
    } = this.properties;
    return {
      groupName: strings.PaletteGroupName,
      isCollapsed: true,
      groupFields: [
        PropertyPaneLabel('chartPalette', {
          text: strings.PaletteGroupDescription
        }),
        PropertyPaneChartPaletteSelector('chartPalette', {
          label: strings.ColorPaletteFieldLabel,
          disabled: false,
          selectedKey: chartPalette,
          options: this._getPaletteOptions(),
          onPropertyChange: (propertyPath: string, newValue: any) => this._handlePropertyChange(propertyPath, newValue),
        }),
      ]
    };
  }

  /**
   * Shows chart type settings
   */
  private _renderChartTypePropertyGroup = (): IPropertyPaneGroup => {
    const {
      chartType
    } = this.properties;

    return {
      groupName: strings.ChartTypeGroupName,
      groupFields: [
        PropertyPaneChoiceGroup('chartType', {
          options: this._getChartChoices()
        }),
        PropertyPaneLabel('chartType', {
          text: strings.ChartDescription[chartType]
        })
      ]
    };
  }

  /**
   * Shows data source settings
   */
  private _renderDataSourcePropertyGroup = (): IPropertyPaneGroup => {
    const {
      chartType,
      dataSourceType
    } = this.properties;

    const hasX: boolean = chartType === ChartType.Bubble || chartType === ChartType.Scatter;
    const hasY: boolean = chartType === ChartType.Bubble || chartType === ChartType.Scatter;
    const hasR: boolean = chartType === ChartType.Bubble;

    return {
      groupName: strings.DataGroupName,
      groupFields: [
        PropertyPaneTextField('dataSetName', {
          label: strings.DataSetFieldName,
        }),
        PropertyPaneHorizontalRule(),
        PropertyPaneChoiceGroup('dataSourceType', {
          options: [
            {
              key: DataSourceType.Static,
              text: strings.StaticDataSource,
            },
            {
              key: DataSourceType.List,
              text: strings.ListDataSource,
            }
          ]
        }),
        dataSourceType === DataSourceType.Static && PropertyFieldRepeatingData({
          key: 'repeatingData',
          data: this.properties.data,
          chartType: chartType,
          onDataChanged: (data: any) => this._handleChangeData(data)
        }),
        dataSourceType === DataSourceType.List && PropertyFieldListPicker('dataSourceListId', {
          label: strings.DataSourcListIdFieldLabel,
          selectedList: this.properties.dataSourceListId,
          includeHidden: false,
          orderBy: PropertyFieldListPickerOrderBy.Title,
          disabled: false,
          onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
          properties: this.properties,
          context: this.context,
          onGetErrorMessage: null,
          deferredValidationTime: 0,
          key: 'dataSourceListId'
        }),
        dataSourceType === DataSourceType.List && PropertyPaneDropdown('dataValueField', {
          options: this._getDataFields(),
          label: hasX ? strings.DataSourceDataXValueFieldLabel : strings.DataSourceDataValueFieldLabel,
          selectedKey: this.properties.dataValueField
        }),
        dataSourceType === DataSourceType.List && hasY && PropertyPaneDropdown('dataYValueField', {
          options: this._getDataFields(),
          label: strings.DataSourceDataYValueFieldLabel,
          selectedKey: this.properties.dataYValueField
        }),
        dataSourceType === DataSourceType.List && hasR && PropertyPaneDropdown('dataRValueField', {
          options: this._getDataFields(),
          label: strings.DataSourceDataRValueFieldLabel,
          selectedKey: this.properties.dataRValueField
        }),
        dataSourceType === DataSourceType.List && PropertyPaneDropdown('dataLabelField', {
          options: this._getLabelFields(),
          label: strings.DataSourceDataLabelFieldLabel,
          selectedKey: this.properties.dataLabelField
        })
      ]
    };
  }

  /**
   * Shows line chart-specific settings
   */
  private _renderLineSettingsPropertyGroup = (): IPropertyPaneGroup => {
    return {
      groupName: strings.LineSettingsGroupName,
      isCollapsed: true,
      groupFields: [
        PropertyFieldToggleWithCallout('lineShowLine', {
          disabled: this.properties.lineStepped === true,
          key: 'lineShowLine',
          label: strings.LineShowLinesFieldLabel,
          onText: strings.LineShowLinesOn,
          offText: strings.LineShowLinesOff,
          checked: this.properties.lineShowLine !== false,
          calloutContent: React.createElement('div', {}, strings.LineShowLinesFieldTooltip),
          calloutTrigger: CalloutTriggers.Hover,
        }),
        PropertyFieldToggleWithCallout('lineStepped', {
          disabled: this.properties.lineShowLine === false,
          key: 'lineStepped',
          label: strings.LineSteppedFieldLabel,
          onText: strings.LineSteppedOn,
          offText: strings.LineSteppedOff,
          checked: this.properties.lineStepped !== false,
          calloutContent: React.createElement('div', {},
            // always tell people why you disable options
            this.properties.lineShowLine === false ?
              strings.LineSteppedFieldTooltipDisabled // disabled because show lines is off
              : strings.LineSteppedFieldTooltipEnabled // enabled tooltip
          ),
          calloutTrigger: CalloutTriggers.Hover,
        }),
        PropertyFieldToggleWithCallout('lineCurved', {
          disabled: this.properties.lineStepped === true || this.properties.lineShowLine === false,
          // I know, I know, I just like to explictly say true to make it more legible
          key: 'lineCurved',
          label: strings.LineCurvedFieldName,
          onText: strings.LineCurvedOn,
          offText: strings.LineCurvedOff,
          checked: this.properties.lineCurved !== false,
          calloutContent: React.createElement('div', {},
            // always tell people why you disable options
            this.properties.lineShowLine === false ?
              strings.LineCurvedFieldTooltipDisabled // disabled because show lines is off
              : this.properties.lineStepped === true ?
                strings.LineCurvedFieldTooltipDisabledCozStepped // disabled because stepped lines are on
                : strings.LineCurvedFieldTooltipEnabled // enabled tooltip
          ),
          calloutTrigger: CalloutTriggers.Hover,
        }),
        PropertyFieldSpinButton('borderWidth', {
          decimalPlaces: 0,
          min: 0,
          step: 1,
          suffix: strings.PixelUnitSuffix,
          label: strings.BorderWidthFieldLabel,
          key: 'borderWidthId',
          onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
          properties: this.properties,
          initialValue: this.properties.borderWidth
        }),
        PropertyFieldColorPicker('borderColor', {
          label: strings.BorderColorFieldLabel,
          selectedColor: this.properties.borderColor,
          onPropertyChange: this.onPropertyPaneFieldChanged,
          properties: this.properties,
          alphaSliderHidden: false,
          style: PropertyFieldColorPickerStyle.Inline,
          key: 'borderColorId'
        }),
        PropertyPaneDashSelector('borderDash', {
          label: "Dash type",
          disabled: false,
          selectedKey: this.properties.borderDash,
          options: this._getDashOptions(),
          onPropertyChange: (propertyPath: string, newValue: any) => this._handlePropertyChange(propertyPath, newValue)
        }),
        PropertyPaneDropdown('borderCapStyle', {
          label: strings.LineCapStyleFieldLabel,
          selectedKey: this.properties.borderCapStyle,
          options: [
            {
              key: 'butt',
              text: strings.CapStyleButt // tee hee
            },
            {
              key: 'round',
              text: strings.CapStyleRound
            },
            {
              key: 'square',
              text: strings.CapStyleSquare
            }
          ]
        }),
        PropertyPaneDropdown('borderJoinStyle', {
          label: strings.LineJoinStyleFieldLabel,
          selectedKey: this.properties.borderJoinStyle,
          options: [
            {
              key: 'bevel',
              text: strings.JoinTypeBevel
            },
            {
              key: 'round',
              text: strings.JoinTypeRound
            },
            {
              key: 'miter',
              text: strings.JoinTypeMiter
            }
          ]
        }),
        PropertyPaneHorizontalRule(),
        PropertyPaneChoiceGroup('lineFill', {
          label: strings.FillFieldLabel,
          options: [
            {
              key: 'none',
              text: strings.FillNone,
              selectedImageSrc: Assets.FillNone,
              imageSrc: Assets.FillNone,
            },
            {
              key: 'start',
              text: strings.FillStart,
              selectedImageSrc: Assets.FillStart,
              imageSrc: Assets.FillStart,
            },
            {
              key: 'end',
              text: strings.FillEnd,
              selectedImageSrc: Assets.FillEnd,
              imageSrc: Assets.FillEnd,
            },
            {
              key: 'origin',
              text: strings.FillOrigin,
              selectedImageSrc: Assets.FillOrigin,
              imageSrc: Assets.FillOrigin,
            },
          ]
        }),

      ]
    };
  }

  /**
   * Renders the point configuration propety group
   */
  private _renderPointSettingsPropertyGroup = (): IPropertyPaneGroup => {
    return {
      groupName: strings.PointSettingsGroup,
      isCollapsed: true,
      groupFields: [
        PropertyPaneChoiceGroup('pointStyle', {
          label: strings.PointStyleFieldLabel,
          options: [
            {
              key: 'circle',
              text: strings.PointStyleCircle,
              selectedImageSrc: Assets.PointStyleCircle,
              imageSrc: Assets.PointStyleCircle,
            },
            {
              key: 'cross',
              text: strings.PointStyleCross,
              selectedImageSrc: Assets.PointStyleCross,
              imageSrc: Assets.PointStyleCross,
            },
            {
              key: 'crossRot',
              text: strings.PointStyleRectRot,
              selectedImageSrc: Assets.PointStyleCrossRot,
              imageSrc: Assets.PointStyleCrossRot,
            },
            {
              key: 'dash',
              text: strings.PointStyleDash,
              selectedImageSrc: Assets.PointStyleDash,
              imageSrc: Assets.PointStyleDash,
            },
            {
              key: 'line',
              text: strings.PointStyleLine,
              selectedImageSrc: Assets.PointStyleLine,
              imageSrc: Assets.PointStyleLine,
            },
            {
              key: 'rect',
              text: strings.PointStyleRect,
              selectedImageSrc: Assets.PointStyleRect,
              imageSrc: Assets.PointStyleRect
            },
            {
              key: 'rectRounded',
              text: strings.PointStyleRectRounded,
              selectedImageSrc: Assets.PointStyleRectRounded,
              imageSrc: Assets.PointStyleRectRounded,
            },
            {
              key: 'rectRot',
              text: strings.PointStyleRectRot,
              selectedImageSrc: Assets.PointStyleRectRot,
              imageSrc: Assets.PointStyleRectRot,
            },
            {
              key: 'star',
              text: strings.PointStyleStar,
              selectedImageSrc: Assets.PointStyleStar,
              imageSrc: Assets.PointStyleStar,
            },
            {
              key: 'triangle',
              text: strings.PointStyleTriangle,
              selectedImageSrc: Assets.PointStyleTriangle,
              imageSrc: Assets.PointStyleTriangle,
            },
          ]
        }),
        PropertyFieldSpinButton('pointRadius', {
          properties: this.properties,
          key: 'pointRadiusId',
          label: strings.PointRadiusFieldLabel,
          initialValue: this.properties.pointRadius,
          min: 0,
          step: 1,
          decimalPlaces: 0,
          onPropertyChange: (propertyPath: string, newValue: any) => this._handlePropertyChange(propertyPath, newValue),
        }),
        PropertyPaneSlider('pointRotation', {
          label: strings.PointRotationFieldLabel,
          min: 0,
          max: 360,
          value: this.properties.pointRotation,
          showValue: true,
          step: 1
        })
      ]
    };
  }

  /**
   * Render property groups for donuts, pie, or polar charts.
   * You know... the round ones.
   */
  private _renderDonutPiePolarSettingsPropertyGroup = (): IPropertyPaneGroup => {

    const isDonut: boolean = this.properties.chartType === ChartType.Doughnut;
    const isPie: boolean = this.properties.chartType === ChartType.Pie;

    return {
      groupName: isDonut ?
        strings.DonutSettingsGroupName
        : isPie
          ? strings.PieSettingsGroupName
          : strings.PolarSettingsGroupName,
      isCollapsed: true,
      groupFields: [
        isDonut && PropertyPaneSlider('cutoutPercentage', {
          label: strings.DonutCutoutPercentageFieldLabel,
          min: 0,
          max: 100,
          step: 1,
          showValue: true
        }),
        PropertyPaneSlider('chartRotation', {
          label: strings.ChartRotationFieldLabel,
          min: -360,
          max: 360,
          step: 1,
          showValue: true,
          value: this.properties.chartRotation
        }),
        (isDonut || isPie) && PropertyPaneSlider('circumference', {
          label: strings.CircumferenceFieldLabel,
          min: 0,
          max: 100,
          step: 1,
          showValue: true,
          value: this.properties.circumference
        }),
        PropertyPaneToggle('animateRotate', {
          label: strings.AnimateRotateFieldLabel,
          onText: strings.On,
          offText: strings.Off,
          checked: this.properties.animateRotate !== false
        }),
        PropertyPaneToggle('animateScale', {
          label: strings.AnimateScaleFieldLabel,
          onText: strings.On,
          offText: strings.Off,
          checked: this.properties.animateScale !== false
        }),
        PropertyPaneButton('animateScale', {
          text: strings.ResetDonutPieSettingsButtonLabel,
          onClick: ((_value: any) => {
            // reset to the default values
            this.properties.animateRotate = true;
            this.properties.animateScale = true;
            this.properties.circumference = DEFAULT_CIRCUMFERENCE;
            this.properties.chartRotation = DEFAULT_CHARTROTATION;
            this.properties.cutoutPercentage = DEFAULT_CUTOUTPERCENTAGE;
          })
        })
      ]
    };
  }

  /**
   * Renders settings for bar charts (and vertical ones too)
   */
  private _renderBarSettingsPropertyGroup = (): IPropertyPaneGroup => {
    return {
      groupName: strings.BarSettingsGroupName,
      isCollapsed: true,
      groupFields: [
        PropertyPaneLabel('offsetGridLines', {
          text: strings.BarSettingsGroupDescription
        }),
        PropertyPaneToggle('offsetGridLines', {
          label: strings.OffsetGridLinesFieldName,
          onText: strings.On,
          offText: strings.Off,
          checked: this.properties.offsetGridLines !== false
        })
      ]
    };
  }

  /**
   * Shows Tooltip settings
   */
  private _renderTooltipPropertyGroup = (): IPropertyPaneGroup => {
    const {
      tooltipEnabled
    } = this.properties;
    return {
      groupName: strings.TooltipsGroupName,
      isCollapsed: true,
      groupFields: [
        PropertyPaneLabel('tooltipEnabled', {
          text: strings.TooltipGroupDescription
        }),
        PropertyPaneToggle('tooltipEnabled', {
          label: strings.TooltipsEnabledFieldLabel,
          offText: strings.Hide,
          onText: strings.Show
        }),
        PropertyPaneDropdown('tooltipMode', {
          disabled: tooltipEnabled === false,
          label: strings.TooltipModeFieldLabel,
          options: [
            {
              key: 'nearest',
              text: strings.TooltipModeNearest
            },
            {
              key: 'point',
              text: strings.TooltipModePoint
            },

            {
              key: 'index',
              text: strings.TooltipModeIndex
            },
            {
              key: 'dataset',
              text: strings.TooltipModeDataset
            },
            {
              key: 'x',
              text: strings.TooltipModeX
            },
            {
              key: 'y',
              text: strings.TooltipModeY
            },
          ]
        }),
        PropertyPaneToggle('tooltipIntersect', {
          disabled: tooltipEnabled === false,
          label: strings.TooltipsIntersectFieldLabel,
          offText: strings.Off,
          onText: strings.On
        }),
        PropertyPaneDropdown('tooltipPosition', {
          disabled: tooltipEnabled === false,
          label: strings.TooltipsPositionFieldLabel,
          options: [
            {
              key: 'average',
              text: strings.TooltipsPositionAverage
            },
            {
              key: 'nearest',
              text: strings.TooltipsPositionNearest
            },
          ]
        }),
      ]
    };
  }

  /**
   * Lists all animation types.
   * There are a lot.
   */
  private _renderAnimationGroup = (): IPropertyPaneGroup => {
    const {
      animationDuration
    } = this.properties;
    return {
      groupName: strings.AnimationGroupName,
      isCollapsed: true,
      groupFields: [
        PropertyPaneLabel('animationDuration', {
          text: strings.AnimationGroupDescription
        }),
        PropertyFieldNumber('animationDuration', {
          key: 'animationDurationId',
          label: strings.DurationFieldLabel,
          description: strings.DurationFieldDescription,
          value: animationDuration,
          minValue: 0
        }),
        PropertyPaneChoiceGroup('animationEasing', {
          label: strings.EasingFieldLabel,
          options: [
            {
              key: 'linear',
              text: strings.EasingLinear,
              selectedImageSrc: Assets.Linear,
              imageSrc: Assets.Linear
            },
            {
              key: 'easeInQuad',
              text: strings.EasingEaseInQuad,
              selectedImageSrc: Assets.EaseInQuad,
              imageSrc: Assets.EaseInQuad
            },
            {
              key: 'easeOutQuad',
              text: strings.EasingEaseOutQuad,
              selectedImageSrc: Assets.EaseOutQuad,
              imageSrc: Assets.EaseOutQuad
            },
            {
              key: 'easeInOutQuad',
              text: strings.EasingEaseInOutQuad,
              selectedImageSrc: Assets.EaseInOutQuad,
              imageSrc: Assets.EaseInOutQuad
            },
            {
              key: 'easeInCubic',
              text: strings.EasingEaseInCubic,
              selectedImageSrc: Assets.EaseInCubic,
              imageSrc: Assets.EaseInCubic
            },
            {
              key: 'easeOutCubic',
              text: strings.EasingEaseOutCubic,
              selectedImageSrc: Assets.EaseOutCubic,
              imageSrc: Assets.EaseOutCubic
            },
            {
              key: 'easeInOutCubic',
              text: strings.EasingEaseInOutCubic,
              selectedImageSrc: Assets.EaseInOutCubic,
              imageSrc: Assets.EaseInOutCubic
            },
            {
              key: 'easeInQuart',
              text: strings.EasingEaseInQuart,
              selectedImageSrc: Assets.EaseInQuart,
              imageSrc: Assets.EaseInQuart
            },
            {
              key: 'easeOutQuart',
              text: strings.EasingEaseOutQuart,
              selectedImageSrc: Assets.EaseOutQuart,
              imageSrc: Assets.EaseOutQuart
            },
            {
              key: 'easeInOutQuart',
              text: strings.EasingEaseInOutQuart,
              selectedImageSrc: Assets.EaseInOutQuart,
              imageSrc: Assets.EaseInOutQuart
            },
            {
              key: 'easeInQuint',
              text: strings.EasingEaseInQuint,
              selectedImageSrc: Assets.EaseInQuint,
              imageSrc: Assets.EaseInQuint
            },
            {
              key: 'easeOutQuint',
              text: strings.EasingEaseOutQuint,
              selectedImageSrc: Assets.EaseOutQuint,
              imageSrc: Assets.EaseOutQuint
            },
            {
              key: 'easeInOutQuint',
              text: strings.EasingEaseInOutQuint,
              selectedImageSrc: Assets.EaseInOutQuint,
              imageSrc: Assets.EaseInOutQuint
            },
            {
              key: 'easeInSine',
              text: strings.EasingEaseInSine,
              selectedImageSrc: Assets.EaseInSine,
              imageSrc: Assets.EaseInSine
            },
            {
              key: 'easeOutSine',
              text: strings.EasingEaseOutSine,
              selectedImageSrc: Assets.EaseOutSine,
              imageSrc: Assets.EaseOutSine
            },
            {
              key: 'easeInOutSine',
              text: strings.EasingEaseInOutSine,
              selectedImageSrc: Assets.EaseInOutSine,
              imageSrc: Assets.EaseInOutSine
            },
            {
              key: 'easeInExpo',
              text: strings.EasingEaseInExpo,
              selectedImageSrc: Assets.EaseInExpo,
              imageSrc: Assets.EaseInExpo
            },
            {
              key: 'easeOutExpo',
              text: strings.EasingEaseOutExpo,
              selectedImageSrc: Assets.EaseOutExpo,
              imageSrc: Assets.EaseOutExpo
            },
            {
              key: 'easeInOutExpo',
              text: strings.EasingEaseInOutExpo,
              selectedImageSrc: Assets.EaseInOutExpo,
              imageSrc: Assets.EaseInOutExpo
            },
            {
              key: 'easeInCirc',
              text: strings.EasingEaseInCirc,
              selectedImageSrc: Assets.EaseInCirc,
              imageSrc: Assets.EaseInCirc
            },
            {
              key: 'easeOutCirc',
              text: strings.EasingEaseOutCirc,
              selectedImageSrc: Assets.EaseOutCirc,
              imageSrc: Assets.EaseOutCirc
            },
            {
              key: 'easeInOutCirc',
              text: strings.EasingEaseInOutCirc,
              selectedImageSrc: Assets.EaseInOutCirc,
              imageSrc: Assets.EaseInOutCirc
            },
            {
              key: 'easeInElastic',
              text: strings.EasingEaseInElastic,
              selectedImageSrc: Assets.EaseInElastic,
              imageSrc: Assets.EaseInElastic
            },
            {
              key: 'easeOutElastic',
              text: strings.EasingEaseOutElastic,
              selectedImageSrc: Assets.EaseOutElastic,
              imageSrc: Assets.EaseOutElastic
            },
            {
              key: 'easeInOutElastic',
              text: strings.EasingEaseInOutElastic,
              selectedImageSrc: Assets.EaseInOutElastic,
              imageSrc: Assets.EaseInOutElastic
            },
            {
              key: 'easeInBack',
              text: strings.EasingEaseInBack,
              selectedImageSrc: Assets.EaseInBack,
              imageSrc: Assets.EaseInBack
            },
            {
              key: 'easeOutBack',
              text: strings.EasingEaseOutBack,
              selectedImageSrc: Assets.EaseOutBack,
              imageSrc: Assets.EaseOutBack
            },
            {
              key: 'easeInOutBack',
              text: strings.EasingEaseInOutBack,
              selectedImageSrc: Assets.EaseInOutBack,
              imageSrc: Assets.EaseInOutBack
            },
            {
              key: 'easeInBounce',
              text: strings.EasingEaseInBounce,
              selectedImageSrc: Assets.EaseInBounce,
              imageSrc: Assets.EaseInBounce
            },
            {
              key: 'easeOutBounce',
              text: strings.EasingEaseOutBounce,
              selectedImageSrc: Assets.EaseOutBounce,
              imageSrc: Assets.EaseOutBounce
            },
            {
              key: 'easeInOutBounce',
              text: strings.EasingEaseInOutBounce,
              selectedImageSrc: Assets.EaseInOutBounce,
              imageSrc: Assets.EaseInOutBounce
            },
          ]
        })
      ]
    };
  }

  /**
 * Lists all palette choices for the palette property pane group
 */
  private _getPaletteOptions = (): IDropdownOption[] => {
    // Because I'm lazy, I am NOT going to list
    // every single palette option manually,
    // so I'll just loop through the enum values

    // Get all the palette key names
    const names = Object.keys(ChartPalette)
      .filter(k => typeof ChartPalette[k] === "number") as string[];

    // Generate the palette options from palette names
    const paletteOptions: IDropdownOption[] = names.filter(paletteName => strings.PaletteName[paletteName] !== undefined).map((paletteName: string) => {
      const displayName: string = strings.PaletteName[paletteName];
      const description: string = strings.PaletteDescription[paletteName];
      return {
        key: ChartPalette[paletteName],
        text: displayName,
        data: {
          colors: PaletteGenerator.GetPalette(ChartPalette[paletteName], NUMCOLORS).slice(0, NUMCOLORS),
          description: description
        }
      };
    });

    return paletteOptions;
  }

  /**
   * Returns the list of dash styles
   */
  private _getDashOptions = (): IDropdownOption[] => {
    // Enums often return two copies of each value: one by numerical value, and one by text.
    // we use the number enums so that we only get one instance of each type
    const names = Object.keys(DashType)
      .filter(k => typeof DashType[k] === "number") as string[];

    // Generate the dash options from dash names
    const dashOptions: IDropdownOption[] = names.map((dashName: string, index: number) => {
      const displayName: string = strings.DashNames[index];
      const strokes: number[] = DashStrokes[DashType[dashName]];
      return {
        key: DashType[dashName],
        text: displayName,
        data: {
          strokes: strokes
        }
      };
    });

    return dashOptions;
  }

  /**
   * Gets the list of fields
   */
  private _getFields(): Promise<IListField[]> {
    // No list selected
    if (!this.properties.dataSourceListId) {
      return Promise.resolve();
    }

    // Call the list service
    const service: IListService = new ListService(this.context);
    return service.getFields(this.properties.dataSourceListId);
  }

  /**
   * Get the list of fields that can be used for labels
   */
  private _getLabelFields(): IPropertyPaneDropdownOption[] {
    if (this._fields === undefined) {
      return undefined;
    }

    // Fields that contain text or date can be used as labels
    const labelFields = this._fields!.filter(f => f.TypeAsString === 'Text' || f.TypeAsString === 'DateTime').map(field => {
      return {
        key: field.InternalName,
        text: `${field.Title}`,
      };
    });
    return labelFields;
  }

  /**
   * Returns the list of fields that can be used for data
   */
  private _getDataFields(): IPropertyPaneDropdownOption[] {
    if (this._fields === undefined) {
      return undefined;
    }
    const dataFields = this._fields!.filter(f => f.TypeAsString === 'Number' || f.TypeAsString === 'Currency').map(field => {
      return {
        key: field.InternalName,
        text: `${field.Title}`,
      };
    });
    return dataFields;
  }

  /**
   * Lists the possible chart choices
   */
  private _getChartChoices = (): IPropertyPaneChoiceGroupOption[] => {

    const names = Object.keys(ChartType) as string[];

    // Make sure we retrieve chart types that have a string resource for them.
    const chartOptions: IPropertyPaneChoiceGroupOption[] = names.filter(type => strings.ChartTypeName[type] !== undefined).map((chartTypeName: string) => {

      const choice: IPropertyPaneChoiceGroupOption = {
        key: ChartType[chartTypeName],
        text: strings.ChartTypeName[chartTypeName]
      };

      // Only some of charts types have Office Fabric UI icon equivalents.
      // This code finds the Office Fabric icon or the icon asset
      switch (chartTypeName) {
        case 'Bar':
          choice.iconProps = {
            officeFabricIconFontName: 'BarChartVertical'
          };
          break;
        case 'HorizontalBar':
          choice.iconProps = {
            officeFabricIconFontName: 'BarChartHorizontal'
          };
          break;
        case 'Doughnut':
          choice.iconProps = {
            officeFabricIconFontName: 'DonutChart'
          };
          break;
        case 'Line':
          choice.iconProps = {
            officeFabricIconFontName: 'LineChart'
          };
          break;
        case 'Pie':
          choice.iconProps = {
            officeFabricIconFontName: 'PieDouble'
          };
          break;
        default:
          choice.imageSrc = Assets.ChartIcons[chartTypeName];
          choice.selectedImageSrc = Assets.ChartIcons[chartTypeName];
      }
      return choice;
    });
    return chartOptions;
  }

  /**
   * Returns true if the selected chart type is a radial chart
   * (i.e.: Pie, Donut, etc.)
   */
  private _isRadialChart = (): boolean => {
    const { chartType } = this.properties;
    return chartType === ChartType.Pie || chartType === ChartType.Doughnut || chartType === ChartType.PolarArea || chartType === ChartType.Radar;
  }

  /**
   * Notified when data is changed.
   * Forces chart to re-render
   */
  private _handleChangeData = (data: any) => {
    this.properties.data = data;
    this.render();
  }

  /**
   * Notified when a property is changed.
   * Forces chart to re-render.
   */
  private _handlePropertyChange(propertyPath: string, newValue: any): void {
    this.properties[propertyPath] = newValue;

    this.render();
  }

  /**
   * Resets the data if chart changes to (or from)
   * a type of data that is incompatible with another
   * one. This prevents getting nasty error messages.
   */
  private _initalizeData = () => {
    const { chartType } = this.properties;
    if (chartType === ChartType.Bubble) {
      this.properties.data = [{
        id: Guid.newGuid().toString(),
        name: '',
        x: undefined,
        y: undefined,
        r: undefined
      }];
    } else if (chartType === ChartType.Scatter) {
      this.properties.data = [{
        id: Guid.newGuid().toString(),
        name: '',
        x: undefined,
        y: undefined
      }];
    } else {
      this.properties.data = [{
        id: Guid.newGuid().toString(),
        name: '',
        value: undefined
      }];
    }
  }
}
