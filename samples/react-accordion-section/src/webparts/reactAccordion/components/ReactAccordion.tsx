import * as React from 'react';
import styles from './ReactAccordion.module.scss';
import { IReactAccordionProps } from './IReactAccordionProps';
import { sp } from "@pnp/sp";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import './reactAccordion.css';

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

export interface IReactAccordionState {
  items: Array<any>;
  allowMultipleExpanded: boolean;
  allowZeroExpanded: boolean;

}

export default class ReactAccordion extends React.Component<IReactAccordionProps, IReactAccordionState> {

  constructor(props: IReactAccordionProps) {
    super(props);

    this.state = {
      items: new Array<any>(),
      allowMultipleExpanded: this.props.allowMultipleExpanded,
      allowZeroExpanded: this.props.allowZeroExpanded
    };
    this.getListItems();
  }

  private getListItems(): void {
    if(typeof this.props.listId !== "undefined" && this.props.listId.length > 0) {
      sp.web.lists.getById(this.props.listId).items.select("Title","Content").get()
        .then((results: Array<any>) => {
          this.setState({
            items: results
          });
        })
        .catch((error:any) => {
          console.log("Failed to get list items!");
          console.log(error);
        });
    }
  }

  public componentDidUpdate(prevProps:IReactAccordionProps): void {
    if(prevProps.listId !== this.props.listId) {
      this.getListItems();
    }

    if(prevProps.allowMultipleExpanded !== this.props.allowMultipleExpanded || prevProps.allowZeroExpanded !== this.props.allowZeroExpanded) {
      this.setState({
        allowMultipleExpanded: this.props.allowMultipleExpanded,
        allowZeroExpanded: this.props.allowZeroExpanded
      });
    }
  }

  public render(): React.ReactElement<IReactAccordionProps> {
    const listSelected:boolean = typeof this.props.listId !== "undefined" && this.props.listId.length > 0;
    const { allowMultipleExpanded, allowZeroExpanded } = this.state;
    return (
      <div className={ styles.reactAccordion }>
        {!listSelected &&
          <Placeholder
            iconName='MusicInCollectionFill'
            iconText='Configure your web part'
            description='Select a list with a Title field and Content field to have its items rendered in a collapsible accordion format'
            buttonLabel='Choose a List'
            onConfigure={this.props.onConfigure} />
        }
        {listSelected &&
        <div>
          <WebPartTitle displayMode={this.props.displayMode}
                title={this.props.accordionTitle}
                updateProperty={this.props.updateProperty}
                 />
          <Accordion allowZeroExpanded={allowZeroExpanded} allowMultipleExpanded={allowMultipleExpanded}>
            {this.state.items.map((item:any) => {
              return (
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      {item.Title}
                    </AccordionItemButton>
                  </AccordionItemHeading>
                    <AccordionItemPanel>
                      <p  dangerouslySetInnerHTML={{__html: item.Content}} />
                    </AccordionItemPanel>
                </AccordionItem>
                );
              })
            }
          </Accordion>
        </div>
        }
      </div>
      );
  }
}
