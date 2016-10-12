import * as React from 'react';
import { css, Button, Spinner, TextField } from 'office-ui-fabric-react';
import { HttpClient } from '@microsoft/sp-client-base';

import styles from '../CreateTask.module.scss';
import { ICreateTaskWebPartProps } from '../ICreateTaskWebPartProps';

export interface ICreateTaskProps extends ICreateTaskWebPartProps {
}

export interface ICreateTaskState {
  itemTitleInvalid: boolean;
  creatingItem: boolean;
  itemTitle: string;
  status: string;
  itemTitleChanged: boolean;
}

export default class CreateTask extends React.Component<ICreateTaskProps, ICreateTaskState> {
  constructor(props: ICreateTaskProps, state: ICreateTaskState) {
    super(props);

    this.state = {
      creatingItem: false,
      itemTitle: '',
      itemTitleInvalid: true,
      status: '',
      itemTitleChanged: false
    };

    if (!String.prototype.trim) {
      (() => {
        // Make sure we trim BOM and NBSP
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function () {
          return this.replace(rtrim, '');
        };
      })();
    }
  }

  public render(): JSX.Element {
    const creatingItem: JSX.Element = this.state.creatingItem ? <div style={{ margin: '0 auto' }}><Spinner label={'Creating item...'} /></div> : <div />;
    const status: JSX.Element = this.state.status.length > 0 ? <div>{this.state.status}</div> : <div />;

    return (
      <div className={styles.createTask}>
        <div className={styles.container}>
          <div className={css('ms-Grid-row', styles.row)}>
            <div className='ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1'>
              <div className='ms-font-xl'>
                Create list item
              </div>
              <TextField label={'Item title'} disabled={this.state.creatingItem}
                onBeforeChange={(newValue: string) => { this.itemTitleChanged(newValue); }}
                onGetErrorMessage={(): string => { return this.validateItemTitle(); } }
                value={this.state.itemTitle} />
              <Button onClick={() => { this.createItem(); } }
                disabled={this.state.creatingItem || this.state.itemTitleInvalid}>Create item</Button>
              {creatingItem}
              {status}
            </div>
          </div>
        </div>
      </div>
    );
  }

  private createItem(): void {
    this.setState((prevState: ICreateTaskState, props: ICreateTaskProps): ICreateTaskState => {
      prevState.creatingItem = true;
      prevState.status = '';
      return prevState;
    });

    window.fetch('https://pnp-spfx-elevation-api.azurewebsites.net/api/items', {
      method: 'POST',
      body: JSON.stringify({ title: this.state.itemTitle }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response: Response): void => {
        if (response.ok) {
          this.setState((prevState: ICreateTaskState, props: ICreateTaskProps): ICreateTaskState => {
            prevState.creatingItem = false;
            prevState.status = 'Item successfully created';
            return prevState;
          });
        }
        else {
          this.setState((prevState: ICreateTaskState, props: ICreateTaskProps): ICreateTaskState => {
            prevState.creatingItem = false;
            prevState.status = 'Error creating item: ' + response.statusText;
            return prevState;
          });
        }
      }, (error: any): void => {
        this.setState((prevState: ICreateTaskState, props: ICreateTaskProps): ICreateTaskState => {
          prevState.creatingItem = false;
          prevState.status = 'Error creating item: ' + error;
          return prevState;
        });
      });
  }

  private itemTitleChanged(newValue: string): void {
    this.setState((prevState: ICreateTaskState, props: ICreateTaskProps): ICreateTaskState => {
      prevState.itemTitleChanged = true;
      prevState.status = '';
      prevState.itemTitle = newValue;
      return prevState;
    });
  }

  private validateItemTitle(): string {
    if (!this.state.itemTitleChanged) {
      return '';
    }

    if (this.state.itemTitle.trim().length === 0) {
      this.setState((prevState: ICreateTaskState, props: ICreateTaskProps): ICreateTaskState => {
        prevState.itemTitleInvalid = true;
        return prevState;
      });
      return 'Please enter item title';
    }
    else {
      this.setState((prevState: ICreateTaskState, props: ICreateTaskProps): ICreateTaskState => {
        prevState.itemTitleInvalid = false;
        return prevState;
      });
      return '';
    }
  }
}
