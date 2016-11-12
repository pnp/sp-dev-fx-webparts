import styles from '../TermSetRequester.module.scss';

export class TaxonomyControlView {
  private _template: string = `
  <div class="${styles.taxonomy}">
    <ul class="${styles.termStoreList}">
      <!-- ko template: { name: 'termStoreTpl', foreach: termStores } -->
      <!-- /ko -->
    </ul>
  </div>

  <script id="termStoreTpl" type="text/html">
    <li>
      <div class="${styles.info}">
        <b data-bind="text: name"></b>&nbsp;&nbsp;&nbsp;ID: <span data-bind="text: id"></span>
        <button class="ms-GroupHeader-expand ${styles.groupHeaderExpand}">
          <i class="ms-Icon ms-Icon--ChevronDown" data-bind="click: actionClick, css: { 'is-collapsed': !isExpanded() }"></i>
        </button>
      </div>
      <ul data-bind="visible: isExpanded" class="${styles.termGroupList}">
        <!-- ko template: { name: 'termGroupTpl', foreach: termGroups } -->
        <!-- /ko -->
      </ul>
    </li>
  </script>

  <script id="termGroupTpl" type="text/html">
    <li>
      <div class="${styles.info}">
        <b data-bind="text: name"></b>&nbsp;&nbsp;&nbsp;ID: <span data-bind="text: id"></span>
        <button class="ms-GroupHeader-expand ${styles.groupHeaderExpand}">
          <i class="ms-Icon ms-Icon--ChevronDown" data-bind="click: actionClick, css: { 'is-collapsed': !isExpanded() }"></i>
        </button>
      </div>
      <ul data-bind="visible: isExpanded" class="${styles.termSetList}">
        <!-- ko template: { name: 'termSetTpl', foreach: termSets } -->
        <!-- /ko -->
      </ul>
    </li>
  </script>

  <script id="termSetTpl" type="text/html">
    <li>
      <div class="${styles.info}">
        <b data-bind="text: name"></b>&nbsp;&nbsp;&nbsp;ID: <span data-bind="text: id"></span>
        <button class="ms-GroupHeader-expand ${styles.groupHeaderExpand}">
          <i class="ms-Icon ms-Icon--ChevronDown" data-bind="click: actionClick, css: { 'is-collapsed': !isExpanded() }"></i>
        </button>
      </div>
      <ul data-bind="visible: isExpanded" class="${styles.termList}">
        <!-- ko template: { name: 'termTpl', foreach: terms } -->
        <!-- /ko -->
      </ul>
    </li>
  </script>

  <script id="termTpl" type="text/html">
    <li>
      <div class="${styles.info}">
        <b data-bind="text: name"></b>&nbsp;&nbsp;&nbsp;ID: <span data-bind="text: id"></span>
        <button class="ms-GroupHeader-expand ${styles.groupHeaderExpand}">
          <i class="ms-Icon ms-Icon--ChevronDown" data-bind="visible: hasChildTerms, click: actionClick, css: { 'is-collapsed': !isExpanded() }"></i>
        </button>
      </div>
      Labels:<br/>
      <div data-bind="foreach: labels">
        <div>Value: <span data-bind="text: value"></span>; Language: <span data-bind="text: language"></span>; Is Default: <span data-bind="text: isDefaultForLanguage"></span></div>
      </div>
      <ul data-bind="visible: isExpanded" class="${styles.termList}">
        <!-- ko template: { name: 'termTpl', foreach: terms } -->
        <!-- /ko -->
      </ul>
    </li>
  </script>
  `;

  /**
   * Renders markup
   */
  public render(element: HTMLElement): Promise<void> {
    return new Promise<void>((resolve) => {
      element.innerHTML = this._template;
      resolve();
    });
  }
}