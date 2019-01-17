import * as React from 'react';
import { IPropertyFieldRepeatingDataHostProps, IPropertyFieldRepeatingDataState } from './PropertyFieldRepeatingData.types';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import styles from './PropertyFieldRepeatingData.module.scss';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { NumberTextField } from '../NumberTextField/NumberTextField';
import * as strings from 'ChartinatorWebPartStrings';
import { Guid } from '@microsoft/sp-core-library';

export default class IPropertyFieldRepeatingDataHost extends React.Component<IPropertyFieldRepeatingDataHostProps, IPropertyFieldRepeatingDataState> {

  constructor(props: IPropertyFieldRepeatingDataHostProps) {
    super(props);

    this.state = {
      data: props.data
    };
  }

  public render(): JSX.Element {
    const { chartType } = this.props;

    let dataRows: JSX.Element[] = undefined;
    if (chartType === "bubble") {
      dataRows = this._getBubbleRows();
    } else if (chartType === "scatter") {
      dataRows = this._getPointRows();
    } else {
      dataRows = this._getDataRows();
    }

    return (
      <div>
        {dataRows}
        <ActionButton
          data-automation-id="test"
          iconProps={{ iconName: 'Add' }}
          onClick={(_unused) => this._addRowHandler()}
        >
          {strings.AddButtonLabel}
        </ActionButton>
      </div>
    );
  }

  private _getDataRows = (): JSX.Element[] => {
    return this.state.data.map((dataRow: { id: string, name: string, value: number }, index: number) => {
      return <div key={dataRow.id}>
        <TextField
          label={strings.DataLabelFieldLabel}
          placeholder={strings.DataLabelFieldPlaceholder}
          value={dataRow.name}
          onChanged={(newValue: string) => this._rowChangedHandler(dataRow.id, 'name', newValue)}
        />
        <NumberTextField
          label={strings.DataValueFieldLabel}
          placeholder={strings.DataValueFieldPlaceholder}
          value={dataRow.value}
          onChanged={(newValue: string) => this._rowChangedHandler(dataRow.id, 'value', newValue)}
        />

        {index > 0 &&
          <IconButton
            iconProps={{ iconName: 'Delete' }}
            onClick={(_unused) => this._deleteRowHandler(dataRow.id)} />}
        <div className={styles.propertyPaneGroupField}>
          <hr />
        </div>
      </div>;
    });
  }

  private _getBubbleRows = (): JSX.Element[] => {
    return this.state.data.map((dataRow: any, index: number) => {
      return <div key={dataRow.id}>
        <TextField
          label={strings.DataLabelFieldLabel}
          placeholder={strings.DataLabelFieldPlaceholder}
          value={dataRow.name}
          onChanged={(newValue: string) => this._rowChangedHandler(dataRow.key, 'name', newValue)}
        />
        <NumberTextField
          label={strings.DataValueXFieldLabel}
          placeholder={strings.DataValueXFieldPlaceholder}
          value={dataRow.x}
          onChanged={(newValue: string) => this._rowChangedHandler(dataRow.id, 'x', newValue)}
        />
        <NumberTextField
          label={strings.DataValueYFieldLabel}
          placeholder={strings.DataValueYFieldPlaceholder}
          value={dataRow.y}
          onChanged={(newValue: string) => this._rowChangedHandler(dataRow.id, 'y', newValue)}
        />
        <NumberTextField
          label={strings.DataValueRFieldLabel}
          placeholder={strings.DataValueRFieldPlaceholder}
          value={dataRow.r}
          onChanged={(newValue: string) => this._rowChangedHandler(dataRow.id, 'r', newValue)}
        />
        {index > 0 &&
          <IconButton
            iconProps={{ iconName: 'Delete' }}
            onClick={(_unused) => this._deleteRowHandler(dataRow.id)} />}
        <div className={styles.propertyPaneGroupField}>
          <hr />
        </div>
      </div>;
    });
  }

  private _getPointRows = (): JSX.Element[] => {
    return this.state.data.map((dataRow: { id: string, name: string, x: number, y: number }, index: number) => {
      return <div key={dataRow.id}>
        <TextField
          label={strings.DataLabelFieldLabel}
          placeholder={strings.DataLabelFieldPlaceholder}
          value={dataRow.name}
          onChanged={(newValue: string) => this._rowChangedHandler(dataRow.id, 'name', newValue)}
        />
        <NumberTextField
          label={strings.DataValueXFieldLabel}
          placeholder={strings.DataValueXFieldPlaceholder}
          value={dataRow.x}
          onChanged={(newValue: string) => this._rowChangedHandler(dataRow.id, 'x', newValue)}
        />
        <NumberTextField
          label={strings.DataValueYFieldLabel}
          placeholder={strings.DataValueYFieldPlaceholder}
          value={dataRow.y}
          onChanged={(newValue: string) => this._rowChangedHandler(dataRow.id, 'y', newValue)}
        />
        {index > 0 &&
          <IconButton
            iconProps={{ iconName: 'Delete' }}
            onClick={(_unused) => this._deleteRowHandler(dataRow.id)} />}
        <div className={styles.propertyPaneGroupField}>
          <hr />
        </div>
      </div>;
    });
  }

  private _rowChangedHandler = (id: string, dataElem: string, value: any) => {
    // Find the data row with matching id
    const { data } = this.state;
    const row = data.filter((dataRow: { id: string }) => dataRow.id === id)![0];
    if (row !== undefined) {
      row[dataElem] = value;
    } else {
    }
    this.setState({
      data: data
    }, () => {
      this.props.onDataChanged(data);
    });
  }

  private _deleteRowHandler = (id: string) => {
    const { data } = this.state;

    const row = data.filter((dataRow: { id: string }) => dataRow.id === id)![0];
    if (row !== undefined) {
      const index = data.indexOf(row);
      if (index > -1) {
        data.splice(index, 1);
        this.setState({
          data: data
        }, () => {
          this.props.onDataChanged(data);
        });
      }
    }
  }

  private _addRowHandler = () => {
    const { chartType } = this.props;
    const { data } = this.state;
    if (chartType === "bubble") {
      data.push({
        id: Guid.newGuid(),
        name: '',
        x: undefined,
        y: undefined,
        r: undefined
      });
    } else if (chartType === "scatter") {
      data.push({
        id: Guid.newGuid(),
        name: '',
        x: undefined,
        y: undefined
      });
    } else {
      data.push({
        id: Guid.newGuid(),
        name: '',
        value: undefined
      });
    }

    this.setState({
      data: data
    }, () => {
      this.props.onDataChanged(data);
    });
  }
}
