import * as React from "react";
import { Table } from "antd";
import IContact from "../../../model/IContact";
import { dynamicsService } from "../../../services/services";

export interface IContactsProps {
  Id: string;
}

const Contacts: React.FC<IContactsProps> = (props) => {
  const [data, setData] = React.useState<IContact[]>([]);
  React.useEffect(()=>{
      dynamicsService.getContacts(props.Id).then(res => setData(res));
  },[]);
  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullname",
      render: (text) => <b>{text}</b>
    },
    {
      title: "City",
      dataIndex: "address1_city"
    },
    {
      title: "Email",
      dataIndex: "emailaddress1"
    },
    {
      title: "Business Phone",
      dataIndex: "telephone1",
      render: (text)=><a>{text}</a>
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false} />
    </>
  );
};

export default Contacts;
