import React from "react";
import {
  ISportsHightLightsProps,
  ISportsHighlightPagingState,
  ISportsHighlightProps,
} from "./IReactSpFxProps";
import SportVideoListFilmStripView from "./SportVideoListFilmStripView";
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import axios from "axios";
import SportsVideoList from "./SportsVideoList";


export default class SportsHighlightsList extends React.Component<
  ISportsHightLightsProps,
  ISportsHighlightPagingState
> {
  constructor(
    props: ISportsHightLightsProps,
    state: ISportsHighlightPagingState
  ) {
    super(props);
    this.state = {
      pagedSportHighlights: [],
      slicedSportHighlights: [],
    };
  }

   public GetData = async () => {
    const resp = await axios.get(`https://www.scorebat.com/video-api/v1/`);
    const data : ISportsHighlightProps[] = await resp.data;
    let slicedItems : ISportsHighlightProps[] = data.slice(0, this.props.pageSize);
    this.setState({ pagedSportHighlights: data, slicedSportHighlights: slicedItems });
  }

  public async componentDidMount() {
    console.log("Mounted");
    this.GetData();
  }

  public render(): React.ReactElement<ISportsHightLightsProps> {

    
    if(!this.props.showFlatMode){
      return <SportVideoListFilmStripView highLights={this.state.slicedSportHighlights} />;
    }

    let pageCountDivisor: number = this.props.pageSize;
    let pageCount: number;
    let pageButtons = [];
    let highlightItems = this.state.pagedSportHighlights;

    let _pagedButtonClick = (pageNumber: number, listData: any) => {
      let startIndex: number = (pageNumber - 1) * pageCountDivisor;
      let endIndex = startIndex + pageCountDivisor;
      let listItemsCollection = [...listData];
      let slicedItems: ISportsHighlightProps[] = listItemsCollection.slice(
        startIndex,
        endIndex
      );
      this.setState({
        slicedSportHighlights: slicedItems
      });
    };
    
    var pagedItems: JSX.Element = (<SportsVideoList videos={this.state.slicedSportHighlights} />  );
    if (highlightItems.length > 0) {
      pageCount = Math.ceil(highlightItems.length / pageCountDivisor);
    }
    for (let i = 0; i < pageCount; i++) {
      pageButtons.push(
        <PrimaryButton key={i} style={{width:"50px"}}
          onClick={() => {
            _pagedButtonClick(i + 1, highlightItems);
          }}
        >
          {" "}
          {i + 1}{" "}
        </PrimaryButton>
      );
    }  
    return (
      <div>
 <div className={`ms-Grid-row`} style={{paddingLeft:"8px"}}>
          <div className="ms-Grid-col ms-u-lg12">{pageButtons}</div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-lg12">{pagedItems}</div>
        </div>
      </div>
    );
  }
}
