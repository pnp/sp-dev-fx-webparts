import { SPFI, spfi, SPFx } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import {
  IGlossaryItem,
  IGlossaryListItem,
  GlossaryStatus
} from '../models/IGlossaryItem';

export class GlossaryService {
  private sp: SPFI;
  private listName: string;

  private static readonly MAX_ITEMS = 4500;

  constructor(context: WebPartContext, listName: string) {
    this.sp = spfi().using(SPFx(context));
    this.listName = listName;
  }

  public async getActiveGlossaryItems(): Promise<IGlossaryItem[]> {
    const rawItems: IGlossaryListItem[] = await this.sp.web.lists
      .getByTitle(this.listName)
      .items.select(
        'Id',
        'Title',
        'Description',
        'ApplicationUrl',
        'DetailsUrl',
        'Status',
        'AlphabetLetter',
        'Modified'
      )
      .filter(`Status eq '${GlossaryStatus.Active}'`)
      .orderBy('AlphabetLetter', true)
      .orderBy('Title', true)
      .top(GlossaryService.MAX_ITEMS)();

    if (rawItems.length === GlossaryService.MAX_ITEMS) {
      // eslint-disable-next-line no-console
      console.warn(
        `[ModernGlossary] Retrieved ${GlossaryService.MAX_ITEMS} items — the list may contain ` +
        `more Active items than this single request returns. Consider implementing paging.`
      );
    }

    return rawItems.map(this.mapToViewModel);
  }

  public async getAllGlossaryItems(): Promise<IGlossaryItem[]> {
    const rawItems: IGlossaryListItem[] = await this.sp.web.lists
      .getByTitle(this.listName)
      .items.select(
        'Id',
        'Title',
        'Description',
        'ApplicationUrl',
        'DetailsUrl',
        'Status',
        'AlphabetLetter',
        'Modified'
      )
      .orderBy('AlphabetLetter', true)
      .orderBy('Title', true)
      .top(GlossaryService.MAX_ITEMS)();

    return rawItems.map(this.mapToViewModel);
  }

  public async createItem(item: Omit<IGlossaryItem, 'id'>): Promise<number> {
    const result = await this.sp.web.lists
      .getByTitle(this.listName)
      .items.add(this.toSPFields(item));
    return result.Id;
  }

  public async updateItem(id: number, item: Omit<IGlossaryItem, 'id'>): Promise<void> {
    await this.sp.web.lists
      .getByTitle(this.listName)
      .items.getById(id)
      .update(this.toSPFields(item));
  }

  public async deleteItem(id: number): Promise<void> {
    await this.sp.web.lists
      .getByTitle(this.listName)
      .items.getById(id)
      .delete();
  }

  private toSPFields(item: Omit<IGlossaryItem, 'id'>): Record<string, unknown> {
    const fields: Record<string, unknown> = {
      Title: item.title,
      Description: item.description,
      Status: item.status,
      AlphabetLetter: item.alphabetLetter
    };

    if (item.applicationUrl) {
      fields.ApplicationUrl = {
        Url: item.applicationUrl,
        Description: item.applicationUrlLabel ?? item.applicationUrl
      };
    }

    if (item.detailsUrl) {
      fields.DetailsUrl = {
        Url: item.detailsUrl,
        Description: item.detailsUrlLabel ?? item.detailsUrl
      };
    }

    return fields;
  }

  private mapToViewModel = (item: IGlossaryListItem): IGlossaryItem => {
    return {
      id: item.Id,
      title: item.Title ?? '',
      description: item.Description ?? '',
      applicationUrl: item.ApplicationUrl?.Url ?? null,
      applicationUrlLabel: item.ApplicationUrl?.Description ?? null,
      detailsUrl: item.DetailsUrl?.Url ?? null,
      detailsUrlLabel: item.DetailsUrl?.Description ?? null,
      alphabetLetter: (item.AlphabetLetter ?? '').toUpperCase(),
      status: item.Status === GlossaryStatus.Active
        ? GlossaryStatus.Active
        : GlossaryStatus.Inactive
    };
  };
}