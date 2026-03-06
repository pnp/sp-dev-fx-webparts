import * as React from 'react';
import type { ITask, ILink, TID } from '@svar-ui/react-gantt';
import { SPHttpClient } from '@microsoft/sp-http';
import type { IGanttFieldMappings } from '../PropertyFields/GanttListPickerPropertyField';

interface ISharePointGanttDataResult {
  tasks: ITask[];
  links: ILink[];
  isLoading: boolean;
  error: string | undefined;
}

function buildSelectFields(fm: IGanttFieldMappings): string {
  const fields = new Set<string>(['Id', fm.text, fm.start, fm.duration]);
  if (fm.progress) fields.add(fm.progress);
  if (fm.type) fields.add(fm.type);
  if (fm.parent) fields.add(fm.parent);
  if (fm.end) fields.add(fm.end);
  return Array.from(fields).join(',');
}

function mapItemToTask(item: Record<string, unknown>, fm: IGanttFieldMappings): ITask {
  const task: ITask = {
    id: item.Id as number,
    text: (item[fm.text] as string) ?? '',
    start: item[fm.start] ? new Date(item[fm.start] as string) : new Date(),
    duration: (item[fm.duration] as number) ?? 1,
  };
  if (fm.progress && item[fm.progress] !== undefined && item[fm.progress] !== null) {
    task.progress = item[fm.progress] as number;
  }
  if (fm.type && item[fm.type]) {
    task.type = item[fm.type] as string;
  }
  if (fm.parent && item[fm.parent] !== undefined && item[fm.parent] !== null) {
    task.parent = item[fm.parent] as TID;
  }
  if (fm.end && item[fm.end]) {
    task.end = new Date(item[fm.end] as string);
  }
  return task;
}

/** Sets open: true only on tasks that have children (avoids SVAR crash on leaf nodes) */
function expandParents(tasks: ITask[]): void {
  const parentIds = new Set<number>();
  for (const t of tasks) {
    if (t.parent !== undefined && t.parent !== null) {
      parentIds.add(t.parent as number);
    }
  }
  for (const t of tasks) {
    if (t.id !== undefined && parentIds.has(t.id as number)) {
      t.open = true;
    }
  }
}

/** Derives finish-to-start (e2s) links from parent relationships */
function deriveLinks(tasks: ITask[]): ILink[] {
  const links: ILink[] = [];
  let linkId = 1;
  for (const t of tasks) {
    if (t.parent !== undefined && t.parent !== null) {
      links.push({ id: linkId++, source: t.parent as number, target: t.id as number, type: 'e2s' });
    }
  }
  return links;
}

export function useSharePointGanttData(
  spHttpClient: SPHttpClient | undefined,
  siteUrl: string | undefined,
  listId: string | undefined,
  fieldMappings: IGanttFieldMappings | undefined
): ISharePointGanttDataResult {
  const [tasks, setTasks] = React.useState<ITask[]>([]);
  const [links, setLinks] = React.useState<ILink[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    if (!spHttpClient || !siteUrl || !listId || !fieldMappings?.text || !fieldMappings?.start || !fieldMappings?.duration) {
      return;
    }

    const selectStr = buildSelectFields(fieldMappings);
    const url = `${siteUrl}/_api/web/lists(guid'${listId}')/items?$select=${selectStr}&$top=5000&$orderby=Id`;

    setIsLoading(true);
    setError(undefined);

    spHttpClient
      .get(url, SPHttpClient.configurations.v1)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to fetch list items: ${response.statusText}`);
        return response.json();
      })
      .then((json) => {
        const items: Record<string, unknown>[] = json.value;
        const mappedTasks = items.map((item) => mapItemToTask(item, fieldMappings));
        expandParents(mappedTasks);
        setTasks(mappedTasks);
        setLinks(fieldMappings.parent ? deriveLinks(mappedTasks) : []);
        setIsLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [spHttpClient, siteUrl, listId, fieldMappings]);

  return { tasks, links, isLoading, error };
}
