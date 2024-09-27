import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';
import Moment from 'moment-timezone';
import moment from 'moment';
import { Refiner, humanizeRecurrencePattern } from 'model';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react';
import { Humanize as _strings } from 'ComponentStrings';
import { EventOccurrence } from 'model';
import { renderSanitizedHTML } from "common/components/LiveUtils";
interface IExportToExcelProps {
  items: any[];
  _refiners:readonly Refiner[]
}

const ExportToExcel: React.FC<any> = forwardRef(( props: IExportToExcelProps, ref ) => {
  const { _refiners } = props;
  const items = [...props.items].sort(EventOccurrence.StartAscComparer)
  const tableRef = useRef<HTMLTableElement>(null);
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Event Details',
    sheet: 'Events',
  });

  useImperativeHandle(ref, () => ({
    handleExportExcel
  }));

  const handleExportExcel = () => {
    if (onDownload) {
      onDownload();
    }
  };

  const getUniqueEtags = (items: any[]) => {
    const etags = items.flatMap(item => item.refinerValues.state.map((rv: any) => rv.etag));
    return Array.from(new Set(etags));
  };

  const renderRefinerValues = (item: any, refiner:any) => {  
    const matchingDisplayNames = item.refinerValues.state
    .filter((refinerItem: any) => 
        refiner.values.state.some((valueItem: any) => valueItem.id === refinerItem.id))
      .map((matchingItem: any) => matchingItem.displayName)
      .join('; ');
    return <span>{matchingDisplayNames}</span>;
  };
  const uniqueEtags = getUniqueEtags(items);

  const formatDate = (date: any) => {
    return moment(date).format('MM-DD-YYYY HH:mm');
  };

  return (
    <div>
      <table ref={tableRef} style={{ borderCollapse: 'collapse', border: '1px solid black', display: 'none' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#4CC9E4' }}>Name</th>
            <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#4CC9E4' }}>Start Time</th>
            <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#4CC9E4' }}>End Time</th>
            <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#4CC9E4' }}>Description</th>
            <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#4CC9E4' }}>Is Recurring</th>
            <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#4CC9E4' }}>All Day Event</th>
            {_refiners.map((refiner, index) => (
              <th key={index} style={{ border: '1px solid black', padding: '8px', backgroundColor: '#4CC9E4' }}>{refiner.displayName}</th>
            ))}
            <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#4CC9E4' }}>Location</th>
            <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#4CC9E4' }}>Tag</th>
            <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#4CC9E4' }}>Is Rejected</th>
            <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#4CC9E4' }}>Event Contacts</th>            
            <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#4CC9E4' }}>Is Confidential</th>
            <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#4CC9E4' }}>Is Approved</th>
            <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#4CC9E4' }}>Title</th>
            <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#4CC9E4' }}>Recurrence</th>
            <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#4CC9E4' }}>Created</th>
            <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#4CC9E4' }}>Created By</th>
            <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#4CC9E4' }}>Modified</th>
            <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#4CC9E4' }}>Modified By</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.title}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{formatDate(item.start)}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{formatDate(item.end)}</td>
              <td style={{ border: '1px solid black', padding: '8px' }} dangerouslySetInnerHTML={{ __html: renderSanitizedHTML(item.description) }}></td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.isRecurring ? 'Yes' : 'No'}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.isAllDay ? 'Yes' : 'No'}</td>
              {_refiners.map((refiner, index) => (
                <td key={index} style={{ border: '1px solid black', padding: '8px' }}>{renderRefinerValues(item, refiner)}</td>
              ))}
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.location}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.tag}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.isRejected ? 'Yes' : 'No'}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                {item.contacts.map((contact:any, index:any) => (
                  <span key={index}>
                    {contact.title ? contact.title : contact.email}
                    {index < item.contacts.length - 1 ? '; ' : ''}
                  </span>
                ))}
              </td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.isConfidential ? 'Yes' : 'No'}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.isApproved ? 'Yes' : 'No'}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.title}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                {item.isRecurring?(item.isAllDay ? 
                `${_strings.AllDay}, ${humanizeRecurrencePattern(item.getSeriesMaster().start, item.recurrence)}`
                 : `${item.getSeriesMaster().start.format('LT')} - ${item.getSeriesMaster().end.format('LT')}, ${humanizeRecurrencePattern(item.getSeriesMaster().start, item.recurrence)}`):null}
              </td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.created.format('MMM D, YYYY')}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.createdBy ? (item.createdBy.title ? item.createdBy.title : (item.createdBy.email ? item.createdBy.email : '')) : ''}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.modified.format('MMM D, YYYY')}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.modifiedBy ? (item.modifiedBy.title ? item.modifiedBy.title : (item.modifiedBy.email ? item.modifiedBy.email : '')) : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default ExportToExcel;

