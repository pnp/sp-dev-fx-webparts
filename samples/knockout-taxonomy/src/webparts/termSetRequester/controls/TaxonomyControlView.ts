export class TaxonomyControlView {
  private _template: string = `
  <div>
    <ul>
      <!-- ko template: { name: 'termStoreTpl', foreach: termStores } -->
      <!-- /ko -->
    </ul>
  </div>

  <script id="termStoreTpl" type="text/html">
    <li><b>Type: Term Store</b> Name: <span data-bind="text: name"></span>; ID: <span data-bind="text: id"></span>&nbsp;<a href="javascript:;" data-bind="text: (isExpanded() ? 'Collapse' : 'Expand'), click: actionClick"></a>
      <ul data-bind="visible: isExpanded">
        <!-- ko template: { name: 'termGroupTpl', foreach: termGroups } -->
        <!-- /ko -->
      </ul>
    </li>
  </script>

  <script id="termGroupTpl" type="text/html">
    <li><b>Type: Term Group</b> Name: <span data-bind="text: name"></span>; Description: <span data-bind="text: description"></span>&nbsp;<a href="javascript:;" data-bind="text: (isExpanded() ? 'Collapse' : 'Expand'), click: actionClick"></a>
      <ul data-bind="visible: isExpanded">
        <!-- ko template: { name: 'termSetTpl', foreach: termSets } -->
        <!-- /ko -->
      </ul>
    </li>
  </script>

  <script id="termSetTpl" type="text/html">
    <li><b>Type: Term Set</b> Name: <span data-bind="text: name"></span>; Description: <span data-bind="text: description"></span>&nbsp;<a href="javascript:;" data-bind="text: (isExpanded() ? 'Collapse' : 'Expand'), click: actionClick"></a>
      <ul data-bind="visible: isExpanded">
        <!-- ko template: { name: 'termTpl', foreach: terms } -->
        <!-- /ko -->
      </ul>
    </li>
  </script>

  <script id="termTpl" type="text/html">
    <li><b>Type: Term</b> Name: <span data-bind="text: name"></span>; ID: <span data-bind="text: id"></span>; Description: <span data-bind="text: description"></span>&nbsp;<a href="javascript:;" data-bind="visible: hasChildTerms, text: (isExpanded() ? 'Collapse' : 'Expand'), click: actionClick"></a>
      Labels:<br/>
      <div data-bind="foreach: labels">
        <div>Value: <span data-bind="text: value"></span>; Language: <span data-bind="text: language"></span>; Is Default: <span data-bind="text: isDefaultForLanguage"></span></div>
      </div>
      <ul data-bind="visible: isExpanded">
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