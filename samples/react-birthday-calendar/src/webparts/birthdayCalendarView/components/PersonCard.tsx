import * as React from 'react';
import {
  Callout,
  DirectionalHint,
  Persona,
  PersonaSize,
  Spinner,
  SpinnerSize,
  Icon,
  Link,
  DefaultButton
} from '@fluentui/react';
import { SPHttpClient } from '@microsoft/sp-http';
import styles from './BirthdayCalendarView.module.scss';
import type { IBirthday } from '../models/IBirthday';
import type { IUserProfile } from '../models/IUserProfile';
import { UserProfileService } from '../services/UserProfileService';

export interface IPersonCardProps {
  birthday: IBirthday;
  birthdayLabel: string;
  target: HTMLElement | string;
  siteUrl: string;
  spHttpClient: SPHttpClient;
  isDarkTheme: boolean;
  /** The person's pill colour, so the card matches the pill that opened it. */
  accentClassName: string;
  onDismiss: () => void;
}

interface IDetailRow {
  icon: string;
  value: string;
}

const PersonCard: React.FC<IPersonCardProps> = (props: IPersonCardProps) => {
  const {
    birthday,
    birthdayLabel,
    target,
    siteUrl,
    spHttpClient,
    isDarkTheme,
    accentClassName,
    onDismiss
  } = props;

  const [profile, setProfile] = React.useState<IUserProfile | undefined>(undefined);
  const [loading, setLoading] = React.useState<boolean>(!!birthday.loginName);
  const [error, setError] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    if (!birthday.loginName) {
      setLoading(false);
      return;
    }

    let isCancelled = false;
    setLoading(true);
    setError(undefined);

    UserProfileService.getProfile(spHttpClient, siteUrl, birthday.loginName)
      .then((result: IUserProfile) => {
        if (!isCancelled) {
          setProfile(result);
          setLoading(false);
        }
      })
      .catch((err: Error) => {
        if (!isCancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [birthday.loginName, siteUrl, spHttpClient]);

  const email: string | undefined = (profile && profile.email) || birthday.email;

  // Falls back to the email carried on the list item so the photo shows while the
  // profile is still loading, and even if that lookup fails outright.
  const photoUrl: string | undefined =
    (profile && profile.pictureUrl) || UserProfileService.getPhotoUrl(siteUrl, email);

  const displayName: string = (profile && profile.displayName) || birthday.name;
  const firstName: string = displayName.split(' ')[0];
  const greeting: string = `Happy birthday, ${firstName}!`;

  const mailtoHref: string | undefined = email
    ? `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(greeting)}`
    : undefined;
  const teamsHref: string | undefined = email
    ? `https://teams.microsoft.com/l/chat/0/0?users=${encodeURIComponent(email)}` +
      `&message=${encodeURIComponent(greeting)}`
    : undefined;

  const details: IDetailRow[] = [];
  if (profile) {
    if (profile.jobTitle) {
      details.push({ icon: 'Suitcase', value: profile.jobTitle });
    }
    if (profile.department) {
      details.push({ icon: 'Org', value: profile.department });
    }
    if (profile.office) {
      details.push({ icon: 'POI', value: profile.office });
    }
    if (profile.workPhone) {
      details.push({ icon: 'Phone', value: profile.workPhone });
    }
  }

  return (
    <Callout
      target={target}
      directionalHint={DirectionalHint.bottomLeftEdge}
      onDismiss={onDismiss}
      setInitialFocus
      gapSpace={4}
    >
      <div className={`${styles.personCard} ${isDarkTheme ? styles.darkTheme : ''}`}>
        <Persona
          text={displayName}
          secondaryText={profile ? profile.jobTitle : undefined}
          imageUrl={photoUrl}
          size={PersonaSize.size48}
        />

        <div className={`${styles.personCardBirthday} ${accentClassName}`}>
          <Icon iconName="Cake" className={styles.birthdayIcon} />
          <span>{birthdayLabel}</span>
        </div>

        {loading && <Spinner size={SpinnerSize.small} label="Loading profile..." labelPosition="right" />}

        {!loading && details.length > 0 && (
          <div className={styles.personCardDetails}>
            {details.map((detail) => (
              <div key={detail.icon} className={styles.personCardRow}>
                <Icon iconName={detail.icon} className={styles.personCardIcon} />
                <span>{detail.value}</span>
              </div>
            ))}
          </div>
        )}

        {!loading && email && (
          <div className={styles.personCardRow}>
            <Icon iconName="Mail" className={styles.personCardIcon} />
            <Link href={`mailto:${email}`}>{email}</Link>
          </div>
        )}

        {!loading && email && (
          <div className={styles.personCardActions}>
            <DefaultButton
              iconProps={{ iconName: 'Mail' }}
              text="Email"
              title={`Email ${displayName}`}
              href={mailtoHref}
            />
            <DefaultButton
              iconProps={{ iconName: 'TeamsLogo' }}
              text="Teams"
              title={`Send ${displayName} a Teams message`}
              href={teamsHref}
              target="_blank"
            />
          </div>
        )}

        {!loading && !birthday.loginName && (
          <div className={styles.personCardNote}>
            No person column is linked to this entry, so there is no profile to show.
          </div>
        )}

        {!loading && error && <div className={styles.personCardNote}>{error}</div>}

        {!loading && !error && birthday.loginName && details.length === 0 && (
          <div className={styles.personCardNote}>
            This user profile has no department, job title or office set.
          </div>
        )}
      </div>
    </Callout>
  );
};

export default PersonCard;
