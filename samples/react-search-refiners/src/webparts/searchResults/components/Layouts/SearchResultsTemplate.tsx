import React = require('react');
import ISearchResultsTemplateProps from './ISearchResultsTemplateProps';
import ISearchResultsTemplateState from './ISearchResultsTemplateState';
import                                  './SearchResultsTemplate.scss';

export default class SearchResultsTemplate extends React.Component<ISearchResultsTemplateProps, ISearchResultsTemplateState> {

    constructor() {
        super();

        this.state = {
            processedTemplate: null
        };
    }

    public render() {

        return <div dangerouslySetInnerHTML={{ __html: this.state.processedTemplate }}></div>;
    }

    public componentDidMount() {
        this._updateTemplate(this.props);
    }

    public componentWillReceiveProps(nextProps: ISearchResultsTemplateProps) {
        this._updateTemplate(nextProps);
    }

    private async _updateTemplate(props: ISearchResultsTemplateProps): Promise<void> {

        let templateContent = props.templateContent;

        // Process the Handlebars template
        const template = this.props.templateService.processTemplate(props.templateContext, templateContent);

        this.setState({
            processedTemplate: template
        });
    }
}
