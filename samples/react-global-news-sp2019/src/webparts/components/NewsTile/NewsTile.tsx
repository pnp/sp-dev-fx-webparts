
import { IArticle } from "../../../services/IArticle";
import {
  Text,
  DocumentCard,
  DocumentCardTitle,
  DocumentCardDetails,
  DocumentCardActivity,
} from "office-ui-fabric-react";
import * as moment from "moment";
import styles from "./NewsTile.module.scss";
import  * as React from "react";
import * as strings from "NewsWebPartStrings";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const _defaultImage: string = require("../../../../assets/news.jpg");

export const NewsTile = (props: { article: IArticle }):JSX.Element => {
  const { article } = props;

  return (
    <>
      <DocumentCard
        className={styles.cardTile}
        onClick={ev => {
          ev.preventDefault();
          window.open(article.url, "_blank");
        }}
      >
        <div style={{ minWidth: "100%", maxHeight: 160 }}>
          <img
            className={styles.image}
            src={article.urlToImage ? article.urlToImage : _defaultImage}
            width={"100%"}
            height={160}
            onError={ev => {
              ev.currentTarget.setAttribute("src", _defaultImage); // set Default image if can not load article image
            }}
          ></img>
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", marginTop: 25 }}
        >
          <DocumentCardTitle
            title={article.title}
            shouldTruncate={true}
            className={styles.newsTitle}
          ></DocumentCardTitle>
          <DocumentCardDetails styles={{ root: { paddingBottom: 25 } }}>
            <Text block variant="mediumPlus" className={styles.descriptionTile}>
              {article.description
                ? article.description
                : strings.CanNotShowArticleTextMessage}
            </Text>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            ></div>
          </DocumentCardDetails>
          <div className={styles.separator}></div>
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
                profileImageSrc: "",
              }
            ] }
          />
        </div>
      </DocumentCard>
    </>
  );
};
