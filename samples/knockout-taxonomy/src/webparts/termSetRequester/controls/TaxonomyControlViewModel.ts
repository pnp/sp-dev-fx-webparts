import * as ko from 'knockout';
import { TaxonomyControlModel } from './TaxonomyControlModel';
import {
  IWebPartContext
} from '@microsoft/sp-webpart-base';
import {
  ITermBase,
  ITermStore,
  ITermSet,
  ITermGroup,
  ITerm,
  ILabel
} from '../common/SPEntities';

/**
 * Taxonomy Control ViewModel class
 */
export class TaxonomyControlViewModel {
  /**
   * Collection of term store view models
   */
  protected termStores: KnockoutObservableArray<TermStoreViewModel>;
  /**
   * Model
   */
  private model: TaxonomyControlModel;

  /**
   * ctor
   * @param context: web part context
   */
  constructor(context: IWebPartContext) {
    this.model = new TaxonomyControlModel(context);
    this.termStores = ko.observableArray<TermStoreViewModel>();
  }

  /**
   * Inits the view model object
   */
  public init(): Promise<void> {
    return new Promise<void>((resolve) => {
      // loading top level items of the hierarchy
      this.model.getTermStores().then((termStores) => {
        const termStoreViewModels: TermStoreViewModel[] = [];
        termStores.forEach((value) => {
          termStoreViewModels.push(new TermStoreViewModel(this.model, value));
        });

        this.termStores(termStoreViewModels);
        resolve();
      });
    });
  }
}

/**
 * Base viewmodel for all Taxonomy objects
 */
export class TermBaseViewModel {
  /**
   * Object's id
   */
  protected id: string;
  /**
   * Name
   */
  protected name: string;
  /**
   * Flag if the the item is expanded
   */
  protected isExpanded: KnockoutObservable<boolean>;
  /**
   * Model
   */
  protected model: TaxonomyControlModel;

  /**
   * ctor
   * @param model: taxonomy control model
   * @param entity: entity that is underline current view model
   */
  constructor(model: TaxonomyControlModel, entity: ITermBase) {
    this.model = model;
    this.isExpanded = ko.observable<boolean>(false);
    this.id = entity.id;
    this.name = entity.name;
  }
}

/**
 * Term store viewmodel
 */
export class TermStoreViewModel extends TermBaseViewModel {
  /**
   * Term store entity
   */
  private entity: ITermStore;
  /**
   * collection of viewmodels for term store groups
   */
  protected termGroups: KnockoutObservableArray<TermGroupViewModel>;

  /**
   * ctor
   * @param model: taxonomy control model
   * @param entity: entity that is underline current view model
   */
  constructor(model: TaxonomyControlModel, entity: ITermStore) {
    super(model, entity);
    this.entity = entity;
    this.termGroups = ko.observableArray<TermGroupViewModel>();
  }

  /**
   * Expand\collapse click handler
   */
  protected actionClick(ev: MouseEvent): void {
    this.isExpanded(!this.isExpanded());

    const isExpanded = this.isExpanded();

    if (isExpanded) {
      const unwrappedGroups = ko.utils.unwrapObservable(this.termGroups);

      if (!unwrappedGroups || !unwrappedGroups.length) {
        this.model.getTermGroups(this.entity).then((termGroups) => {
          const termGroupViewModels: TermGroupViewModel[] = [];
          termGroups.forEach((value) => {
            termGroupViewModels.push(new TermGroupViewModel(this.model, value));
          });

          this.termGroups(termGroupViewModels);
        });
      }
    }
  }
}


/**
 * Term Group ViewModel
 */
export class TermGroupViewModel extends TermBaseViewModel {
  /**
   * Term Group entity
   */
  private entity: ITermGroup;
  /**
   * Description
   */
  protected description: string;
  /**
   * collection of viewmodels for nested term sets
   */
  protected termSets: KnockoutObservableArray<TermSetViewModel>;

  /**
   * ctor
   * @param model: taxonomy control model
   * @param entity: entity that is underline current view model
   */
  constructor(model: TaxonomyControlModel, entity: ITermGroup) {
    super(model, entity);

    this.entity = entity;
    this.description = entity.description;
    this.termSets = ko.observableArray<TermSetViewModel>();
  }

  /**
   * Expand\collapse click handler
   */
  protected actionClick(ev: MouseEvent): void {
    this.isExpanded(!this.isExpanded());

    const isExpanded = this.isExpanded();

    if (isExpanded) {
      const unwrappedSets = ko.utils.unwrapObservable(this.termSets);

      if (!unwrappedSets || !unwrappedSets.length) {
        this.model.getTermSets(this.entity).then((termSets) => {
          const termSetViewModels: TermSetViewModel[] = [];
          termSets.forEach((value) => {
            termSetViewModels.push(new TermSetViewModel(this.model, value));
          });

          this.termSets(termSetViewModels);
        });
      }
    }
  }
}

/**
 * Term Set View Model
 */
export class TermSetViewModel extends TermBaseViewModel {
  /**
   * Term Set entity
   */
  private entity: ITermSet;
  /**
   * Description
   */
  protected description: string;
  /**
   * collection of viewmodels for nested terms
   */
  protected terms: KnockoutObservableArray<TermViewModel>;

  /**
   * ctor
   * @param model: taxonomy control model
   * @param entity: entity that is underline current view model
   */
  constructor(model: TaxonomyControlModel, entity: ITermSet) {
    super(model, entity);

    this.entity = entity;
    this.description = entity.description;
    this.terms = ko.observableArray<TermViewModel>();
  }

  /**
   * Expand\collapse click handler
   */
  protected actionClick(ev: MouseEvent): void {
    this.isExpanded(!this.isExpanded());

    const isExpanded = this.isExpanded();

    if (isExpanded) {
      const unwrappedTerms = ko.utils.unwrapObservable(this.terms);

      if (!unwrappedTerms || !unwrappedTerms.length) {
        this.model.getTerms(this.entity).then((terms) => {
          const termViewModels: TermViewModel[] = [];
          terms.forEach((value) => {
            termViewModels.push(new TermViewModel(this.model, value));
          });

          this.terms(termViewModels);
        });
      }
    }
  }
}

/**
 * Term ViewModel
 */
export class TermViewModel extends TermBaseViewModel {
  /**
   * Term emtity
   */
  private entity: ITerm;
  /**
   * Description
   */
  protected description: string;
  /**
   * collection of viewmodels for nested terms
   */
  protected terms: KnockoutObservableArray<TermViewModel>;
  /**
   * Flag if current term has child terms
   */
  protected hasChildTerms: boolean;
  /**
   * Term's  labels
   */
  protected labels: ILabel[];

  /**
   * ctor
   * @param model: taxonomy control model
   * @param entity: entity that is underline current view model
   */
  constructor(model: TaxonomyControlModel, entity: ITerm) {
    super(model, entity);

    this.entity = entity;
    this.description = entity.description;
    this.terms = ko.observableArray<TermViewModel>();
    this.hasChildTerms = entity.termsCount > 0;
    this.labels = entity.labels;
  }

  /**
   * Expand\collapse click handler
   */
  protected actionClick(ev: MouseEvent): void {
    this.isExpanded(!this.isExpanded());

    const isExpanded = this.isExpanded();

    if (isExpanded) {
      const unwrappedTerms = ko.utils.unwrapObservable(this.terms);

      if (!unwrappedTerms || !unwrappedTerms.length) {
        this.model.getChildTerms(this.entity).then((terms) => {
          const termViewModels: TermViewModel[] = [];
          terms.forEach((value) => {
            termViewModels.push(new TermViewModel(this.model, value));
          });

          this.terms(termViewModels);
        });
      }
    }
  }
}