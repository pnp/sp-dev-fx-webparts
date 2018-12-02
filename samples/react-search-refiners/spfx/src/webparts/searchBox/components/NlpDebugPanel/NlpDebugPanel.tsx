import * as React from "react";
import INlpDebugPanelProps from "./INlpDebugPanelProps";
import * as strings from 'SearchBoxWebPartStrings';
import { INlpEntity } from "../../../../models/INlpResponse";
import { Label } from "office-ui-fabric-react/lib/Label";

export default class NlpDebugPanel extends React.Component<INlpDebugPanelProps, null> {

    public render() {

        let renderDebugInfos: JSX.Element = null;

        if (this.props.rawResponse) {

            let renderEntities: JSX.Element[] = [];
                    
            if (this.props.rawResponse.entities) {

                renderEntities = this.props.rawResponse.entities.map((elt: INlpEntity, index) => {

                    let renderEntityValues: JSX.Element  = null;

                    if (elt.resolution) {

                        let entityValues: string[] = [];
                        if (Array.isArray(elt.resolution.values)) {
                            elt.resolution.values.map((entityValue) => {
                                entityValues.push(entityValue);
                            });
                        } else {
                            entityValues.push(elt.resolution.values);
                        }

                        renderEntityValues =    <ul>
                                                        <li><b><Label>{ "Entities" }</Label></b></li>
                                                        <ul>
                                                            {   
                                                                entityValues.map((e, i) => {
                                                                    return <li key={ i }><Label>"{e}"</Label></li>;
                                                                })
                                                            }    
                                                        </ul>
                                                    </ul>;
                    }

                    return  <ul key={ index }>
                                <li>"<u>{ elt.entity }</u>": <em>{ elt.type }</em></li>                            
                                { renderEntityValues }
                            </ul>;
                });
            }

            renderDebugInfos = 
                <div>
                    <h2><i className="ms-Icon ms-Icon--BugSolid" aria-hidden="true"></i> { strings.DebugPanel.HeaderLabel }</h2>
                    <ul>
                        <li><Label><b>{ strings.DebugPanel.DetectedLanguageLabel }</b>: {this.props.rawResponse.detectedLanguage }</Label></li>
                        <li><Label><b>{ strings.DebugPanel.TopScoringIntentNameLabel }</b>: {this.props.rawResponse.topScoringIntent.detectedIntent }</Label></li>
                        <li><Label><b>{ strings.DebugPanel.TopScoringIntentScoreLabel }</b>: {this.props.rawResponse.topScoringIntent.confidence }</Label></li>
                                { this.props.rawResponse.alteredQuery ?
                                    <li><Label><b>{ strings.DebugPanel.AlteredQueryLabel }</b>: {this.props.rawResponse.alteredQuery}</Label></li> : null
                                }
                        <li><Label><b>{ strings.DebugPanel.RecognizedEntitiesLabel }</b>:</Label> { renderEntities }</li>
                        <li><Label><b>{ strings.DebugPanel.EnhancedQueryLabel }</b>: {this.props.rawResponse.enhancedQuery}</Label></li>
                    </ul>
                </div>;
        }

        return renderDebugInfos;
    }
}