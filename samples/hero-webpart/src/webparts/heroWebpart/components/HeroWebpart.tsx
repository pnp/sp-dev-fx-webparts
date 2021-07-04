import * as React from 'react';
import styles from './HeroWebpart.module.scss';
import { IHeroWebpartProps } from './IHeroWebpartProps';
import {IHeroState} from './IHeroWebpartState';
import { escape } from '@microsoft/sp-lodash-subset';
import { Pagination } from "@pnp/spfx-controls-react/lib/pagination";
import { PnPClientStorage } from "@pnp/common";
import { IHeroLayoutProps } from './IHeroLayoutProps';
import Hero from './HeroLayout';
import { sp } from '@pnp/sp';
import { Stack, IStackProps, IStackTokens } from 'office-ui-fabric-react/lib/Stack';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

const stackTokens: IStackTokens = { childrenGap: 20 };

const rowProps: IStackProps = { horizontal: true, verticalAlign: 'center' };

const tokens = {
  sectionStack: {
    childrenGap: 10,
  },
  spinnerStack: {
    childrenGap: 20,
  },
};

const storage = new PnPClientStorage();

export default class HeroWebpart extends React.Component<IHeroWebpartProps, IHeroState> {

  constructor(props: IHeroWebpartProps) {
    super(props);
    sp.setup({
      spfxContext: this.props.spfxContext
    });
    this.state = {
      items: this.props.items || [],
      itemsPaginated: this.props.items.slice(0,5) || [],
      currentPage: 1,
      totalPages: Math.ceil(this.props.items.length / 5),
      pageLimit: 5
    };
    this._getItems();
    // Delete any expired cache items
    // storage.local.deleteExpired();
    // // Get items from cache if they exist
    // const items = storage.local.get("c70a33331a1e4172bd87d46ee92af341");
    // if (items===null || undefined===items[0]){
    //     this._getItems();
    // }else{
    //   this.setState({items: items,itemsPaginated:items.slice(0,5),totalPages:Math.ceil(items.length / 5)});
    // }

  }

  private _getItems(){
    this.setState({itemsPaginated:this.state.items.slice(0,5),totalPages:Math.ceil(this.state.items.length / 5)});

  }

  private _getPage(page: number){
    this.setState({currentPage: page});
    var itemsSlice:any[], totalPages:number;
    itemsSlice = this.state.items.slice((page - 1) * this.state.pageLimit, ((page - 1) * this.state.pageLimit) + this.state.pageLimit);
    itemsSlice.length==0 ? this.setState({itemsPaginated: this.emptyCourse()}) : this.setState({itemsPaginated: itemsSlice},this.render);
  }

  private emptyCourse(){
    var b=[];
      for (let i = 0; i < this.state.pageLimit; i++) {
        b.push({
          id:"",
          thumbnail: require('../assets/blankEntry.jpg'),
          title: "Coming soon!",
          name: "",
          profileImageSrc: "",
          courseCode: "",
          activity: "",
          description: "We don't have anything here yet, we're always open to suggestions!",
          enrollment: "",
          SPurl: ""
        });
      }
    return b;
  }

  public render(): React.ReactElement<IHeroWebpartProps> {
    // if(this.state.items!=this.props.items){
    //   this.setState({items :this.props.items});
    // }
    if(this.state.items.length<1){
      //this._getItems();
      return(
        <Stack {...rowProps} tokens={tokens.spinnerStack}>
          <Label>Loading</Label>
          <Spinner size={SpinnerSize.large} />
        </Stack>
      );
    }else{
    var itemList:any[];
    this.props.showAllHero ? itemList = this.state.itemsPaginated : itemList = this.state.items;   
    }

    return (
      <div className={styles.heroWebpart}>
       <div className={styles.titleHead}>
         {this.props.title}
       </div>
       <Hero items={this.props.showAllHero ? this.state.itemsPaginated : this.state.items.slice(0, 5)}/>
         {this.props.showAllHero ? 
         <Pagination
           currentPage={this.state.currentPage}
           totalPages={this.state.totalPages} 
           onChange={(page) => this._getPage(page)}
           limiter={5} // Optional - default value 3
           hideFirstPageJump={this.props.hideFirstPageJump} // Optional
           hideLastPageJump={this.props.hideLastPageJump} // Optional
           limiterIcon={"Emoji12"} // Optional
           /> : "" }
          </div>
    );
  }
}


