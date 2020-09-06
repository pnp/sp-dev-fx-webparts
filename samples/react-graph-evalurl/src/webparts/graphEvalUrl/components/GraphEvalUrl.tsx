import * as React from 'react';
import styles from './GraphEvalUrl.module.scss';
import { IGraphEvalUrlProps } from './IGraphEvalUrlProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { GraphHttpClient } from '@microsoft/sp-http';
import GraphEvalClient from './GraphEvalClient';

// Office UI Fabric Imports
import {
    TextField
} from 'office-ui-fabric-react/lib/TextField';
import GraphEvalDebug from './GraphEvalDebug'

export interface IGraphEvalUrlState {
    debugMessage: string
};


export default class GraphEvalUrl extends React.Component<IGraphEvalUrlProps, {}> {


    _graphClient: GraphHttpClient
    state: IGraphEvalUrlState;

    constructor(props) {
        super(props);

        this._graphClient = props.graphClient;

        this.state = {
            debugMessage: ''
        }

    }

    /**
     * Catches all Graph Client errors and print it in debug console
     * @param errors 
     */
    private _catchErrors(errors: string) {

        this.setState(
            {
                debugMessage: errors
            }
        )

    }

    /**
     * Clear all debug messages
     */
    private _cleanDebug() {

        this.setState(
            {
                debugMessage: ''
            }
        )

    }


    /**
     * Evaluate a site collection on blur
     * @param event 
     */
    private _evaluateSiteCollection(event) {

        // get value of current input
        let currentUrlValue = event.target.value;

        if(currentUrlValue === ""){
            this._catchErrors('No URL specified')
            return;
        }


        // create new graph evaluation client aka a validator
        let graphEval = new GraphEvalClient(this._graphClient);

        // request site collection from the Microsoft Graph
        graphEval.EvaluateSiteCollection(currentUrlValue)
            .then(
                (response) => {

                    this.setState({
                        debugMessage: 'Found Site Collection:\n\n' + JSON.stringify(response, null, 2)
                    })

                }
            )
            .catch(this._catchErrors);

    }

    /**
     * Evaluate a site collection and web
     * @param event 
     */
    private _evaluateWeb(event) {

        // get value of current input
        let currentUrlValue = event.target.value;
        // create new graph evaluation client aka a validator
        let graphEval = new GraphEvalClient(this._graphClient);

        if(currentUrlValue === ""){
            this._catchErrors('No URL specified')
            return;
        }

        // request site collection from the Microsoft Graph
        graphEval.EvaluateWeb(currentUrlValue)
            .then(
                (response) => {

                    this.setState({
                        debugMessage: 'Site Collection found:\n'
                            + JSON.stringify(response, null, 2)
                            + '\nTry to evaluate web next:\n\n'
                    })

                    // then try to the get web
                    graphEval.EvaluateWeb(currentUrlValue)
                        .then(
                            (response) => {

                                this.setState({
                                    debugMessage: 'Web found:\n'
                                        + JSON.stringify(response, null, 2)
                                });

                            }
                        ).catch(this._catchErrors);

                }
            )
            .catch(this._catchErrors);

    }


    /**
     * Evaluate if a list exists in a particulare web site
     * @param event 
     */
    private _evaluateList(event) {

        // get value of current input
        let currentUrlValue = event.target.value;

        if(currentUrlValue === ""){
            this._catchErrors('No URL specified')
            return;
        }
        // create new graph evaluation client aka a validator
        let graphEval = new GraphEvalClient(this._graphClient);

        // then try to the get web

        graphEval.EvaluateList(currentUrlValue)
            .then(
                (response) => {

                    if (response.value !== null && response.value.length !== 0) {

                        this.setState({
                            debugMessage: '\nList found:\n'
                                + JSON.stringify(response, null, 2)

                        });

                    } else {

                        this.setState({
                            debugMessage: '\nNo valid list could be found:\n'
                                + JSON.stringify(response, null, 2)

                        });

                    }

                }

            ).catch((error) => {
                this.setState({
                    debugMessage: error
                })
            })

    }

    /**
     * Renders demo web part to evaluate three different variants using Microsoft Graph 
     */
    public render(): React.ReactElement<IGraphEvalUrlProps> {
        return (
            <div>
                <h2>SharePoint URL Input validation using Microsoft Graph</h2>
                <p>Enter a url to site collection, web or list below. Press <kbd>Tab</kbd> to start evaluation. 
                Once the evaluation of any of the specific text field is completed the debugging information
                the information returned by the graph or displays the error message.
                </p>
                {/* Evaluates the inpurt on tab leave and try to find a site collection base in url */}
                <TextField
                    name='scInput'
                    id='scInput'
                    label='Site Collection Evaluation'
                    onBlur={this._evaluateSiteCollection.bind(this)}
                />
                {/* Evaluates the inpurt on tab leave and try to find 
                    a site collection and corresponding web based on url base in url */}
                <TextField
                    name='webInput'
                    id='webInput'
                    label='Web Evaluation'
                    onBlur={this._evaluateWeb.bind(this)}
                />
                {/* Evaluates the inpurt on tab leave and try to find 
                    corresponding web and list based on url base in url */}
                <TextField
                    name='listInput'
                    id='listInput'
                    prefix='https://'
                    label='List Evaluation'
                    onBlur={this._evaluateList.bind(this)}
                />
                <br />
                {/* Displays Graph Debugging information */}
                <GraphEvalDebug panelText={this.state.debugMessage} />
                {/* Dummy container to make sure CSS got rendered */}
                <div className={styles.container} />
            </div >
        );
    }
}
