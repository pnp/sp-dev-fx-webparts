import * as React from 'react';
import { IPropertyFieldRepeatingDataHostProps, IPropertyFieldRepeatingDataState } from './PropertyFieldRepeatingData.types';
import { IconButton } from '@fluentui/react/lib/Button';
import { ActionButton } from '@fluentui/react/lib/Button';
import styles from './PropertyFieldRepeatingData.module.scss';
import { TextField } from '@fluentui/react/lib/TextField';
import { NumberTextField } from '../NumberTextField/NumberTextField';
import * as strings from 'ChartinatorWebPartStrings';
import { Guid } from '@microsoft/sp-core-library';
import { ChartType } from '@pnp/spfx-controls-react/lib/ChartControl';

/**
 * Hosts the PropertyFieldRepeatingData control
 */
export default class IPropertyFieldRepeatingDataHost extends React.Component<IPropertyFieldRepeatingDataHostProps, IPropertyFieldRepeatingDataState> {

  constructor(props: IPropertyFieldRepeatingDataHostProps) {
    super(props);

    this.state = {
      data: props.data
    };
  }

  /**
   * Renders the control
   */
  public render(): JSX.Element {
    const { chartType } = this.props;

    // Get the datarows
    let dataRows: JSX.Element[] = undefined;
    switch (chartType) {
      case ChartType.Bubble:
        dataRows = this._renderBubbleRows();
        break;
      case ChartType.Scatter:
        dataRows = this._renderPointRows();
        break;
      default:
        dataRows = this._renderDataRows();
    }

    return (
      <div>
        {dataRows}
        <ActionButton
          iconProps={{ iconName: 'Add' }}
          onClick={(_unused) => this._handleRowAdd()}
        >
          {strings.AddButtonLabel}
        </ActionButton>
      </div>
    );
  }

  /**
   * Renders each row of data
   */
  private _renderDataRows = (): JSX.Element[] => {
    return this.state.data.map((dataRow: { id: string, name: string, value: number }, index: number) => {
      return <div key={dataRow.id}>
        <TextField
          label={strings.DataLabelFieldLabel}
          placeholder={strings.DataLabelFieldPlaceholder}
          value={dataRow.name}
          onChange={((event: React.FormEvent<HTMLInputElement|HTMLTextAreaElement>, newValue: string) => this._handleRowChange(dataRow.id, 'name', newValue))}
        />
        <NumberTextField
          label={strings.DataValueFieldLabel}
          placeholder={strings.DataValueFieldPlaceholder}
          value={dataRow.value}
          onChanged={(newValue: string) => this._handleRowChange(dataRow.id, 'value', newValue)}
        />

        {index > 0 &&
          <IconButton
            iconProps={{ iconName: 'Delete' }}
            onClick={(_unused) => this._handleRowDelete(dataRow.id)} />}
        <div className={styles.propertyPaneGroupField}>
          <hr />
        </div>
      </div>;
    });
  }

  /**
   * Render rows of bubble data elements
   */
  private _renderBubbleRows = (): JSX.Element[] => {
    return this.state.data.map((dataRow: any, index: number) => {
      return <div key={dataRow.id}>
        <TextField
          label={strings.DataLabelFieldLabel}
          placeholder={strings.DataLabelFieldPlaceholder}
          value={dataRow.name}
          onChange={((_event: React.FormEvent<HTMLInputElement|HTMLTextAreaElement>, newValue: string) => this._handleRowChange(dataRow.key, 'name', newValue))}
        />
        <NumberTextField
          label={strings.DataValueXFieldLabel}
          placeholder={strings.DataValueXFieldPlaceholder}
          value={dataRow.x}
          onChanged={(newValue: string) => this._handleRowChange(dataRow.id, 'x', newValue)}
        />
        <NumberTextField
          label={strings.DataValueYFieldLabel}
          placeholder={strings.DataValueYFieldPlaceholder}
          value={dataRow.y}
          onChanged={(newValue: string) => this._handleRowChange(dataRow.id, 'y', newValue)}
        />
        <NumberTextField
          label={strings.DataValueRFieldLabel}
          placeholder={strings.DataValueRFieldPlaceholder}
          value={dataRow.r}
          onChanged={(newValue: string) => this._handleRowChange(dataRow.id, 'r', newValue)}
        />
        {index > 0 &&
          <IconButton
            iconProps={{ iconName: 'Delete' }}
            onClick={(_unused) => this._handleRowDelete(dataRow.id)} />}
        <div className={styles.propertyPaneGroupField}>
          <hr />
        </div>
      </div>;
    });
  }

  /**
   * Renders rows of point data elements
   */
  private _renderPointRows = (): JSX.Element[] => {
    return this.state.data.map((dataRow: { id: string, name: string, x: number, y: number }, index: number) => {
      return <div key={dataRow.id}>
        <TextField
          label={strings.DataLabelFieldLabel}
          placeholder={strings.DataLabelFieldPlaceholder}
          value={dataRow.name}
          onChange={((_event: React.FormEvent<HTMLInputElement|HTMLTextAreaElement>, newValue: string) => this._handleRowChange(dataRow.id, 'name', newValue))}
        />
        <NumberTextField
          label={strings.DataValueXFieldLabel}
          placeholder={strings.DataValueXFieldPlaceholder}
          value={dataRow.x}
          onChanged={(newValue: string) => this._handleRowChange(dataRow.id, 'x', newValue)}
        />
        <NumberTextField
          label={strings.DataValueYFieldLabel}
          placeholder={strings.DataValueYFieldPlaceholder}
          value={dataRow.y}
          onChanged={(newValue: string) => this._handleRowChange(dataRow.id, 'y', newValue)}
        />
        {index > 0 &&
          <IconButton
            iconProps={{ iconName: 'Delete' }}
            onClick={(_unused) => this._handleRowDelete(dataRow.id)} />}
        <div className={styles.propertyPaneGroupField}>
          <hr />
        </div>
      </div>;
    });
  }

  /**
   * Handle row changes
   */
  private _handleRowChange = (id: string, dataElem: string, value: any) => {
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

  /**
   * Handles when a row is deleted
   */
  private _handleRowDelete = (id: string) => {
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

  /**
   * Handles when a row is added
   */
  private _handleRowAdd = () => {
    const { chartType } = this.props;
    const { data } = this.state;

    // Generate new empty data according to data type
    switch (chartType) {
      case ChartType.Bubble:
        data.push({
          id: Guid.newGuid(),
          name: '',
          x: undefined,
          y: undefined,
          r: undefined
        });
        break;
      case ChartType.Scatter:
        data.push({
          id: Guid.newGuid(),
          name: '',
          x: undefined,
          y: undefined
        });
        break;
      default:
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
