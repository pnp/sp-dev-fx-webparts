import * as React from 'react';
import { Button, Input, MessageBar, MessageBarBody, MessageBarTitle, Spinner } from '@fluentui/react-components';
import { IListError, IListField, IListRecord } from '../models/ListModels';
import { getHyperlinkUrl, getRawFieldValue, formatFieldValue } from '../models/ValueFormatting';
import { getVisibleFields } from '../models/FieldMapping';
import { ListService, normalizePageSize } from '../services/ListService';
import styles from './ConfigurableList.module.scss';

export interface IConfigurableListProps {
  service: ListService;
  listTitle: string;
  title: string;
  visibleFields: string;
  pageSize: number;
  defaultSortField: string;
  defaultSortDirection: 'asc' | 'desc';
  enableSearch: boolean;
  webUrl: string;
}

interface IErrorState extends IListError {
  retry: () => void;
}

function classifyError(error: unknown): IListError {
  const candidate = error as { status?: number; statusCode?: number; message?: string };
  const status = candidate && (candidate.status || candidate.statusCode);
  if (status === 401 || status === 403) {
    return { kind: 'permission', message: 'You do not have permission to read this list.' };
  }
  if (status === 429 || status === 503 || /throttl/i.test(candidate && candidate.message || '')) {
    return { kind: 'throttled', message: 'SharePoint is temporarily limiting requests. Please retry in a moment.' };
  }
  return { kind: 'generic', message: 'The list could not be loaded. Please check the list title and try again.' };
}

function FieldValue({ field, record, webUrl }: { field: IListField; record: IListRecord; webUrl: string }): React.ReactElement {
  const value = getRawFieldValue(record, field);
  const formatted = formatFieldValue(value, field.kind);
  if (field.kind === 'hyperlink') {
    const url = getHyperlinkUrl(value, webUrl);
    return url ? <a className={styles.itemLink} href={url} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()}>{formatted}</a> : <>{formatted}</>;
  }
  return <>{formatted}</>;
}

function SortHeader({ field, active, ascending, onSort }: { field: IListField; active: boolean; ascending: boolean; onSort: () => void }): React.ReactElement {
  return (
    <th scope="col" aria-sort={active ? ascending ? 'ascending' : 'descending' : 'none'}>
      <button type="button" className={styles.sortButton} onClick={onSort} aria-label={`Sort by ${field.title}`}>
        {field.title}{active ? ascending ? ' ▲' : ' ▼' : ''}
      </button>
    </th>
  );
}

export default function ConfigurableList(props: IConfigurableListProps): React.ReactElement {
  const [fields, setFields] = React.useState<IListField[]>([]);
  const [records, setRecords] = React.useState<IListRecord[]>([]);
  const [page, setPage] = React.useState(0);
  const [hasNext, setHasNext] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [selectedId, setSelectedId] = React.useState<number | undefined>();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<IErrorState | undefined>();
  const [ascending, setAscending] = React.useState(props.defaultSortDirection !== 'desc');
  const [sortField, setSortField] = React.useState(props.defaultSortField);
  const [reloadVersion, setReloadVersion] = React.useState(0);

  const visibleFields = React.useMemo(() => getVisibleFields(fields, props.visibleFields), [fields, props.visibleFields]);
  const loadFields = React.useCallback(() => {
    let mounted = true;
    setLoading(true);
    setError(undefined);
    props.service.getFields(props.listTitle).then((nextFields) => {
      if (mounted) {
        setFields(nextFields);
        setPage(0);
        if (!nextFields.length) {
          setLoading(false);
        }
      }
    }).catch((reason) => {
      if (mounted) {
        setError({ ...classifyError(reason), retry: () => setReloadVersion((current) => current + 1) });
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, [props.service, props.listTitle]);

  React.useEffect(() => loadFields(), [loadFields, reloadVersion]);

  React.useEffect(() => {
    if (!fields.length) {
      return undefined;
    }
    let mounted = true;
    setLoading(true);
    setError(undefined);
    props.service.getPage({
      listTitle: props.listTitle,
      webUrl: props.webUrl,
      visibleFields: props.visibleFields,
      defaultSortField: sortField,
      ascending,
      pageSize: normalizePageSize(props.pageSize),
      page,
      search
    }, fields).then((result) => {
      if (mounted) {
        setRecords(result.records);
        setHasNext(result.hasNext);
        setLoading(false);
      }
    }).catch((reason) => {
      if (mounted) {
        setError({ ...classifyError(reason), retry: () => setReloadVersion((current) => current + 1) });
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, [ascending, fields, page, props.listTitle, props.pageSize, props.service, props.visibleFields, props.webUrl, reloadVersion, search, sortField]);

  const runSearch = (): void => {
    setSearch(searchInput.trim());
    setPage(0);
  };

  const chooseSort = (field: IListField): void => {
    setPage(0);
    if (sortField.toLowerCase() === field.internalName.toLowerCase()) {
      setAscending((current) => !current);
    } else {
      setSortField(field.internalName);
      setAscending(true);
    }
  };

  const selectRecord = (record: IListRecord): void => setSelectedId(record.id);
  return (
    <section className={styles.root} aria-label={props.title || props.listTitle}>
      {props.title && <h2>{props.title}</h2>}
      {props.enableSearch && (
        <div className={styles.toolbar}>
          <div className={styles.search} role="search">
            <Input value={searchInput} onChange={(_, data) => setSearchInput(data.value)} onKeyDown={(event) => { if (event.key === 'Enter') runSearch(); }} aria-label="Search list" placeholder="Search this list" />
            <Button appearance="primary" onClick={runSearch}>Search</Button>
          </div>
          {search && <Button appearance="subtle" onClick={() => { setSearchInput(''); setSearch(''); setPage(0); }}>Clear</Button>}
        </div>
      )}
      {error && (
        <MessageBar intent="error">
          <MessageBarTitle>{error.kind === 'permission' ? 'Access denied' : error.kind === 'throttled' ? 'Request limited' : 'Unable to load list'}</MessageBarTitle>
          <MessageBarBody>{error.message} <Button appearance="subtle" onClick={error.retry}>Retry</Button></MessageBarBody>
        </MessageBar>
      )}
      {loading && <div className={styles.status}><Spinner label="Loading list" /></div>}
      {!loading && !error && !records.length && <div className={styles.status}>No records found.</div>}
      {!loading && !error && records.length > 0 && (
        <>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead><tr>{visibleFields.map((field) => <SortHeader key={field.internalName} field={field} active={sortField.toLowerCase() === field.internalName.toLowerCase()} ascending={ascending} onSort={() => chooseSort(field)} />)}<th scope="col">Open</th></tr></thead>
              <tbody>{records.map((record) => <tr key={record.id} className={selectedId === record.id ? styles.selected : undefined} aria-selected={selectedId === record.id} tabIndex={0} onClick={() => selectRecord(record)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectRecord(record); } }}>{visibleFields.map((field) => <td key={`${record.id}-${field.internalName}`}><FieldValue field={field} record={record} webUrl={props.webUrl} /></td>)}<td><a className={styles.itemLink} href={record.url} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()}>Open</a></td></tr>)}</tbody>
            </table>
          </div>
          <div className={styles.cardList}>{records.map((record) => <div role="button" tabIndex={0} key={record.id} className={`${styles.card} ${selectedId === record.id ? styles.selected : ''}`} aria-pressed={selectedId === record.id} onClick={() => selectRecord(record)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectRecord(record); } }}>{visibleFields.map((field) => <div className={styles.cardField} key={`${record.id}-${field.internalName}`}><span className={styles.fieldName}>{field.title}</span><span><FieldValue field={field} record={record} webUrl={props.webUrl} /></span></div>)}<a className={styles.itemLink} href={record.url} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()}>Open item</a></div>)}</div>
          <div className={styles.pager} aria-label="List pages"><Button disabled={page === 0 || loading} onClick={() => setPage((current) => Math.max(0, current - 1))}>Previous</Button><span aria-live="polite">Page {page + 1}</span><Button disabled={!hasNext || loading} onClick={() => setPage((current) => current + 1)}>Next</Button></div>
        </>
      )}
    </section>
  );
}
