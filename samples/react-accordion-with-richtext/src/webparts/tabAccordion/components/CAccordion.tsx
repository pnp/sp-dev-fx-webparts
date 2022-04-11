


import * as React from 'react';
import styles from './CAccordion.module.scss';
import { ICAccordionProps } from './ICAccordionProps';
import { DisplayMode, Version } from '@microsoft/sp-core-library';
import { Editor } from '@tinymce/tinymce-react';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from './utilities/Accordion/index';

export default class CAccordion extends React.Component<ICAccordionProps, {}> {
  public handleEditorChange = (e) => {
    var id = e.target.id.split("-editor-")[1];
    //Save the content in properties
  
    this.props.tabs[id].Content = e.target.getContent();
  }
  public render(): React.ReactElement<ICAccordionProps> {
    if(this.props.displayMode === DisplayMode.Edit)  
     {
      return (
        <div>                 
         <div className={styles.webpartheader}>
         <WebPartTitle displayMode={this.props.displayMode}
                    title={this.props.title}
                    updateProperty={this.props.fUpdateProperty}
                    className={styles.webparttitle} />
         </div>
        <Accordion className={styles.accordion} aria-live="polite" accordion={this.props.accordion}>
          {           
            this.props.tabs.map((tab: any, index: number) => {
            return (
             <AccordionItem key={"tab" + index} className={styles.accordion__item} aria-controls={this.props.guid + '-title-' + index} id={"tab" + index} >
                  <AccordionItemTitle className={styles.accordion__title} id={this.props.guid + '-title-' + index}>
                  <div className={styles.accordion__arrow} role="presentation" />
                      <div className={styles["positionRelative"]}>                      
                         {tab.Title}                          
                      </div>
                  </AccordionItemTitle>
                  <AccordionItemBody className={styles.accordion__body} hideBodyClassName={styles["accordionBodyHidden"]} >                    
                  <Editor
                          id={this.props.guid + '-editor-' + index}                        
                          value={tab.Content}
                          init={{
                            content_style: "a {color:rgb(0,120,212) !important}",
                            plugins: 'link image table lists media code',                              
                            menubar: 'edit insert format table lists view',  // skip file
                            height : "240",
                            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | numlist bullist | media | code',
                            table_responsive_width: true,
                            table_default_styles: {
                              'width': '100%',
                              'height': 'auto'
                            },
                            image_advtab: true,
                            style_formats: [
                              {title: 'Headings', items: [
                                  {title: 'Heading 1', format: 'h2'},
                                  {title: 'Heading 2', format: 'h3'},
                                  {title: 'Heading 3', format: 'h4'}
                              ]}]
                            
                          }}
                          onChange={this.handleEditorChange}
                      />
                  </AccordionItemBody>
              </AccordionItem>
            );
          })
          } 
        </Accordion>
        </div>
      );
     }
     else 
     {
      return (
        <div>                 
         <div className={styles.webpartheader}>
            <WebPartTitle displayMode={this.props.displayMode}
                    title={this.props.title}
                    updateProperty={this.props.fUpdateProperty}
                    className={styles.webparttitle} />
         </div>             
        <Accordion className={styles.accordion} aria-live="polite" accordion={this.props.accordion}>
          {         
            this.props.tabs.map((tab: any, index: number) => {
            return (
              <AccordionItem key={"tab" + index} className={styles.accordion__item} aria-controls={this.props.guid + '-title-' + index} id={"tab" + index} >
                  <AccordionItemTitle className={styles.accordion__title}  id={this.props.guid + '-title-' + index}>
                  <div className={styles.accordion__arrow} role="presentation" />
                      <div className={styles["positionRelative"]} >
                        {tab.Title}
                      </div>
                  </AccordionItemTitle>
                  <AccordionItemBody className={styles.accordion__body} hideBodyClassName={styles["accordionBodyHidden"]}>                    
                      <div dangerouslySetInnerHTML={{__html:tab.Content}} id={this.props.guid}></div>
                  </AccordionItemBody>
              </AccordionItem>
            );
          })
          } 
        </Accordion>
        </div>
      );
     }


  }
}
