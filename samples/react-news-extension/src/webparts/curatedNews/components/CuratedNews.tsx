import * as React from "react";
import styles from "./CuratedNews.module.scss";
import { ICuratedNewsProps } from "./ICuratedNewsProps";
import { Card, Col, Row, Space, Spin, Tag } from "antd";
import Meta from "antd/lib/card/Meta";
import SPService from "../../../services/SPService";
import { ISearchResult } from "@pnp/sp/search";
import GraphService from "../../../services/GraphService";
import CachingService from "../../../services/CachingService";
import { ITerm } from "../../preferences/types/Component.Types";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";

export const CuratedNews: React.FC<ICuratedNewsProps> = (props) => {
  const {
    extensionName,
    loginName,
    title,
    managedPropertyName,
    context,
    newsPageLink,
    enableCaching,
  } = props;
  const [data, setData] = React.useState<ISearchResult[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const preferenceCacheKey = `CuratedNews-UserPreferences-${loginName}`;

  // const personDetails = {
  //   displayName: "Ejaz Hussain",
  // };

  const onConfigure = () => {
    // Context of the web part
    context.propertyPane.open();
  };

  const getUserPreferences = async () => {
    const cachedData = CachingService.get(preferenceCacheKey);
    if (cachedData !== null) {
      return cachedData;
    }

    const result = await GraphService.GetPreferences(extensionName);
    if (result && result.Tags && result.Tags.length > 0 && enableCaching) {
      CachingService.set(preferenceCacheKey, result.Tags);
    }

    return result.Tags || [];
  };

  const fetchData = React.useCallback(async () => {
    setLoading(true);
    const tags = await getUserPreferences();
    console.log(tags);
    const queryTemplate = composeQueryTemplate(tags);
    const result = await SPService.getSearchResults(queryTemplate);
    return result;
  }, []);

  React.useEffect(() => {
    fetchData()
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [fetchData]);

  if (!extensionName || !managedPropertyName || !newsPageLink) {
    return (
      <Placeholder
        iconName="Edit"
        iconText="Configure your web part"
        description="Please provide the Microsoft Graph open extension name and managed property name."
        buttonLabel="Configure"
        onConfigure={onConfigure}
      />
    );
  }

  return (
    <section>
      <div className={styles["news-container"]}>
        <Spin spinning={loading} tip="Loading...">
          <Card
            title={title}
            headStyle={{ fontSize: "2rem" }}
            extra={<a href={newsPageLink}>See all</a>}
          >
            <Row gutter={16}>
              {data.length > 0 &&
                data.map((newsItem: any) => {
                  const tags: string[] = newsItem.O3CTax1
                    ? newsItem.O3CTax1.split(";")
                    : [];
                  return (
                    <Col key={newsItem.DocId} span={6}>
                      <Card
                        hoverable
                        bordered={false}
                        cover={
                          <img
                            alt={newsItem.Title}
                            src={newsItem.PictureThumbnailURL}
                          />
                        }
                        actions={[
                          <>
                            <Space size={[0, 8]} wrap key={newsItem.DocId}>
                              {tags.length > 0 &&
                                tags.map((tag, index) => {
                                  return (
                                    <Tag key={index} color="#108ee9">
                                      {tag}
                                    </Tag>
                                  );
                                })}
                            </Space>
                          </>,
                        ]}
                      >
                        <Meta
                          title={
                            <>
                              <span>{newsItem.Title}</span>
                            </>
                          }
                          description={
                            <>
                              <span className={styles.description}>
                                {newsItem.Description}
                              </span>
                              <div style={{ marginTop: 10 }}> </div>
                            </>
                          }
                        />
                      </Card>
                    </Col>
                  );
                })}
            </Row>
          </Card>
        </Spin>
      </div>
    </section>
  );

  function composeQueryTemplate(tags: ITerm[]) {
    let filterQuery = "";
    if (!tags || tags.length === 0) {
      filterQuery = "";
    }
    if (Array.isArray(tags) && tags.length > 0) {
      const taxValues = `(${tags.map((tag) => tag.id).join(" OR ")})`;
      filterQuery = `({|${managedPropertyName}:${taxValues}})`;
    }

    const queryTemplate = `{searchTerms} (ContentTypeId:0x0101009D1CB255DA76424F860D91F20E6C4118*) PromotedState=2 ${
      filterQuery ? filterQuery : ""
    } `;

    return queryTemplate;
  }
};
