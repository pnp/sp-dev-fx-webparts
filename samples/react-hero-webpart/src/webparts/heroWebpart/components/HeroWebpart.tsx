import * as React from 'react';
import styles from './HeroWebpart.module.scss';
import { IHeroWebpartProps } from './IHeroWebpartProps';
import {IHeroState} from './IHeroWebpartState';
import { Pagination } from "@pnp/spfx-controls-react/lib/pagination";
import Hero from './HeroLayout';
import { sp } from '@pnp/sp';
import { Stack, IStackProps, IStackTokens } from 'office-ui-fabric-react/lib/Stack';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";  
import { DisplayMode } from '@microsoft/sp-core-library'; 

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

export default class HeroWebpart extends React.Component<IHeroWebpartProps, IHeroState> {

  constructor(props: IHeroWebpartProps) {
    super(props);
    sp.setup({
      spfxContext: this.props.spfxContext
    });
    this.state = {
      items: this.props.items || [],
      itemsPaginated: this.props.items.length>0?this.props.items.slice(0,5):[],
      currentPage: 1,
      totalPages: this.props.items.length>0?Math.ceil(this.props.items.length / 5):1,
      pageLimit: this.props.pageLimit
    };
    this._getItems();
  }

  private _getItems(){
    let empty=[];
    if(this.state.items.length>0){
    this.setState({itemsPaginated:this.state.items.slice(0,5)}),this.setState({totalPages:Math.ceil(this.state.items.length / 5)});
    }else{
    empty=this.emptyHeroItem();this.setState({items:empty}),this.setState({itemsPaginated:empty});
    }
  }

  private _getPage(page: number){
    this.setState({currentPage: page});
    var itemsSlice:any[], totalPages:number;
    itemsSlice = this.state.items.slice((page - 1) * this.state.pageLimit, ((page - 1) * this.state.pageLimit) + this.state.pageLimit);
    itemsSlice.length==0 ? this.setState({itemsPaginated: this.emptyHeroItem()}) : this.setState({itemsPaginated: itemsSlice},this.render);
  }

  private emptyHeroItem(){
    var b=[];
      for (let i = 0; i < this.state.pageLimit; i++) {
        b.push({
          Title: "Coming soon!",
          description: "We don't have anything here yet, we're always open to suggestions!",
          Hyperlink:"",
          filePicker:[{fileAbsoluteUrl:require('../assets/blankEntry154873.jpg'),fileName:'blankEntry154873.jpg',fileNameWithoutExtension:'blankEntry154873'}]
        });
      }
    return b;
  }

  public componentDidUpdate(prevProps : IHeroWebpartProps, prevState : IHeroState) : void 
  {
      // If properties have changed bind it and update webpart
      if(this.props.items !== prevProps.items && this.props.items.length!==0)
      {
        this.setState({items:this.props.items});
        if(this.props.showAllHero){
          this._getPage(this.state.currentPage);
        }
      }
  }

  public render(): React.ReactElement<IHeroWebpartProps> {
    if(this.state.items.length<=0){
      this._getItems();
      return(
        <Stack {...rowProps} tokens={tokens.spinnerStack}>
          <Label>Loading</Label>
          <Spinner size={SpinnerSize.large} />
        </Stack> &&
        <Placeholder iconName='Edit'  
          iconText='Configure your web part'  
          description='Please configure the web part.'  
          buttonLabel='Configure'  
          hideButton={this.props.displayMode === DisplayMode.Read}  
          onConfigure={this._onConfigure} />  
      );
    }else{
    var itemList:any[] = this.state.items;
    this.props.showAllHero && !this.props.showCollage ? itemList = this.state.itemsPaginated : itemList = this.state.items;   
    }

    return (
      <div className={styles.heroWebpart}>
       <div className={styles.titleHead}>
         {this.props.title}
       </div>
        {this.props.showAllHero &&
          <>
          <Hero items={this.props.showAllHero ? this.state.itemsPaginated : this.state.items.slice(0, 5)} isCollage={this.props.showCollage}/>
          <Pagination
           currentPage={this.state.currentPage}
           totalPages={this.state.totalPages} 
           onChange={(page) => this._getPage(page)}
           limiter={5} // Optional - default value 3
           hideFirstPageJump={this.props.hideFirstPageJump} // Optional
           hideLastPageJump={this.props.hideLastPageJump} // Optional
           limiterIcon={"Emoji12"} // Optional
          /> 
          </>
        }
        {!this.props.showAllHero &&
          <Hero items={this.state.items} isCollage={this.props.showCollage}/>
        }
      </div>
    );
  }

  private _onConfigure() {  
    // Context of the web part  
    this.props.spfxContext.propertyPane.open();  
  }  
}


