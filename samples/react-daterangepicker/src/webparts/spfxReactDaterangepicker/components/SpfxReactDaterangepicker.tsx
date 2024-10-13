import * as React from 'react';
import styles from './SpfxReactDaterangepicker.module.scss';
import { ISpfxReactDaterangepickerProps } from './ISpfxReactDaterangepickerProps';
import { ISpfxReactDaterangepickerState } from './ISpfxReactDaterangepickerState';
import { DateRange, DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { SPFx, spfi, SPFI } from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/batching";
import { PrimaryButton } from 'office-ui-fabric-react';

export default class SpfxReactDaterangepicker extends React.Component<ISpfxReactDaterangepickerProps, ISpfxReactDaterangepickerState> {
  private _SPFI: SPFI;
  constructor(props: ISpfxReactDaterangepickerProps, state: ISpfxReactDaterangepickerState) {
    super(props);
    this._SPFI = spfi().using(SPFx(this.props.context));

    this.state = {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    };
    this.getValuesFromSP();
  }

  private async getValuesFromSP() {
    try {
      const item: any = await this._SPFI.web.lists.getByTitle("DateRangeList").items.getById(1)();
      this.setState({ endDate: new Date(item.DateFrom), startDate: new Date(item.DateTo) });
    }
    catch (err) {
      console.log(err);
    }
  }

  public render(): React.ReactElement<ISpfxReactDaterangepickerProps> {
    let state = [{ startDate: this.state.startDate, endDate: this.state.endDate, key: this.state.key }];
    return (
      <div className={styles.spfxReactDaterangepicker}>
        <DateRange
          editableDateInputs={true}
          onChange={item => this.setState({ endDate: item.selection["endDate"], startDate: item.selection["startDate"] })}
          moveRangeOnFirstSelection={false}
          ranges={state}
        />
        <br />
        <PrimaryButton text="Save" onClick={this._SaveIntoSP} />
      </div>
    );
  }

  private _SaveIntoSP = async () => {
    let list = this._SPFI.web.lists.getByTitle("DateRangeList");
    const i = await list.items.getById(1).update({
      DateFrom: this.state.startDate,
      DateTo: this.state.endDate
    });

  }
}
