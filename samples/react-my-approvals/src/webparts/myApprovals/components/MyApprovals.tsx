import * as React from 'react';
import { useIntl } from 'react-intl';
import styles from './MyApprovals.module.scss';
import {
  DetailsList,
  DetailsListLayoutMode,
  Link,
  MessageBar,
  MessageBarType,
  SelectionMode,
  Spinner,
  SpinnerSize,
  Text
} from 'office-ui-fabric-react';
import { WebPartTitle } from '@pnp/spfx-controls-react';

import * as strings from 'MyApprovalsWebPartStrings';
import { IMyApprovalsProps } from './IMyApprovalsProps';
import { IMyApprovalsState } from './IMyApprovalsState';

const MyApprovals = ({
  httpService,
  displayMode,
  environments,
  title,
  setTitle
}: IMyApprovalsProps) => {

  const intl = useIntl();
  const [approvals, setApprovals] = React.useState<IMyApprovalsState[]>();

  React.useEffect(() => {
    if (!httpService) return;
    if (!environments.length) return;
    (async () => {
      setApprovals(
        await httpService
          .getApprovals(environments)
          .then(async (values) => await Promise.all(values.map(async (value) => ({
            environment: value.environment,
            name: value.name,
            title: value.properties.title,
            requestDate: await httpService.convertUtcToLocal(value.properties.creationDate),
            requestUser: value.properties.principals.filter((item) => item.id === value.properties.owner.id)[0].displayName,
          }))))
      );
    })();
  }, [
    httpService,
    environments
  ]);

  return (
    <div className={styles.root}>
      {
        environments.length
          ? (
            <React.Fragment>
              <WebPartTitle
                displayMode={displayMode}
                title={title}
                updateProperty={setTitle} />
              {
                approvals
                  ? (
                    <div className={styles.container}>
                      <div className={styles.count}>
                        <Text variant='mega'>
                          {approvals.length}
                        </Text>
                        <Text variant='medium'>
                          {strings.ApprovalItemsLabel}
                        </Text>
                      </div>
                      <div className={styles.items}>
                        <DetailsList
                          columns={[
                            {
                              key: 'title',
                              name: strings.ApprovalRequestTitleLabel,
                              fieldName: 'title',
                              data: 'string',
                              minWidth: 160,
                              isResizable: true,
                              onRender: (value: IMyApprovalsState) => (
                                <Link
                                  href={`https://flow.microsoft.com/manage/environments/${value.environment}/approvals/received/${value.name}`}
                                  target='_blank'>
                                  {value.title}
                                </Link>
                              )
                            },
                            {
                              key: 'requestDate',
                              name: strings.ApprovalRequestDateLabel,
                              fieldName: 'requestDate',
                              data: 'string',
                              minWidth: 160,
                              isResizable: true,
                              onRender: (value: IMyApprovalsState) =>
                                intl.formatDate(
                                  value.requestDate.replace(/([+-]\d{2}:\d{2}|Z)$/, ""),
                                  {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric'
                                  }
                                )
                            },
                            {
                              key: 'requestUser',
                              name: strings.ApprovalRequestUserLabel,
                              fieldName: 'requestUser',
                              data: 'string',
                              minWidth: 160,
                              isResizable: true
                            }
                          ]}
                          items={approvals}
                          layoutMode={DetailsListLayoutMode.justified}
                          selectionMode={SelectionMode.none} />
                      </div>
                    </div>
                  )
                  : (
                    <div className={styles.loading}>
                      <Spinner size={SpinnerSize.medium} />
                    </div>
                  )
              }
            </React.Fragment>
          )
          : (
            <MessageBar messageBarType={MessageBarType.error}>
              {strings.EnvironmentEmptyError}
            </MessageBar>
          )
      }
    </div>
  );

};

export default MyApprovals;
