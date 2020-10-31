import React from "react";
import ReactDOM from "react-dom";
import {
  ISportsHightLightsProps,
  ISportsHighlightPagingState,
  IVideo,
} from "./IReactSpFxProps";
import SportsHighlight from "./SportsHighlight";
import Paging from "react-paging";
import Pagination from "./Pagination";

export default class SportsHighlightsList extends React.Component<
  ISportsHightLightsProps,
  ISportsHighlightPagingState
> {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      indexOfFirstHighlight: 1,
      indexOfLastHighlight: 5,
      highLightsPerPage: this.props.pageSize,
    };
  }


  paginate = (page) => {
    console.clear();

    const indexOfLastHighlight =
      this.state.currentPage * this.state.highLightsPerPage;
    const indexOfFirstHighlight =
      indexOfLastHighlight - this.state.highLightsPerPage;

    this.setState({
      currentPage: page,
      indexOfLastHighlight: indexOfLastHighlight,
      indexOfFirstHighlight: indexOfFirstHighlight,
    });
  };

  //paginate = (pageNumber) => setCurrentPage(pageNumber);

  render(): React.ReactElement<ISportsHightLightsProps> {
    const sportsHighlights = this.props.sportsHighlights;
    var {
      currentPage,
      indexOfFirstHighlight,
      indexOfLastHighlight,
    } = this.state;


    if (typeof indexOfFirstHighlight === "undefined" || indexOfFirstHighlight == 0)
    {
       indexOfFirstHighlight=1
    }

    if (
      typeof indexOfFirstHighlight === "undefined" ||
      indexOfFirstHighlight == 0
    ) {
      indexOfFirstHighlight = 1;
    }
      const CurrentsportsHighlights = this.props.sportsHighlights.slice(
        indexOfFirstHighlight,
        indexOfLastHighlight
      );

    console.clear();
    console.log("indexOfFirstHighlight:" + indexOfFirstHighlight);
    console.log("indexOfLastHighlight : " + indexOfLastHighlight);
    console.log("currentPage          :" + currentPage);
    console.log("Page Size            :" + this.props.pageSize);

    //this.updateLastPage(currentPage);

    return (
      <div>
        <div className="paginationDiv">
          <Pagination
            highLightsPerPage={10}
            totalHighlights={sportsHighlights.length}
            paginate={this.paginate}
          />
        </div>
        <div>
          {CurrentsportsHighlights.map((highLight, i) => (
            <SportsHighlight {...highLight} key={i} />
          ))}
        </div>
      </div>
    );
  }
}
