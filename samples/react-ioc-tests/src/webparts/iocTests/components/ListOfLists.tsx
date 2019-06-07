import * as React from 'react';
import styles from './ListOfLists.module.scss';
import IListsService, { IList } from '../../../common/services/Lists/IListsService';
import ICacheProvider, { CacheTimeout } from '../../../common/providers/Cache/ICacheProvider';
import ILogProvider from '../../../common/providers/Log/ILogProvider';

export interface IListOfListsProps {
  description: string;
  cacheProvider: ICacheProvider;
  logProvider: ILogProvider;
  listsService: IListsService;
}

export interface IListOfListsState {
  lists: IList[];
  isLoading: boolean;
}

export default class ListOfLists extends React.Component<IListOfListsProps, IListOfListsState> {
  private className: string = "ListOfLists";

  constructor(props: IListOfListsProps) {
    super(props);
    this.state = {
      lists: [],
      isLoading: true
    };
  }

  public async componentDidMount(): Promise<void> {
    // LOG PROVIDER
    await this.props.logProvider.Debug(this.className, "componentDidMount", null);

    // CACHE PROVIDER
    const cacheKey = "ListOfListsGetLists";
    let lists: IList[] = await this.props.cacheProvider.Get(cacheKey);
    if (!lists) {
      // LISTS SERVICE
      lists = await this.props.listsService.GetLists();

      // CACHE PROVIDER
      await this.props.cacheProvider.Set(cacheKey, lists, CacheTimeout.default);
    }

    this.setState({
      lists: lists,
      isLoading: false
    });
  }

  public render(): React.ReactElement<IListOfListsProps> {
    this.props.logProvider.Debug(this.className, "render", null);

    return (
      <div id={ styles.ListOfLists } className={ styles.ListOfLists }>
        <div className={ styles.container }>
          { !!this.props.description &&
            <div>{this.props.description}</div>
          }
          { !!this.state.isLoading &&
            <span> Loading... </span>
          }
          { this.state.lists.map(l => {
              return (
                <div key={l.Title}>
                  <a href={l.DefaultViewUrl} target={"_blank"}>{l.Title}</a>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}
