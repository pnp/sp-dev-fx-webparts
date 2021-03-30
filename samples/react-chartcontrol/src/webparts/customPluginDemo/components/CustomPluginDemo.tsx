import * as React from 'react';
import styles from './CustomPluginDemo.module.scss';
import { ICustomPluginDemoProps } from './ICustomPluginDemo,types';
import * as strings from 'CustomPluginDemoWebPartStrings';

// used to add a chart control
import { ChartControl, ChartType, IChartPlugin } from "@pnp/spfx-controls-react/lib/ChartControl";

// Import the chart.js helpers
import * as Chart from 'chart.js';

/**
 * Declare the plugins before adding them.
 * Custom plugins should implement portions of the IChartPlugin interface
 */
const donutPlugins: IChartPlugin[] = [
  // This plugin renders the "rounded line" donut chart
  {
    afterUpdate: (chart: any) => {
      var a = chart.config.data.datasets.length - 1;
      for (let i in chart.config.data.datasets) {
        for (var j = chart.config.data.datasets[i].data.length - 1; j >= 0; --j) {
          if (Number(j) == (chart.config.data.datasets[i].data.length - 1))
            continue;
          var arc = chart.getDatasetMeta(i).data[j];
          arc.round = {
            x: (chart.chartArea.left + chart.chartArea.right) / 2,
            y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
            radius: chart.innerRadius + chart.radiusLength / 2 + (a * chart.radiusLength),
            thickness: chart.radiusLength / 2 - 1,
            backgroundColor: arc._model.backgroundColor
          };
        }
        a--;
      }
    },
    afterDraw: (chart: any) => {
      var ctx = chart.chart.ctx;
      for (let i in chart.config.data.datasets) {
        for (var j = chart.config.data.datasets[i].data.length - 1; j >= 0; --j) {
          if (Number(j) == (chart.config.data.datasets[i].data.length - 1))
            continue;
          var arc = chart.getDatasetMeta(i).data[j];
          var startAngle = Math.PI / 2 - arc._view.startAngle;
          var endAngle = Math.PI / 2 - arc._view.endAngle;

          ctx.save();
          ctx.translate(arc.round.x, arc.round.y);
          ctx.fillStyle = arc.round.backgroundColor;
          ctx.beginPath();
          ctx.arc(arc.round.radius * Math.sin(endAngle), arc.round.radius * Math.cos(endAngle), arc.round.thickness, 0, 2 * Math.PI);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      }
    }
  },
  // This plugin renders text in the middle of the chart.
  {
    afterUpdate: (chart: any) => {
      if (chart.config.options.elements.center) {
        var helpers = Chart.helpers;
        var centerConfig = chart.config.options.elements.center;
        var globalConfig = Chart.defaults.global;
        var ctx = chart.chart.ctx;

        var fontStyle = helpers.getValueOrDefault(centerConfig.fontStyle, globalConfig.defaultFontStyle);
        var fontFamily = helpers.getValueOrDefault(centerConfig.fontFamily, globalConfig.defaultFontFamily);

        var fontSize = undefined;
        if (centerConfig.fontSize)
          fontSize = centerConfig.fontSize;
        // figure out the best font size, if one is not specified
        else {
          ctx.save();
          fontSize = helpers.getValueOrDefault(centerConfig.minFontSize, 1);
          var maxFontSize = helpers.getValueOrDefault(centerConfig.maxFontSize, 256);
          var maxText = helpers.getValueOrDefault(centerConfig.maxText, centerConfig.text);

          do {
            ctx.font = helpers.fontString(fontSize, fontStyle, fontFamily);
            var textWidth = ctx.measureText(maxText).width;

            // check if it fits, is within configured limits and that we are not simply toggling back and forth
            if (textWidth < chart.innerRadius * 2 && fontSize < maxFontSize)
              fontSize += 1;
            else {
              // reverse last step
              fontSize -= 1;
              break;
            }
          } while (true);
          ctx.restore();
        }

        // save properties
        chart.center = {
          font: helpers.fontString(fontSize, fontStyle, fontFamily),
          fillStyle: helpers.getValueOrDefault(centerConfig.fontColor, globalConfig.defaultFontColor)
        };
      }
    },
    afterDraw: (chart: any) => {
      if (chart.center) {
        var centerConfig = chart.config.options.elements.center;
        var ctx = chart.chart.ctx;

        ctx.save();
        ctx.font = chart.center.font;
        ctx.fillStyle = chart.center.fillStyle;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
        var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
        ctx.fillText(centerConfig.text, centerX, centerY);
        ctx.restore();
      }
    }
  }];

/**
 * Chart.js accepts options for the plugins as well.
 * To prevent the compiler from complaining,
 * we defined the options as "any" and pass them on.
 */
const chartOptions: any = {
  elements: {
    center: {
      // the longest text that could appear in the center
      maxText: '100%',
      text: '67%',
      fontColor: styles.fontColor,
      fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      fontStyle: 'normal',
      // fontSize: 12,
      // if a fontSize is NOT specified, we will scale (within the below limits) maxText to take up the maximum space in the center
      // if these are not specified either, we default to 1 and 256
      minFontSize: 1,
      maxFontSize: 256,
    }
  },
  legend: {
    display: false
  }
};

export class CustomPluginDemo extends React.Component<ICustomPluginDemoProps, {}> {

  /**
   * Renders the (static) donut chart with the plugins passed in
   */
  public render(): React.ReactElement<ICustomPluginDemoProps> {
    return (
      <div className={styles.customPluginDemo}>
        <ChartControl
          type={ChartType.Doughnut}
          plugins={donutPlugins}
          data={{
            datasets:
              [
                {
                  label: strings.Bugs,
                  data: [60, 6.6666666666667, 33.333333333333],
                  backgroundColor: [styles.bugBackground1, styles.bugBackground2, styles.bugBackground3],
                }, {
                  label: strings.Fixes,
                  data: [60, 0.44444444444444, 39.555555555556],
                  backgroundColor: [styles.fixesBackground1, styles.fixesBackground2, styles.fixesBackground3],
                }, {
                  label: strings.Redesigns,
                  data: [
                    33.333333333333, 10.37037037037, 56.296296296296],
                  backgroundColor: [styles.redesignsBackground1, styles.redesignsBackground2, styles.redesignsBackground3],
                }
              ]
          }}
          options={chartOptions}
        />
      </div>
    );
  }
}
