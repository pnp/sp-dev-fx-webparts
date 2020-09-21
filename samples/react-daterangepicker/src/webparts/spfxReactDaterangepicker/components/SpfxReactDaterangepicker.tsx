import * as React from 'react';
import styles from './SpfxReactDaterangepicker.module.scss';
import { ISpfxReactDaterangepickerProps } from './ISpfxReactDaterangepickerProps';
import { ISpfxReactDaterangepickerState } from './ISpfxReactDaterangepickerState';
import { DateRange } from 'react-date-range';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { PrimaryButton } from 'office-ui-fabric-react';

export default class SpfxReactDaterangepicker extends React.Component<ISpfxReactDaterangepickerProps, ISpfxReactDaterangepickerState> {
  constructor(props: ISpfxReactDaterangepickerProps, state: ISpfxReactDaterangepickerState) {
    super(props);
    sp.setup({ spfxContext: this.props.context });
    this.state = { 
      startDate: new Date(), 
      endDate: null, 
      key: 'selection' 
    };
    this.getValuesFromSP();
  }

  private async getValuesFromSP() {
    const item: any = await sp.web.lists.getByTitle("DateRangeList").items.getById(1).get();
    this.setState({ endDate: item.DateFrom, startDate: item.DateTo });
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

  @autobind
  private async _SaveIntoSP() {
    let list = sp.web.lists.getByTitle("DateRangeList");
    const i = await list.items.getById(1).update({
      DateFrom: this.state.startDate,
      DateTo: this.state.endDate
    });

  }
}
