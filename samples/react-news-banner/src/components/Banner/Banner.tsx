import { IBannerProps } from "./IBannerProps";
import styles from "./Banner.module.scss";
import * as React from "react";
import { BannerCard } from "../BannerCard";
import { IBannerState } from "./IBannerState";
import { IListItem } from "../../entities/IListItem";
import { useList } from "../../hooks/useList";
import { reducer } from "./BannerReducer";
import { EBannerTypes } from "./EBannerTypes";
import { Placeholder } from '@pnp/spfx-controls-react';

import {
  MessageBar,
  MessageBarType,
} from "office-ui-fabric-react/lib/MessageBar";
import {
  Spinner,
  SpinnerSize,
} from "office-ui-fabric-react/lib/Spinner";
import {
  Stack,
} from "office-ui-fabric-react/lib/Stack";
import strings from "BannerWebPartStrings";

const initialState: IBannerState = {
  isLoading: false,
  items: [],
  messageError: undefined,
  selectedItem: undefined,
};




export const Banner: React.FunctionComponent<IBannerProps> = (
  props: React.PropsWithChildren<IBannerProps>
) => {
  const { selectedProperties, webpartContext } = props;
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { getItems } = useList();
  const { isLoading, items, messageError, selectedItem } = state;




  const _onSelectedItem = React.useCallback((item: IListItem) => {
    dispatch({
      type: EBannerTypes.SET_SELECTED_ITEM,
      payload: item,
    });
  },[]);


  React.useEffect(() => {
    (async () => {
      if (!selectedProperties.listId) return;
      try {

        dispatch({
          type: EBannerTypes.SET_ISLOADING,
          payload: true,
        });

        const _items = await getItems(selectedProperties);

        dispatch({
          type: EBannerTypes.SET_ITEMS,
          payload: _items,
        });
        dispatch({
          type: EBannerTypes.SET_SELECTED_ITEM,
          payload: _items[0],
        });

        dispatch({
          type: EBannerTypes.SET_MESSAGE,
          payload: undefined,
        });

        dispatch({
          type: EBannerTypes.SET_ISLOADING,
          payload: false,
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: EBannerTypes.SET_MESSAGE,
          payload: {
            message: "Something went worg",
            messageBarType: MessageBarType.error,
            isToShow: true,
          },
        });
        dispatch({
          type: EBannerTypes.SET_ISLOADING,
          payload: false,
        });
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProperties]);

  if (messageError?.isToShow) {
    return (
      <MessageBar messageBarType={messageError.messageBarType} isMultiline>
        {messageError?.message  ?? strings.MessageErrorDefault}
      </MessageBar>
    );
  }

  if (isLoading) {
    return (
      <Stack horizontal horizontalAlign="center" verticalAlign="center">
        <Spinner size={SpinnerSize.large}></Spinner>
      </Stack>
    );
  }

  const {
    dateFieldName,
    descriptionFieldName,
    imageUrlFieldName,
    listId,
    sites,
    titleLink,
  } = selectedProperties;

  if (
    !titleLink ||
    !sites ||
    !sites.length ||
    !listId ||
    !dateFieldName ||
    !descriptionFieldName ||
    !imageUrlFieldName
  ) {
    return (
      <Placeholder iconName='Edit'
      iconText={strings.PlaceholderIconText}
      description={strings.PlaceHolderDescription}
      buttonLabel={strings.PlaceHolderButtonDescription}
      onConfigure={()=> {webpartContext.propertyPane.open()}} />
    );
  }
  return (
    <>

      <div className={styles.container}>
        <div className={styles.imageContainer}>

          <img
            className={styles.image}
            src={selectedItem ? selectedItem.imageUrl : ""}
            width={"100%"}
            height={"100%"}
          ></img>
          <div className={styles.overlay}>
            <a
              rel="noreferrer"
              target="_blank"
              data-interception="off"
              className={styles.title}
              href={titleLink ? selectedItem?.linkUrl : ""}
            >
              {selectedItem ? selectedItem?.title : ""}
            </a>
          </div>
        </div>
        <div className={styles.list}>
          {items.map((item, i) => {
            const _isSeleted: boolean = item.id === selectedItem.id;
            return (
              <div key={i}>
                {i > 0 && i < items.length ? (
                  <div className={styles.lineSeparator}></div>
                ) : null}
                <BannerCard
                  item={item}
                  isSelected={_isSeleted}
                  onSeletedItem={_onSelectedItem}
                  selectedProperties={selectedProperties}
                  currentCultureName={
                    webpartContext.pageContext.cultureInfo.currentCultureName
                  }
                ></BannerCard>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
