var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { PropertyPaneTextField, PropertyPaneChoiceGroup, PropertyPaneToggle } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
import * as strings from 'ModernLinkPresenterWebPartStrings';
import ModernLinkPresenter from './components/ModernLinkPresenter';
import { IconPicker } from './components/IconPicker';
import { PropertyPaneLogo } from '../../Core/PropertyPaneLogo';
var ModernLinkPresenterWebPart = /** @class */ (function (_super) {
    __extends(ModernLinkPresenterWebPart, _super);
    function ModernLinkPresenterWebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isDarkTheme = false;
        _this._environmentMessage = '';
        return _this;
    }
    ModernLinkPresenterWebPart.prototype.render = function () {
        var _this = this;
        var element = React.createElement(ModernLinkPresenter, {
            description: this.properties.description,
            isDarkTheme: this._isDarkTheme,
            environmentMessage: this._environmentMessage,
            hasTeamsContext: !!this.context.sdks.microsoftTeams,
            userDisplayName: this.context.pageContext.user.displayName,
            links: this.properties.links || [],
            outputFormat: this.properties.outputFormat || 'links',
            displayMode: this.displayMode,
            onTitleUpdate: function (value) { _this.properties.description = value; },
            tileWidth: this.properties.tileWidth || 220,
            tileHeight: this.properties.tileHeight || 320,
            tileHoverEffect: this.properties.tileHoverEffect || 'none',
            direction: this.properties.direction || 'vertical',
            tileButtonText: this.properties.tileButtonText || strings.BTNTileLink,
            showTileButton: this.properties.showTileButton !== false,
            showSearchField: this.properties.showSearchField !== false,
        });
        ReactDom.render(element, this.domElement);
    };
    ModernLinkPresenterWebPart.prototype.onInit = function () {
        var _this = this;
        return this._getEnvironmentMessage().then(function (message) {
            _this._environmentMessage = message;
        });
    };
    ModernLinkPresenterWebPart.prototype._getEnvironmentMessage = function () {
        var _this = this;
        if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
            return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
                .then(function (context) {
                var environmentMessage = '';
                switch (context.app.host.name) {
                    case 'Office': // running in Office
                        environmentMessage = _this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
                        break;
                    case 'Outlook': // running in Outlook
                        environmentMessage = _this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
                        break;
                    case 'Teams': // running in Teams
                    case 'TeamsModern':
                        environmentMessage = _this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
                        break;
                    default:
                        environmentMessage = strings.UnknownEnvironment;
                }
                return environmentMessage;
            });
        }
        return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
    };
    ModernLinkPresenterWebPart.prototype.onThemeChanged = function (currentTheme) {
        if (!currentTheme) {
            return;
        }
        this._isDarkTheme = !!currentTheme.isInverted;
        var semanticColors = currentTheme.semanticColors;
        if (semanticColors) {
            this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
            this.domElement.style.setProperty('--link', semanticColors.link || null);
            this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
        }
    };
    ModernLinkPresenterWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(ModernLinkPresenterWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: false,
        configurable: true
    });
    ModernLinkPresenterWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    displayGroupsAsAccordion: true,
                    groups: __spreadArray([
                        {
                            groupName: strings.BasicGroupName,
                            isCollapsed: true,
                            groupFields: __spreadArray(__spreadArray([
                                PropertyPaneTextField('description', {
                                    label: strings.DescriptionFieldLabel
                                }),
                                PropertyPaneChoiceGroup('outputFormat', {
                                    label: strings.LinksOutputFormatLabel,
                                    options: [
                                        { key: 'links', text: strings.LinksOutputFormatLinks },
                                        { key: 'linksWithIcon', text: strings.LinksOutputFormatLinksWithIcon },
                                        { key: 'linkDescriptionIcon', text: strings.LinksOutputFormatLinkDescriptionIcon },
                                        { key: 'tile', text: strings.LinksOutputFormatTile }
                                    ]
                                }),
                                PropertyFieldCollectionData('links', {
                                    key: 'links',
                                    label: 'Links',
                                    panelHeader: 'Manage Links',
                                    manageBtnLabel: 'Manage Links',
                                    value: this.properties.links,
                                    fields: [
                                        {
                                            id: 'title',
                                            title: strings.FieldTitle,
                                            type: CustomCollectionFieldType.string,
                                            required: true
                                        },
                                        {
                                            id: 'url',
                                            title: strings.FieldUrl,
                                            type: CustomCollectionFieldType.string,
                                            required: true
                                        },
                                        {
                                            id: 'icon',
                                            title: strings.FieldIcon,
                                            type: CustomCollectionFieldType.custom,
                                            required: false,
                                            onCustomRender: function (field, value, onUpdate, item, rowUniqueId, onCustomFieldValidation) {
                                                return React.createElement(IconPicker, {
                                                    value: value,
                                                    onChange: function (iconName) { return onUpdate(field.id, iconName); }
                                                });
                                            }
                                        },
                                        {
                                            id: 'summary',
                                            title: strings.FieldSummary,
                                            type: CustomCollectionFieldType.string,
                                            required: false
                                        },
                                        {
                                            id: 'description',
                                            title: strings.FieldDescription,
                                            type: CustomCollectionFieldType.string,
                                            required: false
                                        },
                                        {
                                            id: 'target',
                                            title: strings.FieldTarget,
                                            type: CustomCollectionFieldType.dropdown,
                                            required: true,
                                            options: [
                                                { key: '_blank', text: '_blank (New Tab)' },
                                                { key: '_self', text: '_self (Same Tab)' },
                                                { key: 'dialog', text: strings.FieldTargetDialog }
                                            ]
                                        },
                                        {
                                            id: 'color',
                                            title: strings.FieldColor,
                                            type: CustomCollectionFieldType.color,
                                            required: false
                                        },
                                        {
                                            id: 'displayFormat',
                                            title: strings.FieldDisplayFormat,
                                            type: CustomCollectionFieldType.dropdown,
                                            required: true,
                                            options: [
                                                { key: 'button', text: 'Button' },
                                                { key: 'link', text: 'Plain Link' }
                                            ]
                                        }
                                    ],
                                    disabled: false
                                })
                            ], (['links', 'linksWithIcon'].includes(this.properties.outputFormat) ? [
                                PropertyPaneChoiceGroup('direction', {
                                    label: strings.DirectionLabel,
                                    options: [
                                        { key: 'vertical', text: strings.DirectionVertical },
                                        { key: 'horizontal', text: strings.DirectionHorizontal }
                                    ]
                                })
                            ] : []), true), [
                                // Show search field property
                                PropertyPaneToggle('showSearchField', {
                                    label: strings.ShowSearchFieldLabel,
                                    onText: strings.ShowSearchFieldOn,
                                    offText: strings.ShowSearchFieldOff,
                                    checked: this.properties.showSearchField !== false
                                }),
                                new PropertyPaneLogo()
                            ], false)
                        }
                    ], (this.properties.outputFormat === 'tile' ? [{
                            groupName: strings.TileLayoutGroupName,
                            isCollapsed: false,
                            groupFields: [
                                PropertyPaneTextField('tileWidth', {
                                    label: strings.TileWidthLabel,
                                    description: strings.TileWidthDesc,
                                }),
                                PropertyPaneTextField('tileHeight', {
                                    label: strings.TileHeightLabel,
                                    description: strings.TileHeightDesc,
                                }),
                                PropertyPaneChoiceGroup('tileHoverEffect', {
                                    label: strings.TileHoverEffectLabel,
                                    options: [
                                        { key: 'none', text: strings.TileHoverEffectNone },
                                        { key: 'lift', text: strings.TileHoverEffectLift },
                                        { key: 'shadow', text: strings.TileHoverEffectShadow },
                                        { key: 'scale', text: strings.TileHoverEffectScale }
                                    ]
                                }),
                                PropertyPaneTextField('tileButtonText', {
                                    label: strings.TileButtonTextLabel,
                                    description: strings.TileButtonTextDesc,
                                }),
                                PropertyPaneToggle('showTileButton', {
                                    label: strings.ShowTileButtonLabel,
                                    onText: strings.ShowTileButtonOn,
                                    offText: strings.ShowTileButtonOff,
                                    checked: this.properties.showTileButton !== false
                                })
                            ]
                        }] : []), true)
                }
            ]
        };
    };
    return ModernLinkPresenterWebPart;
}(BaseClientSideWebPart));
export default ModernLinkPresenterWebPart;
//# sourceMappingURL=ModernLinkPresenterWebPart.js.map