import * as React from "react";
import styles from "./ReactAccordion.module.scss";
import { IReactAccordionProps } from "./IReactAccordionProps";
import { sp } from "@pnp/sp/presets/all";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import "./reactAccordion.css";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

export interface IReactAccordionState {
  items: Array<any>;
  choices: Array<any>;
  allowMultipleExpanded: boolean;
  allowZeroExpanded: boolean;
}

export default class ReactAccordion extends React.Component<
  IReactAccordionProps,
  IReactAccordionState
> {
  constructor(props: IReactAccordionProps) {
    super(props);

    this.state = {
      items: new Array<any>(),
      choices: new Array<any>(),
      allowMultipleExpanded: this.props.allowMultipleExpanded,
      allowZeroExpanded: this.props.allowZeroExpanded,
    };
    this.getListItems();
  }

  private getListItems(): void {
    if (
      typeof this.props.listId !== "undefined" &&
      this.props.listId.length > 0 &&
      typeof this.props.columnTitle !== "undefined" &&
      this.props.columnTitle.length > 0 &&
      typeof this.props.selectedChoice !== "undefined" &&
      this.props.selectedChoice.length > 0
    ) {
      let orderByQuery = '';
      if (this.props.accordianSortColumn) {
        orderByQuery = `<OrderBy>
          <FieldRef Name='${this.props.accordianSortColumn}' ${this.props.isSortDescending ? 'Ascending="False"' : ''} />
        </OrderBy>`;
      }

      let query = `<View>
        <Query>
          <Where>
            <Eq>
              <FieldRef Name='${this.props.columnTitle}'/>
              <Value Type='Text'>${this.props.selectedChoice}</Value>
            </Eq>
          </Where>
          ${orderByQuery}
        </Query>
      </View>`;

      let theAccordianList = sp.web.lists.getById(this.props.listId);
      theAccordianList
        .getItemsByCAMLQuery({
          ViewXml: query,
        }) //.select("Title", "Answer", "Category")
        .then((results: Array<any>) => {
          this.setState({
            items: results,
          });
        })
        .catch((error: any) => {
          console.log("Failed to get list items!");
          console.log(error);
        });
    }
  }

  public componentDidUpdate(prevProps: IReactAccordionProps): void {
    if (prevProps.listId !== this.props.listId) {
      this.getListItems();
    }

    if (
      prevProps.allowMultipleExpanded !== this.props.allowMultipleExpanded ||
      prevProps.allowZeroExpanded !== this.props.allowZeroExpanded
    ) {
      this.setState({
        allowMultipleExpanded: this.props.allowMultipleExpanded,
        allowZeroExpanded: this.props.allowZeroExpanded,
      });
    }
  }

  public render(): React.ReactElement<IReactAccordionProps> {
    const listSelected: boolean =
      typeof this.props.listId !== "undefined" && this.props.listId.length > 0;
    const { allowMultipleExpanded, allowZeroExpanded } = this.state;
    return (
      <div className={styles.reactAccordion}>
        {!listSelected && (
          <Placeholder
            iconName="MusicInCollectionFill"
            iconText="Configure your web part"
            description="Select a list with a Title field and Content field to have its items rendered in a collapsible accordion format"
            buttonLabel="Choose a List"
            onConfigure={this.props.onConfigure}
          />
        )}
        {listSelected && (
          <div>
            <WebPartTitle
              displayMode={this.props.displayMode}
              title={this.props.selectedChoice}
              updateProperty={this.props.updateProperty}
            />
            <Accordion
              allowZeroExpanded={allowZeroExpanded}
              allowMultipleExpanded={allowMultipleExpanded}
            >
              {this.state.items.map((item: any) => {
                return (
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton
                        title={item[this.props.accordianTitleColumn]}
                      >
                        {item[this.props.accordianTitleColumn]}
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: item[this.props.accordianContentColumn],
                        }}
                      />
                    </AccordionItemPanel>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        )}
      </div>
    );
  }
}
