import * as React from 'react';
import styles from './PnPListView.module.scss';
import { IPnPListViewProps } from './IPnPListViewProps';
import { ListView, IViewField } from '@pnp/spfx-controls-react/lib/ListView';
import { FieldTextRenderer } from '@pnp/spfx-controls-react/lib/FieldTextRenderer';
import { FieldDateRenderer } from '@pnp/spfx-controls-react/lib/FieldDateRenderer';
import { FieldLookupRenderer } from '@pnp/spfx-controls-react/lib/FieldLookupRenderer';
import { FieldUrlRenderer } from '@pnp/spfx-controls-react/lib/FieldUrlRenderer';
import { FieldTaxonomyRenderer } from '@pnp/spfx-controls-react/lib/FieldTaxonomyRenderer';
import { ISPFieldLookupValue } from '@pnp/spfx-controls-react/lib/Common';
import { IFrameDialog } from '@pnp/spfx-controls-react/lib/IFrameDialog';
import { DialogType } from 'office-ui-fabric-react/lib/Dialog';

export interface IPnPListViewState {
  selectedLookupId?: string;
}

export default class PnPListView extends React.Component<IPnPListViewProps, IPnPListViewState> {

  private readonly _countriesLookupFieldId = '5e037cea-aaef-40dd-895f-90442114016f';
  private readonly _lookupFieldDispWebRelativeUrl = '/Lists/Country/DispForm.aspx?ID={0}&RootFolder=*&IsDlg=1';

  private readonly _fields: IViewField[] = [{
    name: 'Title',
    displayName: 'Title',
    minWidth: 150,
    maxWidth: 250,
    render: this._renderTitle
  }, {
    name: 'JourneyDate',
    displayName: 'Journey Date',
    render: this._renderDate
  }, {
    name: 'VisitedCountries',
    displayName: 'Visited Countries',
    minWidth: 100,
    render: (item, index) => { return this._renderCountries(item, index); }
  }, {
    name: 'Experience',
    displayName: 'Experience',
    minWidth: 100,
    render: this._renderExperience
  }, {
    name: 'Picture',
    displayName: 'Picture',
    minWidth: 150,
    render: this._renderPicture
  }, {
    name: 'JourneyType',
    displayName: 'Journey Type',
    minWidth: 100,
    render: this._renderJourneyType
  }];

  constructor(props: IPnPListViewProps) {
    super(props);

    this.state = {};
  }


  public render(): React.ReactElement<IPnPListViewProps> {
    return (
      <div className={styles.pnPListView}>
        <ListView items={this.props.items} viewFields={this._fields} />
        {this.state.selectedLookupId &&
          <IFrameDialog
            hidden={false}
            url={`${this.props.context.pageContext.web.absoluteUrl}${this._lookupFieldDispWebRelativeUrl.replace('{0}', this.state.selectedLookupId.toString())}`}
            iframeOnLoad={iframe => {
              const iframeWindow: Window = iframe.contentWindow;
              const iframeDocument: Document = iframeWindow.document;

              const s4Workspace: HTMLDivElement = iframeDocument.getElementById('s4-workspace') as HTMLDivElement;
              s4Workspace.style.height = iframe.style.height;

              s4Workspace.scrollIntoView();
            }}
            onDismiss={() => {
              this.setState({
                selectedLookupId: undefined
              });
            }}
            modalProps={{
              isBlocking: true
            }}
            dialogContentProps={{
              type: DialogType.close,
              showCloseButton: true
            }}
            width={'570px'}
            height={'250px'} />}
      </div>
    );
  }

  /**
   * Title column renderer
   * @param item ListView item
   */
  private _renderTitle(item?: any): any {
    return <FieldTextRenderer
      text={item.Title}
    />;
  }

  /**
   * Date column renderer
   * @param item ListView item
   */
  private _renderDate(item?: any): any {
    const date = new Date(item['JourneyDate']);
    return <FieldDateRenderer
      text={date.toLocaleDateString()} />;
  }

  /**
   * Countries (Multi Lookup) column renderer
   * @param item ListView item
   * @param index item index
   */
  private _renderCountries(item?: any, index?: number): any {
    //
    // ListView item contains "flattened" information
    // So, we're getting original item first
    //

    const originalItem = this.props.items[index!];
    const visitedCountriesIds = originalItem['VisitedCountriesId'];
    const visitedCountries = originalItem['VisitedCountries'];

    const lookups: ISPFieldLookupValue[] = visitedCountries.map((vc, idx) => {
      return {
        lookupId: visitedCountriesIds[idx].toString(),
        lookupValue: vc
      };
    });

    return <FieldLookupRenderer
      lookups={lookups}
      onClick={args => {
        this.setState({
          selectedLookupId: args.lookup.lookupId
        });
      }} />;
  }

  /**
   * Experience (Choice) column renderer
   * @param item ListView item
   */
  private _renderExperience(item?: any): any {
    const experience: string = item['Experience'];

    return <FieldTextRenderer
      text={experience}
    />;
  }

  /**
   * Picture (Hyperlink or Picture) column renderer
   * @param item ListView item
   */
  private _renderPicture(item?: any): any {

    return <FieldUrlRenderer
      url={item['Picture.Url']}
      isImageUrl={true}
      className={styles.image}
      text={item['Picture.Description'] || ''} />;
  }

  /**
   * JourneyType (Managed Metadata) column renderer
   * @param item ListView item
   */
  private _renderJourneyType(item?: any) {

    return <FieldTaxonomyRenderer
      terms={[{
        Label: item['JourneyType.Label'],
        TermID: item['JourneyType.TermGuid']
      }]} />;
  }
}
