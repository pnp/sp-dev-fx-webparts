import { SPFI } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import '@pnp/sp/fields';
import '@pnp/sp/site-users/web';
import { IActivity, ICompletion } from '../models/IWellbeingModels';

export class WellbeingService {
  private _sp: SPFI;
  private _activitiesListName: string;
  private _completionsListName: string;
  private _currentUserId: number = 0;

  constructor(sp: SPFI, activitiesListName: string, completionsListName: string) {
    this._sp = sp;
    this._activitiesListName = activitiesListName;
    this._completionsListName = completionsListName;
  }

  // Fetch the current user's SP ID once so completions can be scoped per-user.
  public async init(): Promise<void> {
    const user = await this._sp.web.currentUser.select('Id')();
    this._currentUserId = (user as { Id: number }).Id;
  }

  public async getCategories(): Promise<string[]> {
    const field = await this._sp.web.lists
      .getByTitle(this._activitiesListName)
      .fields
      .getByInternalNameOrTitle('Category')
      .select('Choices')();
    return (field as { Choices: string[] }).Choices || [];
  }

  public async getActivities(): Promise<IActivity[]> {
    const items: { Id: number; Title: string; Category: string }[] = await this._sp.web.lists
      .getByTitle(this._activitiesListName)
      .items
      .select('Id', 'Title', 'Category')
      .orderBy('Title')();

    return items.map(item => ({
      id: item.Id,
      title: item.Title,
      category: item.Category as IActivity['category'],
    }));
  }

  public async addActivity(title: string, category: string): Promise<IActivity> {
    const result = await this._sp.web.lists
      .getByTitle(this._activitiesListName)
      .items
      .add({ Title: title, Category: category });

    const data = result as unknown as { Id: number; Title: string; Category: string };
    return { id: data.Id, title: data.Title, category: data.Category as IActivity['category'] };
  }

  // AuthorId filter ensures each user only sees their own completions, not the whole team's.
  public async getCompletions(startDate: Date, endDate: Date): Promise<ICompletion[]> {
    const start = this._toDateKey(startDate);
    const end = this._toDateKey(endDate);

    const items: { Id: number; Title: string; ActivityId: number; CompletionDate: string }[] = await this._sp.web.lists
      .getByTitle(this._completionsListName)
      .items
      .select('Id', 'Title', 'ActivityId', 'CompletionDate')
      .filter(`CompletionDate ge '${start}T00:00:00Z' and CompletionDate le '${end}T00:00:00Z' and AuthorId eq ${this._currentUserId}`)
      .top(500)();

    return items.map(item => ({
      id: item.Id,
      title: item.Title,
      activityId: item.ActivityId,
      completionDate: item.CompletionDate.split('T')[0],
    }));
  }

  public async addCompletion(activityId: number, date: Date, title: string): Promise<ICompletion> {
    const dateStr = this._toDateKey(date);
    const result = await this._sp.web.lists
      .getByTitle(this._completionsListName)
      .items
      .add({ Title: title, ActivityId: activityId, CompletionDate: `${dateStr}T00:00:00Z` });

    const data = result as unknown as { Id: number; CompletionDate: string };
    return {
      id: data.Id,
      title: title,
      activityId: activityId,
      completionDate: data.CompletionDate ? data.CompletionDate.split('T')[0] : dateStr,
    };
  }

  public async removeCompletion(completionId: number): Promise<void> {
    await this._sp.web.lists
      .getByTitle(this._completionsListName)
      .items
      .getById(completionId)
      .delete();
  }

  private _toDateKey(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
}
