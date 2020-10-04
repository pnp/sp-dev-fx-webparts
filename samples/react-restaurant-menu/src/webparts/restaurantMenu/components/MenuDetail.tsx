import * as React from "react";
import { IMenuDetailProps } from "./IMenuDetailProps";
import * as strings from "RestaurantMenuWebPartStrings";
import {
  Stack,
  IStackTokens,
  Label,
  Text,
  Spinner,
  SpinnerSize,
  MessageBar,
  mergeStyleSets,
  ILabelStyles,
  FontIcon,
  ImageIcon,
  Image,
  ImageFit,
  Customizer,
  MessageBarType,
} from "office-ui-fabric-react";
import { IMenuDetailState } from "./IMenuDetailState";
import { useGetListItems } from "../../../hooks/useSPList";
import { EWeekdays } from "./EWeekDays";
import { filter } from "lodash";
import moment from "moment";
import { IMenuFields } from "../../../entities.ts/IMenuFields";

// global const and vars
const stackTokens: IStackTokens = {
  childrenGap: 10,
};
// Component Styles
const stackStyles = {
  root: {
    width: "100%",
  },
};

let listItems: any[] = [];

const imageNoData:string = require('../../../../assets/Eating.svg');


/// Component
export const MenuDetail: React.FunctionComponent<IMenuDetailProps> = (
  props: IMenuDetailProps
) => {
  const styleClasses = mergeStyleSets({
    separator: {
      borderBottomStyle: "solid",
      borderWidth: 1,
      borderBottomColor: props.themeVariant.palette.themeLighter,
    },
    fieldLabelStyle: {
      paddingTop: 0,
      marginTop: "3px !important",
      overflow: "hidden",
      marginBottom: 10,
    },
    menuIcon: {
      fontSize: 18,
    },
    labelStyles: {
      textTransform: "uppercase",
      fontWeight: 600,

      fontSize: props.themeVariant.fonts.medium.fontSize,
      color: props.themeVariant.palette.themePrimary,
      marginBottom: 0,
      paddingBottom: 0,
    },
  });

  const labelStyles: Partial<ILabelStyles> = {
    root: {
      textTransform: "uppercase",
      fontWeight: 600,
      paddingTop: 5,
      fontSize: props.themeVariant.fonts.medium.fontSize,
      color: props.themeVariant.palette.themePrimary,
      marginBottom: 0,
      paddingBottom: 0,
    },
  };

  const [state, setState] = React.useState<IMenuDetailState>({
    isLoading: true,
    hasHerror: false,
    errorMessage: "",
    menuDetails: undefined,
  });

  React.useEffect(() => {
    (async () => {
      try {
        const _menuFields: IMenuFields = {
          dateFieldName: props.dateFieldName,
          soupFieldName: props.soupFieldName,
          fishFieldName: props.fishFieldName,
          meatFieldName: props.meatFieldName,
          dietFieldName: props.dietFieldName,
          veganFieldName: props.veganFieldName,
          dessertFieldName: props.dessertFieldName,
        };

        setState({ ...state, isLoading: true });
        listItems = await useGetListItems(
          props.site[0].url,
          props.listId,
          _menuFields
        );

        const _menuDetails = await selectDay();
        setState({ ...state, isLoading: false, menuDetails: _menuDetails });
      } catch (error) {
        setState({
          ...state,
          hasHerror: true,
          errorMessage: JSON.stringify(error),
        });
        console.log(error);
      }
    })();
  }, [props.site, props.listId, props.dateFieldName]); // key fields properties runs on change and get items

  // run when day of week change Navigation tab
  React.useEffect(() => {
    (async () => {
      if (listItems.length === 0) return;   // to ensure that runs only the listitem are filled
      try {
        setState({ ...state, isLoading: true });
        const _menuDetails = await selectDay();
        setState({ ...state, isLoading: false, menuDetails: _menuDetails });
      } catch (error) {
        setState({
          ...state,
          hasHerror: true,
          errorMessage: JSON.stringify(error),
        });
        console.log(error);
      }
    })();
  }, [props.dayOfWeek]);

  // Select day of week
  const selectDay = async (): Promise<any> => {
    const { dayOfWeek } = props;
    let _item: any[] = [];
    switch (dayOfWeek) {
      case EWeekdays.Monday:
        _item = _item = selectItem(EWeekdays.Monday );
        break;
      case EWeekdays.Tuesday:
        _item = _item = selectItem(EWeekdays.Tuesday );
        break;
      case EWeekdays.Wednesday:
        _item = _item = selectItem(EWeekdays.Wednesday );
        break;
      case EWeekdays.Thursday:
        _item = selectItem(EWeekdays.Thursday );
        break;
      case EWeekdays.Friday:
        _item = _item = selectItem(EWeekdays.Friday );
        break;
      default:
        break;
    }
    return _item;
  };

  // Get Item from the Array os listItems
  const selectItem = (day: number): any => {
    const _dt2 = moment().isoWeekday(day).format("YYYY-MM-DD");
    const _selectedItems = listItems.filter((_item) => {
      const _dt1 = moment(_item[props.dateFieldName]).format("YYYY-MM-DD");
      return _dt1 == _dt2;
    });
    return _selectedItems[0];
  };



  if (state.isLoading) {
    return <Spinner size={SpinnerSize.medium} ></Spinner>;
  }

  if (state.hasHerror) {
    return (
      <MessageBar messageBarType={MessageBarType.error}>
        {state.errorMessage}
      </MessageBar>
    );
  }

  if (!state.menuDetails) {

  return  (
    <>
    <Stack horizontalAlign="center" verticalAlign="center" style={{marginTop: 20}}>
    <Image src={imageNoData} width={120}  height={120} imageFit={ImageFit.cover}></Image>
    <Text variant="large">{strings.NoInformationLabel}</Text>
    </Stack>
    </>
  );
  }

  return (
    <>
      <Stack tokens={stackTokens} >
        {state.menuDetails[props.soupFieldName] && (
          <>
            <Label styles={labelStyles}>{strings.SoupLabel}</Label>
            <div className={styleClasses.fieldLabelStyle}>
              {state.menuDetails[props.soupFieldName]}
            </div>
          </>
        )}
        {state.menuDetails[props.meatFieldName] && (
          <>
            <div className={styleClasses.separator}></div>
            <Label styles={labelStyles}>{strings.MeatLabel}</Label>
            <div className={styleClasses.fieldLabelStyle}>
              {state.menuDetails[props.meatFieldName]}
            </div>
          </>
        )}
        {state.menuDetails[props.fishFieldName] && (
          <>
            <div className={styleClasses.separator}></div>
            <Label styles={labelStyles}>{strings.FishLabel}</Label>
            <div className={styleClasses.fieldLabelStyle}>
              {state.menuDetails[props.fishFieldName]}
            </div>
          </>
        )}
        {state.menuDetails[props.dietFieldName] && (
          <>
            <div className={styleClasses.separator}></div>
            <Label styles={labelStyles}>{strings.DietLabel}</Label>
            <div className={styleClasses.fieldLabelStyle}>
              {state.menuDetails[props.dietFieldName]}
            </div>
          </>
        )}
        {state.menuDetails[props.veganFieldName] && (
          <>
            <div className={styleClasses.separator}></div>
            <Label styles={labelStyles}>{strings.VeganLabel}</Label>
            <div className={styleClasses.fieldLabelStyle}>
              {state.menuDetails[props.veganFieldName]}
            </div>
          </>
        )}
        {state.menuDetails[props.dessertFieldName] && (
          <>
            <div className={styleClasses.separator}></div>
            <Label styles={labelStyles}>{strings.DessertLabel}</Label>
            <div className={styleClasses.fieldLabelStyle}>
              {state.menuDetails[props.dessertFieldName]}
            </div>
            <div className={styleClasses.separator}></div>
          </>
        )}
      </Stack>
    </>
  );
};
