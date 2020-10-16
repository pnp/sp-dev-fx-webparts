import * as React from 'react';
import ITemplateContext from '../../models/ITemplateContext';
import { isEmpty } from '@microsoft/sp-lodash-subset';
import styles from './PeopleViewComponent.module.scss';
import * as strings from "PeopleSearchWebPartStrings";
import { Shimmer, ShimmerElementType as ElemType, ShimmerElementsGroup } from 'office-ui-fabric-react';
import { ITheme } from '@uifabric/styling';

export interface IPeopleShimmerViewProps {
    templateContext: ITemplateContext;
}

export interface IPeopleShimmerViewState {
}

export class PeopleShimmerViewComponent extends React.Component<IPeopleShimmerViewProps, IPeopleShimmerViewState> {
    public render() {
        const ctx = this.props.templateContext;
        let mainElement: JSX.Element = null;
        let resultCountElement: JSX.Element = null;
        let paginationElement: JSX.Element = null;

        if (isEmpty(ctx.items) || isEmpty(ctx.items.value)) {
            if (ctx.showResultsCount) {
                const shimmerLineStyle = {
                    width: '20%'
                };

                resultCountElement = <div className={styles.resultCount}>
                        <span className="shimmer line" style={shimmerLineStyle}></span>
                    </div>;
            }

            if (ctx.showPagination) {
                paginationElement = null;
            }

            let personaSize: number;
            switch (parseInt(ctx.personaSize)) {
                case 11:
                    personaSize = 32;
                    break;
                case 12:
                    personaSize = 40;
                    break;
                case 13:
                    personaSize = 48;
                    break;
                case 14:
                    personaSize = 72;
                    break;
                case 15:
                    personaSize = 100;
                    break;
                default:
                    personaSize = 48;
                    break;
            }

            const personaCards = [];
            for (let i = 0; i < ctx.pageSize; i++) {
                personaCards.push(<div className={styles.documentCardItem} key={i}>
                    <div className={styles.personaCard}>
                        {this._getPersonaCardShimmers(personaSize)}
                    </div>
                </div>);
            }

            mainElement = <React.Fragment>
                <div className={styles.defaultCard}>
                    {resultCountElement}
                    <div className={styles.documentCardContainer}>
                        {personaCards}
                    </div>
                </div>
                {paginationElement}
            </React.Fragment>;
        }
        else if (!ctx.showBlank) {
            mainElement = <div className={styles.noResults}>{strings.NoResultMessage}</div>;
        }

        return <div className={styles.peopleView}>{mainElement}</div>;
    }

    private _getPersonaCardShimmers(personaSize: number): JSX.Element {

        const shimmerContent = <div
                                    style={{ 
                                        display: 'flex' ,
                                        marginBottom: 15  
                                    }}
                                >
                                    <div style={{
                                        paddingTop: 8,
                                        paddingRight: 16,
                                        paddingBottom: 8,
                                        width: '100%'
                                    }}>   
                                        
                                        <Shimmer
                                            theme={this.props.templateContext.themeVariant as ITheme}
                                            customElementsGroup={
                                            <div style={{ display: 'flex', marginTop: 10 }}>
                                                <ShimmerElementsGroup
                                                    theme={this.props.templateContext.themeVariant as ITheme}
                                                    backgroundColor={this.props.templateContext.themeVariant.semanticColors.bodyBackground}
                                                    shimmerElements={[{ type: ElemType.circle, height: personaSize}, { type: ElemType.gap, width: 10, height: personaSize }]}
                                                />
                                                <ShimmerElementsGroup
                                                theme={this.props.templateContext.themeVariant as ITheme}
                                                flexWrap={true}
                                                backgroundColor={this.props.templateContext.themeVariant.semanticColors.bodyBackground}
                                                width="100%"
                                                shimmerElements={[
                                                    { type: ElemType.line, width: '30%', height: 10, verticalAlign: 'center' },
                                                    { type: ElemType.gap, width: '70%', height: personaSize/2 },
                                                    { type: ElemType.line, width: '60%', height: 10, verticalAlign: 'top' },
                                                    { type: ElemType.gap, width: '40%', height: (personaSize/2) }
                                                ]}
                                                />
                                            </div>
                                        }/>
                                        
                                    </div>
                                </div>;

        return shimmerContent;
    }
}