import {
  IPropertyPaneCustomFieldProps,
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-property-pane';

export interface IPropertyPaneTabPreviewProps {
  accentColor?: string;
  tabTextColor?: string;
  tabActiveTextColor?: string;
  tabBackgroundColor?: string;
  tabActiveBackgroundColor?: string;
  tabHoverBackgroundColor?: string;
  tabFontSize?: string;
  tabFontWeight?: string;
  tabPaddingVertical?: string;
  tabPaddingHorizontal?: string;
  tabGap?: string;
  tabBorderRadius?: string;
  activeIndicatorWidth?: string;
  tabShadow?: string;
  tabStyle?: string;
  showActiveIndicator?: boolean;
  activeIndicatorColor?: string;
  showTabSeparator?: boolean;
  tabSeparatorColor?: string;
}

interface IPropertyPaneTabPreviewInternalProps extends IPropertyPaneTabPreviewProps, IPropertyPaneCustomFieldProps {
}

class PropertyPaneTabPreviewBuilder implements IPropertyPaneField<IPropertyPaneTabPreviewProps> {
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyPaneTabPreviewInternalProps;

  constructor(targetProperty: string, properties: IPropertyPaneTabPreviewProps) {
    this.targetProperty = targetProperty;
    this.properties = {
      ...properties,
      key: 'tabPreview',
      onRender: this.onRender.bind(this)
    };
  }

  private onRender(elem: HTMLElement): void {
    const props = this.properties;

    // Default values
    const accentColor = props.accentColor || '#0078d4';
    const tabTextColor = props.tabTextColor || 'rgba(0, 0, 0, 0.7)';
    const tabActiveTextColor = props.tabActiveTextColor || accentColor;
    const tabBackgroundColor = props.tabBackgroundColor || 'transparent';
    const tabActiveBackgroundColor = props.tabActiveBackgroundColor || 'transparent';
    const tabHoverBackgroundColor = props.tabHoverBackgroundColor || 'rgba(0, 0, 0, 0.04)';
    const tabFontSize = props.tabFontSize || '14px';
    const tabFontWeight = props.tabFontWeight || '500';
    const tabPaddingVertical = props.tabPaddingVertical || '10px';
    const tabPaddingHorizontal = props.tabPaddingHorizontal || '16px';
    const tabGap = props.tabGap || '0px';
    const tabBorderRadius = props.tabBorderRadius || '0px';
    const activeIndicatorWidth = props.activeIndicatorWidth || '3px';
    const tabShadow = props.tabShadow || 'none';
    const tabStyle = props.tabStyle || 'default';
    const showActiveIndicator = props.showActiveIndicator !== false;
    const activeIndicatorColor = props.activeIndicatorColor || accentColor;
    const showTabSeparator = props.showTabSeparator !== false;
    const tabSeparatorColor = props.tabSeparatorColor || 'rgba(0, 0, 0, 0.12)';

    const borderBottomStyle = showTabSeparator ? `1px solid ${tabSeparatorColor}` : 'none';

    elem.innerHTML = `
      <div style="
        margin: 12px 0 16px 0;
        padding: 16px;
        background: #f5f5f5;
        border-radius: 8px;
        border: 1px solid #e0e0e0;
      ">
        <div style="
          font-size: 11px;
          font-weight: 600;
          color: #666;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        ">Style Preview</div>
        <div style="
          background: white;
          border-radius: 6px;
          padding: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        ">
          <div style="
            display: flex;
            gap: ${tabGap};
            border-bottom: ${tabStyle === 'boxed' ? `1px solid ${tabSeparatorColor}` : borderBottomStyle};
            margin-bottom: 8px;
          " class="pi-preview-tabs">
            <div style="
              padding: ${tabPaddingVertical} ${tabPaddingHorizontal};
              font-size: ${tabFontSize};
              font-weight: ${tabFontWeight};
              color: ${tabStyle === 'pills' ? 'white' : tabActiveTextColor};
              background: ${tabStyle === 'pills' ? accentColor : tabActiveBackgroundColor};
              border-radius: ${tabStyle === 'pills' ? '20px' : tabBorderRadius};
              cursor: pointer;
              transition: all 0.2s ease;
              box-shadow: ${tabShadow};
              ${tabStyle === 'boxed' ? `border: 1px solid rgba(0,0,0,0.1); border-bottom: 1px solid white; margin-bottom: -1px; border-radius: ${tabBorderRadius !== '0px' ? tabBorderRadius : '6px'} ${tabBorderRadius !== '0px' ? tabBorderRadius : '6px'} 0 0;` : ''}
              ${tabStyle !== 'pills' && tabStyle !== 'boxed' && showActiveIndicator ? `border-bottom: ${activeIndicatorWidth} solid ${activeIndicatorColor}; padding-bottom: calc(${tabPaddingVertical} - ${activeIndicatorWidth} + 1px);` : ''}
            ">Tab 1</div>
            <div style="
              padding: ${tabPaddingVertical} ${tabPaddingHorizontal};
              font-size: ${tabFontSize};
              font-weight: ${tabFontWeight};
              color: ${tabTextColor};
              background: ${tabBackgroundColor};
              border-radius: ${tabStyle === 'pills' ? '20px' : tabBorderRadius};
              cursor: pointer;
              transition: all 0.2s ease;
              ${tabStyle === 'boxed' ? `border: 1px solid transparent; border-radius: ${tabBorderRadius !== '0px' ? tabBorderRadius : '6px'} ${tabBorderRadius !== '0px' ? tabBorderRadius : '6px'} 0 0;` : ''}
            ">Tab 2</div>
            <div style="
              padding: ${tabPaddingVertical} ${tabPaddingHorizontal};
              font-size: ${tabFontSize};
              font-weight: ${tabFontWeight};
              color: ${tabTextColor};
              background: ${tabBackgroundColor};
              border-radius: ${tabStyle === 'pills' ? '20px' : tabBorderRadius};
              cursor: pointer;
              transition: all 0.2s ease;
              ${tabStyle === 'boxed' ? `border: 1px solid transparent; border-radius: ${tabBorderRadius !== '0px' ? tabBorderRadius : '6px'} ${tabBorderRadius !== '0px' ? tabBorderRadius : '6px'} 0 0;` : ''}
            ">Tab 3</div>
          </div>
          <div style="
            height: 24px;
            background: linear-gradient(90deg, #f0f0f0 25%, transparent 25%, transparent 50%, #f0f0f0 50%, #f0f0f0 75%, transparent 75%);
            background-size: 20px 20px;
            border-radius: 4px;
            opacity: 0.5;
          "></div>
        </div>
      </div>
    `;

    // Add hover effect
    const tabs = elem.querySelectorAll('.pi-preview-tabs > div');
    tabs.forEach((tab, index) => {
      if (index > 0) { // Skip active tab
        (tab as HTMLElement).addEventListener('mouseenter', () => {
          (tab as HTMLElement).style.background = tabHoverBackgroundColor;
        });
        (tab as HTMLElement).addEventListener('mouseleave', () => {
          (tab as HTMLElement).style.background = tabBackgroundColor;
        });
      }
    });
  }
}

export function PropertyPaneTabPreview(targetProperty: string, properties: IPropertyPaneTabPreviewProps): IPropertyPaneField<IPropertyPaneTabPreviewProps> {
  return new PropertyPaneTabPreviewBuilder(targetProperty, properties);
}
