import * as React from "react";
import { useState, useEffect } from "react";
import "./styles.css";

import { IInstagramFeedProps } from "./IInstagramFeedProps";
import {
  Shimmer,
  ShimmerElementsGroup,
  ShimmerElementType,
} from "office-ui-fabric-react/lib/Shimmer";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { mergeStyles } from "office-ui-fabric-react/lib/Styling";
import { MessageBar, MessageBarType } from "office-ui-fabric-react";

import { FocusZone } from "office-ui-fabric-react/lib/FocusZone";
import {
  IPersonaSharedProps,
  Persona,
} from "office-ui-fabric-react/lib/Persona";

import { List } from "office-ui-fabric-react/lib/List";

import * as strings from "InstagramFeedWebPartStrings";
import { IInstagramFeed } from "../models/IInstagramFeed";
import { IError } from "../models/IError";
import { uniqueId } from "lodash";

//import swiper and required css
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";

import "swiper/swiper-bundle.css";
import "swiper/modules/navigation/navigation.min.css";
import "swiper/modules/pagination/pagination.min.css";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

const shimmerWrapperClass = mergeStyles({
  padding: 2,
  selectors: {
    "& > .ms-Shimmer-container": {
      margin: "10px 0",
    },
  },
});

const InstagramFeed: React.FC<IInstagramFeedProps> = (props) => {
  const [error, setError] = useState<IError>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [items, setItems] = useState<IInstagramFeed[]>(null);
  

  const handleSuccess = (success: string) : void  => {
    const json = JSON.parse(success);
    if (json.data !== null) {
      const data = json.data;
      setItems(data);
      setIsLoaded(true);
      setError(null);
    }
  };

  const handleFailure = (error:number): void  => {
    const failure: IError = {
      heading: strings.ErrorHeading,
      message: strings.ErrorMessage,
      status: error,
    };
    setItems(null);
    setIsLoaded(true);
    setError(failure);
  }
  
  const getData = (count: number): void  => {
    if (props.userToken !== null) {
      const params = {
        url: `https://graph.instagram.com/me/media?fields=media_type,media_url,caption,permalink&access_token=${props.userToken}`,
        container: "none",
      };

      try {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", params.url);
        xhr.onload = () => {
          if (xhr.status === 200) {
            handleSuccess(xhr.responseText);
          } else if (xhr.status === 404) {
            handleFailure(xhr.status);
          } else {
            getData(1);
          }
        };
        xhr.send();
      } catch (exception) {
        if (0 === count) {
          getData(1);
        } else {
          throw exception;
        }
      }
    }
  };
  
  const _loadData = () : void => {
    try {
      getData(0);
    } catch (exception) {
      console.warn(`${exception.code}-${exception.name}: ${exception.message}`);
      const failure: IError = {
        heading: strings.ExceptionHeading,
        message: strings.ExceptionMessage,
        status: 500,
      };
      // show exception
      setItems(null);
      setIsLoaded(true);
      setError(failure);
    }
  };

  useEffect(() => {
    _loadData();
  }, []);

  
  const _profilePersona = (): JSX.Element => {
    const examplePersona: IPersonaSharedProps = {
      imageUrl: require("../images/instagramIcon.png"),
      imageInitials: "IG",
      text: props.userFullName,
      secondaryText: props.accountName,
    };

    return <Persona {...examplePersona} />;
  };

  const _loadingShimmer = (): JSX.Element => {
    return (
      <div style={{ display: "flex" }}>
        <ShimmerElementsGroup
          shimmerElements={[
            { type: ShimmerElementType.line, width: 100, height: 100 },
            { type: ShimmerElementType.gap, width: 10, height: 100 },
            { type: ShimmerElementType.line, width: 100, height: 100 },
            { type: ShimmerElementType.gap, width: 10, height: 100 },
          ]}
        />
      </div>
    );
  };

  const _errorNotification = (): JSX.Element => {
    console.error(`${error.status}: ${error.message}`);
    return (
      <MessageBar
        messageBarType={MessageBarType.error}
        isMultiline={false}
        truncated={true}
      >
        <strong>{error.heading}</strong>
        {error.message ? " - " + error.message : ""}
      </MessageBar>
    );
  };

  const _onRenderCell = (item: IInstagramFeed[]): JSX.Element => {
    const feeds = [];
    for (const post of item) {
      if (post.media_type === "VIDEO") {
        feeds.push(
          <SwiperSlide key={uniqueId("prefix-")}>
            <div data-is-focusable={true} role="img">
              <div className="content">
                <a target="_blank" rel="noreferrer" href={post.permalink}>
                  <video src={post.media_url} className="postVideo" />
                  {post.caption ? <div>{post.caption}</div> : ""}
                </a>
              </div>
            </div>
          </SwiperSlide>
        );
      } else {
        feeds.push(
          <SwiperSlide key={uniqueId("prefix-")}>
            <div data-is-focusable={true} role="img">
              <div className="content">
                <a target="_blank" rel="noreferrer" href={post.permalink}>
                  <img src={post.media_url} className="postImage" />
                  {post.caption ? <div>{post.caption}</div> : ""}
                </a>
              </div>
            </div>
          </SwiperSlide>
        );
      }
    }

    return (
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        navigation={true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {feeds}
      </Swiper>
    );
  };
  
  const _onRenderCellFull = (item: IInstagramFeed[]): JSX.Element => {
    const feeds = [];
    for (const post of item) {
      if (post.media_type === "VIDEO") {
        feeds.push(
          <SwiperSlide key={uniqueId("prefix-")}>
            <div data-is-focusable={true} role="img">
              <div className="content">
                <a target="_blank" rel="noreferrer" href={post.permalink}>
                  <video src={post.media_url} className="postVideoFull" />
                  {post.caption ? <div>{post.caption}</div> : ""}
                </a>
              </div>
            </div>
          </SwiperSlide>
        );
      } else {
        feeds.push(
          <SwiperSlide key={uniqueId("prefix-")}>
            <div data-is-focusable={true} role="img">
              <div className="content">
                <a target="_blank" rel="noreferrer" href={post.permalink}>
                  <img src={post.media_url} className="postImageFull" />
                  {post.caption ? <div>{post.caption}</div> : ""}
                </a>
              </div>
            </div>
          </SwiperSlide>
        );
      }
    }

    return (
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        navigation={true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {feeds}
      </Swiper>
    );
  };

  if (error) {
    return _errorNotification();
  } else if (!isLoaded) {
    return (
      <Fabric className={shimmerWrapperClass}>
        <Shimmer customElementsGroup={_loadingShimmer()} width={"45%"} />
      </Fabric>
    );
  } else if (items !== null) {
    return (
      <div className="instagramFeed">
        {props.showIcon ? _profilePersona() : ""}

        <FocusZone>
          <List
            items={[items]}
            onRenderCell={
              props.layoutOneThirdRight
                ? _onRenderCell
                : _onRenderCellFull
            }
          />
        </FocusZone>
      </div>
    );
  }
}

export default InstagramFeed;