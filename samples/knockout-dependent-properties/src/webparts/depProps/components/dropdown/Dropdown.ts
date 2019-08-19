import DropdownView from './view';
import { DropdownViewModel } from './viewmodel';
import * as ko from 'knockout';
import { addMsDropdownBindingHandler } from '../../bindings/MsDropdownOptions';

/**
 * custom dropdown component name
 */
export const DROPDOWN_COMPONENT: string = 'spfx_dropdown';

/**
 * API to register custom dropdown component
 */
export function registerDropdown(): boolean {
  if (!ko.bindingHandlers.msoptions)
    addMsDropdownBindingHandler();

  if (!ko.components.isRegistered(DROPDOWN_COMPONENT)) {
    ko.components.register(DROPDOWN_COMPONENT, {
      template: DropdownView.templateHtml,
      viewModel: DropdownViewModel
    });
  }

  return true;
}