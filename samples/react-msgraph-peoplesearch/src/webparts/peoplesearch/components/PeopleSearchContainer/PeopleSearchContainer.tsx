import * as React from "react";
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from "PeopleSearchWebPartStrings";
import styles from "../PeopleSearchWebPart.module.scss";

import { IPeopleSearchContainerProps } from "./IPeopleSearchContainerProps";
import { IPeopleSearchContainerState } from "./IPeopleSearchContainerState";

import {
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
} from "office-ui-fabric-react";
import { Overlay } from 'office-ui-fabric-react/lib/Overlay';
import { ITheme } from '@uifabric/styling';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { DisplayMode } from "@microsoft/sp-core-library";
import ResultsLayoutOption from "../../../../models/ResultsLayoutOption";
import { isEqual, isEmpty } from "@microsoft/sp-lodash-subset";
import ITemplateContext from "../../../../models/ITemplateContext";

export class PeopleSearchContainer extends React.Component<IPeopleSearchContainerProps,IPeopleSearchContainerState> {

  constructor(props: IPeopleSearchContainerProps) {
    super(props);

    this.state = {
      results: {
        value: []
      },
      areResultsLoading: false,
      errorMessage: '',
      hasError: false
    };
  }

  public async componentDidMount() {
    await this._fetchPeopleSearchResults();
  }

  /**
   *
   *
   * @param {IPeopleSearchContainerProps} prevProps
   * @param {IPeopleSearchContainerState} prevState
   * @memberof Directory
   */
  public async componentDidUpdate(prevProps: IPeopleSearchContainerProps, prevState: IPeopleSearchContainerState) {
    if (!isEqual(this.props.searchService, prevProps.searchService)) {
      await this._fetchPeopleSearchResults();
    }
    else if (!isEqual(this.props, prevProps)) {
      if (this.state.hasError) {
        this.setState({
          hasError: false,
        });
      } else {
        this.forceUpdate();
      }
    }
  }

  /**
   *
   *
   * @returns {React.ReactElement<IPeopleSearchContainerProps>}
   * @memberof Directory
   */
  public render(): React.ReactElement<IPeopleSearchContainerProps> {

    const areResultsLoading = this.state.areResultsLoading;
    const items = this.state.results;
    const hasError = this.state.hasError;
    const errorMessage = this.state.errorMessage;

    const { semanticColors }: IReadonlyTheme = this.props.themeVariant;

    let renderWebPartTitle: JSX.Element = null;
    let renderWebPartContent: JSX.Element = null;
    let renderOverlay: JSX.Element = null;
    let renderShimmerElements: JSX.Element = null;

    // Loading behavior
    if (areResultsLoading) {
      if (!isEmpty(items.value)) {
        renderOverlay = <div>
            <Overlay isDarkThemed={false} theme={this.props.themeVariant as ITheme} className={styles.overlay}>
                <Spinner size={SpinnerSize.medium} />
            </Overlay>
        </div>;
      } else {
        let templateContext = {
          items: this.state.results,
          showPagination: this.props.showPagination,
          showResultsCount: this.props.showResultsCount,
          showBlank: this.props.showBlank,
          themeVariant: this.props.themeVariant,
          pageSize: this.props.searchService.pageSize,
          serviceScope: this.props.serviceScope
        } as ITemplateContext;
        templateContext = { ...templateContext, ...this.props.templateParameters };
  
        renderShimmerElements = this.props.templateService.getShimmerTemplateComponent(this.props.selectedLayout, templateContext);
      }
    }

    // WebPart title
    renderWebPartTitle = <WebPartTitle displayMode={this.props.displayMode} title={this.props.webPartTitle} updateProperty={(value: string) => this.props.updateWebPartTitle(value)} />;

    // WebPart content
    if (isEmpty(items.value) && this.props.showBlank && this.props.selectedLayout !== ResultsLayoutOption.Debug) {
      if (this.props.displayMode === DisplayMode.Edit) {
        renderWebPartContent = <MessageBar messageBarType={MessageBarType.info}>{strings.ShowBlankEditInfoMessage}</MessageBar>;
      }
      else {
        renderWebPartTitle = null;
      }
    } else {
      let templateContext = {
        items: this.state.results,
        showPagination: this.props.showPagination,
        showResultsCount: this.props.showResultsCount,
        showBlank: this.props.showBlank,
        themeVariant: this.props.themeVariant,
        pageSize: this.props.searchService.pageSize,
        serviceScope: this.props.serviceScope
      } as ITemplateContext;
      templateContext = { ...templateContext, ...this.props.templateParameters };

      let renderSearchResultTemplate = this.props.templateService.getTemplateComponent(this.props.selectedLayout, templateContext);

      renderWebPartContent =
        <React.Fragment>
            {renderOverlay}
            {renderSearchResultTemplate}
        </React.Fragment>;
    }

    // Error Message
    if (hasError) {
      renderWebPartContent = <MessageBar messageBarType={MessageBarType.error}>{errorMessage}</MessageBar>;
    }

    return (
      <div style={{backgroundColor: semanticColors.bodyBackground}}>
        <div className={styles.peopleSearchWebPart}>
          {renderWebPartTitle}
          {renderShimmerElements ? renderShimmerElements : renderWebPartContent}
        </div>
      </div>
    );
  }

  private async _fetchPeopleSearchResults(): Promise<void> {
    try {
      this.setState({
          areResultsLoading: true,
          hasError: false,
          errorMessage: ""
      });

      const searchResults = await this.props.searchService.searchUsers();

      this.setState({
          results: searchResults,
          areResultsLoading: false
      });
    } catch (error) {
      this.setState({
          areResultsLoading: false,
          results: {
            value: []
          },
          hasError: true,
          errorMessage: error.message
      });
    }
  }
}
