import * as React from 'react';
import { IconButton } from '@fluentui/react/lib/Button';
import { ContextualMenuItemType } from '@fluentui/react/lib/ContextualMenu';
import styles from './ECB.module.scss';
import { IECBProps } from './IECBProps';

export class ECB extends React.Component<IECBProps, {}> {
  public constructor(props: IECBProps) {        
    super(props);

    this.state = {
      panelOpen: false
    };
  }
  
  public render() {      
    return  <div className={styles.ecb}>
              <IconButton
                id='ContextualMenuButton1'
                className={styles.ecbbutton}
                text=''
                width='30'
                split={false}
                iconProps={ { iconName: 'MoreVertical' } }
                menuIconProps={ { iconName: '' } }
                menuProps={ {
                  shouldFocusOnMount: true,
                  items: [
                    {
                      key: 'action1',
                      name: 'Action 1',
                      onClick: this.handleClick.bind(this, this.props.item.Firstname + ' Action 1')
                    },
                    {
                      key: 'divider_1',
                      itemType: ContextualMenuItemType.Divider
                    },
                    {
                      key: 'action2',
                      name: 'Action 2',
                      onClick: this.handleClick.bind(this, this.props.item.Firstname + ' Action 2')
                    },
                    {
                      key: 'action3',
                      name: 'Action 3',
                      onClick: this.handleClick.bind(this, this.props.item.Lastname + ' Action  3')
                    },
                    {
                      key: 'disabled',
                      name: 'Disabled action',
                      disabled: true,
                      onClick: () => console.error('Disabled action should not be clickable.')
                    }
                  ]
                } }
              />
            </div>
      ;
  }

  private handleClick(source: string, event: any) {
    alert(source + ' clicked');
  }
}