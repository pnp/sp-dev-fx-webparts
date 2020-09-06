define([], function() {
  return {
    "WebPartDescription": `<p>This web part shows how to use the PnP <strong>ChartControl</strong> to render a bar chart in its simplest form.</p><p>We took the sample code from <a href="https://www.chartjs.org/docs/latest/" target="_blank">Chart.js</a> and simplified it by:
    <ul>
    <li>Keeping the hard-coded (in real life, you would want to retrieve the data from somewhere)
    <li>We did not localize any strings (in real life, you should localize your strings)
    <li>We did not change the colors (the ChartComponent automatically provides colors if none are provided)
    </ul>
    </p>
    `,
    "MoreInfoLinkUrl": "https://sharepoint.github.io/sp-dev-fx-controls-react/controls/ChartControl/"
  }
});
