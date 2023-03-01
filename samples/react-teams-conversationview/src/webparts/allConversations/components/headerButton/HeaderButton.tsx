import { Button, Flex, FlexItem, GridIcon, TableIcon } from '@fluentui/react-northstar';
import * as React from 'react';
import { ViewName } from '../IAllConversationsState';

export interface IHeaderButtonProps {
    flipFilterPanel: (isOpen: boolean) => void;
    setView: (viewName: ViewName) => void;
}

export const HeaderButton: React.FunctionComponent<IHeaderButtonProps> = (props: React.PropsWithChildren<IHeaderButtonProps>) => {
  
  return (
    <Flex gap="gap.small">
        {/* <FlexItem>
            <Button icon={<FilterIcon/>} content="Filter" onClick={()=>props.flipFilterPanel(true)} />
        </FlexItem> */}
        <h1>Search conversation</h1>
        <FlexItem push>
            <Button.Group
                buttons={[
                {
                    icon: <GridIcon />,
                    key: 'Gallery',
                    iconOnly: true,
                    title: 'Gallery View',
                    onClick:()=>props.setView(ViewName.Grid)
                },
                {
                    icon: <TableIcon />,
                    key: 'Table',
                    iconOnly: true,
                    title: 'Table View',
                    onClick:()=>props.setView(ViewName.Table)
                }
                ]}
                />
        </FlexItem>
    </Flex>
  );
};