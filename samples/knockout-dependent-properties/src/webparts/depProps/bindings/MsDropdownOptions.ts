import * as ko from 'knockout';
/**
 * Knockout 'msoptions' binding.
 * Allows to bind Fabric UI dropdown options in the similar way to standard select options binding
 */
class MsDropdownOptions {
  constructor() {
    this.init = this.init.bind(this);
    this.update = this.update.bind(this);
  }

  /**
   * This will be called when the binding is first applied to an element
   */
  public init(element: any, valueAccessor: () => any, allBindingsAccessor?: KnockoutAllBindingsAccessor, viewModel?: any, bindingContext?: KnockoutBindingContext): void | { controlsDescendantBindings: boolean; } {
    if (element.tagName.toLowerCase() !== 'div' || element.className.indexOf('ms-Dropdown') === -1)
      throw new Error('msoptions binding applies only to <div class="ms-Dropdown"> elements');

    this.removePreviousContent(element);

    return { 'controlsDescendantBindings': false };
  }
  /**
   * Removes previous content of dropdown
   */
  private removePreviousContent(element: any) {
    const titleEl: HTMLSpanElement = element.querySelector('span');
    if (titleEl) {
      titleEl.textContent = '';
    }

    const listEl = element.querySelector('ul');
    if (!listEl)
      throw new Error('Incorrect markup in ms-Dropdown element');

    while (listEl.children.length) {
      listEl.children[0].remove();
    }
  }

  /**
   * This method adds all the options and also updates selected item and text
   */
  private addNewContent(element: any, options: {}[], selectedValue: KnockoutObservable<string>, itemSelected: (evt: MouseEvent) => any): void {
    const titleEl: HTMLSpanElement = element.querySelector('span');
    const listEl = element.querySelector('ul');
    let selectedValueUnwrapped: string = selectedValue && ko.utils.unwrapObservable(selectedValue);
    let selectedValueChanged: boolean = false;

    if (!listEl || !titleEl)
      throw new Error('Incorrect markup in ms-Dropdown element');

    for (let i: number = 0, len: number = options.length; i < len; i++) {
      const liEl: HTMLLIElement = document.createElement('li');
      const option = options[i];
      liEl.textContent = option['text'];
      liEl.setAttribute('aria-value', option['value']);
      liEl.setAttribute('role', 'option');
      liEl.setAttribute('aria-text', option['text']);
      liEl.className = 'ms-Dropdown-item';

      let isSelected: boolean = false;

      if (selectedValueUnwrapped && selectedValueUnwrapped === option['value'])
        isSelected = true;
      else {
        isSelected = option['selected'] === true || option['selected'] === true || option['selected'] === 'selected';
        if (isSelected) {
          selectedValueUnwrapped = option['value'];
          selectedValueChanged = true;
        }
      }

      liEl.setAttribute('aria-selected', isSelected + '');

      if (isSelected) {
        titleEl.textContent = option['text'];
        liEl.className += ' is-selected';
      }

      if (itemSelected) {
        liEl.addEventListener('click', itemSelected);
      }

      listEl.appendChild(liEl);
    }

    if (!titleEl.textContent && options.length > 0) {
      titleEl.textContent = options[0]['text'];
      listEl.children[0].setAttribute('aria-selected', 'true');
      selectedValueUnwrapped = options[0]['value'];
      selectedValueChanged = true;
    }

    if (selectedValueChanged && selectedValue)
      selectedValue(selectedValueUnwrapped);
  }

  /**
   * This will be called once when the binding is first applied to an element,
   * and again whenever any observables/computeds that are accessed change
   */
  public update(element: any, valueAccessor: () => any, allBindingsAccessor?: KnockoutAllBindingsAccessor,
    viewModel?: any, bindingContext?: KnockoutBindingContext): void {
    this.removePreviousContent(element);

    let unwrappedArray: any = ko.utils.unwrapObservable(valueAccessor());
    let captionValue: any;
    let filteredArray: {}[] = [];
    let itemSelected: (evt: MouseEvent) => any;

    if (unwrappedArray) {
      if (typeof unwrappedArray.length == "undefined") // Coerce single value into array
        unwrappedArray = [unwrappedArray];

      // Filter out any entries marked as destroyed
      filteredArray = ko.utils.arrayFilter(unwrappedArray, (item) => {
        return item === undefined || item === null || !ko.utils.unwrapObservable(item['_destroy']);
      });

      // If caption is included, add it to the array
      if (allBindingsAccessor['has']('optionsCaption')) {
        captionValue = ko.utils.unwrapObservable(allBindingsAccessor.get('optionsCaption'));
        // If caption value is null or undefined, don't show a caption
        if (captionValue !== null && captionValue !== undefined) {
          filteredArray.unshift({ value: "-1", text: captionValue });
        }
      }
    } else {
      // If a falsy value is provided (e.g. null), we'll simply empty the select element
    }

    if (allBindingsAccessor['has']('itemSelected'))
      itemSelected = allBindingsAccessor.get('itemSelected') as (evt: MouseEvent) => any;
    this.addNewContent(element, filteredArray, allBindingsAccessor.get('value'), itemSelected);
  }
}

/**
 * This API adds custom 'msoptions' binding to Knockout bindingHandlers object
 */
export function addMsDropdownBindingHandler(): void {
  if (!ko.bindingHandlers.msoptions)
    ko.bindingHandlers.msoptions = new MsDropdownOptions();
}