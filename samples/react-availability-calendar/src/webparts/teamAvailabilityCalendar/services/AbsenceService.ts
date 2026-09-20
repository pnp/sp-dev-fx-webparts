import { WebPartContext } from '@microsoft/sp-webpart-base';
import { spfi, SPFI, SPFx } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import '@pnp/sp/fields';

import { IAbsence } from '../models/IAbsence';
import { addDays } from '../utils/calendarUtils';
import { parseSpDateOnly } from '../utils/spDate';

/** Internal names of the five list columns the web part reads. */
export interface IAbsenceFieldMap {
  employee: string;
  type: string;
  start: string;
  end: string;
  notes: string;
}

interface ISPUserValue {
  Title?: string;
  EMail?: string;
  Name?: string;
}

/** How many list rows a single month view will read. Team absence lists are small;
 *  the cap only exists so a mis-pointed list cannot pull an unbounded response. */
const MAX_ITEMS = 5000;

function resolveLogin(user: ISPUserValue | undefined): string | undefined {
  if (!user) {
    return undefined;
  }
  if (user.Name) {
    return user.Name;
  }
  return user.EMail ? `i:0#.f|membership|${user.EMail}` : undefined;
}

export class AbsenceService {
  private readonly _sp: SPFI;

  public constructor(context: WebPartContext) {
    this._sp = spfi().using(SPFx(context));
  }

  /**
   * The declared choices of the absence-type column, in list order, so the legend
   * can show every category the list allows even before anyone has used it.
   * Returns an empty array if the field is not a Choice column or cannot be read.
   */
  public async getTypeChoices(listTitle: string, typeFieldInternalName: string): Promise<string[]> {
    try {
      const field: { Choices?: string[] } = await this._sp.web.lists
        .getByTitle(listTitle)
        .fields.getByInternalNameOrTitle(typeFieldInternalName)
        .select('Choices')();
      return Array.isArray(field.Choices) ? field.Choices : [];
    } catch (err) {
      console.warn('[TeamAvailabilityCalendar] Could not read the absence-type choices.', err);
      return [];
    }
  }

  /**
   * Reads every absence that overlaps `[rangeStart, rangeEnd]`. The range is
   * widened a day each side so a time-zone skew on the server filter cannot drop
   * an entry that starts or ends on the boundary; the caller clips to the grid.
   */
  public async getAbsences(
    listTitle: string,
    fields: IAbsenceFieldMap,
    rangeStart: Date,
    rangeEnd: Date
  ): Promise<IAbsence[]> {
    const { employee, type, start, end, notes } = fields;
    const from: string = addDays(rangeStart, -1).toISOString();
    const to: string = addDays(rangeEnd, 1).toISOString();
    const filter: string = `${start} le '${to}' and ${end} ge '${from}'`;

    const baseSelect: string[] = ['Id', type, start, end, notes];
    const items: Record<string, unknown>[] = await this._queryWithPersonFallback(
      listTitle,
      employee,
      baseSelect,
      filter,
      start
    );

    const absences: IAbsence[] = [];
    for (const item of items) {
      const startDate: Date | undefined = parseSpDateOnly(item[start] as string);
      if (!startDate) {
        continue;
      }
      const endDate: Date = parseSpDateOnly(item[end] as string) || startDate;
      const user: ISPUserValue | undefined = item[employee] as ISPUserValue | undefined;

      absences.push({
        id: item.Id as number,
        employeeName: (user && user.Title) || 'Unknown',
        employeeEmail: user ? user.EMail : undefined,
        employeeLogin: resolveLogin(user),
        type: (item[type] as string) || 'Other',
        start: startDate,
        // Guard against an end that was entered before the start.
        end: endDate.getTime() < startDate.getTime() ? startDate : endDate,
        notes: (item[notes] as string) || undefined
      });
    }

    return absences;
  }

  /**
   * Runs the query with the Person column expanded, and retries without it if that
   * fails - a wrong column name should still let the dates render, just without
   * photos or Email/Teams actions.
   */
  private async _queryWithPersonFallback(
    listTitle: string,
    employee: string,
    baseSelect: string[],
    filter: string,
    orderByField: string
  ): Promise<Record<string, unknown>[]> {
    const list = this._sp.web.lists.getByTitle(listTitle);
    const expandedSelect: string[] = [
      ...baseSelect,
      `${employee}/Title`,
      `${employee}/EMail`,
      `${employee}/Name`
    ];

    try {
      return await list.items
        .select(...expandedSelect)
        .expand(employee)
        .filter(filter)
        .orderBy(orderByField, true)
        .top(MAX_ITEMS)();
    } catch (err) {
      console.warn(
        `[TeamAvailabilityCalendar] Could not expand person column "${employee}"; ` +
          `showing absences without profile details.`,
        err
      );
      return list.items
        .select(...baseSelect)
        .filter(filter)
        .orderBy(orderByField, true)
        .top(MAX_ITEMS)();
    }
  }
}
