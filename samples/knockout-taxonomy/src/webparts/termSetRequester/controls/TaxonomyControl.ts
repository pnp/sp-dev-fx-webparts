import * as ko from 'knockout';
import {
  IWebPartContext
} from '@microsoft/sp-webpart-base';

import { TaxonomyControlView } from './TaxonomyControlView';
import { TaxonomyControlViewModel } from './TaxonomyControlViewModel';

/**
 * Class that represents a control to render Taxonomy hierarchy
 */
export class TaxonomyControl {
  /**
   * View
   */
  private view: TaxonomyControlView;
  /**
   * ViewModel
   */
  private viewModel: TaxonomyControlViewModel;

  /**
   * ctor
   * @param context: web part context
   */
  constructor(context: IWebPartContext) {
    this.view = new TaxonomyControlView();
    this.viewModel = new TaxonomyControlViewModel(context);
  }

  /**
   * Renders the control
   */
  public render(element: HTMLElement): Promise<void> {
    return new Promise<void>((resolve) => {
      // renders html first
      this.view.render(element).then(() => {
        // inits view model
        this.viewModel.init().then(() => {
          // applies bindings
          ko.applyBindings(this.viewModel, element);
          resolve();
        });
      });
    });
  }
}