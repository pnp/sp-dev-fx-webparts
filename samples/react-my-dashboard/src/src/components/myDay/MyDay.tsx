import * as React from 'react';

import * as strings from 'DashBoardWebPartStrings';

import { Subtitle2 } from '@fluentui/react-components';
import {
  bundleIcon,
  CalendarAgendaFilled,
  CalendarAgendaRegular,
  TasksAppFilled,
  TasksAppRegular,
} from '@fluentui/react-icons';

import { ITab } from '../../models/ITab';
import { MgtAgenda } from '../mgtAgenda/MgtAgenda';
import { MgtTodo } from '../mgtTodo/mgtTodo';
import { TabMenu } from '../tabMenu/TabMenu';
import { useMyDayStyles } from './useMyDayStyles';

export interface IMyDayProps {}

export const MyDay: React.FunctionComponent<IMyDayProps> = (props: React.PropsWithChildren<IMyDayProps>) => {
  const styles = useMyDayStyles();
  const CalendarAgenda = bundleIcon(CalendarAgendaFilled, CalendarAgendaRegular);
  const TasksApp = bundleIcon(TasksAppFilled, TasksAppRegular);
  const [selectedValue, setSelectedValue] = React.useState<string>("tab1");

  const onTabSelect = React.useCallback((tabId: string) => {
    setSelectedValue(tabId);
  }, []);

  const tabs: ITab[] = [
    {
      id: "tab1",
      name: strings.Agenda,
      icon: <CalendarAgenda />,
    },
    {
      id: "tab2",
      name: strings.Todo,
      icon: <TasksApp />,
    },
  ];

  const renderSelectedTab = React.useCallback(() => {
    switch (selectedValue) {
      case "tab1":
        return  <MgtAgenda />;
      case "tab2":
        return <MgtTodo />     
      default:
        return null;
    }
  }, [selectedValue]);
  return (
    <>
      <div className={styles.myDayContainer}>
        <Subtitle2 className={styles.myDayTitle}>My Day</Subtitle2>
        <TabMenu tabs={tabs} selectedTabId={selectedValue} onSelectedTab={onTabSelect} />
        { renderSelectedTab()}
      </div>
    </>
  );
};
