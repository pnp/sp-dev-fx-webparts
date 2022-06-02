import * as React from 'react';
import styles from './Accordions.module.scss';
import * as strings from 'FaqsWebPartStrings';
import { IAccordionsProps } from './IAccordionsProps';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { escape, groupBy, toPairs, sortBy, fromPairs } from '@microsoft/sp-lodash-subset';
import { DisplayMode, Version } from '@microsoft/sp-core-library';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Link } from 'office-ui-fabric-react/lib/components/Link';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from './utilities/Accordion/index';
import { IAccordionsState } from './IAccordionsState';

//import 'react-accessible-accordion/dist/main.css';

const NO_CATEGORY_NAME = "..NOCATEGORYNAME..";

export default class Accordions extends React.Component<IAccordionsProps, IAccordionsState> {
  constructor(props: IAccordionsProps) {
    super(props);

    this.state = {
      categories: null,
      searchCategories: null,
      searchValue: '',
    };
  }

   /**
   * Process all links from the collection data
   */
  private _processFaqs(): void {
    const {collectionData} = this.props;
    if (collectionData && collectionData.length > 0) {
      // Group by the group name
      let categories = groupBy(collectionData, Faq => Faq.category ? Faq.category : NO_CATEGORY_NAME);
      // Sort the group by the property name
      categories = fromPairs(sortBy(toPairs(categories), 0));

      this.setState({
        categories 
      });
    } else {
      this.setState({
        categories: null
      });
    }
  }

  /**
   * componentWillMount lifecycle hook
   */
  public componentWillMount(): void {
    this._processFaqs();
  }

  /**
   * componentDidUpdate lifecycle hook
   * @param prevProps
   * @param prevState
   */
  public componentDidUpdate(prevProps: IAccordionsProps, prevState: IAccordionsState): void {
    if (prevProps.collectionData !== this.props.collectionData) {
      this._processFaqs();
    }
  }

  private onChange = (event: any, newValue: string): void => {
   
    const {collectionData } = this.props;
    if (collectionData && collectionData.length > 0) {

      let filteredCategories;
      filteredCategories = collectionData.filter(item => item.answerText.toLowerCase().indexOf(newValue.toLowerCase()) != -1  || item.questionTitle.toLowerCase().indexOf(newValue.toLowerCase()) != -1);
        
      
     let categories = groupBy(filteredCategories, Faq => Faq.category ? Faq.category : NO_CATEGORY_NAME);
      // Sort the group by the property name
      categories = fromPairs(sortBy(toPairs(categories), 0));
      this.setState({
        searchCategories: categories,
        searchValue : newValue
      });
    } else {
      this.setState({
        searchCategories: null,
        searchValue : newValue
      });
    }
  }

  private onClear() {
    
    this.setState({
      searchCategories: null,
      searchValue : ''
    });
  }
  
  private backToCategories() {
   
    this.setState({
      searchCategories: null,
      searchValue : ''
    });
  }


  public render(): React.ReactElement<IAccordionsProps> {
    const categoryNames = this.state.categories ? Object.keys(this.state.categories) : null;

    const searchCategoryNames = this.state.searchCategories ? Object.keys(this.state.searchCategories) : null;
    const searchValue = this.state.searchValue;
   
    let categories;
    var regEx = new RegExp(searchValue, "ig");

    if(searchCategoryNames && searchCategoryNames.length > 0 && searchValue != ''){
      categories = <div className={styles.noResultsWrapper}><Link className={styles.backToCategories} onClick={this.backToCategories.bind(this)}>
      <Icon iconName="NavigateBack" className={styles.iconNavigateBack} />
      Back to Categories</Link><div>
        {
          searchCategoryNames.map(categoryName => (
            <div key={categoryName}>
                <h2 className={styles.searchResultsCategoryName}>{categoryName}</h2>
              {
                // Loop over all links per group
                this.state.searchCategories[categoryName].map(faq => (
                
                <div className={styles.faqQuestionBlock}> 
                    <h2 dangerouslySetInnerHTML={{__html : faq.questionTitle.replace(regEx,  str => '<mark>' + str + '</mark>')}}></h2>
                    <p dangerouslySetInnerHTML={{__html : faq.answerText.replace(regEx, str => '<mark>' + str + '</mark>')}}></p>
                    { faq.answerLink && <p className={styles.faqAnswerLink}>
                      <div className={styles.faqAnswerSvgLink}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34">
                      <path d="M12.88,21.52h0a1.16,1.16,0,0,1-.85.36,1.2,1.2,0,0,1-1.2-1.2,1.21,1.21,0,0,1,.38-.88l7.94-8a1.19,1.19,0,0,1,.88-.39,1.21,1.21,0,0,1,.86,2.05ZM26.62,12.7l-3.34,3.36a4.72,4.72,0,0,1-4.59,1.22l2.79-2.8a.58.58,0,0,0,.12-.1L25,11A2.37,2.37,0,0,0,21.6,7.67L18.26,11l-2.89,2.9a4.74,4.74,0,0,1,1.22-4.57L19.93,6a4.71,4.71,0,0,1,6.69,0A4.77,4.77,0,0,1,26.62,12.7ZM17,0A17,17,0,1,0,34,17,17,17,0,0,0,17,0ZM15.41,23.93l-3.34,3.36a4.7,4.7,0,0,1-6.68,0,4.75,4.75,0,0,1,0-6.71l3.34-3.36A4.7,4.7,0,0,1,13.3,16l-2.88,2.88s0,0,0,0L7.06,22.26a2.38,2.38,0,0,0,0,3.35,2.35,2.35,0,0,0,3.34,0l3.34-3.35.06-.08,2.83-2.83A4.74,4.74,0,0,1,15.41,23.93Z"></path></svg>
                      </div>
                     <a href={faq.answerLink}>{faq.answerLinkTitle}</a>
                    </p> }                  
                </div>
                
                ))
                }
            </div>
            ))
        }
      </div></div>;
    }
    else if(searchCategoryNames && searchCategoryNames.length == 0 && searchValue != '' )
    {
      categories = <div className={styles.noResultsWrapper}><Link className={styles.backToCategories} onClick={this.backToCategories.bind(this)}>
      <Icon iconName="NavigateBack" className={styles.iconNavigateBack} />
      Back to Categories</Link><div><h2 className={styles.noSearchResults}>0 result found</h2></div></div>;
    }
    else if(categoryNames && categoryNames.length >0 && searchValue == '')
    {
      categories =  <Accordion className={styles.accordion} aria-live="polite" accordion={this.props.accordion}>
      {
          categoryNames.map((categoryName,index: number) => (

          <AccordionItem key={"tab" + index} className={styles.accordion__item} aria-controls={this.props.guid + '-title-' + index} id={"tab" + index} >
              <AccordionItemTitle className={styles.accordion__title}  id={this.props.guid + '-title-' + index}>
              <div className={styles.accordion__arrow} role="presentation" />
                  <div className={styles["positionRelative"]} >
                    {categoryName}
                  </div>
              </AccordionItemTitle>
              <AccordionItemBody className={styles.accordion__body} hideBodyClassName={styles["accordionBodyHidden"]}>                    
              {
                // Loop over all links per group
                this.state.categories[categoryName].map(faq => (
                
                 <div className={styles.faqQuestionBlock}> 
                    <h2>{faq.questionTitle}</h2>
                    <p  dangerouslySetInnerHTML={{__html: faq.answerText}}></p>
                    { faq.answerLink && <p className={styles.faqAnswerLink}>
                      <div className={styles.faqAnswerSvgLink}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34">
                      <path d="M12.88,21.52h0a1.16,1.16,0,0,1-.85.36,1.2,1.2,0,0,1-1.2-1.2,1.21,1.21,0,0,1,.38-.88l7.94-8a1.19,1.19,0,0,1,.88-.39,1.21,1.21,0,0,1,.86,2.05ZM26.62,12.7l-3.34,3.36a4.72,4.72,0,0,1-4.59,1.22l2.79-2.8a.58.58,0,0,0,.12-.1L25,11A2.37,2.37,0,0,0,21.6,7.67L18.26,11l-2.89,2.9a4.74,4.74,0,0,1,1.22-4.57L19.93,6a4.71,4.71,0,0,1,6.69,0A4.77,4.77,0,0,1,26.62,12.7ZM17,0A17,17,0,1,0,34,17,17,17,0,0,0,17,0ZM15.41,23.93l-3.34,3.36a4.7,4.7,0,0,1-6.68,0,4.75,4.75,0,0,1,0-6.71l3.34-3.36A4.7,4.7,0,0,1,13.3,16l-2.88,2.88s0,0,0,0L7.06,22.26a2.38,2.38,0,0,0,0,3.35,2.35,2.35,0,0,0,3.34,0l3.34-3.35.06-.08,2.83-2.83A4.74,4.74,0,0,1,15.41,23.93Z"></path></svg>
                      </div>
                      <a href={faq.answerLink} >{faq.answerLinkTitle}</a>
                    </p> }                     
                 </div>
                 
                ))
                }
              </AccordionItemBody>
          </AccordionItem>

          ))      
        
     // } 
      }
      </Accordion>;
    }
    else if(categoryNames && categoryNames.length == 0 && searchValue == '') {
      categories = <Placeholder
      iconName='Edit'
      iconText={strings.noFaqsIconText}
      description={strings.noFaqsConfigured}
      buttonLabel={strings.noFaqsBtn}
      onConfigure={this.props.fPropertyPaneOpen} />;      
    }
    return (
      <div>                 
       <WebPartTitle displayMode={this.props.displayMode}
                    title={this.props.title}
                    updateProperty={this.props.fUpdateProperty} 
                    className={styles.faqWebPartTitle}/> 
       <SearchBox
        styles={{ root: { width: 200 } }}
        className={styles.faqSearchBox}
        placeholder='Search'        
        onChange={this.onChange.bind(this)}
        value={this.state.searchValue}
        
      />
      {categories}
      </div>
    );


  }
}
