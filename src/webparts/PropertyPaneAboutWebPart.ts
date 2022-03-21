import {
  IPropertyPaneField,
  PropertyPaneFieldType,
  IPropertyPaneCustomFieldProps 
} from '@microsoft/sp-property-pane';

export interface IPropertyPaneAboutWebPartProps {
    /**
	 * An UNIQUE key indicates the identity of this control
	 */
	key: string;

    /**
	 * An UNIQUE key indicates the identity of this control
	 */
	html: string;

}

export interface IPropertyWebPartInformationPropsInternal extends IPropertyPaneAboutWebPartProps, IPropertyPaneCustomFieldProps {
}

class PropertyPaneAboutWebPartBuilder implements IPropertyPaneField<IPropertyPaneAboutWebPartProps> {
	//Properties defined by IPropertyPaneField
	public targetProperty: string;
	public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
	public properties: IPropertyWebPartInformationPropsInternal;

	private elem: HTMLElement;

	public constructor(_properties: IPropertyPaneAboutWebPartProps) {
		this.properties = {
			key: _properties.key,
            html: _properties.html,
			onRender: this.onRender.bind(this)
		};
	}

	public render(): void {
		if (!this.elem) {
			return;
		}
		this.onRender(this.elem);
	}

	private onRender(elem: HTMLElement, ctx?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void {
		if (!this.elem) {
			this.elem = elem;
		}

		this.elem.innerHTML = this.properties.html;
	}
}

export function PropertyPaneAboutWebPart(properties: IPropertyPaneAboutWebPartProps): IPropertyPaneField<IPropertyPaneAboutWebPartProps> {
	return new PropertyPaneAboutWebPartBuilder(properties);
}