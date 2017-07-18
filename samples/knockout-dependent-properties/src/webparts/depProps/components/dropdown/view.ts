require('../../../../../node_modules/office-ui-fabric/dist/css/fabric.components.css');

/**
 * Dropdown markup (Fabric UI style)
 */
export default class DropdownView {
  public static templateHtml: string = `
    <div>
      <label class="ms-label" data-bind="text: optionsCaption">Test</label>
      <div class="ms-Dropdown" data-bind="click: onOpenDropdown, msoptions: options, optionsCaption: optionsCaption, value: value, itemSelected: onItemSelected, css: { 'is-open': isOpen(), 'is-disabled': disabled() }">
        <span class="ms-Dropdown-title dropdown-title"></span>
        <i class="ms-Dropdown-caretDown ms-Icon ms-Icon--ChevronDown"></i>
        <ul class="ms-Dropdown-items" role="listbox" data-bind="style:{display: isOpen() ? 'block' : 'none'}">
        </ul>
      </div>
    </div>
  `;
}