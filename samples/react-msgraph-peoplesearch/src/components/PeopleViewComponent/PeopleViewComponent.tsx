import * as React from 'react';
import ITemplateContext from '../../models/ITemplateContext';
import { isEmpty } from '@microsoft/sp-lodash-subset';
import { PersonaCard } from '../PersonaCard/PersonaCard';
import styles from './PeopleViewComponent.module.scss';
import { Text } from '@microsoft/sp-core-library';
import * as strings from "PeopleSearchWebPartStrings";

export interface IPeopleViewProps {
    templateContext: ITemplateContext;
}

export interface IPeopleViewState {
}

export class PeopleViewComponent extends React.Component<IPeopleViewProps, IPeopleViewState> {
    public render() {
        const ctx = this.props.templateContext;
        let mainElement: JSX.Element = null;
        let resultCountElement: JSX.Element = null;
        let paginationElement: JSX.Element = null;

        if (!isEmpty(ctx.items) && !isEmpty(ctx.items.value)) {
            if (ctx.showResultsCount) {
                const resultCount = ctx.items["@odata.count"];

                resultCountElement = <div className={styles.resultCount}>
                        <label className="ms-fontWeight-semibold">{Text.format(strings.ResultsCount, resultCount)}</label>
                    </div>;
            }

            if (ctx.showPagination) {
                paginationElement = null;
            }

            const personaCards = [];
            for (let i = 0; i < ctx.items.value.length; i++) {
                personaCards.push(<div className={styles.documentCardItem} key={i}>
                    <div className={styles.personaCard}>
                        <PersonaCard serviceScope={ctx.serviceScope} fieldsConfiguration={ctx.peopleFields} item={ctx.items.value[i]} themeVariant={ctx.themeVariant} personaSize={ctx.personaSize} />
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
}