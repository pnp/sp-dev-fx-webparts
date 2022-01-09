import * as React from 'react';
import styles from './ReactQuotes.module.scss';
import { IReactQuotesProps } from './IReactQuotesProps';
import { IReactQuotesState } from './IReactQuotesState';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import axios from 'axios';

export default class ReactQuotes extends React.Component<IReactQuotesProps, IReactQuotesState> {

  constructor(props: IReactQuotesProps) {
    super(props);

    this.state = {
      quote: "",
      author: "",
      loading: false
    };
  }

  public render(): React.ReactElement<IReactQuotesProps> {
    return (
      <div className={styles.reactQuotes}>
        <h2>{this.props.description}</h2>
        {this.state.loading !== true ?
          //If state is loading show spinner otherwise show quote
          <div>
            {this.props.manual !== true ?
              //If manual quote is not on then show quote generated from third party
              <div>
                <h3 style={{ color: this.props.quoteColor }}>"<i>{this.state.quote}</i>"</h3>
                <h5 style={{ color: this.props.authorColor }}>- {this.state.author}</h5>
              </div>
              : //Show Manual quote
              <div>
                <h3 style={{ color: this.props.quoteColor }}>"<i>{this.props.manualQuote}</i>"</h3>
                <h5 style={{ color: this.props.authorColor }}>- {this.props.manualAuthor}</h5>
              </div>
            }
          </div>
          :
          <div>
            <Spinner label="Loading quote..." />
          </div>
        }
      </div>
    );
  }

  public componentDidMount() {
    console.log(this.props.manual);
    this.setState({ loading: true });
    axios.get('https://favqs.com/api/qotd').then(res => {
      const quote = res.data.quote.body;
      const author = res.data.quote.author;
      this.setState({
        quote: quote,
        author: author,
        loading: false
      });
    });
  }

}
