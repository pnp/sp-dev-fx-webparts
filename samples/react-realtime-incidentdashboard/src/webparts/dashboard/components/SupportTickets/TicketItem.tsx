import * as React from "react";

import styled from "styled-components";

const TicketCard = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 10px 0;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.15);
  background-color: #fff;
  padding: 10px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 150px;
  height: 150px;
  background-color: #f5f5f5;
`;

const TicketInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const TicketHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;

const TicketTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin: 0px;
`;

const TicketStatus = styled.span`
  font-size: 14px;
  color: #999;
`;

const TicketDescription = styled.p`
  font-size: 14px;
  margin: 0;
`;

const TicketPriority = styled.span`
  font-size: 12px;
  color: #999;
`;

interface ITaskListProps {
  title: string;
  icon: string;
  status: string;
  description: string;
  priority: string;
}

const TicketItem = ({
  title,
  icon,
  status,
  description,
  priority,
}: ITaskListProps) => {
  return (
    <TicketCard>
      <IconContainer>
        <img src={icon} alt={title} />
      </IconContainer>
      <TicketInfo>
        <TicketHeader>
          <TicketTitle>{title}</TicketTitle>
          <TicketStatus>{status}</TicketStatus>
        </TicketHeader>
        <TicketDescription>{description}</TicketDescription>
        <TicketPriority>{priority}</TicketPriority>
      </TicketInfo>
    </TicketCard>
  );
};
export default TicketItem;
