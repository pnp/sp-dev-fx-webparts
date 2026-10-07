import * as React from 'react';
import {
  Panel,
  PanelType,
  Persona,
  PersonaSize,
  Icon,
  DefaultButton,
  Link
} from '@fluentui/react';
import styles from './TeamAvailabilityCalendar.module.scss';
import type { IAbsence } from '../models/IAbsence';
import { formatDateRange } from '../utils/calendarUtils';
import { getPhotoUrl, mailtoHref, teamsChatHref } from '../utils/people';
import { getTypeColor, getTypeIcon, getTypeLabel } from './absenceTypeVisuals';

export interface IAbsenceDetailsPanelProps {
  title: string;
  absences: IAbsence[];
  siteUrl: string;
  locale: string;
  isDarkTheme: boolean;
  onDismiss: () => void;
}

const AbsenceDetailsPanel: React.FC<IAbsenceDetailsPanelProps> = (props) => {
  const { title, absences, siteUrl, locale, isDarkTheme, onDismiss } = props;

  return (
    <Panel
      isOpen
      onDismiss={onDismiss}
      type={PanelType.smallFixedFar}
      headerText={title}
      closeButtonAriaLabel="Close"
    >
      <ul className={`${styles.detailsList} ${isDarkTheme ? styles.darkTheme : ''}`}>
        {absences.map((absence) => {
          const firstName: string = absence.employeeName.split(' ')[0];
          const email: string | undefined = absence.employeeEmail;
          const color = getTypeColor(absence.type, isDarkTheme);

          return (
            <li key={absence.id} className={styles.detailsItem}>
              <Persona
                text={absence.employeeName}
                imageUrl={getPhotoUrl(siteUrl, email, 'M')}
                size={PersonaSize.size40}
                secondaryText={getTypeLabel(absence.type)}
              />

              <div className={styles.detailsMeta}>
                <span
                  className={styles.detailsTypeTag}
                  style={{ background: color.bg, borderColor: color.border, color: color.text }}
                >
                  <Icon iconName={getTypeIcon(absence.type)} className={styles.detailsIcon} />
                  {getTypeLabel(absence.type)}
                </span>
                <span>{formatDateRange(absence.start, absence.end, locale)}</span>
              </div>

              {absence.notes && <p className={styles.detailsNotes}>{absence.notes}</p>}

              {email && (
                <div className={styles.detailsActions}>
                  <DefaultButton
                    iconProps={{ iconName: 'Mail' }}
                    text="Email"
                    title={`Email ${absence.employeeName}`}
                    href={mailtoHref(email, `Hi ${firstName}`)}
                  />
                  <DefaultButton
                    iconProps={{ iconName: 'TeamsLogo' }}
                    text="Teams"
                    title={`Message ${absence.employeeName} in Teams`}
                    href={teamsChatHref(email)}
                    target="_blank"
                  />
                </div>
              )}

              {email && (
                <div className={styles.detailsMeta}>
                  <Icon iconName="Mail" className={styles.detailsIcon} />
                  <Link href={mailtoHref(email, `Hi ${firstName}`)}>{email}</Link>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </Panel>
  );
};

export default AbsenceDetailsPanel;
