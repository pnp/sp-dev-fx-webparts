import * as React from                                                 'react';
import ISearchResultsTemplateProps from './ISearchResultsTemplateProps';
import ISearchResultsTemplateState from './ISearchResultsTemplateState';
import                                  './SearchResultsTemplate.scss';
import { Resize } from 'on-el-resize';
import { DomHelper } from '../../../../helpers/DomHelper';

export default class SearchResultsTemplate extends React.Component<ISearchResultsTemplateProps, ISearchResultsTemplateState> {

    private parentRef: HTMLElement;
    private resize: Resize;

    constructor(props: ISearchResultsTemplateProps) {
        super(props);
        
        this.resize = new Resize();
        this.state = {
            processedTemplate: null
        };

        this.onComponentResize = this.onComponentResize.bind(this);
    }

    public render() {
        const objectNode: any = document.querySelector("object[data='about:blank']");
        if (objectNode) {
            objectNode.style.display = "none";
        }

        return <div ref={el => this.parentRef = el}>
            <div dangerouslySetInnerHTML={{ __html: this.state.processedTemplate }}></div>
        </div>;
    }

    public componentWillUnmount() {
        try {
            this.resize.removeResizeListener(this.parentRef, this.onComponentResize);            
        } catch (error) {}
    }

    public componentDidMount() {
        this._updateTemplate(this.props);
        try {
            this.resize.addResizeListener(this.parentRef, this.onComponentResize);            
        } catch (error) {}
    }

    public componentDidUpdate() {
        // Post render operations (previews on elements, etc.)
        this.props.templateService.initPreviewElements();
        this.onComponentResize();        
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

    private onComponentResize() {

        // Resize iframes accordingly
        const nodes = document.querySelectorAll(".iframePreview, .video-js");

        DomHelper.forEach(nodes, (index, elt) => {
            elt.style.width = Math.floor(this.parentRef.offsetWidth / 2) + 'px';
        });
    }
}
