import * as React from 'react';
import styles from './PeopleSlick.module.scss';
import type { IPeopleSlickProps } from './IPeopleSlickProps';

// PnP Js
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/sites";
import { SPFx, spfi } from "@pnp/sp";
 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Interface of list columns. Name must match with Sharepoint column internal name
interface CarousalItem {
  Id: number;
  Title: string;
  JobTitle: string;
  Department: string;
  Employee: PersonItem[];
  EmailAddress: string;
  RedirectURL:{
    Url: string;
  }

}
interface PersonItem{
  ID:number;
  Title: string;
}
 
interface IState {
  listItems: CarousalItem[];
  
  loading: boolean;
}

export default class PeopleSlick extends React.Component<IPeopleSlickProps, IState> {
  constructor(props: IPeopleSlickProps) {
    super(props);
    this.state = {
      loading: true,
    
      listItems: [],
    };
  }

 
public async componentDidMount():  Promise<undefined> {
  await this.getDataFromList();
return;
}

private async getDataFromList() :Promise<undefined>  {
console.log("Getting data from list");
try {
    const sp = await spfi().using(SPFx(this.props.context));

    
    const items = await sp.web.lists
      .getByTitle(this.props.listName)
      .items.filter("Active eq 1")
      .top(this.props.recordToReturn)
      .orderBy("PublishedDate", false)();

    this.setState({
      listItems: items,
      loading: false
    });}catch(error){console.log(error.message);}
    return;
  }


   public render(): React.ReactElement<IPeopleSlickProps> {
      const settings = {
    dots: this.props.showDots,
    infinite: true,
    speed: 500,
    slidesToShow: this.props.slidesToShow,
    slidesToScroll: this.props.slidesToScroll,
    autoplay: this.props.enableAutoplay,
    autoplaySpeed: this.props.autoplaySpeed * 1000,
    adaptiveHeight: true,
     className: "",
    cssEase: "linear",
     responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
  };

    return (
      <section className={`${styles.peopleSlick} `}>
          {this.state.loading && <p>Loading...</p>}
           <div className={styles.mainContainer}><p className={styles.webpartName}>{this.props.webpartName}</p>
          <Slider {...settings}>
            {this.state.listItems.map((item: CarousalItem) => {
              return (
                <div className={styles.carousalItem} key={item.Id}>
                  <p className={styles.profile}><img width='200' src={`${this.props.rootSiteURL}/_layouts/15/userphoto.aspx?size=L&accountname=${item.EmailAddress}`} /></p>
                  <p className={styles.title}>{item.Title}</p>
                  <p className={styles.description}>{item.JobTitle}, {item.Department}</p>
                  {item.RedirectURL && (
                    <p className={styles.viewMoreP}>
                      <button
                      className={styles.viewMore}
                      onClick={() => {
                        window.open(item.RedirectURL.Url, "_blank");
                      }}
                    >
                      Read more
                    </button>
                    </p>
                  )}
                </div>
              );
            })}
          </Slider>
        </div>
      </section>
    );
  }
}
