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
      const sitePagesList = await sp.web.lists.ensureSitePagesLibrary();
      if (props.context.pageContext.listItem !== undefined && props.context.pageContext.listItem !== null) {
        allValues = await sitePagesList.items.getById(props.context.pageContext.listItem.id).select(...props.selectedProperties).fieldValuesAsText();
      }

      for (let i = 0; i < props.selectedProperties.length; i++) {
        const prop = props.selectedProperties[i];

        Log.Write(`Selected Property: ${prop}`);

        // Get field information, in case anything is needed in conjunction with value types
        const field = await sitePagesList.fields.getByInternalNameOrTitle(prop)();

        // Establish the values array
        var values: any[] = [];
        if (allValues.hasOwnProperty(field.InternalName)) {
          switch (field.TypeAsString) {
            case "UserMulti":
            case "TaxonomyFieldTypeMulti":
              values = _.clone(allValues[field.InternalName].split(";"));
              break;
            case "MultiChoice":
              values = _.clone(allValues[field.InternalName].split(","));
              break;
            case "Thumbnail":
              values.push(JSON.parse(allValues[field.InternalName]));
              break;
            default:
              // Default behavior is to treat it like a string
              values.push(allValues[field.InternalName]);
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
    var retVal = _.map(prop.values, (val) => {
      if (val !== null && val !== "") {
        switch (prop.info.TypeAsString) {
          case "URL":
            const url_parts = val.split(",");
            return (
              <span className={styles.urlValue}><a href={url_parts[0]} target="_blank" rel="noopener noreferrer" style={{color: semanticColors.link}}>{url_parts[1]}</a></span>
            );
          case "Thumbnail":
            return (
              <span><img className={styles.imgValue} src={val.serverRelativeUrl} /></span>
            );
          case "Number":
          case "Currency":
          case "DateTime":
            return (
              <span className={styles.plainValue}>{val}</span>
            );
          case "TaxonomyFieldTypeMulti":
          case "TaxonomyFieldType":
            return (
              <span className={styles.standardCapsule} style={{backgroundColor: semanticColors.accentButtonBackground, color: semanticColors.accentButtonText}}>{val}</span>
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
