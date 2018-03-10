import * as React                       from 'react';
import * as Handlebars                  from "handlebars";
import * as strings                     from 'contentQueryStrings';
import { Checkbox, Spinner }            from 'office-ui-fabric-react';
import { isEmpty }                      from '@microsoft/sp-lodash-subset';
import { Text, Log }                    from '@microsoft/sp-core-library';
import { IContentQueryProps }           from './IContentQueryProps';
import { IContentQueryState }           from './IContentQueryState';
import { IContentQueryTemplateContext } from './IContentQueryTemplateContext';
import { SPComponentLoader }            from '@microsoft/sp-loader';
import styles                           from './ContentQuery.module.scss';


export default class ContentQuery extends React.Component<IContentQueryProps, IContentQueryState> {

  /*************************************************************************************
   * Constants
   *************************************************************************************/
  private readonly logSource                = "ContentQuery.tsx";
  private readonly nsReactContentQuery      = "ReactContentQuery";
  private readonly nsExternalScripts        = "ExternalScripts";
  private readonly callbackOnPreRenderName  = "onPreRender";
  private readonly callbackOnPostRenderName = "onPostRender";


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

      // Imports the handlebars-helpers
      let helpers = require<any>('handlebars-helpers')({
        handlebars: Handlebars
      });

      // Ensures the WebPart's namespace for external scripts
      window[this.nsReactContentQuery] = window[this.nsReactContentQuery] || {};
      window[this.nsReactContentQuery][this.nsExternalScripts] = window[this.nsReactContentQuery][this.nsExternalScripts] || {};

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
   * Loads the external scritps sequentially (one after the other) if any
   *************************************************************************************/
  private loadExternalScriptsSequentially(scriptUrls:string[]): Promise<{}> {
    var index = 0;
    var _this_ = this;

    return new Promise((resolve, reject) => {
      function next() {
        if (scriptUrls && index < scriptUrls.length) {
          SPComponentLoader.loadScript(scriptUrls[index++])
            .then(next)
            .catch((error) => {
              // As of August 12th 2017, Log.error doesn't seem to do anything, so I use a console.log on top of it for now.
              Log.error(_this_.logSource, error, _this_.props.wpContext.serviceScope);
              console.log(error);
              next();
            });
        } 
        else {
          resolve();
        }
      }
      next();
    });
  }


  /*************************************************************************************
   * Loads the items asynchronously and wraps them into a context object for handlebars
   *************************************************************************************/
  private loadTemplateContext() {

    if(this.areMandatoryFieldsConfigured()) {

      // Stores the current call timestamp locally 
      let currentCallTimeStamp = new Date().valueOf();
      this.onGoingAsyncCalls.push(currentCallTimeStamp);

      // Sets the state to "loading" only if it's the only async call going on (otherwise it's already loading)
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
        this.loadTemplate().then((templateContent: string) => {
            
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
   * Loads the template from url if available, otherwise returns the inline template
   *************************************************************************************/
  private loadTemplate(): Promise<string> {
    // Resolves the template content if no template url
    if(isEmpty(this.props.templateUrl)) {
        return Promise.resolve(this.props.templateText);
    }

    return new Promise<string>((resolve,reject) => {
        this.props.onLoadTemplate(this.props.templateUrl).then((templateContent: string) => {
          resolve(templateContent);
        })
        .catch((error: string) => { 
          reject(error);
        });
    });
  }


  /*************************************************************************************
   * Process the specified handlebars template with the given template context
   * @param templateContent : The handlebars template that needs to be compiled
   * @param templateContext : The context that must be applied to the compiled template
   *************************************************************************************/
  private processTemplate(templateContent: string, templateContext: IContentQueryTemplateContext) {
    try {
      // Calls the external OnPreRender callbacks if any
      this.executeExternalCallbacks(this.callbackOnPreRenderName);

      // Processes the template
      let template = Handlebars.compile(templateContent);
      let result = template(templateContext);

      // Updates the state only if the stored calls are still empty (just in case they get updated during the processing of the handlebars template)
      if(this.onGoingAsyncCalls.length == 0) {
        this.setState({ loading: false, processedTemplateResult: result, error: null });
      }

      // Calls the external OnPostRender callbacks if any
      this.executeExternalCallbacks(this.callbackOnPostRenderName);
    }
    catch(error) {
      this.setState({ loading: false, processedTemplateResult: null, error: Text.format(this.props.strings.errorProcessingTemplate, error) });
    }
  }


  /*************************************************************************************
   * Executes the specified callback for every external script, if available
   *************************************************************************************/
  private executeExternalCallbacks(callbackName: string) {

    if(this.props.externalScripts) {

      // Gets the ReactContentQuery namespace previously created in the constructor
      var ReactContentQuery = window[this.nsReactContentQuery];
    
        // Loops through all the external scripts of the current WebPart
        for(let scriptUrl of this.props.externalScripts) {
    
          // Generates a valid namespace suffix based on the current file name
          var namespaceSuffix = this.generateNamespaceFromScriptUrl(scriptUrl);
    
          // Checks if the current file's namespace is available within the page
          var scriptNamespace = ReactContentQuery[this.nsExternalScripts][namespaceSuffix];
    
          if(scriptNamespace) {
    
            // Checks if the needed callback is available in the script's namespace
            var callback = scriptNamespace[callbackName];
    
            if(callback) {
              callback(this.props.wpContext, Handlebars);
            }
          }
        }
    }
  }


  /*************************************************************************************
   * Extracts the file name out of the specified url and normalizes it for a namespace
   *************************************************************************************/
  private generateNamespaceFromScriptUrl(scriptUrl: string): string {
    return scriptUrl.substring(scriptUrl.lastIndexOf('/') + 1).replace('.js', '').replace(/[^a-zA-Z0-9]/g, "");
  }


  /*************************************************************************************
   * Returns whether all mandatory fields are configured or not
   *************************************************************************************/
  private areMandatoryFieldsConfigured(): boolean {
    return !isEmpty(this.props.siteUrl) && 
           !isEmpty(this.props.querySettings.webUrl) && 
           !isEmpty(this.props.querySettings.listId) && 
           !isEmpty(this.props.querySettings.viewFields) && 
           (!isEmpty(this.props.templateUrl) || !isEmpty(this.props.templateText));
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
    this.loadExternalScriptsSequentially(this.props.externalScripts).then(() => {
      this.loadTemplateContext();
    });
  }


  /*************************************************************************************
   * Gets called when the WebPart refreshes (because of the reactive mode for instance)
   *************************************************************************************/
  public componentDidUpdate(prevProps: IContentQueryProps, prevState: IContentQueryState): void {
    if(prevProps.stateKey !== this.props.stateKey) {
      this.loadExternalScriptsSequentially(this.props.externalScripts).then(() => {
        this.loadTemplateContext();
      });
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
              { this.props.strings.mandatoryProperties }
              
              <Checkbox label={strings.SiteUrlFieldLabel} checked={!isEmpty(this.props.siteUrl)} />
              <Checkbox label={strings.WebUrlFieldLabel} checked={!isEmpty(this.props.querySettings.webUrl)} />
              <Checkbox label={strings.ListTitleFieldLabel} checked={!isEmpty(this.props.querySettings.listId)} />
              <Checkbox label={strings.viewFieldsChecklistStrings.label} checked={!isEmpty(this.props.querySettings.viewFields)} />
              <Checkbox label={strings.templateTextStrings.dialogButtonLabel + " / " + strings.TemplateUrlFieldLabel} checked={(!isEmpty(this.props.templateUrl) || !isEmpty(this.props.templateText))} />
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
