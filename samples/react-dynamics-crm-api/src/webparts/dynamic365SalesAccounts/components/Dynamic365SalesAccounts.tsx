import * as React from "react";
import styles from "./Dynamic365SalesAccounts.module.scss";
import { dynamicsService } from "../../../services/services";
import IAccount from "../../../model/IAccount";
import Search from "antd/lib/input/Search";
import { Table, Divider } from 'antd';
import Contacts from './contacts';

const Dynamic365SalesAccounts = () => {
  const [accounts, setAccounts] = React.useState<IAccount[]>([]);
  const [selectedRowKeys,setSelectedRowKeys] = React.useState([]);
  const [selectedRows,setSelectedRows] = React.useState<IAccount[]>([]);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'emailaddress1'
    }
  ];

  React.useEffect(() => {
    dynamicsService.getAccessToken().then(_=>{
      dynamicsService.getAccounts().then((accs) => setAccounts(accs.map(a=>({...a,key:a.accountid}))));
    });
  }, []);

  const searchAccounts = async (value) =>{
    const result: IAccount[] = await dynamicsService.searchAccounts(value);
    const accs = result.map(acc=> ({...acc,key:acc.accountid}));
    setAccounts(accs);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (_selectedRowKeys, _selectedRows) => {
      setSelectedRowKeys(_selectedRowKeys);
      setSelectedRows(_selectedRows);
    }
  };

  return (
    <div className={styles.dynamic365SalesAccounts}>
      <Search placeholder="Search accounts" onSearch={value => searchAccounts(value)} enterButton />
      <Divider/>
      <Table
        columns={columns}
        expandable={{expandedRowRender: record=> <Contacts Id={record.accountid}/>}}
        dataSource={accounts}        
      />
    </div>
  );
};

export default Dynamic365SalesAccounts;