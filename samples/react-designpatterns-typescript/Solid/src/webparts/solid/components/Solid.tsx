import * as React from 'react';
import styles from './Solid.module.scss';
import { ISolidProps } from './ISolidProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IQuotes, IQuote } from './QuoteContracts';
import { IDataReader, DataReaderFactory } from './DataReader';
import { ISolidState } from './ISolidState';


export default class Solid extends React.Component<ISolidProps, ISolidState> {

  constructor() {
    super();
    this._dataReader = DataReaderFactory.getReader(this.context);
  }

  private _dataReader : IDataReader;

  public render(): React.ReactElement<ISolidProps> {
    return (
      <div className={ styles.solid }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
              {this.renderQuotes()}
            </div>
          </div>
        </div>
      </div>
      
    );
  }

  public fetchData = () => {
    this._dataReader.getData().then((response) => {
      this.setState({
        quotes: response.Quotes,
      });
    });
   }

  public  componentDidMount() {
      this.fetchData();
  }

  public renderQuotes = () => this.state.quotes.map(quote => ( 
    <div>
      <div>${escape(quote.Quote)}</div>
      <div className="${styles.author}">${escape(quote.Author)}</div>  
    </div>
  ))

}
