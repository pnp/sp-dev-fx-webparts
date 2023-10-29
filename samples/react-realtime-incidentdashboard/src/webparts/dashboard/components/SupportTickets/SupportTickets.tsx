import { Guid } from "@microsoft/sp-core-library";
import { IListSubscription } from "@microsoft/sp-list-subscription";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../hooks/AppContext";
import SPService from "../../../../common/services/SPService";
import { MessageBar, MessageBarType, Spinner } from "@fluentui/react";
//import TicketItem from "./TicketItem";
import { Avatar, List, Skeleton, Space, Tag, Typography } from "antd";
import defaultIcon from "../../assets/icon_service.png";

const { Text, Paragraph } = Typography;
interface ITicketResponse {
  loading: boolean;
  error: any;
  value: any[];
}
const SupportTickets = (): JSX.Element => {
  const { appContext } = useContext(AppContext);
  const [tickets, setTickets] = useState<ITicketResponse>({
    loading: true,
    error: null,
    value: [],
  });

  const loadTickets = async () => {
    try {
      const tickets = await SPService.getTicketsAsync(
        appContext.properties.libraryId
      );
      setTickets({
        ...tickets,
        loading: false,
        value: tickets,
      });
    } catch (error) {
      console.log("loadTickets -> error", error);
      setTickets({
        ...tickets,
        loading: false,
        error: error,
      });
    }
  };

  // subscribe to list
  useEffect(() => {
    let listSub: IListSubscription;
    console.log("Subscribing");
    const subscribeForTicketList = async () => {
      listSub = await appContext.listSubscriptionFactory.createSubscription({
        listId: Guid.parse(appContext.properties.libraryId),
        callbacks: {
          notification: async () => {
            console.log("Something changed in Ticket list - Reload");
            await loadTickets();
          },
        },
      });
    };
    subscribeForTicketList();

    return () => {
      console.log("Remove subscription");
      appContext.listSubscriptionFactory.deleteSubscription(listSub);
    };
  }, []);

  useEffect(() => {
    loadTickets();
  }, []);

  if (tickets.loading)
    return (
      <>
        <Spinner />
      </>
    );

  if (tickets.error)
    return (
      <>
        <MessageBar messageBarType={MessageBarType.error}>
          Something went wrong
        </MessageBar>
      </>
    );

  return (
    <div>
      <List
        loading={tickets.loading}
        itemLayout="horizontal"
        pagination={{ position: "bottom", align: "center", pageSize: 3 }}
        dataSource={tickets.value}
        header={
          <div style={{ fontSize: "24px", fontWeight: 600 }}>
            {"My requests"}
          </div>
        }
        renderItem={(item) => (
          <List.Item
            actions={[
              <Space size={0} key={item.Id}>
                <Tag
                  color={
                    item.Status === "In Progress"
                      ? "processing"
                      : item.Status === "Completed"
                      ? "success"
                      : "default"
                  }
                >
                  {item.Status}
                </Tag>
              </Space>,
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar src={defaultIcon} />}
                title={
                  <Space
                    style={{ gap: 10 }}
                    wrap
                    direction="horizontal"
                    size={0}
                    key={item.Id}
                  >
                    <a href="#">{item.Title}</a>
                    <Tag
                      color={item.Priority === "Critical" ? "error" : "default"}
                    >
                      {item.Priority}
                    </Tag>
                  </Space>
                }
                description={
                  <Space
                    direction="vertical"
                    size="middle"
                    style={{ display: "flex" }}
                  >
                    <Paragraph>{item.Description}</Paragraph>
                    <Text italic>
                      {item?.DateReported
                        ? convertDateToDaysAgo(item.DateReported)
                        : null}
                    </Text>
                  </Space>
                }
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );

  function convertDateToDaysAgo(dateString: string) {
    const date = new Date(dateString);
    const today = new Date();
    const differenceInMilliseconds = today.getTime() - date.getTime();
    const daysAgo = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );
    return `${daysAgo}d ago`;
  }
};

export default SupportTickets;
