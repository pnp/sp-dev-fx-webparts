import * as React from 'react';
import { CommandBar, DatePicker, DialogContent, PersonaSize, Spinner, SpinnerSize, Stack } from '@fluentui/react';
import { IDataProvider } from '../providers/DataProvider';
import { Version } from './Version';
import useVersions from '../hooks/useVersion';
import { IVersionsFilter } from '../models/IVersionsFilter';
import useObject from '../hooks/useObject';
import useFileInfo from '../hooks/useFileInfo';
import { PeoplePicker } from './PeoplePicker';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import styles from './BetterVersionHistory.module.scss';
import { FieldUser } from './FieldUserPerson';

export interface IBetterVersionHistoryProps {
  provider: IDataProvider;
}

export const BetterVersionHistory: React.FunctionComponent<IBetterVersionHistoryProps> = (props: React.PropsWithChildren<IBetterVersionHistoryProps>) => {
  const [filters, setFilters] = useObject<IVersionsFilter>({});
  const { versions, isLoading: isLoadingVersions } = useVersions(props.provider, filters)
  const { fileInfo } = useFileInfo(props.provider);
  const [selectedVersions, setSelectedVersions] = React.useState<number[]>([]);


  if (isLoadingVersions) return (<Spinner label='Loading versions...' size={SpinnerSize.large} />);
  return (
    <DialogContent styles={{ content: { maxHeight: "60vh", width: "60vw", overflowY: "scroll" } }} title={fileInfo?.Name ?? 'Modern version history'}>
      <CommandBar
        items={[
          {
            key: "ShowSelectedVersions",
            text: 'Compare selected versions',
            disabled: selectedVersions.length === 0,
            iconProps: { iconName: 'BranchCompare' },
            onClick: () => { setFilters({ VersionNumbers: selectedVersions }) }
          }, {
            key: "ClearSelectedVersions",
            text: "Clear selection",
            disabled: selectedVersions.length === 0,
            iconProps: { iconName: 'Clear' },
            // ES-lint-disable-next-line
            onClick: () => { setSelectedVersions([]); setFilters({ VersionNumbers: [] }) }
          }
        ]}
      />
      <Stack horizontal tokens={{ childrenGap: 10 }}>
        <DatePicker label='Start date' value={filters.StartDate} onSelectDate={date => setFilters({ StartDate: date })} styles={{ root: { flexGrow: 1 } }} />
        <DatePicker label='End date' value={filters.EndDate} onSelectDate={date => setFilters({ EndDate: date })} styles={{ root: { flexGrow: 1 } }} />
        <Stack styles={{ root: { flexGrow: 1 } }}>
          <PeoplePicker versions={versions} onContributorSelected={(userPersonaProps) => setFilters({ Author: userPersonaProps })} />
        </Stack>
      </Stack>

      <Stack>
        <VerticalTimeline layout='1-column' animate={false} lineColor='#eaeaea' className={styles['vertical-timeline']}>
          {versions.map((version) =>
            <VerticalTimelineElement
              className={styles['vertical-timeline-element']}
              contentStyle={{ background: '#eaeaea', boxShadow: 'none' }}
              contentArrowStyle={{ borderRight: '7px solid #eaeaea' }}
              iconStyle={{ background: "#eaeaea", color: "#fff" }}
              dateClassName={styles['vertical-timeline-element-date']}
              icon={<FieldUser size={PersonaSize.size40} user={version.Author} hidePersonaDetails />}
            >
              <Version
                Version={version}
                className={styles['vertical-timeline-element-content']}
                selectedVersions={selectedVersions}
                onVersionSelected={() => {
                  if (selectedVersions.indexOf(version.VersionId) > -1) {
                    setSelectedVersions(selectedVersions.filter(v => v !== version.VersionId));
                  } else {
                    setSelectedVersions([...selectedVersions, version.VersionId]);
                  }
                }}
                provider={props.provider}
                reloadVersions={() => { setFilters({}) }}
              />
            </VerticalTimelineElement>
          )}
        </VerticalTimeline>
      </Stack>

    </DialogContent>
  );
};