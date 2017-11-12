import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneButton,
  PropertyPaneButtonType
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './SvgHeroWebPart.module.scss';
import * as strings from 'SvgHeroWebPartStrings';

//Import the special property pane controls from the PnP SPFx-Property-Controls package
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';
import { PropertyFieldSpinButton } from '@pnp/spfx-property-controls/lib/PropertyFieldSpinButton';


export interface ISvgHeroWebPartProps {
  colorPants: string;
  colorHair: string;
  colorBelt: string;
  colorBuckle: string;
  colorSkin: string;
  colorCape: string;
  colorDiaper: string;
  colorShoes: string;
  colorShirt: string;
  colorLogo: string;
  height: number;
}

export default class SvgHeroWebPartWebPart extends BaseClientSideWebPart<ISvgHeroWebPartProps> {

  public render(): void {

    //This will draw the SVG version of the SharePoint PnP Super Hero with custom colors
    // You can find the SVG file at https://github.com/thechriskent/PnPMan
    this.domElement.innerHTML = `
      <div class="${ styles.svgHero }">
        <svg
            xmlns:osb="http://www.openswatchbook.org/uri/2009/osb"
            xmlns:dc="http://purl.org/dc/elements/1.1/"
            xmlns:cc="http://creativecommons.org/ns#"
            xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
            xmlns:svg="http://www.w3.org/2000/svg"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
            xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
            width="67.223289mm"
            height="${this.properties.height}mm"
            viewBox="0 0 67.223289 157.28004"
            version="1.1"
            id="svg8"
            inkscape:version="0.92.2 (5c3e80d, 2017-08-06)"
            sodipodi:docname="PnPMan.svg">
          <title
              id="title3738">SharePoint Patterns and Practices Hero</title>
          <defs
              id="defs2">
            <linearGradient
                id="linearGradient4571"
                osb:paint="solid">
              <stop
                  style="stop-color:#0072c6;stop-opacity:1;"
                  offset="0"
                  id="stop4569" />
            </linearGradient>
          </defs>
          <sodipodi:namedview
              id="base"
              pagecolor="#ffffff"
              bordercolor="#666666"
              borderopacity="1.0"
              inkscape:pageopacity="0.0"
              inkscape:pageshadow="2"
              inkscape:zoom="0.7"
              inkscape:cx="151.31995"
              inkscape:cy="407.70451"
              inkscape:document-units="mm"
              inkscape:current-layer="layer8"
              showgrid="false"
              inkscape:window-width="1920"
              inkscape:window-height="1013"
              inkscape:window-x="1591"
              inkscape:window-y="-9"
              inkscape:window-maximized="1"
              inkscape:pagecheckerboard="true"
              showborder="false" />
          <metadata
              id="metadata5">
            <rdf:RDF>
              <cc:Work
                  rdf:about="">
                <dc:format>image/svg+xml</dc:format>
                <dc:type
                    rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
                <dc:title>SharePoint Patterns and Practices Hero</dc:title>
                <dc:creator>
                  <cc:Agent>
                    <dc:title>Chris Kent</dc:title>
                  </cc:Agent>
                </dc:creator>
                <dc:rights>
                  <cc:Agent>
                    <dc:title>Do Whatever</dc:title>
                  </cc:Agent>
                </dc:rights>
                <cc:license
                    rdf:resource="" />
              </cc:Work>
            </rdf:RDF>
          </metadata>
          <g
              inkscape:groupmode="layer"
              id="layer8"
              inkscape:label="Cape"
              style="display:inline"
              transform="translate(-73.828052,-54.594358)">
            <path
                style="fill:${this.properties.colorCape};fill-opacity:1;stroke:none;stroke-width:0.26458332;stroke-opacity:1"
                d="m 88.210119,84.13992 c 12.252751,6.99256 25.906701,6.88219 38.459151,0 2.34659,38.04952 5.59332,67.93108 5.45227,107.78269 -17.5129,-2.47028 -32.417758,-2.59245 -49.363691,0 -0.173476,-39.71798 3.10568,-69.73317 5.45227,-107.78269 z"
                id="rect4612"
                inkscape:connector-curvature="0"
                sodipodi:nodetypes="ccccc" />
          </g>
          <g
              inkscape:groupmode="layer"
              id="layer2"
              inkscape:label="Hands"
              sodipodi:insensitive="true"
              transform="translate(-73.828052,-54.594358)">
            <path
                style="fill:${this.properties.colorSkin};fill-opacity:1;stroke-width:0.26458332"
                d="m 75.074853,137.96852 h 7.370537 c 0,0 0.879831,3.99705 0,5.66964 -0.711802,1.35316 -2.250924,2.61706 -3.779766,2.59859 -1.477364,-0.0179 -2.918781,-1.28278 -3.590771,-2.59859 -0.859564,-1.68309 0,-5.66964 0,-5.66964 z"
                id="rect3747"
                inkscape:connector-curvature="0"
                sodipodi:nodetypes="ccaaac" />
            <path
                sodipodi:nodetypes="ccaaac"
                inkscape:connector-curvature="0"
                id="path3751"
                d="m 132.6224,137.96651 h 7.37054 c 0,0 0.87983,3.99705 0,5.66964 -0.71181,1.35316 -2.25093,2.61706 -3.77977,2.59859 -1.47736,-0.0179 -2.91878,-1.28278 -3.59077,-2.59859 -0.85957,-1.68309 0,-5.66964 0,-5.66964 z"
                style="fill:${this.properties.colorSkin};fill-opacity:1;stroke-width:0.26458332" />
          </g>
          <g
              inkscape:groupmode="layer"
              id="layer7"
              inkscape:label="Shoes"
              transform="translate(-73.828052,-54.594358)">
            <path
                style="fill:${this.properties.colorShoes};fill-opacity:1;stroke:none;stroke-width:0.17497595;stroke-opacity:1"
                d="m 110.24099,206.38016 c -1.35211,0.77913 -2.28346,3.76297 -2.29286,5.49424 h 6.69174 6.69218 c 0.024,-1.66445 -0.94074,-4.71511 -2.29286,-5.49424 h -4.39932 z"
                id="rect4603"
                inkscape:connector-curvature="0"
                sodipodi:nodetypes="ccccccc" />
            <path
                inkscape:connector-curvature="0"
                id="path4609"
                d="m 95.925984,206.38016 c -1.352099,0.77913 -2.283451,3.76297 -2.292855,5.49424 h 6.691741 6.69216 c 0.024,-1.73127 -0.94076,-4.71511 -2.29286,-5.49424 h -4.3993 z"
                style="fill:${this.properties.colorShoes};fill-opacity:1;stroke:none;stroke-width:0.17497595;stroke-opacity:1"
                sodipodi:nodetypes="ccccccc" />
          </g>
          <g
              inkscape:groupmode="layer"
              id="layer5"
              inkscape:label="Pants"
              style="display:inline"
              transform="translate(-73.828052,-54.594358)">
            <path
                style="fill:${this.properties.colorPants};fill-opacity:1;stroke:none;stroke-width:0.62548369;stroke-opacity:1"
                d="m 93.430988,131.91908 c -0.789853,24.68681 2.395269,49.61773 2.494996,74.46108 h 8.798186 c -0.23779,-25.00941 2.57508,-49.73514 2.71526,-74.46108 z m 14.008442,0 c 0.1402,24.72594 3.03935,49.54616 2.80156,74.46108 h 8.7982 c 0.50064,-24.30882 3.59997,-49.70746 2.40921,-74.46108 z"
                id="rect4583"
                inkscape:connector-curvature="0"
                sodipodi:nodetypes="cccccccccc" />
          </g>
          <g
              inkscape:groupmode="layer"
              id="layer6"
              inkscape:label="Diaper"
              style="display:inline"
              transform="translate(-73.828052,-54.594358)">
            <path
                style="fill:${this.properties.colorDiaper};fill-opacity:1;stroke:none;stroke-width:1.10326862;stroke-opacity:1"
                d="m 360.14648,498.19727 c 9.55435,13.43769 21.39608,40.60447 40.78516,49.78515 3.09741,1.46661 7.18384,1.46661 10.28125,0 19.38908,-9.18068 31.23081,-36.34746 40.78516,-49.78515 h -45.92578 z"
                transform="scale(0.26458333)"
                id="rect4592"
                inkscape:connector-curvature="0"
                sodipodi:nodetypes="caaccc" />
          </g>
          <g
              inkscape:groupmode="layer"
              id="layer11"
              inkscape:label="Head"
              style="display:inline"
              transform="translate(-73.828052,-54.594358)">
            <path
                style="fill:${this.properties.colorSkin};fill-opacity:1;stroke:none;stroke-width:0.26937541;stroke-opacity:1"
                d="m 107.44202,57.980444 c -8.008983,0 -9.010901,3.156368 -9.07955,7.551478 -1.407168,-0.0049 -1.672678,1.411772 -1.552361,3.149161 0.118118,1.70561 -0.112374,3.197222 1.578716,3.197222 0.06272,0 0.127262,-0.01122 0.192754,-0.02791 0.427305,2.836924 1.564921,5.410595 3.345531,7.186642 v 3.732588 l -1.997168,0.105095 c -1.056021,0.05557 6.536348,3.539424 7.500898,3.506941 0.96454,-0.03248 8.58,-3.444292 7.51368,-3.502773 l -1.99224,-0.109262 v -3.768762 c 1.67356,-1.805707 2.87138,-4.409977 3.33261,-7.206795 0.12071,0.05322 0.23955,0.08423 0.35295,0.08423 1.6911,0 1.4606,-1.491612 1.57871,-3.197222 0.12111,-1.748666 -0.14743,-3.17382 -1.57871,-3.150196 -0.0403,7.94e-4 -0.0815,0.0076 -0.12299,0.0155 -0.0818,-4.402706 -1.10782,-7.565948 -9.07283,-7.565948 z"
                id="path4629"
                inkscape:connector-curvature="0"
                sodipodi:nodetypes="cccscccssscccsccccc" />
          </g>
          <g
              inkscape:groupmode="layer"
              id="layer3"
              inkscape:label="Shirt"
              style="display:inline"
              transform="translate(-73.828052,-54.594358)">
            <path
                style="fill:${this.properties.colorShirt};fill-opacity:1;stroke:none;stroke-width:0.2662065px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
                d="m 88.210119,84.13992 c -6.457678,3.370482 -6.747431,10.987622 -9.118825,19.85958 -3.09086,11.55469 -3.842813,23.10962 -5.263242,34.66431 l 9.52138,-0.034 c 0.701583,-7.40655 1.670262,-14.67783 3.307292,-22.01674 0.824082,-4.62205 2.583934,-10.6961 3.875733,-15.45343 0.496559,6.55979 2.662611,18.36972 2.739369,26.74926 l 14.437874,0.20297 13.89786,-0.20297 c 0.2185,-8.52128 2.24281,-20.18947 2.73937,-26.74926 1.2918,4.75733 3.05165,10.83138 3.87573,15.45343 1.63703,7.33891 2.60571,14.61019 3.30729,22.01674 l 9.52139,0.034 c -1.42043,-11.55469 -2.17239,-23.10962 -5.26325,-34.66431 -2.37139,-8.871958 -2.71909,-16.380327 -9.11882,-19.85958 -3.18641,-1.732312 -8.21227,-1.402256 -11.71712,-1.291596 l -7.5122,3.13859 -7.512719,-3.13859 c -3.905925,0.0914 -8.351497,-0.465033 -11.717112,1.291596 z"
                id="path3754"
                inkscape:connector-curvature="0"
                sodipodi:nodetypes="scccccccccccccscccs" />
          </g>
          <g
              inkscape:groupmode="layer"
              id="layer13"
              inkscape:label="CapeFront"
              sodipodi:insensitive="true"
              style="display:inline"
              transform="translate(-73.828052,-54.594358)">
            <path
                style="display:inline;fill:${this.properties.colorCape};fill-opacity:1;stroke:none;stroke-width:0.18022132;stroke-opacity:1"
                d="m 114.95215,82.848324 c 4.10616,-0.504911 7.81141,-0.408466 11.71712,1.291596 -15.81704,3.00461 -19.22932,1.846994 -19.22932,1.846994 z"
                id="rect853"
                inkscape:connector-curvature="0"
                sodipodi:nodetypes="cccc" />
            <path
                sodipodi:nodetypes="cccc"
                inkscape:connector-curvature="0"
                id="path858"
                d="m 99.927231,82.848324 c -4.106136,-0.504911 -7.811423,-0.408466 -11.717112,1.291596 15.816971,3.00461 19.229831,1.846994 19.229831,1.846994 z"
                style="display:inline;fill:${this.properties.colorCape};fill-opacity:1;stroke:none;stroke-width:0.18022132;stroke-opacity:1" />
          </g>
          <g
              inkscape:groupmode="layer"
              id="layer9"
              inkscape:label="Logo"
              style="display:inline"
              transform="translate(-73.828052,-54.594358)">
            <g
                inkscape:groupmode="layer"
                id="layer10"
                inkscape:label="Base"
                style="display:inline">
              <path
                  inkscape:connector-curvature="0"
                  id="path4616"
                  d="M 107.44042,90.28666 97.139694,95.523888 V 107.6271 l 10.300726,5.95956 10.29927,-5.95956 V 95.523888 Z"
                  style="display:inline;fill:${this.properties.colorLogo};fill-opacity:1;stroke:none;stroke-width:0.74192154;stroke-opacity:1" />
              <path
                  style="display:inline;fill:${this.properties.colorShirt};fill-opacity:1;stroke:none;stroke-width:0.64913452;stroke-opacity:1"
                  d="m 107.44042,91.78666 -9.050728,4.562918 V 106.8945 l 9.050728,5.19216 9.04927,-5.19216 V 96.349578 Z"
                  id="path4619"
                  inkscape:connector-curvature="0" />
            </g>
            <g
                inkscape:groupmode="layer"
                id="layer15"
                inkscape:label="Text as Object">
              <g
                  aria-label="PnP"
                  style="font-style:normal;font-weight:normal;font-size:10.58333302px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;display:inline;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26458332"
                  id="text872">
                <path
                    d="m 100.94121,102.93539 v 2.21244 h -1.446599 v -6.42235 h 2.266179 q 2.42742,0 2.42742,2.04673 0,0.96738 -0.69867,1.56752 -0.69418,0.59566 -1.85863,0.59566 z m 0,-3.099211 v 2.001941 h 0.56878 q 1.15549,0 1.15549,-1.01217 0,-0.989771 -1.15549,-0.989771 z"
                    style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:9.17222214px;font-family:'Segoe UI';-inkscape-font-specification:'Segoe UI Bold';fill:${this.properties.colorLogo};stroke-width:0.26458332"
                    id="path876"
                    inkscape:connector-curvature="0" />
                <path
                    d="m 109.4282,105.14783 h -1.41077 v -2.54834 q 0,-1.06591 -0.76136,-1.06591 -0.36725,0 -0.60462,0.28215 -0.23736,0.28215 -0.23736,0.71658 v 2.61552 h -1.41525 v -4.58611 h 1.41525 v 0.72553 h 0.0179 q 0.50608,-0.8375 1.47347,-0.8375 1.52273,0 1.52273,1.88998 z"
                    style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:9.17222214px;font-family:'Segoe UI';-inkscape-font-specification:'Segoe UI Bold';fill:${this.properties.colorLogo};stroke-width:0.26458332"
                    id="path878"
                    inkscape:connector-curvature="0" />
                <path
                    d="m 112.13777,102.93539 v 2.21244 h -1.4466 v -6.42235 h 2.26618 q 2.42742,0 2.42742,2.04673 0,0.96738 -0.69867,1.56752 -0.69418,0.59566 -1.85863,0.59566 z m 0,-3.099211 v 2.001941 h 0.56878 q 1.15549,0 1.15549,-1.01217 0,-0.989771 -1.15549,-0.989771 z"
                    style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:9.17222214px;font-family:'Segoe UI';-inkscape-font-specification:'Segoe UI Bold';fill:${this.properties.colorLogo};stroke-width:0.26458332"
                    id="path880"
                    inkscape:connector-curvature="0" />
              </g>
            </g>
            <g
                inkscape:groupmode="layer"
                id="layer14"
                inkscape:label="Font"
                style="display:none">
              <text
                  xml:space="preserve"
                  style="font-style:normal;font-weight:normal;font-size:10.58333302px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;display:inline;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26458332"
                  x="98.760117"
                  y="105.14783"
                  id="text4626"><tspan
                    sodipodi:role="line"
                    id="tspan4624"
                    x="98.760117"
                    y="105.14783"
                    style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:9.17222214px;font-family:'Segoe UI';-inkscape-font-specification:'Segoe UI Bold';fill:#ffffff;stroke-width:0.26458332">PnP</tspan></text>
            </g>
          </g>
          <g
              inkscape:groupmode="layer"
              id="layer4"
              inkscape:label="Belt"
              style="display:inline"
              transform="translate(-73.828052,-54.594358)">
            <rect
                style="fill:${this.properties.colorBelt};fill-opacity:1;stroke:none;stroke-width:0.25898856;stroke-opacity:1"
                id="rect4567"
                width="29.77"
                height="4.6772165"
                x="92.605003"
                y="127.43362"
                ry="0.80319941" />
            <path
                style="display:inline;fill:${this.properties.colorBuckle};fill-opacity:1;stroke:none;stroke-width:0.26966235;stroke-opacity:1"
                d="m 107.43996,125.41306 -3.54139,2.01245 v 4.65079 l 3.54139,2.28997 3.54087,-2.28997 v -4.65079 z"
                id="rect4575"
                inkscape:connector-curvature="0" />
          </g>
          <g
              inkscape:groupmode="layer"
              id="layer12"
              inkscape:label="Hair"
              transform="translate(-73.828052,-54.594358)">
            <path
                style="fill:${this.properties.colorHair};fill-opacity:1;stroke:none;stroke-width:0.26458332px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
                d="m 97.210752,66.080176 c 0.09515,0.173788 1.072702,-0.0795 1.299292,-0.661458 0,0 -0.01241,-1.679638 0.259858,-2.456846 0.222434,-0.634965 0.473239,-1.424587 1.086681,-1.700893 0.508757,-0.229152 1.653647,0.259857 1.653647,0.259857 2.54347,0.393723 4.3546,0.574834 7.91388,-0.02363 0,0 0.85196,-0.49374 1.32291,-0.496095 0.46084,-0.0023 0.85287,0.358063 1.29929,0.47247 1.19124,0.305292 2.65961,-0.17198 3.64614,0.562212 0.27425,0.204103 0.44073,0.926066 0.44073,0.926066 -0.0158,0.874246 0.38167,2.584533 0.38167,2.584533 0.26774,0.425224 0.98621,1.053091 1.29563,0.675512 0.80803,-0.986031 0.18111,-3.669519 -0.11812,-5.504279 -1.6064,-3.244296 -3.38436,-3.996689 -5.74051,-4.84282 -0.65963,-0.236884 -1.41878,-0.233489 -2.10249,0.02362 -0.88195,-0.842572 -2.36864,-1.028411 -3.60494,-1.115032 -1.58278,-0.267731 -3.51991,-0.228357 -4.016,-0.02362 -2.267859,0.456722 -4.299484,1.768615 -4.890072,5.201899 -0.433096,1.708767 -0.733901,2.85057 -0.623657,4.275855 -1.1e-5,0.614216 0.141719,1.252056 0.496061,1.842649 z"
                id="path4646"
                inkscape:connector-curvature="0"
                sodipodi:nodetypes="ccaaccaaascscacccccc" />
          </g>
        </svg>
      </div>`;
  }

  private resetToDefault(): void {
    this.properties.colorSkin = '#ffb900';
    this.properties.colorHair = '#262626';
    this.properties.colorPants = '#d83b01';
    this.properties.colorBelt = '#ffc929';
    this.properties.colorBuckle = '#ffb900';
    this.properties.colorCape = '#003c6c';
    this.properties.colorDiaper = '#262626';
    this.properties.colorShoes = '#0078d7';
    this.properties.colorShirt = '#0078d7';
    this.properties.colorLogo = '#ffffff';
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.SizeGroupName,
              groupFields: [
                PropertyFieldSpinButton('height', {
                  label: strings.HeightFieldLabel,
                  initialValue: this.properties.height,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  suffix: " mm",
                  min: 25,
                  max: 150,
                  step: 5,
                  decimalPlaces: 2,
                  key: 'height'
                })
              ]
            },
            {
              groupName: strings.ColorGroupName,
              groupFields: [
                PropertyFieldColorPicker('colorHair', {
                  label: strings.HairFieldLabel,
                  selectedColor: this.properties.colorHair,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  key: 'colorHair'
                }),
                PropertyFieldColorPicker('colorSkin', {
                  label: strings.SkinFieldLabel,
                  selectedColor: this.properties.colorSkin,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  key: 'colorSkin'
                }),
                PropertyFieldColorPicker('colorCape', {
                  label: strings.CapeFieldLabel,
                  selectedColor: this.properties.colorCape,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  key: 'colorCape'
                }),
                PropertyFieldColorPicker('colorShirt', {
                  label: strings.ShirtFieldLabel,
                  selectedColor: this.properties.colorShirt,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  key: 'colorShirt'
                }),
                PropertyFieldColorPicker('colorLogo', {
                  label: strings.LogoFieldLabel,
                  selectedColor: this.properties.colorLogo,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  key: 'colorLogo'
                }),
                PropertyFieldColorPicker('colorBuckle', {
                  label: strings.BuckleFieldLabel,
                  selectedColor: this.properties.colorBuckle,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  key: 'colorBuckle'
                }),
                PropertyFieldColorPicker('colorBelt', {
                  label: strings.BeltFieldLabel,
                  selectedColor: this.properties.colorBelt,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  key: 'colorBelt'
                }),
                PropertyFieldColorPicker('colorDiaper', {
                  label: strings.DiaperFieldLabel,
                  selectedColor: this.properties.colorDiaper,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  key: 'colorDiaper'
                }),
                PropertyFieldColorPicker('colorPants', {
                  label: strings.PantsFieldLabel,
                  selectedColor: this.properties.colorPants,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  key: 'colorPants'
                }),
                PropertyFieldColorPicker('colorShoes', {
                  label: strings.ShoesFieldLabel,
                  selectedColor: this.properties.colorShoes,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  key: 'colorShoes'
                }),
                PropertyPaneButton('reset',{
                  text: strings.ResetButtonLabel,
                  buttonType: PropertyPaneButtonType.Command,
                  icon: 'Warning',
                  onClick: this.resetToDefault.bind(this)
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
