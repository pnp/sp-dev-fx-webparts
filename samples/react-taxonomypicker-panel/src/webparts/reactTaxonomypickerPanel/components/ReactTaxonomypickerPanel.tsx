import * as React from 'react';
import styles from './ReactTaxonomypickerPanel.module.scss';
import { IReactTaxonomypickerPanelProps } from './IReactTaxonomypickerPanelProps';

// Controls
import TermsPickerComponent, { ITaxonomyTerm } from './TermsPickerComponent';
import { DefaultButton, IButtonProps, Button } from 'office-ui-fabric-react/lib/Button';

export interface ITaxonomyPickerWebpartState {
  SingleSelectFieldTerms: ITaxonomyTerm[],
  MultiSelectFieldTerms: ITaxonomyTerm[]
}

export default class ReactTaxonomypickerPanel extends React.Component<IReactTaxonomypickerPanelProps, ITaxonomyPickerWebpartState> {
  constructor(props, state: ITaxonomyPickerWebpartState) {
    super(props);

    this.state = {
      SingleSelectFieldTerms: [],
      MultiSelectFieldTerms: []

      // Supply array in the below format for a pre-populated control.
      //SingleSelectFieldTerms:[{name:"<Term-Label>", key="<Term-GUID>"}],
      //MultiSelectFieldTerms:[{name:"<Term-Label>", key="<Term-GUID>"}, {name:"<Term-Label>", key="<Term-GUID>"}]
    }

  }

  public render(): React.ReactElement<IReactTaxonomypickerPanelProps> {
    return (
      <div>
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-lg12">
              <TermsPickerComponent IsMultiValue={false} TermSetId='<TERM-SET-ID>' LabelText='Single-select field' SelectedTerms={this.state.SingleSelectFieldTerms} />
            </div>
          </div>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-lg12">
              <TermsPickerComponent IsMultiValue={true} TermSetId='<TERM-SET-ID>' LabelText='Multi-select field' SelectedTerms={this.state.MultiSelectFieldTerms} />
            </div>
          </div>
        </div>
        <div>
        </div>
        <br />
        <br />
        <DefaultButton
          primary={true}
          text="Show selected values"
          onClick={this._showTaxonomyControlValues.bind(this)}
        />
      </div>
    );
  }

  private _showTaxonomyControlValues() {

    if (this.state.SingleSelectFieldTerms.length > 0) {
      alert("Single-Select term Label and GUID : \n" + this.state.SingleSelectFieldTerms[0].name + " - " + this.state.SingleSelectFieldTerms[0].key);
    }
    if (this.state.MultiSelectFieldTerms.length > 0) {
      let multiSelectValues = this.state.MultiSelectFieldTerms.map(trm => {
        return trm.name + " - " + trm.key
      }).join(' | ');

      alert("Multi-select term Label and GUID : \n" + multiSelectValues);
    }
  }
}
