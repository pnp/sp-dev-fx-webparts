/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import styles from "./News.module.scss";
import { INewsProps } from "./INewsProps";
import { INewsState } from "./INewsState";
import dataservices from "../../services/dataservices";
import { NewsItem } from "./NewsItem/NewsItem";
import { NoNews } from "./NoNews";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { NewsTile } from "./NewsTile/NewsTile";
import * as strings from "NewsWebPartStrings";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import {
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType} from "office-ui-fabric-react";
import { INewsResults } from "../../services/INewsResults";
import Pagination from "@material-ui/lab/Pagination";

export default class News extends React.Component<INewsProps, INewsState> {
  constructor(props: INewsProps) {
    super(props);

    this.state = {
      isLoading: false,
      hasError: false,
      errorMesage: null,
      articles: [],
      currentPage: 1,
      totalPages: 0
    };
  }

  private _onConfigure = () => {
    this.props.context.propertyPane.open();
  }
  // Component Did Mount
  public async componentDidMount(): Promise<void> {
    //await dataservices.init(this.props.context);
    this._getNews(
      this.props.newsUrl,
      this.props.apiKey,
      this.state.currentPage,

    );
  }

  // Component Did Update
  public async componentDidUpdate(
    prevProps: INewsProps

  ): Promise<void> {
    if (
      this.props.newsUrl !== prevProps.newsUrl ||
      this.props.apiKey !== prevProps.apiKey
    ) {
      this._getNews(
        this.props.newsUrl,
        this.props.apiKey,
        1 // force current page to 1 because new propeerties defined
      );
    }
  }

  // Get News from newsApi.org
  private _getNews = async (newsUrl: string, apiKey: string, page?: number) => {
    try {
      const { pageSize } = this.props;
      this.setState({ isLoading: true, hasError: false, errorMesage: "" });
      const results:any = await dataservices.getNews(newsUrl, apiKey, page);

      if (results && results.status == "error") {
        throw new Error(results.message);
      }

      // calculate number of pages
      let _reminder: number = (results as INewsResults).totalResults % pageSize; // get Reminder
      _reminder = _reminder ? 1 : 0;
      const _totalPages: number =
        parseInt((results.totalResults / pageSize).toString()) + _reminder;

      this.setState({
        articles: results ? results.articles : [],
        isLoading: false,
        hasError: false,
        errorMesage: "",
        totalPages: _totalPages,
        currentPage: page
      });
    } catch (error) {
      console.log("error", error);
      this.setState({
        isLoading: false,
        hasError: true,
        errorMesage: error.message
      });
    }
  }

  // Render WebPart
  public render(): React.ReactElement<INewsProps> {
    const { isLoading, errorMesage, articles, hasError } = this.state;
    const _renderNews: JSX.Element[] = [];

    if (articles && articles.length > 0) {
      for (const article of articles) {
        if (!this.props.viewOption || this.props.viewOption == "list") {
          _renderNews.push(<NewsItem article={article} key={article.title} />);
        } else {
          _renderNews.push(<NewsTile article={article} key={article.title} />);
        }
      }
    }

    return (

        <div className={styles.News}>
          {!this.props.apiKey || !this.props.newsUrl ? (
            <Placeholder
              iconName="Edit"
              iconText={strings.ConfigureWebPartMessage}
              description={strings.configureWebPartTextMessage}
              buttonLabel={strings.ConfigureWebPartButtonLabel}
              onConfigure={this._onConfigure}
            />
          ) : (
            <>
              <WebPartTitle
                displayMode={this.props.displayMode}
                title={this.props.title}
                className={styles.title}
                updateProperty={this.props.updateProperty}
              />
              {isLoading ? (
                <Spinner size={SpinnerSize.medium} label="Loading..." />
              ) : hasError ? (
                <>
                  <MessageBar messageBarType={MessageBarType.error}>
                    {errorMesage}
                  </MessageBar>
                </>
              ) : _renderNews.length > 0 ? (
                <>
                  <div
                    className={
                      this.props.viewOption == "tiles"
                        ? styles.cardsTiles
                        : styles.cardsItem
                    }
                  >
                    {_renderNews}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginTop: 10,
                      marginBottom: 20,
                      justifyContent: "center"
                    }}
                  >
                    {this.state.totalPages > 1 && (
                      <>
                        <Pagination
                          color="primary"
                          count={this.state.totalPages}
                          page={this.state.currentPage}
                          style={{marginTop: 30}}
                          onChange={(event, page) => {
                            this._getNews(
                              this.props.newsUrl,
                              this.props.apiKey,
                              page
                            );
                          }}
                        />
                      </>
                    )}
                  </div>
                </>
              ) : (
                <NoNews />
              )}
            </>
          )}
        </div>
    );
  }
}
