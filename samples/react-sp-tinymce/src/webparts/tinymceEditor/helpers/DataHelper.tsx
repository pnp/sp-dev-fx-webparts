import * as React from 'react';
import { get } from "@microsoft/sp-lodash-subset";
import { Link } from '@fluentui/react/lib/Link';
import PeopleCard from '../components/PeopleCards/PeopleCards';
import { IFieldSchema } from '../model/IFieldSchema';
import { FieldType } from '../model/FieldType';
import { toLocaleDateString, parseDateSafely } from '../utils/DateUtils';
import Tags from '../components/Tags/Tags';



export function renderData(listData: any, selectedColumn: string, listFieldsSchema: IFieldSchema[]): JSX.Element {

  if (!listData) {
    return <span></span>;
  }
  const column: any = listFieldsSchema.find(c => c.staticName === selectedColumn);
  const data = get(listData, column.staticName);

  if (data === undefined || data === null) {
    return <span></span>;
  }
  else {
    switch (column.fieldType) {
      case FieldType.Choice:
      case FieldType.MultiChoice:
        if (data && Array.isArray(data) && data.length) {
          return (
            <div>
              <Tags keywords={data} />
            </div>
          );
        }
        return <span>{data}</span>;
      case FieldType.Note:
        return <span dangerouslySetInnerHTML={{ __html: data.replace(/\n/g, '<br />') }} />;
      case FieldType.DateTime:
        const date = data instanceof Date ? data : parseDateSafely(data);
        return <span>{toLocaleDateString(date)}</span>;
      case FieldType.Number:
        return <span>{data === 0 ? '0' : data}</span>;
      case FieldType.TaxonomyFieldType:
        const keyword = data.Label ? [data.Label] : [];
        return data ? <Tags keywords={keyword} /> : <span> </span>;
      case FieldType.TaxonomyFieldTypeMulti:
        const keywords = data.map((item: any) => item.Label);
        return keywords ? <Tags keywords={keywords} /> : <span> </span>;
      case FieldType.URL:
        const descriptionData = get(data, `${column.staticName}.desc`);
        const description = descriptionData ? descriptionData : data;
        return data ? <Link target={'_blank'} href={data} underline={false} data-interception="off">{description}</Link> : <span> </span>;
      case FieldType.User:
      case FieldType.UserMulti:
        return <PeopleCard users={Array.isArray(data) ? data : []} />;
      case FieldType.Boolean:
        return <span>{data ? 'Yes' : 'No'}</span>;
      default:
        return <span>{data}</span>;
    }
  }
}




