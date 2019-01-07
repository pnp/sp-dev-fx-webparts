import { override } from '@microsoft/decorators';
import {
    BaseApplicationCustomizer
} from '@microsoft/sp-application-base';

import { ResultService, ISearchEvent } from '../../services/ResultService/ResultService';
import IResultService from '../../services/ResultService/IResultService';
import SearchResult from './SearchResult/SearchResults';
import * as ReactDOM from 'react-dom';
import * as React from 'react';

export interface ISearchRendererApplicationCustomizerProperties {
}

export default class SearchRendererApplicationCustomizer
    extends BaseApplicationCustomizer<ISearchRendererApplicationCustomizerProperties> {
    private _resultService: IResultService;

    @override
    public onInit(): Promise<void> {
        this._resultService = new ResultService();
        this.onChangeHappened.bind(this);
        this._resultService.registerRenderer(this.componentId, 'CodeRenderer', 'QueryList', this.onChangeHappened, ['Subheader']);
        return Promise.resolve();
    }

    public onChangeHappened(e: ISearchEvent) {
        const subheaderFieldName = e.customTemplateFieldValues[0].searchProperty && e.customTemplateFieldValues[0].searchProperty.length > 0 ? e.customTemplateFieldValues[0].searchProperty : 'Path';
        const resultDisplay = React.createElement(SearchResult, {
            searchResults: e.results,
            componentId: e.rendererId,
            subheaderFieldName: subheaderFieldName,
        });
        let node = document.getElementById(e.mountNode);
        if (node) {
            ReactDOM.render(resultDisplay, node);
        }
    }
}
