import * as React from 'react';
import styles from '../TicketingDashboard.module.scss';
import {
  TicketPriority,
  TicketStatus,
  TicketCategory,
  TicketEnvironment,
  TicketSeverity,
  TicketRootCause
} from '../TicketingDashboard';
import { ITicketFormData } from '../ITicketFormData';
import { PeoplePicker, PrincipalType } from '@pnp/spfx-controls-react/lib/PeoplePicker';
import { DateTimePicker, DateConvention } from '@pnp/spfx-controls-react/lib/DateTimePicker';
import { TextField } from '@fluentui/react/lib/TextField';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { SpinButton } from '@fluentui/react/lib/SpinButton';


export interface INewTicketViewProps {
  onSubmit: (e: React.FormEvent, formData: ITicketFormData) => void;
  context: any; // SharePoint context for PeoplePicker
}

export const NewTicketView: React.FC<INewTicketViewProps> = (props): React.ReactElement => {
  const { onSubmit, context } = props;

  // Basic fields
  const [subject, setSubject] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [priority, setPriority] = React.useState<TicketPriority>(TicketPriority.Normal);
  const [status, setStatus] = React.useState<TicketStatus>(TicketStatus.Open);
  const [assignedToId, setAssignedToId] = React.useState<number | undefined>(undefined);
  const [dueDate, setDueDate] = React.useState<Date | undefined>(undefined);

  // Additional fields
  const [category, setCategory] = React.useState<TicketCategory | undefined>(undefined);
  const [environment, setEnvironment] = React.useState<TicketEnvironment | undefined>(undefined);
  const [stepsToReproduce, setStepsToReproduce] = React.useState<string>('');
  const [expectedResult, setExpectedResult] = React.useState<string>('');
  const [actualResult, setActualResult] = React.useState<string>('');
  const [affectedVersion, setAffectedVersion] = React.useState<string>('');

  // Advanced fields - initially collapsed
  const [showAdvanced, setShowAdvanced] = React.useState<boolean>(false);
  const [severity, setSeverity] = React.useState<TicketSeverity | undefined>(undefined);
  const [rootCause, setRootCause] = React.useState<TicketRootCause | undefined>(undefined);
  const [timeSpent, setTimeSpent] = React.useState<number>(0);
  const [release, setRelease] = React.useState<string>('');

  const handleSubmit = (e: React.FormEvent): void => {
    const formData: ITicketFormData = {
      subject,
      description,
      priority,
      status,
      assignedToId,
      dueDate,
      category,
      environment,
      stepsToReproduce,
      expectedResult,
      actualResult,
      affectedVersion,
      severity,
      rootCause,
      timeSpent: timeSpent > 0 ? timeSpent : undefined,
      release: release || undefined,
      resolution: undefined,
      resolutionDate: undefined,
      regressionTestStatus: undefined,
      attachments: undefined,
    };

    onSubmit(e, formData);
  };

  // Helper function to convert enum to dropdown options
  const enumToOptions = (enumObject: any): IDropdownOption[] => {
    return Object.keys(enumObject).map(key => ({
      key: enumObject[key],
      text: enumObject[key]
    }));
  };

  // PeoplePicker selection handler
  const getPeoplePickerItems = (items: any[]): void => {
    if (items && items.length > 0) {
      setAssignedToId(items[0].id); // Use as a number
    } else {
      setAssignedToId(undefined);
    }
  };

  return (
    <div id="new-ticket" className={styles.view}>
      <div className={styles.header}>
        <h1>Submit a Defect</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.ticketForm}>
        <h2>Essential Information</h2>

        <TextField
          label="Subject"
          required
          value={subject}
          onChange={(_, newValue?: string): void => setSubject(newValue || '')}
        />

        <TextField
          label="Description"
          multiline
          rows={4}
          required
          value={description}
          onChange={(_, newValue?: string): void => setDescription(newValue || '')}
        />

        <Dropdown
          label="Priority"
          required
          options={enumToOptions(TicketPriority)}
          selectedKey={priority}
          onChange={(_, option?: IDropdownOption): void =>
            option && setPriority(option.key as TicketPriority)
          }
        />

        <Dropdown
          label="Status"
          required
          options={enumToOptions(TicketStatus)}
          selectedKey={status}
          onChange={(_, option?: IDropdownOption): void =>
            option && setStatus(option.key as TicketStatus)
          }
        />

        <div className={styles.formGroup}>
          <label htmlFor="assigned-to">Assigned To</label>
          <PeoplePicker
            context={context}
            personSelectionLimit={1}
            principalTypes={[PrincipalType.User]}
            resolveDelay={1000}
            onChange={getPeoplePickerItems}
          />
        </div>

        <div className={styles.formGroup}>
          <DateTimePicker
            label="Due Date"
            dateConvention={DateConvention.Date}
            value={dueDate}
            onChange={(date?: Date): void => setDueDate(date)}
          />
        </div>

        <h2>Additional Information</h2>

        <Dropdown
          label="Category"
          options={enumToOptions(TicketCategory)}
          selectedKey={category}
          onChange={(_, option?: IDropdownOption): void =>
            option && setCategory(option.key as TicketCategory)
          }
        />

        <Dropdown
          label="Environment"
          options={enumToOptions(TicketEnvironment)}
          selectedKey={environment}
          onChange={(_, option?: IDropdownOption): void =>
            option && setEnvironment(option.key as TicketEnvironment)
          }
        />

        <TextField
          label="Steps to Reproduce"
          multiline
          rows={3}
          value={stepsToReproduce}
          onChange={(_, newValue?: string): void => setStepsToReproduce(newValue || '')}
        />

        <TextField
          label="Expected Result"
          multiline
          rows={2}
          value={expectedResult}
          onChange={(_, newValue?: string): void => setExpectedResult(newValue || '')}
        />

        <TextField
          label="Actual Result"
          multiline
          rows={2}
          value={actualResult}
          onChange={(_, newValue?: string): void => setActualResult(newValue || '')}
        />

        <TextField
          label="Affected Version"
          value={affectedVersion}
          onChange={(_, newValue?: string): void => setAffectedVersion(newValue || '')}
        />

        {/* Toggle advanced fields */}
        <div className={styles.advancedToggle}>
          <button
            type="button"
            onClick={(): void => setShowAdvanced(!showAdvanced)}
            className={styles.linkButton}
          >
            {showAdvanced ? '- Hide Advanced Fields' : '+ Show Advanced Fields'}
          </button>
        </div>

        {showAdvanced && (
          <div className={styles.advancedFields}>
            <h2>Advanced Information</h2>

            <Dropdown
              label="Severity"
              options={enumToOptions(TicketSeverity)}
              selectedKey={severity}
              onChange={(_, option?: IDropdownOption): void =>
                option && setSeverity(option.key as TicketSeverity)
              }
            />

            <Dropdown
              label="Root Cause"
              options={enumToOptions(TicketRootCause)}
              selectedKey={rootCause}
              onChange={(_, option?: IDropdownOption): void =>
                option && setRootCause(option.key as TicketRootCause)
              }
            />

            <SpinButton
              label="Time Spent (Hours)"
              min={0}
              max={1000}
              step={0.5}
              value={timeSpent.toString()}
              onChange={(_, newValue?: string): void => {
                if (newValue) {
                  const parsedValue = parseFloat(newValue);
                  if (!isNaN(parsedValue)) {
                    setTimeSpent(parsedValue);
                  }
                }
              }}
            />

            <TextField
              label="Release"
              value={release}
              onChange={(_, newValue?: string): void => setRelease(newValue || '')}
            />
          </div>
        )}

        <div className={styles.formActions}>
          <button className={styles.btn} type="submit">Submit Defect</button>
          <button
            className={`${styles.btn} ${styles.btnSecondary}`}
            type="button"
            onClick={(): void => props.onSubmit(new Event('cancel') as any, {} as ITicketFormData)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};