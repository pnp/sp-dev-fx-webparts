import * as tslib_1 from "tslib";
import * as React from 'react';
import { css } from '@microsoft/office-ui-fabric-react-bundle';
import { WebPartDataConverter } from '@microsoft/sp-webpart-base';
import { htmlEncode, getReactLines } from './../encodingUtilities';
import styles from './SerializedWebPart.module.scss';
import parentStyles from './../SerializedCanvasView.module.scss';
var SerializedWebPart = /** @class */ (function (_super) {
    tslib_1.__extends(SerializedWebPart, _super);
    function SerializedWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SerializedWebPart.prototype.render = function () {
        var serializedString = WebPartDataConverter.convertWebPartDataToHtml(this.props.serializedWebPart);
        var escapedSerializedString = htmlEncode(serializedString);
        /**
         * Web Part XML schema for client side web parts in classic SharePoint pages
         */
        var webPartXmlLines = ['<webParts>',
            '  <webPart xmlns="http://schemas.microsoft.com/WebPart/v3">',
            '    <metaData>',
            '      <type name="Microsoft.SharePoint.WebPartPages.ClientSideWebPart,',
            '        Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" />',
            '      <importErrorMessage>Cannot Import WebPart</importErrorMessage>',
            '    </metaData>',
            '    <data>',
            '      <properties>',
            "        <property name=\"Title\" type=\"string\">" + this.props.serializedWebPart.title + "</property>",
            "        <property name=\"Description\" type=\"string\">" + this.props.serializedWebPart.description + "</property>",
            "        <property name=\"IconUrl\" type=\"string\">" + '' + "</property>",
            "        <property name=\"ClientSideWebPartId\">" + this.props.serializedWebPart.id + "</property>",
            "        <property name=\"ClientSideWebPartData\" type=\"string\">" + escapedSerializedString + "</property>",
            '      </properties>',
            '    </data>',
            '  </webPart>',
            '</webParts>'];
        return (React.createElement("p", { key: this.props.serializedWebPart.instanceId, className: css(styles.serializedWebPartItem, parentStyles.serializedTextArea) }, getReactLines(webPartXmlLines)));
    };
    return SerializedWebPart;
}(React.Component));
export default SerializedWebPart;
//# sourceMappingURL=SerializedWebPart.js.map