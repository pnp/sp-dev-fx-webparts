import * as ko from 'knockout';

/**
 * Dropdown option item
 */
export interface IDropdownOption {
  value: string | number;
  text: string;
  selected: boolean;
}

/**
 * Parameters that can be provided to Dropdown component
 */
export interface IDropdownViewModelParams {
  /**
   * options collection as KnockoutObservableArray
   */
  options: KnockoutObservableArray<IDropdownOption>;
  /**
   * Dropdown empty element text and text of Dropdown label
   */
  optionsCaption: string;
  /**
   * Selected value
   */
  value: KnockoutObservable<string>;

  /**
   * Is Dropdown disabled
   */
  disabled?: KnockoutObservable<boolean>;
}

/**
 * ViewModel of custom Dropdown component
 */
export class DropdownViewModel {
  /**
   * Last opened Dropdown ViewModel
   */
  private static _openedDropdownVM: DropdownViewModel;
  /**
   * Component initial parameters
   */
  private _params: IDropdownViewModelParams;

  /**
   * Dropdown options
   */
  protected options: KnockoutObservableArray<IDropdownOption>;
  /**
   * Options caption
   */
  protected optionsCaption: string;
  /**
   * Current selected value
   */
  protected value: KnockoutObservable<string>;
  /**
   * Is Dropdown opened
   */
  protected isOpen: KnockoutObservable<boolean>;

  /**
   * Is Dropdown disabled
   */
  protected disabled: KnockoutObservable<boolean>;

  /**
   * ctor
   */
  constructor(params: IDropdownViewModelParams) {
    this._params = params;
    this.options = params.options;
    this.optionsCaption = params.optionsCaption;
    this.value = params.value;

    if (params.disabled)
      this.disabled = params.disabled;
    else
      this.disabled = ko.observable<boolean>(false);

    // initally dropdown is closed
    this.isOpen = ko.observable<boolean>(false);

    //
    // binding all handlers to current instance
    //
    this.onItemSelected = this.onItemSelected.bind(this);
    this.onOpenDropdown = this.onOpenDropdown.bind(this);
    this._onDocClick = this._onDocClick.bind(this);
  }

  /**
   * item selected handler
   */
  public onItemSelected(evt: MouseEvent) {
    var selectedItem = evt.srcElement;
    this.value(selectedItem.getAttribute('aria-value'));
  }

  /**
   * Open-close dropdown handler
   */
  public onOpenDropdown(vm: DropdownViewModel, evt: MouseEvent) {
    if (this.disabled())
      return;
    const isOpen: boolean = ko.utils.unwrapObservable(this.isOpen);
    evt.stopPropagation();
    this.isOpen(!isOpen);

    if (!isOpen) {
      if (DropdownViewModel._openedDropdownVM && DropdownViewModel._openedDropdownVM !== this) {
        DropdownViewModel._openedDropdownVM._onDocClick(null);
      }

      DropdownViewModel._openedDropdownVM = this;
      document.addEventListener('click', this._onDocClick);
    }
  }

  /**
   * document.onclick handler
   */
  private _onDocClick(evt: MouseEvent) {
    this.isOpen(false);
    document.removeEventListener('click', this._onDocClick);
  }
}