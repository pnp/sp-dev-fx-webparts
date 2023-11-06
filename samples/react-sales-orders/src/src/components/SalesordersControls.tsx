/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from 'react';

import { useAtom } from 'jotai';

import {
  Button,
  InputOnChangeData,
  Spinner,
  Title3,
  tokens,
} from '@fluentui/react-components';
import { SearchBox } from '@fluentui/react-search-preview';
import { Icon } from '@iconify/react';

import { appGlobalStateAtom } from '../atoms/appGlobalStateAtom';
import { EMessageType } from '../constants/EMessageTypes';
import { useGraphAPI } from '../hooks/useGraphAPI';
import { ICustomer } from '../models/ICustomer';
import { IMenuItem } from '../models/IMenuItem';
import { IOrder } from '../models/IOrder';
import { ShowMessage } from '../showMessage/ShowMessage';
import { CompanyInfo } from './companyInfo/CompanyInfo';
import { CustomersGrid } from './customersGrid/CustomersGrid';
import { ISalesordersProps } from './ISalesordersProps';
import { Left } from './left/Left';
import { Menu } from './menu/Menu';
import { NoOrders } from './noOrders/NoOrders';
import { OrdersGrid } from './ordersGrid/OrdersGrid';
import { Right } from './right/Right';
import { StatusOrdersInfo } from './statusOrdersInfo/StatusOrdersInfo';
import { useSalesordersStyles } from './useSalesordersStyles';

export const SalesordersControl: React.FunctionComponent<ISalesordersProps> = (
  props: React.PropsWithChildren<ISalesordersProps>
) => {
  const { context, hasTeamsContext } = props;
  const [appglobalState, setAppglobalState] = useAtom(appGlobalStateAtom);
  const styles = useSalesordersStyles();
  const divContainer = React.useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = React.useState<IMenuItem>({
    id: 1,
    title: "Orders",
    description: "Manage orders",
    icon: "map:grocery-or-supermarket",
  });
  const { searchOrders, getCustomers } = useGraphAPI(context);
  const [orders, setOrders] = React.useState<IOrder[]>([]);
  const [searchText, setSearchText] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [customers, setCustomers] = React.useState<ICustomer[]>([]);
  const [error, setError] = React.useState<Error>((undefined as unknown) as Error);
  
 
  React.useEffect(() => {
    setAppglobalState({ ...appglobalState, ...props });
    // bug,gridtemplateareas is not reconized as CSS property
    if (divContainer.current) {
      const height = !hasTeamsContext ? "calc(100vh - 147px)" : "100vh";
      divContainer.current.setAttribute("style", `grid-template-areas: 'left right right right'; height:   ${height}`);
    }
    setIsLoading(true);
  }, [props]);

  React.useEffect(() => {
    (async () => {
      try {
        switch (selectedItem.id) {
          case 1:
            setOrders(await searchOrders(searchText));
            break;
          case 2:
            setCustomers(await getCustomers(searchText));
            break;
          default:
            break;
        }
      } catch (error) {
      debugger;
        setError(error);
      } finally {
        setIsLoading(false);
      }
      /*  const customers = await getCustomers(searchText);
      setCustomers(customers);
      setOrders(orders ); */
      /* setIsLoading(false); */
    })();
  }, [searchText, selectedItem, props, searchOrders, getCustomers]);

  const totalOrders = React.useMemo(() => {
    return orders.length;
  }, [orders]);

  const totalDelivered = React.useMemo(() => {
    return orders.filter((order) => order.status === "Shipped").length;
  }, [orders]);

  const totalPeding = React.useMemo(() => {
    return orders.filter((order) => order.status === "New").length;
  }, [orders]);

  const totalProcessing = React.useMemo(() => {
    return orders.filter((order) => order.status === "In-Process").length;
  }, [orders]);

  const Header = React.useCallback((props: { title: string }): JSX.Element => {
    const { title } = props;
    return (
      <>
        <Title3>{title}</Title3>
      </>
    );
  }, []);

  const hasOrders = React.useMemo(() => {
    return orders.length > 0;
  }, [orders]);

  const renderSelectedContent = React.useCallback(() => {
    switch (selectedItem.id) {
      case 1:
        return (
          <>
            <StatusOrdersInfo
              totalOrders={totalOrders}
              totalDelivered={totalDelivered}
              pendingOrders={totalPeding}
              processingOrders={totalProcessing}
            />

            <OrdersGrid items={orders} />
          </>
        );
      case 2:
        return <CustomersGrid items={customers} />;
      default:
        return <div>Orders</div>;
    }
  }, [orders, selectedItem, customers, totalOrders, totalDelivered, totalPeding, totalProcessing]);

  const title = React.useMemo(() => {
    switch (selectedItem.id) {
      case 1:
        return "Sales Orders";
      case 2:
        return "Customers";
      default:
        return "Sales Orders";
    }
  }, [selectedItem]);

  const hasError = React.useMemo(() => {
    return !error ? false : true;
  }, [error]);

  const RenderRightContent = React.useCallback(() => {
    if (hasError) {
      return <ShowMessage isShow={hasError} messageType={EMessageType.ERROR} message={error.message} />;
    }
    if (isLoading) {
      return (
        <div style={{ paddingTop: 60 }}>
          <Spinner />
        </div>
      );
    }
    return <>{!hasOrders ? <NoOrders /> : renderSelectedContent()}</>;
  }, [ hasError, error, isLoading, hasOrders, renderSelectedContent]);

  return (
    <>
      <main className={styles.mainContainer} style={{ height: !hasTeamsContext ? "calc(100vh - 147px)" : "100vh"}}>
        <div className={styles.contentContainer}   ref={divContainer}>
          <Left>
            <CompanyInfo />
            <Menu currentItem={selectedItem as IMenuItem} onItemClick={(item) => setSelectedItem(item)} />
          </Left>
          <Right>
            <div className={styles.headerAndSearchContainer}>
              <Header title={title} />
              <SearchBox
                placeholder="Search by order number, customer name..."
                style={{ fontSize: tokens.fontSizeBase200, width: 300 }}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
                  if (data.value.trim().length > 2) {
                    setSearchText(data.value);
                  }
                }}
                dismiss={
                  <Button
                    onClick={() => setSearchText("")}
                    appearance="transparent"
                    icon={<Icon icon="fluent:dismiss-20-regular" />}
                  />
                }
              />
            </div>
            <RenderRightContent />
          </Right>
        </div>
      </main>
    </>
  );
};
