import { IArticle } from "../../../services/IArticle";
import {
  Label,
  Text,
  DocumentCardActivity
} from "office-ui-fabric-react";
import * as moment from "moment";
import styles from "../News.module.scss";
import * as React from "react";
import * as strings from "NewsWebPartStrings";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const _defaultImage:string = require("./../../../../assets/news.jpg");

export const NewsItem = (props: { article: IArticle }):JSX.Element => {
  const { article } = props;
  return (
    <>
     <div
      className={styles.card}
      onClick={ev => {
        ev.preventDefault();
        window.open(article.url, "_blank");
      }}
       >
         <div
         style={{
           width:180,
           height: '100%'
         }}
         >
          <img
            className={styles.image}
            src={
              article.urlToImage
                ? article.urlToImage
                : _defaultImage
            }
            width="180"
            height="180"
            onError={(ev)=> {
              ev.currentTarget.setAttribute('src',_defaultImage); // set Default image if can not load article image
              }}
          ></img>

         </div>
         <div
         style={{
          width: '100%',
          display:'Flex',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'sflex-start'
         }}
         >

           <Label className={styles.newsTitle} >
           {article.title.trim()}
           </Label>
          <div>

          <Text
             className={styles.secondaryText}
              variant='medium'
             block

              title={
                article.description
                  ? article.description.trim()
                  : strings.CanNotShowArticleTextMessage
              }
            >
              {article.description
                ? article.description.trim()
                : strings.CanNotShowArticleTextMessage}
            </Text>
            <DocumentCardActivity
            className={styles.author}
            activity={moment(article.publishedAt).format("LL")}
            people={[
              {
                name: article.source.name
                  ? article.source.name
                  : article.author
                  ? article.author
                  : strings.AuthorNotAvailableMessage,
                profileImageSrc: ""
              }
            ]}
          />
          </div>
         </div>
     </div>
    </>
  );
};
