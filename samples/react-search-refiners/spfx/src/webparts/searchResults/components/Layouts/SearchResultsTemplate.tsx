import * as React from                                                 'react';
import ISearchResultsTemplateProps from './ISearchResultsTemplateProps';
import ISearchResultsTemplateState from './ISearchResultsTemplateState';
import                                  './SearchResultsTemplate.scss';

export default class SearchResultsTemplate extends React.Component<ISearchResultsTemplateProps, ISearchResultsTemplateState> {

    constructor(props: ISearchResultsTemplateProps) {
        super(props);
    
        this.state = {
            processedTemplate: null
        };
    }

    public render() {
        const objectNode: any = document.querySelector("object[data='about:blank']");
        if (objectNode) {
            objectNode.style.display = "none";
        }

        return <div dangerouslySetInnerHTML={{ __html: this.state.processedTemplate }}></div>;
    }

    public componentDidMount() {
        this._updateTemplate(this.props);
    }

    public componentDidUpdate() {
        // Post render operations (previews on elements, etc.)
        this.props.templateService.initPreviewElements();  
    }

    public componentWillReceiveProps(nextProps: ISearchResultsTemplateProps) {
        this._updateTemplate(nextProps);
    }

    private async _updateTemplate(props: ISearchResultsTemplateProps): Promise<void> {

        let templateContent = props.templateContent;

        // Process the Handlebars template
        const template = await this.props.templateService.processTemplate(props.templateContext, templateContent);

        this.setState({
            processedTemplate: template
        });
    }
}
