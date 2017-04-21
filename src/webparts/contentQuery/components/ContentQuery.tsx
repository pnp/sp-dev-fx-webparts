import * as React                       from 'react';
import * as Handlebars                  from "handlebars";
import * as strings                     from 'contentQueryStrings';
import { Checkbox, Spinner }            from 'office-ui-fabric-react';
import { isEmpty }                      from '@microsoft/sp-lodash-subset';
import { Text }                         from '@microsoft/sp-core-library';
import { IContentQueryProps }           from './IContentQueryProps';
import { IContentQueryState }           from './IContentQueryState';
import { IContentQueryTemplateContext } from './IContentQueryTemplateContext';
import styles                           from './ContentQuery.module.scss';


export default class ContentQuery extends React.Component<IContentQueryProps, IContentQueryState> {

  /*************************************************************************************
   * Stores the timestamps of each async calls in order to wait for the last call in 
   * case multiple calls have been fired in a short lapse of time by updaing the 
   * toolpane too fast
   *************************************************************************************/
  private onGoingAsyncCalls: number[];


  /*************************************************************************************
   * Component's constructor
   * @param props 
   * @param state 
   *************************************************************************************/
  constructor(props: IContentQueryProps, state: IContentQueryState) {
      super(props);

      this.onGoingAsyncCalls = [];
      this.state = { loading: true, processedTemplateResult: null, error: null };
  }


  /*************************************************************************************
   * Returns whether the specified call is the LAST executed call within the stored calls
   *************************************************************************************/
  private isLastExecutedCall(timeStamp: number) {
    return (this.onGoingAsyncCalls.length > 0 && this.onGoingAsyncCalls.filter((t: number) => { return t > timeStamp; }).length == 0);
  }


  /*************************************************************************************
   * Loads the items asynchronously and wraps them into a context object for handlebars
   *************************************************************************************/
  private loadTemplateContext() {

    if(this.areMandatoryFieldsConfigured()) {

      // Stores the current call timestamp locally 
      let currentCallTimeStamp = new Date().valueOf();
      this.onGoingAsyncCalls.push(currentCallTimeStamp);

      // Resets the state if this is the first call
      if(this.onGoingAsyncCalls.length == 1) {
        this.setState({
          loading: true,
          processedTemplateResult: null,
          error: null
        });
      }

      // Fires the async call with its associated timestamp
      this.props.onLoadTemplateContext(this.props.querySettings, currentCallTimeStamp).then((templateContext: IContentQueryTemplateContext) => {

        // Loads the handlebars template
        this.props.onLoadTemplate(this.props.templateUrl).then((templateContent: string) => {
            
          // Only process the result of the current async call if it's the last in the ordered queue
          if(this.isLastExecutedCall(templateContext.callTimeStamp)) {
            
            // Resets the onGoingAsyncCalls
            this.onGoingAsyncCalls = []; 

            // Process the handlebars template
            this.processTemplate(templateContent, templateContext);
          }
        })
        .catch((error: string) => { 
          this.setState({ loading: false, processedTemplateResult: null, error: Text.format(this.props.strings.errorLoadingTemplate, error) }); 
        });
      })
      .catch((error) => { 
        this.setState({ loading: false, processedTemplateResult: null, error: Text.format(this.props.strings.errorLoadingQuery, error) }); 
      });
    }
    else {
      this.setState({ loading: false, processedTemplateResult: null, error: null });
    }
  }


  /*************************************************************************************
   * Process the specified handlebars template with the given template context
   * @param templateContent : The handlebars template that needs to be compiled
   * @param templateContext : The context that must be applied to the compiled template
   *************************************************************************************/
  private processTemplate(templateContent: string, templateContext: IContentQueryTemplateContext) {
    try {
      // Processes the template
      let template = Handlebars.compile(templateContent);
      let result = template(templateContext);

      // Updates the state only if the stored calls are still empty (just in case they get updated during the processing of the handlebars template)
      if(this.onGoingAsyncCalls.length == 0) {
        this.setState({ loading: false, processedTemplateResult: result, error: null });
      }
    }
    catch(error) {
      this.setState({ loading: false, processedTemplateResult: null, error: Text.format(this.props.strings.errorProcessingTemplate, error) });
    }
  }


  /*************************************************************************************
   * Returns whether all mandatory fields are configured or not
   *************************************************************************************/
  private areMandatoryFieldsConfigured(): boolean {
    return !isEmpty(this.props.querySettings.webUrl) && 
           !isEmpty(this.props.querySettings.listTitle) && 
           !isEmpty(this.props.querySettings.viewFields) && 
           !isEmpty(this.props.templateUrl);
  }


  /*************************************************************************************
   * Converts the specified HTML by an object required for dangerouslySetInnerHTML
   * @param html 
   *************************************************************************************/
  private createMarkup(html: string) {
    return {__html: html};
  }


  /*************************************************************************************
   * Called once after initial rendering
   *************************************************************************************/
  public componentDidMount(): void {
    this.loadTemplateContext();
  }


  /*************************************************************************************
   * Gets called when the WebPart refreshes (because of the reactive mode for instance)
   *************************************************************************************/
  public componentDidUpdate(prevProps: IContentQueryProps, prevState: IContentQueryState): void {
    if(prevProps.stateKey !== this.props.stateKey) {
      this.loadTemplateContext();
    }
  }


  /*************************************************************************************
   * Renders the Content by Query WebPart
   *************************************************************************************/
  public render(): React.ReactElement<IContentQueryProps> {

    const loading = this.state.loading ? <Spinner label={this.props.strings.loadingItems} /> : <div />;
    const error = this.state.error ? <div className={styles.cqwpError}>{this.state.error}</div> : <div />;
    const mandatoryFieldsConfigured = this.areMandatoryFieldsConfigured();

    return (
      <div className={styles.cqwp}>

        {loading}

        {error}

        {/* Shows the validation checklist if mandatory properties aren't all configured */}
        { !mandatoryFieldsConfigured && !this.state.loading && !this.state.error &&
          <div className={styles.cqwpValidations}>
              Configure the following mandatory properties in order to display results :
              
              <Checkbox label={strings.WebUrlFieldLabel} checked={!isEmpty(this.props.querySettings.webUrl)} />
              <Checkbox label={strings.ListTitleFieldLabel} checked={!isEmpty(this.props.querySettings.listTitle)} />
              <Checkbox label={strings.viewFieldsChecklistStrings.label} checked={!isEmpty(this.props.querySettings.viewFields)} />
              <Checkbox label={strings.TemplateUrlFieldLabel} checked={!isEmpty(this.props.templateUrl)} />
          </div>
        }

        {/* Shows the query results once loaded */}
        { mandatoryFieldsConfigured && !this.state.loading && !this.state.error &&
          <div dangerouslySetInnerHTML={ this.createMarkup(this.state.processedTemplateResult) }></div>
        }

      </div>
    );
  }
}
