var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { PropertyPaneTextField, PropertyPaneToggle, PropertyPaneLabel, PropertyPaneChoiceGroup } from '@microsoft/sp-property-pane';
import * as strings from 'EnhancedPowerAppsWebPartStrings';
import EnhancedPowerApps from './components/EnhancedPowerApps';
/**
 * Plain old boring web part thingies
 */
import { BaseClientSideWebPart, PropertyPaneDynamicFieldSet, PropertyPaneDynamicField } from '@microsoft/sp-webpart-base';
/**
 * Use this for theme awareness
 */
import { ThemeProvider } from '@microsoft/sp-component-base';
/**
 * Use the multi-select for large checklists
 */
import { PropertyFieldMultiSelect } from '@pnp/spfx-property-controls/lib/PropertyFieldMultiSelect';
import { ThemeVariantSlots } from './ThemeVariantSlots';
import { PropertyPaneHTML } from '../../controls/PropertyPaneHTML/PropertyPaneHTML';
/**
 * Super-cool text functions included in SPFx that people don't use often enough
 */
import { Text } from '@microsoft/sp-core-library';
var EnhancedPowerAppsWebPart = /** @class */ (function (_super) {
    __extends(EnhancedPowerAppsWebPart, _super);
    function EnhancedPowerAppsWebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onConfigure = function () {
            _this.context.propertyPane.open();
        };
        return _this;
    }
    EnhancedPowerAppsWebPart.prototype.onInit = function () {
        // Consume the new ThemeProvider service
        this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
        // If it exists, get the theme variant
        this._themeVariant = this._themeProvider.tryGetTheme();
        // Register a handler to be notified if the theme variant changes
        this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);
        return _super.prototype.onInit.call(this);
    };
    EnhancedPowerAppsWebPart.prototype.render = function () {
        var clientWidth = this.domElement.clientWidth;
        var dynamicProp = this.properties.dynamicProp.tryGetValue();
        var locale = this.context.pageContext.cultureInfo.currentCultureName;
        var aspectWidth;
        var aspectHeight;
        switch (this.properties.aspectratio) {
            case "16:10":
                aspectWidth = 16;
                aspectHeight = 10;
                break;
            case "16:9":
                aspectWidth = 16;
                aspectHeight = 9;
                break;
            case "3:2":
                aspectWidth = 3;
                aspectHeight = 2;
                break;
            case "4:3":
                aspectWidth = 4;
                aspectHeight = 3;
                break;
            case "Custom":
                aspectWidth = this.properties.width;
                aspectHeight = this.properties.height;
        }
        var clientHeight = this.properties.layout === 'FixedHeight' ?
            this.properties.height :
            clientWidth * (aspectHeight / aspectWidth);
        var element = React.createElement(EnhancedPowerApps, {
            locale: locale,
            dynamicProp: dynamicProp,
            useDynamicProp: this.properties.useDynamicProp,
            dynamicPropName: this.properties.dynamicPropName,
            onConfigure: this._onConfigure,
            appWebLink: this.properties.appWebLink,
            width: clientWidth,
            height: clientHeight,
            themeVariant: this._themeVariant,
            border: this.properties.border,
            themeValues: this.properties.themeValues
        });
        ReactDom.render(element, this.domElement);
    };
    EnhancedPowerAppsWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(EnhancedPowerAppsWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    EnhancedPowerAppsWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    displayGroupsAsAccordion: true,
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            isCollapsed: false,
                            groupFields: [
                                PropertyPaneTextField('appWebLink', {
                                    label: strings.AppWebLinkFieldLabel
                                })
                            ]
                        },
                        {
                            groupName: strings.AppearanceGroupName,
                            isCollapsed: true,
                            groupFields: [
                                PropertyPaneToggle('border', {
                                    label: strings.BorderFieldLabel
                                }),
                                PropertyPaneChoiceGroup('layout', {
                                    label: strings.LayoutFieldLabel,
                                    options: [
                                        {
                                            key: 'FixedHeight',
                                            text: strings.LayoutFixedHeightOption,
                                            iconProps: {
                                                officeFabricIconFontName: 'FullWidth'
                                            }
                                        },
                                        {
                                            key: 'AspectRatio',
                                            text: strings.LayoutAspectRatioOption,
                                            iconProps: {
                                                officeFabricIconFontName: 'AspectRatio'
                                            }
                                        }
                                    ]
                                }),
                                this.properties.layout === "FixedHeight" && PropertyPaneTextField('height', {
                                    label: strings.HeightFieldLabel
                                }),
                                this.properties.layout === "AspectRatio" && PropertyPaneChoiceGroup('aspectratio', {
                                    label: strings.AspectRatioFieldLabel,
                                    options: [
                                        {
                                            key: '16:9',
                                            text: '16:9',
                                        },
                                        {
                                            key: '3:2',
                                            text: '3:2',
                                        },
                                        {
                                            key: '16:10',
                                            text: '16:10',
                                        },
                                        {
                                            key: '4:3',
                                            text: '4:3',
                                        },
                                        {
                                            key: 'Custom',
                                            text: strings.AspectRatioCustomOption,
                                        }
                                    ]
                                }),
                                this.properties.layout === "AspectRatio" && this.properties.aspectratio === "Custom" && PropertyPaneTextField('width', {
                                    label: strings.WidthFieldLabel,
                                }),
                                this.properties.layout === "AspectRatio" && this.properties.aspectratio === "Custom" && PropertyPaneTextField('height', {
                                    label: strings.HeightFieldLabel,
                                }),
                            ]
                        },
                        {
                            groupName: strings.DynamicPropertiesGroupLabel,
                            isCollapsed: true,
                            groupFields: [
                                PropertyPaneHTML({
                                    key: 'useDynamicProp',
                                    html: Text.format(strings.DynamicsPropsGroupDescription1, this.properties.dynamicPropName !== undefined ? this.properties.dynamicPropName : 'parametername')
                                }),
                                PropertyPaneHTML({
                                    key: 'useDynamicProp',
                                    html: strings.DynamicsPropsGroupDescription2
                                }),
                                PropertyPaneToggle('useDynamicProp', {
                                    checked: this.properties.useDynamicProp === true,
                                    label: strings.UseDynamicPropsFieldLabel
                                }),
                                this.properties.useDynamicProp === true && PropertyPaneDynamicFieldSet({
                                    label: strings.SelectDynamicSource,
                                    fields: [
                                        PropertyPaneDynamicField('dynamicProp', {
                                            label: strings.DynamicPropFieldLabel
                                        })
                                    ]
                                }),
                                this.properties.useDynamicProp === true && PropertyPaneTextField('dynamicPropName', {
                                    label: strings.DynamicPropsNameFieldLabel,
                                    description: strings.DynamicsPropNameDescriptionLabel,
                                    value: this.properties.dynamicPropName
                                })
                            ]
                        },
                        {
                            groupName: strings.ThemeGroupName,
                            isCollapsed: true,
                            groupFields: [
                                PropertyPaneLabel('themeValuesPre', {
                                    text: strings.ThemeValuePreLabel
                                }),
                                PropertyFieldMultiSelect('themeValues', {
                                    key: 'multithemeValuesSelect',
                                    label: strings.ThemeValueFieldLabel,
                                    options: ThemeVariantSlots,
                                    selectedKeys: this.properties.themeValues
                                }),
                                PropertyPaneHTML({
                                    key: 'themeValuesPost',
                                    html: strings.ThemeValuePostLabel
                                }),
                            ]
                        }
                    ]
                }
            ]
        };
    };
    Object.defineProperty(EnhancedPowerAppsWebPart.prototype, "propertiesMetadata", {
        get: function () {
            return {
                // Specify the web part properties data type to allow the address
                // information to be serialized by the SharePoint Framework.
                'dynamicProp': {
                    dynamicPropertyType: 'string'
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    /**
   * Update the current theme variant reference and re-render.
   *
   * @param args The new theme
   */
    EnhancedPowerAppsWebPart.prototype._handleThemeChangedEvent = function (args) {
        this._themeVariant = args.theme;
        this.render();
    };
    return EnhancedPowerAppsWebPart;
}(BaseClientSideWebPart));
export default EnhancedPowerAppsWebPart;
//# sourceMappingURL=EnhancedPowerAppsWebPart.js.map