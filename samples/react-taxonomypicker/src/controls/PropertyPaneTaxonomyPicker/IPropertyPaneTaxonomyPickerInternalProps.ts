import { IPropertyPaneTaxonomyPickerProps } from './IPropertyPaneTaxonomyPickerProps';

export interface IPropertyPaneTaxonomyPickerInternalProps extends IPropertyPaneTaxonomyPickerProps {
  onRender(elem: HTMLElement): void;
  onDispose(elem: HTMLElement): void;
}
