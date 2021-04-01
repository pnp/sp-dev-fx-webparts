import * as React from 'react';
import styles from './AdvancedPageProperties.module.scss';
import { IAdvancedPagePropertiesProps } from './IAdvancedPagePropertiesProps';
import { Log } from '../utilities/Log';
import * as _ from 'lodash';
import { useState, useEffect, useRef } from 'react';
import { PageProperty } from '../models';

import { sp } from "@pnp/sp";
import { DateTimeFieldFormatType, DateTimeFieldFriendlyFormatType, FieldTypes, IField, IFieldInfo } from "@pnp/sp/fields/types";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields";
import "@pnp/sp/items";
import { IReadonlyTheme } from '@microsoft/sp-component-base';

/**
 * AdvancedPageProperties
 * @param props Page Properties selected for display
 * @returns
 */
const AdvancedPageProperties: React.FunctionComponent<IAdvancedPagePropertiesProps> = props => {
  // Main state object for the life of this component - pagePropValues
  const [pagePropValues, setPagePropValues] = useState<PageProperty[]>([]);
  const propsRef = useRef(props);

  const { semanticColors }: IReadonlyTheme = props.themeVariant;

  propsRef.current = props;

  sp.setup({ spfxContext: props.context });

  /**
   * refreshProperties
   * @description Gets the actual values for any selected properties, along with critical field metadata and ultimately re-sets the pagePropValues state
   */
  async function refreshProperties () {
    var newSetOfValues: PageProperty[] = [];

    if (props.selectedProperties !== undefined && props.selectedProperties !== null) {
      Log.Write(`${props.selectedProperties.length.toString()} properties used.`);

      // Get the value(s) for the field from the list item itself
      var allValues: any = {};
      if (props.context.pageContext.listItem !== undefined && props.context.pageContext.listItem !== null) {
        allValues = await sp.web.lists.getByTitle("Site Pages").items.getById(props.context.pageContext.listItem.id).select(...props.selectedProperties).get();
        console.log(allValues);
      }

      for (let i = 0; i < props.selectedProperties.length; i++) {
        const prop = props.selectedProperties[i];

        Log.Write(`Selected Property: ${prop}`);

        // Get field information, in case anything is needed in conjunction with value types
        const field = await sp.web.lists.getByTitle("Site Pages").fields.getByInternalNameOrTitle(prop)();

        // Establish the values array
        var values: any[] = [];
        if (allValues.hasOwnProperty(prop)) {
          switch (field.TypeAsString) {
            case "TaxonomyFieldTypeMulti":
            case "MultiChoice":
              values = _.clone(allValues[prop]);
              break;
            case "Thumbnail":
              values.push(JSON.parse(allValues[prop]));
              break;

            default:
              // Default behavior is to treat it like a string
              values.push(allValues[prop]);
              break;
          }
        }

        // Push the final setup of a PageProperty object
        newSetOfValues.push({ info: field, values: [...values] });
      }

      setPagePropValues({...newSetOfValues});
    }
  }

  /**
   * @description Effects to fire whenever the properties change
   */
  useEffect(() => {
    refreshProperties();

    return () => {
      // No cleanup at this moment
    };
  }, [propsRef.current]);

  /**
   * RenderPageProperties
   * @description Focuses on the 2nd row layer, which is the property names that have been chosen to be displayed (uses Title as the display name)
   * @returns
   */
  const RenderPageProperties = () => {
    if (pagePropValues !== undefined && pagePropValues !== null) {
      var retVal = _.map(pagePropValues, (prop) => {
        return (
            <>
              <div className={styles.propNameRow}>{prop.info.Title}<span style={{display: 'none'}}> - {prop.info.TypeAsString}</span></div>
              <div className={styles.propValsRow}>
                {RenderPagePropValue(prop)}
              </div>
            </>
          );
      });
      return retVal;
    } else {
      return <i>Nothing to display</i>;
    }
  };

  /**
   * RenderPagePropValue
   * @description Focuses on the 3rd and final row layer, which is the actual values tied to any property displayed for the page
   * @param prop
   * @returns
   */
   const RenderPagePropValue = (prop: PageProperty) => {
    console.log(prop);
    var retVal = _.map(prop.values, (val) => {
      if (val !== null) {
        switch (prop.info.TypeAsString) {
          case "URL":
            return (
              <span className={styles.urlValue}><a href={val.Url} target="_blank" style={{color: semanticColors.link}}>{val.Description}</a></span>
            );
          case "Thumbnail":
            return (
              <span><img className={styles.imgValue} src={val.serverRelativeUrl} /></span>
            );
          case "Number":
            return (
              <span className={styles.plainValue}>{(prop.info["ShowAsPercentage"] === true ? Number(val).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:0}) : (prop.info["CommaSeparator"] === true ? val.toLocaleString('en') : val.toString()))}</span>
            );
          case "Currency":
            return (
              <span className={styles.plainValue}>{(prop.info["CommaSeparator"] === true ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val) : Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', useGrouping: false }).format(val))}</span>
            );
          case "DateTime":
            //,"",,
            switch (prop.info["DateFormat"]) {
              case "StandardUS":
                return (
                  <span className={styles.plainValue}>{new Date(val).toLocaleDateString()}</span>
                );
              case "ISO8601":
                const d = new Date(val);
                return (
                  <span className={styles.plainValue}>{`${d.getFullYear().toString()}-${d.getMonth()}-${d.getDate()}`}</span>
                );
              case "DayOfWeek":
                return (
                  <span className={styles.plainValue}>{new Date(val).toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                );
              case "MonthSpelled":
                return (
                  <span className={styles.plainValue}>{new Date(val).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                );
              default:
                return (
                  <span className={styles.plainValue}>{new Date(val).toLocaleDateString()}</span>
                );
            }
          case "TaxonomyFieldTypeMulti":
          case "TaxonomyFieldType":
            return (
              <span className={styles.standardCapsule} style={{backgroundColor: semanticColors.accentButtonBackground, color: semanticColors.accentButtonText}}>{val.Label}</span>
            );
          default:
            return (
              <span className={styles.standardCapsule} style={{backgroundColor: semanticColors.accentButtonBackground, color: semanticColors.accentButtonText}}>{val}</span>
            );
        }
      } else {
        return (<span className={styles.plainValue}>N/A</span>);
      }
    });
    return retVal;
  };

  /**
   * RenderTitle
   * @description Focuses on the 1 row layer, being the Title that has been chosen for the page
   * @returns
   */
  const RenderTitle = () => {
    if (props.title !== '') {
      return <div className={styles.title}>{props.title}</div>;
    } else {
      return null;
    }
  };

  return (
    <div className={`${styles.advancedPageProperties} ${styles.container}`} style={{backgroundColor: semanticColors.bodyBackground, color: semanticColors.bodyText}}>
      {RenderTitle()}
      {RenderPageProperties()}
    </div>
  );
};

export default AdvancedPageProperties;
