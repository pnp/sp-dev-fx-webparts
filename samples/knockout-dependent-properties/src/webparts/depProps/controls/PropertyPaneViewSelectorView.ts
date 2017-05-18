/*
<div>
      <select data-bind="options: lists, optionsText: 'Title', optionsValue: 'Id', value: currentList, optionsCaption: listLabel">
      </select>
    </div>
    <div>
      <select data-bind="options: views, optionsText: 'Title', optionsValue: 'Id', value: currentView, optionsCaption: viewLabel, enable: isListSelected"></select>
    </div>
*/

import { DROPDOWN_COMPONENT } from '../components/dropdown/Dropdown';

/**
 * ViewSelector component view
 */
export class PropertyPaneViewSelectorView {

  private _template: string = `
    <div class="view-selector-component">
      <${DROPDOWN_COMPONENT} params="options: lists, optionsCaption: listLabel, value: currentList"></${DROPDOWN_COMPONENT}>
      <${DROPDOWN_COMPONENT} params="options: views, optionsCaption: viewLabel, value: currentView, disabled: noListSelection"></${DROPDOWN_COMPONENT}>
    </div>
  `;

  /**
   * Renders the HTML markup
   */
  public render(element: HTMLElement): Promise<void> {
    return new Promise<void>((resolve) => {
      element.innerHTML += this._template;
      resolve();
    });
  }
}